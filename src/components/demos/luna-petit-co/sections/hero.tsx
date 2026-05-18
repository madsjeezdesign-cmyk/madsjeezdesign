"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LUNA_PETIT_CO_CONFIG } from "@/lib/luna-petit-co";
import { MagneticButton } from "../shared/magnetic-button";

type Props = {
  onShop: () => void;
};

export function LunaHero({ onShop }: Props) {
  const cfg = LUNA_PETIT_CO_CONFIG;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section ref={ref} id="inicio" className="relative min-h-[100svh] overflow-hidden bg-[#F8F6F2] pt-20">
      <div className="lp-noise pointer-events-none absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(232,213,208,0.35),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(197,217,232,0.25),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl gap-8 px-4 py-8 md:grid-cols-12 md:px-6 md:py-12">
        <motion.div
          style={{ opacity }}
          className="flex flex-col justify-center md:col-span-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[10px] font-medium uppercase tracking-[0.45em] text-neutral-500"
          >
            Otoño 2026 · edición limitada
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-neutral-900"
          >
            Los primeros años,
            <br />
            <span className="text-neutral-500">vestidos de luz.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600"
          >
            {cfg.tagline}. Algodón orgánico, siluetas editoriales y el confort que merecen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={onShop}
              className="rounded-full bg-neutral-900 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#F8F6F2] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]"
            >
              Explorar colección
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="relative md:col-span-7">
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-auto md:min-h-[70vh]">
            <Image src={cfg.heroImage} alt="" fill priority className="object-cover" sizes="60vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
            className="absolute -bottom-4 left-4 max-w-[200px] rounded-2xl border border-white/30 bg-white/75 p-4 shadow-xl backdrop-blur-xl md:-left-8 md:bottom-12"
          >
            <p className="text-[9px] uppercase tracking-widest text-neutral-500">Nuevo</p>
            <p className="mt-1 font-serif text-lg text-neutral-900">Abrigo lana merino</p>
            <p className="text-xs text-neutral-600">Desde $78.900</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-8 hidden rounded-2xl border border-white/20 bg-white/60 px-4 py-3 backdrop-blur-lg md:block"
          >
            <p className="text-[9px] font-medium uppercase tracking-widest text-neutral-500">Envío gratis</p>
            <p className="text-xs text-neutral-700">Compras +$85.000</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
