import { process } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Proceso transparente, sin sorpresas"
          description="Sabés en qué etapa está tu proyecto en todo momento."
        />

        <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.step} className="relative">
              {i < process.length - 1 && (
                <span
                  className="absolute top-8 left-full hidden h-px w-full bg-border lg:block"
                  aria-hidden
                />
              )}
              <span className="font-[family-name:var(--font-instrument)] text-5xl text-accent/30">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
