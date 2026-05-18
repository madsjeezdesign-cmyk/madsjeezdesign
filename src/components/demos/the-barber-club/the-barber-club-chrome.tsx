import Link from "next/link";

export function TheBarberClubChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-200 backdrop-blur-md hover:border-amber-500/50 hover:text-amber-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-xl border border-amber-500/20 bg-zinc-900/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-amber-400 backdrop-blur md:inline">
        Demo · Barber Club
      </span>
    </div>
  );
}
