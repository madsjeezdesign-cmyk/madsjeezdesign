"use client";

import { Ruler } from "lucide-react";
import { useState } from "react";
import {
  calculateApparelSize,
  calculateBraSize,
  INTIMA_CO_CONFIG,
} from "@/lib/intima-co";

type Props = {
  onViewSize: (size: string, type: "bra" | "apparel") => void;
};

export function IntimaCoSizeCalculator({ onViewSize }: Props) {
  const [mode, setMode] = useState<"bra" | "apparel">("bra");
  const [bust, setBust] = useState("");
  const [underbust, setUnderbust] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setResult(null);
    if (mode === "bra") {
      const b = parseFloat(bust);
      const u = parseFloat(underbust);
      if (Number.isNaN(b) || Number.isNaN(u)) {
        setError("Ingresá ambas medidas en centímetros");
        return;
      }
      const size = calculateBraSize(b, u);
      if (!size) {
        setError("Revisá las medidas. El contorno de busto debe ser mayor al bajo busto.");
        return;
      }
      setResult(size);
    } else {
      const h = parseFloat(hip);
      if (Number.isNaN(h)) {
        setError("Ingresá el contorno de cadera en centímetros");
        return;
      }
      const size = calculateApparelSize(h);
      if (!size) {
        setError("Medida fuera de rango. Consultá asesoramiento personalizado.");
        return;
      }
      setResult(size);
    }
  };

  return (
    <section id="talles" className="scroll-mt-24 border-t border-stone-200/60 bg-rose-50/10 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 text-rose-400/80">
          <Ruler className="h-5 w-5" strokeWidth={1.25} />
          <p className="text-[10px] font-light uppercase tracking-[0.35em]">Asistente de confianza</p>
        </div>
        <h2 className="mt-3 text-center font-serif text-2xl text-stone-900 sm:text-3xl">
          Calculadora de talles
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm font-light text-stone-500">
          Encontrá tu talle ideal con medidas en centímetros. Recomendación orientativa de {INTIMA_CO_CONFIG.brand}.
        </p>

        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("bra");
              setResult(null);
              setError(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-light uppercase tracking-wider transition ${
              mode === "bra" ? "bg-stone-900 text-stone-50" : "border border-stone-200 text-stone-600"
            }`}
          >
            Corpiños
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("apparel");
              setResult(null);
              setError(null);
            }}
            className={`rounded-full px-4 py-2 text-xs font-light uppercase tracking-wider transition ${
              mode === "apparel" ? "bg-stone-900 text-stone-50" : "border border-stone-200 text-stone-600"
            }`}
          >
            Indumentaria
          </button>
        </div>

        <div className="mt-8 rounded-3xl border border-stone-200/80 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
          {mode === "bra" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-light uppercase tracking-wider text-stone-500">
                  Contorno de busto (cm)
                </span>
                <input
                  type="number"
                  value={bust}
                  onChange={(e) => setBust(e.target.value)}
                  placeholder="Ej: 92"
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 focus:border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-100"
                />
              </label>
              <label className="block">
                <span className="text-xs font-light uppercase tracking-wider text-stone-500">
                  Bajo busto (cm)
                </span>
                <input
                  type="number"
                  value={underbust}
                  onChange={(e) => setUnderbust(e.target.value)}
                  placeholder="Ej: 78"
                  className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 focus:border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-100"
                />
              </label>
            </div>
          ) : (
            <label className="block">
              <span className="text-xs font-light uppercase tracking-wider text-stone-500">
                Contorno de cadera (cm)
              </span>
              <input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="Ej: 98"
                className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-stone-800 focus:border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-100"
              />
            </label>
          )}

          <button
            type="button"
            onClick={calculate}
            className="mt-6 w-full rounded-full bg-stone-900 py-3.5 text-xs font-light uppercase tracking-[0.2em] text-stone-50 transition hover:bg-stone-800"
          >
            Calcular mi talle
          </button>

          {error ? <p className="mt-4 text-center text-sm text-rose-600/90">{error}</p> : null}

          {result ? (
            <div className="ic-fade-in mt-6 rounded-2xl border border-rose-100 bg-rose-50/30 p-6 text-center">
              <p className="text-xs font-light uppercase tracking-widest text-stone-500">Tu talle recomendado</p>
              <p className="mt-2 font-serif text-4xl text-stone-900">{result}</p>
              <button
                type="button"
                onClick={() => onViewSize(result, mode)}
                className="mt-4 rounded-full border border-stone-900 px-6 py-2.5 text-xs font-light uppercase tracking-wider text-stone-900 transition hover:bg-stone-900 hover:text-stone-50"
              >
                Ver productos en mi talle
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
