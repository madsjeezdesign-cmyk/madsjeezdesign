import { Clock, MapPin } from "lucide-react";
import { DECO_BAZAR_CO_CONFIG } from "@/lib/deco-bazar-co";

export function DecoBazarCoFooter() {
  const cfg = DECO_BAZAR_CO_CONFIG;

  return (
    <footer id="showroom" className="scroll-mt-16 border-t border-zinc-100 bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-light text-zinc-900">{cfg.brand}</h3>
            <p className="mt-2 text-sm font-light text-[color:var(--muted-body)]">Showroom y punto de retiro</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.04em] text-[color:var(--muted-body)]">
                  <Clock className="h-4 w-4" />
                  Atención al público
                </p>
                <p className="mt-2 text-sm font-light text-zinc-700">{cfg.hoursShowroom}</p>
                <p className="mt-1 text-xs text-[color:var(--muted-body)]">{cfg.hoursDelivery}</p>
              </div>
              <p className="flex items-start gap-2 text-sm font-light text-[color:var(--muted-body)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                {cfg.addressLines.join(" · ")}
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-zinc-100 shadow-sm">
            <iframe
              title="Mapa DecoBazar & Co."
              src={cfg.mapsEmbedUrl}
              className="h-[260px] w-full grayscale-[20%]"
              loading="lazy"
            />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-zinc-400">
          © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
        </p>
      </div>
    </footer>
  );
}
