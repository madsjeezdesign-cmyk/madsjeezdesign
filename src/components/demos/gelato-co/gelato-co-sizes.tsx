"use client";

import Image from "next/image";
import { formatGelatoPrice, GELATO_SIZES, type GelatoSize } from "@/lib/gelato-co";

type Props = {
  activeSizeId: string | null;
  onChoose: (size: GelatoSize) => void;
};

export function GelatoCoSizes({ activeSizeId, onChoose }: Props) {
  return (
    <section id="menu" className="scroll-mt-16 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-stone-400">Paso 1</p>
        <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">Elegí tu formato</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {GELATO_SIZES.map((size) => (
            <article
              key={size.id}
              className={`overflow-hidden rounded-2xl border transition ${
                activeSizeId === size.id
                  ? "border-rose-300 bg-rose-50/30 shadow-md ring-2 ring-rose-100"
                  : "border-stone-200 bg-stone-50/50 hover:border-rose-200"
              }`}
            >
              <div className="relative aspect-[16/10] bg-stone-100">
                <Image src={size.image} alt={size.label} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-xl text-stone-900">{size.label}</h3>
                <p className="text-xs font-medium text-emerald-700">{size.subtitle}</p>
                <p className="mt-3 text-2xl font-bold text-rose-500">{formatGelatoPrice(size.price)}</p>
                <button
                  type="button"
                  onClick={() => onChoose(size)}
                  className="mt-4 w-full rounded-full border-2 border-stone-900 py-3.5 text-xs font-bold uppercase tracking-[0.04em] text-stone-900 transition hover:bg-stone-900 hover:text-white active:scale-[0.98]"
                >
                  Elegir gustos
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
