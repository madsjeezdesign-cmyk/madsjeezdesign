"use client";

import { NEXUS_CATEGORIES } from "@/lib/nexus-ferreteria";

const BRANDS = [
  "Milwaukee",
  "DeWalt",
  "Bosch",
  "Stihl",
  "Schneider",
  "Loma Negra",
  "Bahco",
  "Fate",
];

export function ToolsMarquee() {
  const items = [...BRANDS, ...NEXUS_CATEGORIES.map((c) => c.title), ...BRANDS];

  return (
    <section className="border-y border-white/5 bg-zinc-950 py-6" aria-hidden>
      <div className="overflow-hidden">
        <div className="nx-marquee flex w-max gap-12 whitespace-nowrap">
          {[...items, ...items].map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="font-mono text-sm uppercase tracking-[0.04em] text-[color:var(--muted-body)]"
            >
              {label}
              <span className="mx-6 text-orange-500/50">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
