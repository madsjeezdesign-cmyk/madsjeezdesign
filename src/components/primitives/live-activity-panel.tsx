"use client";

import { useEffect, useState } from "react";

/**
 * <LiveActivityPanel> — small widget showing pseudo-live signals.
 *
 * Used for portfolio/agency landings to suggest active studio life. Each
 * item rotates on a timer (4-8s). Items are static strings from props;
 * the rotation order is deterministic per slug so SSR and CSR match.
 *
 * Mark this client component so the cycler doesn't bake into HTML.
 */
export type LiveActivityItem = {
  /** Short label, e.g. "Deploy #312", "Lead nuevo · barbería" */
  label: string;
  /** Optional sub-line, e.g. "hace 2 min", "Buenos Aires" */
  meta?: string;
};

export type LiveActivityPanelProps = {
  items: LiveActivityItem[];
  /** ms between item rotations */
  intervalMs?: number;
  className?: string;
  /** Override the title (default "Actividad reciente") */
  title?: string;
};

export function LiveActivityPanel({
  items,
  intervalMs = 5000,
  className = "",
  title = "Actividad reciente",
}: LiveActivityPanelProps) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % items.length),
      intervalMs
    );
    return () => window.clearInterval(id);
  }, [items.length, intervalMs]);

  const current = items[idx] ?? items[0];
  if (!current) return null;

  return (
    <div
      className={`surface-solid inline-flex items-center gap-3 rounded-full px-4 py-2 ${className}`}
    >
      <span aria-hidden className="live-ping-dot" />
      <div className="flex min-w-0 flex-col leading-tight">
        <span
          className="text-micro"
          style={{
            color: "var(--muted-body)",
            fontFamily: "var(--font-mono), monospace",
            textTransform: "uppercase",
            letterSpacing: "var(--tracking-micro)",
          }}
        >
          {title}
        </span>
        <span
          className="truncate text-sm font-medium"
          style={{ color: "var(--foreground)" }}
        >
          {current.label}
          {current.meta ? (
            <span
              className="ml-2 text-micro"
              style={{ color: "var(--muted-body)" }}
            >
              {current.meta}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
}
