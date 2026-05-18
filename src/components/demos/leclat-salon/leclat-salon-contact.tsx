import { Clock, MapPin } from "lucide-react";
import { LECLAT_CONFIG } from "@/lib/leclat-salon";

export function LeclatSalonContact() {
  const cfg = LECLAT_CONFIG;

  return (
    <section id="contacto" className="scroll-mt-20 border-t border-rose-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">Visitanos</p>
            <h2 className="mt-2 font-serif text-3xl font-light text-stone-900">Ubicación & horarios</h2>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600">
                  <Clock className="h-4 w-4" />
                  Jueves a sábados — días estrella
                </p>
                <p className="mt-2 text-sm font-medium text-stone-800">{cfg.hoursPeak}</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-stone-50 p-5">
                <p className="text-xs font-medium uppercase text-stone-400">Resto de la semana</p>
                <p className="mt-1 text-sm text-stone-600">{cfg.hoursWeek}</p>
              </div>
              <div className="flex gap-3 text-sm text-stone-600">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                <div>
                  {cfg.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <a
                    href={cfg.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-rose-600 hover:underline"
                  >
                    Cómo llegar →
                  </a>
                </div>
              </div>
              <p className="text-sm text-stone-500">{cfg.phone}</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-100 shadow-sm">
            <iframe
              title="Mapa L'Éclat"
              src={cfg.mapsEmbedUrl}
              className="h-[280px] w-full sm:h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
