"use client";

import { useState } from "react";
import { capabilities, systems } from "@/lib/systems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeLabel } from "@/components/ThemeLabel";

export function CapabilityMatrix() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="hud-frame glass-panel overflow-x-auto border border-app bg-panel">
        <div className="hud-label">Loadout</div>
        <div className="hud-body">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-app px-6 py-4">
            <div>
              <ThemeLabel
                as="h2"
                className="text-lg font-semibold text-app"
                dark="Capability Matrix"
                light="Skill Loadout"
              />
              <p className="text-sm text-muted">Systems mapped to core platform capabilities.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setOpen((prev) => !prev)}>
              {open ? "Hide technical breakdown" : "Toggle technical breakdown"}
            </Button>
          </div>
          {open ? (
            <div className="grid min-w-[760px] grid-cols-[200px_repeat(8,minmax(120px,1fr))]">
              <div className="border-b border-app bg-panel2 px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted">
                Systems
              </div>
              {capabilities.map((cap) => (
                <div
                  key={cap}
                  className="border-b border-app bg-panel2 px-4 py-3 text-xs uppercase tracking-[0.15em] text-muted"
                >
                  {cap}
                </div>
              ))}
              {systems.map((system) => (
                <div key={system.slug} className="contents">
                  <div className="border-b border-app px-4 py-4 text-sm text-app">
                    <div className="font-medium">{system.name}</div>
                    <div className="text-xs text-muted">{system.timeframe}</div>
                  </div>
                  {capabilities.map((capability) => {
                    const active = system.capabilities.includes(capability);
                    return (
                      <div key={`${system.slug}-${capability}`} className="border-b border-app px-4 py-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Badge variant={active ? "glow" : "outline"}>
                                {active ? "yes" : "—"}
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {active ? "Emphasis in this system" : "Not emphasized here"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-6 text-sm text-muted">
              Technical breakdown hidden to keep focus on system outcomes.
            </div>
          )}
        </div>
        <span className="hud-corner tl" />
        <span className="hud-corner tr" />
        <span className="hud-corner bl" />
        <span className="hud-corner br" />
      </div>
    </TooltipProvider>
  );
}
