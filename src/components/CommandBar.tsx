"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { HudFrame } from "@/components/HudFrame";

export function CommandBar() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const commands = [
    { label: "open systems", href: "/systems" },
    { label: "view capabilities", href: "/#capabilities" },
    { label: isLight ? "export save" : "download cv", href: "/cv.pdf" },
  ];

  return (
    <HudFrame label="Command" className="hud-radar p-0">
      <div className="p-5">
        <div className="flex items-center gap-3 rounded-xl border border-app bg-panel2 px-4 py-3 font-mono text-sm text-accent">
          <span className="text-muted">$</span>
          <span className="text-app">run</span>
          <span className="text-accent">/nahom/console</span>
          <span className="text-muted">▍</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {commands.map((cmd) => (
            <Button key={cmd.label} variant="secondary" size="sm" asChild>
              <Link href={cmd.href}>{cmd.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </HudFrame>
  );
}
