/**
 * <LoadingState> + <Skeleton> — uniform loading visuals.
 *
 * No spinner GIFs, no DOM bouncing. Just CSS animated stripes / pulses on
 * solid surfaces. Respects prefers-reduced-motion (pulses freeze).
 */

import type { ReactNode } from "react";

export type SkeletonProps = {
  className?: string;
  /** width / height passed through to inline style for fine control. */
  style?: React.CSSProperties;
};

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={`block ${className}`}
      style={{
        background:
          "linear-gradient(90deg, color-mix(in srgb, var(--muted) 10%, transparent), color-mix(in srgb, var(--muted) 20%, transparent), color-mix(in srgb, var(--muted) 10%, transparent))",
        backgroundSize: "200% 100%",
        animation: "skeleton-shimmer 1.4s ease-in-out infinite",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
    />
  );
}

export type LoadingStateProps = {
  /** Heading shown above skeleton block */
  title?: ReactNode;
  /** Optional subtle description */
  description?: ReactNode;
  /** Skeleton rows count, default 3 */
  rows?: number;
  className?: string;
};

export function LoadingState({
  title,
  description,
  rows = 3,
  className = "",
}: LoadingStateProps) {
  return (
    <div className={`surface-solid p-8 ${className}`}>
      {title ? (
        <h3
          className="font-[family-name:var(--font-instrument)] text-balance"
          style={{
            fontSize: "var(--font-size-h3)",
            lineHeight: "var(--leading-heading)",
            color: "var(--foreground)",
          }}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p
          className="mt-2 text-body"
          style={{ fontSize: "0.9375rem" }}
        >
          {description}
        </p>
      ) : null}
      <div className="mt-6 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            style={{
              height: "0.75rem",
              width: `${100 - i * 8}%`,
            }}
          />
        ))}
      </div>

      <style>
        {`@keyframes skeleton-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes skeleton-shimmer { 0%, 100% { background-position: 50% 0; } }
          }`}
      </style>
    </div>
  );
}
