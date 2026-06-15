"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/primitives";
import { DECO_BAZAR_CO_CONFIG } from "@/lib/deco-bazar-co";

export function DecoBazarCoHero() {
  const cfg = DECO_BAZAR_CO_CONFIG;

  return (
    <section id="inicio" className="relative overflow-hidden bg-white">
      <div className="relative min-h-[52vh] sm:min-h-[58vh]">
        <Image src={cfg.heroImage} alt="Cocina moderna con vajilla" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
        <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-7xl flex-col justify-center px-3 py-14 sm:min-h-[58vh] sm:px-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-400">Showroom · envíos</p>
          <h1 className="mt-3 max-w-lg text-3xl font-light leading-snug text-zinc-900 sm:text-4xl md:text-5xl">
            Diseño que ordena, objetos que perduran.
          </h1>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[color:var(--muted-body)]">{cfg.tagline}</p>
          <div className="mt-8">
            <MagneticButton
              variant="ghost"
              onClick={() => document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" })}
              className="!bg-zinc-800 !text-white !px-8 !py-4 !text-xs !font-medium !uppercase !tracking-[0.04em] hover:!bg-zinc-700"
            >
              Explorar el catálogo
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
