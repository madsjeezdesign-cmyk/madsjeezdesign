import Link from "next/link";

export function CentralBebidasChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-lg border border-zinc-700 bg-zinc-950/90 px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-zinc-300 backdrop-blur hover:border-lime-500/50 hover:text-lime-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-lg border border-lime-500/20 bg-zinc-900/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-lime-400 backdrop-blur md:inline">
        Demo · Bebidas
      </span>
    </div>
  );
}
