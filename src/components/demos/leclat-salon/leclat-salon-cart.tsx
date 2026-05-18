"use client";

import { X } from "lucide-react";
import { formatSalonPrice, type SalonProduct } from "@/lib/leclat-salon";

type CartItem = SalonProduct & { key: string; quantity: number };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (key: string) => void;
};

export function LeclatSalonCart({ open, onClose, items, onRemove }: Props) {
  if (!open) return null;

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-[75]">
      <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-rose-100 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <h3 className="font-serif text-lg text-stone-900">Tu bolsa</h3>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            <X className="h-5 w-5 text-stone-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-stone-400">Vacía</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.key} className="flex justify-between gap-2 text-sm">
                  <span className="text-stone-800">
                    {i.quantity}x {i.name}
                  </span>
                  <button type="button" onClick={() => onRemove(i.key)} className="text-rose-400 text-xs">
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 ? (
          <div className="border-t border-stone-100 p-5">
            <p className="flex justify-between font-serif text-lg text-rose-600">
              <span>Total</span>
              <span>{formatSalonPrice(total)}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-full bg-stone-900 py-3 text-[10px] font-semibold uppercase tracking-wider text-white"
            >
              Retirar en salón (demo)
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export type { CartItem };
