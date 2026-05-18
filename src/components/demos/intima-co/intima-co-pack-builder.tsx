"use client";

import { useMemo, useState } from "react";
import {
  formatIntimaPrice,
  getIntimaColor,
  INTIMA_CO_CONFIG,
  INTIMA_PACK_ITEMS,
  type IntimaColorVariant,
} from "@/lib/intima-co";

export type PackSelection = {
  itemId: string;
  itemName: string;
  color: IntimaColorVariant;
  price: number;
};

type Props = {
  onAddPack: (selections: PackSelection[], discountAmount: number) => void;
};

export function IntimaCoPackBuilder({ onAddPack }: Props) {
  const cfg = INTIMA_CO_CONFIG;
  const [selections, setSelections] = useState<PackSelection[]>([]);
  const [activeItem, setActiveItem] = useState(INTIMA_PACK_ITEMS[0].id);
  const [colorId, setColorId] = useState(INTIMA_PACK_ITEMS[0].defaultColorId);

  const item = INTIMA_PACK_ITEMS.find((i) => i.id === activeItem)!;
  const color = getIntimaColor(item, colorId);
  const atMax = selections.length >= cfg.packRequired;
  const progress = selections.length / cfg.packRequired;

  const subtotal = useMemo(() => selections.reduce((s, x) => s + x.price, 0), [selections]);
  const discountAmount = atMax ? Math.round(subtotal * (cfg.packDiscountPct / 100)) : 0;

  const addToPack = () => {
    if (atMax) return;
    setSelections((prev) => [
      ...prev,
      { itemId: item.id, itemName: item.name, color, price: item.price },
    ]);
  };

  const removeAt = (index: number) => {
    setSelections((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="packs" className="scroll-mt-24 border-t border-stone-200/60 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <p className="text-[10px] font-light uppercase tracking-[0.35em] text-rose-400/90">Multi-buy</p>
        <h2 className="mt-2 font-serif text-2xl text-stone-900 sm:text-3xl">
          Armá tu pack con {cfg.packDiscountPct}% off
        </h2>
        <p className="mt-2 max-w-lg text-sm font-light text-stone-500">
          Elegí {cfg.packRequired} piezas esenciales — bombachas o bóxers — y el descuento se aplica al agregar al carrito.
        </p>

        <div className="mt-4 rounded-full bg-stone-100 p-1">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-rose-200 to-stone-800 transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-light text-stone-500">
          {selections.length} de {cfg.packRequired} piezas
          {atMax ? (
            <span className="ml-2 text-rose-500/90">
              · Descuento {formatIntimaPrice(discountAmount)} listo
            </span>
          ) : null}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200/80 bg-stone-50/50 p-5">
            <p className="text-xs font-light uppercase tracking-wider text-stone-400">Modelo</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTIMA_PACK_ITEMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveItem(p.id);
                    setColorId(p.defaultColorId);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    activeItem === p.id
                      ? "bg-stone-900 text-stone-50"
                      : "border border-stone-200 text-stone-600"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <p className="mt-6 text-xs font-light uppercase tracking-wider text-stone-400">Color</p>
            <div className="mt-2 flex gap-2">
              {item.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    colorId === c.id ? "border-stone-900" : "border-stone-200"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            <p className="mt-4 text-sm text-stone-600">
              {item.name} · {color.name} — {formatIntimaPrice(item.price)}
            </p>

            <button
              type="button"
              disabled={atMax}
              onClick={addToPack}
              className="mt-4 rounded-full border border-stone-900 px-6 py-2.5 text-xs font-light uppercase tracking-wider text-stone-900 transition hover:bg-stone-900 hover:text-stone-50 disabled:opacity-40"
            >
              Sumar al pack
            </button>
          </div>

          <div className="rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <p className="font-serif text-lg text-stone-900">Tu pack</p>
            {selections.length === 0 ? (
              <p className="mt-8 text-sm font-light text-stone-400">Aún no agregaste piezas</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {selections.map((s, i) => (
                  <li
                    key={`${s.itemId}-${i}`}
                    className="flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/50 px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-sm text-stone-700">
                      <span
                        className="h-4 w-4 rounded-full border border-stone-200"
                        style={{ backgroundColor: s.color.hex }}
                      />
                      {s.itemName} · {s.color.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAt(i)}
                      className="text-[10px] uppercase tracking-wider text-stone-400 hover:text-rose-500"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {selections.length > 0 ? (
              <>
                <div className="mt-6 space-y-1 border-t border-stone-100 pt-4 text-sm">
                  <div className="flex justify-between font-light text-stone-600">
                    <span>Subtotal pack</span>
                    <span>{formatIntimaPrice(subtotal)}</span>
                  </div>
                  {atMax ? (
                    <div className="flex justify-between text-rose-500/90">
                      <span>Descuento {cfg.packDiscountPct}%</span>
                      <span>-{formatIntimaPrice(discountAmount)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between font-medium text-stone-900">
                    <span>Total pack</span>
                    <span>{formatIntimaPrice(subtotal - discountAmount)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!atMax}
                  onClick={() => {
                    onAddPack(selections, discountAmount);
                    setSelections([]);
                  }}
                  className="mt-4 w-full rounded-full bg-stone-900 py-3.5 text-xs font-light uppercase tracking-[0.2em] text-stone-50 disabled:opacity-40 hover:bg-stone-800"
                >
                  Agregar pack al carrito
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
