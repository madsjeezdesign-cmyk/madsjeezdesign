"use client";

import Image from "next/image";
import { PackagePlus } from "lucide-react";
import { BEBIDA_COMBOS, formatBebidaPrice, type BebidaCombo } from "@/lib/central-bebidas";

type Props = {
  onAddCombo: (combo: BebidaCombo) => void;
};

export function CentralBebidasCombos({ onAddCombo }: Props) {
  return (
    <section id="combos" className="border-b border-zinc-800 bg-zinc-900/30 py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <h2 className="text-lg font-black uppercase text-white">Combos armados</h2>
        <p className="mt-1 text-sm text-zinc-500">Un clic — todos los productos al carrito con precio promo</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEBIDA_COMBOS.map((combo) => (
            <article
              key={combo.id}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
            >
              <div className="relative aspect-video bg-zinc-800">
                <Image src={combo.image} alt="" fill className="object-cover opacity-80" sizes="33vw" />
                {combo.badge ? (
                  <span className="absolute left-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-[9px] font-black uppercase text-zinc-950">
                    {combo.badge}
                  </span>
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{combo.name}</h3>
                <p className="mt-1 text-xs text-zinc-500">{combo.description}</p>
                <ul className="mt-3 space-y-1 text-[11px] text-zinc-400">
                  {combo.items.map((it) => (
                    <li key={it.label}>· {it.qty}x {it.label}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xl font-black text-lime-400">{formatBebidaPrice(combo.promoPrice)}</p>
                <button
                  type="button"
                  onClick={() => onAddCombo(combo)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-xs font-black uppercase text-zinc-950 hover:bg-amber-400"
                >
                  <PackagePlus className="h-4 w-4" />
                  Agregar combo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
