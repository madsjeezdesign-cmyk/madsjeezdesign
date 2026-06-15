"use client";

import { SpotlightCard } from "@/components/primitives";
import { GUSTITOS_TESTIMONIALS } from "@/lib/gustitos";

export function Testimonials() {
  const items = [...GUSTITOS_TESTIMONIALS, ...GUSTITOS_TESTIMONIALS];

  return (
    <section className="overflow-hidden border-t border-white/5 bg-zinc-950 py-16">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.04em] text-red-500">
        Lo que dicen
      </p>
      <div className="gu-marquee flex w-max gap-6">
        {items.map((t, i) => (
          <SpotlightCard
            key={`${t.name}-${i}`}
            variant="transparent"
            glowColor="rgba(239, 68, 68, 0.45)"
            size={260}
            className="w-80 shrink-0 !rounded-2xl border border-red-500/10 bg-zinc-900/80 p-6 backdrop-blur-xl"
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j}>★</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-zinc-300">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.04em] text-red-400">{t.name}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
