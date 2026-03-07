import { profile } from "@/lib/systems";
import { ThemeToggle } from "@/components/ThemeToggle";

export function ConsoleHeader() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-app bg-panel px-5 py-4 text-sm text-muted shadow-panel sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent)] shadow-glow hud-pulse" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent2)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--border)]" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted">Systems Console</div>
        <div className="hidden text-xs text-muted sm:block">/ operator / {profile.name.toLowerCase()}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="rounded-full border border-app bg-panel2 px-3 py-1">Status: online</span>
        <span className="rounded-full border border-app bg-panel2 px-3 py-1">{profile.location}</span>
        <span className="rounded-full border border-app bg-panel2 px-3 py-1">{profile.role}</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
