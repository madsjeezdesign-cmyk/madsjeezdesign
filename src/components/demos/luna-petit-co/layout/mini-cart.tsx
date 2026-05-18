"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { formatLunaPrice, type LunaCartItem } from "@/lib/luna-petit-co";

type Props = {
  open: boolean;
  items: LunaCartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
};

export function LunaMiniCart({ open, items, onClose, onUpdateQty, onRemove }: Props) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-neutral-900/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col border-l border-neutral-200/40 bg-[#F8F6F2]/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-neutral-200/40 px-5 py-4">
              <h3 className="font-serif text-xl text-neutral-900">Tu bolsa</h3>
              <button type="button" onClick={onClose} aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="py-20 text-center text-sm text-neutral-500">Tu bolsa está vacía</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.key} className="rounded-2xl border border-neutral-200/50 bg-white/80 p-4">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-medium text-neutral-900">{item.name}</p>
                          <p className="text-[10px] text-neutral-500">
                            {item.colors.find((c) => c.id === item.colorId)?.name} · Talle {item.size}
                          </p>
                        </div>
                        <button type="button" onClick={() => onRemove(item.key)} className="text-neutral-400">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-neutral-200">
                          <button type="button" onClick={() => onUpdateQty(item.key, -1)} className="px-2 py-1">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs">{item.quantity}</span>
                          <button type="button" onClick={() => onUpdateQty(item.key, 1)} className="px-2 py-1">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">{formatLunaPrice(item.price * item.quantity)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 ? (
              <div className="border-t border-neutral-200/40 p-5">
                <div className="flex justify-between font-serif text-lg">
                  <span>Total</span>
                  <span>{formatLunaPrice(total)}</span>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full bg-neutral-900 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#F8F6F2]"
                >
                  Finalizar compra
                </button>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
