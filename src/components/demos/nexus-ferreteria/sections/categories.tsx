"use client";

import { motion } from "framer-motion";
import { NEXUS_CATEGORIES, type NexusCategoryId } from "@/lib/nexus-ferreteria";

type Props = {
  active: NexusCategoryId | "all";
  onSelect: (id: NexusCategoryId | "all") => void;
};

export function Categories({ active, onSelect }: Props) {
  return (
    <section id="categorias" className="relative bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.04em] text-orange-400">
            Sectores
          </p>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            Categorías con identidad propia
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {NEXUS_CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            return (
              <motion.button
                key={cat.id}
                type="button"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" } },
                }}
                onClick={() => onSelect(isActive ? "all" : cat.id)}
                className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition ${
                  isActive
                    ? "border-orange-500/50 ring-1 ring-orange-500/30"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{
                  boxShadow: isActive ? `0 0 40px ${cat.glow}` : undefined,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80`}
                />
                <div className="relative">
                  <span className="text-3xl" aria-hidden>
                    {cat.icon}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{cat.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{cat.subtitle}</p>
                  <span className="mt-4 inline-block font-mono text-xs text-orange-400 opacity-0 transition group-hover:opacity-100">
                    {isActive ? "Filtro activo · clic para quitar" : "Filtrar catálogo →"}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
