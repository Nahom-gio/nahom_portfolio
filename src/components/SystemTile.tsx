"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { System } from "@/lib/systems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchitectureMini } from "@/components/ArchitectureMini";

export function SystemTile({ system }: { system: System }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="glass-panel flex h-full flex-col gap-4 border border-border bg-zinc-900/60 p-6"
    >
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="uppercase tracking-[0.2em]">{system.name}</span>
        <span>{system.timeframe}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-zinc-100">{system.name}</h3>
        <p className="mt-2 text-sm text-zinc-400">{system.mission}</p>
      </div>
      <ArchitectureMini snapshot={system.architecture} />
      <div className="flex flex-wrap gap-2">
        {system.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-zinc-500">{system.capabilities.join(" · ")}</span>
        <Button asChild size="sm">
          <Link href={`/systems/${system.slug}`}>open case file</Link>
        </Button>
      </div>
    </motion.article>
  );
}
