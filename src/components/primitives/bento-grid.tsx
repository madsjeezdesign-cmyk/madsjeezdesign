import type { ReactNode } from "react";

/**
 * <BentoGrid> — asymmetric grid with content-sized rows.
 *
 * Critical: uses `grid-auto-rows: min-content` + `align-items: start` so
 * items DO NOT stretch to match a row-spanning neighbor. Solves the empty
 * bottom problem from the previous trabajos bento.
 *
 * Use <BentoItem span="lg|md|sm"> for child sizing.
 */
export type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return <div className={`bento-grid ${className}`}>{children}</div>;
}

export type BentoItemProps = {
  children: ReactNode;
  /** Desktop span — "lg" 2 cols, "md" 2 cols, "sm" 1 col. Mobile always full width. */
  span?: "lg" | "md" | "sm";
  className?: string;
};

export function BentoItem({
  children,
  span = "sm",
  className = "",
}: BentoItemProps) {
  const spanClass =
    span === "lg"
      ? "bento-span-lg"
      : span === "md"
        ? "bento-span-md"
        : "bento-span-sm";
  return <div className={`${spanClass} ${className}`}>{children}</div>;
}
