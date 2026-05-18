"use client";

import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LECLAT_CONFIG } from "@/lib/leclat-salon";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#turnos", label: "Turnos" },
  { href: "#galeria", label: "Galería" },
  { href: "#shop", label: "Shop" },
  { href: "#contacto", label: "Contacto" },
];

export function LeclatSalonNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cfg = LECLAT_CONFIG;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-rose-100/80 bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-white/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={() => go("#inicio")} className="flex items-center gap-2 text-left">
          <Sparkles className="h-4 w-4 text-rose-400" strokeWidth={1.5} />
          <span>
            <span className="block font-serif text-lg text-stone-800">{cfg.brand}</span>
            <span className="block text-[9px] font-medium uppercase tracking-[0.35em] text-rose-400">
              {cfg.brandSub}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.slice(0, -1).map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => go(l.href)}
              className="text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500 transition hover:text-rose-500"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go("#turnos")}
            className="hidden rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md shadow-rose-200 transition hover:from-rose-500 hover:to-rose-600 sm:inline-block"
          >
            Reservar turno online
          </button>
          <button type="button" className="text-stone-600 md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-rose-50 bg-white px-4 py-4 md:hidden">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => go(l.href)}
              className="block w-full py-2.5 text-left text-sm font-medium text-stone-700"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("#turnos")}
            className="mt-3 w-full rounded-full bg-rose-500 py-3 text-xs font-semibold uppercase tracking-wider text-white"
          >
            Reservar turno online
          </button>
        </nav>
      ) : null}
    </header>
  );
}
