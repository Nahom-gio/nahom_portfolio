"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { System } from "@/lib/systems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArchitectureMini } from "@/components/ArchitectureMini";
import { AchievementChip } from "@/components/AchievementChip";
import { useTheme } from "next-themes";

export function SystemTile({ system }: { system: System }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="hud-frame glass-panel flex h-full flex-col gap-4 border border-app bg-panel p-6"
    >
      <div className="hud-label">System</div>
      <div className="hud-body flex h-full flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="uppercase tracking-[0.2em]">{system.name}</span>
          <span>{system.timeframe}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-app">{system.name}</h3>
          <p className="mt-2 text-sm text-muted">{system.mission}</p>
        </div>
        <ArchitectureMini snapshot={system.architecture} />
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
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-muted">{system.capabilities.join(" · ")}</span>
          <Button asChild size="sm">
            <Link href={`/systems/${system.slug}`}>
              {isLight ? "open mission" : "open case file"}
            </Link>
          </Button>
        </div>
      </div>
      <span className="hud-corner tl" />
      <span className="hud-corner tr" />
      <span className="hud-corner bl" />
      <span className="hud-corner br" />
    </motion.article>
  );
}
