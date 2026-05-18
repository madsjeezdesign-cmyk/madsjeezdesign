"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { formatCentralPrice } from "@/lib/cerrajeria-central";

type Props = {
  brand: string;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNav: (id: string) => void;
  onUrgency: () => void;
};

const LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "cotizador", label: "Cotizador" },
  { id: "tienda", label: "Tienda" },
  { id: "contacto", label: "Contacto" },
];

export function CerrajeriaCentralNavbar({
  brand,
  cartCount,
  cartTotal,
  onOpenCart,
  onNav,
  onUrgency,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sm:top-0">
      <div className="hidden border-b border-amber-500/80 bg-amber-500 py-2 sm:block">
        <button
          type="button"
          onClick={onUrgency}
          className="mx-auto flex w-full items-center justify-center gap-2 text-sm font-black uppercase tracking-wide text-zinc-950"
        >
          🚨 URGENCIAS 24 HS: Solicitar cerrajería ahora
        </button>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <button type="button" onClick={() => onNav("inicio")} className="text-left">
          <span className="text-lg font-black uppercase tracking-tight text-white">{brand}</span>
          <span className="block text-[9px] font-bold uppercase text-amber-400">Seguridad integral</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onNav(l.id)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:text-amber-400"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2.5 text-white ring-1 ring-zinc-700"
          >
            <ShoppingCart className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-black">{cartCount}</span>
            <span className="hidden border-l border-zinc-600 pl-2 text-xs font-bold text-amber-400 sm:inline">
              {formatCentralPrice(cartTotal)}
            </span>
          </button>
          <button type="button" className="text-zinc-400 md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-zinc-800 px-3 py-3 md:hidden">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                onNav(l.id);
                setOpen(false);
              }}
              className="block w-full py-2.5 text-left text-sm font-bold uppercase text-zinc-300"
            >
              {l.label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
