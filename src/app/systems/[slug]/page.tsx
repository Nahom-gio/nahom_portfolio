import { notFound } from "next/navigation";
import { systems } from "@/lib/systems";
import { ConsoleHeader } from "@/components/ConsoleHeader";
import { SystemDetailClient } from "@/components/SystemDetailClient";

export default function SystemDetailPage({ params }: { params: { slug: string } }) {
  const system = systems.find((item) => item.slug === params.slug);
  if (!system) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <ConsoleHeader />
      <SystemDetailClient system={system} />
    </main>
  );
}