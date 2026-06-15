"use client";

import { useMemo, useState } from "react";
import {
  calculateWeekendSize,
  type WeekendSizeResult,
} from "@/lib/showroom-weekend";

type Props = {
  onFilterSize: (size: string) => void;
};

export function ShowroomWeekendFittingRoom({ onFilterSize }: Props) {
  const [busto, setBusto] = useState(110);
  const [cintura, setCintura] = useState(98);
  const [cadera, setCadera] = useState(122);

  const result: WeekendSizeResult = useMemo(
    () => calculateWeekendSize(busto, cintura, cadera),
    [busto, cintura, cadera],
  );

  const sizeFilter =
    typeof result.size === "number" ? result.size.toString() : "all";

  return (
    <section id="probador" className="relative bg-slate-950/50 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-950/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.04em] text-indigo-400">
            ⚡ Inteligencia de talles
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
            Probador de talles virtual 2.0
          </h2>
          <p className="mt-3 font-medium text-slate-400">
            Calculamos tu talle de Weekend analizando la proporción de tus curvas reales.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md sm:p-8 lg:col-span-5">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-200">
                📐 Medidas en centímetros
              </h3>
              {[
                { label: "Busto", value: busto, set: setBusto, color: "accent-rose-500", text: "text-rose-400" },
                { label: "Cintura", value: cintura, set: setCintura, color: "accent-pink-500", text: "text-pink-400" },
                { label: "Cadera", value: cadera, set: setCadera, color: "accent-indigo-500", text: "text-indigo-400" },
              ].map((s) => (
                <div key={s.label} className="mb-6">
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.04em] text-slate-400">
                    <span>{s.label}</span>
                    <span className={`font-black text-sm ${s.text}`}>{s.value} cm</span>
                  </div>
                  <input
                    type="range"
                    min={s.label === "Busto" ? 80 : s.label === "Cintura" ? 70 : 90}
                    max={s.label === "Busto" ? 150 : s.label === "Cintura" ? 140 : 160}
                    value={s.value}
                    onChange={(e) => s.set(parseInt(e.target.value, 10))}
                    className={`h-2 w-full cursor-pointer rounded-lg bg-slate-800 ${s.color}`}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-2xl border border-indigo-500/15 bg-indigo-950/20 p-4 text-xs leading-relaxed text-slate-400">
              💡 Medí de forma holgada sobre la parte con mayor volumen, con ropa interior clásica.
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/30 p-8 sm:flex-row lg:col-span-7">
            <div className="flex w-full flex-col items-center sm:w-1/2">
              <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.04em] text-slate-500">
                Simulación de silueta
              </span>
              <div className="flex aspect-[3/4] w-48 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <svg
                  viewBox="0 0 100 150"
                  className="h-full w-full text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="50" cy="20" r="10" />
                  <line x1="50" y1="30" x2="50" y2="38" />
                  <path
                    d={`M 50,38 C ${50 - 20 * result.shape.scaleBust},38 ${50 - 20 * result.shape.scaleBust},60 ${50 - 15 * result.shape.scaleWaist},80 C ${50 - 15 * result.shape.scaleWaist},100 ${50 - 28 * result.shape.scaleHips},115 50,115 C ${50 + 28 * result.shape.scaleHips},115 ${50 + 15 * result.shape.scaleWaist},100 ${50 + 15 * result.shape.scaleWaist},80 C ${50 + 20 * result.shape.scaleBust},60 ${50 + 20 * result.shape.scaleBust},38 50,38 Z`}
                    fill="rgba(244,63,94,0.15)"
                    className="transition-all duration-500"
                  />
                  <path d="M 40,115 L 35,145 M 60,115 L 65,145" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="w-full space-y-6 sm:w-1/2">
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.04em] text-rose-400">
                  Tu talle sugerido
                </span>
                <p className="text-4xl font-black text-white">Talle {result.size}</p>
                <p className="mt-1 text-xs text-slate-400">Con rebote elástico real.</p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.04em] text-indigo-400">
                  Silueta
                </span>
                <p className="text-lg font-extrabold text-slate-200">{result.shape.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{result.shape.desc}</p>
              </div>
              <p className="rounded-xl border border-pink-500/15 bg-pink-950/20 p-4 text-xs text-pink-300">
                <strong>💫 Tip:</strong> {result.shape.advice}
              </p>
              <button
                type="button"
                onClick={() => {
                  onFilterSize(sizeFilter);
                  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-slate-900 py-3 text-xs font-bold uppercase tracking-[0.04em] text-slate-200 transition-colors hover:bg-rose-500 hover:text-white"
              >
                🔍 Ver ropa en mi talle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
