"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  STOCK_LABELS,
  formatNexusPrice,
  type NexusProduct,
} from "@/lib/nexus-ferreteria";

type Props = {
  product: NexusProduct | null;
  onClose: () => void;
  onAdd: (p: NexusProduct, qty: number) => void;
};

export function QuickView({ product, onClose, onAdd }: Props) {
  const [qty, setQty] = useState(1);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Cerrar"
          />
          <motion.div
            layoutId={`nx-product-${product.id}`}
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-zinc-900 sm:max-h-[90vh] sm:flex-row sm:rounded-2xl"
          >
            <div className="relative aspect-square w-full sm:w-1/2">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg border border-white/10 p-2"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-mono text-xs text-orange-400">{product.sku}</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{product.name}</h2>
              <p className="text-sm text-[color:var(--muted-body)]">{product.brand}</p>
              <span
                className={`mt-3 inline-block w-fit rounded-full border px-2 py-0.5 text-xs ${STOCK_LABELS[product.stock].className}`}
              >
                {STOCK_LABELS[product.stock].label}
              </span>
              <ul className="mt-4 space-y-1 text-sm text-zinc-400">
                {product.specs.map((s) => (
                  <li key={s}>· {s}</li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-3xl text-orange-400">
                {formatNexusPrice(product.price)}
              </p>
              <div className="mt-auto flex items-center gap-4 pt-6">
                <motion.div className="flex items-center rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-3"
                    aria-label="Menos"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-mono">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="p-3"
                    aria-label="Más"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </motion.div>
                <button
                  type="button"
                  onClick={() => {
                    onAdd(product, qty);
                    onClose();
                  }}
                  disabled={product.stock === "out"}
                  className="flex-1 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 py-3 font-bold uppercase tracking-wider text-black disabled:opacity-40"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
