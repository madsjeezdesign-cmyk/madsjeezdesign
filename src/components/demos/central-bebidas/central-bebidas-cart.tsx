"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcCartTotals,
  formatBebidaPrice,
  getLineUnitPrice,
  type BebidaCartItem,
  type DeliveryMethod,
  type PurchaseMode,
} from "@/lib/central-bebidas";

type Props = {
  open: boolean;
  onClose: () => void;
  items: BebidaCartItem[];
  mode: PurchaseMode;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: (delivery: DeliveryMethod) => void;
};

const DELIVERY_OPTIONS: { id: DeliveryMethod; label: string; sub: string }[] = [
  { id: "flete", label: "Envío programado en flete", sub: "24–72 hs según zona" },
  { id: "express", label: "Envío express en el día", sub: "Motos · GBA sur" },
  { id: "deposito", label: "Retiro en depósito central", sub: "Gratis · Avellaneda" },
];

export function CentralBebidasCart({
  open,
  onClose,
  items,
  mode,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const [delivery, setDelivery] = useState<DeliveryMethod>("flete");

  const totals = useMemo(() => calcCartTotals(items, mode, delivery), [items, mode, delivery]);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="cdb-slide-in absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Tu pedido</h3>
            <p className="text-xs text-[color:var(--muted-body)]">{count} artículos</p>
          </div>
          <button type="button" onClick={onClose} className="text-[color:var(--muted-body)] hover:text-white" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <p className="py-16 text-center text-[color:var(--muted-body)]">Carrito vacío</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const unit = getLineUnitPrice(item, item.quantity, mode);
                return (
                  <li key={item.key} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-[color:var(--muted-body)]">{item.volume}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.key)}
                        className="shrink-0 text-[color:var(--muted-body)] hover:text-red-400"
                        aria-label="Quitar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, -1)}
                          className="flex h-9 w-9 items-center justify-center rounded bg-zinc-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center font-black text-white">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, 1)}
                          className="flex h-9 w-9 items-center justify-center rounded bg-zinc-800"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-black text-lime-400">
                        {formatBebidaPrice(unit * item.quantity)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="space-y-4 border-t border-zinc-800 p-4">
            <p className="text-[10px] font-black uppercase text-[color:var(--muted-body)]">Entrega</p>
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDelivery(opt.id)}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs transition ${
                    delivery === opt.id
                      ? "border-lime-500/50 bg-lime-500/10 text-white"
                      : "border-zinc-800 text-zinc-400"
                  }`}
                >
                  <span className="font-bold">{opt.label}</span>
                  <span className="mt-0.5 block text-[10px] text-[color:var(--muted-body)]">{opt.sub}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatBebidaPrice(totals.subtotal)}</span>
              </div>
              {totals.wholesaleSave > 0 ? (
                <div className="flex justify-between text-lime-400">
                  <span>Desc. mayorista / bulto</span>
                  <span>-{formatBebidaPrice(totals.wholesaleSave)}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span>{formatBebidaPrice(totals.shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-2 text-lg font-black text-white">
                <span>Total</span>
                <span className="text-amber-400">{formatBebidaPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckout(delivery)}
              className="w-full rounded-xl bg-lime-500 py-4 text-sm font-black uppercase text-zinc-950 hover:bg-lime-400"
            >
              Finalizar pedido
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
