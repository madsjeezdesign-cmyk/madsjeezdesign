"use client";

import Image from "next/image";
import { ArrowRight, Calculator, Check, MapPin, ShoppingBag, Sparkles } from "lucide-react";
import { ARANA_283_CONFIG, type AranaStoreStatus } from "@/lib/arana-283";

type Props = {
  storeStatus: AranaStoreStatus;
  onTab: (tab: string) => void;
};

export function Arana283Home({ storeStatus, onTab }: Props) {
  const cfg = ARANA_283_CONFIG;

  return (
    <main className="arana-fade-in">
      <div className="border-b border-slate-800 bg-slate-950 py-3 text-center px-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 sm:flex-row">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black uppercase ${
              storeStatus.open
                ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/35"
                : "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/35"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${storeStatus.open ? "animate-pulse bg-emerald-400" : "bg-rose-400"}`} />
            {storeStatus.open ? "Local abierto" : "Local cerrado"}
          </span>
          <p className="text-xs font-semibold text-slate-400">{storeStatus.text}</p>
        </div>
      </div>

      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 translate-x-1/2 translate-y-1/2 rounded-full bg-pink-500/15 blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-black uppercase tracking-[0.04em] text-purple-400">
                <Sparkles className="h-4 w-4" /> La evolución de la moda circular
              </span>
              <h1 className="text-4xl font-black leading-none tracking-tight text-white sm:text-6xl">
                Ropa premium con{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-lime-300 bg-clip-text text-transparent">
                  vibe moderno.
                </span>
              </h1>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                Compramos y vendemos prendas seleccionadas de las mejores marcas en Ezeiza. Estilo impecable y
                precios disruptivos.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <button
                  type="button"
                  onClick={() => onTab("catalogo")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.04em] text-white shadow-lg hover:shadow-purple-500/20"
                >
                  <ShoppingBag className="h-4 w-4" /> Explorar catálogo
                </button>
                <button
                  type="button"
                  onClick={() => onTab("cotizador")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.04em] text-slate-100 hover:border-slate-700"
                >
                  <Calculator className="h-4 w-4" /> Cotizar mi ropa
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 pt-6 text-xs font-bold text-slate-500 lg:justify-start">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-lime-400" /> Lavadas y planchadas
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-lime-400" /> Pago en efectivo
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-lime-400" /> +20% en canje
                </span>
              </div>
            </div>
            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1.5 animate-pulse rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 opacity-30 blur" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
                  <div className="relative h-[340px] overflow-hidden rounded-2xl bg-slate-950 sm:h-[400px]">
                    <Image src={cfg.heroImage} alt="ARANA 283" fill className="object-cover opacity-90" sizes="400px" priority />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/90 p-4 backdrop-blur-md">
                      <div>
                        <span className="block text-[10px] font-extrabold uppercase text-slate-500">Boutique circular</span>
                        <span className="flex items-center gap-1 text-sm font-black text-white">
                          <MapPin className="h-4 w-4 text-pink-500" /> Arana 283, Ezeiza
                        </span>
                      </div>
                      <a
                        href={cfg.mapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white hover:bg-purple-500"
                        aria-label="Mapa"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-900 bg-slate-950 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4 sm:px-6">
          {[
            ["100%", "Filtro de selección"],
            ["+5000", "Prendas circuladas"],
            ["En el acto", "Pago efectivo"],
            ["+20%", "Valor por canje"],
          ].map(([n, l]) => (
            <div key={l}>
              <h3 className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-3xl font-black text-transparent">{n}</h3>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#09090b] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.04em] text-pink-500">Tu closet inteligente</span>
            <h2 className="text-3xl font-black text-white">¿Qué querés hacer hoy?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:border-purple-500/50">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/10 text-purple-400">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-purple-400">Quiero comprar</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Prendas únicas de marcas nacionales e internacionales. Reservá online y retirá en Ezeiza.
                </p>
              </div>
              <button type="button" onClick={() => onTab("catalogo")} className="mt-8 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.04em] text-purple-400">
                Explorar stock <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/40 p-8 hover:border-pink-500/50">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-pink-400">Quiero vender</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Traé lotes miércoles y sábados. Efectivo al instante o crédito con 20% extra.
                </p>
              </div>
              <button type="button" onClick={() => onTab("cotizador")} className="mt-8 flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.04em] text-pink-400">
                Calcular valuación <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-slate-900 bg-slate-950 py-5">
        <div className="arana-marquee-track flex w-max whitespace-nowrap font-serif text-lg italic tracking-[0.04em] text-purple-400/80">
          {[0, 1].map((dup) => (
            <span key={dup} className="mx-8">
              {cfg.marqueeText}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
