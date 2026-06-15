"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/primitives";
import { RAICES_CRIOLLAS_CONFIG } from "@/lib/raices-criollas";

export function RaicesCriollasHero() {
  const cfg = RAICES_CRIOLLAS_CONFIG;

  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-100">
      <div className="relative min-h-[56vh] sm:min-h-[62vh]">
        <Image
          src={cfg.heroImage}
          alt="Mate y tradición argentina"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-100 via-stone-100/92 to-stone-100/40" />
        <div className="relative z-10 mx-auto flex min-h-[56vh] max-w-7xl flex-col justify-center px-3 py-16 sm:min-h-[62vh] sm:px-4">
          <p className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.04em] text-amber-800">
            <span className="live-ping-dot" aria-hidden style={{ background: "#92400e" }} />
            Artesanía · campo · identidad
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-medium leading-tight text-stone-900 sm:text-5xl">
            El alma del campo, en tu mesa.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">{cfg.tagline}</p>
          <div className="mt-8">
            <MagneticButton
              variant="ghost"
              onClick={() => document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" })}
              className="!bg-amber-800 !text-amber-50 !px-8 !py-4 !text-xs !font-semibold !uppercase !tracking-[0.04em] shadow-lg shadow-amber-900/20 hover:!bg-orange-900"
            >
              Explorar la pulpería
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
