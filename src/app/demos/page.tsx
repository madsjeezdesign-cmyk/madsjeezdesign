import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DEMOS } from "@/lib/demos-registry";

export default function DemosIndexPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <div className="mb-14 max-w-2xl">
        <p className="font-[family-name:var(--font-demo-montserrat)] text-[10px] font-bold uppercase tracking-[0.35em] text-[#1de0b1]">
          Showroom · no publicado en home
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase tracking-wide text-white md:text-7xl">
          10 landings demo
        </h1>
        <p className="mt-4 font-[family-name:var(--font-demo-montserrat)] text-sm leading-relaxed text-zinc-400 md:text-base">
          Modelos listos para adaptar a tu marca: cada uno con layout, copy de
          ejemplo y estética propia. Compartí el enlace directo del rubro que
          quieras mostrar.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {DEMOS.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/demos/${d.slug}`}
              className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-xl transition-all duration-500 hover:border-[#1de0b1]/40 hover:shadow-[#1de0b1]/10 md:p-8 ${d.previewClass}`}
            >
              <span
                className="inline-block rounded-full px-3 py-1 font-[family-name:var(--font-demo-montserrat)] text-[10px] font-bold uppercase tracking-wider text-black"
                style={{ backgroundColor: d.accent }}
              >
                {d.industry}
              </span>
              <h2 className="mt-4 font-[family-name:var(--font-demo-playfair)] text-2xl font-semibold text-white md:text-3xl">
                {d.title}
              </h2>
              <p className="mt-2 font-[family-name:var(--font-demo-montserrat)] text-sm text-zinc-300">
                {d.tagline}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-demo-montserrat)] text-xs font-bold uppercase tracking-wider text-[#1de0b1]">
                Ver demo completa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
