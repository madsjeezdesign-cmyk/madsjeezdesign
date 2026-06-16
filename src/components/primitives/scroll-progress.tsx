"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * <ScrollProgress> — thin fixed bar at the top of the viewport that fills
 * with the brand cyan as the user scrolls the page. Premium-agency staple.
 *
 * Uses framer-motion useScroll (scaleX 0→1) smoothed by a spring. Pinned
 * top, pointer-events:none, above content. Respects prefers-reduced-motion
 * by rendering nothing (the bar's whole value is the motion).
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--brand-cyan-deep), var(--brand-cyan) 60%, color-mix(in srgb, var(--brand-cyan) 40%, white))",
          boxShadow: "0 0 12px color-mix(in srgb, var(--brand-cyan) 60%, transparent)",
        }}
      />
    </motion.div>
  );
}
