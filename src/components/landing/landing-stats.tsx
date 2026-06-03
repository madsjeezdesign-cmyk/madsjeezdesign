/**
 * Stats row — no cards, hairline separators, Instrument Serif numerals.
 * Sits between hero and trabajos. Total height ≤ 120px.
 */
export function LandingStats() {
  const items = [
    { value: "17", suffix: "años", label: "Estudio activo desde 2009" },
    { value: "90+", suffix: "", label: "Proyectos publicados" },
    { value: "6", suffix: "industrias", label: "Comercio, salud, hotelería, B2B" },
  ];

  return (
    <section
      aria-label="Indicadores del estudio"
      className="px-6 md:px-10"
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex flex-col justify-center gap-2 py-8 md:py-10"
            style={{
              borderLeft:
                i === 0
                  ? "none"
                  : "1px solid var(--hairline)",
              paddingLeft: i === 0 ? 0 : "2rem",
              paddingRight: "2rem",
            }}
          >
            <div className="flex items-baseline gap-3">
              <span
                className="font-[family-name:var(--font-instrument)] text-body-strong"
                style={{
                  fontSize: "var(--font-size-h2)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                {item.value}
              </span>
              {item.suffix ? (
                <span
                  className="font-[family-name:var(--font-instrument)] italic"
                  style={{
                    color: "var(--muted-body)",
                    fontSize: "1.25rem",
                    letterSpacing: "var(--tracking-heading)",
                  }}
                >
                  {item.suffix}
                </span>
              ) : null}
            </div>
            <span className="text-micro font-[family-name:var(--font-jetbrains)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
