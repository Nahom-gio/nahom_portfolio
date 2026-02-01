import Link from "next/link";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { CommandBar } from "@/components/CommandBar";
import { SystemTile } from "@/components/SystemTile";
import { CapabilityMatrix } from "@/components/CapabilityMatrix";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { liveLogs, profile, systems } from "@/lib/systems";
import { IncidentPlayback } from "@/components/IncidentPlayback";
import { SloDashboard } from "@/components/SloDashboard";
import { ThemeLabel } from "@/components/ThemeLabel";
import { HudFrame } from "@/components/HudFrame";
import { XPBar } from "@/components/XPBar";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
      <ConsoleHeader />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <HudFrame label="Operator" className="p-0">
          <div className="flex flex-col gap-6 p-8">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="uppercase tracking-[0.3em]">Operator Profile</span>
              <span className="terminal-accent hud-pulse">active</span>
            </div>
            <div>
              <div className="hud-only mb-3 inline-flex items-center gap-2 rounded-full border border-app bg-panel2 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted">
                LV 12 Backend
              </div>
              <h1 className="text-3xl font-semibold text-app sm:text-4xl">
                {profile.name}
              </h1>
              <div className="hud-only mt-2 flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full border border-app bg-panel2 px-2 py-1">WF</span>
                <span className="rounded-full border border-app bg-panel2 px-2 py-1">DATA</span>
                <span className="rounded-full border border-app bg-panel2 px-2 py-1">SEC</span>
              </div>
              <p className="mt-2 text-lg text-muted">{profile.role}</p>
              <p className="mt-4 text-sm text-muted">{profile.bio}</p>
              <p className="mt-2 text-sm text-muted">{profile.bio2}</p>
              <p className="mt-3 text-sm text-accent">{profile.range}</p>
            </div>
            <XPBar percent={72} />
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm">
                <Link href="/cv.pdf">
                  <ThemeLabel dark="Download CV" light="Export Save" />
                </Link>
              </Button>
              <CopyEmailButton email={profile.email} label="Copy email" />
              <Button asChild variant="ghost" size="sm">
                <Link href={profile.github}>GitHub</Link>
              </Button>
            </div>
          </div>
        </HudFrame>
        <CommandBar />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <HudFrame label="Quest Log" className="p-0">
          <div className="p-6">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="uppercase tracking-[0.3em]">Live System Logs</span>
              <span className="terminal-accent hud-pulse">streaming</span>
            </div>
            <div className="mt-4 space-y-3 font-mono text-xs text-muted">
              {liveLogs.map((log) => (
                <div
                  key={`${log.ts}-${log.system}`}
                  className="rounded-lg border border-app bg-panel2 px-3 py-2"
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted">
                    <span>{log.ts}</span>
                    <span className="rounded-full border border-app px-2 py-0.5">{log.level}</span>
                    <span className="text-accent">{log.system}</span>
                  </div>
                  <div className="mt-2 text-app">{log.message}</div>
                </div>
              ))}
            </div>
          </div>
        </HudFrame>
        <HudFrame label="Runtime" className="p-0">
          <div className="p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-muted">Runtime Notes</div>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <p>Queue depth stays under 12 jobs across Temporal workflows.</p>
              <p>Average export time: 68s for 1,200 rows with checksum verification.</p>
              <p>Alert SLA: 92% of watchlist events delivered under 60 seconds.</p>
            </div>
          </div>
        </HudFrame>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <IncidentPlayback />
        <SloDashboard />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <ThemeLabel
            as="h2"
            className="text-2xl font-semibold text-app"
            dark="Systems I Shipped"
            light="Missions Completed"
          />
          <Button asChild variant="secondary" size="sm">
            <Link href="/systems">View all systems</Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {systems.map((system) => (
            <SystemTile key={system.slug} system={system} />
          ))}
        </div>
      </section>

      <section id="capabilities">
        <CapabilityMatrix />
      </section>

      <HudFrame label="Perks" className="p-0">
        <div className="p-8">
          <div>
            <ThemeLabel
              as="h2"
              className="text-2xl font-semibold text-app"
              dark="Signals"
              light="Perks"
            />
            <p className="mt-2 text-sm text-muted">
              Observability-grade strengths across workflows, automation, and analytics.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {profile.signals.map((signal) => (
              <div key={signal} className="flex items-center gap-3 text-sm text-app">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] hud-pulse" />
                {signal}
              </div>
            ))}
          </div>
        </div>
      </HudFrame>

      <HudFrame label="Transferable" className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="uppercase tracking-[0.3em]">Transferable Stack</span>
            <span className="terminal-accent">adaptable</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            Comfortable adapting to adjacent infrastructure and tooling when constraints shift.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.transferables.map((item) => (
              <span
                key={item}
                className="rounded-full border border-app bg-panel2 px-3 py-1 text-xs text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </HudFrame>

      <Separator className="opacity-40" />

      <footer className="flex flex-wrap items-center justify-between gap-4 pb-6 text-sm text-muted">
        <span className="flex items-center gap-2">
          Contact:
          <CopyEmailButton
            email={profile.email}
            label={profile.email}
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-accent"
          />
        </span>
        <span>
          GitHub: <a className="text-accent" href={profile.github}>{profile.github}</a>
        </span>
      </footer>
    </main>
  );
}
