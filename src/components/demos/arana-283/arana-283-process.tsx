"use client";

import { ArrowRight } from "lucide-react";

type Props = {
  onTab: (tab: string) => void;
};

const STEPS = [
  {
    title: "Traés tus prendas seleccionadas",
    body: "Recibimos lotes los miércoles y sábados de 10:00 a 17:00 hs en Arana 283. Sin turno previo; por orden de llegada. Traé ropa limpia y planchada.",
  },
  {
    title: "Control de filtro de calidad",
    body: "Analizamos temporada vigente, marcas reconocidas y excelente estado: sin manchas, roturas ni pelotitas.",
  },
  {
    title: "Efectivo al instante o canje con bonus",
    body: "Caja directa en efectivo o transferencia, o crédito de tienda con +20% de valor extra para usar en el local.",
  },
];

export function Arana283Process({ onTab }: Props) {
  return (
    <section className="arana-fade-in mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="mb-2 block text-xs font-black uppercase tracking-widest text-purple-400">Simplicidad</span>
        <h2 className="text-3xl font-black text-white">¿Cómo funciona el ciclo?</h2>
      </div>
      <div className="space-y-8">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:flex-row sm:items-start sm:p-8 md:text-left"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-lg font-black text-white">
              {i + 1}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-black text-white">{step.title}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => onTab("cotizador")}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-xs font-black uppercase tracking-wider text-white"
        >
          Simular cotización <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
