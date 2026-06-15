"use client";

import { Flame, ShoppingCart } from "lucide-react";
import { formatNapolesPrice, PIZZERIA_NAPOLES_CONFIG } from "@/lib/pizzeria-napoles";

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
};

export function PizzeriaNapolesNavbar({ cartCount, cartTotal, onOpenCart }: Props) {
  const cfg = PIZZERIA_NAPOLES_CONFIG;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-serif text-lg font-semibold text-stone-100">{cfg.brand}</span>
        </button>

        {cfg.ovenOn ? (
          <span className="hidden items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-2 py-1 text-[9px] font-bold uppercase text-green-400 sm:flex">
            <span className="pn-oven-glow h-2 w-2 rounded-full bg-green-500" />
            Horno encendido
          </span>
        ) : null}

        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-white transition hover:bg-red-500"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs font-bold">{cartCount}</span>
          <span className="hidden border-l border-red-400/50 pl-2 text-xs font-bold sm:inline">
            {formatNapolesPrice(cartTotal)}
          </span>
        </button>
      </div>
      {cfg.ovenOn ? (
        <p className="border-t border-zinc-800 py-1 text-center text-[9px] font-bold uppercase tracking-[0.04em] text-green-400 sm:hidden">
          Horno encendido — Tomando pedidos
        </p>
      ) : null}
    </header>
  );
}
