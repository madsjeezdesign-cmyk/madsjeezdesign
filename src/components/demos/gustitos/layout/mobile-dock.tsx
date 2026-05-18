"use client";

import { motion } from "framer-motion";
import { Flame, Home, ShoppingBag, UtensilsCrossed } from "lucide-react";

type Props = {
  cartCount: number;
  onCart: () => void;
  onOrder: () => void;
};

export function MobileDock({ cartCount, onCart, onOrder }: Props) {
  return (
    <motion.nav
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-red-500/20 bg-zinc-950/95 px-2 py-2 shadow-2xl shadow-red-500/20 backdrop-blur-xl lg:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      aria-label="Navegación móvil"
    >
      <a href="#" className="flex flex-col items-center rounded-xl px-3 py-2 text-red-400">
        <Home className="h-5 w-5" />
        <span className="text-[10px]">Inicio</span>
      </a>
      <a href="#menu" className="flex flex-col items-center rounded-xl px-3 py-2 text-zinc-500">
        <UtensilsCrossed className="h-5 w-5" />
        <span className="text-[10px]">Menú</span>
      </a>
      <button
        type="button"
        onClick={onCart}
        className="relative flex flex-col items-center rounded-xl px-3 py-2 text-zinc-500"
      >
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-black">
            {cartCount}
          </span>
        )}
        <span className="text-[10px]">Carrito</span>
      </button>
      <button
        type="button"
        onClick={onOrder}
        className="flex flex-col items-center rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-white"
      >
        <Flame className="h-5 w-5" />
        <span className="text-[10px] font-bold">Pedir</span>
      </button>
    </motion.nav>
  );
}
