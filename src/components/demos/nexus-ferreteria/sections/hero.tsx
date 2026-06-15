"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gauge, Package, Shield } from "lucide-react";
import { useRef } from "react";
import { NEXUS_FERRETERIA_CONFIG } from "@/lib/nexus-ferreteria";
import { MagneticButton } from "../shared/magnetic-button";

type Props = { onCta: () => void; inventoryCount: number };

const FLOAT_TOOLS = ["🔩", "⚡", "🔧", "🪛", "📐"];

export function Hero({ onCta, inventoryCount }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const cfg = NEXUS_FERRETERIA_CONFIG;

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-zinc-950 pt-28"
      aria-labelledby="nx-hero-title"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 nx-grid-tech opacity-40"
        style={{ y }}
      />
      <div className="pointer-events-none absolute inset-0 nx-noise" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]" />

      {FLOAT_TOOLS.map((icon, i) => (
        <motion.span
          key={icon}
          className="pointer-events-none absolute text-3xl opacity-20"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 15}%`,
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          {icon}
        </motion.span>
      ))}

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6" style={{ opacity }}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.04em] text-orange-400">
              Spegazzini · GBA Sur · Stock en vivo
            </p>
            <h1
              id="nx-hero-title"
              className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              La ferretería
              <span className="block bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
                del futuro
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-400">{cfg.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-[0.04em] text-black shadow-lg shadow-orange-500/30"
              >
                Explorar catálogo
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#servicios"
                className="inline-flex items-center rounded-lg border border-white/10 px-8 py-4 text-sm font-medium text-white transition hover:border-orange-500/40"
              >
                Servicios técnicos
              </a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <BentoPanel
              icon={<Gauge className="h-5 w-5 text-orange-400" />}
              label="Inventario"
              value={inventoryCount.toLocaleString("es-AR")}
              suffix=" SKUs"
              className="col-span-2"
            />
            <BentoPanel
              icon={<Package className="h-5 w-5 text-amber-400" />}
              label="Retiro"
              value="15"
              suffix=" min"
            />
            <BentoPanel
              icon={<Shield className="h-5 w-5 text-emerald-400" />}
              label="Garantía"
              value="Pro"
              suffix=""
            />
            <motion.div
              className="col-span-2 relative h-48 overflow-hidden rounded-2xl border border-white/10"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cfg.heroImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <p className="absolute bottom-4 left-4 font-mono text-xs text-orange-300">
                DEPÓSITO NEXUS · LIVE STOCK
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="block h-8 w-px bg-gradient-to-b from-orange-500/0 via-orange-500 to-orange-500/0" />
      </motion.div>
    </section>
  );
}

function BentoPanel({
  icon,
  label,
  value,
  suffix,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-xl ${className}`}
      whileHover={{ borderColor: "rgba(249,115,22,0.4)" }}
    >
      {icon}
      <p className="mt-2 text-xs uppercase tracking-[0.04em] text-[color:var(--muted-body)]">{label}</p>
      <p className="font-mono text-2xl font-bold text-white">
        {value}
        <span className="text-sm font-normal text-[color:var(--muted-body)]">{suffix}</span>
      </p>
    </motion.div>
  );
}
