import { Clock, MapPin } from "lucide-react";
import { INTIMA_CO_CONFIG } from "@/lib/intima-co";

export function IntimaCoFooter() {
  const cfg = INTIMA_CO_CONFIG;

  return (
    <footer id="showroom" className="scroll-mt-24 border-t border-stone-200/60 bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">{cfg.brand}</h3>
            <p className="mt-2 text-sm font-light text-stone-500">Showroom · asesoramiento de talles</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-stone-200/60 bg-white/80 p-4">
                <p className="flex items-center gap-2 text-xs font-light uppercase tracking-wider text-stone-500">
                  <Clock className="h-4 w-4" strokeWidth={1.25} />
                  Atención
                </p>
                <p className="mt-2 text-sm text-stone-700">{cfg.hoursShowroom}</p>
                <p className="mt-1 text-xs font-light text-stone-500">{cfg.hoursAsesoria}</p>
              </div>
              <p className="flex items-start gap-2 text-sm font-light text-stone-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/80" strokeWidth={1.25} />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white shadow-sm">
            <iframe
              title="Mapa Íntima & Co."
              src={cfg.mapsEmbedUrl}
              className="h-[260px] w-full"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] font-light text-stone-400">
          © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
        </p>
      </div>
    </footer>
  );
}
