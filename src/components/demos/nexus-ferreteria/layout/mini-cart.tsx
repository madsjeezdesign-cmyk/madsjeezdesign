"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import {
  formatNexusPrice,
  nexusCartWhatsApp,
  type NexusCartItem,
} from "@/lib/nexus-ferreteria";

type Props = {
  open: boolean;
  items: NexusCartItem[];
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
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Cerrar carrito"
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-[81] flex w-full max-w-md flex-col border-l border-white/10 bg-zinc-950 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            role="dialog"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <h2 className="font-mono text-sm uppercase tracking-widest text-orange-400">
                Carrito industrial
              </h2>
              <button type="button" onClick={onClose} aria-label="Cerrar">
                <X className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <li className="py-12 text-center text-sm text-[color:var(--muted-body)]">
                  Tu carrito está vacío. Agregá herramientas desde el catálogo.
                </li>
              ) : (
                items.map((item) => (
                  <motion.li
                    key={item.key}
                    layout
                    className="mb-4 flex gap-3 rounded-xl border border-white/5 bg-zinc-900/50 p-3"
                  >
                    <div
                      className="h-20 w-20 shrink-0 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-[color:var(--muted-body)]">{item.brand}</p>
                      <p className="mt-1 font-mono text-sm text-orange-400">
                        {formatNexusPrice(item.price * item.quantity)}
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
                ))
              )}
            </ul>
            <div className="border-t border-white/10 p-5">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-zinc-400">Total estimado</span>
                <span className="font-mono text-lg text-white">{formatNexusPrice(total)}</span>
              </div>
              <a
                href={items.length ? nexusCartWhatsApp(items, total) : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wider ${
                  items.length
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-black"
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
