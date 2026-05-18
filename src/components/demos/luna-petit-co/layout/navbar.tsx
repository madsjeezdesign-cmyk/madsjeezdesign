"use client";

import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { formatLunaPrice, LUNA_PETIT_CO_CONFIG } from "@/lib/luna-petit-co";
import { useScrolled } from "../hooks/use-scrolled";

type Props = {
  cartCount: number;
  cartTotal: number;
  wishCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNav: (id: string) => void;
};

const LINKS = [
  { id: "coleccion", label: "Colección" },
  { id: "categorias", label: "Categorías" },
  { id: "confianza", label: "Nosotros" },
];

export function LunaNavbar({ cartCount, cartTotal, wishCount, onOpenCart, onOpenSearch, onNav }: Props) {
  const cfg = LUNA_PETIT_CO_CONFIG;
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(248,246,242,0.85)" : "rgba(248,246,242,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0)",
        }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <button type="button" onClick={() => onNav("inicio")} className="font-serif text-xl tracking-wide text-neutral-900">
            {cfg.brand}
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => onNav(l.id)}
                className="relative text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-600 transition hover:text-neutral-900"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={onOpenSearch} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/60" aria-label="Buscar">
              <Search className="h-4 w-4 text-neutral-700" strokeWidth={1.5} />
            </button>
            <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/60" aria-label="Favoritos">
              <Heart className="h-4 w-4 text-neutral-700" strokeWidth={1.5} />
              {wishCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-300/90 text-[9px] font-medium text-neutral-900">
                  {wishCount}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 rounded-full border border-neutral-200/60 bg-white/70 px-3 py-2 backdrop-blur-md transition hover:shadow-md"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden text-xs font-medium text-neutral-800 sm:inline">{cartCount}</span>
              <span className="hidden border-l border-neutral-200 pl-2 text-xs text-neutral-600 md:inline">
                {formatLunaPrice(cartTotal)}
              </span>
            </button>
            <button type="button" className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Menú">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-neutral-900/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#F8F6F2] p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={() => setMobileOpen(false)} className="absolute right-6 top-6">
                <X className="h-6 w-6" />
              </button>
              <p className="mt-12 font-serif text-2xl text-neutral-900">{cfg.brand}</p>
              <div className="mt-10 space-y-6">
                {LINKS.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    type="button"
                    onClick={() => {
                      onNav(l.id);
                      setMobileOpen(false);
                    }}
                    className="block text-2xl font-serif text-neutral-800"
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
