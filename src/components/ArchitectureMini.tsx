import { ArchitectureSnapshot } from "@/lib/systems";

export function ArchitectureMini({ snapshot }: { snapshot: ArchitectureSnapshot }) {
  return (
    <div className="rounded-xl border border-border bg-zinc-950/60 p-3">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">{snapshot.label}</div>
      <svg
        viewBox="0 0 360 120"
        className="h-24 w-full text-xs text-emerald-200"
        role="img"
        aria-label={snapshot.label}
      >
        <rect x="0" y="0" width="360" height="120" rx="12" fill="rgba(9, 9, 11, 0.6)" />
        {snapshot.diagram.map((line, index) => (
          <text
            key={`${index}-${line}`}
            x="18"
            y={24 + index * 14}
            fill="rgba(167, 243, 208, 0.85)"
            fontFamily="var(--font-mono)"
            fontSize="11"
          >
            {line}
          </text>
        ))}
      </svg>
      <p className="mt-2 text-xs text-zinc-400">{snapshot.notes}</p>
    </div>
  );
}
