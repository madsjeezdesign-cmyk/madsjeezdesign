import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

/**
 * Editorial long-list — NOT a 3-col card grid. Each row: mono number left,
 * service title + description center, hint right. Hairlines between rows.
 */
export function LandingServicios() {
  // Map services to small hints, kept short. Matched 1:1 by index.
  const hints = [
    "desde proyecto",
    "stack moderno",
    "Mercado Pago · Stripe",
    "branding web",
    "TS · APIs · DB",
    "WhatsApp · ERPs",
  ];

  return (
    <section
      id="servicios"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{
        background: "var(--surface)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-micro font-[family-name:var(--font-jetbrains)]">
            Lo que hacemos
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Seis disciplinas, una misma{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              vara
            </span>
            .
          </h2>
          <p
            className="mt-5 max-w-[60ch] text-body"
            style={{ lineHeight: "var(--leading-body)" }}
          >
            Hacemos pocas cosas, bien. Cada proyecto pasa por el mismo proceso de
            diseño, código y revisión. Sin tercerizar, sin atajos.
          </p>
        </div>

        {/* Long-list */}
        <ul
          className="hairline overflow-hidden"
          style={{ borderRadius: "var(--radius-lg)", background: "var(--card)" }}
        >
          {services.map((s, i) => {
            const numLabel = `.0${i + 1}`;
            const hint = hints[i] ?? "";
            return (
              <li
                key={s.title}
                className="group"
                style={{
                  borderTop:
                    i === 0 ? "none" : "1px solid var(--hairline)",
                }}
              >
                <a
                  href="#contacto"
                  className="grid grid-cols-12 items-start gap-4 px-6 py-8 transition-colors hover:bg-[var(--surface)] md:gap-6 md:px-10 md:py-10"
                  style={{
                    transitionDuration: "var(--duration-snap)",
                    transitionTimingFunction: "var(--ease-snap)",
                  }}
                >
                  {/* Mono number */}
                  <span
                    className="col-span-2 text-micro font-[family-name:var(--font-jetbrains)] md:col-span-1"
                    style={{ paddingTop: "0.35rem" }}
                  >
                    {numLabel}
                  </span>

                  {/* Title + description */}
                  <div className="col-span-10 md:col-span-8">
                    <h3
                      className="font-[family-name:var(--font-instrument)] text-body-strong transition-colors group-hover:text-[var(--accent)]"
                      style={{
                        fontSize: "1.625rem",
                        lineHeight: "var(--leading-heading)",
                        letterSpacing: "var(--tracking-heading)",
                        transitionDuration: "var(--duration-snap)",
                        transitionTimingFunction: "var(--ease-snap)",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-2 max-w-[60ch] text-body"
                      style={{ lineHeight: "var(--leading-body)" }}
                    >
                      {s.description}
                    </p>
                    {/* Highlights as light tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center rounded-full px-2.5 py-1 text-micro font-[family-name:var(--font-jetbrains)]"
                          style={{
                            background: "var(--surface)",
                            border: "1px solid var(--hairline)",
                            color: "var(--muted-body)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hint + arrow */}
                  <div className="col-span-12 flex items-center justify-end gap-3 md:col-span-3">
                    <span
                      className="hidden text-micro font-[family-name:var(--font-jetbrains)] md:inline"
                      style={{ color: "var(--muted-body)" }}
                    >
                      {hint}
                    </span>
                    <span
                      className="surface-solid flex h-9 w-9 shrink-0 items-center justify-center transition-colors group-hover:bg-[var(--accent)] group-hover:text-white"
                      style={{
                        borderRadius: "var(--radius-pill)",
                        transitionDuration: "var(--duration-snap)",
                        transitionTimingFunction: "var(--ease-snap)",
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
