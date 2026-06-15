import type { ReactNode } from "react";

/**
 * <FloatingElements> — wrapper that gives each child the .floating CSS
 * animation with staggered delays. Drop badges, chips, proof tiles in here
 * and they oscillate subtly on Y. Respects prefers-reduced-motion globally.
 */
export type FloatingElementsProps = {
  children: ReactNode;
  /** ms delay between sibling oscillations, default 1200 */
  stagger?: number;
  className?: string;
};

export function FloatingElements({
  children,
  className = "",
}: FloatingElementsProps) {
  // Children get the .floating class via FloatingItem; this wrapper just
  // exists to make the API self-documenting.
  return <div className={className}>{children}</div>;
}

export type FloatingItemProps = {
  children: ReactNode;
  /** delay class: 0, 1, or 2 — maps to the staggered keyframe delays. */
  delay?: 0 | 1 | 2;
  className?: string;
};

export function FloatingItem({
  children,
  delay = 0,
  className = "",
}: FloatingItemProps) {
  const delayClass =
    delay === 1 ? "floating-delay-1" : delay === 2 ? "floating-delay-2" : "";
  return <div className={`floating ${delayClass} ${className}`}>{children}</div>;
}
