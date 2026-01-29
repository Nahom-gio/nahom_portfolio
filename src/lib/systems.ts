export const capabilities = [
  "Temporal",
  "NATS",
  "Supabase",
  "MinIO",
  "PDF/Excel",
  "Auth",
  "Analytics",
  "Deploy",
] as const;

export type Capability = (typeof capabilities)[number];

export type ArchitectureSnapshot = {
  label: string;
  diagram: string[];
  notes: string;
};

export type ArchitectureDiagram = {
  viewBox: string;
  nodes: Array<{
    id: string;
    x: number;
    y: number;
    label: string;
    width?: number;
    height?: number;
  }>;
  edges: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
};

export type System = {
  name: string;
  slug: string;
  timeframe: string;
  mission: string;
  tags: string[];
  capabilities: Capability[];
  stack: {
    core: string[];
    data: string[];
    infra: string[];
    integrations: string[];
  };
  highlights: string[];
  constraints: string[];
  architecture: ArchitectureSnapshot;
  architectureDiagram: ArchitectureDiagram;
  decisions: string[];
  reliability: string[];
  domain: string;
  complexity: number;
};

export const systems: System[] = [
  {
    name: "Quote Commerce",
    slug: "quote-commerce",
    timeframe: "Aug 2025 – 2026",
    mission: "Document parsing + RFQ/quote workflow automation.",
    tags: ["Parsing", "Workflow", "Multi-tenant", "Pricing"],
    capabilities: ["Temporal", "NATS", "PDF/Excel", "Auth", "Analytics"],
    stack: {
      core: ["TypeScript", "Node.js", "NestJS", "CQRS", "DDD", "Clean Architecture"],
      data: ["MongoDB", "YAML config"],
      infra: ["Temporal", "NATS"],
      integrations: ["Shopify API", "Gmail API", "LangChain/LangGraph", "pdf-parse", "csv-parser", "xlsx", "OCR adapter"],
    },
    highlights: [
      "Built multi-format parsing pipeline for PDF/CSV/Excel attachments: text + structured rows + metadata enrichment",
      "Format detection + schema validation + normalization for downstream automation",
      "Prepared outputs for LLM analysis and email response automation",
      "Eventing via NATS; long-running workflows via Temporal (activities/signals)",
      "Multi-tenant pricing engine + multi-currency config",
      "Routing rules per supplier with deterministic trace IDs",
    ],
    constraints: [
      "Mixed-quality vendor documents with missing headers",
      "Latency-sensitive quote turnaround",
      "Strict tenant data isolation",
    ],
    architecture: {
      label: "Ingestion + workflow mesh",
      diagram: [
        "[Email/Upload]",
        "      |",
        "[Detector] -> [Parser] -> [Normalizer]",
        "      |            |",
        "   [NATS]     [LLM Prep]",
        "      |            |",
        "   [Temporal Orchestration]",
        "      |",
        "[Quote Engine]",
      ],
      notes: "Event-driven parsing with Temporal orchestration for multi-step RFQ workflows.",
    },
    architectureDiagram: {
      viewBox: "0 0 560 240",
      nodes: [
        { id: "ingest", x: 30, y: 30, label: "Email / Upload", width: 140 },
        { id: "detect", x: 220, y: 30, label: "Detector" },
        { id: "parse", x: 360, y: 30, label: "Parser" },
        { id: "normalize", x: 360, y: 110, label: "Normalizer" },
        { id: "nats", x: 220, y: 110, label: "NATS Bus" },
        { id: "temporal", x: 220, y: 180, label: "Temporal Orchestrator", width: 180 },
        { id: "quote", x: 30, y: 180, label: "Quote Engine", width: 140 },
        { id: "llm", x: 360, y: 180, label: "LLM Prep" },
      ],
      edges: [
        { from: "ingest", to: "detect" },
        { from: "detect", to: "parse" },
        { from: "parse", to: "normalize" },
        { from: "detect", to: "nats" },
        { from: "normalize", to: "nats" },
        { from: "nats", to: "temporal" },
        { from: "temporal", to: "quote" },
        { from: "normalize", to: "llm" },
      ],
    },
    decisions: [
      "Separated parsing stages (detect → parse → normalize) to isolate document variance and keep schema validation deterministic.",
      "Used Temporal for long-running RFQ workflows to support retries and manual intervention without blocking the queue.",
      "Kept LLM preparation downstream of normalization to guarantee stable prompt inputs.",
    ],
    reliability: [
      "Retryable parsing activities with backoff and dead-letter routes",
      "Schema validation + type guards before persistence",
      "Tenant-aware access policies on ingestion and export",
    ],
    domain: "automation",
    complexity: 5,
  },
  {
    name: "Carbon Sky Index",
    slug: "carbon-sky-index",
    timeframe: "Oct 2025 – Jan 2026",
    mission: "Emissions intelligence platform with analytics + watchlist alerts.",
    tags: ["Analytics", "Watchlists", "Subscriptions"],
    capabilities: ["Supabase", "Auth", "Analytics", "Deploy"],
    stack: {
      core: ["Next.js 15", "React 19", "TypeScript", "Tailwind"],
      data: ["Supabase (Postgres + Edge Functions)", "Zod", "Sanity"],
      infra: ["PostHog", "Sentry"],
      integrations: ["Clerk", "Stripe", "Leaflet", "TomTom", "Turf.js", "React Email", "Resend", "Recharts"],
    },
    highlights: [
      "Typed Supabase DAL for flights, leaderboards, routes, airports, aircraft, ownership inference, watchlists, subscriptions, profiles",
      "Analytics/aggregation: totals/averages, trends, leaderboards, route metrics",
      "RLS-aware server patterns + service-role reads",
      "Edge Functions for alerts (email/Slack) + monthly summary job",
      "SQL RPC for daily watchlist emissions aggregation",
      "Standardized error handling/logging",
    ],
    constraints: [
      "RLS enforcement for multi-tenant analytics",
      "High-volume aggregation with daily batch windows",
      "Subscription gating for premium dashboards",
    ],
    architecture: {
      label: "Analytics + alerting",
      diagram: [
        "[Ingest] -> [Supabase DAL] -> [Aggregates]",
        "     |              |            |",
        " [RLS]        [RPC Jobs]     [Dashboards]",
        "                      |",
        "               [Edge Alerts]",
      ],
      notes: "Server-driven analytics with edge alerts and RLS-aware DAL.",
    },
    architectureDiagram: {
      viewBox: "0 0 560 220",
      nodes: [
        { id: "ingest", x: 30, y: 30, label: "Ingest + ETL", width: 140 },
        { id: "dal", x: 220, y: 30, label: "Supabase DAL" },
        { id: "agg", x: 410, y: 30, label: "Aggregates" },
        { id: "rls", x: 220, y: 110, label: "RLS Gates" },
        { id: "rpc", x: 410, y: 110, label: "SQL RPC Jobs" },
        { id: "dash", x: 410, y: 180, label: "Dashboards" },
        { id: "alerts", x: 220, y: 180, label: "Edge Alerts" },
      ],
      edges: [
        { from: "ingest", to: "dal" },
        { from: "dal", to: "agg" },
        { from: "dal", to: "rls" },
        { from: "agg", to: "rpc" },
        { from: "rpc", to: "alerts" },
        { from: "rpc", to: "dash" },
        { from: "rls", to: "dash" },
      ],
    },
    decisions: [
      "Centralized DAL to enforce RLS boundaries and keep service-role reads explicit.",
      "Used SQL RPC for heavy aggregation to reduce client compute and keep metrics consistent.",
      "Alerts handled in edge functions to keep latency low for watchlist notifications.",
    ],
    reliability: [
      "Structured logging with Sentry + PostHog traces",
      "Validated inputs with Zod before DB access",
      "Service-role reads isolated from public queries",
    ],
    domain: "analytics",
    complexity: 4,
  },
  {
    name: "E.D.G.E Platform",
    slug: "edge-platform",
    timeframe: "Oct 2025 – Jan 2026",
    mission: "Enterprise education backend: assessment import/export + invoicing PDFs.",
    tags: ["Exports", "Storage", "Invoicing"],
    capabilities: ["Temporal", "MinIO", "PDF/Excel", "Auth", "Deploy"],
    stack: {
      core: ["NestJS", "TypeScript", "CQRS"],
      data: ["PostgreSQL", "Mikro-ORM", "Redis"],
      infra: ["MinIO (S3)", "Temporal.io", "Docker"],
      integrations: ["ExcelJS/xlsx", "PDFKit", "JWT/JWKS"],
    },
    highlights: [
      "Marklist/marksheet export workflows: structured Excel outputs with validation + formatting",
      "Import pipelines: schema validation, error reporting, normalization",
      "CQRS command/query for invoice PDF generation + streaming downloads",
      "MinIO storage + checksumming + metadata persistence",
      "Secured APIs with JWT-based access control",
      "Queue-aware scheduling for large cohort exports",
    ],
    constraints: [
      "Large batch exports with strict formatting rules",
      "Attachment integrity requirements",
      "JWT issuer rotation handling",
    ],
    architecture: {
      label: "Workflowed exports",
      diagram: [
        "[Admin UI]",
        "    |",
        "[Import/Export API] -> [Temporal]",
        "    |                     |",
        "[Postgres]          [PDF/Excel Jobs]",
        "    |                     |",
        "  [MinIO] <------ [Checksums]",
      ],
      notes: "Temporal-managed export pipelines with MinIO persistence and validation.",
    },
    architectureDiagram: {
      viewBox: "0 0 560 240",
      nodes: [
        { id: "admin", x: 30, y: 30, label: "Admin UI", width: 130 },
        { id: "api", x: 220, y: 30, label: "Import/Export API", width: 170 },
        { id: "temporal", x: 430, y: 30, label: "Temporal", width: 110 },
        { id: "postgres", x: 220, y: 110, label: "Postgres", width: 140 },
        { id: "jobs", x: 430, y: 110, label: "PDF/Excel Jobs", width: 120 },
        { id: "minio", x: 220, y: 180, label: "MinIO (S3)", width: 140 },
        { id: "checksum", x: 430, y: 180, label: "Checksums", width: 120 },
      ],
      edges: [
        { from: "admin", to: "api" },
        { from: "api", to: "temporal" },
        { from: "api", to: "postgres" },
        { from: "temporal", to: "jobs" },
        { from: "jobs", to: "minio" },
        { from: "minio", to: "checksum" },
      ],
    },
    decisions: [
      "Temporal orchestrates export jobs to avoid long-running HTTP requests.",
      "MinIO chosen for on-prem compatible storage with S3 parity.",
      "Checksumming baked in to guarantee document integrity for audits.",
    ],
    reliability: [
      "Streaming downloads to avoid memory spikes",
      "Checksums on every stored artifact",
      "JWT/JWKS rotation with cached keys",
    ],
    domain: "education",
    complexity: 5,
  },
  {
    name: "Genesis AI Labs Website",
    slug: "genesis-ai-labs-website",
    timeframe: "Aug 2025 – Dec 2025",
    mission: "Company website + secure contact API + deployment.",
    tags: ["Web", "Security", "Deploy"],
    capabilities: ["Auth", "Deploy"],
    stack: {
      core: ["React 18", "Vite", "React Router 6", "Tailwind", "Radix UI"],
      data: ["Express"],
      infra: ["Netlify", "Docker", "Nginx"],
      integrations: ["Turnstile", "Telegram"],
    },
    highlights: [
      "Section-based layout system, sticky header, mobile menu, language selector",
      "Centralized typed content modules for services/products/copy",
      "Express /api/contact with Turnstile validation, sanitization, rate limiting, Telegram notifications",
      "Netlify proxying + Docker multi-stage build + nginx reverse proxy + SPA fallbacks",
      "Operational runbook for deploy + rollback",
    ],
    constraints: [
      "Security posture for public contact endpoints",
      "Multi-language content updates without CMS",
      "Netlify routing edge cases",
    ],
    architecture: {
      label: "Static + secure API",
      diagram: [
        "[Vite SPA] -> [Netlify Edge]",
        "     |               |",
        " [Content]      [Express API]",
        "                    |",
        "               [Turnstile]",
        "                    |",
        "               [Telegram]",
      ],
      notes: "Static web front with hardened API and deployment proxying.",
    },
    architectureDiagram: {
      viewBox: "0 0 560 220",
      nodes: [
        { id: "spa", x: 30, y: 40, label: "Vite SPA", width: 130 },
        { id: "edge", x: 220, y: 40, label: "Netlify Edge", width: 140 },
        { id: "api", x: 410, y: 40, label: "Express API", width: 120 },
        { id: "turnstile", x: 410, y: 110, label: "Turnstile", width: 120 },
        { id: "telegram", x: 410, y: 180, label: "Telegram", width: 120 },
        { id: "content", x: 30, y: 140, label: "Typed Content", width: 130 },
      ],
      edges: [
        { from: "spa", to: "edge" },
        { from: "edge", to: "api" },
        { from: "api", to: "turnstile" },
        { from: "turnstile", to: "telegram" },
        { from: "content", to: "spa" },
      ],
    },
    decisions: [
      "Static-first delivery to keep performance consistent under load.",
      "Contact API isolated and rate-limited to protect inbound channels.",
      "Netlify proxying to simplify multi-environment deployments.",
    ],
    reliability: [
      "Rate limiting + sanitization on inbound contact",
      "Bot verification with Turnstile",
      "Deploy pipeline with rollback plan",
    ],
    domain: "web",
    complexity: 3,
  },
];

