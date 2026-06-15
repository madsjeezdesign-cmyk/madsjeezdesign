"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, PackagePlus } from "lucide-react";
import { useRef } from "react";
import { DECO_COMBOS, formatDecoPrice, type DecoCombo } from "@/lib/deco-bazar-co";

type Props = {
  onAddCombo: (combo: DecoCombo) => void;
};

export function DecoBazarCoCombos({ onAddCombo }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="combos" className="border-t border-zinc-100 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-400">Promos</p>
            <h2 className="mt-2 text-2xl font-light text-zinc-900">Sets y combos</h2>
            <p className="mt-1 text-sm font-light text-[color:var(--muted-body)]">Cajas armadas · un clic al carrito</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="rounded-full border border-zinc-200 p-2 text-[color:var(--muted-body)] hover:bg-zinc-50"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="rounded-full border border-zinc-200 p-2 text-[color:var(--muted-body)] hover:bg-zinc-50"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="dbz-carousel mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {DECO_COMBOS.map((combo) => (
            <article
              key={combo.id}
              className="w-[min(85vw,320px)] shrink-0 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-zinc-100">
                <Image src={combo.image} alt={combo.name} fill className="object-cover" sizes="320px" />
                <span className="absolute left-3 top-3 rounded-full bg-zinc-800 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-white">
                  Promo
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-zinc-900">{combo.name}</h3>
                <p className="mt-1 text-xs font-light text-[color:var(--muted-body)]">{combo.description}</p>
                <ul className="mt-3 space-y-0.5 text-[11px] text-[color:var(--muted-body)]">
                  {combo.items.map((it) => (
                    <li key={it.label}>· {it.label}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-xl font-light text-zinc-900">{formatDecoPrice(combo.promoPrice)}</span>
                  <span className="text-sm text-zinc-400 line-through">{formatDecoPrice(combo.listPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onAddCombo(combo)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-800 py-3 text-[10px] font-medium uppercase tracking-[0.04em] text-white hover:bg-zinc-700"
                >
                  <PackagePlus className="h-4 w-4" />
                  Agregar set completo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
