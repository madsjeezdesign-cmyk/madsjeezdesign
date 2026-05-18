"use client";

import { MessageCircle, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BURGER_LAB_CONFIG,
  formatBurgerPrice,
  type BurgerCartLine,
  type DeliveryMode,
} from "@/lib/burger-lab";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: BurgerCartLine[];
  onRemove: (key: string) => void;
  onWhatsApp: (mode: DeliveryMode) => void;
};

export function BurgerLabCart({ open, onClose, lines, onRemove, onWhatsApp }: Props) {
  const [mode, setMode] = useState<DeliveryMode>("delivery");
  const cfg = BURGER_LAB_CONFIG;

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    const shipping = lines.length > 0 && mode === "delivery" ? cfg.deliveryFee : 0;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [lines, mode, cfg.deliveryFee]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} aria-hidden />
      <aside className="bl-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
          <h3 className="text-lg font-black uppercase text-white">Tu pedido</h3>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-zinc-500">Carrito vacío 🍔</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                  <div className="flex justify-between gap-2">
                    <p className="font-bold text-white">
                      {line.quantity}x {line.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="text-[10px] font-bold uppercase text-red-400"
                    >
                      Quitar
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500">{line.comboLabel}</p>
                  {line.extras.length > 0 ? (
                    <p className="text-[11px] text-amber-500/80">
                      + {line.extras.map((e) => e.label).join(", ")}
                    </p>
                  ) : null}
                  <p className="mt-2 font-black text-amber-400">
                    {formatBurgerPrice(line.unitPrice * line.quantity)}
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
                className={`rounded-xl border py-2.5 text-[10px] font-black uppercase ${
                  mode === "delivery"
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-zinc-800 text-zinc-500"
                }`}
              >
                Delivery
              </button>
              <button
                type="button"
                onClick={() => setMode("takeaway")}
                className={`rounded-xl border py-2.5 text-[10px] font-black uppercase ${
                  mode === "takeaway"
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-zinc-800 text-zinc-500"
                }`}
              >
                Take away
              </button>
            </div>

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatBurgerPrice(subtotal)}</span>
              </div>
              {mode === "delivery" ? (
                <div className="flex justify-between text-zinc-400">
                  <span>Envío</span>
                  <span>{formatBurgerPrice(shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-zinc-800 pt-2 text-lg font-black text-white">
                <span>Total</span>
                <span className="text-amber-400">{formatBurgerPrice(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onWhatsApp(mode)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-4 text-sm font-black uppercase text-white hover:bg-green-500"
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
