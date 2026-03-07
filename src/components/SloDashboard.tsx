import { sloDashboard } from "@/lib/systems";
import { HudFrame } from "@/components/HudFrame";

export function SloDashboard() {
  return (
    <HudFrame label="SLO" className="p-0">
      <div className="p-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="uppercase tracking-[0.3em]">SLO Dashboard</span>
          <span className="terminal-accent">last 30d</span>
        </div>
        <p className="mt-3 text-sm text-muted">
          Availability, latency, and error budget tracking across systems.
        </p>
        <div className="mt-4 space-y-3">
          {sloDashboard.map((metric) => (
            <div
              key={metric.system}
              className="rounded-lg border border-app bg-panel2 px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold text-app">{metric.system}</div>
                <div className="text-xs text-muted">{metric.window}</div>
              </div>
              <div className="mt-2 grid gap-3 text-xs text-muted sm:grid-cols-3">
                <div className="rounded-md border border-app bg-panel px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Availability</div>
                  <div className="mt-1 text-sm text-accent">{metric.availability}</div>
                </div>
                <div className="rounded-md border border-app bg-panel px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Latency p95</div>
                  <div className="mt-1 text-sm text-app">{metric.latencyP95}</div>
                </div>
                <div className="rounded-md border border-app bg-panel px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Error Budget</div>
                  <div className="mt-1 text-sm text-app">{metric.errorBudget}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HudFrame>
  );
}
