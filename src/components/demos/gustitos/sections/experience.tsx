"use client";

import { motion } from "framer-motion";
import { GUSTITOS_EXPERIENCE } from "@/lib/gustitos";

export function Experience() {
  return (
    <section id="experiencia" className="relative border-t border-red-500/10 bg-zinc-900/40 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-[family-name:var(--font-gu-display)] text-4xl uppercase text-white">
          La experiencia GUSTITOS
        </h2>
        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {GUSTITOS_EXPERIENCE.map((item) => (
            <motion.article
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl transition hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10"
            >
              <p className="font-[family-name:var(--font-gu-display)] text-4xl text-amber-400">
                {item.metric}
              </p>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted-body)]">{item.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
