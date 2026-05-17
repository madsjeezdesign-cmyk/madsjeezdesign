import Link from "next/link";

export function Arana283Chrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-xl border border-slate-700 bg-[#09090b]/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-200 backdrop-blur-md hover:border-purple-500/50 hover:text-purple-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-xl bg-slate-900/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-purple-400 backdrop-blur md:inline">
        Demo · ARANA 283
      </span>
    </div>
  );
}
