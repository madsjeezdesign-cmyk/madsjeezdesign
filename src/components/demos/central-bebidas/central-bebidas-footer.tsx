import { Clock, MapPin, RotateCcw, Truck } from "lucide-react";
import { CENTRAL_BEBIDAS_CONFIG } from "@/lib/central-bebidas";

export function CentralBebidasFooter() {
  const cfg = CENTRAL_BEBIDAS_CONFIG;

  return (
    <footer className="border-t border-zinc-800 bg-zinc-900 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-3 sm:grid-cols-2 sm:px-4 lg:grid-cols-4">
        <div>
          <p className="text-sm font-black uppercase text-white">{cfg.brand}</p>
          <p className="mt-2 text-xs text-zinc-500">{cfg.tagline}</p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase text-lime-400">
            <Truck className="h-3.5 w-3.5" />
            Zonas de entrega
          </p>
          <ul className="mt-3 space-y-2 text-xs text-zinc-400">
            {cfg.deliveryZones.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-400">
            <Clock className="h-3.5 w-3.5" />
            Horarios depósito
          </p>
          <p className="mt-3 text-xs text-zinc-400">{cfg.hours}</p>
          <p className="mt-2 flex items-start gap-2 text-xs text-zinc-500">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {cfg.address}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400">
            <RotateCcw className="h-3.5 w-3.5" />
            Envases vacíos
          </p>
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            Aceptamos retorno de botellas retornables y barriles según normativa local. Consultá
            bonificaciones por volumen en compras mayoristas recurrentes.
          </p>
        </div>
      </div>
      <p className="mt-8 text-center text-[10px] text-zinc-600">
        © {new Date().getFullYear()} {cfg.brand} — Demo interactiva
      </p>
    </footer>
  );
}
