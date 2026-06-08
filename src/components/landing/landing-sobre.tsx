import { site, yearsExperience } from "@/lib/data";

/**
 * Sobre — brand-forward editorial. Wordmark moment at scale, single short
 * paragraph, capability chips instead of paragraph wall. Studio facts on the
 * right read like the back of a business card.
 */
export function LandingSobre() {
  const capabilities = [
    "Diseño UI/UX",
    "Código a medida",
    "E-commerce + pagos",
    "Sistemas internos",
    "SEO técnico",
    "Soporte continuo",
  ];

  return (
    <section
      id="sobre"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-20">
        {/* Left: wordmark + short editorial */}
        <div className="lg:col-span-8">
          <p
            className="text-micro font-[family-name:var(--font-jetbrains)]"
            style={{
              color: "var(--muted-body)",
              letterSpacing: "var(--tracking-micro)",
            }}
          >
            El estudio
          </p>

          {/* Wordmark — the brand identity moment */}
          <div className="mt-6 leading-none">
            <p
              className="font-[family-name:var(--font-instrument)] text-body-strong"
              style={{
                fontSize: "clamp(4.5rem, 13vw, 11rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
              }}
            >
              <span className="italic">Mads</span>
              <span style={{ color: "var(--accent)" }}>·</span>
              <span className="italic">Jeez</span>
            </p>
            <p
              className="mt-3 font-[family-name:var(--font-jetbrains)]"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted-body)",
              }}
            >
              Design Studio · est. {site.foundedYear}
            </p>
          </div>

          {/* Single short paragraph — no wall of text */}
          <p
            className="mt-12 max-w-[44ch] text-body"
            style={{
              fontSize: "1.125rem",
              lineHeight: "var(--leading-body)",
            }}
          >
            Hacemos sitios y sistemas que tus clientes entienden, usan y
            comparten. Sin plantillas. Sin humo.{" "}
            <span className="italic text-body-strong">
              {yearsExperience} años aprendiéndolo en Buenos Aires.
            </span>
          </p>

          {/* Capabilities as hairline-separated chips, NOT cards */}
          <div className="mt-10 max-w-2xl">
            <p
              className="text-micro font-[family-name:var(--font-jetbrains)]"
              style={{
                color: "var(--muted-body)",
                letterSpacing: "var(--tracking-micro)",
              }}
            >
              Lo que hacemos
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {capabilities.map((cap) => (
                <li
                  key={cap}
                  className="flex items-center gap-3 text-sm text-body-strong"
                  style={{
                    paddingTop: "0.625rem",
                    borderTop: "1px solid var(--hairline)",
                  }}
                >
                  <span
                    className="inline-block h-1 w-1 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: studio facts — calling-card feel */}
        <aside className="lg:col-span-4">
          <div
            className="surface-elevated p-7 md:p-8"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            {/* Tiny brand sigil */}
            <div className="flex items-center justify-between">
              <p
                className="text-micro font-[family-name:var(--font-jetbrains)]"
                style={{
                  color: "var(--muted-body)",
                  letterSpacing: "var(--tracking-micro)",
                }}
              >
                Datos del estudio
              </p>
              <span
                aria-hidden
                className="font-[family-name:var(--font-instrument)] italic"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: 1,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                }}
              >
                M·J
              </span>
            </div>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Ubicación
                </dt>
                <dd
                  className="mt-1.5 text-body-strong"
                  style={{ lineHeight: "var(--leading-body)" }}
                >
                  {site.address.locality}
                  <br />
                  {site.address.partido}
                </dd>
              </div>

              <div
                className="pt-5"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <dt
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Horarios
                </dt>
                <dd className="mt-1.5 text-body-strong">{site.hours}</dd>
              </div>

              <div
                className="pt-5"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <dt
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Contacto
                </dt>
                <dd className="mt-2 space-y-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="block text-sm font-medium text-body-strong transition-colors hover:text-[var(--accent)]"
                    style={{
                      transitionDuration: "var(--duration-snap)",
                      transitionTimingFunction: "var(--ease-snap)",
                    }}
                  >
                    {site.email}
                  </a>
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="block text-sm font-medium text-body-strong transition-colors hover:text-[var(--accent)]"
                    style={{
                      transitionDuration: "var(--duration-snap)",
                      transitionTimingFunction: "var(--ease-snap)",
                    }}
                  >
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            {/* Signature line */}
            <div
              className="mt-7 pt-5"
              style={{ borderTop: "1px solid var(--hairline)" }}
            >
              <p
                className="font-[family-name:var(--font-jetbrains)]"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.04em",
                  color: "var(--muted-body)",
                }}
              >
                {site.foundedYear}—{site.activeYear} · MadsJeez Design
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
