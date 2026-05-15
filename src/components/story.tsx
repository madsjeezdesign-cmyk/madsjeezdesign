import { story } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Story() {
  return (
    <section id="historia" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Nuestra historia"
              title={story.title}
              align="left"
            />
            <div className="mt-8 space-y-5">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
              Hitos
            </h3>
            <ol className="mt-8 space-y-6">
              {story.milestones.map((m) => (
                <li key={m.year} className="flex gap-4">
                  <span className="shrink-0 font-[family-name:var(--font-instrument)] text-2xl text-accent">
                    {m.year}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-foreground">
                    {m.event}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-xl bg-warm-light p-4 text-sm leading-relaxed text-foreground">
              <strong className="text-warm">Nuestra promesa:</strong> tratamos tu
              negocio como si fuera el nuestro. Porque en 2019, el primero que nos
              confió fue un vecino — y eso no lo olvidamos.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
