"use client";

import { ShoppingBag, Trash2, X } from "lucide-react";
import { formatBarberPrice, type BarberProduct } from "@/lib/the-barber-club";

type Props = {
  open: boolean;
  onClose: () => void;
  items: BarberProduct[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export function TheBarberClubCart({ open, onClose, items, onRemove, onCheckout }: Props) {
  if (!open) return null;

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="fixed inset-0 z-[55] flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            <h3 className="font-bold text-white">Tu carrito</h3>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-20 text-center text-sm text-zinc-500">El carrito está vacío.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 p-3">
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-xs text-amber-400">{formatBarberPrice(item.price)}</p>
                  </div>
                  <button type="button" onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-rose-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-zinc-800 p-5 space-y-4">
            <div className="flex justify-between font-bold">
              <span className="text-zinc-400">Total</span>
              <span className="text-xl text-amber-400">{formatBarberPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-xs font-black uppercase tracking-widest text-zinc-950"
            >
              Finalizar compra (demo)
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
