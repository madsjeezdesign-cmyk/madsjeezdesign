"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcDecoTotals,
  DECO_BAZAR_CO_CONFIG,
  DECO_REGIONS,
  formatDecoPrice,
  type DecoCartItem,
  type DecoDeliveryMode,
  type DecoRegionId,
} from "@/lib/deco-bazar-co";

type Props = {
  open: boolean;
  onClose: () => void;
  items: DecoCartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onCheckout: (mode: DecoDeliveryMode, region: DecoRegionId) => void;
};

export function DecoBazarCoCart({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const cfg = DECO_BAZAR_CO_CONFIG;
  const [mode, setMode] = useState<DecoDeliveryMode>("shipping");
  const [region, setRegion] = useState<DecoRegionId>("gba-sur");

  const totals = useMemo(() => calcDecoTotals(items, mode, region), [items, mode, region]);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const regionInfo = DECO_REGIONS.find((r) => r.id === region)!;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-zinc-900/15 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <aside className="dbz-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-4">
          <div>
            <h3 className="text-lg font-light text-zinc-900">Tu carrito</h3>
            <p className="text-xs text-[color:var(--muted-body)]">{count} artículos</p>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-700" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm font-light text-zinc-400">El carrito está vacío</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.key} className="rounded-xl border border-zinc-100 p-3">
                  <div className="flex justify-between gap-2">
                    <p className="font-medium text-zinc-900 line-clamp-2 text-sm">{item.name}</p>
                    <button
                      type="button"
                      onClick={() => onRemove(item.key)}
                      className="shrink-0 text-zinc-300 hover:text-red-500"
                      aria-label="Quitar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-zinc-200">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, -1)}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.key, 1)}
                        className="flex h-9 w-9 items-center justify-center"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-medium text-zinc-800">
                      {formatDecoPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="space-y-4 border-t border-zinc-100 p-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-400">Entrega</p>
              <div className="mt-2 grid gap-2">
                <button
                  type="button"
                  onClick={() => setMode("shipping")}
                  className={`rounded-xl border px-3 py-3 text-left text-xs ${
                    mode === "shipping"
                      ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                      : "border-zinc-200 text-[color:var(--muted-body)]"
                  }`}
                >
                  Envío a domicilio
                  <span className="mt-0.5 block font-light text-[color:var(--muted-body)]">Correo / flete</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("pickup")}
                  className={`rounded-xl border px-3 py-3 text-left text-xs ${
                    mode === "pickup"
                      ? "border-[#5c6b4a] bg-[#5c6b4a]/5 text-[#4d5a3e]"
                      : "border-zinc-200 text-[color:var(--muted-body)]"
                  }`}
                >
                  Retiro gratuito por el local
                  <span className="mt-0.5 block font-light text-[color:var(--muted-body)]">Showroom Spegazzini</span>
                </button>
              </div>
            </div>

            {mode === "shipping" ? (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-zinc-400">Región</p>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as DecoRegionId)}
                  className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-800"
                >
                  {DECO_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label} — {formatDecoPrice(r.shipping)}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-zinc-400">{regionInfo.days}</p>
              </div>
            ) : null}

            <div className="space-y-1 text-sm">
              <div className="flex justify-between font-light text-[color:var(--muted-body)]">
                <span>Subtotal</span>
                <span>{formatDecoPrice(totals.subtotal)}</span>
              </div>
              {mode === "shipping" ? (
                <div className="flex justify-between font-light text-[color:var(--muted-body)]">
                  <span>Envío</span>
                  <span>{formatDecoPrice(totals.shipping)}</span>
                </div>
              ) : null}
              {totals.installmentAmount ? (
                <p className="rounded-lg bg-zinc-50 px-3 py-2 text-xs text-[color:var(--muted-body)]">
                  {cfg.installmentCount} cuotas sin interés de{" "}
                  <strong className="text-zinc-800">{formatDecoPrice(totals.installmentAmount)}</strong>
                </p>
              ) : null}
              <div className="flex justify-between border-t border-zinc-100 pt-2 text-base font-medium text-zinc-900">
                <span>Total</span>
                <span>{formatDecoPrice(totals.total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckout(mode, region)}
              className="w-full rounded-full bg-zinc-800 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white hover:bg-zinc-700"
            >
              Finalizar compra
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
