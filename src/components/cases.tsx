import { TrendingUp } from "lucide-react";
import { cases } from "@/lib/data";
import { SectionHeading } from "./section-heading";

export function Cases() {
  return (
    <section id="casos" className="bg-inverse-bg py-24 text-inverse-fg md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Casos de éxito"
          title="Resultados reales, no promesas"
          description="Comercios y empresas que confiaron en nosotros y midieron el impacto."
          align="center"
          variant="dark"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {cases.map((c) => (
            <article
              key={c.client}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-teal-300">
                    {c.industry}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{c.client}</h3>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-teal-500/20 px-3 py-1 text-sm font-semibold text-teal-300">
                  <TrendingUp className="h-4 w-4" />
                  {c.result}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {c.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {c.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 p-4">
                    <p className="text-xs text-slate-400">{m.label}</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      {m.before !== "—" && (
                        <span className="text-sm text-slate-500 line-through">
                          {m.before}
                        </span>
                      )}
                      <span className="text-lg font-bold text-white">
                        {m.after}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-slate-400">{c.period}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
