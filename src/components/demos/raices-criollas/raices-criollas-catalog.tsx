"use client";

import Image from "next/image";
import { MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatRaicesPrice,
  RAICES_CATEGORIES,
  RAICES_MATERIALS,
  RAICES_PRODUCTS,
  type RaicesCategoryId,
  type RaicesMaterialId,
  type RaicesProduct,
} from "@/lib/raices-criollas";

type Props = {
  categoryFilter: RaicesCategoryId | "all";
  onCategoryFilter: (id: RaicesCategoryId | "all") => void;
  onAdd: (product: RaicesProduct) => void;
};

export function RaicesCriollasCatalog({ categoryFilter, onCategoryFilter, onAdd }: Props) {
  const [material, setMaterial] = useState<RaicesMaterialId | "all">("all");

  const filtered = useMemo(() => {
    let list = [...RAICES_PRODUCTS];
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (material !== "all") list = list.filter((p) => p.material === material);
    return list;
  }, [categoryFilter, material]);

  return (
    <section id="catalogo" className="scroll-mt-20 border-t border-stone-200 bg-stone-50 py-10 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-3 sm:flex-row sm:gap-8 sm:px-4">
        <aside className="shrink-0 sm:w-56 lg:w-60">
          <p className="mb-4 font-serif text-lg text-stone-900">Filtros</p>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-amber-800">Categoría</p>
            <div className="mt-3 space-y-1">
              {RAICES_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onCategoryFilter(c.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                    categoryFilter === c.id
                      ? "bg-amber-800 text-amber-50"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-amber-800">Material / Tipo</p>
            <div className="mt-3 space-y-1">
              {RAICES_MATERIALS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                    material === m.id
                      ? "bg-stone-800 text-stone-50"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl text-stone-900 sm:text-3xl">Catálogo</h2>
          <p className="mt-1 text-sm text-stone-500">{filtered.length} productos seleccionados</p>

          {filtered.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center text-sm text-stone-400">
              No hay productos con estos filtros
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-stone-100">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.04em] text-amber-800">
                      <MapPin className="h-3 w-3" />
                      {product.origin}
                    </p>
                    <h3 className="mt-2 font-serif text-lg leading-snug text-stone-900">{product.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-stone-500">{product.description}</p>
                    <p className="mt-3 text-xl font-semibold text-orange-900">{formatRaicesPrice(product.price)}</p>
                    <button
                      type="button"
                      onClick={() => onAdd(product)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-amber-800 py-3 text-[10px] font-semibold uppercase tracking-[0.04em] text-amber-800 transition hover:bg-amber-800 hover:text-amber-50 active:scale-[0.98]"
                    >
                      <Plus className="h-4 w-4" />
                      Añadir al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
