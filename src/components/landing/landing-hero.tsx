"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
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
import { HeroDotGrid } from "./_internals/hero-dot-grid";
import { HeroLightBeam } from "./_internals/hero-light-beam";
import { HeroCursorRing } from "./_internals/hero-cursor-ring";
import { HeroTerminalLine } from "./_internals/hero-terminal-line";
import { HeroTechTicker } from "./_internals/hero-tech-ticker";

/**
 * Hero v3 — agency-tier (Linear / Stripe / Vercel / Cursor reference).
 *
 *   layer 0 — atmosphere: gradient orbs (mesh) + dot-grid + light beam + grain
 *   layer 1 — cursor parallax: ring follow + mouse-driven mockup tilt
 *   layer 2 — typography: eyebrow chips, Instrument Serif H1, terminal line, subhead
 *   layer 3 — CTAs: filled primary, outline "Ver los 93 demos" → /demos, text tertiary
 *   layer 4 — visual: HeroMockup w/ perspective tilt + accent rim glow + live chip
 *   layer 5 — tech ticker (mono stack chips, slow scroll)
 *   layer 6 — scroll choreography (mesh fade, parallax, dot-grid fade)
 *
 * Banlist respected (relaxed per brief): no gradient H1 text, no glass DEFAULT
 * on cards, no 0.3em tracking, no blue→purple. All animation collapses under
 * prefers-reduced-motion.
 */

const H1_LINE_1 = ["Hacemos", "sitios", "que"];
const H1_LINE_2_PRE = "venden";

const EYEBROW_CHIPS = ["Diseño", "Código", "Buenos Aires"] as const;

const DEMOS_COUNT = 93;

export function LandingHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven choreography
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.9], [0.08, 0.02]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Mouse parallax — drives the mockup perspective tilt
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 90, damping: 16, mass: 0.6 });
  const my = useSpring(myRaw, { stiffness: 90, damping: 16, mass: 0.6 });
  const tiltX = useTransform(my, (v) => v * 4); // up to ±4deg
  const tiltY = useTransform(mx, (v) => v * -5);
  const driftX = useTransform(mx, (v) => v * 6); // ±6px
  const driftY = useTransform(my, (v) => v * 5);

  const [chipIdx, setChipIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setChipIdx((i) => (i + 1) % EYEBROW_CHIPS.length),
      2200,
    );
    return () => clearInterval(id);
  }, [reduced]);

  // pointer tracking for parallax
  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    const hover = window.matchMedia("(hover: hover)").matches;
    if (!hover) return;
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mxRaw.set(nx);
      myRaw.set(ny);
    };
    const onLeave = () => {
      mxRaw.set(0);
      myRaw.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mxRaw, myRaw, reduced]);

  const tEyebrow = useMotionTransition("ui", "display", { delay: 0.05 });
  const tSubhead = useMotionTransition("display", "display", { delay: 0.55 });
  const tCTA = useMotionTransition("display", "display", { delay: 0.7 });
  const tLive = useMotionTransition("ui", "display", { delay: 0.95 });
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
      className="relative isolate overflow-hidden px-6 pt-28 pb-16 md:px-10 md:pt-36 md:pb-24 lg:min-h-[92vh]"
      style={{ background: "var(--background)" }}
    >
      {/* ───────────── Layer 0 — Atmosphere ───────────── */}
      <motion.div
        style={{ opacity: reduced ? 1 : meshOpacity }}
        className="absolute inset-0 z-0"
      >
        <HeroMesh />
      </motion.div>
      <HeroDotGrid opacity={dotOpacity} />
      <HeroLightBeam />
      <HeroNoise />

      {/* ───────────── Layer 1 — Cursor ring ───────────── */}
      <HeroCursorRing />

      {/* ───────────── Content grid ───────────── */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 md:gap-16 lg:grid-cols-12 lg:gap-12 lg:pt-6">
        {/* Text column — 6 cols */}
        <div className="lg:col-span-6">
          {/* Eyebrow chips row */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tEyebrow}
            className="flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {EYEBROW_CHIPS.map((label, i) => (
              <span key={label} className="inline-flex items-center gap-3">
                <EyebrowChip
                  glow={chipIdx === i}
                  dot={i === EYEBROW_CHIPS.length - 1}
                >
                  {label}
                </EyebrowChip>
                {i < EYEBROW_CHIPS.length - 1 && <ChipDivider />}
              </span>
            ))}
            <span className="hidden h-3 w-px md:inline-block bg-[color-mix(in_srgb,var(--foreground)_14%,transparent)]" />
            <EyebrowChip subtle>{site.experienceLabel}</EyebrowChip>
          </motion.div>

          {/* H1 — word stagger w/ accent glow on italic */}
          <h1
            className="mt-7 text-balance text-body-strong"
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontWeight: 400,
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              lineHeight: 1.0,
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
                  textShadow:
                    "0 0 28px color-mix(in srgb, var(--accent) 30%, transparent)",
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

          {/* Terminal line — small, mono, lives between H1 and subhead */}
          <HeroTerminalLine />

          {/* Subhead */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tSubhead}
            className="mt-6 max-w-[50ch] text-body"
            style={{
              fontSize: "1.1875rem",
              lineHeight: "var(--leading-body)",
            }}
          >
            Diseñamos y programamos sitios y tiendas para marcas, comercios y
            profesionales argentinos. Sin plantillas, sin humo: código a medida
            que convierte visitas en clientes.
          </motion.p>

          {/* CTAs — primary, "Ver los 93 demos" (outline), tertiary text link */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tCTA}
            className="mt-9 flex flex-col items-start gap-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryCTA href="#contacto">
                Pedir presupuesto
                <ArrowUpRight className="h-4 w-4" />
              </PrimaryCTA>
              <DemosCTA href="/demos">
                Ver los {DEMOS_COUNT} demos
                <span aria-hidden className="ml-1">
                  →
                </span>
              </DemosCTA>
            </div>
            <TertiaryLink href="#planes">Ver planes y precios</TertiaryLink>
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

        {/* Visual column — 6 cols, scroll-parallax + mouse perspective tilt */}
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
          <motion.div
            className="relative mx-auto aspect-[16/11] w-full max-w-[640px]"
            style={{
              perspective: 1400,
              x: reduced ? 0 : driftX,
              y: reduced ? 0 : driftY,
            }}
          >
            <motion.div
              style={{
                rotateX: reduced ? 0 : tiltX,
                rotateY: reduced ? 0 : tiltY,
                transformStyle: "preserve-3d",
              }}
              className="relative h-full w-full"
            >
              {/* Accent rim glow */}
              <div
                aria-hidden
                className="absolute -inset-6 z-0 rounded-[28px]"
                style={{
                  background:
                    "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 32%, transparent), transparent 70%)",
                  filter: "blur(40px)",
                  opacity: 0.75,
                }}
              />
              <div className="relative z-[3]">
                <HeroMockup />
              </div>
              <HeroProofBadges />
            </motion.div>

            {/* Floating "Vista en vivo" chip — bottom center */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="absolute -bottom-3 left-1/2 z-[6] -translate-x-1/2"
            >
              <ViewLiveChip />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ───────────── Layer 5 — Tech ticker ───────────── */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <HeroTechTicker />
      </div>

      {/* Bottom hairline + meta strip */}
      <div
        className="relative z-10 mx-auto mt-6 flex max-w-7xl items-center justify-between border-t pt-5"
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

/* ───────────── micro-components ───────────── */

function EyebrowChip({
  children,
  glow = false,
  dot = false,
  subtle = false,
}: {
  children: React.ReactNode;
  glow?: boolean;
  dot?: boolean;
  subtle?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 transition-colors"
      style={{
        color: glow ? "var(--foreground)" : "var(--muted-body)",
        fontSize: "0.72rem",
        letterSpacing: "var(--tracking-micro)",
        fontFamily: "var(--font-jetbrains), monospace",
        opacity: subtle ? 0.75 : 1,
        textShadow: glow
          ? "0 0 14px color-mix(in srgb, var(--accent) 35%, transparent)"
          : "none",
      }}
    >
      {dot && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
      )}
      {children}
    </span>
  );
}

