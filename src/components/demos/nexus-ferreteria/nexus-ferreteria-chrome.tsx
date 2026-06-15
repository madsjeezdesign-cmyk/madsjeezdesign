import Link from "next/link";

export function NexusFerreteriaChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-3 py-3 md:px-6">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-white/10 bg-zinc-950/80 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.04em] text-zinc-400 shadow-sm backdrop-blur-md hover:border-orange-500/40 hover:text-orange-400"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-orange-500/20 bg-zinc-950/80 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.04em] text-orange-400/80 backdrop-blur-md md:inline">
        NEXUS · Demo industrial
      </span>
    </div>
  );
}
