"use client";

import {
  useReducedMotion as useFramerReducedMotion,
  type Transition,
} from "framer-motion";

/**
 * Design system motion tokens.
 *
 * Three speeds × three easings — no ad-hoc cubic-beziers in new components.
 * Mirrored in `globals.css` as `--duration-*` and `--ease-*` custom properties.
 *
 * Pick by intent, not by feel:
 * - `snap`: micro state changes (hover, focus, toggle). Should feel immediate.
 * - `ui`: interactive transitions (enter/exit, sheet, dropdown). Default.
 * - `display`: hero reveals, choreography, scroll-triggered moments.
 */
export const motion = {
  durations: {
    snap: 0.15,
    ui: 0.22,
    display: 0.48,
  },
  easings: {
    /** cubic-bezier(0.4, 0, 0.2, 1) — Material standard. Sharp UI. */
    snap: [0.4, 0, 0.2, 1] as const,
    /** cubic-bezier(0.16, 1, 0.3, 1) — ease-out-quart. Most interactions. */
    ui: [0.16, 1, 0.3, 1] as const,
    /** cubic-bezier(0.19, 1, 0.22, 1) — ease-out-expo. Display moments. */
    display: [0.19, 1, 0.22, 1] as const,
  },
} as const;

/**
 * Returns true when the user has requested reduced motion at the OS level.
 * SSR returns false (assume motion); client returns the real preference.
 *
 * Always prefer this over reading `window.matchMedia(...)` directly — keeps
 * SSR/hydration consistent and integrates with framer-motion's animation engine.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}

/**
 * Build a framer-motion `Transition` from a design system speed + easing.
 * Returns a no-op (0ms) transition when reduced motion is requested.
 *
 * @example
 * const transition = useMotionTransition("ui");
 * <motion.div animate={{ opacity: 1 }} transition={transition} />
 */
export function useMotionTransition(
  speed: keyof typeof motion.durations = "ui",
  easing: keyof typeof motion.easings = "ui",
  overrides: Partial<Transition> = {},
): Transition {
  const reduced = useReducedMotion();
  if (reduced) return { duration: 0 };
  return {
    duration: motion.durations[speed],
    ease: motion.easings[easing],
    ...overrides,
  };
}
