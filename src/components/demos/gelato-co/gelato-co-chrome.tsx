import Link from "next/link";

export function GelatoCoChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-stone-200 bg-white/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-stone-600 shadow-sm hover:border-rose-200"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-emerald-200 bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase text-emerald-700 md:inline">
        Gelato · Demo
      </span>
    </div>
  );
}
