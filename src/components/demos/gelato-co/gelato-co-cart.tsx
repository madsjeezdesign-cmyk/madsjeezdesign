"use client";

import { MessageCircle, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcGelatoTotals,
  formatGelatoPrice,
  type DeliveryMode,
  type GelatoCartLine,
} from "@/lib/gelato-co";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: GelatoCartLine[];
  onRemove: (key: string) => void;
  onWhatsApp: (mode: DeliveryMode) => void;
};

export function GelatoCoCart({ open, onClose, lines, onRemove, onWhatsApp }: Props) {
  const [mode, setMode] = useState<DeliveryMode>("delivery");
  const totals = useMemo(() => calcGelatoTotals(lines, mode), [lines, mode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="gc-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-stone-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4">
          <h3 className="font-serif text-lg text-stone-900">Tu pedido</h3>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            <X className="h-5 w-5 text-stone-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-stone-400">Tu carrito está vacío 🍨</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="rounded-xl border border-stone-100 bg-stone-50 p-3">
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold text-stone-900">
                      {line.quantity}x {line.sizeLabel}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="text-[10px] font-bold uppercase text-rose-500"
                    >
                      Quitar
                    </button>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">
                    {line.flavors.map((f) => f.name).join(", ")}
                  </p>
                  <p className="mt-2 font-bold text-rose-600">
                    {formatGelatoPrice(line.unitPrice * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-4 border-t border-stone-100 p-4">
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setMode("delivery")}
                className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold ${
                  mode === "delivery"
                    ? "border-sky-300 bg-sky-50 text-sky-900"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                Delivery Express
                <span className="mt-0.5 block font-normal text-stone-500">En caja térmica</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("pickup")}
                className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold ${
                  mode === "pickup"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-stone-200 text-stone-600"
                }`}
              >
                Retiro por la sucursal
              </button>
            </div>

            <div className="space-y-1 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatGelatoPrice(totals.subtotal)}</span>
              </div>
              {mode === "delivery" ? (
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{formatGelatoPrice(totals.shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-bold text-stone-900">
                <span>Total</span>
                <span className="text-rose-600">{formatGelatoPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onWhatsApp(mode)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 py-4 text-sm font-bold uppercase text-white hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido por WhatsApp
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
