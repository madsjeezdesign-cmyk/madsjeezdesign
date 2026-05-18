"use client";

import Image from "next/image";
import { INTIMA_CO_CONFIG } from "@/lib/intima-co";

type Props = {
  onCta: () => void;
};

export function IntimaCoHero({ onCta }: Props) {
  const cfg = INTIMA_CO_CONFIG;

  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-50">
      <div className="relative min-h-[58vh] sm:min-h-[65vh]">
        <Image
          src={cfg.heroImage}
          alt="Texturas de lencería premium"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/95 to-stone-50/50" />
        <div className="relative z-10 mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-center px-3 py-16 sm:min-h-[65vh] sm:px-4">
          <p className="text-[10px] font-light uppercase tracking-[0.45em] text-rose-400/90">Minimal luxury</p>
          <h1 className="mt-4 max-w-lg font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl">
            El calce perfecto, cada día.
          </h1>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-stone-600">{cfg.tagline}</p>
          <button
            type="button"
            onClick={onCta}
            className="mt-10 w-full max-w-xs rounded-full bg-stone-900 px-8 py-4 text-xs font-light uppercase tracking-[0.25em] text-stone-50 transition hover:bg-stone-800 sm:w-auto"
          >
            Ver colecciones
          </button>
        </div>
      </div>
    </section>
  );
}
