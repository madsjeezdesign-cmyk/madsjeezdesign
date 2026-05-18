"use client";

import { MessageCircle, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcCartTotals,
  formatNapolesPrice,
  type DeliveryMode,
  type NapolesCartLine,
} from "@/lib/pizzeria-napoles";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: NapolesCartLine[];
  onRemove: (key: string) => void;
  onWhatsApp: (mode: DeliveryMode) => void;
};

function lineLabel(line: NapolesCartLine): string {
  if (line.kind === "half") {
    return `${line.quantity}x Mitad ${line.halfA.name} / ${line.halfB.name}`;
  }
  return `${line.quantity}x ${line.name}`;
}

export function PizzeriaNapolesCart({ open, onClose, lines, onRemove, onWhatsApp }: Props) {
  const [mode, setMode] = useState<DeliveryMode>("delivery");
  const totals = useMemo(() => calcCartTotals(lines, mode), [lines, mode]);
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden />
      <aside className="pn-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
          <h3 className="font-serif text-lg text-stone-100">Tu pedido</h3>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            <X className="h-5 w-5 text-stone-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-stone-500">Carrito vacío 🍕</p>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-3">
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium text-stone-200">{lineLabel(line)}</p>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="text-[10px] font-bold uppercase text-red-400"
                    >
                      Quitar
                    </button>
                  </div>
                  <p className="mt-1 font-bold text-red-400">
                    {formatNapolesPrice(line.unitPrice * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-4 border-t border-zinc-800 p-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("delivery")}
                className={`rounded-xl border py-2 text-[10px] font-bold uppercase ${
                  mode === "delivery"
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : "border-zinc-700 text-stone-500"
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setMode("takeaway")}
                className={`rounded-xl border py-2 text-[10px] font-bold uppercase ${
                  mode === "takeaway"
                    ? "border-red-500 bg-red-500/10 text-red-400"
                    : "border-zinc-700 text-stone-500"
                }`}
              >
                Retiro local
              </button>
            </div>

            <div className="space-y-1 text-sm text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatNapolesPrice(totals.subtotal)}</span>
              </div>
              {totals.empanadaDiscount > 0 ? (
                <div className="flex justify-between text-green-400">
                  <span>Desc. docena empanadas</span>
                  <span>-{formatNapolesPrice(totals.empanadaDiscount)}</span>
                </div>
              ) : null}
              {mode === "delivery" ? (
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{formatNapolesPrice(totals.shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-zinc-800 pt-2 text-lg font-bold text-stone-100">
                <span>Total ({count} ítems)</span>
                <span className="text-red-400">{formatNapolesPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onWhatsApp(mode)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-sm font-bold uppercase text-white hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido a WhatsApp
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
