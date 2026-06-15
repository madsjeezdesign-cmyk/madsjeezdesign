"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/primitives";
import { GELATO_CO_CONFIG } from "@/lib/gelato-co";

export function GelatoCoHero() {
  const cfg = GELATO_CO_CONFIG;

  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-50">
      <div className="relative min-h-[55vh] sm:min-h-[60vh]">
        <Image src={cfg.heroImage} alt="Helado artesanal" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/80 to-stone-50/40" />
        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-6xl flex-col justify-center px-3 py-16 sm:min-h-[60vh] sm:px-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-rose-400">Artesanal · fresco</p>
          <h1 className="mt-3 max-w-md font-serif text-4xl font-light leading-tight text-stone-900 sm:text-5xl">
            El placer del gelato hecho a mano.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-stone-600">{cfg.tagline}</p>
          <MagneticButton
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            variant="primary"
            strength={6}
            className="mt-8 w-full max-w-xs justify-center !rounded-full !bg-rose-400 !px-8 !py-4 !text-sm !font-bold !uppercase !tracking-[0.04em] !text-white shadow-lg shadow-rose-200/50 hover:!bg-rose-500 sm:w-auto"
          >
            ¡Pedir mi helado!
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
