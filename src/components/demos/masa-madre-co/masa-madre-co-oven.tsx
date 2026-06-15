"use client";

import { Clock, Flame } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { INITIAL_OVEN_BOARD, type OvenItem } from "@/lib/masa-madre-co";

function statusLabel(item: OvenItem): { text: string; className: string } {
  if (item.status === "now") {
    return { text: "¡Saliendo ahora!", className: "bg-red-100 text-red-800 mmc-oven-pulse" };
  }
  if (item.status === "soon") {
    return {
      text: `Disponible en ${item.minutes ?? 0} min`,
      className: "bg-amber-100 text-amber-900",
    };
  }
  return { text: "Listo para retirar", className: "bg-green-100 text-green-800" };
}

export function MasaMadreCoOven() {
  const [board, setBoard] = useState<OvenItem[]>(INITIAL_OVEN_BOARD);
  const [tick, setTick] = useState(0);

  const tickBoard = useCallback(() => {
    setBoard((prev) =>
      prev.map((item) => {
        if (item.status === "soon" && item.minutes != null && item.minutes > 0) {
          const next = item.minutes - 1;
          if (next <= 0) return { ...item, status: "now" as const, minutes: undefined };
          return { ...item, minutes: next };
        }
        return item;
      }),
    );
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      tickBoard();
    }, 8000);
    return () => window.clearInterval(id);
  }, [tickBoard]);

  return (
    <section id="horno" className="scroll-mt-20 border-y border-stone-200 bg-stone-900 py-16 text-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.04em] text-orange-400">
              <Flame className="h-4 w-4" />
              En vivo
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white">Horneados del día</h2>
            <p className="mt-2 max-w-md text-sm text-stone-400">
              Tablero del horno — actualización simulada cada pocos segundos.
            </p>
          </div>
          <span className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 font-mono text-[10px] text-orange-300">
            SYNC #{tick.toString().padStart(4, "0")}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {board.map((item) => {
            const label = statusLabel(item);
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-stone-700 bg-stone-800/80 p-5 transition hover:border-orange-500/40"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-stone-900 text-2xl">
                  {item.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white">{item.product}</p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${label.className}`}
                  >
                    {item.status === "soon" ? <Clock className="h-3 w-3" /> : <Flame className="h-3 w-3" />}
                    {label.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mmc-marquee mt-10 overflow-hidden whitespace-nowrap border-t border-stone-800 pt-6">
          <div className="inline-flex gap-12 text-xs font-bold uppercase tracking-[0.04em] text-stone-500">
            <span>Masa madre 48h · Croissants laminados · Facturas de crema · Pan de campo · Brownies 70% cacao ·</span>
            <span>Masa madre 48h · Croissants laminados · Facturas de crema · Pan de campo · Brownies 70% cacao ·</span>
          </div>
        </div>
      </div>
    </section>
  );
}
