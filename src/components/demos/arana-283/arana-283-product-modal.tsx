"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { aranaSingleProductWhatsApp, formatAranaPrice, type AranaProduct } from "@/lib/arana-283";

type Props = {
  product: AranaProduct | null;
  onClose: () => void;
  onAddToCart: (p: AranaProduct) => void;
};

export function Arana283ProductModal({ product, onClose, onAddToCart }: Props) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b]/80 p-4 backdrop-blur-md">
      <div className="arana-fade-in relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative h-64 bg-slate-950">
          <Image src={product.image} alt={product.title} fill className="object-cover opacity-80" sizes="500px" />
          <span className="absolute bottom-4 left-4 rounded-md border border-slate-800 bg-slate-950/90 px-3 py-1 text-xs font-black uppercase tracking-[0.04em] text-pink-400">
            {product.brand}
          </span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-black text-white">{product.title}</h3>
            <span className="text-xl font-black text-pink-400">{formatAranaPrice(product.price)}</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">{product.desc}</p>
          <div className="grid grid-cols-2 gap-4 border-y border-slate-800 py-4 text-xs">
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Talle</span>
              <strong className="text-sm text-white">{product.size}</strong>
            </div>
            <div>
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.04em] text-slate-500">Estado</span>
              <strong className="text-sm text-lime-400">{product.condition}</strong>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 text-xs font-black uppercase tracking-[0.04em] text-white"
            >
              Agregar a bolsa
            </button>
            <a
              href={aranaSingleProductWhatsApp(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 py-4 text-xs font-black uppercase tracking-[0.04em] text-white hover:bg-slate-900"
            >
              Reservar directo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
