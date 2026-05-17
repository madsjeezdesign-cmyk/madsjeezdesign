import Link from "next/link";

export function AndreaMariChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-white/30 bg-white/95 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--am-dark)] shadow-md backdrop-blur-md transition-colors hover:bg-[var(--am-primary)] hover:text-white"
      >
        ← Showroom
      </Link>
      <span className="pointer-events-none hidden rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--am-primary)] backdrop-blur md:inline">
        Demo · Andrea Mari
      </span>
    </div>
  );
}
