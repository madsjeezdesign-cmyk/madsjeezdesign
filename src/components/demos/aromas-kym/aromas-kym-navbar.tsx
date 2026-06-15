"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AROMAS_KYM_CONFIG, AK_CATEGORIES } from "@/lib/aromas-kym";

const NAV_LINKS = AK_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  href: "#coleccion",
}));

type Props = {
  cartCount: number;
  cartBump: boolean;
  onOpenCart: () => void;
  onSelectCategory?: (id: string) => void;
};

export function AromasKymNavbar({ cartCount, cartBump, onOpenCart, onSelectCategory }: Props) {
  const cfg = AROMAS_KYM_CONFIG;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goCategory = (id: string) => {
    setMenuOpen(false);
    onSelectCategory?.(id);
    document.querySelector("#coleccion")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Announcement strip */}
      <div className="fixed inset-x-0 top-0 z-[55] overflow-hidden border-b border-[#e8e1d4]/70 bg-[#f1ebdd]/85 py-2 backdrop-blur-sm">
        <div className="ak-ticker flex whitespace-nowrap">
          {[...Array(4)]
            .map(() => [
              "Envíos a todo el país",
              "Showroom · Spegazzini",
              "Atención WhatsApp · L a V 10—19 h",
              "Talleres mensuales de vela artesanal",
            ])
            .flat()
            .map((text, i) => (
              <span
                key={`${text}-${i}`}
                className="mx-8 font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]"
              >
                · {text}
              </span>
            ))}
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "top-9 border-b border-[#e8e1d4]/80 bg-[#fbf8f1]/95 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-md"
            : "top-9 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left"
          >
            <span
              className="block text-2xl italic leading-none text-[#1c1814] md:text-[1.75rem]"
              style={{ fontFamily: "var(--ak-serif)" }}
            >
              {cfg.brand}
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.04em] text-[#8d8074]">
              Apothecary · est. 2017
            </span>
          </button>

          {/* Center category nav (desktop) */}
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => goCategory(l.id)}
                className="group relative text-[11px] font-medium uppercase tracking-[0.04em] text-[#5a4e44] transition hover:text-[#1c1814]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#b85a3c] transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#5a4e44] transition hover:bg-[#f1ebdd] md:flex"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e1d4] bg-[#fbf8f1]/80 text-[#1c1814] transition hover:border-[#b85a3c]/60 hover:shadow-sm ${
                cartBump ? "ak-cart-bump" : ""
              }`}
              aria-label="Carrito"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              {cartCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#b85a3c] px-1 font-mono text-[9px] font-semibold text-[#fbf8f1]">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              className="text-[#5a4e44] lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menú"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <nav className="border-t border-[#e8e1d4] bg-[#fbf8f1] px-4 py-3 lg:hidden">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => goCategory(l.id)}
                className="block w-full py-3 text-left text-base italic text-[#1c1814]"
                style={{ fontFamily: "var(--ak-serif)" }}
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
