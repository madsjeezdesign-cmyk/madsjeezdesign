"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  formatLinajePrice,
  getLinajeUnitPrice,
  LINAJE_CATEGORIES,
  LINAJE_COLORS,
  LINAJE_PRODUCTS,
  LINAJE_SIZES,
  type LinajeCategoryId,
  type LinajeColor,
  type LinajeProduct,
  type LinajeSize,
} from "@/lib/nido-linaje";

type CardState = Record<number, { size: LinajeSize; color: LinajeColor; adding: boolean }>;

type Props = {
  onOpenDetail: (product: LinajeProduct) => void;
  onAdd: (
    product: LinajeProduct,
    size: LinajeSize,
    color: LinajeColor,
    onDone: () => void,
  ) => void;
};

export function NidoLinajeCatalog({ onOpenDetail, onAdd }: Props) {
  const [category, setCategory] = useState<LinajeCategoryId | "all">("all");
  const [cardState, setCardState] = useState<CardState>({});

  const filtered = useMemo(
    () => (category === "all" ? LINAJE_PRODUCTS : LINAJE_PRODUCTS.filter((p) => p.category === category)),
    [category],
  );

  const getState = (id: number) =>
    cardState[id] ?? {
      size: LINAJE_SIZES[1],
      color: LINAJE_COLORS[0],
      adding: false,
    };

  const setCard = (id: number, patch: Partial<CardState[number]>) => {
    setCardState((prev) => ({ ...prev, [id]: { ...getState(id), ...patch } }));
  };

  const handleAdd = (product: LinajeProduct) => {
    const st = getState(product.id);
    setCard(product.id, { adding: true });
    onAdd(product, st.size, st.color, () => setCard(product.id, { adding: false }));
  };

  return (
    <section id="colecciones" className="scroll-mt-28 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-14 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.04em] text-stone-400">Couture</p>
          <h2 className="mt-3 font-serif text-3xl font-light text-stone-900 sm:text-4xl">Colecciones</h2>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {LINAJE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-sm px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.04em] transition duration-300 ${
                category === c.id
                  ? "bg-stone-900 text-white"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const st = getState(product.id);
            const price = getLinajeUnitPrice(product.basePrice, st.size);
            return (
              <article key={product.id} className="group">
                <button
                  type="button"
                  onClick={() => onOpenDetail(product)}
                  className="relative block aspect-[3/4] w-full overflow-hidden bg-stone-100"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {product.badge ? (
                    <span className="absolute left-4 top-4 bg-white/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.04em] text-stone-600 backdrop-blur">
                      {product.badge}
                    </span>
                  ) : null}
                </button>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(product)}
                    className="text-left font-serif text-xl font-light text-stone-900 hover:text-stone-600"
                  >
                    {product.name}
                  </button>
                  <p className="mt-1 line-clamp-1 text-xs text-stone-500">{product.composition}</p>

                  <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.04em] text-stone-400">Tamaño</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {LINAJE_SIZES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setCard(product.id, { size: s })}
                        className={`rounded-sm border px-2.5 py-1 text-[10px] transition ${
                          st.size.id === s.id
                            ? "border-stone-800 text-stone-900"
                            : "border-transparent text-stone-400 hover:text-stone-700"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.04em] text-stone-400">Color</p>
                  <div className="mt-2 flex gap-2">
                    {LINAJE_COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCard(product.id, { color: c })}
                        className={`h-6 w-6 rounded-full border transition ${
                          st.color.id === c.id ? "border-stone-800 ring-1 ring-stone-800 ring-offset-2" : "border-stone-200"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.label}
                      />
                    ))}
                  </div>

                  <p className="mt-4 font-serif text-lg text-stone-900 transition-opacity duration-300">
                    {formatLinajePrice(price)}
                  </p>

                  <button
                    type="button"
                    disabled={st.adding}
                    onClick={() => handleAdd(product)}
                    className="mt-4 w-full border border-stone-800 py-3 text-[10px] font-medium uppercase tracking-[0.04em] text-stone-900 transition hover:bg-stone-900 hover:text-white disabled:opacity-50"
                  >
                    {st.adding ? (
                      <span className="nl-add-loading inline-block">Añadiendo…</span>
                    ) : (
                      "Añadir al carrito"
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
