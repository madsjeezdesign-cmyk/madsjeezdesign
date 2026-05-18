"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatBakeryPrice,
  MASA_MADRE_CONFIG,
  masaMadreCartWhatsApp,
  type BakeryCartItem,
} from "@/lib/masa-madre-co";

type Props = {
  open: boolean;
  onClose: () => void;
  items: BakeryCartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: (waUrl: string) => void;
};

export function MasaMadreCoCart({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: Props) {
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
  const cfg = MASA_MADRE_CONFIG;

  const { subtotal, shipping, total, count } = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = delivery === "delivery" ? cfg.deliveryFee : 0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
      count: items.reduce((s, i) => s + i.quantity, 0),
    };
  }, [items, delivery, cfg.deliveryFee]);

  if (!open) return null;

  const finish = () => {
    if (items.length === 0) return;
    const url = masaMadreCartWhatsApp(items, subtotal, shipping, delivery);
    onCheckout(url);
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden">
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="flex h-full w-screen max-w-md flex-col border-l border-stone-200 bg-stone-50 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-200 bg-orange-50/60 px-6 py-5">
            <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
              <ShoppingBag className="h-5 w-5 text-orange-700" />
              Tu pedido
              {count > 0 ? (
                <span className="rounded-full bg-orange-700 px-2 py-0.5 text-[10px] font-black text-white">
                  {count}
                </span>
              ) : null}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm hover:text-orange-700"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="py-16 text-center text-stone-500">Tu carrito está vacío. ¡Elegí algo rico!</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.key}
                  className="relative flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <h4 className="pr-6 text-sm font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-stone-500">{formatBakeryPrice(item.price)} c/u</p>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, -1)}
                          className="flex h-7 w-7 items-center justify-center"
                          aria-label="Menos"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, 1)}
                          className="flex h-7 w-7 items-center justify-center"
                          aria-label="Más"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-black text-orange-800">
                        {formatBakeryPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(item.key)}
                    className="absolute right-3 top-3 text-stone-400 hover:text-red-600"
                    aria-label="Quitar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 ? (
            <div className="space-y-4 border-t border-stone-200 bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Tipo de entrega</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDelivery("pickup")}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${
                    delivery === "pickup"
                      ? "border-orange-500 bg-orange-50 text-orange-900"
                      : "border-stone-200 text-stone-600"
                  }`}
                >
                  Retiro en local
                  <span className="mt-1 block text-[10px] font-normal text-green-700">Gratis</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDelivery("delivery")}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${
                    delivery === "delivery"
                      ? "border-orange-500 bg-orange-50 text-orange-900"
                      : "border-stone-200 text-stone-600"
                  }`}
                >
                  Envío a domicilio
                  <span className="mt-1 block text-[10px] font-normal text-stone-500">
                    +{formatBakeryPrice(cfg.deliveryFee)}
                  </span>
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatBakeryPrice(subtotal)}</span>
                </div>
                {delivery === "delivery" ? (
                  <div className="flex justify-between text-stone-600">
                    <span>Envío</span>
                    <span className="font-bold">{formatBakeryPrice(shipping)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-black text-stone-900">
                  <span>Total</span>
                  <span className="text-orange-800">{formatBakeryPrice(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={finish}
                className="w-full rounded-xl bg-orange-700 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-200 transition hover:bg-orange-800"
              >
                Finalizar pedido
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
