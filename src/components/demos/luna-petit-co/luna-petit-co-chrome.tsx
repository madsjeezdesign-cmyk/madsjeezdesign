import Link from "next/link";

export function LunaPetitCoChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-neutral-200/60 bg-white/80 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.04em] text-neutral-500 shadow-sm backdrop-blur-md hover:border-neutral-300"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-white/20 bg-white/70 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.04em] text-neutral-600 backdrop-blur-md md:inline">
        Luna Petit · Demo
      </span>
    </div>
  );
}
