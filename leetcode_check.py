from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable


DEFAULT_REQUIRED_KEYWORDS = ["原题链接", "时间复杂度", "空间复杂度"]
DEFAULT_ANY_OF_KEYWORDS = ["### 解法", "### 方法"]


def collect_md_files(base_dirs: Iterable[Path]) -> list[Path]:
    md_files: list[Path] = []
    for base_dir in base_dirs:
        if not base_dir.exists():
            continue
        md_files.extend(sorted(base_dir.rglob("*.md")))
    return md_files


def collect_missing_rules(
    file_path: Path,
    required_keywords: list[str],
    any_of_keywords: list[str],
) -> list[str]:
    content = file_path.read_text(encoding="utf-8")
    missing_rules: list[str] = []

    for keyword in required_keywords:
        if keyword not in content:
            missing_rules.append(keyword)

    if any_of_keywords and not any(keyword in content for keyword in any_of_keywords):
        missing_rules.append(f"({' 或 '.join(any_of_keywords)})")

    return missing_rules


def main() -> int:
    parser = argparse.ArgumentParser(
        description="检查题解 Markdown 文件中是否包含指定关键字（默认：原题链接）"
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("computer-science"),
        help="文档根目录，默认是 computer-science",
    )
    parser.add_argument(
        "--folders",
        nargs="+",
        default=["leetcode-hot-100", "top-interview-150"],
        help="需要检查的子目录名，默认检查 leetcode-hot-100 和 top-interview-150",
    )
    parser.add_argument(
        "--required-keywords",
        nargs="+",
        default=DEFAULT_REQUIRED_KEYWORDS,
        help="必须全部包含的关键字（默认：原题链接 时间复杂度 空间复杂度）",
    )
    parser.add_argument(
        "--any-of-keywords",
        nargs="+",
        default=DEFAULT_ANY_OF_KEYWORDS,
        help="至少命中一个的关键字（默认：### 解法 ### 方法）",
    )
    args = parser.parse_args()

    target_dirs = [args.root / folder for folder in args.folders]
    md_files = collect_md_files(target_dirs)

    if not md_files:
        print("未找到任何 .md 文件，请检查路径是否正确。")
        return 1

    missing: list[tuple[Path, list[str]]] = []
    for md_file in md_files:
        try:
            missing_rules = collect_missing_rules(
                md_file,
                required_keywords=args.required_keywords,
                any_of_keywords=args.any_of_keywords,
            )
            if missing_rules:
                missing.append((md_file, missing_rules))
        except UnicodeDecodeError:
            print(f"[跳过] 文件编码无法按 UTF-8 读取: {md_file}")

    print(f"检查目录: {', '.join(str(p) for p in target_dirs)}")
    print(f"必须包含关键字: {', '.join(args.required_keywords)}")
    print(f"至少命中一个: {', '.join(args.any_of_keywords)}")
    print(f"Markdown 文件总数: {len(md_files)}")
    print(f"包含关键字的文件数: {len(md_files) - len(missing)}")
    print(f"缺失关键字的文件数: {len(missing)}")

    if missing:
        print("\n以下文件缺少关键字：")
        for file_path, missing_rules in missing:
            print(f"{file_path} -> 缺少: {', '.join(missing_rules)}")
        return 2

    print("\n所有文件均包含该关键字。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
