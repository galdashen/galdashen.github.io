from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from dataclasses import dataclass
from pathlib import Path

FRONTMATTER_PATTERN = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
SIDEBAR_POSITION_PATTERN = re.compile(
    r"^sidebar_position\s*:\s*(.+?)\s*$", re.MULTILINE
)


@dataclass
class ValidationIssue:
    path: Path
    message: str


@dataclass
class SidebarItem:
    item_type: str  # "doc" | "category"
    name: str
    path: Path
    position: int | None


def parse_md_sidebar_position(md_file: Path) -> tuple[int | None, str | None]:
    try:
        content = md_file.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return None, "文件无法按 UTF-8 读取"

    frontmatter_match = FRONTMATTER_PATTERN.match(content)
    if not frontmatter_match:
        # Docusaurus 允许没有 frontmatter，此时无 sidebar_position。
        return None, None

    frontmatter = frontmatter_match.group(1)
    position_match = SIDEBAR_POSITION_PATTERN.search(frontmatter)
    if not position_match:
        return None, None

    raw_value = position_match.group(1).strip().strip('"').strip("'")

    if re.fullmatch(r"-?\d+", raw_value):
        return int(raw_value), None

    if re.fullmatch(r"-?\d+\.\d+", raw_value):
        return None, "sidebar_position 不能是小数"

    return None, f"sidebar_position 不是整数: {raw_value}"


def parse_category_position(json_file: Path) -> tuple[int | None, str | None]:
    try:
        data = json.loads(json_file.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        return None, "文件无法按 UTF-8 读取"
    except json.JSONDecodeError as exc:
        return None, f"JSON 解析失败: {exc.msg}"

    if not isinstance(data, dict):
        return None, "JSON 顶层不是对象"

    raw_value = data.get("position", data.get("sidebar_position"))
    if raw_value is None:
        # Docusaurus 允许没有 position。
        return None, None

    if isinstance(raw_value, bool):
        return None, "position/sidebar_position 不是整数"

    if isinstance(raw_value, int):
        return raw_value, None

    if isinstance(raw_value, float):
        return None, "position/sidebar_position 不能是小数"

    return None, "position/sidebar_position 不是整数"


def collect_directory_items(
    directory: Path,
) -> tuple[list[SidebarItem], list[ValidationIssue]]:
    issues: list[ValidationIssue] = []
    items: list[SidebarItem] = []

    for md_file in sorted(directory.glob("*.md")):
        position, error = parse_md_sidebar_position(md_file)
        if error is not None:
            issues.append(ValidationIssue(path=md_file, message=error))
            continue
        items.append(
            SidebarItem(
                item_type="doc",
                name=md_file.stem,
                path=md_file,
                position=position,
            )
        )

    for child_dir in sorted(path for path in directory.iterdir() if path.is_dir()):
        category_json = child_dir / "_category_.json"
        if not category_json.exists():
            continue

        position, error = parse_category_position(category_json)
        if error is not None:
            issues.append(ValidationIssue(path=category_json, message=error))
            continue
        items.append(
            SidebarItem(
                item_type="category",
                name=child_dir.name,
                path=category_json,
                position=position,
            )
        )

    return items, issues


def docusaurus_sort_key(item: SidebarItem) -> tuple[int, int, str, int]:
    # 与 Docusaurus 自动侧边栏一致的核心思路：
    # 1) 有 position/sidebar_position 的先按数值升序
    # 2) 未设置 position 的排在后面
    # 3) 同优先级按名称排序；同名时 doc 在 category 前
    has_no_position = 1 if item.position is None else 0
    position_value = item.position if item.position is not None else 10**9
    name_key = item.name.lower()
    type_order = 0 if item.item_type == "doc" else 1
    return (has_no_position, position_value, name_key, type_order)


def validate_positions(
    directory: Path,
    items: list[SidebarItem],
    strict_sequence: bool,
) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    numeric_positions = [item.position for item in items if item.position is not None]

    invalid_non_positive = sorted({pos for pos in numeric_positions if pos <= 0})
    if invalid_non_positive:
        issues.append(
            ValidationIssue(
                path=directory,
                message=f"存在非正编号（Docusaurus 建议使用正整数）: {invalid_non_positive}",
            )
        )

    duplicated = sorted(
        pos for pos, count in Counter(numeric_positions).items() if count > 1
    )
    if duplicated:
        # Docusaurus 允许重复位置值，这里给出提示而非错误阻断。
        issues.append(
            ValidationIssue(
                path=directory,
                message=f"position/sidebar_position 有重复值（允许但需确认是否符合预期）: {duplicated}",
            )
        )

    if strict_sequence:
        unpositioned = [item.name for item in items if item.position is None]
        if unpositioned:
            issues.append(
                ValidationIssue(
                    path=directory,
                    message=f"严格模式要求所有项都设置编号，以下未设置: {unpositioned}",
                )
            )

        expected_set = set(range(1, len(items) + 1))
        actual_set = set(numeric_positions)
        missing = sorted(expected_set - actual_set)
        extra = sorted(actual_set - expected_set)
        if missing or extra:
            issues.append(
                ValidationIssue(
                    path=directory,
                    message=(
                        "严格模式下编号需覆盖 1..N（N 为同级总项数），"
                        f"当前编号={sorted(actual_set)}，"
                        f"期望={sorted(expected_set)}，"
                        f"缺少={missing}，超出={extra}"
                    ),
                )
            )

    return issues


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "按 Docusaurus 自动侧边栏逻辑检查 MD/sidebar_position 与 "
            "_category_.json/position，并输出排序结果"
        )
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("computer-science"),
        help="文档根目录，默认是 computer-science",
    )
    parser.add_argument(
        "--no-strict-sequence",
        dest="strict_sequence",
        action="store_false",
        help="关闭严格模式（默认开启）：允许非连续编号",
    )
    parser.set_defaults(strict_sequence=True)
    args = parser.parse_args()

    root = args.root
    if not root.exists() or not root.is_dir():
        print(f"目录不存在或不是文件夹: {root}")
        return 1

    all_dirs = [root] + sorted(path for path in root.rglob("*") if path.is_dir())

    all_issues: list[ValidationIssue] = []
    checked_dirs = 0

    print(f"检查根目录: {root}")
    print(f"严格连续模式: {'开启（默认）' if args.strict_sequence else '关闭'}")
    print(f"扫描目录数量: {len(all_dirs)}")

    for directory in all_dirs:
        items, parse_issues = collect_directory_items(directory)
        all_issues.extend(parse_issues)

        if not items:
            continue

        checked_dirs += 1
        all_issues.extend(validate_positions(directory, items, args.strict_sequence))

        ordered_items = sorted(items, key=docusaurus_sort_key)
        print(f"\n[{directory}]")
        for idx, item in enumerate(ordered_items, start=1):
            position_text = (
                str(item.position) if item.position is not None else "(未设置)"
            )
            print(f"  {idx}. {item.item_type:<8} pos={position_text:<8} {item.name}")

    print(f"\n实际含侧边栏项的目录数量: {checked_dirs}")

    if all_issues:
        print(f"发现提示/问题数量: {len(all_issues)}")
        print("\n明细：")
        for issue in all_issues:
            print(f"- {issue.path}: {issue.message}")
        return 2

    print("未发现结构性问题。排序结果已按 Docusaurus 逻辑输出。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
