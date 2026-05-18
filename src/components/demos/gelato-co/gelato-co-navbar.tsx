"use client";

import { IceCream, ShoppingBag } from "lucide-react";
import { formatGelatoPrice, GELATO_CO_CONFIG } from "@/lib/gelato-co";

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
};

export function GelatoCoNavbar({ cartCount, cartTotal, onOpenCart }: Props) {
  const cfg = GELATO_CO_CONFIG;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <IceCream className="h-5 w-5 text-rose-400" strokeWidth={1.5} />
          <span className="font-serif text-lg font-medium text-stone-800">{cfg.brand}</span>
        </button>

        {cfg.isOpen ? (
          <span className="hidden max-w-[140px] items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[8px] font-semibold leading-tight text-sky-800 sm:flex">
            <span className="gc-fresh-pulse h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            Abierto · Envío cadena de frío
          </span>
        ) : null}

        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-full bg-stone-900 px-3 py-2.5 text-white shadow-md transition hover:bg-stone-800"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="text-xs font-bold">{cartCount}</span>
          <span className="hidden border-l border-stone-600 pl-2 text-xs font-semibold sm:inline">
            {formatGelatoPrice(cartTotal)}
          </span>
        </button>
      </div>
      {cfg.isOpen ? (
        <p className="border-t border-stone-100 py-1.5 text-center text-[9px] font-semibold text-emerald-700 sm:hidden">
          Abierto — Envíos express con cadena de frío
        </p>
      ) : null}
    </header>
  );
}
