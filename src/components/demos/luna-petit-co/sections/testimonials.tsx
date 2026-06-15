"use client";

import { Star } from "lucide-react";
import { LUNA_TESTIMONIALS } from "@/lib/luna-petit-co";

export function LunaTestimonials() {
  const doubled = [...LUNA_TESTIMONIALS, ...LUNA_TESTIMONIALS];

  return (
    <section className="overflow-hidden bg-[#F8F6F2] py-16 md:py-20">
      <p className="text-center text-[10px] font-medium uppercase tracking-[0.04em] text-neutral-500">Familias</p>
      <h2 className="mt-2 text-center font-serif text-2xl text-neutral-900 md:text-3xl">Lo que dicen</h2>
      <div className="relative mt-10">
        <div className="lp-marquee flex w-max gap-4">
          {doubled.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="w-[min(85vw,320px)] shrink-0 rounded-3xl border border-neutral-200/40 bg-white/60 p-6 backdrop-blur-md"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-200 text-amber-200" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-xs font-medium text-neutral-500">{t.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
