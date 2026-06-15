import Link from "next/link";

export function CerrajeriaCentralChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded border border-zinc-700 bg-zinc-900/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-zinc-400 hover:border-amber-500/50 hover:text-amber-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded border border-amber-500/30 bg-zinc-900/90 px-2.5 py-1 text-[9px] font-bold uppercase text-amber-400 md:inline">
        Central · Demo
      </span>
    </div>
  );
}
