import Link from "next/link";

export function AromasKymChrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto rounded-full border border-[#e8e1d4]/80 bg-[#fbf8f1]/90 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#5a4e44] backdrop-blur-md transition hover:border-[#b85a3c]/60 hover:text-[#1c1814]"
      >
        ← Demos
      </Link>
      <span className="pointer-events-none hidden rounded-full border border-[#e8e1d4]/80 bg-[#fbf8f1]/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8d8074] backdrop-blur md:inline">
        Apothecary · Demo
      </span>
    </div>
  );
}
