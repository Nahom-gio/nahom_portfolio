"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLight = theme === "light";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="h-8 rounded-full border border-[color:var(--border)] bg-[color:var(--panel2)] px-3 text-xs"
    >
      {isLight ? "HUD Light" : "Console Dark"}
    </Button>
  );
}
