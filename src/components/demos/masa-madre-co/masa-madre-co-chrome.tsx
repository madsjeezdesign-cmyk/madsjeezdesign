import Link from "next/link";

export function MasaMadreCoChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-xl border border-stone-300 bg-stone-50/95 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-stone-700 backdrop-blur-md hover:border-orange-300 hover:text-orange-800"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-xl border border-orange-200 bg-orange-50/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.04em] text-orange-800 backdrop-blur md:inline">
        Demo · Masa Madre
      </span>
    </div>
  );
}
