"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame, Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GUSTITOS_CONFIG, formatGustitosPrice } from "@/lib/gustitos";
import { useScrolled } from "../hooks/use-scrolled";
import { MagneticButton } from "../shared/magnetic-button";

const NAV = [
  { href: "#menu", label: "Menú" },
  { href: "#categorias", label: "Categorías" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

type Props = {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOrder: () => void;
};

export function Navbar({ cartCount, cartTotal, onOpenCart, onOrder }: Props) {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = GUSTITOS_CONFIG;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-red-500/10 bg-zinc-950/85 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="#" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-500/30">
              <Flame className="h-5 w-5 text-white" aria-hidden />
            </span>
            <span className="font-[family-name:var(--font-gu-display)] text-2xl tracking-wider text-white">
              {cfg.brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <motion.div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCart}
              className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-300 hover:border-red-500/40"
              aria-label={`Carrito, ${cartCount} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
            <MagneticButton
              onClick={onOrder}
              className="hidden rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30 lg:inline-flex"
            >
              Pedir ahora
            </MagneticButton>
            <button
              type="button"
              className="rounded-xl border border-white/10 p-2.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
        {scrolled && cartCount > 0 && (
          <p className="hidden text-center text-xs text-[color:var(--muted-body)] lg:block">
            Tu pedido · {formatGustitosPrice(cartTotal)}
          </p>
        )}
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-zinc-950/98 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="flex items-center justify-between border-b border-white/10 p-4">
              <span className="font-[family-name:var(--font-gu-display)] text-2xl text-red-500">
                {cfg.brand}
              </span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Cerrar">
                <X className="h-6 w-6" />
              </button>
            </motion.div>
            <nav className="flex flex-col p-6">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 py-5 text-3xl font-light text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
