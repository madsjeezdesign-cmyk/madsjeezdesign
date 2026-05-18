"use client";

import { Phone, X } from "lucide-react";
import { CERRAJERIA_CENTRAL_CONFIG } from "@/lib/cerrajeria-central";

type Props = {
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
};

export function CerrajeriaCentralEmergency({ modalOpen, onOpenModal, onCloseModal }: Props) {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;

  return (
    <>
      <button
        type="button"
        onClick={onOpenModal}
        className="cc-pulse-urgency fixed bottom-4 left-1/2 z-[70] flex w-[min(100%,22rem)] -translate-x-1/2 items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-4 text-sm font-black uppercase tracking-wide text-zinc-950 shadow-lg shadow-amber-500/30 sm:bottom-6"
      >
        <span className="text-lg">🚨</span>
        Urgencias 24 hs: Solicitar cerrajería
      </button>

      <div className="cc-banner-blink fixed inset-x-0 top-0 z-[55] border-b-2 border-amber-500 bg-amber-500 py-2 text-center sm:hidden">
        <button
          type="button"
          onClick={onOpenModal}
          className="text-xs font-black uppercase text-zinc-950"
        >
          🚨 URGENCIAS 24 HS — Tocá aquí
        </button>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/80 p-4 sm:items-center">
          <div className="relative w-full max-w-md rounded-2xl border-2 border-amber-500 bg-zinc-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={onCloseModal}
              className="absolute right-3 top-3 text-zinc-500 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-6 w-6" />
            </button>
            <p className="text-xs font-black uppercase tracking-widest text-amber-400">Acción inmediata</p>
            <h3 className="mt-2 text-2xl font-black uppercase text-white">Urgencia 24 horas</h3>
            <p className="mt-3 text-sm text-zinc-400">
              Apertura de puertas · autos · persianas · cambio de cerradura en el momento.
            </p>
            <p className="mt-2 text-xs text-zinc-500">Cobertura: {cfg.coverage}</p>
            <a
              href={`tel:${cfg.phoneUrgency.replace(/\s/g, "")}`}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-amber-500 py-4 text-lg font-black text-zinc-950"
            >
              <Phone className="h-6 w-6" />
              Llamar ahora
            </a>
            <a
              href={`https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent("🚨 URGENCIA - Necesito cerrajero YA. Dirección: ")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-full rounded-lg border border-zinc-600 py-3 text-center text-sm font-bold uppercase text-white hover:border-amber-500"
            >
              WhatsApp urgente
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
