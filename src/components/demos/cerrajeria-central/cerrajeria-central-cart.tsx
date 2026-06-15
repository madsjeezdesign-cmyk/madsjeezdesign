"use client";

import { MessageCircle, Minus, Plus, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcCentralTotals,
  formatCentralPrice,
  type CentralCartLine,
  type CentralDeliveryMode,
} from "@/lib/cerrajeria-central";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: CentralCartLine[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onConfirm: (mode: CentralDeliveryMode) => void;
};

const MODES: { id: CentralDeliveryMode; label: string; sub: string }[] = [
  { id: "shipping", label: "Envío de productos", sub: "Correo / mensajería" },
  { id: "install", label: "Instalación a domicilio", sub: "Técnico certificado" },
  { id: "pickup", label: "Retiro en taller", sub: "Spegazzini · sin cargo" },
];

export function CerrajeriaCentralCart({
  open,
  onClose,
  lines,
  onUpdateQty,
  onRemove,
  onConfirm,
}: Props) {
  const [mode, setMode] = useState<CentralDeliveryMode>("install");
  const totals = useMemo(() => calcCentralTotals(lines, mode), [lines, mode]);
  const count = lines.length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden />
      <aside className="cc-slide-cart absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-4">
          <div>
            <h3 className="text-lg font-black uppercase text-white">Pedido técnico</h3>
            <p className="text-xs text-[color:var(--muted-body)]">{count} ítems</p>
          </div>
          <button type="button" onClick={onClose} className="text-[color:var(--muted-body)]" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-[color:var(--muted-body)]">Carrito vacío</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-white line-clamp-2 text-sm">
                        {line.kind === "service" ? line.serviceLabel : line.name}
                      </p>
                      {line.kind === "service" ? (
                        <p className="mt-1 text-[10px] text-[color:var(--muted-body)]">
                          {line.keyTypeLabel} · {line.copies} copias
                        </p>
                      ) : (
                        <p className="mt-1 text-[10px] text-[color:var(--muted-body)] line-clamp-2">{line.specs}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(line.key)}
                      className="shrink-0 text-[color:var(--muted-body)] hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {line.kind === "product" ? (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.key, -1)}
                          className="flex h-9 w-9 items-center justify-center rounded bg-zinc-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-white">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.key, 1)}
                          className="flex h-9 w-9 items-center justify-center rounded bg-zinc-800"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-bold text-amber-400">
                        {formatCentralPrice(line.unitPrice * line.quantity)}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-2 text-right font-bold text-amber-400">
                      {formatCentralPrice(line.unitPrice)}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 ? (
          <div className="space-y-4 border-t border-zinc-800 p-4">
            <p className="text-[10px] font-black uppercase text-[color:var(--muted-body)]">Entrega / instalación</p>
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`mb-2 w-full rounded-lg border px-3 py-3 text-left text-xs ${
                  mode === m.id
                    ? "border-amber-500 bg-amber-500/10 text-white"
                    : "border-zinc-700 text-zinc-400"
                }`}
              >
                {m.label}
                <span className="mt-0.5 block text-[color:var(--muted-body)]">{m.sub}</span>
              </button>
            ))}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{formatCentralPrice(totals.subtotal)}</span>
              </div>
              {totals.shipping > 0 ? (
                <div className="flex justify-between text-zinc-400">
                  <span>Adicional</span>
                  <span>{formatCentralPrice(totals.shipping)}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-t border-zinc-800 pt-2 font-black text-white">
                <span>Total</span>
                <span className="text-amber-400">{formatCentralPrice(totals.total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onConfirm(mode)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-4 text-xs font-black uppercase text-white hover:bg-green-500"
            >
              <MessageCircle className="h-5 w-5" />
              Confirmar / solicitar instalador
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
