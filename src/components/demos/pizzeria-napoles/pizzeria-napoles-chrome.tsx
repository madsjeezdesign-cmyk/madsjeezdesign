import Link from "next/link";

export function PizzeriaNapolesChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-lg border border-zinc-700 bg-zinc-900/95 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-zinc-300 hover:border-red-500/50 hover:text-red-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-lg border border-red-500/30 bg-zinc-900/90 px-2.5 py-1 text-[9px] font-bold uppercase text-red-400 md:inline">
        Forno · Demo
      </span>
    </div>
  );
}
