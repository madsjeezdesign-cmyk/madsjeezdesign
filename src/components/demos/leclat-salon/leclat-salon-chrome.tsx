import Link from "next/link";

export function LeclatSalonChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-rose-200/80 bg-white/90 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.04em] text-stone-600 backdrop-blur hover:border-rose-300 hover:text-rose-600"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-rose-100 bg-rose-50/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.04em] text-rose-500 backdrop-blur md:inline">
        Beauty · Demo
      </span>
    </div>
  );
}
