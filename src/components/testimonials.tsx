import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.author}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <Quote className="h-8 w-8 text-accent/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border pt-6">
                <cite className="not-italic">
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
