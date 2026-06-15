"use client";

import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  DECO_BAZAR_CO_CONFIG,
  DECO_NAV_CATEGORIES,
  formatDecoPrice,
  searchDecoSuggestions,
} from "@/lib/deco-bazar-co";

type Props = {
  search: string;
  onSearch: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onCategoryNav: (id: string) => void;
};

export function DecoBazarCoNavbar({
  search,
  onSearch,
  cartCount,
  cartTotal,
  onOpenCart,
  onCategoryNav,
}: Props) {
  const cfg = DECO_BAZAR_CO_CONFIG;
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestions = searchDecoSuggestions(search);

  const pickSuggestion = (s: string) => {
    onSearch(s);
    setSuggestOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="shrink-0 text-left"
        >
          <span className="block text-sm font-light tracking-wide text-zinc-800">{cfg.brand}</span>
          <span className="text-[9px] font-medium uppercase tracking-[0.04em] text-zinc-400">Nordic home</span>
        </button>

        <nav className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-[color:var(--muted-body)] hover:bg-zinc-50"
          >
            Categorías
            <ChevronDown className={`h-3.5 w-3.5 transition ${catOpen ? "rotate-180" : ""}`} />
          </button>
          {catOpen ? (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} aria-hidden />
              <ul className="absolute left-0 top-full z-20 mt-1 min-w-[220px] rounded-xl border border-zinc-100 bg-white py-2 shadow-lg">
                {DECO_NAV_CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-sm text-[color:var(--muted-body)] hover:bg-zinc-50 hover:text-zinc-900"
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

        <div className="relative order-3 w-full min-w-0 flex-1 sm:order-none sm:max-w-md lg:max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              onSearch(e.target.value);
              setSuggestOpen(true);
            }}
            onFocus={() => setSuggestOpen(true)}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setSuggestOpen(false), 160);
            }}
            placeholder="Buscar vajilla, termos, sets…"
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-300"
          />
          {suggestOpen && suggestions.length > 0 ? (
            <ul className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-xl">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="block w-full px-4 py-3 text-left text-sm text-[color:var(--muted-body)] hover:bg-zinc-50"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (blurTimer.current) clearTimeout(blurTimer.current);
                      pickSuggestion(s);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          className="ml-auto flex items-center gap-2 rounded-full bg-[#5c6b4a] px-3 py-2.5 text-white shadow-sm transition hover:bg-[#4d5a3e]"
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-xs font-semibold">{cartCount}</span>
          <span className="hidden border-l border-white/25 pl-2 text-xs font-medium sm:inline">
            {formatDecoPrice(cartTotal)}
          </span>
        </button>

        <button
          type="button"
          className="text-[color:var(--muted-body)] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="border-t border-zinc-100 px-3 py-3 lg:hidden">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-400">Categorías</p>
          <div className="flex flex-wrap gap-2">
            {DECO_NAV_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onCategoryNav(c.id);
                  setMenuOpen(false);
                  document.querySelector("#catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-[color:var(--muted-body)]"
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
