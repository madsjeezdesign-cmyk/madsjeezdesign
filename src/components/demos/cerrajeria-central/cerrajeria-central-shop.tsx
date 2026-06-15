"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatCentralPrice,
  formatProductSpecs,
  SECURITY_CATEGORIES,
  SECURITY_PRODUCTS,
  type SecurityCategoryId,
  type SecurityProduct,
} from "@/lib/cerrajeria-central";

type Props = {
  onAdd: (product: SecurityProduct) => void;
};

export function CerrajeriaCentralShop({ onAdd }: Props) {
  const [category, setCategory] = useState<SecurityCategoryId | "all">("all");

  const filtered = useMemo(() => {
    if (category === "all") return SECURITY_PRODUCTS;
    return SECURITY_PRODUCTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <section id="tienda" className="scroll-mt-20 bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <p className="text-xs font-black uppercase tracking-[0.04em] text-amber-400">Tienda técnica</p>
        <h2 className="mt-2 text-2xl font-black uppercase text-white">Productos de seguridad</h2>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {SECURITY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-[10px] font-bold uppercase ${
                category === c.id ? "bg-amber-500 text-zinc-950" : "bg-zinc-900 text-zinc-400 ring-1 ring-zinc-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              <div className="relative aspect-video bg-zinc-800">
                <Image src={product.image} alt={product.name} fill className="object-cover opacity-90" sizes="33vw" />
                <span className="absolute left-2 top-2 rounded bg-zinc-950/90 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-400">
                  {product.brand}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-bold text-white">{product.name}</h3>
                <dl className="mt-3 space-y-1 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-[10px] text-zinc-400">
                  <dt className="font-bold uppercase text-[color:var(--muted-body)]">Ficha técnica</dt>
                  <dd>{formatProductSpecs(product)}</dd>
                </dl>
                <p className="mt-4 text-xl font-black text-amber-400">{formatCentralPrice(product.price)}</p>
                <button
                  type="button"
                  onClick={() => onAdd(product)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 py-3.5 text-xs font-black uppercase text-white ring-1 ring-zinc-700 hover:bg-amber-500 hover:text-zinc-950 hover:ring-amber-500"
                >
                  <Plus className="h-4 w-4" />
                  Añadir al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
