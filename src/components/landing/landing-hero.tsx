"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMotionTransition } from "@/lib/motion";
import { site } from "@/lib/data";
import { HeroMesh } from "./_internals/hero-mesh";
import { HeroNoise } from "./_internals/hero-noise";
import { HeroMockup } from "./_internals/hero-mockup";
import { HeroProofBadges } from "./_internals/hero-proof-badges";

/**
 * Hero TRIPLE-A:
 *   layer 0 — ambient gradient mesh (Linear/Stripe style atmosphere)
 *   layer 1 — film-grain noise (Cursor.com / Linear)
 *   layer 2 — editorial typography w/ Instrument Serif H1, italic accent
 *   layer 3 — real product mockup (Luna Petit & Co browser frame)
 *   layer 4 — floating proof badges with REAL stats from cases[]
 *   layer 5 — entry choreography (stagger word reveal) + scroll parallax
 *
 * Banlist respected: no gradient text, no glass default, no 0.3em tracking,
 * no blue→purple combo. Mesh is purposeful editorial atmosphere.
 *
 * prefers-reduced-motion: ALL animation collapses to static composition.
 */

const H1_LINE_1 = ["Hacemos", "sitios", "que"];
const H1_LINE_2_PRE = "venden";

export function LandingHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax on the visual stack
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  const tSubhead = useMotionTransition("display", "display", { delay: 0.55 });
  const tCTA = useMotionTransition("display", "display", { delay: 0.7 });
  const tLive = useMotionTransition("ui", "display", { delay: 0.95 });
  const tEyebrow = useMotionTransition("ui", "display", { delay: 0.05 });
  const tVisual = useMotionTransition("display", "display", { delay: 0.25 });

  const wordTransition = (i: number) => ({
    duration: 0.65,
    ease: [0.19, 1, 0.22, 1] as const,
    delay: reduced ? 0 : 0.15 + i * 0.07,
  });

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate overflow-hidden px-6 pt-28 pb-20 md:px-10 md:pt-36 md:pb-28 lg:min-h-[92vh]"
      style={{ background: "var(--background)" }}
    >
      {/* Ambient layers — z 0 to 2 */}
      <motion.div
        style={{ opacity: reduced ? 1 : meshOpacity }}
        className="absolute inset-0 z-0"
      >
        <HeroMesh />
      </motion.div>
      <HeroNoise />

      {/* Content grid — z 10 */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-12 lg:pt-6">
        {/* Text column — 6 cols */}
        <div className="lg:col-span-6">
          {/* Eyebrow chip row */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tEyebrow}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <Chip>Diseño + código</Chip>
            <Divider />
            <Chip>Buenos Aires · {site.experienceLabel}</Chip>
            <Divider />
            <Chip pulse>Disponible para nuevos proyectos</Chip>
          </motion.div>

          {/* H1 — word stagger */}
          <h1
            className="mt-7 text-balance text-body-strong"
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontWeight: 400,
              fontSize: "clamp(2.8rem, 8.4vw, 6.4rem)",
              lineHeight: 1.02,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            <span className="block">
              {H1_LINE_1.map((word, i) => (
                <motion.span
                  key={word}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={wordTransition(i)}
                  className="inline-block"
                  style={{ marginRight: "0.28em" }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block">
              <motion.span
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={wordTransition(3)}
                className="inline-block italic"
                style={{
                  color: "var(--accent)",
                  marginRight: "0.05em",
                }}
              >
                {H1_LINE_2_PRE}
              </motion.span>
              <motion.span
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={wordTransition(4)}
                className="inline-block"
                style={{ color: "var(--accent)" }}
              >
                .
              </motion.span>
            </span>
          </h1>

          {/* Subhead */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tSubhead}
            className="mt-7 max-w-[50ch] text-body"
            style={{
              fontSize: "1.1875rem",
              lineHeight: "var(--leading-body)",
            }}
          >
            Diseñamos y programamos sitios y tiendas para marcas, comercios y
            profesionales argentinos. Sin plantillas, sin humo: código a medida que
            convierte visitas en clientes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={tCTA}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <PrimaryCTA href="#contacto">
              Pedir presupuesto
              <ArrowUpRight className="h-4 w-4" />
            </PrimaryCTA>
            <SecondaryCTA href="#planes">Ver planes</SecondaryCTA>
          </motion.div>

          {/* Live indicator */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tLive}
            className="mt-6 inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.75rem",
              color: "var(--muted-body)",
              letterSpacing: "var(--tracking-micro)",
            }}
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{
                  background: "var(--accent)",
                  animation: reduced
                    ? "none"
                    : "pulse-ring 2.4s var(--ease-ui) infinite",
                }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            2 proyectos terminando este mes
          </motion.div>
        </div>

        {/* Visual column — 6 cols, scroll-parallaxed */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tVisual}
          style={{
            y: reduced ? 0 : visualY,
            scale: reduced ? 1 : visualScale,
          }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[16/11] w-full max-w-[640px]">
            {/* Subtle accent rim glow behind the mockup */}
            <div
              aria-hidden
              className="absolute -inset-6 z-0 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)",
                filter: "blur(40px)",
                opacity: 0.7,
              }}
            />
            <div className="relative z-[3]">
              <HeroMockup />
            </div>
            <HeroProofBadges />
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline + meta strip */}
      <div
        className="relative z-10 mx-auto mt-16 flex max-w-7xl items-center justify-between border-t pt-5"
        style={{
          borderColor:
            "color-mix(in srgb, var(--foreground) 8%, transparent)",
        }}
      >
        <span
          className="text-micro"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {site.experienceLabel} · MadsJeez Design · Carlos Spegazzini, BA
        </span>
        <a
          href="#trabajos"
          className="hidden items-center gap-2 text-micro transition-colors hover:text-[var(--accent)] md:inline-flex"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
          }}
        >
          Ver trabajos
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}