function ChipDivider() {
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
        transitionProperty: "box-shadow, background",
        transitionDuration: "var(--duration-snap)",
        transitionTimingFunction: "var(--ease-snap)",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.18), 0 10px 30px -10px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 0 1px color-mix(in srgb, var(--accent) 0%, transparent)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--accent-dark)";
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0,0,0,0.22), 0 18px 55px -12px color-mix(in srgb, var(--accent) 80%, transparent), 0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--accent)";
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0,0,0,0.18), 0 10px 30px -10px color-mix(in srgb, var(--accent) 55%, transparent), 0 0 0 1px color-mix(in srgb, var(--accent) 0%, transparent)";
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}

/**
 * "Ver los 93 demos" outline CTA — links to the /demos index page.
 * Uses next/link so it's a real route transition, not an anchor.
 */
function DemosCTA({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-body-strong transition-[border-color,color,background] duration-150"
      style={{
        background:
          "color-mix(in srgb, var(--card) 50%, transparent)",
        border:
          "1px solid color-mix(in srgb, var(--foreground) 16%, transparent)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--accent) 65%, transparent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--foreground) 16%, transparent)";
        e.currentTarget.style.color = "";
      }}
    >
      {children}
    </Link>
  );
}

function TertiaryLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 text-[12px] transition-colors hover:text-[var(--accent)]"
      style={{
        color: "var(--muted-body)",
        fontFamily: "var(--font-jetbrains), monospace",
        letterSpacing: "var(--tracking-micro)",
      }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-4"
        style={{
          background:
            "color-mix(in srgb, var(--foreground) 20%, transparent)",
        }}
      />
      {children}
      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function ViewLiveChip() {
  const reduced = useReducedMotion();
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{
        background: "color-mix(in srgb, var(--card) 85%, transparent)",
        border: "1px solid color-mix(in srgb, var(--foreground) 12%, transparent)",
        boxShadow: "0 10px 30px -12px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
        fontFamily: "var(--font-jetbrains), monospace",
        fontSize: "0.7rem",
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
      Vista en vivo · luna-petit-co.com
    </span>
  );
}
