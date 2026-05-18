"use client";

import { motion } from "framer-motion";
import { NEXUS_SERVICES } from "@/lib/nexus-ferreteria";

export function Services() {
  return (
    <section id="servicios" className="relative border-t border-white/5 bg-zinc-900/50 py-24">
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px]"
        aria-hidden
      />
      <motion.div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-400">
          Servicios
        </p>
        <h2 className="mt-2 text-4xl font-bold text-white">Más que un mostrador</h2>
        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {NEXUS_SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl transition hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <span className="font-mono text-2xl font-bold text-orange-500">{s.metric}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-500">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
