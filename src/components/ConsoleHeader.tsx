import { profile } from "@/lib/systems";

export function ConsoleHeader() {
  return (
    <div className="flex flex-col gap-4 border border-border bg-zinc-900/60 px-5 py-4 text-sm text-zinc-300 shadow-panel sm:flex-row sm:items-center sm:justify-between rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-glow" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Systems Console</div>
        <div className="hidden text-xs text-zinc-500 sm:block">/ operator / {profile.name.toLowerCase()}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
        <span className="rounded-full border border-border px-3 py-1">Status: online</span>
        <span className="rounded-full border border-border px-3 py-1">{profile.location}</span>
        <span className="rounded-full border border-border px-3 py-1">{profile.role}</span>
      </div>
    </div>
  );
}
