"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { AK_CATEGORIES } from "@/lib/aromas-kym";

type Props = {
  onSelectCategory?: (id: string) => void;
};

export function AromasKymCategorias({ onSelectCategory }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
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

  const handle = (id: string) => {
    onSelectCategory?.(id);
    document.querySelector("#coleccion")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="categorias"
      ref={wrapRef}
      className="relative scroll-mt-28 bg-[#fbf8f1] py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-[#8d8074]">
              I — Categorías
            </p>
            <h2
              className="mt-4 text-balance text-[#1c1814]"
              style={{
                fontFamily: "var(--ak-serif)",
                fontSize: "clamp(2.25rem, 5vw, 4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.018em",
                fontWeight: 400,
              }}
            >
              Cinco rituales,{" "}
              <em className="text-[#b85a3c]">una mesa de trabajo.</em>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[#5a4e44]">
            Cada categoría nace en la misma mesa: el laboratorio de Spegazzini, donde
            elegimos la cera, pesamos la fragancia y vertimos pieza por pieza.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div className="grid gap-5 lg:grid-cols-6 lg:grid-rows-2 lg:gap-6">
          {AK_CATEGORIES.map((cat, i) => {
            // first card big (Velas), then smaller varied
            const layout =
              i === 0
                ? "lg:col-span-3 lg:row-span-2 aspect-[5/6] lg:aspect-auto"
                : i === 1
                ? "lg:col-span-3 lg:row-span-1 aspect-[4/3]"
                : i === 2
                ? "lg:col-span-1 lg:row-span-1 aspect-square"
                : i === 3
                ? "lg:col-span-1 lg:row-span-1 aspect-square"
                : "lg:col-span-1 lg:row-span-1 aspect-square";
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handle(cat.id)}
                className={`ak-reveal group relative overflow-hidden rounded-sm border border-[#e8e1d4] bg-[#f1ebdd] text-left transition-all duration-500 hover:border-[#b85a3c]/50 ${layout}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="ak-card-img object-cover transition duration-[1100ms] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(180deg, rgba(28,24,20,0.05) 0%, rgba(28,24,20,0.55) 100%)"
                          : "linear-gradient(180deg, rgba(28,24,20,0.0) 0%, rgba(28,24,20,0.62) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#fbf8f1]/85">
                      0{i + 1} · {cat.count} productos
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#fbf8f1]/40 bg-[#fbf8f1]/10 text-[#fbf8f1] backdrop-blur-sm transition-all duration-500 group-hover:bg-[#b85a3c] group-hover:border-[#b85a3c]">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-[#fbf8f1] ${
                        i === 0 ? "text-5xl md:text-6xl" : "text-2xl md:text-3xl"
                      }`}
                      style={{
                        fontFamily:
                          "var(--ak-serif)",
                        lineHeight: 1.02,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {cat.label}
                    </h3>
                    {(i === 0 || i === 1) && (
                      <p
                        className={`mt-3 max-w-md text-balance text-[#fbf8f1]/85 ${
                          i === 0 ? "text-base" : "text-sm"
                        }`}
                      >
                        {cat.blurb}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
