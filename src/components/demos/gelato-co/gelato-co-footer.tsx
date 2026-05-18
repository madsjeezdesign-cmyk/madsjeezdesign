import { Clock, MapPin, Snowflake } from "lucide-react";
import { GELATO_CO_CONFIG } from "@/lib/gelato-co";

export function GelatoCoFooter() {
  const cfg = GELATO_CO_CONFIG;

  return (
    <footer id="contacto" className="scroll-mt-16 border-t border-stone-200 bg-stone-100 py-10">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-xl text-stone-900">{cfg.brand}</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase text-sky-800">
                  <Snowflake className="h-4 w-4" />
                  Delivery tarde / noche y fines
                </p>
                <p className="mt-2 text-sm text-stone-700">{cfg.hoursPeak}</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase text-stone-500">
                  <Clock className="h-4 w-4" />
                  Resto de la semana
                </p>
                <p className="mt-2 text-sm text-stone-600">{cfg.hoursWeek}</p>
              </div>
              <p className="flex items-start gap-2 text-sm text-stone-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <iframe
              title="Mapa Gelato & Co."
              src={cfg.mapsEmbedUrl}
              className="h-[260px] w-full"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-stone-400">
          © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
        </p>
      </div>
    </footer>
  );
}
