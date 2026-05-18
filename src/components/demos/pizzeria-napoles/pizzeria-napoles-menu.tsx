"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatNapolesPrice,
  NAPOLES_CATEGORIES,
  NAPOLES_PRODUCTS,
  PIZZERIA_NAPOLES_CONFIG,
  type HalfFlavor,
  type NapolesCategoryId,
  type NapolesProduct,
} from "@/lib/pizzeria-napoles";
import { PizzeriaNapolesHalfBuilder } from "./pizzeria-napoles-half-builder";

type Props = {
  empanadaTotalInCart: number;
  onAddProduct: (p: NapolesProduct) => void;
  onAddHalf: (halfA: HalfFlavor, halfB: HalfFlavor, unitPrice: number) => void;
  onAddEmpanadas: (p: NapolesProduct, qty: number) => void;
};

export function PizzeriaNapolesMenu({
  empanadaTotalInCart,
  onAddProduct,
  onAddHalf,
  onAddEmpanadas,
}: Props) {
  const [category, setCategory] = useState<NapolesCategoryId>("pizzas");
  const [empQty, setEmpQty] = useState<Record<number, number>>({});
  const cfg = PIZZERIA_NAPOLES_CONFIG;

  const filtered = useMemo(
    () => NAPOLES_PRODUCTS.filter((p) => p.category === category),
    [category],
  );

  const empanadas = useMemo(() => NAPOLES_PRODUCTS.filter((p) => p.category === "empanadas"), []);
  const localEmpCount = empanadas.reduce((s, p) => s + (empQty[p.id] ?? 0), 0);
  const displayEmpCount = empanadaTotalInCart + localEmpCount;
  const toDozen = Math.max(0, cfg.empanadaDozenMin - displayEmpCount);

  const setEmp = (id: number, delta: number) => {
    setEmpQty((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(99, (prev[id] ?? 0) + delta)),
    }));
  };

  const addAllEmpanadas = () => {
    empanadas.forEach((p) => {
      const q = empQty[p.id] ?? 0;
      if (q > 0) onAddEmpanadas(p, q);
    });
    setEmpQty({});
  };

  return (
    <section id="menu" className="scroll-mt-14 border-t border-zinc-800 bg-zinc-900 py-8">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <h2 className="font-serif text-2xl text-stone-100">Menú</h2>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {NAPOLES_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold uppercase transition ${
                category === c.id
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-stone-500 hover:text-stone-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {category === "mitades" ? (
          <div className="mt-6">
            <PizzeriaNapolesHalfBuilder onAdd={onAddHalf} />
          </div>
        ) : null}

        {category === "empanadas" ? (
          <div className="mt-6 space-y-4">
            {displayEmpCount > 0 ? (
              <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
                ¡Llevás {displayEmpCount} empanada{displayEmpCount !== 1 ? "s" : ""}!
                {toDozen > 0 ? (
                  <span className="block font-bold text-orange-400">
                    Sumá {toDozen} más para docena con {cfg.empanadaDozenDiscountPct}% off
                  </span>
                ) : (
                  <span className="block font-bold text-green-400">
                    ¡Docena completa! Descuento al checkout
                  </span>
                )}
              </div>
            ) : null}
            {empanadas.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-800/40 p-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-700">
                  <Image src={p.image} alt="" fill className="object-cover" sizes="64px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-stone-100">{p.name}</p>
                  <p className="text-xs text-stone-500">{formatNapolesPrice(p.price)} c/u</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEmp(p.id, -1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-700 text-white"
                    aria-label="Menos"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-stone-100">{empQty[p.id] ?? 0}</span>
                  <button
                    type="button"
                    onClick={() => setEmp(p.id, 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-700 text-white"
                    aria-label="Más"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAllEmpanadas}
              disabled={localEmpCount === 0}
              className="w-full rounded-xl bg-red-600 py-3 text-sm font-bold uppercase text-white disabled:opacity-40"
            >
              Agregar empanadas al carrito
            </button>
          </div>
        ) : category !== "mitades" ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-800/30"
              >
                <div className="relative aspect-[16/10] bg-zinc-800">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
                  {product.badge ? (
                    <span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                      {product.badge}
                    </span>
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-stone-100">{product.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{product.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-red-400">{formatNapolesPrice(product.price)}</span>
                    <button
                      type="button"
                      onClick={() => onAddProduct(product)}
                      className="rounded-lg bg-zinc-700 px-4 py-2 text-[10px] font-bold uppercase text-red-400 hover:bg-zinc-600"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
