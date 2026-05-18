"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { formatGustitosPrice, type GustitosProduct } from "@/lib/gustitos";

type Props = {
  product: GustitosProduct | null;
  onClose: () => void;
  onCustomize: () => void;
};

export function QuickView({ product, onClose, onCustomize }: Props) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[84] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-black/85" onClick={onClose} aria-label="Cerrar" />
          <motion.div
            layoutId={`gu-item-${product.id}`}
            className="relative max-h-[90vh] w-full max-w-md overflow-hidden rounded-2xl border border-red-500/20 bg-zinc-900"
          >
            <div className="relative aspect-square">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg bg-black/50 p-2" aria-label="Cerrar">
                <X className="h-4 w-4" />
              </button>
              <h2 className="text-2xl font-bold text-white">{product.name}</h2>
              <p className="mt-2 text-sm text-zinc-400">{product.description}</p>
              <p className="mt-4 font-mono text-2xl text-amber-400">{formatGustitosPrice(product.price)}</p>
              <button
                type="button"
                onClick={onCustomize}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-red-600 to-orange-500 py-3 font-bold uppercase text-white"
              >
                Personalizar y agregar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
