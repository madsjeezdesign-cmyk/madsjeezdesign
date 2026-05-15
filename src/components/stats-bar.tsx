import { stats } from "@/lib/data";

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:py-14">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-[family-name:var(--font-instrument)] text-3xl text-foreground md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
