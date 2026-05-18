"use client";

import Image from "next/image";
import { ArrowDown, Flame } from "lucide-react";
import { MASA_MADRE_CONFIG } from "@/lib/masa-madre-co";

export function MasaMadreCoHero() {
  const cfg = MASA_MADRE_CONFIG;

  const scroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] overflow-hidden pt-16">
      <Image
        src={cfg.heroImage}
        alt="Pan recién horneado"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="mmc-hero-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[calc(92vh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-orange-800 backdrop-blur">
          <Flame className="h-3.5 w-3.5 text-orange-600" />
          Horneado artesanal · Carlos Spegazzini
        </span>
        <h1 className="mt-6 max-w-2xl font-serif text-4xl font-bold leading-tight text-stone-900 sm:text-5xl md:text-6xl">
          {cfg.brand}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-stone-700 sm:text-xl">
          {cfg.tagline}. Cada pieza nace de masa madre, tiempo y manos que aman el oficio.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scroll("#menu")}
            className="rounded-full bg-orange-700 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-300/40 transition hover:bg-orange-800"
          >
            Hacer pedido
          </button>
          <button
            type="button"
            onClick={() => scroll("#menu")}
            className="rounded-full border-2 border-stone-800/20 bg-white/90 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-stone-800 backdrop-blur transition hover:border-orange-400"
          >
            Ver menú del día
          </button>
        </div>
        <button
          type="button"
          onClick={() => scroll("#horno")}
          className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-600"
          aria-label="Ver horno"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Hornos en vivo
        </button>
      </div>
    </section>
  );
}
