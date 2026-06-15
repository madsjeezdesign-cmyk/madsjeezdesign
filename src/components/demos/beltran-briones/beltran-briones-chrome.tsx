import Link from "next/link";
import { PARENT_DEMO_SLUG } from "@/lib/beltran-briones";

export function BeltranBrionesChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <div className="pointer-events-auto flex flex-wrap items-center gap-2">
        <Link
          href="/demos"
          className="rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-zinc-300 backdrop-blur-md hover:border-amber-500/40 hover:text-amber-400"
        >
          ← Demos
        </Link>
        <Link
          href={`/demos/${PARENT_DEMO_SLUG}`}
          className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-amber-400 backdrop-blur-md hover:bg-amber-500/20"
        >
          Inmobiliaria base
        </Link>
      </div>
      <span className="pointer-events-none hidden rounded-lg border border-amber-500/30 bg-black/80 px-2.5 py-1 text-[9px] font-bold uppercase text-amber-400 backdrop-blur-md md:inline">
        Beltrán Briones
      </span>
    </div>
  );
}
