"use client";

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import {
  CENTRAL_BEBIDAS_CONFIG,
  formatBebidaPrice,
  type PurchaseMode,
} from "@/lib/central-bebidas";

type Props = {
  mode: PurchaseMode;
  onMode: (m: PurchaseMode) => void;
  search: string;
  onSearch: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
};

export function CentralBebidasNavbar({
  mode,
  onMode,
  search,
  onSearch,
  cartCount,
  cartTotal,
  onOpenCart,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const cfg = CENTRAL_BEBIDAS_CONFIG;

  const mockSuggestions =
    search.length > 1
      ? ["Fernet Branca", "Coca-Cola 2.25L", "Quilmes Cristal", "Combo Fernet"].filter((s) =>
          s.toLowerCase().includes(search.toLowerCase()),
        )
      : [];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="border-b border-zinc-900 bg-zinc-900/80 py-1.5">
        <div className="cdb-ticker flex whitespace-nowrap">
          {[...cfg.deliveryZones, ...cfg.deliveryZones].map((z, i) => (
            <span key={`${z}-${i}`} className="mx-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              {z}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={() => document.querySelector("#inicio")?.scrollIntoView({ behavior: "smooth" })}
          className="shrink-0 text-left"
        >
          <span className="block text-sm font-black uppercase tracking-tight text-white">{cfg.brand}</span>
          <span className="text-[9px] font-bold text-lime-400">Stock en vivo</span>
        </button>

        <div className="relative order-3 w-full min-w-0 flex-1 sm:order-none sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              onSearch(e.target.value);
              setSuggestions(true);
            }}
            onFocus={() => setSuggestions(true)}
            onBlur={() => window.setTimeout(() => setSuggestions(false), 150)}
            placeholder="Buscar marca, bebida, combo…"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-lime-500/50 focus:outline-none focus:ring-1 focus:ring-lime-500/30"
          />
          {suggestions && mockSuggestions.length > 0 ? (
            <ul className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
              {mockSuggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="block w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-lime-400"
                    onMouseDown={() => {
                      onSearch(s);
                      setSuggestions(false);
                    }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-xl border border-zinc-800 bg-zinc-900 p-0.5 sm:flex">
            <button
              type="button"
              onClick={() => onMode("retail")}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition ${
                mode === "retail" ? "bg-amber-500 text-zinc-950" : "text-zinc-500 hover:text-white"
              }`}
            >
              Minorista
            </button>
            <button
              type="button"
              onClick={() => onMode("wholesale")}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-black uppercase transition ${
                mode === "wholesale" ? "bg-lime-500 text-zinc-950" : "text-zinc-500 hover:text-white"
              }`}
            >
              Mayorista
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenCart}
            className="cdb-glow-lime flex items-center gap-2 rounded-xl bg-lime-500 px-3 py-2 text-zinc-950 transition hover:bg-lime-400"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden text-[10px] font-black uppercase sm:inline">Carrito</span>
            <span className="text-xs font-black">{cartCount}</span>
            <span className="hidden border-l border-lime-600/50 pl-2 text-xs font-bold sm:inline">
              {formatBebidaPrice(cartTotal)}
            </span>
          </button>

          <button type="button" className="text-zinc-400 sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-zinc-800 px-3 py-3 sm:hidden">
          <div className="flex rounded-xl border border-zinc-800 bg-zinc-900 p-0.5">
            <button
              type="button"
              onClick={() => {
                onMode("retail");
                setMenuOpen(false);
              }}
              className={`flex-1 rounded-lg py-2 text-[10px] font-black uppercase ${
                mode === "retail" ? "bg-amber-500 text-zinc-950" : "text-zinc-500"
              }`}
            >
              Minorista
            </button>
            <button
              type="button"
              onClick={() => {
                onMode("wholesale");
                setMenuOpen(false);
              }}
              className={`flex-1 rounded-lg py-2 text-[10px] font-black uppercase ${
                mode === "wholesale" ? "bg-lime-500 text-zinc-950" : "text-zinc-500"
              }`}
            >
              Mayorista
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
