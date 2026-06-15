import Link from "next/link";

export function ShowroomWeekendChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-xl border border-slate-700 bg-slate-950/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.04em] text-slate-200 backdrop-blur-md hover:border-rose-500/50 hover:text-rose-400"
      >
        ← Showroom
      </Link>
      <span className="pointer-events-none hidden rounded-xl bg-slate-900/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.04em] text-rose-400 backdrop-blur md:inline">
        Demo · Weekend
      </span>
    </div>
  );
}
