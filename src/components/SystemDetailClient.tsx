"use client";

import Link from "next/link";
import { System, systems } from "@/lib/systems";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArchitectureMini } from "@/components/ArchitectureMini";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { AchievementChip } from "@/components/AchievementChip";

export function SystemDetailClient({ system }: { system: System }) {
  const related = systems.filter((item) => item.slug !== system.slug).slice(0, 2);
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="grid gap-8 lg:grid-cols-[2.1fr_0.9fr]">
      <div className="hud-frame glass-panel border border-app bg-panel p-8">
        <div className="hud-label">{isLight ? "Quest Log" : "Case File"}</div>
        <div className="hud-body">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted">
                {isLight ? "Quest Log" : "Case File"}
              </div>
              <h1 className="mt-2 text-3xl font-semibold text-app">{system.name}</h1>
              <p className="mt-2 text-sm text-muted">{system.mission}</p>
            </div>
            <div className="text-xs text-muted">
              <div>{system.timeframe}</div>
              <div className="mt-1">Domain: {system.domain}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {system.tags.map((tag) =>
              isLight ? (
                <AchievementChip key={tag} label={tag} rarity="rare" />
              ) : (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              )
            )}
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
                <div className="rounded-xl border border-app bg-panel2 p-4">
                  <h3 className="text-sm font-semibold text-app">Mission</h3>
                  <p className="mt-2 text-sm text-muted">{system.mission}</p>
                </div>
                <div className="rounded-xl border border-app bg-panel2 p-4">
                  <h3 className="text-sm font-semibold text-app">Constraints</h3>
                  <ul className="mt-2 space-y-2 text-sm text-muted">
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
                  <div className="rounded-xl border border-app bg-panel2 p-4 text-sm text-muted">
                    <p>Architecture focus: {system.architecture.notes}</p>
                    <p className="mt-4">Capabilities: {system.capabilities.join(" · ")}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="highlights">
              <ul className="space-y-3 text-sm text-app">
                {system.highlights.map((item) => (
                  <li key={item} className="rounded-xl border border-app bg-panel2 p-3 text-muted">
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
                  <div key={label} className="rounded-xl border border-app bg-panel2 p-4">
                    <h3 className="text-sm font-semibold text-app">{label}</h3>
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
              <div className="rounded-xl border border-app bg-panel2 p-4">
                <h3 className="text-sm font-semibold text-app">Key Tradeoffs</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {system.decisions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reliability">
              <div className="rounded-xl border border-app bg-panel2 p-4">
                <h3 className="text-sm font-semibold text-app">Validation & Guardrails</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {system.reliability.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
      </div>

      <aside className="space-y-4">
        <div className="hud-frame glass-panel border border-app bg-panel p-5">
          <div className="hud-label">Related</div>
          <div className="hud-body">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted">Related Systems</h3>
            <div className="mt-4 space-y-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/systems/${item.slug}`}
                  className="block rounded-xl border border-app bg-panel2 p-3 text-sm text-app transition hover:border-[color:var(--accent)]"
                >
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted">{item.mission}</div>
                </Link>
              ))}
            </div>
          </div>
          <span className="hud-corner tl" />
          <span className="hud-corner tr" />
          <span className="hud-corner bl" />
          <span className="hud-corner br" />
        </div>

        <div className="hud-frame glass-panel border border-app bg-panel p-5">
          <div className="hud-label">Focus</div>
          <div className="hud-body">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted">System Focus</h3>
            <div className="mt-4 space-y-4 text-xs text-app">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Primary Focus</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {system.focus.primary.map((capability) =>
                    isLight ? (
                      <AchievementChip key={capability} label={capability} rarity="epic" />
                    ) : (
                      <Badge key={capability} variant="glow">
                        {capability}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Supporting Layer</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {system.focus.supporting.map((capability) =>
                    isLight ? (
                      <AchievementChip key={capability} label={capability} rarity="rare" />
                    ) : (
                      <Badge key={capability} variant="outline">
                        {capability}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted">Optional Layer</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {system.focus.optional.map((capability) =>
                    isLight ? (
                      <AchievementChip key={capability} label={capability} rarity="common" />
                    ) : (
                      <Badge key={capability} variant="default">
                        {capability}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <span className="hud-corner tl" />
          <span className="hud-corner tr" />
          <span className="hud-corner bl" />
          <span className="hud-corner br" />
        </div>

        <div className="hud-frame glass-panel border border-app bg-panel p-5">
          <div className="hud-label">Actions</div>
          <div className="hud-body">
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted">Case Actions</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Button asChild size="sm">
                <Link href="/systems">Back to systems</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href="/cv.pdf">
                  {isLight ? "export save" : "download cv"}
                </Link>
              </Button>
            </div>
          </div>
          <span className="hud-corner tl" />
          <span className="hud-corner tr" />
          <span className="hud-corner bl" />
          <span className="hud-corner br" />
        </div>
      </aside>
    </div>
  );
}
