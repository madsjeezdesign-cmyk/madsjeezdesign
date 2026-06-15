"use client";

import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import {
  formatRaicesPrice,
  RAICES_CRIOLLAS_CONFIG,
  RAICES_NAV_CATEGORIES,
} from "@/lib/raices-criollas";

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onCategoryNav: (id: string) => void;
};

export function RaicesCriollasNavbar({ cartCount, cartTotal, onOpenCart, onCategoryNav }: Props) {
  const cfg = RAICES_CRIOLLAS_CONFIG;
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur-md">
      <div className="overflow-hidden border-b border-amber-900/10 bg-gradient-to-r from-amber-900/90 via-orange-900/85 to-amber-900/90 py-1.5">
        <div className="rc-ticker flex whitespace-nowrap">
          {[cfg.topBanner, cfg.topBanner].map((text, i) => (
            <span key={i} className="mx-8 text-[10px] font-medium tracking-[0.04em] text-amber-50/95">
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="shrink-0 text-left"
        >
          <span className="font-serif text-lg text-stone-900">{cfg.brand}</span>
          <span className="block text-[9px] font-medium uppercase tracking-[0.04em] text-amber-800/80">
            Pulpería premium
          </span>
        </button>

        <nav className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-stone-700 hover:bg-stone-100"
          >
            Categorías
            <ChevronDown className={`h-3.5 w-3.5 transition ${catOpen ? "rotate-180" : ""}`} />
          </button>
          {catOpen ? (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} aria-hidden />
              <ul className="absolute left-0 top-full z-20 mt-1 min-w-[240px] rounded-xl border border-stone-200 bg-white py-2 shadow-lg">
                {RAICES_NAV_CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50"
                      onClick={() => {
                        onCategoryNav(c.id);
                        setCatOpen(false);
                        document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-2 rounded-full bg-amber-800 px-3 py-2.5 text-amber-50 shadow-md transition hover:bg-orange-900"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-xs font-semibold">{cartCount}</span>
          <span className="hidden border-l border-amber-600/50 pl-2 text-xs font-medium sm:inline">
            {formatRaicesPrice(cartTotal)}
          </span>
        </button>

        <button
          type="button"
          className="text-stone-600 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="border-t border-stone-200 px-3 py-3 md:hidden">
          <div className="flex flex-wrap gap-2">
            {RAICES_NAV_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onCategoryNav(c.id);
                  setMenuOpen(false);
                  document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700"
              >
                {c.label}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
