"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LECLAT_CONFIG } from "@/lib/leclat-salon";

export function LeclatSalonHero() {
  const slides = LECLAT_CONFIG.heroSlides;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = window.setInterval(next, 6500);
    return () => window.clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section id="inicio" className="relative min-h-[88vh] overflow-hidden bg-stone-50 pt-16">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-[1000ms] ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image src={s.image} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/70 to-stone-50/30" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(88vh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <div key={index} className="leclat-hero max-w-xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-rose-400">Belleza con alma</p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-stone-900 sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-lg font-light text-stone-600">{slide.subtitle}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500">{LECLAT_CONFIG.tagline}</p>
          <button
            type="button"
            onClick={() => document.querySelector("#turnos")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 rounded-full border border-rose-300 bg-white px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-rose-600 shadow-sm transition hover:bg-rose-50"
          >
            Reservar tu experiencia
          </button>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-stone-200 bg-white/80 p-2 text-stone-600"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-rose-400" : "w-4 bg-stone-300"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-stone-200 bg-white/80 p-2 text-stone-600"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
