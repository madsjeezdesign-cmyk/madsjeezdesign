import Link from "next/link";

export function IntimaCoChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-stone-200/80 bg-white/90 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-stone-500 shadow-sm backdrop-blur hover:border-rose-200"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-rose-100 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-rose-400/90 md:inline">
        Íntima · Demo
      </span>
    </div>
  );
}
