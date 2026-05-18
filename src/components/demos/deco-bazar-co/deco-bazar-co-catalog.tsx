"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  DECO_CATEGORIES,
  DECO_MATERIALS,
  DECO_PRODUCTS,
  formatDecoPrice,
  type DecoCategoryId,
  type DecoMaterialId,
  type DecoProduct,
} from "@/lib/deco-bazar-co";

type QtyState = Record<number, number>;

type Props = {
  search: string;
  categoryFilter: DecoCategoryId | "all";
  onCategoryFilter: (id: DecoCategoryId | "all") => void;
  onAdd: (product: DecoProduct, qty: number) => void;
};

export function DecoBazarCoCatalog({
  search,
  categoryFilter,
  onCategoryFilter,
  onAdd,
}: Props) {
  const [material, setMaterial] = useState<DecoMaterialId | "all">("all");
  const [qty, setQty] = useState<QtyState>({});

  const filtered = useMemo(() => {
    let list = [...DECO_PRODUCTS];
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (material !== "all") list = list.filter((p) => p.material === material);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [categoryFilter, material, search]);

  const getQty = (id: number) => qty[id] ?? 1;

  return (
    <section id="catalogo" className="scroll-mt-16 border-t border-zinc-100 bg-zinc-50 py-10 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-3 sm:flex-row sm:gap-8 sm:px-4">
        <aside className="shrink-0 sm:w-56 lg:w-60">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400">Filtros</p>

          <div className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-800">Categoría</p>
            <div className="mt-3 space-y-1">
              {DECO_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCategoryFilter(c.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                    categoryFilter === c.id
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-zinc-800">Material</p>
            <div className="mt-3 space-y-1">
              {DECO_MATERIALS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                    material === m.id ? "bg-[#5c6b4a]/10 text-[#4d5a3e] ring-1 ring-[#5c6b4a]/30" : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-light text-zinc-900">Catálogo</h2>
              <p className="mt-1 text-sm font-light text-zinc-500">{filtered.length} productos</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-200 bg-white py-16 text-center text-sm text-zinc-400">
              No hay productos con estos filtros
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => {
                const q = getQty(product.id);
                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <Image
                        src={product.imageHover}
                        alt=""
                        fill
                        className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        {product.badges?.includes("freeShipping") ? (
                          <span className="rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-zinc-700 shadow-sm">
                            Envío gratis
                          </span>
                        ) : null}
                        {product.badges?.includes("installments") ? (
                          <span className="rounded-full bg-zinc-800/90 px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-white">
                            3 cuotas s/int.
                          </span>
                        ) : null}
                      </div>
                      {product.stock === "low" ? (
                        <span className="absolute right-2 top-2 rounded-full bg-amber-50 px-2 py-0.5 text-[8px] font-medium text-amber-800">
                          Últimas unidades
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-4">
                      <h3 className="text-sm font-medium leading-snug text-zinc-900 line-clamp-2">{product.name}</h3>
                      <p className="mt-2 text-lg font-light text-zinc-800">{formatDecoPrice(product.price)}</p>
                      <div className="mt-auto flex items-center gap-2 pt-4">
                        <div className="flex items-center rounded-full border border-zinc-200">
                          <button
                            type="button"
                            onClick={() => setQty((prev) => ({ ...prev, [product.id]: Math.max(1, getQty(product.id) - 1) }))}
                            className="flex h-10 w-10 items-center justify-center text-zinc-500"
                            aria-label="Menos"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{q}</span>
                          <button
                            type="button"
                            onClick={() => setQty((prev) => ({ ...prev, [product.id]: Math.min(99, getQty(product.id) + 1) }))}
                            className="flex h-10 w-10 items-center justify-center text-zinc-500"
                            aria-label="Más"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAdd(product, q)}
                          className="flex-1 rounded-full bg-[#5c6b4a] py-2.5 text-[10px] font-medium uppercase tracking-wider text-white hover:bg-[#4d5a3e] active:scale-[0.98]"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
