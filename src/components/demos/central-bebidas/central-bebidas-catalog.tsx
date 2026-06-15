"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BEBIDA_CATEGORIES,
  BEBIDA_PRODUCTS,
  formatBebidaPrice,
  getLineUnitPrice,
  STOCK_LABELS,
  type BebidaCategoryId,
  type BebidaProduct,
  type PurchaseMode,
} from "@/lib/central-bebidas";

type QtyState = Record<number, number>;

type Props = {
  mode: PurchaseMode;
  search: string;
  onAdd: (product: BebidaProduct, qty: number) => void;
};

export function CentralBebidasCatalog({ mode, search, onAdd }: Props) {
  const [category, setCategory] = useState<BebidaCategoryId | "all">("all");
  const [qty, setQty] = useState<QtyState>({});

  const filtered = useMemo(() => {
    let list = category === "all" ? BEBIDA_PRODUCTS : BEBIDA_PRODUCTS.filter((p) => p.category === category);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.volume.toLowerCase().includes(q),
      );
    }
    return list;
  }, [category, search]);

  const getQty = (id: number) => qty[id] ?? (mode === "wholesale" ? 6 : 1);

  const setProductQty = (id: number, val: number) => {
    setQty((prev) => ({ ...prev, [id]: Math.max(1, Math.min(999, val)) }));
  };

  return (
    <section id="catalogo" className="scroll-mt-4 border-b border-zinc-800 bg-zinc-950 py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 sm:flex-row sm:px-4">
        <aside className="shrink-0 sm:w-52">
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-[color:var(--muted-body)]">Categorías</p>
          <nav className="flex gap-2 overflow-x-auto pb-2 sm:flex-col sm:overflow-visible sm:pb-0">
            {BEBIDA_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`shrink-0 rounded-lg px-3 py-2 text-left text-xs font-bold transition sm:w-full ${
                  category === c.id
                    ? "bg-lime-500 text-zinc-950"
                    : "border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black uppercase text-white">Catálogo</h2>
            <span className="text-xs text-[color:var(--muted-body)]">{filtered.length} productos</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => {
              const q = getQty(product.id);
              const unit = getLineUnitPrice(product, q, mode);
              const stock = STOCK_LABELS[product.stock];
              const bulkActive = mode === "wholesale" || q >= product.bulkMin;

              return (
                <article
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
                >
                  <div className="relative aspect-[4/3] bg-zinc-800">
                    <Image src={product.image} alt={product.name} fill className="object-cover" sizes="33vw" />
                    <span
                      className={`absolute left-2 top-2 rounded border px-2 py-0.5 text-[9px] font-black uppercase ${stock.className}`}
                    >
                      {stock.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[10px] font-bold uppercase text-lime-400">{product.brand}</p>
                    <h3 className="font-bold text-white">{product.name}</h3>
                    <p className="text-xs text-[color:var(--muted-body)]">{product.volume}</p>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[10px]">
                      <div className={`rounded-lg border p-2 ${!bulkActive ? "border-amber-500/50 bg-amber-500/10" : "border-zinc-800"}`}>
                        <p className="text-[color:var(--muted-body)]">Unidad</p>
                        <p className="font-black text-white">{formatBebidaPrice(product.unitPrice)}</p>
                      </div>
                      <div
                        className={`rounded-lg border p-2 ${bulkActive ? "border-lime-500/50 bg-lime-500/10" : "border-zinc-800"}`}
                      >
                        <p className="text-[color:var(--muted-body)]">{product.bulkLabel}</p>
                        <p className="font-black text-lime-400">{formatBebidaPrice(product.bulkUnitPrice)}</p>
                        <p className="text-[9px] text-[color:var(--muted-body)]">desde {product.bulkMin} u.</p>
                      </div>
                    </div>

                    <p className="mt-2 text-center text-sm font-black text-amber-400">
                      Total: {formatBebidaPrice(unit * q)}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setProductQty(product.id, q - 1)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
                        aria-label="Menos"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={q}
                        onChange={(e) => setProductQty(product.id, parseInt(e.target.value, 10) || 1)}
                        className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 text-center text-lg font-black text-white focus:border-lime-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setProductQty(product.id, q + 1)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-white hover:bg-zinc-700"
                        aria-label="Más"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAdd(product, q)}
                      className="mt-3 w-full rounded-lg bg-lime-500 py-3 text-xs font-black uppercase text-zinc-950 hover:bg-lime-400"
                    >
                      Agregar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-[color:var(--muted-body)]">Sin resultados para tu búsqueda.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
