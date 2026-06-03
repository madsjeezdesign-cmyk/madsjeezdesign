import { MessageSquare, PenTool, Code2, Rocket } from "lucide-react";

/**
 * Process: 4 steps with icons + connectors. No "01/02/03" prefix.
 * Horizontal on desktop, stacked on mobile.
 */
const steps = [
  {
    icon: MessageSquare,
    title: "Brief",
    description:
      "Una charla corta para entender qué vendés y cómo te encuentran.",
  },
  {
    icon: PenTool,
    title: "Diseño",
    description:
      "Wireframe, dirección visual y prototipo navegable antes de tocar código.",
  },
  {
    icon: Code2,
    title: "Desarrollo",
    description:
      "Next.js, TypeScript y revisiones semanales. Ves avances reales.",
  },
  {
    icon: Rocket,
    title: "Lanzamiento",
    description:
      "Dominio, deploy, SEO técnico y soporte acordado post salida.",
  },
];

export function LandingProcess() {
  return (
    <section
      id="proceso"
      className="scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-20">
          <p className="text-micro font-[family-name:var(--font-jetbrains)]">
            Cómo trabajamos
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-instrument)] text-body-strong"
            style={{
              fontSize: "var(--font-size-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-heading)",
            }}
          >
            Un proceso{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>
              corto
            </span>
            , sin sorpresas.
          </h2>
        </div>

        {/* Desktop: horizontal grid w/ connector lines. Mobile: stacked. */}
        <div className="relative">
          {/* Connector line on desktop */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden md:block"
            style={{
              height: "1px",
              background: "var(--hairline)",
              marginLeft: "8%",
              marginRight: "8%",
            }}
          />

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="relative flex flex-col gap-4">
                  <div
                    className="surface-solid relative z-10 flex h-14 w-14 items-center justify-center"
                    style={{
                      borderRadius: "var(--radius-pill)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-[family-name:var(--font-instrument)] text-body-strong"
                      style={{
                        fontSize: "1.5rem",
                        lineHeight: "var(--leading-heading)",
                        letterSpacing: "var(--tracking-heading)",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-2 max-w-[28ch] text-body"
                      style={{ lineHeight: "var(--leading-body)" }}
                    >
                      {s.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
