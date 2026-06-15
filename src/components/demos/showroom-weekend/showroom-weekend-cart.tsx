"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatWeekendPrice,
  SHOWROOM_WEEKEND_CONFIG,
  weekendCartWhatsApp,
  type WeekendCartItem,
} from "@/lib/showroom-weekend";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: WeekendCartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
};

export function ShowroomWeekendCart({ open, onClose, cart, onUpdateQty, onRemove }: Props) {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState({ code: "", percent: 0 });
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const discountAmount = subtotal * (discount.percent / 100);
    return {
      subtotal,
      discountAmount,
      total: subtotal - discountAmount,
      count: cart.reduce((s, i) => s + i.quantity, 0),
    };
  }, [cart, discount]);

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    const pct = SHOWROOM_WEEKEND_CONFIG.coupons[code];
    if (pct) setDiscount({ code, percent: pct });
    else setDiscount({ code: "", percent: 0 });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="flex h-full w-screen max-w-md flex-col border-l border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/40 px-6 py-6">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <ShoppingBag className="h-5 w-5 text-rose-400" /> Mi bolsa
            </h3>
            <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-rose-500" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <p className="py-12 text-center text-slate-500">Tu bolsa está vacía</p>
            ) : (
              cart.map((item) => (
                <div key={item.key} className="relative flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-900">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <h4 className="pr-6 text-sm font-bold text-slate-200 line-clamp-1">{item.name}</h4>
                      <span className="mt-1 inline-block rounded-md border border-rose-500/10 bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                        Talle {item.selectedSize}
                      </span>
                    </div>
                    <div className="mt-2 flex items-end justify-between">
                      <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900 p-0.5">
                        <button type="button" onClick={() => onUpdateQty(item.key, -1)} className="flex h-6 w-6 items-center justify-center" aria-label="Menos">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button type="button" onClick={() => onUpdateQty(item.key, 1)} className="flex h-6 w-6 items-center justify-center" aria-label="Más">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-extrabold">{formatWeekendPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => onRemove(item.key)} className="absolute right-3 top-3 text-slate-500 hover:text-rose-500" aria-label="Quitar">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 ? (
            <div className="space-y-4 border-t border-slate-800 bg-slate-950/40 p-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="WEEKEND10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold uppercase text-white focus:border-rose-500 focus:outline-none"
                />
                <button type="button" onClick={applyCoupon} className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-indigo-500">
                  Aplicar
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <label className={`cursor-pointer rounded-lg border py-2 text-center ${deliveryMethod === "pickup" ? "border-rose-500 bg-rose-500/5 text-rose-400" : "border-slate-800 text-slate-400"}`}>
                  <input type="radio" name="delivery" className="sr-only" checked={deliveryMethod === "pickup"} onChange={() => setDeliveryMethod("pickup")} />
                  📍 Retiro local
                </label>
                <label className={`cursor-pointer rounded-lg border py-2 text-center ${deliveryMethod === "delivery" ? "border-rose-500 bg-rose-500/5 text-rose-400" : "border-slate-800 text-slate-400"}`}>
                  <input type="radio" name="delivery" className="sr-only" checked={deliveryMethod === "delivery"} onChange={() => setDeliveryMethod("delivery")} />
                  📦 Envío
                </label>
              </div>
              <div className="text-xs font-bold text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatWeekendPrice(totals.subtotal)}</span>
                </div>
                {discount.percent > 0 ? (
                  <div className="flex justify-between text-rose-400">
                    <span>Descuento ({discount.code})</span>
                    <span>-{formatWeekendPrice(totals.discountAmount)}</span>
                  </div>
                ) : null}
                <div className="mt-2 flex justify-between border-t border-slate-800 pt-2 text-base font-black text-white">
                  <span>Total</span>
                  <span className="text-rose-400">{formatWeekendPrice(totals.total)}</span>
                </div>
              </div>
              <a
                href={weekendCartWhatsApp(cart, totals, discount, deliveryMethod)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-xs font-black uppercase tracking-[0.04em] text-white hover:bg-emerald-500"
              >
                💬 Pedir por WhatsApp
              </a>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

export function ShowroomWeekendCartButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-full border border-slate-800 bg-slate-900 p-3 text-slate-200 shadow-md transition-all hover:border-rose-500/20 hover:text-rose-500"
      aria-label={`Carrito, ${count} artículos`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-slate-950 bg-gradient-to-r from-rose-500 to-pink-500 px-1 text-[10px] font-black text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}
