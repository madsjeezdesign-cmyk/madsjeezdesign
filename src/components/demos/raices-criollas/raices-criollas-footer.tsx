import { Clock, MapPin } from "lucide-react";
import { RAICES_CRIOLLAS_CONFIG } from "@/lib/raices-criollas";

export function RaicesCriollasFooter() {
  const cfg = RAICES_CRIOLLAS_CONFIG;

  return (
    <footer id="showroom" className="scroll-mt-20 border-t border-stone-200 bg-stone-100 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl text-stone-900">{cfg.brand}</h3>
            <p className="mt-2 text-sm text-stone-600">Raíces locales · atención personalizada</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.04em] text-amber-800">
                  <Clock className="h-4 w-4" />
                  Showroom y almacén
                </p>
                <p className="mt-2 text-sm text-stone-700">{cfg.hoursShowroom}</p>
                <p className="mt-1 text-xs text-stone-500">{cfg.hoursAlmacen}</p>
              </div>
              <p className="flex items-start gap-2 text-sm text-stone-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-800" />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <iframe
              title="Mapa Raíces Criollas"
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
