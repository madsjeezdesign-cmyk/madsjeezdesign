"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { MASA_MADRE_CONFIG } from "@/lib/masa-madre-co";

export function MasaMadreCoContact() {
  const cfg = MASA_MADRE_CONFIG;

  return (
    <section id="contacto" className="scroll-mt-20 bg-stone-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.04em] text-orange-700">Visitanos</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900">Contacto</h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <Clock className="h-6 w-6 shrink-0 text-orange-700" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Horarios semana</p>
                  <p className="mt-1 text-sm text-stone-600">{cfg.hoursWeek}</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border-2 border-orange-300 bg-orange-50 p-5 shadow-sm">
                <Clock className="h-6 w-6 shrink-0 text-orange-700" />
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-orange-800">Fines de semana</p>
                  <p className="mt-1 text-sm font-bold text-stone-800">{cfg.hoursWeekend}</p>
                  <p className="mt-2 text-xs text-orange-900/80">
                    ¡Los sábados y domingos abrimos más tarde con pan caliente todo el día!
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <MapPin className="h-6 w-6 shrink-0 text-orange-700" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Dirección</p>
                  {cfg.addressLines.map((line) => (
                    <p key={line} className="text-sm text-stone-600">
                      {line}
                    </p>
                  ))}
                  <a
                    href={cfg.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-bold text-orange-700 hover:underline"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <Phone className="h-6 w-6 shrink-0 text-orange-700" />
                <div>
                  <p className="text-sm font-bold text-stone-900">Pedidos</p>
                  <p className="text-sm text-stone-600">{cfg.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg">
            <iframe
              title="Mapa Masa Madre & Co."
              src={cfg.mapsEmbedUrl}
              className="h-[320px] w-full grayscale-[20%] sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
