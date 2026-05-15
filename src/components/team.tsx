import { team } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Team() {
  return (
    <section id="equipo" className="border-t border-border bg-surface/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Equipo"
          title="Personas reales detrás de cada proyecto"
          description="No subcontratamos a desconocidos. Conocés a quien escribe tu código."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                {member.initials}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-accent">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
