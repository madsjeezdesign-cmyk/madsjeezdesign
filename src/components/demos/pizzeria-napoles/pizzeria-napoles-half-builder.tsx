"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcHalfPizzaPrice,
  formatNapolesPrice,
  getHalfFlavor,
  HALF_FLAVORS,
  type HalfFlavor,
} from "@/lib/pizzeria-napoles";

type Props = {
  onAdd: (halfA: HalfFlavor, halfB: HalfFlavor, unitPrice: number) => void;
};

export function PizzeriaNapolesHalfBuilder({ onAdd }: Props) {
  const [halfAId, setHalfAId] = useState(HALF_FLAVORS[0].id);
  const [halfBId, setHalfBId] = useState(HALF_FLAVORS[2].id);

  const halfA = getHalfFlavor(halfAId) ?? HALF_FLAVORS[0];
  const halfB = getHalfFlavor(halfBId) ?? HALF_FLAVORS[1];

  const unitPrice = useMemo(() => calcHalfPizzaPrice(halfA, halfB), [halfA, halfB]);

  return (
    <div className="rounded-2xl border border-red-500/30 bg-zinc-800/50 p-5">
      <h3 className="font-serif text-xl text-stone-100">Armá tu pizza mitad / mitad</h3>
      <p className="mt-1 text-xs text-stone-500">Precio según la mitad más cara</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-red-400">Mitad A</label>
          <select
            value={halfAId}
            onChange={(e) => setHalfAId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-stone-100 focus:border-red-500 focus:outline-none"
          >
            {HALF_FLAVORS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} — {formatNapolesPrice(f.price)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-stone-500">{halfA.description}</p>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Mitad B</label>
          <select
            value={halfBId}
            onChange={(e) => setHalfBId(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm text-stone-100 focus:border-red-500 focus:outline-none"
          >
            {HALF_FLAVORS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} — {formatNapolesPrice(f.price)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-stone-500">{halfB.description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-zinc-900 p-4">
        <div>
          <p className="text-xs text-stone-500">Tu combinación</p>
          <p className="font-medium text-stone-100">
            {halfA.name} / {halfB.name}
          </p>
        </div>
        <p className="text-2xl font-bold text-red-400">{formatNapolesPrice(unitPrice)}</p>
      </div>

      <button
        type="button"
        onClick={() => onAdd(halfA, halfB, unitPrice)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold uppercase text-white hover:bg-red-500"
      >
        <Plus className="h-5 w-5" />
        Agregar al carrito
      </button>
    </div>
  );
}
