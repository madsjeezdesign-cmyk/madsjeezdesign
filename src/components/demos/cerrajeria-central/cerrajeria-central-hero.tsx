"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { CERRAJERIA_CENTRAL_CONFIG } from "@/lib/cerrajeria-central";

type Props = {
  onUrgency: () => void;
  onCatalog: () => void;
};

export function CerrajeriaCentralHero({ onUrgency, onCatalog }: Props) {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;

  return (
    <section id="inicio" className="relative overflow-hidden bg-black">
      <div className="relative min-h-[50vh] sm:min-h-[58vh]">
        <Image src={cfg.heroImage} alt="Llaves y seguridad" fill priority className="object-cover opacity-50" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/60" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-center px-3 py-14 sm:min-h-[58vh] sm:px-4">
          <p className="text-xs font-black uppercase tracking-[0.04em] text-amber-400">24 hs · GBA sur</p>
          <h1 className="mt-4 max-w-xl text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
            Rapidez y seguridad para tu hogar y tu auto
          </h1>
          <p className="mt-4 max-w-lg text-sm text-zinc-400">{cfg.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onUrgency}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-sm font-black uppercase text-zinc-950"
            >
              <Phone className="h-5 w-5" />
              Llamar por urgencia
            </button>
            <button
              type="button"
              onClick={onCatalog}
              className="rounded-lg border-2 border-zinc-600 px-6 py-4 text-sm font-black uppercase text-white hover:border-amber-500"
            >
              Ver catálogo de seguridad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
