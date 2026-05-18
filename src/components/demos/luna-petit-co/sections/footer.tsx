import { Clock, MapPin } from "lucide-react";
import { LUNA_PETIT_CO_CONFIG } from "@/lib/luna-petit-co";

export function LunaFooter() {
  const cfg = LUNA_PETIT_CO_CONFIG;

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-black py-16 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-serif text-2xl text-[#F8F6F2]">{cfg.brand}</p>
            <p className="mt-4 flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              {cfg.addressLines.join(" · ")}
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-neutral-500" />
              {cfg.hours}
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe title="Mapa" src={cfg.mapsEmbedUrl} className="h-[220px] w-full opacity-80" loading="lazy" />
          </div>
        </div>
        <p className="mt-12 text-center text-[10px] uppercase tracking-widest text-neutral-600">
          © {new Date().getFullYear()} {cfg.brand} — Demo
        </p>
      </div>
    </footer>
  );
}
