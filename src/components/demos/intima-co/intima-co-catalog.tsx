"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatIntimaPrice,
  getIntimaColor,
  INTIMA_CATEGORIES,
  INTIMA_PRODUCTS,
  type IntimaCategoryId,
  type IntimaProduct,
} from "@/lib/intima-co";

type ProductState = Record<number, { colorId: string; size: string; justAdded: boolean }>;

type Props = {
  categoryFilter: IntimaCategoryId | "all";
  onCategoryFilter: (id: IntimaCategoryId | "all") => void;
  sizeHighlight: string | null;
  onAdd: (product: IntimaProduct, colorId: string, size: string) => void;
};

export function IntimaCoCatalog({
  categoryFilter,
  onCategoryFilter,
  sizeHighlight,
  onAdd,
}: Props) {
  const [state, setState] = useState<ProductState>({});

  const filtered = useMemo(() => {
    if (categoryFilter === "all") return INTIMA_PRODUCTS;
    return INTIMA_PRODUCTS.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const getState = (p: IntimaProduct) => {
    const s = state[p.id];
    return {
      colorId: s?.colorId ?? p.defaultColorId,
      size: s?.size ?? (sizeHighlight && p.sizes.includes(sizeHighlight) ? sizeHighlight : p.sizes[1] ?? p.sizes[0]),
      justAdded: s?.justAdded ?? false,
    };
  };

  const setProductState = (id: number, patch: Partial<ProductState[number]>) => {
    setState((prev) => ({
      ...prev,
      [id]: { ...getState(INTIMA_PRODUCTS.find((p) => p.id === id)!), ...prev[id], ...patch },
    }));
  };

  const handleAdd = (product: IntimaProduct) => {
    const { colorId, size } = getState(product);
    onAdd(product, colorId, size);
    setProductState(product.id, { justAdded: true });
    window.setTimeout(() => setProductState(product.id, { justAdded: false }), 600);
  };

  return (
    <section id="catalogo" className="scroll-mt-24 border-t border-stone-200/60 bg-stone-50 py-12 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-3 sm:flex-row sm:px-4">
        <aside className="shrink-0 sm:w-52">
          <p className="font-serif text-lg text-stone-900">Colecciones</p>
          <nav className="mt-4 space-y-1">
            {INTIMA_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onCategoryFilter(c.id)}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-xs font-light transition ${
                  categoryFilter === c.id
                    ? "bg-stone-900 text-stone-50"
                    : "text-stone-600 hover:bg-white/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
          {sizeHighlight ? (
            <p className="mt-4 rounded-xl border border-rose-100 bg-rose-50/40 px-3 py-2 text-[11px] text-stone-600">
              Filtrando visualmente talle <strong className="text-stone-900">{sizeHighlight}</strong>
            </p>
          ) : null}
        </aside>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl text-stone-900">Catálogo</h2>
          <p className="mt-1 text-sm font-light text-stone-500">{filtered.length} piezas</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => {
              const { colorId, size, justAdded } = getState(product);
              const color = getIntimaColor(product, colorId);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-stone-200/60 bg-white/90 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <Image
                      src={color.image}
                      alt={product.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-stone-900">{product.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs font-light text-stone-500">{product.description}</p>
                    <p className="mt-3 text-lg font-light text-stone-800">{formatIntimaPrice(product.price)}</p>

                    <div className="mt-4">
                      <p className="text-[10px] font-light uppercase tracking-[0.04em] text-stone-400">Color</p>
                      <div className="mt-2 flex gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setProductState(product.id, { colorId: c.id })}
                            className={`h-7 w-7 rounded-full border-2 transition ${
                              colorId === c.id
                                ? "border-stone-900 ring-2 ring-stone-200 ring-offset-1"
                                : "border-stone-200 hover:border-stone-400"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] font-light uppercase tracking-[0.04em] text-stone-400">Talle</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setProductState(product.id, { size: sz })}
                            className={`min-w-[2.25rem] rounded-lg border px-2 py-1.5 text-xs transition ${
                              size === sz
                                ? "border-stone-900 bg-stone-900 text-stone-50"
                                : sizeHighlight === sz
                                  ? "border-rose-200 bg-rose-50/50 text-stone-800"
                                  : "border-stone-200 text-stone-600 hover:border-stone-400"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-[10px] font-light uppercase tracking-[0.04em] transition ${
                        justAdded
                          ? "ic-add-pop bg-rose-100 text-stone-900"
                          : "bg-stone-900 text-stone-50 hover:bg-stone-800"
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="h-4 w-4" />
                          Agregado
                        </>
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
      </div>
    </section>
  );
}
