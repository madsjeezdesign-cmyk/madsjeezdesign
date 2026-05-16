import { Eye, Glasses, HeartPulse, Scan, Volume2 } from "lucide-react";
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
import { DemoBrandNav } from "./demo-brand-nav";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "optica" as const;

export function DemoOpticaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug="optica"
        brand="VISIÓN+"
        iconKey="Glasses"
        variant="dark"
        primaryCta="Turno online"
        primaryCtaClass={art.primaryCta}
      />

      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent md:mx-10" />

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-sky-100/70"
        kicker={
          <p className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-sky-400 ${h}`}>
            <Eye className="h-4 w-4" /> Optometría · audición · obras sociales
          </p>
        }
        title={
          <>
            Salud visual y auditiva en <span className="text-sky-400">un mismo lugar</span>
          </>
        }
        lead="Examen optométrico computerizado, adaptación de lentes progresivos digitales demo, lentes de contacto especializados y gabinete de baja visión. Audiometría en cabina insonorizada y audífonos con Bluetooth rechargeable. Stock de armazones de diseñador y línea económica con garantía de adaptación 30 días."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Reservar examen
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver armazones
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Cuidado integral"
        title="Protocolos clínicos y taller de montaje en el local"
        paragraphs={[
          "Cada historia clínica incluye agudeza binocular, tonometría sin contacto y mapa corneal para descartar contraindicaciones antes de recetar. Para pacientes con presbicia avanzada mostramos simulación digital de campos de visión por diseño de lente.",
          "Taller interno con centrado tridimensional y verificación de prismatic effect. Repuestos originales y política de reclamo express si la montura no tolera el script demo.",
        ]}
        kickerClass="text-sky-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-sky-100/75"
        sectionClass="bg-sky-950/30"
      />

      <section className="grid gap-4 border-y border-slate-800 px-4 py-12 md:grid-cols-4 md:px-10">
        {[
          { icon: Scan, t: "Screening", d: "OCT opcional y campo visual automatizado." },
          { icon: Eye, t: "Lentes", d: "Freeform, office, deportivos y filtro pantalla." },
          { icon: Volume2, t: "Audio", d: "Programación fina por audiólogo matriculado." },
          { icon: HeartPulse, t: "Obras sociales", d: "Autorizaciones online y facturación directa demo." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-5 ${art.cardShell}`}>
            <I className="h-6 w-6 text-sky-400" />
            <p className={`mt-2 font-bold text-white ${h}`}>{t}</p>
            <p className="mt-1 text-xs text-sky-200/60">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "22", label: "Sucursales", hint: "Red demo" },
          { value: "35'", label: "Examen promedio", hint: "Con dilatación opcional" },
          { value: "4.9", label: "NPS", hint: "Último trimestre" },
          { value: "12", label: "Laboratorios", hint: "Prioridad surtido" },
        ]}
        valueClass={`text-3xl font-black text-sky-400 ${h}`}
        cardClass={`p-6 ${art.cardShell}`}
        sectionClass="border-y border-slate-800 bg-slate-900/30"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Tu primer visita"
        steps={[
          { n: "01", t: "Recepción", d: "Carga de obra social y antecedentes oculares." },
          { n: "02", t: "Examen", d: "Optometría + recomendación de lentes o derivación." },
          { n: "03", t: "Selección", d: "Armazón según puente, altura pupilar y estilo de vida." },
          { n: "04", t: "Entrega", d: "Ajuste biomecánico y educación de limpieza de lentes." },
        ]}
        stepNumClass="text-sky-400"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-sky-200/70"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Soluciones"
        items={[
          { title: "Miodesopsias", body: "Educación paciente y seguimiento; derivación a retinólogo de red si corresponde demo." },
          {
            title: "Lentes progresivos",
            body: "Diseño personalizado según postura frente a pantalla, mapa de lectura y garantía de rehacer graduación 60 días.",
          },
          { title: "Niños", body: "Control cada 6 meses, filtros para recreo y lentes fotochromáticos." },
          { title: "Audífonos", body: "Préstamos demo 15 días y app de afinado remoto." },
        ]}
        itemTitleClass="font-bold text-sky-300"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemBodyClass="mt-2 text-sm text-sky-100/80"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Pacientes"
        quotes={[
          { text: "Por fin entendí por qué los progresivos anteriores me mareaban.", author: "Laura Q.", role: "Contadora" },
          { text: "Me aprobaron la orden de obras sociales en el acto.", author: "Seba Pérez", role: "Jubilado demo" },
          { text: "El audífono con Bluetooth cambió mis reuniones.", author: "Ing. Roldán", role: "Tech" },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-sky-100/88"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-sky-400"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        items={[
          { q: "¿Traigo receta?", a: "Sí, o realizamos examen completo si está vencida." },
          { q: "¿Stock de armazones?", a: "Más de 2.000 referencias entre titanium, acetato y rimless." },
          { q: "¿Turnos urgentes?", a: "Guardia visión los sábados AM en sucursal cabecera demo." },
          { q: "¿Garantía?", a: "Antirreflejo 12 meses contra decapado por defecto de fabricación." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-slate-200"
        aClass="mt-2 text-sm text-sky-200/75"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Visión Clara"
        shopCardClass="border border-sky-500/30 bg-slate-900/65"
        shopAccentClass="bg-sky-500 font-bold text-slate-950"
        sectionClass="border-y border-sky-900/35 bg-slate-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-sky-100/88"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-sky-400"
        extraTestimonialsTitle="Pacientes"
        extraTestimonials={[
          { text: "Progresivos que no me marean al bajar la escalera.", author: "Laura Q.", role: "Contadora" },
          { text: "Autorización obra social en el acto — milagro.", author: "Seba P.", role: "Jubilado demo" },
          { text: "Audífono Bluetooth sin whistles en reuniones.", author: "Ing. Roldán", role: "Tech lead" },
        ]}
      />

      <footer className="py-10 text-center text-xs text-slate-700">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoOpticaLanding as DemoOptica };
