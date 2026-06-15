import Link from "next/link";
import type { ReactNode } from "react";

/**
 * <PageHeader> — top-of-page hero for non-homepage routes.
 *
 * Use on `/demos`, `/admin`, future sub-pages. Owns:
 *  - optional breadcrumbs row
 *  - eyebrow
 *  - large editorial title (Instrument Serif by default)
 *  - subtitle paragraph
 *  - optional CTA (primary action like "Ver index", "Pedir presupuesto")
 *  - subtle gradient atmosphere (mesh-cyan) behind, opt-out via withAtmosphere
 */
export type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  cta?: { label: string; href: string; variant?: "primary" | "ghost" };
  meta?: ReactNode;
  withAtmosphere?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  cta,
  meta,
  withAtmosphere = true,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b" style={{ borderColor: "var(--hairline)" }}>
      {withAtmosphere ? (
        <>
          <div
            aria-hidden
            className="gradient-mesh-cyan pointer-events-none absolute inset-0 opacity-60"
          />
          <div
            aria-hidden
            className="gradient-hairline-top pointer-events-none absolute inset-x-0 top-0 h-px"
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-micro">
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {b.href ? (
                    <Link
                      href={b.href}
                      className="transition-colors hover:text-[var(--foreground)]"
                      style={{
                        color: "var(--muted-body)",
                        transitionDuration: "var(--duration-snap)",
                      }}
                    >
                      {b.label}
                    </Link>
                  ) : (
                    <span style={{ color: "var(--foreground)" }}>{b.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 ? (
                    <span aria-hidden style={{ color: "var(--muted-body)" }}>
                      /
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[58ch]">
            {eyebrow ? <p className="section-eyebrow mb-4">{eyebrow}</p> : null}
            <h1
              className="font-[family-name:var(--font-instrument)] text-balance"
              style={{
                fontSize: "var(--font-size-display-2)",
                lineHeight: "var(--leading-display)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--foreground)",
              }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p
                className="mt-5 text-body"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "var(--leading-body)",
                  maxWidth: "52ch",
                }}
              >
                {subtitle}
              </p>
            ) : null}
            {meta ? <div className="mt-6">{meta}</div> : null}
          </div>

          {cta ? (
            <Link
              href={cta.href}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                cta.variant === "ghost" ? "surface-solid" : ""
              }`}
              style={{
                background:
                  cta.variant === "ghost" ? undefined : "var(--accent)",
                color: cta.variant === "ghost" ? "var(--foreground)" : "white",
                transitionDuration: "var(--duration-snap)",
              }}
            >
              {cta.label}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
