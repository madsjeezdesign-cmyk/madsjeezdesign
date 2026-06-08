"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { DemoMeta } from "@/lib/demos-registry";
import { useReducedMotion } from "@/lib/motion";

/**
 * ShowcaseFrame — composed mock-browser preview of a single demo.
 *
 * Renders a realistic browser chrome (traffic lights + URL bar with a subtle
 * backdrop-blur ONLY on the URL pill — banlist-compliant) and a CSS-only
 * editorial hero composition driven by the demo's `accent` + `previewClass`.
 *
 * Adds mouse-parallax (2deg perspective tilt) that respects reduced motion.
 */
export function ShowcaseFrame({ demo }: { demo: DemoMeta }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Mouse parallax — tilt the frame slightly toward the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), {
    stiffness: 140,
    damping: 18,
    mass: 0.5,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), {
    stiffness: 140,
    damping: 18,
    mass: 0.5,
  });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // Pretty-format the slug as if it were a URL path
  const urlPath = `madsjeezdesign.com/demos/${demo.slug}`;

  // Derive a sensible CTA label from industry / accent vibe
  const ctaLabel = getCta(demo);

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
        className="relative w-full overflow-hidden"
      >
        {/* Glow on the frame edge — accent-tinted, low alpha */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[20px]"
          style={{
            background: `radial-gradient(120% 80% at 50% 0%, ${demo.accent}24, transparent 60%)`,
            filter: "blur(20px)",
            opacity: 0.55,
          }}
        />

        <div
          className="relative w-full overflow-hidden rounded-[18px]"
          style={{
            background: "#0b1120",
            border: `1px solid color-mix(in srgb, ${demo.accent} 18%, transparent)`,
            boxShadow:
              "0 30px 70px -30px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset",
            aspectRatio: "16 / 10",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(10, 15, 26, 0.6)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div
              className="ml-3 flex flex-1 items-center gap-2 rounded-md px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: demo.accent }}
              />
              <span
                className="truncate text-[10px]"
                style={{
                  color: "rgba(226,232,240,0.7)",
                  letterSpacing: "var(--tracking-micro)",
                }}
              >
                {urlPath}
              </span>
            </div>
          </div>

          {/* Hero composition — accent-driven CSS scene */}
          <div className={`relative flex h-[calc(100%-2.5rem)] bg-gradient-to-br ${demo.previewClass}`}>
            <FrameComposition demo={demo} ctaLabel={ctaLabel} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -----------------------------------------------------------
 * Inner composition — varies per demo via accent + simple shapes.
 * Two columns: editorial copy left, hero "image" area right.
 * --------------------------------------------------------- */

function FrameComposition({
  demo,
  ctaLabel,
}: {
  demo: DemoMeta;
  ctaLabel: string;
}) {
  const isLight = isLightPreview(demo.previewClass);
  const titleColor = isLight ? "#0f172a" : "#f8fafc";
  const subColor = isLight ? "#475569" : "rgba(226,232,240,0.78)";
  const microColor = isLight ? "rgba(15,23,42,0.55)" : "rgba(226,232,240,0.55)";

  return (
    <div className="grid h-full w-full grid-cols-12 gap-3 p-5 md:gap-4 md:p-6">
      {/* LEFT — typographic block */}
      <div className="col-span-7 flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: demo.accent }}
          />
          <span
            className="text-[9px] uppercase"
            style={{
              color: microColor,
              letterSpacing: "0.18em",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
          >
            {demo.industry.split(" · ")[0].slice(0, 28)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3
            className="text-balance"
            style={{
              color: titleColor,
              fontFamily: "var(--font-instrument), serif",
              fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {demo.title}
          </h3>
          <p
            className="max-w-[26ch] text-[11px] md:text-[12px]"
            style={{ color: subColor, lineHeight: 1.45 }}
          >
            {demo.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium"
            style={{
              background: demo.accent,
              color: pickCtaText(demo.accent),
              letterSpacing: "0.02em",
            }}
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </span>
          <span
            className="rounded-full px-3 py-1.5 text-[10px]"
            style={{
              background: isLight ? "rgba(15,23,42,0.05)" : "rgba(255,255,255,0.06)",
              color: subColor,
              border: `1px solid ${isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            Ver más
          </span>
        </div>
      </div>

      {/* RIGHT — hero "image" area */}
      <div className="col-span-5 flex flex-col gap-2">
        <div
          className="relative flex-1 overflow-hidden rounded-md"
          style={{
            background: `
              radial-gradient(120% 80% at 30% 10%, ${demo.accent}44, transparent 60%),
              radial-gradient(120% 100% at 100% 100%, ${demo.accent}22, transparent 70%),
              ${isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)"}
            `,
            border: `1px solid ${isLight ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          {/* Decorative grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `linear-gradient(${isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)"} 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />
          {/* Brand monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                fontFamily: "var(--font-instrument), serif",
                color: demo.accent,
                fontSize: "clamp(2rem, 5vw, 3.6rem)",
                lineHeight: 1,
                opacity: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              {monogram(demo.title)}
            </span>
          </div>
        </div>

        {/* Mini info chips */}
        <div className="grid grid-cols-3 gap-1.5">
          {["A", "B", "C"].map((k, i) => (
            <div
              key={k}
              className="h-6 rounded"
              style={{
                background: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 1 ? demo.accent + "55" : isLight ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.06)"}`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */

function monogram(title: string): string {
  const parts = title.replace(/[^\p{L}\p{N}\s&]/gu, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0]?.[0] ?? "").concat(parts[1]?.[0] ?? "").toUpperCase();
}

function isLightPreview(previewClass: string): boolean {
  // Heuristic — preview gradients ending in stone-100/50, white, rose-50, etc. are light
  return /(?:white|stone-(?:50|100|200)|amber-(?:50|100)|rose-(?:50|100)|emerald-(?:50)|slate-(?:50|100)|blue-(?:100)|sky-(?:50)|cyan-(?:100)|F8F6F2|FBF6EE|FAF6F4)/.test(
    previewClass,
  );
}

function pickCtaText(hex: string): string {
  // Naive luminance to pick contrasting CTA text color
  const m = hex.replace("#", "");
  if (m.length !== 6 && m.length !== 3) return "#0f172a";
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#0f172a" : "#ffffff";
}

function getCta(demo: DemoMeta): string {
  const ind = demo.industry.toLowerCase();
  if (ind.includes("hosting")) return "Crear servidor";
  if (ind.includes("ropa") || ind.includes("moda")) return "Ver colección";
  if (ind.includes("restaurante") || ind.includes("pizza") || ind.includes("burger") || ind.includes("hambur")) return "Hacer pedido";
  if (ind.includes("inmobiliaria")) return "Tasar propiedad";
  if (ind.includes("salón") || ind.includes("salon") || ind.includes("estética") || ind.includes("estetica") || ind.includes("barber")) return "Reservar turno";
  if (ind.includes("legal") || ind.includes("jurídico") || ind.includes("juridico") || ind.includes("contable")) return "Pedir consulta";
  if (ind.includes("gym") || ind.includes("yoga") || ind.includes("pilates") || ind.includes("gimnasio")) return "Empezar prueba";
  if (ind.includes("streamer") || ind.includes("youtuber") || ind.includes("tiktok") || ind.includes("podcast")) return "Ver media kit";
  if (ind.includes("ferret") || ind.includes("almacén") || ind.includes("almacen") || ind.includes("super") || ind.includes("bazar")) return "Comprar online";
  if (ind.includes("tatuaje") || ind.includes("tattoo")) return "Reservar sesión";
  if (ind.includes("hotel") || ind.includes("posada")) return "Reservar estadía";
  if (ind.includes("agencia") || ind.includes("marketing")) return "Ver propuesta";
  if (ind.includes("veterinaria") || ind.includes("pet")) return "Pedir turno";
  return "Empezar";
}
