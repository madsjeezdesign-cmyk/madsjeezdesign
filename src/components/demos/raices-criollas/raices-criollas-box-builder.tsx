"use client";

import { Gift, Package } from "lucide-react";
import { useMemo, useState } from "react";
import {
  calcBoxSlotsUsed,
  calcBoxTotal,
  formatRaicesPrice,
  getRaicesBoxSize,
  RAICES_BOX_PICKS,
  RAICES_BOX_SIZES,
  type RaicesBoxPick,
  type RaicesBoxSizeId,
} from "@/lib/raices-criollas";

export type BuiltBox = {
  sizeId: RaicesBoxSizeId;
  label: string;
  items: RaicesBoxPick[];
  totalPrice: number;
};

type Props = {
  onAddBox: (box: BuiltBox) => void;
};

export function RaicesCriollasBoxBuilder({ onAddBox }: Props) {
  const [sizeId, setSizeId] = useState<RaicesBoxSizeId>("mediana");
  const [picks, setPicks] = useState<RaicesBoxPick[]>([]);
  const [mode, setMode] = useState<"regalo" | "picada">("regalo");

  const size = getRaicesBoxSize(sizeId);
  const slotsUsed = calcBoxSlotsUsed(picks);
  const atLimit = slotsUsed >= size.maxSlots;
  const total = calcBoxTotal(sizeId, picks);
  const remaining = size.maxSlots - slotsUsed;

  const label = useMemo(() => {
    const kind = mode === "regalo" ? "Caja de Regalo Regional" : "Tabla de Picada";
    return `${kind} — ${size.label}`;
  }, [mode, size.label]);

  const togglePick = (pick: RaicesBoxPick) => {
    setPicks((prev) => {
      const exists = prev.some((p) => p.id === pick.id);
      if (exists) return prev.filter((p) => p.id !== pick.id);
      if (calcBoxSlotsUsed(prev) + pick.slots > size.maxSlots) return prev;
      return [...prev, pick];
    });
  };

  const isSelected = (id: string) => picks.some((p) => p.id === id);

  return (
    <section id="caja-regalo" className="scroll-mt-20 border-t border-stone-200 bg-stone-100 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex items-start gap-3">
          <Gift className="mt-1 h-6 w-6 text-amber-800" strokeWidth={1.25} />
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-800">Experiencia premium</p>
            <h2 className="mt-2 font-serif text-2xl text-stone-900 sm:text-3xl">Armá tu caja regalo / tabla</h2>
            <p className="mt-2 max-w-xl text-sm text-stone-600">
              Elegí el tamaño, sumá productos regionales y agregá todo al carrito en un solo paso.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("regalo");
              setPicks([]);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
              mode === "regalo" ? "bg-amber-800 text-amber-50" : "border border-stone-300 text-stone-600"
            }`}
          >
            Caja regalo
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("picada");
              setPicks([]);
            }}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
              mode === "picada" ? "bg-amber-800 text-amber-50" : "border border-stone-300 text-stone-600"
            }`}
          >
            Tabla de picada
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {RAICES_BOX_SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSizeId(s.id);
                    setPicks((prev) => {
                      let next = [...prev];
                      while (calcBoxSlotsUsed(next) > s.maxSlots) {
                        next = next.slice(0, -1);
                      }
                      return next;
                    });
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    sizeId === s.id
                      ? "border-amber-700 bg-white shadow-md ring-2 ring-amber-200"
                      : "border-stone-200 bg-white hover:border-amber-300"
                  }`}
                >
                  <p className="font-serif text-lg text-stone-900">{s.label}</p>
                  <p className="text-xs text-stone-500">{s.subtitle}</p>
                  <p className="mt-2 text-sm font-semibold text-orange-900">
                    Base {formatRaicesPrice(s.basePrice)}
                  </p>
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Productos regionales</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {RAICES_BOX_PICKS.map((pick) => {
                  const sel = isSelected(pick.id);
                  const disabled = !sel && atLimit && pick.slots > remaining;
                  return (
                    <button
                      key={pick.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(pick)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition ${
                        sel
                          ? "border-amber-600 bg-amber-50 text-stone-900"
                          : disabled
                            ? "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-300"
                            : "border-stone-200 text-stone-700 hover:border-amber-400"
                      }`}
                    >
                      <span>
                        {pick.name}
                        {pick.slots > 1 ? (
                          <span className="ml-1 text-[10px] text-stone-400">({pick.slots} espacios)</span>
                        ) : null}
                      </span>
                      <span className="shrink-0 font-semibold text-orange-900">
                        {formatRaicesPrice(pick.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="sticky top-28 h-fit rounded-2xl border border-amber-200/60 bg-white p-5 shadow-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <Package className="h-5 w-5" />
              <p className="font-serif text-lg text-stone-900">Tu {mode === "regalo" ? "caja" : "tabla"}</p>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Espacio usado</span>
                <span className="font-semibold text-stone-900">
                  {slotsUsed} / {size.maxSlots}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: size.maxSlots }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${i < slotsUsed ? "bg-amber-700" : "bg-stone-200"}`}
                  />
                ))}
              </div>
            </div>

            {picks.length > 0 ? (
              <ul className="mt-4 space-y-1 border-t border-stone-100 pt-4 text-xs text-stone-600">
                {picks.map((p) => (
                  <li key={p.id}>· {p.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-xs text-stone-400">Elegí productos para armar tu selección</p>
            )}

            <p className="mt-6 text-2xl font-semibold text-orange-900">{formatRaicesPrice(total)}</p>
            <p className="text-[11px] text-stone-500">Incluye base de {size.label.toLowerCase()}</p>

            <button
              type="button"
              disabled={picks.length === 0}
              onClick={() => {
                onAddBox({ sizeId, label, items: picks, totalPrice: total });
                setPicks([]);
              }}
              className="mt-4 w-full rounded-full bg-amber-800 py-3.5 text-xs font-semibold uppercase tracking-wider text-amber-50 disabled:opacity-40 hover:bg-orange-900"
            >
              Agregar caja al carrito
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
