"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { BARBER_PRODUCTS, formatBarberPrice, type BarberProduct } from "@/lib/the-barber-club";

type Props = {
  onAdd: (p: BarberProduct) => void;
};

export function TheBarberClubShop({ onAdd }: Props) {
  return (
    <section id="shop" className="border-t border-zinc-800 bg-zinc-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-amber-500">Barber shop</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white">Productos premium</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BARBER_PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-all hover:border-amber-500/30"
            >
              <div className="relative aspect-square overflow-hidden bg-zinc-900">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-[color:var(--muted-body)]">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black text-amber-400">{formatBarberPrice(p.price)}</span>
                  <button
                    type="button"
                    onClick={() => onAdd(p)}
                    className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-2 text-[10px] font-black uppercase text-zinc-950 hover:bg-amber-400"
                  >
                    <Plus className="h-3.5 w-3.5" /> Agregar
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
