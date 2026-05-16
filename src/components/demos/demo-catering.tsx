import { ChefHat, Flame, Salad, Utensils } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoDetailGrid, DemoFaqList, DemoStatsStrip } from "./demo-common-sections";
import { DemoBrandNav } from "./demo-brand-nav";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "catering" as const;

export function DemoCateringLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug={SLUG}
        brand="Origen"
        iconKey="ChefHat"
        primaryCta="Brief online"
        primaryCtaClass={art.primaryCta}
      />

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-red-50"
        leadColorClass="text-red-100/55"
        kicker={
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500">Banquetes · cóctel · plant based</p>
        }
        title={
          <>
            Catering que
            <br />
            <span className="text-red-500">se ve en plato</span>
          </>
        }
        lead="Marcas B2B buscan pricing por persona, matrices dietéticas en PDF y storytelling de brigada en sitio. Esta demo separa propuesta gourmet de logística: timelines por hora, checklist HACCP visible y carrito tipo destacado para packs corporativos."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Armá tu menú
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver casos
            </button>
          </>
        }
      />

      <section className="relative px-4 py-12 md:px-10">
        <div className="absolute inset-0 -z-10 bg-[repeating-linear-gradient(-8deg,transparent,transparent_36px,rgba(127,29,29,0.08)_36px,rgba(127,29,29,0.08)_37px)]" />
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-900/50 bg-black/40 p-8 backdrop-blur md:p-12">
          <h2 className={`${h} text-center text-3xl text-red-50 md:text-4xl`}>Menú por flujo de sala</h2>
          <div className="mt-10 space-y-8">
            {[
              { icon: Salad, t: "Recepción vegana", lines: ["Finger plant based", "Etiquetado alérgenos demo", "Servicio tray estático"] },
              { icon: Utensils, t: "Plato principal", lines: ["Parrilla baja y reloj de cocción", "Guarniciones en cast iron", "Glaseados calientes en vivo"] },
              { icon: Flame, t: "Postre & bar", lines: ["Estación chocolate", "Coctelería sin alcohol", "Cierre con petit four"] },
            ].map((b) => (
              <div key={b.t} className="flex flex-col gap-4 border-b border-red-900/40 pb-8 last:border-0 md:flex-row md:items-start">
                <b.icon className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className={`${h} text-xl text-red-100`}>{b.t}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-red-100/55">
                    {b.lines.map((l) => (
                      <li key={l}>• {l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoStatsStrip
        eyebrow="Operación eventos"
        stats={[
          { value: "350", label: "Pax boda pico", hint: "Equipo 18 personas demo" },
          { value: "38", label: "Camiones fríos", hint: "Ruta triple temperatura" },
          { value: "0", label: "Quejas HACCP", hint: "2025 cohorte demo" },
          { value: "45'", label: "Setup sala", hint: "Plan maestro hora a hora" },
        ]}
        sectionClass="border-y border-red-900/40"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl ${h} text-red-500`}
        labelClass="mt-2 text-[11px] font-bold uppercase text-red-200/50"
        hintClass="mt-1 text-xs text-red-200/30"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Por qué RRHH elige Origen"
        titleClass="text-red-50"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-red-400"
        itemBodyClass="mt-2 text-sm text-red-100/55"
        items={[
          { title: "Briefing digital", body: "Formularios con presupuesto guía y adjunto de branding corporativo." },
          { title: "Dress code staff", body: "Lookbook unificado y código QR a manuales internos." },
          { title: "Métricas post-evento", body: "NPS por segmento y fotos filtradas listas para LinkedIn." },
          { title: "Pagos mixtos", body: "Split facturación HQ + filiales en un solo checkout demo." },
        ]}
      />

      <section className="px-4 py-16 md:px-10">
        <div className={`mx-auto flex max-w-5xl flex-col items-center gap-6 p-10 text-center ${art.cardShell}`}>
          <ChefHat className="h-10 w-10 text-red-500" />
          <p className={`${h} text-2xl text-red-50`}>Chef ejecutivo disponible 20 min</p>
          <p className="max-w-xl text-sm text-red-100/55">
            Call to action típico de alto ticket: combina valor percibido y mínima fricción antes del formulario final.
          </p>
          <button type="button" className={art.primaryCta}>
            Coordinar videollamada
          </button>
        </div>
      </section>

      <DemoFaqList
        sectionHeadingClass={h}
        title="Compliance"
        items={[
          { q: "¿Cocinan libre de TACC?", a: "Estación segregada con cadena demo documentada para auditorías." },
          { q: "¿Facturación electrónica?", a: "Integración con múltiples CUITs y centros de costo." },
        ]}
        sectionClass="bg-black/50"
        titleClass="text-red-50"
        qClass="font-bold text-red-100"
        aClass="mt-2 text-sm text-red-100/50"
        rowClass="border-b border-red-900/40 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Banquetes Origen"
        shopCardClass="border border-red-800/50 bg-red-950/40"
        shopAccentClass="bg-red-600 font-bold text-white"
        sectionClass="bg-[#0a0404]"
        titleClass="text-red-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-red-100/65"
        authorClass="mt-4 text-xs font-bold text-red-500"
        extraTestimonials={[{ text: "El layout featured separó cóctel de plato fuerte visualmente.", author: "HR Tech", role: "Cliente demo" }]}
      />

      <footer className="py-8 text-center text-xs text-red-900/60">Demo · Banquetes Origen</footer>
    </div>
  );
}

export { DemoCateringLanding as DemoCatering };
