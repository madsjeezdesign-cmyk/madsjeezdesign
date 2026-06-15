"use client";

import { ArrowRight, Calculator, CheckCircle2, DollarSign, RefreshCw, Sparkles, X } from "lucide-react";
import { useState } from "react";
import {
  aranaCotizacionWhatsApp,
  calculateAranaValuation,
  formatAranaPrice,
  type AranaCalcResult,
} from "@/lib/arana-283";

type Props = {
  onToast: (msg: string, type?: "success" | "warning") => void;
};

export function Arana283Calculator({ onToast }: Props) {
  const [calcType, setCalcType] = useState("abrigo");
  const [calcBrand, setCalcBrand] = useState("premium");
  const [calcCondition, setCalcCondition] = useState("excellent");
  const [result, setResult] = useState<AranaCalcResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    setLoading(true);
    window.setTimeout(() => {
      const values = calculateAranaValuation(calcType, calcBrand, calcCondition);
      setResult(values);
      onToast(values.accepted ? "¡Prenda valuada con éxito!" : "Prenda rechazada por filtros.", values.accepted ? "success" : "warning");
      setLoading(false);
    }, 800);
  };

  const selectClass =
    "w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-xs font-bold text-slate-100 focus:border-purple-500 focus:outline-none";

  return (
    <section className="arana-fade-in mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="mb-1 block text-xs font-black uppercase tracking-[0.04em] text-pink-500">
          Simulador virtual
        </span>
        <h2 className="text-3xl font-black text-white">Calculá el valor de tu ropa</h2>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12">
        <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 md:col-span-7">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="h-5 w-5 text-purple-400" />
              <h3 className="text-xs font-black uppercase tracking-[0.04em] text-slate-300">Atributos</h3>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-400">Tipo de prenda</label>
              <select value={calcType} onChange={(e) => setCalcType(e.target.value)} className={selectClass}>
                <option value="abrigo">🧥 Abrigos (campera, saco, blazer)</option>
                <option value="pantalon">👖 Pantalones (jean, cargo, sastrero)</option>
                <option value="remera">👕 Remeras, camisas, tops</option>
                <option value="calzado">👟 Calzado urbano</option>
                <option value="accesorios">👜 Accesorios premium</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-400">Marca</label>
              <select value={calcBrand} onChange={(e) => setCalcBrand(e.target.value)} className={selectClass}>
                <option value="premium">✨ Premium / importada</option>
                <option value="shopping">🛍️ Nacional de shopping</option>
                <option value="comun">👗 Básica o sin marca</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-400">Estado</label>
              <select value={calcCondition} onChange={(e) => setCalcCondition(e.target.value)} className={selectClass}>
                <option value="new">💎 Nueva con etiqueta</option>
                <option value="excellent">🔥 Excelente</option>
                <option value="good">⚡ Muy cuidada</option>
                <option value="worn">⚠️ Desgastada</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCalculate}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-4 text-xs font-black uppercase tracking-[0.04em] text-white shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Evaluando...
              </>
            ) : (
              <>
                Obtener valuación <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 md:col-span-5">
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.04em] text-slate-500">Resultado</h3>
            {!result ? (
              <div className="py-16 text-center text-slate-500">
                <Calculator className="mx-auto mb-4 h-12 w-12 text-slate-700" />
                <p className="mx-auto max-w-xs text-xs">Completá los datos y evaluá tu prenda.</p>
              </div>
            ) : result.accepted ? (
              <div className="space-y-6">
                <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <div>
                    <strong className="block text-sm">Prenda apta</strong>
                    <p className="mt-1 text-[11px] text-slate-400">{result.detail}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-extrabold uppercase text-slate-400">Demanda</span>
                    <strong className="text-purple-400">{result.demandScore}%</strong>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-950">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${result.demandScore}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-3 border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <div>
                      <span className="block text-[10px] font-black uppercase text-slate-500">Efectivo</span>
                      <span className="text-xl font-black text-white">{formatAranaPrice(result.cash!)}</span>
                    </div>
                    <DollarSign className="h-5 w-5 text-slate-700" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-purple-800/60 bg-gradient-to-r from-purple-900/40 to-pink-900/20 p-4">
                    <div>
                      <span className="block text-[10px] font-black uppercase text-purple-400">Canje (+20%)</span>
                      <span className="text-xl font-black text-pink-400">{formatAranaPrice(result.credit!)}</span>
                    </div>
                    <Sparkles className="h-5 w-5 animate-pulse text-pink-400" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-2xl border border-rose-500/35 bg-rose-500/10 p-5 text-rose-400">
                <X className="h-6 w-6 shrink-0" />
                <div>
                  <strong className="block text-sm">No aceptada</strong>
                  <p className="mt-2 text-[11px] text-slate-400">{result.detail}</p>
                </div>
              </div>
            )}
          </div>
          {result ? (
            <div className="mt-6 space-y-3 border-t border-slate-800 pt-6">
              {result.accepted ? (
                <a
                  href={aranaCotizacionWhatsApp(calcType, calcBrand, calcCondition, result)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-xl border border-slate-800 bg-slate-950 py-3.5 text-xs font-black uppercase tracking-[0.04em] text-white hover:bg-slate-900"
                >
                  Ofrecer lote por WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCalcCondition("excellent");
                    setResult(null);
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-black"
                >
                  Probar con otra prenda
                </button>
              )}
              <p className="text-center text-[9px] leading-relaxed text-slate-500">
                *Cotización estimada. Tasación definitiva en mostrador de Arana 283.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
