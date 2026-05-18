"use client";

import { motion } from "framer-motion";
import { Home, LayoutGrid, MessageCircle, Search, ShoppingCart } from "lucide-react";

type Props = {
  cartCount: number;
  onSearch: () => void;
  onCart: () => void;
  onQuote: () => void;
};

export function MobileDock({ cartCount, onSearch, onCart, onQuote }: Props) {
  return (
    <motion.nav
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/10 bg-zinc-950/90 px-2 py-2 shadow-2xl backdrop-blur-xl lg:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      aria-label="Navegación móvil"
    >
      <a
        href="#"
        className="flex flex-col items-center rounded-xl px-3 py-2 text-orange-400"
      >
        <Home className="h-5 w-5" />
        <span className="text-[10px]">Inicio</span>
      </a>
      <a
        href="#catalogo"
        className="flex flex-col items-center rounded-xl px-3 py-2 text-zinc-500"
      >
        <LayoutGrid className="h-5 w-5" />
        <span className="text-[10px]">Catálogo</span>
      </a>
      <button
        type="button"
        onClick={onSearch}
        className="flex flex-col items-center rounded-xl px-3 py-2 text-zinc-500"
      >
        <Search className="h-5 w-5" />
        <span className="text-[10px]">Buscar</span>
      </button>
      <button
        type="button"
        onClick={onCart}
        className="relative flex flex-col items-center rounded-xl px-3 py-2 text-zinc-500"
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-black">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Carrito</span>
      </button>
      <button
        type="button"
        onClick={onQuote}
        className="flex flex-col items-center rounded-xl bg-orange-500/20 px-3 py-2 text-orange-400"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-[10px]">Cotizar</span>
      </button>
    </motion.nav>
  );
}
