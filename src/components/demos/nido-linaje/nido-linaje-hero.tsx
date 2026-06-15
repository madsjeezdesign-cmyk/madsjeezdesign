"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NIDO_LINAJE_CONFIG } from "@/lib/nido-linaje";

export function NidoLinajeHero() {
  const slides = NIDO_LINAJE_CONFIG.heroSlides;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-stone-50 pt-24">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image src={s.image} alt="" fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-stone-50/20 to-stone-50/95" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-8 sm:pb-28">
        <div key={index} className="nl-hero-fade max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-stone-500">
            Colección {index + 1} · {slides.length}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.1] text-stone-900 sm:text-6xl md:text-7xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-lg font-light text-stone-600 sm:text-xl">{slide.subtitle}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-stone-500">
            {NIDO_LINAJE_CONFIG.tagline}. Texturas que abrazan, silencio que restaura.
          </p>
          <button
            type="button"
            onClick={() => document.querySelector("#colecciones")?.scrollIntoView({ behavior: "smooth" })}
            className="group mt-10 inline-flex items-center gap-3 border-b border-stone-800 pb-1 text-[11px] font-medium uppercase tracking-[0.04em] text-stone-900 transition hover:border-stone-500 hover:text-stone-600"
          >
            Explorar las colecciones
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="mt-12 flex items-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300/80 bg-white/60 text-stone-600 backdrop-blur transition hover:bg-white"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-0.5 transition-all duration-500 ${
                  i === index ? "w-10 bg-stone-800" : "w-6 bg-stone-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300/80 bg-white/60 text-stone-600 backdrop-blur transition hover:bg-white"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
