import Link from "next/link";
import { Button } from "@/components/ui/button";

const commands = [
  { label: "open systems", href: "/systems" },
  { label: "view capabilities", href: "/#capabilities" },
  { label: "download cv", href: "/cv.pdf" },
];

export function CommandBar() {
  return (
    <div className="glass-panel grid-glow flex flex-col gap-4 border border-border bg-zinc-900/70 px-5 py-4">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-zinc-950/70 px-4 py-3 font-mono text-sm text-emerald-200">
        <span className="text-zinc-500">$</span>
        <span className="text-zinc-300">run</span>
        <span className="text-emerald-200/80">/nahom/console</span>
        <span className="text-zinc-500">▍</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {commands.map((cmd) => (
          <Button key={cmd.label} variant="secondary" size="sm" asChild>
            <Link href={cmd.href}>{cmd.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
