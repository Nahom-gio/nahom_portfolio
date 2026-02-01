"use client";

import { useTheme } from "next-themes";
import * as React from "react";

type ThemeLabelProps = {
  dark: string;
  light: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export function ThemeLabel({ dark, light, as = "span", className }: ThemeLabelProps) {
  const { theme } = useTheme();
  const label = theme === "light" ? light : dark;
  return React.createElement(as, { className }, label);
}
