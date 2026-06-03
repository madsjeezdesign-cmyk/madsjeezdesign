import { site, whatWeDo } from "@/lib/data";

/**
 * About — editorial. First sentence as pull-quote (Instrument Serif),
 * remaining body in Plus Jakarta. Studio facts on the right.
 */
export function LandingSobre() {
  const [first, ...rest] = whatWeDo.paragraphs;

  // Pull first sentence out for the editorial moment.
  const splitIdx = first.indexOf(". ");
  const pullQuote =
    splitIdx > 0 ? first.slice(0, splitIdx + 1) : first;
  const firstRest = splitIdx > 0 ? first.slice(splitIdx + 1).trim() : "";

  return (
    <section
      id="sobre"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--hairline)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: editorial copy */}
        <div className="lg:col-span-8">
          <p className="text-micro font-[family-name:var(--font-jetbrains)]">
            Sobre el estudio
          </p>

          <p
            className="mt-6 font-[family-name:var(--font-instrument)] text-balance text-body-strong"
            style={{
              fontSize: "var(--font-size-display-2)",
              lineHeight: "var(--leading-display)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            {pullQuote}
          </p>

          <div className="mt-8 space-y-5 max-w-[62ch]">
            {firstRest ? (
              <p
                className="text-body"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "var(--leading-body)",
                }}
              >
                {firstRest}
              </p>
            ) : null}
            {rest.map((p) => (
              <p
                key={p}
                className="text-body"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "var(--leading-body)",
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right: studio facts */}
        <aside className="lg:col-span-4">
          <div
            className="surface-solid p-8"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <p className="text-micro font-[family-name:var(--font-jetbrains)]">
              Datos del estudio
            </p>

            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Ubicación
                </dt>
                <dd
                  className="mt-1 text-body-strong"
                  style={{ lineHeight: "var(--leading-body)" }}
                >
                  {site.address.locality}
                  <br />
                  {site.address.partido}
                  <br />
                  {site.address.province}, {site.address.country}
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
                <dd className="mt-1 text-body-strong">{site.hours}</dd>
              </div>

              <div
                className="pt-5"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <dt
                  className="text-micro font-[family-name:var(--font-jetbrains)]"
                  style={{ color: "var(--muted-body)" }}
                >
                  Fundado
                </dt>
                <dd
                  className="mt-1 font-[family-name:var(--font-instrument)] text-body-strong"
                  style={{
                    fontSize: "1.75rem",
                    lineHeight: 1,
                    letterSpacing: "var(--tracking-heading)",
                  }}
                >
                  {site.foundedYear}
                </dd>
              </div>
            </dl>

            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid var(--hairline)" }}
            >
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
                className="mt-1 block text-sm font-medium text-body-strong transition-colors hover:text-[var(--accent)]"
                style={{
                  transitionDuration: "var(--duration-snap)",
                  transitionTimingFunction: "var(--ease-snap)",
                }}
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
