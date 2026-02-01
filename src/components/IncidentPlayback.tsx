import { incidentPlayback } from "@/lib/systems";
import { HudFrame } from "@/components/HudFrame";

const statusStyles: Record<string, string> = {
  detected: "text-[color:var(--text)] border-[color:var(--border)] bg-[color:var(--panel2)]",
  mitigating: "text-[color:var(--text)] border-[color:var(--accent)] bg-[color:var(--accent2)]",
  resolved: "text-[color:var(--accent)] border-[color:var(--accent)] bg-[color:var(--panel2)]",
  postmortem: "text-[color:var(--text)] border-[color:var(--border)] bg-[color:var(--panel2)]",
};

export function IncidentPlayback() {
  return (
    <HudFrame label="Incident" className="p-0">
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="uppercase tracking-[0.3em]">Incident Playback</span>
          <span className="terminal-accent">timeline</span>
        </div>
        <p className="mt-3 text-sm text-muted">
          A condensed replay of a queue backlog incident and the response sequence.
        </p>
        <div className="mt-4 space-y-3">
          {incidentPlayback.map((event) => (
            <div
              key={`${event.ts}-${event.title}`}
              className="rounded-lg border border-app bg-panel2 px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
                <span className="font-mono">{event.ts}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] ${
                    statusStyles[event.status]
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-app">{event.title}</div>
              <div className="mt-1 text-xs text-muted">{event.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </HudFrame>
  );
}
