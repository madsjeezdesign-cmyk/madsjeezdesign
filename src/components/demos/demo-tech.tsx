import { Box, Cpu, Lock, Rocket, Sparkles } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import {
  DEMO_HEADING_CLASS,
  demoBodyStyle,
  getDemoArtDirection,
} from "@/lib/demo-art-direction";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "tech" as const;

export function DemoTechLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={`relative ${art.pageRoot}`}>
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-violet-500/10 bg-slate-950/80 px-5 py-4 backdrop-blur-md md:px-10">
        <span className={`flex items-center gap-2 text-sm font-bold text-white ${h}`}>
          <Cpu className="h-5 w-5 text-violet-400" />
          NexoLab
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-slate-500 md:inline">Docs</span>
          <button type="button" className={art.primaryCta}>
            Empezar trial
          </button>
        </div>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-slate-400"
        kicker={
          <div className="mx-auto inline-flex w-max items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-300 md:mx-0">
            <Sparkles className="h-3 w-3" /> Nuevo · API v2
          </div>
        }
        title={
          <>
            Orquestá integraciones
            <br />
            <span className="bg-gradient-to-b from-violet-200 to-slate-400 bg-clip-text text-transparent">
              sin boilerplate
            </span>
          </>
        }
        lead="Conectores listos, webhooks firmados y panel para tu equipo de soporte. SLA 99,9% en plan Business — demo con datos sintéticos."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Crear cuenta gratis
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver documentación
            </button>
          </>
        }
      />

      <section className="relative z-10 mx-auto mt-6 max-w-5xl px-5 pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Box,
              t: "SDK TypeScript",
              d: "Types generados, retries y ejemplos copy-paste.",
            },
            {
              icon: Lock,
              t: "Compliance",
              d: "Logs encriptados y roles por workspace.",
            },
            {
              icon: Rocket,
              t: "Edge ready",
              d: "Deploy en multi-región con un click.",
            },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-6 backdrop-blur-md ${art.cardShell}`}>
              <I className="h-6 w-6 text-cyan-400" />
              <p className={`mt-4 font-bold text-white ${h}`}>{t}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{d}</p>
            </div>
          ))}
        </div>

        <div className={`mt-8 overflow-hidden p-6 text-left text-xs text-violet-300/90 backdrop-blur ${art.cardShell} font-mono`}>
          <p className="text-slate-500">$ nexolab init --project demo</p>
          <p className="mt-1 text-emerald-400">✓ Connected · 3 environments</p>
          <p className="mt-1 text-slate-400">→ Dashboard: https://app.nexolab.demo</p>
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Plataforma"
        title="Menos glue code: conectores mantenidos y observabilidad de extremo a extremo"
        paragraphs={[
          "Cada conector tiene contrato versionado semver, sandbox con fixtures y alertas si el vendor cambia auth sin aviso. Exportamos OpenTelemetry a tu stack APM existente o te damos dashboard hosted 90 días demo.",
          "Soporte humano en canal Slack compartido con SLA según tier; runbooks públicos para incidentes conocidos de proveedores terceros.",
        ]}
        kickerClass="text-violet-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-slate-400"
        sectionClass="relative z-10 bg-slate-950/80"
      />

      <DemoStatsStrip
        stats={[
          { value: "99,95%", label: "Uptime trimestral", hint: "Business plan" },
          { value: "140ms", label: "P50 API", hint: "Región LATAM demo" },
          { value: "3200+", label: "Equipos", hint: "Activos" },
          { value: "48 h", label: "Onboarding", hint: "Con dev interno" },
        ]}
        sectionClass="relative z-10 border-y border-slate-800 bg-slate-900/50"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-cyan-400 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-500"
        hintClass="mt-1 text-xs text-slate-600"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Seguridad y compliance"
        subtitle="SOC2 type II en marcha; compartimos letter progress trimestral."
        steps={[
          { n: "01", t: "SSO", d: "SAML/OIDC con forced MFA y SCIM user provisioning demo." },
          { n: "02", t: "Secretos", d: "Vault rotativo; nunca persistimos API keys en texto plano." },
          { n: "03", t: "Datos", d: "Residencia configurable; purge job certificable." },
          { n: "04", t: "Pen test", d: "Reporte externo anual + retest obligatorio." },
        ]}
        sectionClass="relative z-10 bg-slate-950/90"
        titleClass="text-white"
        subtitleClass="text-slate-500"
        stepNumClass="text-violet-400"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-slate-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Roadmap público"
        sectionClass="relative z-10 bg-slate-900/30"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-violet-300"
        itemBodyClass="mt-2 text-sm text-slate-500"
        items={[
          { title: "Q3 · GraphQL federation", body: "Agregación de esquemas con rate limit por tenant y persisted queries." },
          { title: "Q4 · AI copilot interno", body: "Generación de mappings sugeridos con revisión humana obligatoria demo." },
          { title: "2027 · On-prem airgap", body: "Imágenes firmadas y updates por USB para entornos regulados." },
          { title: "Siempre · Changelog", body: "Semver estricto, deprecation window mínimo 9 meses en APIs públicas." },
        ]}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Equipos de plataforma"
        sectionClass="relative z-10 border-y border-slate-800 bg-slate-950/50"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-violet-400"
        quotes={[
          { text: "Reemplazó 4 scripts bash frágiles por una sola línea en CI.", author: "Lead SRE", role: "Fintech demo" },
          { text: "El preview environment por PR nos salvó un outing de keys.", author: "CTO", role: "Logística" },
          { text: "Vendor lock-in bajó porque migraron connector sin downtime.", author: "Architect", role: "Retail" },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        sectionClass="relative z-10 border-t border-slate-800 bg-black/40"
        titleClass="text-white"
        qClass="font-bold text-slate-200"
        aClass="mt-2 text-sm text-slate-500"
        rowClass="border-b border-slate-800 py-6 last:border-0"
        items={[
          { q: "¿Precio por evento?", a: "Tiered con rollover y alertas antes de soft limit demo." },
          { q: "¿Self-host?", a: "K8s helm chart GA; soporte enterprise con ventana P1 30 min." },
          { q: "¿GDPR-like?", a: "DPA estándar + sub-processors publicados." },
          { q: "¿Capacitación?", a: "Workshop live inicial + certificación interna para partners." },
        ]}
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="NexoLab Software"
        shopCardClass="border border-violet-500/25 bg-slate-900/60"
        shopAccentClass="bg-violet-600 font-bold text-white"
        sectionClass="relative z-10 border-y border-violet-500/15 bg-slate-950/80"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-slate-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-violet-400"
        extraTestimonialsTitle="Equipos de ingeniería"
        extraTestimonials={[
          { text: "El SDK nos ahorró 3 sprints de wrappers HTTP.", author: "Staff Eng", role: "Pagos" },
          { text: "SLO publicado y alertas que no spamean.", author: "SRE Lead", role: "Adtech demo" },
          { text: "Onboarding en menos de lo prometido.", author: "VP Eng", role: "Logística" },
        ]}
      />

      <footer className="relative z-10 mt-12 py-10 text-center text-xs text-slate-600">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoTechLanding as DemoTech };
