"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useMemo } from "react";
import {
  formatLinajePrice,
  NIDO_LINAJE_CONFIG,
  type LinajeCartItem,
} from "@/lib/nido-linaje";

type Props = {
  open: boolean;
  onClose: () => void;
  items: LinajeCartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
};

export function NidoLinajeCart({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: Props) {
  const cfg = NIDO_LINAJE_CONFIG;

  const { subtotal, shipping, total, count } = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const shipping = items.length > 0 ? cfg.shippingFee : 0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      count: items.reduce((s, i) => s + i.quantity, 0),
    };
  }, [items, cfg.shippingFee]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <aside className="nl-slide-panel flex h-full w-screen max-w-md flex-col border-l border-stone-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-100 px-8 py-7">
            <div>
              <h3 className="font-serif text-xl font-light text-stone-900">Tu selección</h3>
              <p className="text-[10px] uppercase tracking-[0.04em] text-stone-400">
                {count} {count === 1 ? "pieza" : "piezas"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 transition hover:text-stone-800"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
            {items.length === 0 ? (
              <p className="py-20 text-center text-sm font-light text-stone-400">
                Tu carrito está vacío. Descubrí nuestras colecciones.
              </p>
            ) : (
              items.map((item) => (
                <div key={item.key} className="flex gap-4 border-b border-stone-50 pb-6">
                  <div className="relative h-24 w-20 shrink-0 bg-stone-100">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-base font-light text-stone-900 line-clamp-2">{item.name}</h4>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-stone-400">
                      {item.size.label} · {item.color.label}
                    </p>
                    <p className="mt-2 text-sm text-stone-700">{formatLinajePrice(item.unitPrice)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-stone-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, -1)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900"
                          aria-label="Menos"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[1rem] text-center text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, 1)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-900"
                          aria-label="Más"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.key)}
                        className="text-[10px] uppercase tracking-[0.04em] text-stone-400 hover:text-stone-800"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 ? (
            <div className="space-y-4 border-t border-stone-100 bg-stone-50/50 px-8 py-8">
              <div className="flex justify-between text-sm text-stone-600">
                <span>Subtotal</span>
                <span>{formatLinajePrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-600">
                <span>Envío premium</span>
                <span>{formatLinajePrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-4 font-serif text-lg text-stone-900">
                <span>Total</span>
                <span>{formatLinajePrice(total)}</span>
              </div>
              <button
                type="button"
                onClick={onCheckout}
                className="w-full rounded-sm bg-stone-900 py-4 text-[11px] font-medium uppercase tracking-[0.04em] text-white transition hover:bg-stone-700"
              >
                Proceder al pago
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
