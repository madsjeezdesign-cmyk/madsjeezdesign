"use client";

import { Menu, Scissors, X } from "lucide-react";
import { useState } from "react";
import { BARBER_CLUB_CONFIG } from "@/lib/the-barber-club";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#turnos", label: "Turnos" },
  { href: "#shop", label: "Shop" },
  { href: "#galeria", label: "Galería" },
  { href: "#club", label: "Club" },
];

type Props = {
  cartCount: number;
  onOpenCart: () => void;
};

export function TheBarberClubNavbar({ cartCount, onOpenCart }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = BARBER_CLUB_CONFIG;

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => scrollTo("#inicio")} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-zinc-950">
            <Scissors className="h-4 w-4" />
          </span>
          <span className="hidden font-serif text-lg font-bold tracking-wide text-zinc-100 sm:block">{cfg.brand}</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-400"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-bold text-zinc-300 hover:border-amber-500/40 hover:text-amber-400"
          >
            Shop
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-zinc-950">
                {cartCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#turnos")}
            className="hidden rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-950 shadow-lg shadow-amber-500/20 sm:block"
          >
            Reservar
          </button>
          <button type="button" className="text-zinc-400 md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="space-y-2 border-t border-zinc-800 px-4 py-4 md:hidden">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="block w-full py-2 text-left text-sm font-bold text-zinc-200"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#turnos")}
            className="mt-2 w-full rounded-lg bg-amber-500 py-3 text-xs font-black uppercase text-zinc-950"
          >
            Reservar turno
          </button>
        </nav>
      ) : null}
    </header>
  );
}
