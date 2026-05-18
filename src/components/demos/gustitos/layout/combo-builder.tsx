"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  GUSTITOS_COMBOS,
  formatGustitosPrice,
  type GustitosComboOption,
  type GustitosProduct,
} from "@/lib/gustitos";

type Props = {
  product: GustitosProduct | null;
  onClose: () => void;
  onAdd: (product: GustitosProduct, combo: GustitosComboOption, qty: number) => void;
};

export function ComboBuilder({ product, onClose, onAdd }: Props) {
  const [comboId, setComboId] = useState(GUSTITOS_COMBOS[0].id);
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const combo = GUSTITOS_COMBOS.find((c) => c.id === comboId) ?? GUSTITOS_COMBOS[0];
  const unit = product.price + combo.priceAdd;

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
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
            aria-label="Cerrar"
          />
          <motion.div
            className="relative w-full max-w-lg rounded-t-3xl border border-red-500/20 bg-zinc-900 p-6 sm:rounded-2xl gu-glow-red"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            role="dialog"
            aria-labelledby="combo-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg border border-white/10 p-2"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={product.image} alt="" fill className="object-cover" />
              </div>
              <div>
                <h2 id="combo-title" className="text-xl font-bold text-white">
                  {product.name}
                </h2>
                <p className="text-sm text-zinc-500">{product.description}</p>
              </div>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-red-400">
              Armá tu combo
            </p>
            <div className="mt-3 space-y-2">
              {GUSTITOS_COMBOS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setComboId(c.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${
                    comboId === c.id
                      ? "border-red-500/50 bg-red-500/10 text-white"
                      : "border-white/10 text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <span>{c.label}</span>
                  <span className="font-mono text-amber-400">
                    {c.priceAdd > 0 ? `+${formatGustitosPrice(c.priceAdd)}` : "—"}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 px-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-lg"
                >
                  −
                </button>
                <span className="w-6 text-center font-mono">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 text-lg"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAdd(product, combo, qty);
                  onClose();
                }}
                className="rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 font-bold text-white"
              >
                Agregar · {formatGustitosPrice(unit * qty)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
