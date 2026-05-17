"use client";

import { X } from "lucide-react";

const ROWS = [
  { t: "44 (XL)", b: "92 - 96", c: "76 - 80", h: "102 - 106" },
  { t: "46 (XXL)", b: "97 - 101", c: "81 - 85", h: "107 - 111" },
  { t: "48 (3XL)", b: "102 - 106", c: "86 - 90", h: "112 - 116" },
  { t: "50 (4XL)", b: "107 - 111", c: "91 - 95", h: "117 - 121" },
  { t: "52 (5XL)", b: "112 - 116", c: "96 - 100", h: "122 - 126" },
  { t: "54 (6XL)", b: "117 - 122", c: "101 - 106", h: "127 - 132" },
  { t: "56 al 60", b: "123 - 134", c: "107 - 118", h: "133 - 144" },
];

type Props = { open: boolean; onClose: () => void };

export function ShowroomWeekendSizeGuide({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-black italic text-white">📐 Tabla de talles reales</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-6 text-xs text-slate-400">
          Medidas en centímetros para prendas con rebote elástico. Usá el probador virtual para un cálculo personalizado.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950">
                <th className="p-3 font-bold uppercase text-slate-300">Talle</th>
                <th className="p-3 font-bold uppercase text-slate-300">Busto</th>
                <th className="p-3 font-bold uppercase text-slate-300">Cintura</th>
                <th className="p-3 font-bold uppercase text-slate-300">Cadera</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-bold">
              {ROWS.map((row) => (
                <tr key={row.t} className="hover:bg-slate-800/40">
                  <td className="p-3 text-rose-400">{row.t}</td>
                  <td className="p-3 text-slate-300">{row.b} cm</td>
                  <td className="p-3 text-slate-300">{row.c} cm</td>
                  <td className="p-3 text-slate-300">{row.h} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="button" onClick={onClose} className="mt-6 w-full rounded-xl bg-slate-950 py-3.5 text-xs font-bold uppercase text-slate-300 hover:bg-slate-800">
          Listo, entendido
        </button>
      </div>
    </div>
  );
}
