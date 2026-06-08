/**
 * Brand logo system for MadsJeezDesign.
 *
 * Source of truth: M-monogram in a circular badge with electric-cyan glow
 * (matches /public/brand/logo-mark.png).
 *
 * Three exports:
 * - <LogoMark>     — just the circular M badge (use as favicon-ish, header icon)
 * - <LogoHorizontal> — mark + wordmark side by side (use in header / footer)
 * - <LogoVertical> — mark on top of wordmark + tagline (use in hero / OG / about)
 *
 * Built as inline SVG (no PNG dependency, scales crisp, ~2KB each).
 * Brand colors are inherited from CSS tokens (--brand-cyan, --accent).
 */

type SizeProp = { size?: number | string; className?: string };

/* ---------- Mark — just the M-in-circle badge ---------- */

export function LogoMark({ size = 40, className }: SizeProp) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="MadsJeezDesign"
      className={className}
    >
      <defs>
        <linearGradient id="mjBadge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e1a2e" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="mjStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="mjLetter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <circle cx="32" cy="32" r="29" fill="url(#mjBadge)" />
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="url(#mjStroke)"
        strokeWidth="2.5"
      />
      {/* Outer ambient ring — subtle */}
      <circle
        cx="32"
        cy="32"
        r="31"
        fill="none"
        stroke="#22d3ee"
        strokeWidth="0.5"
        opacity="0.4"
      />

      {/* M letter — two parallelograms forming a chevron */}
      <path
        d="M 16 47 L 16 19 L 24 19 L 32 31 L 40 19 L 48 19 L 48 47 L 41 47 L 41 30 L 33 41 L 31 41 L 23 30 L 23 47 Z"
        fill="url(#mjLetter)"
      />
    </svg>
  );
}

/* ---------- Wordmark — "MadsJeezDesign" in Space Grotesk ---------- */

export function Wordmark({
  size = "1.25rem",
  className,
  withTagline = false,
}: {
  size?: string;
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-brand), var(--font-sans), sans-serif",
        fontSize: size,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span style={{ color: "currentColor" }}>
        Mads
        <span style={{ color: "var(--brand-cyan)" }}>Jeez</span>
        Design
      </span>
      {withTagline ? (
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.4em",
            fontWeight: 400,
            letterSpacing: "0.32em",
            marginTop: "0.4em",
            color: "var(--brand-cyan)",
            textTransform: "uppercase",
          }}
        >
          Design · Code · Elevate
        </span>
      ) : null}
    </span>
  );
}

/* ---------- Horizontal — mark + wordmark ---------- */

export function LogoHorizontal({
  size = 36,
  textSize = "1.125rem",
  className,
  withTagline = false,
}: {
  size?: number;
  textSize?: string;
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      <LogoMark size={size} />
      <Wordmark size={textSize} withTagline={withTagline} />
    </span>
  );
}

/* ---------- Vertical — mark stacked over wordmark + tagline ---------- */

export function LogoVertical({
  size = 96,
  textSize = "1.75rem",
  className,
}: {
  size?: number;
  textSize?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <LogoMark size={size} />
      <Wordmark size={textSize} withTagline />
    </span>
  );
}
