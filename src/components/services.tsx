import {
  Globe,
  Layout,
  ShoppingCart,
  Smartphone,
  Palette,
  Plug,
} from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "./section-heading";

const icons = [Layout, Globe, ShoppingCart, Palette, Smartphone, Plug];

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu negocio necesita online"
          description="Desde la primera landing hasta plataformas complejas. Un solo equipo, un solo interlocutor."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Layout;
            return (
              <article
                key={service.title}
                className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-accent/30 hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
