import type { ReactNode } from "react";

/**
 * <SectionWrapper> — consistent section chrome.
 *
 * Use for any homepage / page section. Owns:
 *  - vertical padding (py-24 / md:py-32)
 *  - max-width container
 *  - optional eyebrow + h2 + description header block
 *  - background variant (default | surface | inverse)
 *
 * NOT a replacement for section-specific layouts (Hero, Bento). It's
 * the shared chrome around them.
 */
export type SectionWrapperProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  background?: "default" | "surface" | "inverse";
  align?: "left" | "center";
  /** Anchor link in the header, e.g. { label: "Ver todos", href: "/demos" } */
  headerCta?: { label: string; href: string };
  /** Skip the default top padding (use when stacked on another section) */
  flushTop?: boolean;
  className?: string;
};

export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
  background = "default",
  align = "left",
  headerCta,
  flushTop = false,
  className = "",
}: SectionWrapperProps) {
  const bg =
    background === "surface"
      ? "var(--surface)"
      : background === "inverse"
        ? "var(--inverse-bg)"
        : "var(--background)";
  const fg =
    background === "inverse" ? "var(--inverse-fg)" : "var(--foreground)";

  const showHeader = Boolean(eyebrow || title || description || headerCta);

  return (
    <section
      id={id}
      className={`scroll-mt-24 px-6 ${flushTop ? "pb-24 md:pb-32" : "py-24 md:py-32"} md:px-10 ${className}`}
      style={{ background: bg, color: fg }}
    >
      <div className="mx-auto max-w-7xl">
        {showHeader ? (
          <div
            className={`mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16 ${
              align === "center" ? "flex-col items-center text-center" : ""
            }`}
          >
            <div className={align === "center" ? "max-w-2xl" : ""}>
              {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
              {title ? (
                <h2
                  className="mt-3 font-[family-name:var(--font-instrument)]"
                  style={{
                    fontSize: "var(--font-size-h1)",
                    lineHeight: "var(--leading-heading)",
                    letterSpacing: "var(--tracking-heading)",
                    color: fg,
                  }}
                >
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p
                  className="mt-4 text-body max-w-[60ch]"
                  style={{ fontSize: "1.0625rem" }}
                >
                  {description}
                </p>
              ) : null}
            </div>
            {headerCta && align !== "center" ? (
              <a
                href={headerCta.href}
                className="group inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{
                  color: fg,
                  transitionDuration: "var(--duration-snap)",
                }}
              >
                {headerCta.label}
                <span
                  aria-hidden
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
