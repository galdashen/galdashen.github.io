import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import IconDarkMode from "@theme/Icon/DarkMode";
import IconLightMode from "@theme/Icon/LightMode";

import styles from "./styles.module.css";

type ColorMode = "light" | "dark";

type Props = {
  className?: string;
  value?: ColorMode;
  onChange?: (value: ColorMode) => void;
};

const STORAGE_KEY = "site-theme";

const THEME_OPTIONS = [
  { id: "default", label: "温迪绿", className: "" },
  { id: "react-blue", label: "芙芙蓝", className: "theme-react-blue" },
  { id: "nailong-yellow", label: "奶龙黄", className: "theme-nailong-yellow" },
  { id: "taffy-pink", label: "昔涟粉", className: "theme-taffy-pink" },
  { id: "herta-purple", label: "黑塔紫", className: "theme-herta-purple" },
] as const;

type ThemeId = (typeof THEME_OPTIONS)[number]["id"];

const THEME_CLASS_NAMES = THEME_OPTIONS.map((item) => item.className).filter(
  Boolean,
);

function isThemeId(value: string | null): value is ThemeId {
  return THEME_OPTIONS.some((item) => item.id === value);
}

function applyTheme(themeId: ThemeId): void {
  if (typeof document === "undefined") {
    return;
  }

  const selected =
    THEME_OPTIONS.find((item) => item.id === themeId) ?? THEME_OPTIONS[0];
  const targets = [document.documentElement, document.body];

  for (const target of targets) {
    for (const className of THEME_CLASS_NAMES) {
      target.classList.remove(className);
    }

    if (selected.className) {
      target.classList.add(selected.className);
    }
  }
}

function getSavedTheme(): ThemeId {
  if (typeof window === "undefined") {
    return "default";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isThemeId(saved) ? saved : "default";
}

export default function ColorModeToggle({
  className,
  value = "light",
  onChange,
}: Props) {
  const [themeId, setThemeId] = useState<ThemeId>("default");

  useEffect(() => {
    const savedTheme = getSavedTheme();
    setThemeId(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const isDark = value === "dark";

  const currentThemeLabel = useMemo(() => {
    return THEME_OPTIONS.find((item) => item.id === themeId)?.label ?? "温迪绿";
  }, [themeId]);

  const handleModeToggle = () => {
    onChange?.(isDark ? "light" : "dark");
  };

  const handleThemeToggle = () => {
    const currentIndex = THEME_OPTIONS.findIndex((item) => item.id === themeId);
    const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
    const nextTheme = THEME_OPTIONS[nextIndex];

    setThemeId(nextTheme.id);
    applyTheme(nextTheme.id);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextTheme.id);
    }
  };

  return (
    <div className={clsx(styles.group, className)}>
      <button
        type="button"
        className={clsx("clean-btn", styles.modeBtn)}
        onClick={handleModeToggle}
        title={isDark ? "切换到浅色模式" : "切换到深色模式"}
        aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      >
        {isDark ? <IconLightMode /> : <IconDarkMode />}
      </button>

      <button
        type="button"
        className={clsx("clean-btn", styles.themeBtn)}
        onClick={handleThemeToggle}
        title={`切换主题色，当前: ${currentThemeLabel}`}
        aria-label={`切换主题色，当前: ${currentThemeLabel}`}
      >
        <span className={styles.themeEmoji} aria-hidden="true">
          🎨
        </span>
      </button>
    </div>
  );
}
