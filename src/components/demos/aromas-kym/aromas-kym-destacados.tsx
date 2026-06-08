"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { AK_FEATURED_IDS, AK_PRODUCTS, formatAKPrice, type AKProduct } from "@/lib/aromas-kym";

type Props = {
  onAdd: (product: AKProduct) => void;
};

export function AromasKymDestacados({ onAdd }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const featured = AK_FEATURED_IDS.map((id) => AK_PRODUCTS.find((p) => p.id === id)).filter(
    Boolean
  ) as AKProduct[];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.querySelectorAll(".ak-reveal").forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".ak-reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // bento layout slots
  const slots = [
    "lg:col-span-7 lg:row-span-2 aspect-[5/6] lg:aspect-auto", // big
    "lg:col-span-5 lg:row-span-1 aspect-[4/3]", // medium
    "lg:col-span-5 lg:row-span-1 aspect-[4/3]", // medium
    "lg:col-span-4 lg:row-span-1 aspect-square", // small
    "lg:col-span-4 lg:row-span-1 aspect-square", // small
    "lg:col-span-4 lg:row-span-1 aspect-square", // small
  ];

  return (
    <section
      id="destacados"
      ref={ref}
      className="relative scroll-mt-28 border-y border-[#e8e1d4]/70 bg-[#f1ebdd]/70 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-14 flex items-end justify-between md:mb-18">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#8d8074]">
              II — Lo más pedido
            </p>
            <h2
              className="mt-4 text-balance text-[#1c1814]"
              style={{
                fontFamily: "var(--ak-serif)",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.018em",
              }}
            >
              Los que vuelven a casa.
            </h2>
          </div>
          <a
            href="#coleccion"
            className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-[#5a4e44] underline-offset-[6px] transition hover:text-[#b85a3c] hover:underline md:inline"
          >
            Ver toda la colección →
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {featured.map((p, i) => {
            const isHero = i === 0;
            return (
              <article
                key={p.id}
                className={`ak-reveal ak-card group relative overflow-hidden rounded-sm border border-[#e8e1d4] bg-[#fbf8f1] transition duration-500 hover:border-[#b85a3c]/50 hover:shadow-[0_24px_60px_-30px_rgba(28,24,20,0.25)] ${slots[i]}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="ak-card-img object-cover"
                    sizes={isHero ? "(max-width:1024px) 100vw, 60vw" : "(max-width:1024px) 50vw, 30vw"}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(28,24,20,0) 30%, rgba(28,24,20,0.62) 100%)",
                    }}
                  />
                </div>

                {/* Badge */}
                {p.badge ? (
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-[#fbf8f1]/40 bg-[#fbf8f1]/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-[#fbf8f1] backdrop-blur-md">
                    {p.badge}
                  </span>
                ) : null}

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-5 md:p-7">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#fbf8f1]/70">
                      {p.notesShort}
                    </p>
                    <h3
                      className={`mt-2 text-[#fbf8f1] ${
                        isHero ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"
                      }`}
                      style={{
                        fontFamily:
                          "var(--ak-serif)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.012em",
                      }}
                    >
                      {p.name}
                    </h3>
                    {isHero ? (
                      <p className="mt-3 max-w-md text-balance text-sm leading-relaxed text-[#fbf8f1]/85">
                        {p.note}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="font-mono text-sm tracking-tight text-[#fbf8f1]">
                        {formatAKPrice(p.price)}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onAdd(p);
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-[#fbf8f1] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#1c1814] transition hover:bg-[#b85a3c] hover:text-[#fbf8f1]"
                      >
                        <Plus className="h-3 w-3" strokeWidth={2} />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center md:hidden">
          <a
            href="#coleccion"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-[#5a4e44] underline-offset-[6px] hover:text-[#b85a3c] hover:underline"
          >
            Ver toda la colección →
          </a>
        </div>
      </div>
    </section>
  );
}
