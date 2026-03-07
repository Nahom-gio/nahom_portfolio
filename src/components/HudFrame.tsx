import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function HudFrame({
  label,
  className,
  bodyClassName,
  children,
}: {
  label?: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("hud-frame glass-panel border border-app bg-panel shadow-panel", className)}>
      {label ? <div className="hud-label">{label}</div> : null}
      <div className={cn("hud-body", bodyClassName)}>{children}</div>
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
    </div>
  );
}
