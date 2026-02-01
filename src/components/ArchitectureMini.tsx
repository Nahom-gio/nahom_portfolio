import { ArchitectureSnapshot } from "@/lib/systems";

export function ArchitectureMini({ snapshot }: { snapshot: ArchitectureSnapshot }) {
  return (
    <div className="rounded-xl border border-app bg-panel2 p-3">
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">{snapshot.label}</div>
      <svg
        viewBox="0 0 360 120"
        className="h-24 w-full text-xs"
        role="img"
        aria-label={snapshot.label}
      >
        <rect x="0" y="0" width="360" height="120" rx="12" fill="var(--panel2)" />
        {snapshot.diagram.map((line, index) => (
          <text
            key={`${index}-${line}`}
            x="18"
            y={24 + index * 14}
            fill="var(--text)"
            fontFamily="var(--font-mono)"
            fontSize="11"
          >
            {line}
          </text>
        ))}
      </svg>
      <p className="mt-2 text-xs text-muted">{snapshot.notes}</p>
    </div>
  );
}
