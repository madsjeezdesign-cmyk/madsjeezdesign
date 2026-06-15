"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  BURGER_CATEGORIES,
  BURGER_PRODUCTS,
  formatBurgerPrice,
  type BurgerCategoryId,
  type BurgerProduct,
} from "@/lib/burger-lab";

type Props = {
  onSelectProduct: (p: BurgerProduct) => void;
  onAddSimple: (p: BurgerProduct) => void;
};

export function BurgerLabMenu({ onSelectProduct, onAddSimple }: Props) {
  const [category, setCategory] = useState<BurgerCategoryId>("smash");

  const filtered = useMemo(
    () => BURGER_PRODUCTS.filter((p) => p.category === category),
    [category],
  );

  return (
    <section id="menu" className="scroll-mt-14 border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <h2 className="text-2xl font-black uppercase text-white">Menú</h2>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {BURGER_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-black uppercase transition ${
                category === c.id
                  ? "bg-amber-500 text-zinc-950"
                  : "bg-zinc-900 text-[color:var(--muted-body)] hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <div className="relative aspect-[16/10] bg-zinc-800">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
                {product.badge ? (
                  <span className="absolute left-2 top-2 rounded bg-orange-500 px-2 py-0.5 text-[9px] font-black uppercase text-zinc-950">
                    {product.badge}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-black uppercase text-white">{product.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[color:var(--muted-body)]">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-black text-amber-400">
                    {formatBurgerPrice(product.basePrice)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      product.customizable ? onSelectProduct(product) : onAddSimple(product)
                    }
                    className="rounded-lg bg-zinc-800 px-4 py-2 text-[10px] font-black uppercase text-amber-400 hover:bg-zinc-700"
                  >
                    {product.customizable ? "Armar" : "Agregar"}
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
