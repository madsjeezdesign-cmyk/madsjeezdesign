"use client";

import { createElement, useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

/**
 * <ScrollReveal> — fade + translate in on viewport entry.
 *
 * Uses IntersectionObserver. Honors prefers-reduced-motion via the global
 * .scroll-reveal CSS rule (no animation when set).
 *
 * Replaces every per-component `motion.div initial whileInView` boilerplate
 * with a tiny, consistent primitive. Children flash in once and stay.
 */
export type ScrollRevealProps = {
  children: ReactNode;
  /** ms to delay the reveal once the element enters the viewport */
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  /** 0–1, default 0.15 */
  threshold?: number;
  /** Element root margin, default "0px 0px -8% 0px" so reveals fire slightly before */
  rootMargin?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  className?: string;
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  as = "div",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the user wants reduced motion, the CSS rule already pins it visible.
    // We still mark visible so layout matches (no JS-driven shift).
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) {
        node.classList.add("is-visible");
        return;
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            if (delay > 0) {
              window.setTimeout(() => target.classList.add("is-visible"), delay);
            } else {
              target.classList.add("is-visible");
            }
            obs.unobserve(target);
          }
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [delay, threshold, rootMargin]);

  const Tag: ElementType = as;
  const dirClass =
    direction === "down"
      ? "scroll-reveal--down"
      : direction === "left"
        ? "scroll-reveal--left"
        : direction === "right"
          ? "scroll-reveal--right"
          : "";

  return createElement(
    Tag,
    { ref, className: `scroll-reveal ${dirClass} ${className}` },
    children
  );
}
