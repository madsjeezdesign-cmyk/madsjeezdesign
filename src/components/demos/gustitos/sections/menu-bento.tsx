"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { GUSTITOS_PRODUCTS, type GustitosCategoryId, type GustitosProduct } from "@/lib/gustitos";
import { MenuCard } from "../menu/menu-card";

type Props = {
  filter: GustitosCategoryId | "all";
  onQuick: (p: GustitosProduct) => void;
  onAdd: (p: GustitosProduct) => void;
};

export function MenuBento({ filter, onQuick, onAdd }: Props) {
  const items = useMemo(() => {
    if (filter === "all") return GUSTITOS_PRODUCTS;
    return GUSTITOS_PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="menu" className="bg-zinc-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.04em] text-red-500">Showcase</p>
        <h2 className="mt-2 font-[family-name:var(--font-gu-display)] text-4xl uppercase text-white sm:text-5xl">
          Menú cinematográfico
        </h2>
        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <MenuCard
              key={p.id}
              product={p}
              onQuick={() => onQuick(p)}
              onAdd={() => onAdd(p)}
              className={
                p.featured === "large"
                  ? "xl:col-span-2 xl:row-span-2"
                  : p.featured === "wide"
                    ? "xl:col-span-2"
                    : ""
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
