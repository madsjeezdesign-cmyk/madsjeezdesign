"use client";

import Image from "next/image";
import { MagneticButton } from "@/components/primitives";
import { BURGER_LAB_CONFIG } from "@/lib/burger-lab";

export function BurgerLabHero() {
  const cfg = BURGER_LAB_CONFIG;

  return (
    <section id="inicio" className="relative min-h-[70vh] overflow-hidden">
      <Image src={cfg.heroImage} alt="Smash burger" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-3 pb-12 pt-20 sm:px-4 sm:pb-16">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 text-[10px] font-black uppercase text-green-400 sm:hidden">
          <span className="live-ping-dot" aria-hidden />
          Abierto ahora
        </span>
        <h1 className="mt-4 max-w-lg text-4xl font-black uppercase leading-none text-white sm:text-6xl">
          Smash.<br />
          <span className="text-amber-400">Queso.</span>
          <br />
          Ahora.
        </h1>
        <p className="mt-4 max-w-sm text-sm font-medium text-zinc-400">{cfg.tagline}</p>
        <MagneticButton
          onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
          variant="primary"
          strength={6}
          className="bl-pulse-cta mt-8 w-full max-w-xs justify-center !rounded-xl !bg-orange-500 !py-4 !text-sm !font-black !uppercase !tracking-[0.04em] !text-zinc-950 sm:w-auto sm:!px-10"
        >
          ¡Pedir ahora!
        </MagneticButton>
      </div>
    </section>
  );
}
