"use client";

import { Flame, ShoppingCart } from "lucide-react";
import { BURGER_LAB_CONFIG, formatBurgerPrice } from "@/lib/burger-lab";

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
};

export function BurgerLabNavbar({ cartCount, cartTotal, onOpenCart }: Props) {
  const cfg = BURGER_LAB_CONFIG;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2"
        >
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-black uppercase tracking-tight text-white">{cfg.brand}</span>
        </button>

        <div className="flex items-center gap-2">
          {cfg.isOpen ? (
            <span className="hidden items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/10 px-2.5 py-1 text-[9px] font-black uppercase text-green-400 sm:flex">
              <span className="bl-open-dot h-2 w-2 rounded-full bg-green-500" />
              Tomando pedidos
            </span>
          ) : null}

          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-3 py-2 text-zinc-950 transition hover:bg-amber-400"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-xs font-black">{cartCount}</span>
            <span className="hidden border-l border-amber-600/40 pl-2 text-xs font-black sm:inline">
              {formatBurgerPrice(cartTotal)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
