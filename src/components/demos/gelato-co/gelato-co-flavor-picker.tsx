"use client";

import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  FLAVOR_CATEGORIES,
  formatGelatoPrice,
  GELATO_FLAVORS,
  type GelatoFlavor,
  type GelatoSize,
} from "@/lib/gelato-co";

type Props = {
  size: GelatoSize | null;
  onClose: () => void;
  onAdd: (flavors: GelatoFlavor[]) => void;
};

export function GelatoCoFlavorPicker({ size, onClose, onAdd }: Props) {
  const [selected, setSelected] = useState<GelatoFlavor[]>([]);

  const max = size?.maxFlavors ?? 0;
  const atLimit = selected.length >= max;
  const canAdd = size !== null && selected.length > 0 && selected.length <= max;

  const byCategory = useMemo(() => {
    return FLAVOR_CATEGORIES.map((cat) => ({
      ...cat,
      flavors: GELATO_FLAVORS.filter((f) => f.category === cat.id),
    }));
  }, []);

  if (!size) return null;

  const toggle = (flavor: GelatoFlavor) => {
    setSelected((prev) => {
      const exists = prev.some((f) => f.id === flavor.id);
      if (exists) return prev.filter((f) => f.id !== flavor.id);
      if (prev.length >= max) return prev;
      return [...prev, flavor];
    });
  };

  const isSelected = (id: string) => selected.some((f) => f.id === id);

  return (
    <div className="fixed inset-0 z-[85] flex flex-col justify-end bg-stone-900/30 sm:items-center sm:justify-center sm:p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative flex max-h-[92vh] w-full flex-col rounded-t-3xl border border-stone-200 bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Paso 2</p>
            <h3 className="font-serif text-xl text-stone-900">{size.label}</h3>
            <p className="text-xs text-stone-500">{size.subtitle}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-stone-400 hover:bg-stone-100" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="sticky top-0 z-10 border-b border-stone-100 bg-rose-50/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-stone-800">
              Gustos seleccionados:{" "}
              <span className={atLimit ? "text-rose-600" : "text-stone-900"}>
                {selected.length} de {max}
              </span>
            </p>
            {atLimit ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">
                Listo
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex gap-1">
            {Array.from({ length: max }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${i < selected.length ? "bg-rose-400" : "bg-stone-200"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {byCategory.map((cat) => (
            <div key={cat.id} className="mb-6">
              <p className={`mb-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${cat.accent}`}>
                {cat.label}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cat.flavors.map((flavor) => {
                  const sel = isSelected(flavor.id);
                  const disabled = !sel && atLimit;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggle(flavor)}
                      className={`flex min-h-[48px] items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left text-sm transition active:scale-[0.98] ${
                        sel
                          ? "border-rose-300 bg-rose-50 text-stone-900 ring-2 ring-rose-200"
                          : disabled
                            ? "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-300 opacity-60"
                            : "border-stone-200 bg-white text-stone-700 hover:border-rose-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border border-stone-200"
                          style={{ backgroundColor: flavor.accent }}
                        />
                        {flavor.name}
                      </span>
                      {sel ? <Check className="h-4 w-4 shrink-0 text-rose-500" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-100 bg-stone-50 p-4">
          <p className="mb-3 text-center text-lg font-bold text-stone-900">{formatGelatoPrice(size.price)}</p>
          <button
            type="button"
            disabled={!canAdd}
            onClick={() => {
              onAdd(selected);
              setSelected([]);
            }}
            className="w-full rounded-full bg-stone-900 py-4 text-sm font-bold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-stone-800"
          >
            Agregar al carrito
          </button>
          {!canAdd && selected.length === 0 ? (
            <p className="mt-2 text-center text-[11px] text-stone-500">Elegí al menos un gusto</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
