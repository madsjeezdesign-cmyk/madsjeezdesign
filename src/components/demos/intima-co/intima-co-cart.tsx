"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcIntimaTotals,
  formatIntimaPrice,
  type IntimaCartLine,
  type IntimaDeliveryMode,
} from "@/lib/intima-co";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: IntimaCartLine[];
  packDiscount: number;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: (mode: IntimaDeliveryMode) => void;
};

export function IntimaCoCart({
  open,
  onClose,
  lines,
  packDiscount,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const [mode, setMode] = useState<IntimaDeliveryMode>("discrete");
  const totals = useMemo(
    () => calcIntimaTotals(lines, mode, packDiscount),
    [lines, mode, packDiscount],
  );
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="ic-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-stone-200/80 bg-stone-50/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-stone-200/60 px-4 py-4">
          <div>
            <h3 className="font-serif text-lg text-stone-900">Tu selección</h3>
            <p className="text-xs font-light text-stone-500">{count} piezas</p>
          </div>
          <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700" aria-label="Cerrar">
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm font-light text-stone-400">Tu carrito está vacío</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="rounded-2xl border border-stone-200/60 bg-white/90 p-3">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-stone-900 line-clamp-2">{line.name}</p>
                      <p className="mt-1 flex items-center gap-2 text-[10px] font-light text-stone-500">
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-stone-200"
                          style={{ backgroundColor: line.colorHex }}
                        />
                        {line.colorName} · Talle {line.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="shrink-0 text-stone-300 hover:text-rose-400"
                      aria-label="Quitar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-stone-200 bg-stone-50">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(line.key, -1)}
                        className="flex h-8 w-8 items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-xs">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(line.key, 1)}
                        className="flex h-8 w-8 items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-light text-stone-800">
                      {formatIntimaPrice(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-4 border-t border-stone-200/60 bg-white/80 p-4 backdrop-blur">
            <p className="text-[10px] font-light uppercase tracking-[0.25em] text-stone-400">Entrega</p>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => setMode("discrete")}
                className={`rounded-xl border px-3 py-3 text-left text-xs font-light ${
                  mode === "discrete"
                    ? "border-stone-800 bg-stone-50 text-stone-900"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                Envío discreto a domicilio
                <span className="mt-0.5 block text-stone-400">Embalaje neutro · correo</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("pickup")}
                className={`rounded-xl border px-3 py-3 text-left text-xs font-light ${
                  mode === "pickup"
                    ? "border-rose-200 bg-rose-50/40 text-stone-900"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                Retiro gratuito en showroom
                <span className="mt-0.5 block text-stone-400">Carlos Spegazzini</span>
              </button>
            </div>

            <div className="space-y-1 text-sm font-light">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatIntimaPrice(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 ? (
                <div className="flex justify-between text-rose-500/90">
                  <span>Descuento pack</span>
                  <span>-{formatIntimaPrice(totals.discount)}</span>
                </div>
              ) : null}
              {totals.shipping > 0 ? (
                <div className="flex justify-between text-stone-600">
                  <span>Envío</span>
                  <span>{formatIntimaPrice(totals.shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-stone-100 pt-2 font-medium text-stone-900">
                <span>Total</span>
                <span>{formatIntimaPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckout(mode)}
              className="w-full rounded-full bg-stone-900 py-4 text-xs font-light uppercase tracking-[0.2em] text-stone-50 transition hover:bg-stone-800"
            >
              Proceder al pago
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
