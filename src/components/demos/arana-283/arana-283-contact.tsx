"use client";

import { ChevronDown, Clock, MapPin, Share2 } from "lucide-react";
import { useState } from "react";
import { ARANA_283_CONFIG, ARANA_FAQ } from "@/lib/arana-283";

export function Arana283Contact() {
  const cfg = ARANA_283_CONFIG;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="arana-fade-in mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div>
            <span className="mb-1 block text-xs font-black uppercase tracking-[0.04em] text-pink-500">
              Ubicación estratégica
            </span>
            <h2 className="text-3xl font-black text-white">Vení a conocernos en Ezeiza</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Zona tranquila y accesible en el partido de Ezeiza, Buenos Aires.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-purple-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.04em] text-white">Dirección</h4>
                <p className="mt-1 text-xs text-slate-400">{cfg.addressLines.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-purple-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.04em] text-white">Horarios</h4>
                <p className="mt-1 text-xs text-slate-400">{cfg.hoursGeneral}</p>
                <span className="mt-1.5 inline-block rounded-md border border-purple-500/25 bg-purple-600/10 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-purple-400">
                  {cfg.hoursReception}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-purple-400">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.04em] text-white">Instagram</h4>
                <a
                  href={cfg.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs font-bold text-pink-400 hover:underline"
                >
                  @{cfg.instagramHandle} <Share2 className="ml-1 inline h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
            <iframe
              src={cfg.mapsEmbedUrl}
              className="arana-map-filter absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARANA 283 en Google Maps"
            />
            <a
              href={cfg.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-center text-xs font-black uppercase tracking-[0.04em] text-white shadow-lg sm:left-auto sm:right-4 sm:px-8"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl border-t border-slate-900 pt-12">
        <h2 className="mb-10 text-center text-2xl font-black text-white">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {ARANA_FAQ.map((faq, idx) => (
            <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.04em] text-slate-200 hover:bg-slate-800/40"
              >
                {faq.q}
                <ChevronDown className={`h-4 w-4 text-purple-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx ? (
                <p className="arana-slide-down border-t border-slate-800/80 px-6 pb-5 pt-4 text-xs leading-relaxed text-slate-400">
                  {faq.a}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
