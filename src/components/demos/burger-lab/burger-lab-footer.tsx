import { Clock, MapPin } from "lucide-react";
import { BURGER_LAB_CONFIG } from "@/lib/burger-lab";

export function BurgerLabFooter() {
  const cfg = BURGER_LAB_CONFIG;

  return (
    <footer id="contacto" className="scroll-mt-14 border-t border-zinc-800 bg-zinc-900 py-10">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-black uppercase text-white">{cfg.brand}</h3>
            <p className="mt-2 text-sm text-zinc-500">{cfg.tagline}</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border-2 border-amber-500/40 bg-amber-500/5 p-4">
                <p className="flex items-center gap-2 text-xs font-black uppercase text-amber-400">
                  <Clock className="h-4 w-4" />
                  Horario nocturno
                </p>
                <p className="mt-2 text-sm font-bold text-white">{cfg.hoursNight}</p>
              </div>
              <div className="rounded-xl border border-zinc-800 p-4">
                <p className="text-[10px] font-black uppercase text-zinc-500">Resto de la semana</p>
                <p className="mt-1 text-sm text-zinc-400">{cfg.hoursWeek}</p>
              </div>
              <p className="flex items-start gap-2 text-sm text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <iframe
              title="Mapa Burger Lab"
              src={cfg.mapsEmbedUrl}
              className="h-[240px] w-full sm:h-[280px]"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-zinc-600">
          © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
        </p>
      </div>
    </footer>
  );
}
