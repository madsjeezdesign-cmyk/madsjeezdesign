"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  BURGER_COMBO_OPTIONS,
  BURGER_EXTRAS,
  calcUnitPrice,
  formatBurgerPrice,
  type BurgerExtra,
  type BurgerProduct,
} from "@/lib/burger-lab";

type Props = {
  product: BurgerProduct | null;
  onClose: () => void;
  onAdd: (payload: {
    comboId: string;
    comboLabel: string;
    comboAdd: number;
    extras: BurgerExtra[];
    unitPrice: number;
  }) => void;
};

export function BurgerLabCustomizeModal({ product, onClose, onAdd }: Props) {
  const [comboId, setComboId] = useState("solo");
  const [extraIds, setExtraIds] = useState<string[]>([]);

  const combo = BURGER_COMBO_OPTIONS.find((c) => c.id === comboId) ?? BURGER_COMBO_OPTIONS[0];
  const extras = useMemo(
    () => BURGER_EXTRAS.filter((e) => extraIds.includes(e.id)),
    [extraIds],
  );

  const unitPrice = product ? calcUnitPrice(product.basePrice, combo.priceAdd, extras) : 0;

  if (!product) return null;

  const toggleExtra = (id: string) => {
    setExtraIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    onAdd({
      comboId: combo.id,
      comboLabel: combo.label,
      comboAdd: combo.priceAdd,
      extras,
      unitPrice,
    });
    setComboId("solo");
    setExtraIds([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden />
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-zinc-800 bg-zinc-900 sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-zinc-800 p-2 text-zinc-400"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video bg-zinc-800">
          <Image src={product.image} alt="" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-black uppercase text-white">{product.name}</h3>
          <p className="mt-1 text-xs text-zinc-500">{product.description}</p>

          <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-amber-400">Tipo de combo</p>
          <div className="mt-2 space-y-2">
            {BURGER_COMBO_OPTIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setComboId(c.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm ${
                  comboId === c.id
                    ? "border-amber-500 bg-amber-500/10 text-white"
                    : "border-zinc-800 text-zinc-400"
                }`}
              >
                <span className="font-bold">{c.label}</span>
                {c.priceAdd > 0 ? (
                  <span className="text-amber-400">+{formatBurgerPrice(c.priceAdd)}</span>
                ) : null}
              </button>
            ))}
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-amber-400">Agregar extra</p>
          <div className="mt-2 space-y-2">
            {BURGER_EXTRAS.map((e) => (
              <label
                key={e.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 ${
                  extraIds.includes(e.id) ? "border-orange-500/50 bg-orange-500/10" : "border-zinc-800"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extraIds.includes(e.id)}
                    onChange={() => toggleExtra(e.id)}
                    className="h-4 w-4 rounded border-zinc-600 accent-amber-500"
                  />
                  <span className="text-sm font-medium text-white">{e.label}</span>
                </span>
                <span className="text-sm font-black text-amber-400">+{formatBurgerPrice(e.price)}</span>
              </label>
            ))}
          </div>

          <p className="mt-6 text-center text-2xl font-black text-amber-400">{formatBurgerPrice(unitPrice)}</p>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 w-full rounded-xl bg-amber-500 py-4 text-sm font-black uppercase text-zinc-950 hover:bg-amber-400"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
