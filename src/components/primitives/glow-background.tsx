import type { ReactNode } from "react";

/**
 * <GlowBackground> — branded ambient gradient layer.
 *
 * Drops behind any section content as a fixed-position OR absolute layer.
 * Pure CSS, zero runtime cost. Variant picks one of the gradient-mesh
 * recipes in globals.css.
 */
export type GlowBackgroundProps = {
  variant?: "cyan" | "warm";
  /** "absolute" fills the parent (parent must be position:relative).
   *  "fixed" pins to the viewport (use sparingly, only top-level). */
  fixed?: boolean;
  intensity?: number;
  className?: string;
  children?: ReactNode;
};

export function GlowBackground({
  variant = "cyan",
  fixed = false,
  intensity = 0.7,
  className = "",
  children,
}: GlowBackgroundProps) {
  const variantClass =
    variant === "warm" ? "gradient-mesh-warm" : "gradient-mesh-cyan";
  const positionClass = fixed ? "fixed" : "absolute";

  return (
    <div
      aria-hidden
      className={`${positionClass} inset-0 pointer-events-none ${variantClass} ${className}`}
      style={{ opacity: intensity }}
    >
      {children}
    </div>
  );
}
