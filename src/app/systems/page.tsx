"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { systems, capabilities, type Capability, type System } from "@/lib/systems";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SystemTile } from "@/components/SystemTile";
import { Separator } from "@/components/ui/separator";

const sorters: Record<string, (a: System, b: System) => number> = {
  recent: (a, b) => b.timeframe.localeCompare(a.timeframe),
  complexity: (a, b) => b.complexity - a.complexity,
  domain: (a, b) => a.domain.localeCompare(b.domain),
};

export default function SystemsPage() {
  const [activeCaps, setActiveCaps] = useState<Capability[]>([]);
  const [sort, setSort] = useState<keyof typeof sorters>("recent");
  const [view, setView] = useState<"grid" | "list">("grid");

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

      <section className="glass-panel flex flex-col gap-5 border border-border bg-zinc-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Systems Directory</h1>
            <p className="text-sm text-zinc-400">Filter, sort, and inspect case files.</p>
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
                  ? "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                  : "rounded-full border border-border bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300"
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
              className="glass-panel flex flex-col gap-2 border border-border bg-zinc-900/60 p-5 transition hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-zinc-100">{system.name}</span>
                <span className="text-xs text-zinc-400">{system.timeframe}</span>
              </div>
              <p className="text-sm text-zinc-400">{system.mission}</p>
              <div className="flex flex-wrap gap-2">
                {system.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
