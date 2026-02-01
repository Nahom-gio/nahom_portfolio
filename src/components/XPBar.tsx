export function XPBar({ percent = 72 }: { percent?: number }) {
  return (
    <div className="hud-only">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>XP</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full border border-app bg-panel2">
        <div
          className="h-full rounded-full bg-[color:var(--accent)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
