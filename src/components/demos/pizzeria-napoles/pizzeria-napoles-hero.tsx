"use client";

import Image from "next/image";
import { PIZZERIA_NAPOLES_CONFIG } from "@/lib/pizzeria-napoles";

export function PizzeriaNapolesHero() {
  const cfg = PIZZERIA_NAPOLES_CONFIG;

  return (
    <section id="inicio" className="relative min-h-[72vh] overflow-hidden">
      <Image src={cfg.heroImage} alt="Pizza" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/75 to-zinc-900/30" />
      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-3 pb-14 pt-20 sm:px-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-400">Masa madre · horno de barro</p>
        <h1 className="mt-3 max-w-md font-serif text-4xl font-light leading-tight text-stone-50 sm:text-5xl">
          El antojo no espera.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-stone-400">{cfg.tagline}</p>
        <button
          type="button"
          onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
          className="pn-cta-shine mt-8 w-full max-w-xs rounded-xl bg-red-600 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 hover:bg-red-500 sm:w-auto sm:px-10"
        >
          Ver menú y pedir
        </button>
      </div>
    </section>
  );
}
