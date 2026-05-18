"use client";

import { motion } from "framer-motion";
import { GUSTITOS_CATEGORIES, type GustitosCategoryId } from "@/lib/gustitos";

type Props = {
  active: GustitosCategoryId | "all";
  onSelect: (id: GustitosCategoryId | "all") => void;
};

export function Categories({ active, onSelect }: Props) {
  return (
    <section id="categorias" className="bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-500">Menú</p>
        <h2 className="mt-2 font-[family-name:var(--font-gu-display)] text-4xl uppercase text-white sm:text-5xl">
          Elegí tu vicio
        </h2>
        <motion.div
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {GUSTITOS_CATEGORIES.map((cat) => {
            const on = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                onClick={() => onSelect(on ? "all" : cat.id)}
                className={`relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                  on ? "border-red-500/50 ring-1 ring-red-500/30" : "border-white/10 hover:border-white/20"
                }`}
                style={{ boxShadow: on ? `0 0 48px ${cat.glow}` : undefined }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90`} />
                <div className="relative">
                  <span className="text-3xl">{cat.emoji}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{cat.title}</h3>
                  <p className="text-sm text-zinc-400">{cat.subtitle}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
