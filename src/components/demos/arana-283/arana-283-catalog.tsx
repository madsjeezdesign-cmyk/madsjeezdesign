"use client";

import Image from "next/image";
import { ChevronDown, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ARANA_PRODUCTS, formatAranaPrice, type AranaProduct } from "@/lib/arana-283";

type Props = {
  onAddToCart: (p: AranaProduct) => void;
  onSelectProduct: (p: AranaProduct) => void;
};

export function Arana283Catalog({ onAddToCart, onSelectProduct }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState("all");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...ARANA_PRODUCTS];
    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q),
      );
    }
    if (category !== "all") result = result.filter((p) => p.category === category);
    if (size !== "all") result = result.filter((p) => p.size === size);
    if (brand !== "all") result = result.filter((p) => p.brand === brand);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "high-score") result.sort((a, b) => b.conditionScore - a.conditionScore);
    return result;
  }, [search, category, size, brand, sort]);

  const selectClass =
    "appearance-none cursor-pointer rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-4 pr-8 text-xs font-black uppercase tracking-[0.04em] text-slate-300 hover:border-slate-700 focus:border-purple-500 focus:outline-none";

  return (
    <section className="arana-fade-in mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-1 block text-xs font-black uppercase tracking-[0.04em] text-pink-400">
            Stock exclusivo del local
          </span>
          <h2 className="text-3xl font-black text-white">La vidriera de joyas únicas</h2>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
          <input
            type="search"
            placeholder="Buscar prenda o marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-slate-800 bg-slate-900 py-3 pl-10 pr-10 text-xs text-slate-200 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-3 text-slate-400 hover:text-white"
              aria-label="Limpiar"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-md">
        <div className="flex flex-wrap gap-3">
          {[
            { v: category, set: setCategory, opts: [["all", "Categorías"], ["abrigo", "Abrigos"], ["pantalon", "Pantalones"], ["remera", "Remeras"], ["calzado", "Calzado"], ["accesorios", "Accesorios"]] },
            { v: size, set: setSize, opts: [["all", "Talles"], ["S", "S"], ["M", "M"], ["L", "L"], ["XL", "XL"], ["38", "38"], ["41", "41"], ["42", "42"], ["Único", "Único"]] },
            { v: brand, set: setBrand, opts: [["all", "Marcas"], ["Zara", "Zara"], ["Levi's", "Levi's"], ["Nike", "Nike"], ["Adidas", "Adidas"], ["Otras", "Otras"]] },
            { v: sort, set: setSort, opts: [["default", "Ordenar"], ["price-asc", "Menor precio"], ["price-desc", "Mayor precio"], ["high-score", "Mejor estado"]] },
          ].map((f, i) => (
            <div key={i} className="relative">
              <select value={f.v} onChange={(e) => f.set(e.target.value)} className={selectClass}>
                {f.opts.map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-3.5 w-3.5 text-slate-500" />
            </div>
          ))}
        </div>
        <span className="text-xs font-bold text-slate-400">
          {filtered.length} {filtered.length === 1 ? "joya" : "joyas"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 py-20 text-center">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-slate-600" />
          <p className="font-bold text-white">No encontramos prendas</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setSize("all");
              setBrand("all");
              setSearch("");
              setSort("default");
            }}
            className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold hover:bg-slate-700"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all hover:border-purple-500/50 hover:shadow-2xl"
            >
              <div>
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-950">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-slate-800 bg-slate-950/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.04em] text-pink-400 backdrop-blur-md">
                    {product.brand}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-purple-600 px-2.5 py-1 text-[10px] font-black uppercase text-white">
                    Talle: {product.size}
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="line-clamp-1 text-base font-black text-slate-100 group-hover:text-purple-400">
                    {product.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{product.desc}</p>
                  <span className="inline-flex items-center gap-1 rounded border border-slate-800 bg-slate-950 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.04em] text-lime-400">
                    ✨ {product.condition}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 p-5 pt-3">
                <div>
                  <span className="block text-xs font-extrabold uppercase text-slate-500">Precio circular</span>
                  <span className="text-lg font-black text-white">{formatAranaPrice(product.price)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="rounded-xl bg-slate-800 p-2.5 text-xs font-bold text-slate-100 hover:bg-slate-700"
                  >
                    Ver info
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2.5 text-xs font-black uppercase tracking-[0.04em] text-white shadow-md shadow-purple-500/15"
                  >
                    <Plus className="h-4 w-4" /> Bolsa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
