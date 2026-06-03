"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMotionTransition, useReducedMotion } from "@/lib/motion";
import { site } from "@/lib/data";

/**
 * Hero editorial: asymmetric split, Instrument Serif H1 with single italic accent.
 * No gradient text, no glass, no particles. One brand CTA + one ghost CTA.
 */
export function LandingHero() {
  const reduced = useReducedMotion();
  const tDisplay = useMotionTransition("display", "display");
  const tDisplayDelayed = useMotionTransition("display", "display", {
    delay: 0.12,
  });
  const tDisplayVisual = useMotionTransition("display", "display", {
    delay: 0.2,
  });

  const initial = reduced ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto grid max-w-7xl items-end gap-12 md:gap-16 lg:grid-cols-12">
        {/* Text column — ~60% on desktop */}
        <div className="lg:col-span-7">
          <motion.p
            initial={initial}
            animate={animate}
            transition={tDisplay}
            className="text-micro font-[family-name:var(--font-jetbrains)]"
          >
            Estudio · Buenos Aires · {site.experienceLabel}
          </motion.p>

          <motion.h1
            initial={initial}
            animate={animate}
            transition={tDisplayDelayed}
            className="mt-6 font-[family-name:var(--font-instrument)] text-balance text-body-strong"
            style={{
              fontSize: "var(--font-size-display-1)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            Hacemos sitios que{" "}
            <span
              className="italic"
              style={{ color: "var(--accent)" }}
            >
              venden
            </span>
            .
          </motion.h1>

          <motion.p
            initial={initial}
            animate={animate}
            transition={tDisplayDelayed}
            className="mt-7 max-w-[52ch] text-body"
            style={{
              fontSize: "1.125rem",
              lineHeight: "var(--leading-body)",
            }}
          >
            Diseño y código a medida para comercios, profesionales y marcas que
            quieren dejar de explicar lo que hacen y empezar a venderlo. Sin
            plantillas, sin humo.
          </motion.p>

          <motion.div
            initial={initial}
            animate={animate}
            transition={tDisplayDelayed}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors"
              style={{
                background: "var(--accent)",
                transitionDuration: "var(--duration-snap)",
                transitionTimingFunction: "var(--ease-snap)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
            >
              Pedir presupuesto
              <ArrowUpRight
                className="h-4 w-4 transition-transform"
                style={{
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }}
              />
            </a>

            <a
              href="#trabajos"
              className="surface-solid inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-body-strong transition-colors hover:bg-[var(--surface)]"
              style={{
                transitionDuration: "var(--duration-snap)",
                transitionTimingFunction: "var(--ease-snap)",
              }}
            >
              Ver trabajos
            </a>
          </motion.div>
        </div>

        {/* Visual column — ~40%, asymmetric stack */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tDisplayVisual}
          aria-hidden
          className="relative hidden h-[480px] lg:col-span-5 lg:block"
        >
          {/* Back card — taller, offset */}
          <div
            className="surface-solid absolute right-0 top-0 h-[400px] w-[78%] overflow-hidden"
            style={{
              borderRadius: "var(--radius-lg)",
              transform: "translateY(0) translateX(0)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 50%),
                  linear-gradient(135deg, color-mix(in srgb, var(--accent) 6%, var(--card)) 0%, var(--card) 65%)
                `,
              }}
            />
            {/* Editorial type composition */}
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex items-start justify-between">
                <span className="text-micro font-[family-name:var(--font-jetbrains)]">
                  Luna Petit & Co.
                </span>
                <span
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--accent)" }}
                >
                  ●
                </span>
              </div>
              <div>
                <p
                  className="font-[family-name:var(--font-instrument)] text-body-strong"
                  style={{
                    fontSize: "var(--font-size-h2)",
                    lineHeight: "var(--leading-heading)",
                    letterSpacing: "var(--tracking-heading)",
                  }}
                >
                  Moda infantil <span className="italic">premium</span>
                </p>
                <p className="mt-2 text-micro font-[family-name:var(--font-jetbrains)]">
                  E-commerce · Framer Motion · 2025
                </p>
              </div>
            </div>
          </div>

          {/* Front card — smaller, overlapping, offset down-left */}
          <div
            className="surface-elevated absolute bottom-0 left-0 h-[240px] w-[58%] overflow-hidden"
            style={{
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(160deg, #1a1f2e 0%, #0f1419 100%)
                `,
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
              <span
                className="text-micro font-[family-name:var(--font-jetbrains)]"
                style={{ color: "#cbd5e1" }}
              >
                Nido & Linaje
              </span>
              <div>
                <p
                  className="font-[family-name:var(--font-instrument)]"
                  style={{
                    fontSize: "1.5rem",
                    lineHeight: "var(--leading-heading)",
                    letterSpacing: "var(--tracking-heading)",
                  }}
                >
                  Blanquería <span className="italic">premium</span>
                </p>
                <div
                  className="mt-3 h-px w-12"
                  style={{ background: "rgba(255,255,255,0.4)" }}
                />
              </div>
            </div>
          </div>

          {/* Tiny meta dot — top-left of visual area */}
          <div
            className="absolute left-2 top-12 flex items-center gap-2 text-micro font-[family-name:var(--font-jetbrains)]"
            style={{ color: "var(--muted-body)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Trabajos
          </div>
        </motion.div>
      </div>
    </section>
  );
}
