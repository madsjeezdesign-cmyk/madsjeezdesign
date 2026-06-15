import Link from "next/link";

export function BurgerLabChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-lg border border-zinc-700 bg-zinc-950/95 px-3 py-2 text-[9px] font-black uppercase tracking-[0.04em] text-zinc-300 hover:border-amber-500/50 hover:text-amber-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-lg border border-amber-500/30 bg-zinc-900/90 px-2.5 py-1 text-[9px] font-black uppercase text-amber-400 md:inline">
        Smash · Demo
      </span>
    </div>
  );
}
