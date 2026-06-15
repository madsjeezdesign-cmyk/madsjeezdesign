"use client";

import { Calendar, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatCentralPrice,
  getKeyType,
  KEY_TYPES,
  quoteKeyCopies,
  type KeyTypeId,
} from "@/lib/cerrajeria-central";

type Props = {
  onAddService: (typeId: KeyTypeId, copies: number, total: number) => void;
  onReserve: (typeId: KeyTypeId, copies: number) => void;
};

export function CerrajeriaCentralKeyQuote({ onAddService, onReserve }: Props) {
  const [typeId, setTypeId] = useState<KeyTypeId>("yale");
  const [copies, setCopies] = useState(1);

  const keyType = getKeyType(typeId);
  const total = useMemo(() => quoteKeyCopies(typeId, copies), [typeId, copies]);

  return (
    <section id="cotizador" className="scroll-mt-20 border-y border-zinc-800 bg-zinc-900 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-3 sm:px-4">
        <p className="text-xs font-black uppercase tracking-[0.04em] text-amber-400">Cotizador en vivo</p>
        <h2 className="mt-2 text-2xl font-black uppercase text-white sm:text-3xl">Copias de llaves</h2>
        <p className="mt-2 text-sm text-zinc-400">Precio estimado en ARS · actualización instantánea</p>

        <div className="mt-8 space-y-3">
          {KEY_TYPES.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setTypeId(k.id)}
              className={`flex w-full flex-col rounded-xl border px-4 py-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
                typeId === k.id
                  ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50"
                  : "border-zinc-700 bg-zinc-950 hover:border-zinc-600"
              }`}
            >
              <div>
                <p className="font-bold text-white">{k.label}</p>
                <p className="mt-1 text-xs text-[color:var(--muted-body)]">{k.eta}</p>
              </div>
              <p className="mt-2 text-lg font-black text-amber-400 sm:mt-0">
                {formatCentralPrice(k.pricePerCopy)} <span className="text-xs text-[color:var(--muted-body)]">/ copia</span>
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <span className="text-sm font-bold uppercase text-zinc-400">Cantidad de copias</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCopies((c) => Math.max(1, c - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-white"
              aria-label="Menos"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-10 text-center text-2xl font-black text-white">{copies}</span>
            <button
              type="button"
              onClick={() => setCopies((c) => Math.min(20, c + 1))}
              className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 text-white"
              aria-label="Más"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-2 border-amber-500/50 bg-zinc-950 p-6 text-center">
          <p className="text-xs font-bold uppercase text-[color:var(--muted-body)]">Total estimado</p>
          <p className="mt-2 text-4xl font-black text-amber-400">{formatCentralPrice(total)}</p>
          <p className="mt-2 text-xs text-[color:var(--muted-body)]">
            {keyType.label} × {copies} — {keyType.eta}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onReserve(typeId, copies)}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 py-4 text-xs font-black uppercase text-white hover:border-amber-500"
          >
            <Calendar className="h-4 w-4" />
            Reservar turno
          </button>
          <button
            type="button"
            onClick={() => onAddService(typeId, copies, total)}
            className="rounded-lg bg-amber-500 py-4 text-xs font-black uppercase text-zinc-950 hover:bg-amber-400"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
