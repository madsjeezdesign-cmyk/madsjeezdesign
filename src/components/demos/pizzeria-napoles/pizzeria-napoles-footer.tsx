import { Clock, MapPin } from "lucide-react";
import { PIZZERIA_NAPOLES_CONFIG } from "@/lib/pizzeria-napoles";

export function PizzeriaNapolesFooter() {
  const cfg = PIZZERIA_NAPOLES_CONFIG;

  return (
    <footer id="contacto" className="scroll-mt-14 border-t border-zinc-800 bg-zinc-950 py-10">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-xl text-stone-100">{cfg.brand}</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase text-red-400">
                  <Clock className="h-4 w-4" />
                  Turno noche
                </p>
                <p className="mt-2 text-sm text-stone-200">{cfg.hoursNight}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] font-bold uppercase text-stone-500">Lunes</p>
                <p className="mt-1 text-sm text-stone-400">{cfg.hoursWeek}</p>
              </div>
              <p className="flex items-start gap-2 text-sm text-stone-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <iframe
              title="Mapa Pizzería Nápoles"
              src={cfg.mapsEmbedUrl}
              className="h-[260px] w-full"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-stone-600">
          © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
        </p>
      </div>
    </footer>
  );
}
