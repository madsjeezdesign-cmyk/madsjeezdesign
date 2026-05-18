"use client";

import Image from "next/image";
import { X } from "lucide-react";
import {
  formatLinajePrice,
  getLinajeUnitPrice,
  LINAJE_COLORS,
  LINAJE_SIZES,
  type LinajeColor,
  type LinajeProduct,
  type LinajeSize,
} from "@/lib/nido-linaje";

type Props = {
  product: LinajeProduct | null;
  size: LinajeSize;
  color: LinajeColor;
  onSize: (s: LinajeSize) => void;
  onColor: (c: LinajeColor) => void;
  onClose: () => void;
  onAdd: () => void;
  adding: boolean;
};

export function NidoLinajeProductModal({
  product,
  size,
  color,
  onSize,
  onColor,
  onClose,
  onAdd,
  adding,
}: Props) {
  if (!product) return null;

  const price = getLinajeUnitPrice(product.basePrice, size);

  return (
    <div className="fixed inset-0 z-[75] flex items-end justify-center bg-stone-900/25 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        className="absolute inset-0"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Cerrar"
      />
      <div className="nl-fade-in relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-sm">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-sm hover:text-stone-900"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" strokeWidth={1.25} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-stone-100 md:aspect-auto md:min-h-[480px]">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
          </div>
          <div className="flex flex-col p-8 sm:p-10">
            {product.badge ? (
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-stone-400">
                {product.badge}
              </span>
            ) : null}
            <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">{product.name}</h2>
            <p className="mt-2 text-sm font-light text-stone-500">{product.tagline}</p>

            <div className="mt-8 rounded-sm border border-stone-100 bg-stone-50/80 p-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">
                Composición técnica
              </p>
              <p className="mt-2 font-serif text-lg text-stone-800">{product.composition}</p>
              <ul className="mt-4 space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">Tamaño</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LINAJE_SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSize(s)}
                  className={`rounded-sm border px-4 py-2 text-xs font-medium transition ${
                    size.id === s.id
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-200 text-stone-600 hover:border-stone-400"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">Color</p>
            <div className="mt-3 flex gap-3">
              {LINAJE_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onColor(c)}
                  title={c.label}
                  className={`h-8 w-8 rounded-full border-2 transition ${
                    color.id === c.id ? "border-stone-800 scale-110" : "border-stone-200 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.label}
                />
              ))}
            </div>

            <p className="mt-8 font-serif text-2xl text-stone-900">{formatLinajePrice(price)}</p>

            <button
              type="button"
              disabled={adding}
              onClick={onAdd}
              className="mt-6 w-full rounded-sm bg-stone-900 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white transition hover:bg-stone-700 disabled:opacity-60"
            >
              {adding ? <span className="nl-add-loading">Añadiendo…</span> : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
