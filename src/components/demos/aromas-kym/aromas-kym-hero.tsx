"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AROMAS_KYM_CONFIG } from "@/lib/aromas-kym";

const HEADLINE_WORDS = ["Materia", "prima", "para", "tu", "ritual."];

export function AromasKymHero() {
  const cfg = AROMAS_KYM_CONFIG;
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const handle = () => {
      const y = window.scrollY;
      // Subtle parallax — 0.2x
      setOffset(y * 0.2);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="ak-hero-surface relative min-h-screen overflow-hidden pt-28 md:pt-32"
    >
      {/* Background still life — botanical / candle photography */}
      <div
        className="ak-parallax absolute inset-0 -top-12"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1602874801006-e26a4b5c8c0a?q=80&w=2400&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover opacity-[0.38]"
            sizes="100vw"
          />
        </div>
        {/* Soft cream wash so headline reads clean */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 50% 50%, rgba(248,244,236,0.45) 0%, rgba(248,244,236,0.92) 70%, rgba(248,244,236,1) 100%)",
          }}
        />
      </div>

      {/* Decorative hairline frame */}
      <div className="pointer-events-none absolute inset-x-6 top-32 hidden md:block md:inset-x-12 md:top-44">
        <div className="ak-hairline" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-12 text-center sm:px-8">
        {/* Eyebrow */}
        <div
          className="ak-fade-up mb-6 inline-flex items-center gap-3"
          style={{ animationDelay: "60ms" }}
        >
          <span className="h-px w-8 bg-[#1c1814]/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#5a4e44]">
            Hecho a mano · Buenos Aires
          </span>
          <span className="h-px w-8 bg-[#1c1814]/40" />
        </div>

        {/* Headline with word reveal — italic serif */}
        <h1
          className="text-balance text-[#1c1814]"
          style={{
            fontFamily: "var(--ak-serif)",
            fontSize: "clamp(3.25rem, 9.5vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => {
            const isAccent = word === "tu" || word === "ritual.";
            return (
              <span key={`${word}-${i}`} className="ak-word-reveal mr-[0.25em]">
                <span
                  style={{
                    animationDelay: `${160 + i * 140}ms`,
                    fontStyle: isAccent ? "italic" : "normal",
                    color: isAccent ? "var(--ak-accent-deep)" : undefined,
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h1>

        {/* Sub */}
        <p
          className="ak-fade-up mt-9 max-w-[50ch] text-balance text-base leading-relaxed text-[#5a4e44] md:text-lg"
          style={{ animationDelay: "1020ms" }}
        >
          {cfg.tagline} Velas de soja, sahumerios, difusores y esencias destiladas
          — formulados sin atajos, vertidos uno por uno.
        </p>

        {/* CTA + secondary */}
        <div
          className="ak-fade-up mt-12 flex flex-col items-center gap-5 sm:flex-row sm:gap-7"
          style={{ animationDelay: "1180ms" }}
        >
          <a
            href="#coleccion"
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#1c1814] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.04em] text-[#fbf8f1] transition hover:bg-[#b85a3c]"
          >
            Ver colección
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
          <a
            href="#storytelling"
            className="group inline-flex items-center gap-2 text-sm italic text-[#5a4e44] underline-offset-[6px] transition hover:text-[#1c1814] hover:underline"
            style={{ fontFamily: "var(--ak-serif)" }}
          >
            Cómo se hace una vela de soja
          </a>
        </div>

        {/* Values row — mono pills */}
        <div
          className="ak-fade-up mt-20 flex flex-wrap justify-center gap-x-8 gap-y-3 md:mt-28"
          style={{ animationDelay: "1380ms" }}
        >
          {cfg.values.map((v, i) => (
            <div key={v} className="flex items-center gap-3">
              {i > 0 ? (
                <span className="hidden h-1 w-1 rounded-full bg-[#8d8074] md:inline" />
              ) : null}
              <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[#5a4e44]">
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 opacity-60">
          <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-[#5a4e44]">
            Scroll
          </span>
          <span className="h-8 w-px bg-[#5a4e44]/50" />
        </div>
      </div>
    </section>
  );
}
