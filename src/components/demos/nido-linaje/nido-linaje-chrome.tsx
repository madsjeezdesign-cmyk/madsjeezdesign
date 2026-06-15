import Link from "next/link";

export function NidoLinajeChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-sm border border-stone-200/80 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.04em] text-stone-600 backdrop-blur-md transition hover:border-stone-400 hover:text-stone-900"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-sm border border-stone-200 bg-white/80 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.04em] text-stone-500 backdrop-blur md:inline">
        Couture · Demo
      </span>
    </div>
  );
}
