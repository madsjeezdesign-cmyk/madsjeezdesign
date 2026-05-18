"use client";

import { ChevronDown } from "lucide-react";
import { BARBER_CLUB_CONFIG } from "@/lib/the-barber-club";

export function TheBarberClubHero() {
  const cfg = BARBER_CLUB_CONFIG;

  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${cfg.heroImage})` }}
        aria-hidden
      />
      <div className="tbc-hero-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-amber-400">Premium grooming · Palermo</p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl">
          El arte del <span className="tbc-gold-text">corte perfecto</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400 sm:text-lg">
          Experiencia de barbería de autor. Reservá tu turno en segundos y descubrí el club exclusivo para hombres que
          cuidan cada detalle.
        </p>
        <button
          type="button"
          onClick={() => document.getElementById("turnos")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-zinc-950 shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.02]"
        >
          Reservar mi turno
        </button>
        <div className="mt-16 flex justify-center text-zinc-500">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
