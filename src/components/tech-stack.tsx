import { technologies } from "@/lib/data";
import { SectionHeading } from "./section-heading";

const categories = [...new Set(technologies.map((t) => t.category))];

export function TechStack() {
  return (
    <section id="tecnologias" className="border-y border-border bg-surface/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Stack tecnológico"
          title="Herramientas de primer nivel"
          description="Elegimos la tecnología según tu proyecto, no al revés. Esto es lo que dominamos."
        />

        <div className="mt-16 space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((t) => t.category === category)
                  .map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
                    >
                      {tech.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          ¿Necesitás otra tecnología? Consultanos — si tiene documentación y comunidad, podemos evaluarla.
        </p>
      </div>
    </section>
  );
}
