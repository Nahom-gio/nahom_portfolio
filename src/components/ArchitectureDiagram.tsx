import { ArchitectureDiagram as Diagram } from "@/lib/systems";

export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <svg
      viewBox={diagram.viewBox}
      className="h-full w-full rounded-xl border border-border bg-zinc-950/60"
      role="img"
      aria-label="System architecture diagram"
    >
      <defs>
        <linearGradient id="nodeFill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(24,24,27,0.9)" />
          <stop offset="100%" stopColor="rgba(9,9,11,0.9)" />
        </linearGradient>
      </defs>
      {diagram.edges.map((edge, index) => {
        const from = diagram.nodes.find((node) => node.id === edge.from);
        const to = diagram.nodes.find((node) => node.id === edge.to);
        if (!from || !to) return null;
        const fromX = from.x + (from.width ?? 120) / 2;
        const fromY = from.y + (from.height ?? 46) / 2;
        const toX = to.x + (to.width ?? 120) / 2;
        const toY = to.y + (to.height ?? 46) / 2;
        return (
          <g key={`${edge.from}-${edge.to}-${index}`}>
            <line
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {edge.label ? (
              <text
                x={(fromX + toX) / 2}
                y={(fromY + toY) / 2 - 6}
                fill="rgba(148, 163, 184, 0.8)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {diagram.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.width ?? 120}
            height={node.height ?? 46}
            rx="10"
            fill="url(#nodeFill)"
            stroke="rgba(63, 63, 70, 0.8)"
            strokeWidth="1.2"
          />
          <text
            x={node.x + (node.width ?? 120) / 2}
            y={node.y + (node.height ?? 46) / 2 + 4}
            textAnchor="middle"
            fill="rgba(226, 232, 240, 0.9)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
