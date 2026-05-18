"use client";

import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatSalonPrice,
  SALON_CATEGORIES,
  SALON_SERVICES,
  type SalonCategoryId,
} from "@/lib/leclat-salon";

type Props = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export function LeclatSalonServices({ selectedIds, onToggle }: Props) {
  const [category, setCategory] = useState<SalonCategoryId | "all">("all");

  const filtered = useMemo(
    () => (category === "all" ? SALON_SERVICES : SALON_SERVICES.filter((s) => s.category === category)),
    [category],
  );

  return (
    <section id="servicios" className="scroll-mt-20 border-t border-rose-100/80 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">Menú de servicios</p>
          <h2 className="mt-2 font-serif text-3xl font-light text-stone-900 sm:text-4xl">Tu ritual, a medida</h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SALON_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-wider transition ${
                category === c.id
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-stone-50 text-stone-500 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc) => {
            const selected = selectedIds.includes(svc.id);
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => onToggle(svc.id)}
                className={`rounded-2xl border p-5 text-left transition duration-300 ${
                  selected
                    ? "border-rose-400 bg-rose-50/60 shadow-md shadow-rose-100"
                    : "border-stone-100 bg-stone-50/50 hover:border-rose-200 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg text-stone-900">{svc.name}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${
                      selected ? "bg-rose-500 text-white" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {selected ? "✓" : "Elegir"}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">{svc.description}</p>
                <ul className="mt-3 space-y-1">
                  {svc.includes.map((inc) => (
                    <li key={inc} className="text-[11px] text-stone-400">
                      · {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-stone-100/80 pt-3">
                  <span className="flex items-center gap-1 text-[11px] text-stone-400">
                    <Clock className="h-3.5 w-3.5" />
                    {svc.duration}
                  </span>
                  <span className="font-serif text-lg text-rose-600">{formatSalonPrice(svc.price)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