export const profile = {
  name: "Nahom Gebregiorgis",
  role: "Software Engineer (Backend)",
  location: "Addis Ababa, Ethiopia",
  email: "nahomesd@gmail.com",
  github: "https://github.com/Nahom-gio",
  bio: "Backend engineer focused on systems that ingest messy data, orchestrate long-running workflows, and ship observable infrastructure for fast decision-making.",
  bio2: "I build resilient pipelines, automation, and analytics with a bias for clean contracts, strict validation, and operational clarity.",
  signals: [
    "Workflow orchestration across Temporal + event-driven pipelines",
    "Parsing + normalization for multi-format exports and imports",
    "Secure multi-tenant APIs with auditable access paths",
    "Operational analytics with watchlists, alerts, and summaries",
    "PDF/Excel automation with integrity checks",
  ],
};

export const liveLogs = [
  {
    ts: "2026-01-29 21:12:04",
    level: "INFO",
    system: "Quote Commerce",
    message: "Ingested RFQ attachment: 6 files detected, 3 formats parsed.",
  },
  {
    ts: "2026-01-29 21:12:19",
    level: "WARN",
    system: "E.D.G.E Platform",
    message: "Validation warning: 2 row anomalies flagged in marksheet export.",
  },
  {
    ts: "2026-01-29 21:12:36",
    level: "INFO",
    system: "Carbon Sky Index",
    message: "Daily watchlist aggregation completed in 42s (1,824 routes).",
  },
  {
    ts: "2026-01-29 21:12:48",
    level: "INFO",
    system: "Quote Commerce",
    message: "Temporal workflow resumed with supplier-specific pricing rules.",
  },
  {
    ts: "2026-01-29 21:13:02",
    level: "ERROR",
    system: "Genesis AI Labs Website",
    message: "Contact API rate limiter triggered for 3rd burst window.",
  },
];
