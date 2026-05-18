"use client";

import { Menu, ShoppingBag, Wheat, X } from "lucide-react";
import { useState } from "react";
import { MASA_MADRE_CONFIG } from "@/lib/masa-madre-co";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Menú" },
  { href: "#horno", label: "Horno" },
  { href: "#contacto", label: "Contacto" },
];

type Props = {
  cartCount: number;
  onOpenCart: () => void;
};

export function MasaMadreCoNavbar({ cartCount, onOpenCart }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = MASA_MADRE_CONFIG;

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => scrollTo("#inicio")} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-amber-700 text-white shadow-md">
            <Wheat className="h-4 w-4" />
          </span>
          <span className="hidden font-serif text-lg font-bold text-stone-800 sm:block">{cfg.brand}</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="text-xs font-bold uppercase tracking-widest text-stone-500 transition-colors hover:text-orange-700"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-stone-700 shadow-sm transition hover:border-orange-300 hover:text-orange-800"
          >
            <ShoppingBag className="h-4 w-4 text-orange-600" />
            <span className="hidden sm:inline">Carrito</span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-black text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#menu")}
            className="hidden rounded-full bg-orange-700 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-200 sm:block"
          >
            Hacer pedido
          </button>
          <button type="button" className="text-stone-600 md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="space-y-2 border-t border-stone-200 bg-orange-50/50 px-4 py-4 md:hidden">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="block w-full py-2 text-left text-sm font-bold text-stone-800"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#menu")}
            className="mt-2 w-full rounded-full bg-orange-700 py-3 text-xs font-black uppercase text-white"
          >
            Hacer pedido
          </button>
        </nav>
      ) : null}
    </header>
  );
}
