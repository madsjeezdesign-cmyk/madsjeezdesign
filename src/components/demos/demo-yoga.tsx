import { CalendarHeart, Flower2, Moon, Wind } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoFaqList, DemoLongStory, DemoTestimonials } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "yoga" as const;

export function DemoYogaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-10">
        <span className={`${h} text-2xl text-violet-950`}>Mat Lumen</span>
        <div className="hidden gap-8 text-xs font-semibold uppercase tracking-widest text-violet-600/80 md:flex">
          <span>Horarios</span>
          <span>Profes</span>
          <span>Empresas</span>
        </div>
        <button type="button" className={art.primaryCta}>
          Probar clase
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-violet-950"
        leadColorClass="text-violet-900/70"
        kicker={
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-violet-600">
            <Wind className="h-4 w-4" /> Respiración · alineación · datos de bienestar
          </p>
        }
        title={
          <>
            Tu estudio,
            <br />
            <span className="text-violet-600">ordenado como calma</span>
          </>
        }
        lead="Los centros de movement buscan web accesible, agenda legible y propuestas B2B HR. Esta demo mezcla tipografía aireada, tabla semanal táctil y storytelling sobre límites de aforo — sin sensación spa genérico."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver grilla semanal
            </button>
            <button type="button" className={art.secondaryCta}>
              Plan wellness corp
            </button>
          </>
        }
      />

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white/80 shadow-lg">
          <div className="grid grid-cols-5 gap-px bg-violet-100 text-[10px] font-bold uppercase tracking-wider text-violet-600">
            {["Lun", "Mar", "Mié", "Jue", "Vie"].map((d) => (
              <div key={d} className="bg-violet-50 py-3 text-center">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5">
            {[
              { t: "Vinyasa 7 h", s: "Prof. Ana" },
              { t: "Pilates mat", s: "Lucas" },
              { t: "Yin + sound", s: "Mar" },
              { t: "Power lunch", s: "Ana" },
              { t: "Restaurativo", s: "Equipo" },
            ].map((c) => (
              <div key={c.t} className="border-t border-violet-100 p-4 sm:border-t-0 sm:border-l sm:first:border-l-0">
                <p className={`${h} text-base text-violet-950`}>{c.t}</p>
                <p className="mt-1 text-xs text-violet-600/70">{c.s}</p>
                <button type="button" className="mt-3 text-[10px] font-bold uppercase tracking-wider text-violet-500 underline-offset-4 hover:underline">
                  reservar demo
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { icon: CalendarHeart, t: "HR friendly", d: "Reporte de utilización mensual para people teams." },
            { icon: Moon, t: "After-office", d: "Clases dim light con lista de espera transparente." },
            { icon: Flower2, t: "Retiros", d: "Landing modular con itinerario descargable." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-8 ${art.cardShell}`}>
              <I className="h-8 w-8 text-violet-500" />
              <h3 className={`mt-4 ${h} text-xl text-violet-950`}>{t}</h3>
              <p className="mt-2 text-sm text-violet-900/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Contenidos wellness"
        title="Educación sin saturar al alumno nuevo"
        paragraphs={[
          "Bloques acordeón con FAQs de lesiones, props de apoyo y reglas de estudio — SEO long tail para principiantes curiosos.",
          "Video vertical embebido solo tras consentimiento de cookies marketing: muestra compliance sin romper estética.",
        ]}
        kickerClass="text-violet-600"
        titleClass="text-violet-950"
        pClass="mt-4 text-sm leading-relaxed text-violet-900/75"
        sectionClass="border-y border-violet-200 bg-violet-50/50"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Voces de la sala"
        quotes={[
          { text: "La grilla en cards nos ayudó a migrar de Excel sin perder alumnos mayores.", author: "Caro", role: "Dueña estudio demo" },
          { text: "HR pidió métricas y acá las vimos en dashboard exportable.", author: "Tomás", role: "People Ops" },
        ]}
        sectionClass="bg-white/60"
        titleClass="text-violet-950"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-violet-800/80"
        authorClass="mt-4 text-xs font-bold uppercase text-violet-600"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        items={[
          { q: "¿Hay arriendo de mat?", a: "Sí, stock visible en tienda demo con depósito reembolsable." },
          { q: "¿Clases en inglés?", a: "Toggle de idioma en ficha de profes — listo para tribus expat." },
        ]}
        sectionClass="bg-violet-100/30"
        titleClass="text-violet-950"
        qClass="font-bold text-violet-950"
        aClass="mt-2 text-sm text-violet-800/80"
        rowClass="border-b border-violet-200 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Mat Lumen"
        shopCardClass="border border-violet-200 bg-white"
        shopAccentClass="bg-violet-600 text-white"
        sectionClass="bg-violet-50/40"
        titleClass="text-violet-950"
        cardClass="rounded-3xl border border-violet-200 bg-white p-6"
        quoteClass="text-sm italic text-violet-800"
        authorClass="mt-4 text-xs font-bold uppercase text-violet-600"
        extraTestimonials={[{ text: "El shop minimal mostró passes sin intimidar.", author: "Lu", role: "Alumna" }]}
      />

      <footer className="px-4 py-8 text-center text-xs text-violet-600/60">Demo · Mat Lumen</footer>
    </div>
  );
}

export { DemoYogaLanding as DemoYoga };
