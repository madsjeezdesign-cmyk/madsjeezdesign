"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CENTRAL_BEBIDAS_CONFIG, formatBebidaPrice } from "@/lib/central-bebidas";

function useCountdown(endsAt: number) {
  const [left, setLeft] = useState(() => Math.max(0, endsAt - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft(Math.max(0, endsAt - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const h = Math.floor(left / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CentralBebidasHero() {
  const slides = CENTRAL_BEBIDAS_CONFIG.heroSlides;
  const offers = CENTRAL_BEBIDAS_CONFIG.flashOffers;
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section id="inicio" className="border-b border-zinc-800 bg-zinc-950">
      <div className="relative aspect-[16/10] max-h-[420px] w-full overflow-hidden sm:aspect-[21/9]">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={s.image} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
          </div>
        ))}
        <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-8">
          <h1 className="max-w-lg text-3xl font-black uppercase leading-tight text-white sm:text-4xl">{slide.title}</h1>
          <p className="mt-2 text-sm font-medium text-lime-400 sm:text-base">{slide.subtitle}</p>
          <button
            type="button"
            onClick={() => document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 w-fit rounded-xl bg-amber-500 px-6 py-3 text-xs font-black uppercase tracking-[0.04em] text-zinc-950 hover:bg-amber-400"
          >
            Ver catálogo
          </button>
        </div>
        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
          <button type="button" onClick={prev} className="rounded-lg bg-zinc-900/80 p-2 text-white" aria-label="Anterior">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={next} className="rounded-lg bg-zinc-900/80 p-2 text-white" aria-label="Siguiente">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 px-3 py-4 sm:grid-cols-2 sm:px-4">
        {offers.map((offer) => (
          <FlashCard key={offer.id} title={offer.title} endsAt={offer.endsAt} />
        ))}
      </div>
    </section>
  );
}

function FlashCard({ title, endsAt }: { title: string; endsAt: number }) {
  const countdown = useCountdown(endsAt);
  return (
    <div className="cdb-pulse-offer flex items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-zinc-900 px-4 py-3">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-400" />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.04em] text-amber-400">Oferta relámpago</p>
          <p className="text-sm font-bold text-white">{title}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[9px] uppercase text-[color:var(--muted-body)]">Termina en</p>
        <p className="font-mono text-lg font-black text-lime-400">{countdown}</p>
      </div>
    </div>
  );
}
