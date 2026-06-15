import Link from "next/link";

export function DecoBazarCoChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-zinc-200 bg-white/95 px-3 py-2 text-[9px] font-medium uppercase tracking-widest text-[color:var(--muted-body)] shadow-sm hover:border-zinc-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-zinc-200 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase text-[color:var(--muted-body)] md:inline">
        DecoBazar · Demo
      </span>
    </div>
  );
}
