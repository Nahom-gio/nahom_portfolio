"use client";

import Link from "next/link";
import { System, systems } from "@/lib/systems";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArchitectureMini } from "@/components/ArchitectureMini";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { capabilities } from "@/lib/systems";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SystemDetailClient({ system }: { system: System }) {
  const related = systems.filter((item) => item.slug !== system.slug).slice(0, 2);

  return (
    <div className="grid gap-8 lg:grid-cols-[2.1fr_0.9fr]">
      <Card className="glass-panel border border-border bg-zinc-900/70 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">Case File</div>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-50">{system.name}</h1>
            <p className="mt-2 text-sm text-zinc-400">{system.mission}</p>
          </div>
          <div className="text-xs text-zinc-400">
            <div>{system.timeframe}</div>
            <div className="mt-1">Domain: {system.domain}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {system.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="stack">Stack</TabsTrigger>
            <TabsTrigger value="decisions">Decisions</TabsTrigger>
            <TabsTrigger value="reliability">Reliability</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-zinc-950/50 p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Mission</h3>
                <p className="mt-2 text-sm text-zinc-400">{system.mission}</p>
              </div>
              <div className="rounded-xl border border-border bg-zinc-950/50 p-4">
                <h3 className="text-sm font-semibold text-zinc-200">Constraints</h3>
                <ul className="mt-2 space-y-2 text-sm text-zinc-400">
                  {system.constraints.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="architecture">
            <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
              <ArchitectureDiagram diagram={system.architectureDiagram} />
              <div className="space-y-4">
                <ArchitectureMini snapshot={system.architecture} />
                <div className="rounded-xl border border-border bg-zinc-950/50 p-4 text-sm text-zinc-400">
                  <p>Architecture focus: {system.architecture.notes}</p>
                  <p className="mt-4">Capabilities: {system.capabilities.join(" · ")}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="highlights">
            <ul className="space-y-3 text-sm text-zinc-300">
              {system.highlights.map((item) => (
                <li key={item} className="rounded-xl border border-border bg-zinc-950/50 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="stack">
            <div className="grid gap-4 md:grid-cols-2">
              {([
                ["Core", system.stack.core],
                ["Data", system.stack.data],
                ["Infra", system.stack.infra],
                ["Integrations", system.stack.integrations],
              ] as const).map(([label, items]) => (
                <div key={label} className="rounded-xl border border-border bg-zinc-950/50 p-4">
                  <h3 className="text-sm font-semibold text-zinc-200">{label}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="decisions">
            <div className="rounded-xl border border-border bg-zinc-950/50 p-4">
              <h3 className="text-sm font-semibold text-zinc-200">Key Tradeoffs</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {system.decisions.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reliability">
            <div className="rounded-xl border border-border bg-zinc-950/50 p-4">
              <h3 className="text-sm font-semibold text-zinc-200">Validation & Guardrails</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                {system.reliability.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <aside className="space-y-4">
        <Card className="glass-panel border border-border bg-zinc-900/70 p-5">
          <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500">Related Systems</h3>
          <div className="mt-4 space-y-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/systems/${item.slug}`}
                className="block rounded-xl border border-border bg-zinc-950/50 p-3 text-sm text-zinc-200 transition hover:border-emerald-500/40"
              >
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.mission}</div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="glass-panel border border-border bg-zinc-900/70 p-5">
          <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500">Capability Profile</h3>
          <div className="mt-4 grid gap-2 text-xs text-zinc-400">
            {capabilities.map((capability) => {
              const active = system.capabilities.includes(capability);
              return (
                <div
                  key={capability}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                    active
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                      : "border-border bg-zinc-950/50"
                  }`}
                >
                  <span>{capability}</span>
                  <span className="uppercase tracking-[0.2em]">
                    {active ? "active" : "idle"}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="glass-panel border border-border bg-zinc-900/70 p-5">
          <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500">Case Actions</h3>
          <div className="mt-4 flex flex-col gap-3">
            <Button asChild size="sm">
              <Link href="/systems">Back to systems</Link>
            </Button>
            <Button asChild variant="secondary" size="sm">
              <Link href="/cv.pdf">Download CV</Link>
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}
