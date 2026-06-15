"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import {
  formatGustitosPrice,
  gustitosCartWhatsApp,
  type GustitosCartItem,
} from "@/lib/gustitos";

type Props = {
  open: boolean;
  items: GustitosCartItem[];
  total: number;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
};

export function MiniCart({ open, items, total, onClose, onUpdateQty, onRemove }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Cerrar"
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[81] flex w-full max-w-md flex-col border-l border-red-500/10 bg-zinc-950"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            role="dialog"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-red-400">
                Tu pedido GUSTITOS
              </h2>
              <button type="button" onClick={onClose} aria-label="Cerrar">
                <X className="h-5 w-5 text-[color:var(--muted-body)]" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <li className="py-16 text-center text-sm text-[color:var(--muted-body)]">
                  El carrito está vacío. Elegí tu smash favorita.
                </li>
              ) : (
                items.map((item) => {
                  const unit = item.price + (item.comboAdd ?? 0);
                  return (
                    <motion.li
                      key={item.key}
                      layout
                      className="mb-3 flex gap-3 rounded-xl border border-white/5 bg-zinc-900/60 p-3"
                    >
                      <motion.div
                        className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{item.name}</p>
                        {item.comboLabel && item.comboLabel !== "Solo burger" && (
                          <p className="text-xs text-[color:var(--muted-body)]">{item.comboLabel}</p>
                        )}
                        <p className="mt-1 font-mono text-sm text-amber-400">
                          {formatGustitosPrice(unit * item.quantity)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            className="rounded border border-white/10 p-1"
                            aria-label="Menos"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            className="rounded border border-white/10 p-1"
                            aria-label="Más"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove(item.key)}
                            className="ml-auto text-[color:var(--muted-body)] hover:text-red-400"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })
              )}
            </ul>
            <div className="border-t border-white/10 p-5">
              <div className="mb-4 flex justify-between">
                <span className="text-zinc-400">Total</span>
                <span className="font-mono text-xl text-white">{formatGustitosPrice(total)}</span>
              </div>
              <a
                href={items.length ? gustitosCartWhatsApp(items, total) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full rounded-xl py-3 text-center text-sm font-bold uppercase tracking-wider ${
                  items.length
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white gu-glow-red"
                    : "pointer-events-none bg-zinc-800 text-[color:var(--muted-body)]"
                }`}
              >
                Confirmar por WhatsApp
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
