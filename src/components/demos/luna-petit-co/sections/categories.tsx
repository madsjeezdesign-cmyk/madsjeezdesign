"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LUNA_CATEGORIES, type LunaCategoryId } from "@/lib/luna-petit-co";

type Props = {
  onSelect: (id: LunaCategoryId) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function LunaCategories({ onSelect }: Props) {
  return (
    <section id="categorias" className="scroll-mt-24 bg-[#F8F6F2] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] font-medium uppercase tracking-[0.04em] text-neutral-500"
        >
          Universos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 text-center font-serif text-3xl text-neutral-900 md:text-4xl"
        >
          Cada etapa, una experiencia
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LUNA_CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              variants={item}
              type="button"
              onClick={() => onSelect(cat.id)}
              className={`group relative overflow-hidden rounded-3xl border border-neutral-200/40 text-left transition hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.12)] ${
                i === 0 ? "sm:col-span-2 sm:row-span-2 min-h-[280px]" : "min-h-[200px]"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
              <Image src={cat.image} alt={cat.title} fill className="object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55" sizes="40vw" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <p className="font-serif text-2xl text-neutral-900">{cat.title}</p>
                <p className="mt-1 text-xs text-neutral-600">{cat.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
