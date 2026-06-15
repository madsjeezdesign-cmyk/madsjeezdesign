"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * <MagneticButton> — CTA that drifts towards the cursor inside its hit area.
 *
 * Pure CSS transform driven by --magnet-x / --magnet-y custom properties
 * the component writes on pointer move. No framer-motion. Respects
 * prefers-reduced-motion via the global .magnetic-btn rule.
 *
 * Renders as <Link> if `href`, <button> otherwise. Keep label short — long
 * labels feel sluggish to drift.
 */
export type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  /** Max pixel offset the button can drift. Default 8. */
  strength?: number;
  className?: string;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  strength = 8,
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const elRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const onMove = useCallback(
    (ev: React.PointerEvent) => {
      const node = elRef.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (ev.clientX - cx) / r.width;
      const dy = (ev.clientY - cy) / r.height;
      // Cap drift to ±strength px and ease via tanh-style scaling
      const ax = Math.max(-1, Math.min(1, dx * 2));
      const ay = Math.max(-1, Math.min(1, dy * 2));
      node.style.setProperty("--magnet-x", `${ax * strength}px`);
      node.style.setProperty("--magnet-y", `${ay * strength}px`);
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const node = elRef.current;
    if (!node) return;
    node.style.setProperty("--magnet-x", "0px");
    node.style.setProperty("--magnet-y", "0px");
  }, []);

  const stylesByVariant: Record<string, string> = {
    primary:
      "rounded-full px-6 py-3 text-sm font-semibold text-white",
    secondary:
      "rounded-full px-6 py-3 text-sm font-semibold surface-solid",
    ghost:
      "rounded-full px-5 py-2.5 text-sm font-medium",
  };
  const styleBgByVariant: Record<string, React.CSSProperties> = {
    primary: { background: "var(--accent)" },
    secondary: { color: "var(--foreground)" },
    ghost: { color: "var(--foreground)" },
  };

  const klass = `magnetic-btn inline-flex items-center gap-2 transition-shadow ${stylesByVariant[variant]} ${className}`;
  const style: React.CSSProperties = {
    ...styleBgByVariant[variant],
    transitionDuration: "var(--duration-snap)",
    transitionTimingFunction: "var(--ease-ui)",
  };

  if (href) {
    return (
      <Link
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={klass}
        style={style}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={klass}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </button>
  );
}
