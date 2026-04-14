import type { ComponentType } from "react";
import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import ColorThemeNavbarItem from "@site/src/theme/NavbarItem/ColorThemeNavbarItem";

const componentTypes = ComponentTypes as Record<string, ComponentType<unknown>>;

export default {
  ...componentTypes,
  "custom-colorTheme": ColorThemeNavbarItem,
};
