"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AK_STORYTELLING } from "@/lib/aromas-kym";

const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1602874801006-e26a4b5c8c0a?q=80&w=1400&auto=format&fit=crop",
];

const STEP_KICKERS = [
  "Materia · 80°C",
  "Mezcla · 65°C",
  "Reposo · 14 días",
];

export function AromasKymStorytelling() {
  const ref = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.18 }
    );
    el.querySelectorAll(".ak-reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="storytelling"
      ref={ref}
      className="relative scroll-mt-28 bg-[#fbf8f1] py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section header */}
        <div className="ak-reveal mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
            III — Atelier
          </p>
          <h2
            className="mt-5 text-balance text-[#1c1814]"
            style={{
              fontFamily: "var(--ak-serif)",
              fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
            }}
          >
            Cómo se hace{" "}
            <em className="text-[#b85a3c]">una vela de soja</em>{" "}
            <span className="inline-block">.</span>
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-[#5a4e44] md:text-[17px]">
            Un proceso de tres tiempos. Lo aprendimos haciendo, perdiendo lotes, ajustando
            por décimas de grado. Hoy es lo que llega a tu casa.
          </p>
        </div>

        {/* Steps — alternating layout */}
        <div className="mt-24 space-y-28 md:space-y-36">
          {AK_STORYTELLING.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={s.step}
                className={`ak-reveal flex flex-col items-center gap-10 md:flex-row md:items-stretch md:gap-16 ${
                  reversed ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image — editorial frame */}
                <div className="relative w-full md:w-1/2">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f1ebdd]">
                    <Image
                      src={STEP_IMAGES[i]}
                      alt={s.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Roman numeral oversized */}
                  <span
                    className="pointer-events-none absolute -top-8 select-none text-[#1c1814]/15 md:-top-12"
                    style={{
                      fontFamily:
                        "var(--ak-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(7rem, 14vw, 12rem)",
                      lineHeight: 1,
                      left: reversed ? "auto" : "-0.18em",
                      right: reversed ? "-0.18em" : "auto",
                    }}
                  >
                    {s.step}
                  </span>
                </div>

                {/* Body */}
                <div className="flex w-full flex-col justify-center md:w-1/2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#b85a3c]">
                    {STEP_KICKERS[i]}
                  </p>
                  <h3
                    className="mt-4 text-balance text-[#1c1814]"
                    style={{
                      fontFamily:
                        "var(--ak-serif)",
                      fontSize: "clamp(1.85rem, 3.6vw, 2.8rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[#5a4e44]">
                    {s.text}
                  </p>

                  {/* Small ingredient list per step */}
                  <ul className="mt-8 space-y-2 border-t border-[#e8e1d4] pt-6 font-mono text-[11px] uppercase tracking-[0.04em] text-[#8d8074]">
                    {i === 0
                      ? ["Cera de soja en pellets", "Mecha de algodón trenzada", "Frasco vidrio 200 ml"]
                      : i === 1
                      ? ["Fragancia hasta 10% w/w", "Termómetro de precisión", "Tiempo: 2 minutos"]
                      : [
                          "Ambiente fresco · 14 días",
                          "Sin luz directa",
                          "Test de quemado final",
                        ]}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing pull quote */}
        <div className="ak-reveal mt-28 border-t border-[#e8e1d4] pt-16 text-center md:mt-36">
          <p
            className="mx-auto max-w-3xl text-balance text-[#1c1814]"
            style={{
              fontFamily: "var(--ak-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.25,
            }}
          >
            “La diferencia entre una vela hecha y una vela bien hecha está en los
            catorce días que nadie ve.”
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.04em] text-[#8d8074]">
            Karina &amp; Mariano · Fundadores
          </p>
        </div>
      </div>
    </section>
  );
}
