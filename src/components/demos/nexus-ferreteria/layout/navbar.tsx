"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingCart, X, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  NEXUS_FERRETERIA_CONFIG,
  formatNexusPrice,
} from "@/lib/nexus-ferreteria";
import { useScrolled } from "../hooks/use-scrolled";
import { MagneticButton } from "../shared/magnetic-button";

type Props = {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenQuote: () => void;
};

const NAV = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#categorias", label: "Categorías" },
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenQuote,
}: Props) {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = NEXUS_FERRETERIA_CONFIG;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-zinc-950/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
          initial={false}
          animate={{ opacity: 1 }}
        >
          <Link href="#" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10">
              <Zap className="h-4 w-4 text-orange-400" aria-hidden />
            </span>
            <div>
              <span className="block font-mono text-xs tracking-[0.3em] text-orange-400">
                {cfg.brand}
              </span>
              <span className="block text-sm font-semibold text-white">
                {cfg.brandSub}
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <motion.div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenSearch}
              className="hidden rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-300 transition hover:border-orange-500/40 hover:text-white sm:flex"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="relative hidden rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-300 sm:flex"
              aria-label={`Favoritos, ${wishlistCount}`}
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              className="relative rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-300 transition hover:border-orange-500/40"
              aria-label={`Carrito, ${cartCount} productos`}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <MagneticButton
              onClick={onOpenQuote}
              className="hidden rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-orange-500/20 lg:inline-flex"
            >
              Cotizar obra
            </MagneticButton>
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menú"
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </motion.div>
        </motion.div>
        {scrolled && cartCount > 0 && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="hidden text-center text-xs text-[color:var(--muted-body)] lg:block"
          >
            Carrito · {formatNexusPrice(cartTotal)}
          </motion.p>
        )}
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-zinc-950/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="font-mono text-orange-400">{cfg.brand}</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Cerrar">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 py-4 text-2xl font-light text-white"
                >
                  {item.label}
                </motion.a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenSearch();
                }}
                className="mt-4 flex items-center gap-2 text-orange-400"
              >
                <Search className="h-5 w-5" /> Buscar productos
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
