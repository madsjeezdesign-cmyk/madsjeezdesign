"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BAKERY_CATEGORIES,
  BAKERY_PRODUCTS,
  formatBakeryPrice,
  type BakeryCategoryId,
  type BakeryProduct,
} from "@/lib/masa-madre-co";

type Props = {
  onAdd: (product: BakeryProduct, quantity: number) => void;
};

export function MasaMadreCoMenu({ onAdd }: Props) {
  const [category, setCategory] = useState<BakeryCategoryId | "all">("all");
  const [qty, setQty] = useState<Record<number, number>>({});

  const filtered = useMemo(
    () => (category === "all" ? BAKERY_PRODUCTS : BAKERY_PRODUCTS.filter((p) => p.category === category)),
    [category],
  );

  const getQty = (id: number) => qty[id] ?? 1;
  const setProductQty = (id: number, delta: number) => {
    setQty((prev) => ({ ...prev, [id]: Math.max(1, Math.min(20, (prev[id] ?? 1) + delta)) }));
  };

  return (
    <section id="menu" className="scroll-mt-20 bg-gradient-to-b from-orange-50/80 to-stone-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-orange-700">Tienda online</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">Menú del día</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-stone-600">
            Ingredientes nobles, precios en pesos argentinos. Elegí cantidad y sumá al carrito.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {BAKERY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition ${
                category === c.id
                  ? "bg-orange-700 text-white shadow-md"
                  : "border border-stone-200 bg-white text-stone-600 hover:border-orange-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {product.badge ? (
                  <span className="absolute left-3 top-3 rounded-full bg-orange-600 px-2.5 py-1 text-[9px] font-black uppercase text-white">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-bold text-stone-900">{product.name}</h3>
                <p className="mt-1 text-sm text-stone-600 line-clamp-2">{product.description}</p>
                <p className="mt-2 text-[11px] italic text-orange-800/90">{product.ingredients}</p>
                <p className="mt-3 text-xl font-black text-orange-800">{formatBakeryPrice(product.price)}</p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                    <button
                      type="button"
                      onClick={() => setProductQty(product.id, -1)}
                      className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-orange-700"
                      aria-label="Menos"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{getQty(product.id)}</span>
                    <button
                      type="button"
                      onClick={() => setProductQty(product.id, 1)}
                      className="flex h-9 w-9 items-center justify-center text-stone-600 hover:text-orange-700"
                      aria-label="Más"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAdd(product, getQty(product.id))}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-700 py-2.5 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-orange-800"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
