import Link from "next/link";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { CommandBar } from "@/components/CommandBar";
import { SystemTile } from "@/components/SystemTile";
import { CapabilityMatrix } from "@/components/CapabilityMatrix";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { liveLogs, profile, systems } from "@/lib/systems";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
      <ConsoleHeader />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="glass-panel flex flex-col gap-6 border border-border bg-zinc-900/70 p-8">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="uppercase tracking-[0.3em]">Operator Profile</span>
            <span className="terminal-accent">active</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-zinc-50 sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-300">{profile.role}</p>
            <p className="mt-4 text-sm text-zinc-400">{profile.bio}</p>
            <p className="mt-2 text-sm text-zinc-400">{profile.bio2}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/cv.pdf">Download CV</Link>
            </Button>
            <CopyEmailButton email={profile.email} label="Copy email" />
            <Button asChild variant="ghost" size="sm">
              <Link href={profile.github}>GitHub</Link>
            </Button>
          </div>
        </Card>
        <CommandBar />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-panel border border-border bg-zinc-900/70 p-6">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="uppercase tracking-[0.3em]">Live System Logs</span>
            <span className="terminal-accent">streaming</span>
          </div>
          <div className="mt-4 space-y-3 font-mono text-xs text-zinc-300">
            {liveLogs.map((log) => (
              <div
                key={`${log.ts}-${log.system}`}
                className="rounded-lg border border-border bg-zinc-950/60 px-3 py-2"
              >
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
                  <span>{log.ts}</span>
                  <span className="rounded-full border border-border px-2 py-0.5">{log.level}</span>
                  <span className="text-emerald-200">{log.system}</span>
                </div>
                <div className="mt-2 text-zinc-200">{log.message}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="glass-panel border border-border bg-zinc-900/70 p-6">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">Runtime Notes</div>
          <div className="mt-4 space-y-3 text-sm text-zinc-400">
            <p>Queue depth stays under 12 jobs across Temporal workflows.</p>
            <p>Average export time: 68s for 1,200 rows with checksum verification.</p>
            <p>Alert SLA: 92% of watchlist events delivered under 60 seconds.</p>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Systems I Shipped</h2>
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

      <section className="glass-panel grid gap-6 border border-border bg-zinc-900/70 p-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-2xl font-semibold">Signals</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Observability-grade strengths across workflows, automation, and analytics.
          </p>
        </div>
        <div className="space-y-3">
          {profile.signals.map((signal) => (
            <div key={signal} className="flex items-center gap-3 text-sm text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {signal}
            </div>
          ))}
        </div>
      </section>

      <Separator className="opacity-40" />

      <footer className="flex flex-wrap items-center justify-between gap-4 pb-6 text-sm text-zinc-400">
        <span className="flex items-center gap-2">
          Contact:
          <CopyEmailButton
            email={profile.email}
            label={profile.email}
            variant="ghost"
            size="sm"
            className="h-auto px-2 py-1 text-emerald-200"
          />
        </span>
        <span>
          GitHub: <a className="text-emerald-200" href={profile.github}>{profile.github}</a>
        </span>
      </footer>
    </main>
  );
}
