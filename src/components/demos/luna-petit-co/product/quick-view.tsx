"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { formatLunaPrice, type LunaProduct } from "@/lib/luna-petit-co";
import { MagneticButton } from "../shared/magnetic-button";

type Props = {
  product: LunaProduct | null;
  onClose: () => void;
  onAdd: (p: LunaProduct, size: string, colorId: string) => void;
};

export function QuickView({ product, onClose, onAdd }: Props) {
  const [size, setSize] = useState("");
  const [colorId, setColorId] = useState("");

  if (!product) return null;

  const activeSize = size || product.sizes[0];
  const activeColor = colorId || product.colors[0].id;

  return (
    <AnimatePresence>
      {product ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-end justify-center bg-neutral-900/40 p-4 backdrop-blur-md sm:items-center"
          onClick={onClose}
        >
          <motion.div
            layoutId={`product-${product.id}`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-neutral-200/40 bg-[#F8F6F2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2">
              <X className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square bg-neutral-100">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl text-neutral-900">{product.name}</h3>
                <p className="mt-4 text-xl font-medium">{formatLunaPrice(product.price)}</p>
                <p className="mt-6 text-[10px] uppercase tracking-widest text-neutral-500">Talle</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-[2.5rem] rounded-full border px-3 py-2 text-xs ${
                        activeSize === s ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-[10px] uppercase tracking-widest text-neutral-500">Color</p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColorId(c.id)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        activeColor === c.id ? "border-neutral-900" : "border-neutral-200"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
                <MagneticButton
                  onClick={() => {
                    onAdd(product, activeSize, activeColor);
                    onClose();
                  }}
                  className="mt-8 w-full rounded-full bg-neutral-900 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white"
                >
                  Agregar al carrito
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
