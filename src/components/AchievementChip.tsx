"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Rarity = "common" | "rare" | "epic";

export function AchievementChip({
  label,
  rarity = "common",
}: {
  label: string;
  rarity?: Rarity;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="achievement-chip" data-rarity={rarity}>
            <span className="achievement-dot" />
            <span className="achievement-icon">+</span>
            {label}
          </span>
        </TooltipTrigger>
        <TooltipContent>Unlocked: {label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
