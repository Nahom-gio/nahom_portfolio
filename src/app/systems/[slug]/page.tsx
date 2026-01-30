import { systems } from "@/lib/systems";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { SystemDetailClient } from "@/components/SystemDetailClient";

export default function SystemDetailPage({ params }: { params: { slug: string } }) {
  const normalizedSlug = decodeURIComponent(params.slug).toLowerCase();
  const system = systems.find((item) => item.slug === normalizedSlug);

  if (!system) {
    return (
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <ConsoleHeader />
        <section className="glass-panel border border-border bg-zinc-900/70 p-8">
          <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">Case file not found</div>
          <h1 className="mt-3 text-2xl font-semibold text-zinc-100">
            Unknown system: {params.slug}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Available systems are listed below.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {systems.map((item) => (
              <a
                key={item.slug}
                href={`/systems/${item.slug}`}
                className="rounded-full border border-border bg-zinc-950/60 px-3 py-1 text-xs text-emerald-200"
              >
                {item.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <ConsoleHeader />
      <SystemDetailClient system={system} />
    </main>
  );
}
