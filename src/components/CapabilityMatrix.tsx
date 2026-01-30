"use client";

import { useState } from "react";
import { capabilities, systems } from "@/lib/systems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CapabilityMatrix() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="glass-panel overflow-x-auto border border-border">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">Capability Matrix</h2>
            <p className="text-sm text-zinc-400">Systems mapped to core platform capabilities.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setOpen((prev) => !prev)}>
            {open ? "Hide technical breakdown" : "Toggle technical breakdown"}
          </Button>
        </div>
        {open ? (
          <div className="grid min-w-[760px] grid-cols-[200px_repeat(8,minmax(90px,1fr))]">
            <div className="border-b border-border bg-zinc-900/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Systems
            </div>
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="border-b border-border bg-zinc-900/70 px-4 py-3 text-xs uppercase tracking-[0.2em] text-zinc-500"
              >
                {cap}
              </div>
            ))}
            {systems.map((system) => (
              <div key={system.slug} className="contents">
                <div className="border-b border-border px-4 py-4 text-sm text-zinc-200">
                  <div className="font-medium">{system.name}</div>
                  <div className="text-xs text-zinc-500">{system.timeframe}</div>
                </div>
                {capabilities.map((capability) => {
                  const active = system.capabilities.includes(capability);
                  return (
                    <div key={`${system.slug}-${capability}`} className="border-b border-border px-4 py-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Badge variant={active ? "glow" : "outline"}>
                              {active ? "yes" : "—"}
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {active ? "Capability in production" : "Not a focus in this system"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-6 text-sm text-zinc-400">
            Technical breakdown hidden to keep focus on system outcomes.
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}