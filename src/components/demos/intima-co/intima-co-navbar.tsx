"use client";

import { ShoppingBag } from "lucide-react";
import { formatIntimaPrice, INTIMA_CO_CONFIG } from "@/lib/intima-co";

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNav: (section: string) => void;
};

export function IntimaCoNavbar({ cartCount, cartTotal, onOpenCart, onNav }: Props) {
  const cfg = INTIMA_CO_CONFIG;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/50 bg-stone-50/80 backdrop-blur-xl">
      <div className="overflow-hidden border-b border-rose-100/50 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 py-1.5">
        <div className="ic-ticker flex whitespace-nowrap">
          {[cfg.topBanner, cfg.topBanner].map((text, i) => (
            <span key={i} className="mx-10 text-[10px] font-light tracking-[0.04em] text-stone-200">
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-4 sm:px-4">
        <button
          type="button"
          onClick={() => onNav("#inicio")}
          className="text-left"
        >
          <span className="font-serif text-xl font-medium tracking-wide text-stone-900">{cfg.brand}</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {[
            { label: "Colecciones", href: "#catalogo" },
            { label: "Tu talle", href: "#talles" },
            { label: "Packs", href: "#packs" },
          ].map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => onNav(link.href)}
              className="text-xs font-light uppercase tracking-[0.04em] text-stone-500 transition hover:text-stone-900"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-3 py-2.5 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <ShoppingBag className="h-4 w-4 text-stone-700" strokeWidth={1.25} />
          <span className="text-xs font-medium text-stone-800">{cartCount}</span>
          <span className="hidden border-l border-stone-200 pl-2 text-xs font-light text-stone-600 sm:inline">
            {formatIntimaPrice(cartTotal)}
          </span>
        </button>
      </div>
    </header>
  );
}
