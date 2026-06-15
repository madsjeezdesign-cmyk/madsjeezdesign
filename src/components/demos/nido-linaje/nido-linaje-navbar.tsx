"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NIDO_LINAJE_CONFIG } from "@/lib/nido-linaje";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#colecciones", label: "Colecciones" },
  { href: "#filosofia", label: "Filosofía" },
];

type Props = {
  cartCount: number;
  cartBump: boolean;
  onOpenCart: () => void;
};

export function NidoLinajeNavbar({ cartCount, cartBump, onOpenCart }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cfg = NIDO_LINAJE_CONFIG;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[55] overflow-hidden border-b border-stone-200/60 bg-stone-50/95 py-2 backdrop-blur-sm">
        <div className="nl-ticker flex whitespace-nowrap">
          {[...cfg.ticker, ...cfg.ticker].map((text, i) => (
            <span
              key={`${text}-${i}`}
              className="mx-8 text-[10px] font-medium uppercase tracking-[0.04em] text-stone-500"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "top-9 border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur-md" : "top-9 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <button type="button" onClick={() => scrollTo("#inicio")} className="text-left">
            <span className="block font-serif text-lg tracking-wide text-stone-900 md:text-xl">
              {cfg.brand}
            </span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.04em] text-stone-400">
              {cfg.brandSub}
            </span>
          </button>

          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollTo(l.href)}
                className="text-[11px] font-medium uppercase tracking-[0.04em] text-stone-500 transition hover:text-stone-900"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenCart}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/80 text-stone-700 transition hover:border-stone-400 hover:shadow-md ${
                cartBump ? "nl-cart-bump" : ""
              }`}
              aria-label="Carrito"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-800 px-1 text-[9px] font-semibold text-white">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="text-stone-600 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Menu className="h-5 w-5" strokeWidth={1.25} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-stone-100 bg-white px-4 py-4 md:hidden">
            {LINKS.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollTo(l.href)}
                className="block w-full py-3 text-left text-sm font-medium tracking-wide text-stone-700"
              >
                {l.label}
              </button>
            ))}
          </nav>
        ) : null}
      </header>
    </>
  );
}
