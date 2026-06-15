"use client";

import { useCallback, useRef } from "react";
import type { ReactNode } from "react";

/**
 * <SpotlightCard> — card with a radial glow that follows the cursor.
 *
 * Uses the global `.spotlight-card` CSS rule. JS only writes
 * `--spotlight-x` and `--spotlight-y` on pointer move. CSS handles fade.
 * Respects prefers-reduced-motion (no JS overhead because the ::before
 * just doesn't follow — opacity transition still feels OK).
 */
export type SpotlightCardProps = {
  children: ReactNode;
  /** CSS color (token preferred, e.g. var(--brand-cyan)). */
  glowColor?: string;
  /** Spotlight radius in px. Default 220. */
  size?: number;
  /** Extra classes on the wrapping div. */
  className?: string;
  /** Surface style — solid card with hairline border by default. */
  variant?: "solid" | "elevated" | "transparent";
  /** Optional href to make the whole card a link. */
  href?: string;
};

export function SpotlightCard({
  children,
  glowColor,
  size = 220,
  className = "",
  variant = "solid",
  href,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback((ev: React.PointerEvent) => {
    const node = ref.current;
    if (!node) return;
    const r = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${ev.clientX - r.left}px`);
    node.style.setProperty("--spotlight-y", `${ev.clientY - r.top}px`);
  }, []);

  const surface =
    variant === "elevated"
      ? "surface-elevated"
      : variant === "transparent"
        ? "hairline rounded-[var(--radius-md)]"
        : "surface-solid";

  const style: React.CSSProperties = {
    "--spotlight-size": `${size}px`,
    "--spotlight-color": glowColor ?? "var(--brand-cyan)",
  } as React.CSSProperties;

  const Inner = (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`spotlight-card ${surface} ${className}`}
      style={style}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {Inner}
      </a>
    );
  }
  return Inner;
}