/* ----------------- micro-components ----------------- */

function Chip({
  children,
  pulse = false,
}: {
  children: React.ReactNode;
  pulse?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
      style={{
        background:
          "color-mix(in srgb, var(--card) 70%, transparent)",
        border:
          "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
        color: "var(--muted-body)",
        fontSize: "0.72rem",
        letterSpacing: "var(--tracking-micro)",
        fontFamily: "var(--font-jetbrains), monospace",
        backdropFilter: "blur(6px)",
      }}
    >
      {pulse && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full rounded-full"
            style={{
              background: "var(--accent)",
              opacity: 0.5,
              animation: reduced
                ? "none"
                : "pulse-ring 2s var(--ease-ui) infinite",
            }}
          />
          <span
            className="relative inline-flex h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
        </span>
      )}
      {children}
    </span>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      className="hidden h-3 w-px md:inline-block"
      style={{
        background:
          "color-mix(in srgb, var(--foreground) 14%, transparent)",
      }}
    />
  );
}

function PrimaryCTA({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold text-white"
      style={{
        background: "var(--accent)",
        transitionProperty: "box-shadow, background, transform",
        transitionDuration: "var(--duration-snap)",
        transitionTimingFunction: "var(--ease-snap)",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.18), 0 10px 30px -10px color-mix(in srgb, var(--accent) 55%, transparent)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent-dark)";
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0,0,0,0.22), 0 16px 50px -10px color-mix(in srgb, var(--accent) 75%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0,0,0,0.18), 0 10px 30px -10px color-mix(in srgb, var(--accent) 55%, transparent)";
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}

function SecondaryCTA({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-body-strong"
      style={{
        background:
          "color-mix(in srgb, var(--card) 60%, transparent)",
        border:
          "1px solid color-mix(in srgb, var(--foreground) 14%, transparent)",
        backdropFilter: "blur(8px)",
        transitionProperty: "background, border-color, color",
        transitionDuration: "var(--duration-snap)",
        transitionTimingFunction: "var(--ease-snap)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--accent) 55%, transparent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--foreground) 14%, transparent)";
        e.currentTarget.style.color = "";
      }}
    >
      {children}
    </a>
  );
}
