"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";

/**
 * Hero dot-grid background pattern (Linear/Vercel signal).
 * 1px dots on a 32px grid with token-driven opacity. SVG-encoded, no asset cost.
 * Accepts an optional `opacity` MotionValue so the parent can fade it on scroll.
 * Respects prefers-reduced-motion — the static SVG is the same either way.
 */
export function HeroDotGrid({ opacity }: { opacity?: MotionValue<number> }) {
  const reduced = useReducedMotion();

  // 8% light, 9% dark — kept subtle to avoid "graph paper" feel
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='1' cy='1' r='1' fill='currentColor' /></svg>`,
  );

  return (
    <motion.div
      aria-hidden
      style={{
        opacity: reduced ? 1 : opacity,
        color: "color-mix(in srgb, var(--foreground) 55%, transparent)",
        maskImage:
          "radial-gradient(ellipse at 50% 35%, black 0%, black 38%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 50% 35%, black 0%, black 38%, transparent 78%)",
        backgroundImage: `url("data:image/svg+xml;utf8,${svg}")`,
        backgroundSize: "32px 32px",
      }}
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.08] dark:opacity-[0.1]"
    />
  );
}
