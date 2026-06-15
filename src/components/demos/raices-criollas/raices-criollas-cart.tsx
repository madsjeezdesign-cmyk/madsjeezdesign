"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcRaicesTotals,
  formatRaicesPrice,
  type RaicesCartLine,
  type RaicesDeliveryMode,
} from "@/lib/raices-criollas";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: RaicesCartLine[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: (mode: RaicesDeliveryMode) => void;
};

const DELIVERY_OPTIONS: { id: RaicesDeliveryMode; label: string; sub: string }[] = [
  { id: "nacional", label: "Envío nacional por correo", sub: "Todo el país · embalaje premium" },
  { id: "express", label: "Envío express flete/moto", sub: "GBA · 24–48 hs" },
  { id: "pickup", label: "Retiro gratuito por el local", sub: "Showroom Spegazzini" },
];

export function RaicesCriollasCart({
  open,
  onClose,
  lines,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const [mode, setMode] = useState<RaicesDeliveryMode>("nacional");
  const totals = useMemo(() => calcRaicesTotals(lines, mode), [lines, mode]);
  const count = lines.reduce((s, l) => s + l.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="rc-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-stone-200 bg-stone-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-4 py-4">
          <div>
            <h3 className="font-serif text-lg text-stone-900">Tu pedido</h3>
            <p className="text-xs text-stone-500">{count} artículos</p>
          </div>
          <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-stone-400">Carrito vacío</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="rounded-xl border border-stone-200 bg-white p-3">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-stone-900 line-clamp-2 text-sm">
                        {line.kind === "product" ? line.name : line.boxLabel}
                      </p>
                      {line.kind === "product" ? (
                        <p className="text-[10px] text-amber-800">{line.origin}</p>
                      ) : (
                        <p className="mt-1 text-[10px] leading-relaxed text-stone-500">
                          {line.items.map((i) => i.name).join(" · ")}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="shrink-0 text-stone-300 hover:text-red-600"
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
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(line.key, 1)}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold text-orange-900">
                      {formatRaicesPrice(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-4 border-t border-stone-200 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-amber-800">Entrega</p>
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-xs ${
                    mode === opt.id
                      ? "border-amber-700 bg-amber-50 text-stone-900"
                      : "border-stone-200 text-stone-600"
                  }`}
                >
                  {opt.label}
                  <span className="mt-0.5 block font-normal text-stone-500">{opt.sub}</span>
                </button>
              ))}
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatRaicesPrice(totals.subtotal)}</span>
              </div>
              {totals.shipping > 0 ? (
                <div className="flex justify-between text-stone-600">
                  <span>Envío</span>
                  <span>{formatRaicesPrice(totals.shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-stone-100 pt-2 text-base font-semibold text-stone-900">
                <span>Total</span>
                <span className="text-orange-900">{formatRaicesPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckout(mode)}
              className="w-full rounded-full bg-amber-800 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-amber-50 hover:bg-orange-900"
            >
              Finalizar pedido
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
