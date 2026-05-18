"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { GUSTITOS_CONFIG } from "@/lib/gustitos";
import { MagneticButton } from "../shared/magnetic-button";

type Props = { onOrder: () => void };

const PARTICLES = ["🍔", "🔥", "🧀", "✨", "🌶"];

export function Hero({ onOrder }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const cfg = GUSTITOS_CONFIG;

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-zinc-950 pt-28"
      aria-labelledby="gu-hero-title"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.25),transparent_55%)]"
        style={{ y: yBg }}
      />
      <div className="pointer-events-none absolute inset-0 gu-grain" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 gu-smoke" />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={p}
          className="pointer-events-none absolute text-2xl opacity-30"
          style={{ left: `${10 + i * 17}%`, top: `${15 + (i % 2) * 20}%` }}
          animate={{ y: [0, -16, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          {p}
        </motion.span>
      ))}

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6" style={{ opacity }}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            {cfg.isOpen && (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Abierto ahora · delivery activo
              </span>
            )}
            <h1
              id="gu-hero-title"
              className="mt-6 font-[family-name:var(--font-gu-display)] text-6xl uppercase leading-[0.9] tracking-wide text-white sm:text-8xl gu-text-glow"
            >
              {cfg.brand}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-zinc-400">{cfg.tagline}</p>
            <p className="mt-2 text-sm font-medium text-amber-400/90">{cfg.promo}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                onClick={onOrder}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-red-500/40"
              >
                Pedir smash ahora
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#menu"
                className="inline-flex items-center rounded-xl border border-white/10 px-8 py-4 text-sm font-medium text-white hover:border-red-500/40"
              >
                Ver menú completo
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto aspect-square w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.9, type: "spring", stiffness: 80 }}
          >
            <motion.div
              className="absolute inset-8 rounded-full bg-red-600/30 blur-3xl"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={cfg.heroImage}
                alt="Smash burger GUSTITOS"
                fill
                className="object-contain drop-shadow-[0_40px_80px_rgba(220,38,38,0.5)]"
                priority
                sizes="(max-width:1024px) 90vw, 50vw"
              />
            </motion.div>
            <motion.div
              className="absolute -right-2 top-8 flex items-center gap-1 rounded-xl border border-amber-400/30 bg-zinc-900/90 px-3 py-2 backdrop-blur-xl"
              animate={{ rotate: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">VIRAL EDITION</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
