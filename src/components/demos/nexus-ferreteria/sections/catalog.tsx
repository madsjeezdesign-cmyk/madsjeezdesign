"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import {
  NEXUS_PRODUCTS,
  type NexusCategoryId,
  type NexusProduct,
} from "@/lib/nexus-ferreteria";
import { ProductCard } from "../product/product-card";

type Props = {
  category: NexusCategoryId | "all";
  wishlist: Set<number>;
  onWishlist: (id: number) => void;
  onQuickView: (p: NexusProduct) => void;
  onAdd: (p: NexusProduct) => void;
};

type Sort = "featured" | "price-asc" | "price-desc";

export function Catalog({ category, wishlist, onWishlist, onQuickView, onAdd }: Props) {
  const [sort, setSort] = useState<Sort>("featured");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...NEXUS_PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (inStockOnly) list = list.filter((p) => p.stock !== "out");
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort, inStockOnly]);

  return (
    <section id="catalogo" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-orange-400">
              Catálogo
            </p>
            <h2 className="mt-2 text-4xl font-bold text-white">Equipamiento pro</h2>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
        </div>

        <div className="mt-10 flex gap-8">
          <aside
            className={`w-56 shrink-0 space-y-6 ${sidebarOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Ordenar
              </p>
              {(
                [
                  ["featured", "Destacados"],
                  ["price-asc", "Menor precio"],
                  ["price-desc", "Mayor precio"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSort(id)}
                  className={`mt-2 block w-full rounded-lg px-3 py-2 text-left text-sm ${
                    sort === id ? "bg-orange-500/20 text-orange-400" : "text-zinc-400 hover:bg-white/5"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-white/20"
              />
              Solo con stock
            </label>
          </aside>

          <motion.div
            layout
            className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wishlisted={wishlist.has(p.id)}
                onWishlist={() => onWishlist(p.id)}
                onQuickView={() => onQuickView(p)}
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
      </div>
    </section>
  );
}
