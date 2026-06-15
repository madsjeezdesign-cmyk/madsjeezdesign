import Link from "next/link";
import type { ReactNode } from "react";

/**
 * <EmptyState> — consistent "nothing to show" panel.
 *
 * Use in: admin dashboard when no leads, /demos when filters return nothing,
 * cart when empty, search results, etc.
 */
export type EmptyStateProps = {
  /** Lucide icon or any node rendered above the title */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  cta,
  secondaryCta,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`surface-solid mx-auto flex max-w-lg flex-col items-center px-8 py-12 text-center ${className}`}
    >
      {icon ? (
        <div
          className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in srgb, var(--brand-cyan) 12%, transparent)",
            color: "var(--brand-cyan)",
          }}
        >
          {icon}
        </div>
      ) : null}
      <h3
        className="font-[family-name:var(--font-instrument)]"
        style={{
          fontSize: "var(--font-size-h2)",
          lineHeight: "var(--leading-heading)",
          letterSpacing: "var(--tracking-heading)",
          color: "var(--foreground)",
        }}
      >
        {title}
      </h3>
      {description ? (
        <p
          className="mt-3 max-w-md text-body"
          style={{ fontSize: "0.9375rem" }}
        >
          {description}
        </p>
      ) : null}
      {(cta || secondaryCta) && (
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          {cta ? (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{
                background: "var(--accent)",
                transitionDuration: "var(--duration-snap)",
              }}
            >
              {cta.label}
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="surface-solid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                color: "var(--foreground)",
                transitionDuration: "var(--duration-snap)",
              }}
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}
