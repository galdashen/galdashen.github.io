import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "site.color-theme";
const DEFAULT_THEME = "wendi";

type ThemeId =
  | "wendi"
  | "fufu"
  | "nailong"
  | "pangmao"
  | "taffy"
  | "dongxuelian"
  | "huawei";

type ColorTheme = {
  id: ThemeId;
  label: string;
};

const COLOR_THEMES: readonly ColorTheme[] = [
  { id: "wendi", label: "温迪绿" },
  { id: "fufu", label: "芙芙蓝" },
  { id: "nailong", label: "奶龙黄" },
  { id: "pangmao", label: "胖猫紫" },
  { id: "taffy", label: "塔菲粉" },
  { id: "dongxuelian", label: "东雪莲白" },
  { id: "huawei", label: "华为红" },
];

function isValidTheme(themeId: string | null): themeId is ThemeId {
  return COLOR_THEMES.some((theme) => theme.id === themeId);
}

function applyTheme(themeId: ThemeId): void {
  document.documentElement.setAttribute("data-color-theme", themeId);
}

function nextTheme(themeId: ThemeId): ThemeId {
  const index = COLOR_THEMES.findIndex((theme) => theme.id === themeId);
  if (index < 0) {
    return DEFAULT_THEME;
  }
  return COLOR_THEMES[(index + 1) % COLOR_THEMES.length].id;
}

type ColorThemeNavbarItemProps = {
  className?: string;
};

export default function ColorThemeNavbarItem({
  className,
}: ColorThemeNavbarItemProps): React.JSX.Element {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const attributeTheme =
      document.documentElement.getAttribute("data-color-theme");
    if (isValidTheme(attributeTheme)) {
      setThemeId(attributeTheme);
      return;
    }

    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme = isValidTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
    setThemeId(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const currentLabel = useMemo(() => {
    return (
      COLOR_THEMES.find((theme) => theme.id === themeId)?.label ||
      COLOR_THEMES[0].label
    );
  }, [themeId]);

  const handleClick = () => {
    const newTheme = nextTheme(themeId);
    setThemeId(newTheme);
    applyTheme(newTheme);
    window.localStorage.setItem(STORAGE_KEY, newTheme);
  };

  return (
    <button
      type="button"
      className={clsx(
        "navbar__item",
        "navbar__link",
        "clean-btn",
        "color-theme-toggle",
        className,
      )}
      onClick={handleClick}
      title={`切换主题色，当前：${currentLabel}`}
      aria-label={`切换主题色，当前：${currentLabel}`}
    >
      主题色
    </button>
  );
}
