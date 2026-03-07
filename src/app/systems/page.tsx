"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { capabilities, systems, type Capability, type System } from "@/lib/systems";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SystemTile } from "@/components/SystemTile";
import { Separator } from "@/components/ui/separator";
import { ThemeLabel } from "@/components/ThemeLabel";
import { AchievementChip } from "@/components/AchievementChip";

const sorters: Record<string, (a: System, b: System) => number> = {
  recent: (a, b) => b.timeframe.localeCompare(a.timeframe),
  complexity: (a, b) => b.complexity - a.complexity,
  domain: (a, b) => a.domain.localeCompare(b.domain),
};

export default function SystemsPage() {
  const [activeCaps, setActiveCaps] = useState<Capability[]>([]);
  const [sort, setSort] = useState<keyof typeof sorters>("recent");
  const [view, setView] = useState<"grid" | "list">("grid");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const filtered = useMemo(() => {
    const byCaps = activeCaps.length
      ? systems.filter((system) => activeCaps.every((cap) => system.capabilities.includes(cap)))
      : systems;
    return [...byCaps].sort(sorters[sort]);
  }, [activeCaps, sort]);

  const toggleCap = (cap: Capability) => {
    setActiveCaps((prev) =>
      prev.includes(cap) ? prev.filter((item) => item !== cap) : [...prev, cap]
    );
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <ConsoleHeader />

      <section className="hud-frame glass-panel flex flex-col gap-5 border border-app bg-panel p-6">
        <div className="hud-label">Mission Board</div>
        <div className="hud-body flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <ThemeLabel
                as="h1"
                className="text-2xl font-semibold text-app"
                dark="Systems Directory"
                light="Mission Board"
              />
              <p className="text-sm text-muted">Filter, sort, and inspect case files.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={view === "grid" ? "default" : "secondary"}
                size="sm"
                onClick={() => setView("grid")}
              >
                Grid
              </Button>
              <Button
                variant={view === "list" ? "default" : "secondary"}
                size="sm"
                onClick={() => setView("list")}
              >
                List
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm">Sort: {sort}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSort("recent")}>recent</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("complexity")}>complexity</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSort("domain")}>domain</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator className="opacity-40" />

          <div className="flex flex-wrap gap-2">
            {capabilities.map((cap) => (
              <button
                key={cap}
                onClick={() => toggleCap(cap)}
                className={
                  activeCaps.includes(cap)
                    ? "rounded-full border border-[color:var(--accent)] bg-[color:var(--accent2)] px-3 py-1 text-xs text-app"
                    : "rounded-full border border-app bg-panel2 px-3 py-1 text-xs text-muted"
                }
              >
                {cap}
              </button>
            ))}
            {activeCaps.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => setActiveCaps([])}>
                Clear filters
              </Button>
            )}
          </div>
        </div>
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
      </section>

      {view === "grid" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((system) => (
            <SystemTile key={system.slug} system={system} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((system) => (
            <Link
              key={system.slug}
              href={`/systems/${system.slug}`}
              className="hud-frame glass-panel flex flex-col gap-2 border border-app bg-panel p-5 transition hover:border-[color:var(--accent)]"
            >
              <div className="hud-label">Mission</div>
              <div className="hud-body flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-app">{system.name}</span>
                  <span className="text-xs text-muted">{system.timeframe}</span>
                </div>
                <p className="text-sm text-muted">{system.mission}</p>
                <div className="flex flex-wrap gap-2">
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
              </div>
              <span className="hud-corner tl" />
              <span className="hud-corner tr" />
              <span className="hud-corner bl" />
              <span className="hud-corner br" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
