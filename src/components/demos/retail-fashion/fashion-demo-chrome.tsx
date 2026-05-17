import Link from "next/link";

type Props = {
  brand: string;
};

/** Barra mínima para volver al showroom sin romper la estética inmersiva. */
export function FashionDemoChrome({ brand }: Props) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between px-4 py-4 md:px-8">
      <Link
        href="/demos"
        className="pointer-events-auto border border-black/10 bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-black backdrop-blur-md transition-colors hover:bg-black hover:text-white"
      >
        ← Showroom
      </Link>
      <span className="pointer-events-none hidden text-[9px] font-bold uppercase tracking-[0.25em] text-black/40 md:inline">
        Demo · {brand}
      </span>
    </div>
  );
}
