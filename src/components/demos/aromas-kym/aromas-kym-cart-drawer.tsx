"use client";

import Image from "next/image";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { formatAKPrice, AROMAS_KYM_CONFIG, type AKCartItem } from "@/lib/aromas-kym";

type Props = {
  open: boolean;
  onClose: () => void;
  items: AKCartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
};

export function AromasKymCartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}: Props) {
  const cfg = AROMAS_KYM_CONFIG;

  const { subtotal, shipping, total, count } = useMemo(() => {
    const s = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const sh = items.length > 0 ? cfg.shippingFee : 0;
    return {
      subtotal: s,
      shipping: sh,
      total: s + sh,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
    };
  }, [items, cfg.shippingFee]);

  // body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1c1814]/35 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <aside
          className="ak-slide-in flex h-full w-screen max-w-md flex-col border-l border-[#e8e1d4] bg-[#fbf8f1] shadow-2xl"
          aria-label="Carrito"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e8e1d4] px-7 py-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8d8074]">
                Tu selección
              </p>
              <h3
                className="mt-1 text-2xl text-[#1c1814]"
                style={{
                  fontFamily: "var(--ak-serif)",
                  fontStyle: "italic",
                  lineHeight: 1,
                }}
              >
                {count} {count === 1 ? "pieza" : "piezas"}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e1d4] text-[#5a4e44] transition hover:border-[#b85a3c]/60 hover:text-[#1c1814]"
              aria-label="Cerrar carrito"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e8e1d4] bg-[#f1ebdd] text-[#8d8074]">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.25} />
                </span>
                <p
                  className="mt-6 max-w-xs text-balance text-[#1c1814]"
                  style={{
                    fontFamily:
                      "var(--ak-serif)",
                    fontStyle: "italic",
                    fontSize: "1.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  Tu mesa todavía está vacía.
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#5a4e44]">
                  Sumá una vela, un sahumerio o una esencia y arrancamos el ritual.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-full bg-[#1c1814] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#fbf8f1] transition hover:bg-[#b85a3c]"
                >
                  Explorar colección
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-5 border-b border-[#e8e1d4]/70 pb-6 last:border-b-0"
                  >
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#f1ebdd]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#8d8074]">
                        {item.notesShort}
                      </p>
                      <h4
                        className="mt-1 line-clamp-2 text-[#1c1814]"
                        style={{
                          fontFamily:
                            "var(--ak-serif)",
                          fontStyle: "italic",
                          fontSize: "1.05rem",
                          lineHeight: 1.25,
                        }}
                      >
                        {item.name}
                      </h4>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-[#e8e1d4]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="flex h-8 w-8 items-center justify-center text-[#5a4e44] transition hover:text-[#1c1814]"
                            aria-label="Restar"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.2rem] text-center font-mono text-xs">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center text-[#5a4e44] transition hover:text-[#1c1814]"
                            aria-label="Sumar"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-[#1c1814]">
                          {formatAKPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[#8d8074] hover:text-[#b85a3c]"
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer summary */}
          {items.length > 0 ? (
            <div className="border-t border-[#e8e1d4] bg-[#f1ebdd]/50 px-7 py-7">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5a4e44]">
                  <dt>Subtotal</dt>
                  <dd className="font-mono">{formatAKPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-[#5a4e44]">
                  <dt>Envío</dt>
                  <dd className="font-mono">{formatAKPrice(shipping)}</dd>
                </div>
                <div className="flex items-end justify-between border-t border-[#e8e1d4] pt-3 text-[#1c1814]">
                  <dt
                    className="text-lg"
                    style={{
                      fontFamily:
                        "var(--ak-serif)",
                      fontStyle: "italic",
                    }}
                  >
                    Total
                  </dt>
                  <dd className="font-mono text-base">{formatAKPrice(total)}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={onCheckout}
                className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#1c1814] py-4 font-mono text-[11px] uppercase tracking-[0.32em] text-[#fbf8f1] transition hover:bg-[#b85a3c]"
              >
                Ir a checkout
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-[#8d8074]">
                Pago seguro · MercadoPago + transferencia
              </p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
