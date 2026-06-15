import Link from "next/link";

export function RaicesCriollasChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-stone-200 bg-stone-50/95 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.04em] text-stone-600 shadow-sm hover:border-amber-300"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-amber-200/80 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase text-amber-800 md:inline">
        Raíces · Demo
      </span>
    </div>
  );
}
