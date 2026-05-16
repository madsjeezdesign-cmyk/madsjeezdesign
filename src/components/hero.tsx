import {
  ArrowRight,
  CheckCircle2,
  Gauge,
  Sparkles,
  Zap,
} from "lucide-react";
import { site } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-warm/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted shadow-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          Estudio de desarrollo web · {site.address.locality},{" "}
          {site.address.province}
        </div>

        <h1 className="animate-fade-up delay-100 max-w-4xl font-[family-name:var(--font-instrument)] text-4xl leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Sitios web que{" "}
          <span className="gradient-text italic">venden</span> por tu negocio
        </h1>

        <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          {site.tagline}. Landing pages, tiendas online, portfolios y
          aplicaciones con la velocidad y el nivel que tu marca merece.
        </p>

        <div className="animate-fade-up delay-300 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-xl glow-accent"
          >
            Consulta sin compromiso
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#casos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-semibold text-foreground transition-all hover:border-accent/40 hover:shadow-md"
          >
            Ver casos de éxito
          </a>
        </div>

        <ul className="animate-fade-up delay-300 mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {[
            "Presupuesto en 48 h",
            "Código 100% tuyo",
            "Soporte post-lanzamiento",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="animate-fade-up delay-300 relative mt-16 md:mt-20">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
        <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-4 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted">
            {new URL(site.siteUrl).hostname}
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-5">
          <div className="border-b border-border p-6 md:col-span-2 md:border-b-0 md:border-r">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Performance
            </p>
            <p className="mt-2 font-[family-name:var(--font-instrument)] text-3xl text-foreground">
              98/100
            </p>
            <p className="mt-1 text-sm text-muted">Lighthouse Score</p>
            <div className="mt-6 space-y-3">
              {[
                { label: "LCP", value: "0.9s", pct: 92 },
                { label: "FID", value: "12ms", pct: 98 },
                { label: "CLS", value: "0.02", pct: 100 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs text-muted">
                    <span>{m.label}</span>
                    <span className="font-medium text-foreground">{m.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 md:col-span-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-warm">
                  Dashboard cliente
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  Consultas este mes
                </p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-accent-light px-2.5 py-1 text-xs font-semibold text-accent-dark">
                <Zap className="h-3 w-3" />
                +34%
              </div>
            </div>
            <div className="mt-6 flex items-end gap-2 h-32">
              {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-accent to-cyan-400 opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Gauge, label: "Carga", val: "0.8s" },
                { icon: Zap, label: "Conversión", val: "3.2%" },
                { icon: Sparkles, label: "SEO", val: "Top 3" },
              ].map(({ icon: Icon, label, val }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-background p-3 text-center"
                >
                  <Icon className="mx-auto h-4 w-4 text-accent" />
                  <p className="mt-2 text-lg font-bold text-foreground">{val}</p>
                  <p className="text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-4 top-8 hidden rounded-xl border border-border bg-card p-4 shadow-lg md:block">
        <p className="text-2xl font-bold text-accent">+180%</p>
        <p className="text-xs text-muted">consultas · ferretería</p>
      </div>
    </div>
  );
}
