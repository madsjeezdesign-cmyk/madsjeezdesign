"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { LUNA_PRODUCTS, type LunaCategoryId, type LunaProduct } from "@/lib/luna-petit-co";
import { ProductCard } from "../product/product-card";

type Props = {
  filter: LunaCategoryId | "all";
  wishlist: Set<number>;
  onWishlist: (id: number) => void;
  onQuickView: (p: LunaProduct) => void;
  onAdd: (p: LunaProduct) => void;
};

export function LunaProductBento({ filter, wishlist, onWishlist, onQuickView, onAdd }: Props) {
  const [sort, setSort] = useState<"featured" | "price">("featured");

  const products = useMemo(() => {
    let list = filter === "all" ? LUNA_PRODUCTS : LUNA_PRODUCTS.filter((p) => p.category === filter);
    if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [filter, sort]);

  const gridClass = (p: LunaProduct) => {
    if (p.featured === "large") return "md:col-span-2 md:row-span-2";
    if (p.featured === "wide") return "md:col-span-2";
    if (p.featured === "tall") return "md:row-span-2";
    return "";
  };

  return (
    <section id="coleccion" className="scroll-mt-24 bg-[#F8F6F2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-neutral-500">Colección</p>
            <h2 className="mt-2 font-serif text-3xl text-neutral-900">Piezas seleccionadas</h2>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "featured" | "price")}
            className="rounded-full border border-neutral-200/80 bg-white/80 px-4 py-2 text-xs text-neutral-700 backdrop-blur-sm"
          >
            <option value="featured">Destacados</option>
            <option value="price">Menor precio</option>
          </select>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              className={gridClass(p)}
              wishlisted={wishlist.has(p.id)}
              onWishlist={() => onWishlist(p.id)}
              onQuickView={() => onQuickView(p)}
              onAdd={() => onAdd(p)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
