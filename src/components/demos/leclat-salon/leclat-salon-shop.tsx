"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { formatSalonPrice, SALON_PRODUCTS, type SalonProduct } from "@/lib/leclat-salon";

type Props = {
  onAdd: (p: SalonProduct) => void;
  cartCount: number;
  onOpenCart: () => void;
};

export function LeclatSalonShop({ onAdd, cartCount, onOpenCart }: Props) {
  return (
    <section id="shop" className="scroll-mt-20 bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-rose-400">Shop express</p>
            <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">Cuidado en casa</h2>
          </div>
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-medium text-rose-600"
          >
            <ShoppingBag className="h-4 w-4" />
            Bolsa ({cartCount})
          </button>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {SALON_PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-square bg-stone-100">
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="25vw" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-stone-900">{p.name}</h3>
                <p className="mt-1 text-[11px] text-stone-500 line-clamp-2">{p.description}</p>
                <p className="mt-2 font-serif text-rose-600">{formatSalonPrice(p.price)}</p>
                <button
                  type="button"
                  onClick={() => onAdd(p)}
                  className="mt-3 w-full rounded-full border border-rose-300 py-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-rose-600 hover:bg-rose-50"
                >
                  Añadir
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
