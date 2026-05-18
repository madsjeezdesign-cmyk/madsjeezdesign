import { Clock, MapPin, Shield } from "lucide-react";
import { CERRAJERIA_CENTRAL_CONFIG } from "@/lib/cerrajeria-central";

export function CerrajeriaCentralFooter() {
  const cfg = CERRAJERIA_CENTRAL_CONFIG;

  return (
    <footer id="contacto" className="scroll-mt-20 border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-black uppercase text-white">{cfg.brand}</h3>
            <p className="mt-3 flex items-start gap-2 text-sm text-zinc-400">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                <strong className="text-zinc-300">Cobertura urgencias y domicilio:</strong>
                <br />
                {cfg.coverage}
              </span>
            </p>
            <div className="mt-6 space-y-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400">
                <Clock className="h-4 w-4" />
                Horarios
              </p>
              <p className="text-sm text-zinc-300">{cfg.hoursShop}</p>
              <p className="text-xs font-bold text-amber-500">{cfg.hoursUrgency}</p>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-zinc-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              {cfg.addressLines.join(" · ")}
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <iframe title="Mapa Cerrajería Central" src={cfg.mapsEmbedUrl} className="h-[260px] w-full" loading="lazy" />
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-zinc-600">© {new Date().getFullYear()} {cfg.brand} — Demo</p>
      </div>
    </footer>
  );
}
