"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatWeekendPrice,
  WEEKEND_PRODUCTS,
  type WeekendProduct,
} from "@/lib/showroom-weekend";

type Props = {
  sizeFilter: string;
  onSizeFilterChange: (s: string) => void;
  onAddToCart: (product: WeekendProduct, size: number) => void;
};

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "Jeans", label: "Jeans curve" },
  { id: "Abrigos", label: "Abrigos & tejidos" },
  { id: "Tops", label: "Remeras & tops" },
];

export function ShowroomWeekendCatalog({ sizeFilter, onSizeFilterChange, onAddToCart }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return WEEKEND_PRODUCTS.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchesCat = category === "all" || p.category === category;
      const matchesSize =
        sizeFilter === "all" || p.sizes.includes(parseInt(sizeFilter, 10));
      return matchesSearch && matchesCat && matchesSize;
    });
  }, [search, category, sizeFilter]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-slate-900 pb-8 md:flex-row md:items-end">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-rose-400">
            ✦ Moda premium sin barreras
          </span>
          <h2 className="text-3xl font-black text-white sm:text-5xl">Nuestras joyitas</h2>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
          <input
            type="search"
            placeholder="Buscar jeans, sweaters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-10 pr-4 text-xs font-bold text-white placeholder:text-slate-500 focus:border-rose-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all ${
                category === c.id
                  ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/25"
                  : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-slate-500">Talle:</span>
          <select
            value={sizeFilter}
            onChange={(e) => onSizeFilterChange(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-rose-400 focus:border-rose-500 focus:outline-none"
          >
            <option value="all">Ver todos</option>
            {[44, 46, 48, 50, 52, 54, 56, 58, 60].map((sz) => (
              <option key={sz} value={String(sz)}>
                Talle {sz}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-900 bg-slate-900/10 py-24 text-center">
          <p className="text-lg font-bold text-slate-300">No encontramos prendas</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              onSizeFilterChange("all");
              setSearch("");
            }}
            className="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-rose-400"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((prod) => (
            <article
              key={prod.id}
              className="sw-reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/40 shadow-xl transition-colors hover:border-slate-800"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                {prod.badge ? (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-rose-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white">
                    {prod.badge}
                  </span>
                ) : null}
                <Image src={prod.image} alt={prod.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
                <div className="absolute inset-0 flex flex-col justify-end bg-slate-950/60 p-5 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="mb-2 text-center text-[10px] font-extrabold uppercase tracking-wider text-rose-400">
                    Talles
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {prod.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => onAddToCart(prod, sz)}
                        className="w-9 rounded-lg bg-white py-2 text-[10px] font-black text-slate-950 hover:bg-rose-500 hover:text-white"
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="mb-1 block text-[9px] font-extrabold uppercase tracking-widest text-rose-500">
                    {prod.category}
                  </span>
                  <h3 className="line-clamp-1 text-lg font-extrabold text-slate-100 group-hover:text-rose-400">
                    {prod.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {prod.description}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-900 pt-5">
                  <span className="text-xl font-black text-white">{formatWeekendPrice(prod.price)}</span>
                  <span className="rounded-lg border border-indigo-500/20 bg-indigo-950 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-indigo-300">
                    Súper flex
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
