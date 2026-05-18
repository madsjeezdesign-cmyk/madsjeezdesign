"use client";

import { Home, Search, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  cartCount: number;
  onHome: () => void;
  onSearch: () => void;
  onCart: () => void;
  onCollection: () => void;
};

export function MobileDock({ cartCount, onHome, onSearch, onCart, onCollection }: Props) {
  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-2xl border border-white/20 bg-white/80 py-3 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-xl md:hidden"
    >
      <button type="button" onClick={onHome} className="p-2 text-neutral-600" aria-label="Inicio">
        <Home className="h-5 w-5" />
      </button>
      <button type="button" onClick={onCollection} className="p-2 text-neutral-600" aria-label="Colección">
        <Sparkles className="h-5 w-5" />
      </button>
      <button type="button" onClick={onSearch} className="p-2 text-neutral-600" aria-label="Buscar">
        <Search className="h-5 w-5" />
      </button>
      <button type="button" onClick={onCart} className="relative p-2 text-neutral-600" aria-label="Carrito">
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-white">
            {cartCount}
          </span>
        ) : null}
      </button>
    </motion.nav>
  );
}
