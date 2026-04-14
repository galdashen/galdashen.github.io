import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "site.color-theme";
const DEFAULT_THEME = "nailong";

const COLOR_THEMES = [
  { id: "nailong", label: "奶龙黄" },
  { id: "wendi", label: "温迪绿" },
  { id: "fufu", label: "芙芙蓝" },
  { id: "xilian", label: "昔涟粉" },
  { id: "heita", label: "黑塔紫" },
];

function isValidTheme(themeId) {
  return COLOR_THEMES.some((theme) => theme.id === themeId);
}

function applyTheme(themeId) {
  document.documentElement.setAttribute("data-color-theme", themeId);
}

function nextTheme(themeId) {
  const index = COLOR_THEMES.findIndex((theme) => theme.id === themeId);
  if (index < 0) {
    return DEFAULT_THEME;
  }
  return COLOR_THEMES[(index + 1) % COLOR_THEMES.length].id;
}

export default function ColorThemeNavbarItem({ className }) {
  const [themeId, setThemeId] = useState(DEFAULT_THEME);

  useEffect(() => {
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
      配色: {currentLabel}
    </button>
  );
}
