"use client";

import { ShoppingBag, Trash2, X } from "lucide-react";
import { aranaCartWhatsApp, formatAranaPrice, type AranaProduct } from "@/lib/arana-283";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: AranaProduct[];
  onRemove: (id: number) => void;
};

export function Arana283Cart({ open, onClose, cart, onRemove }: Props) {
  if (!open) return null;

  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#09090b]/80 backdrop-blur-md">
      <div className="arana-slide-in-right flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-purple-400" />
            <h3 className="text-sm font-black uppercase tracking-[0.04em] text-white">Bolsa de reserva</h3>
            <span className="rounded bg-purple-600/20 px-2 py-0.5 text-[10px] font-black text-purple-400">
              {cart.length}
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="py-24 text-center text-xs text-slate-500">
              Tu bolsa está vacía. Explorá el catálogo de stock.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <h4 className="line-clamp-1 text-xs font-bold text-white">{item.title}</h4>
                    <span className="mt-0.5 block text-[10px] font-extrabold uppercase text-slate-500">
                      Talle {item.size} · {item.brand}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-pink-400">{formatAranaPrice(item.price)}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="p-1 text-slate-500 hover:text-rose-400"
                    aria-label="Quitar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 ? (
          <div className="space-y-4 border-t border-slate-800 bg-slate-950/65 p-6 backdrop-blur-md">
            <div className="flex justify-between text-xs">
              <span className="font-extrabold uppercase tracking-wide text-slate-400">Total estimado</span>
              <span className="text-lg font-black text-white">{formatAranaPrice(total)}</span>
            </div>
            <a
              href={aranaCartWhatsApp(cart)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 text-xs font-black uppercase tracking-[0.04em] text-white shadow-lg shadow-purple-500/15"
            >
              Confirmar por WhatsApp
            </a>
            <p className="text-center text-[9px] leading-relaxed text-slate-500">
              Reserva en mostrador por hasta 48 hs hábiles para probarte en Arana 283.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
