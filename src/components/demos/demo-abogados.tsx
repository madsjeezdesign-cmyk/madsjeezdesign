import { BookOpen, Briefcase, Scale, Shield } from "lucide-react";
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

const SLUG = "abogados" as const;

export function DemoAbogadosLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex items-start justify-between gap-4 border-b border-amber-900/20 px-6 py-6 md:items-center md:px-16">
        <div className="flex items-center gap-3">
          <Scale className="mt-1 h-6 w-6 shrink-0 text-amber-600 md:mt-0" />
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700 ${h}`}>Estudio jurídico</p>
            <p className={`text-lg text-neutral-100 ${h}`}>Bravo &amp; Asociados</p>
          </div>
        </div>
        <button type="button" className={art.primaryCta}>
          Consulta inicial
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-neutral-500"
        kicker={
          <p className={`text-[10px] uppercase tracking-[0.28em] text-amber-600 ${h}`}>Litigios · contratos · compliance</p>
        }
        title={
          <>
            Defensa estratégica en <span className="text-amber-500">derecho civil</span>, laboral y empresarial
          </>
        }
        lead="Equipo interdisciplinario con más de quince años de actuación. Primera reunión de evaluación sin cargo — agenda coordinada por secretaría."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Agendar llamada
            </button>
            <button type="button" className={art.secondaryCta}>
              Casos de éxito
            </button>
          </>
        }
      />

      <section className="border-y border-neutral-900 bg-neutral-950 px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              icon: Briefcase,
              t: "Empresas",
              d: "Contratos, due diligence y cumplimiento normativo.",
            },
            {
              icon: BookOpen,
              t: "Civil",
              d: "Sucesiones, daños y mediaciones prejudiciales.",
            },
            {
              icon: Shield,
              t: "Laboral",
              d: "Despidos, riesgos y negociaciones colectivas.",
            },
            {
              icon: Scale,
              t: "Litigios",
              d: "Estrategia procesal y seguimiento online del expediente.",
            },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`flex gap-5 border-l-4 border-amber-700/40 py-2 pl-5 ${art.cardShell}`}>
              <I className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h3 className={`text-xl text-white ${h}`}>{t}</h3>
                <p className="mt-2 text-sm text-neutral-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Metodología"
        title="Estrategia procesal con lectura de negocio, no solo de expediente"
        paragraphs={[
          "Armamos cronogramas con hitos probabilísticos y escenarios alternativos para que tomes decisiones con números claros, no con misticismo jurídico. Hacemos diligence express cuando la contraparte apura firmas y documentamos cada variable en tabla comparativa demo.",
          "Trabajo híbrido: reuniones presenciales para cierre de acuerdos sensibles y seguimiento digital con carpeta encriptada para adjuntos que no deben circular por mail personal.",
        ]}
        kickerClass="text-amber-600"
        titleClass="text-white"
        pClass="mt-4 text-sm text-neutral-500"
        sectionClass="bg-neutral-950"
      />

      <DemoStatsStrip
        stats={[
          { value: "15+", label: "Años", hint: "Equipo fundador" },
          { value: "38", label: "Profesionales", hint: "Áreas cruzadas demo" },
          { value: "240", label: "Casos activos", hint: "Promedio trimestral" },
          { value: "92 %", label: "Éxito mediación", hint: "Último año" },
        ]}
        sectionClass="border-y border-neutral-900 bg-[#0a0a0a]"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-amber-500 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-neutral-500"
        hintClass="mt-1 text-xs text-neutral-600"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Consulta inicial"
        subtitle="Evaluamos viabilidad y costos antes de avanzar a etapas caras."
        steps={[
          { n: "01", t: "Brief", d: "Contás hechos cronológicos y entregás documentación base por canal seguro." },
          { n: "02", t: "Diagnóstico", d: "Te devolvemos mapa de riesgos con alternativas extrajudiciales cuando conviene." },
          { n: "03", t: "Propuesta", d: "Fee híbrido o capped hours con hitos firmados demo." },
          { n: "04", t: "Ejecución", d: "Responsable único de cuenta y reporting quincenal al equipo interno." },
        ]}
        sectionClass="bg-neutral-950/80"
        titleClass="text-white"
        subtitleClass="text-neutral-500"
        stepNumClass="text-amber-600"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-neutral-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Industrias que acompañamos"
        sectionClass="bg-[#0f0f0f]"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-amber-500"
        itemBodyClass="mt-2 text-sm text-neutral-500"
        items={[
          { title: "Fintech", body: "Contratos con PSP, políticas AML y disputas con procesadores; coordinación con compliance externo." },
          { title: "Agro export", body: "Litigios por calidad FOB, cauciones y ejecuciones prendarias con asesor fiscal aliado demo." },
          { title: "Salud privada", body: "Responsabilidad civil profesional, convenios con obras sociales y acuerdos de no divulgación." },
          { title: "Real estate", body: "Desalojos, usucapión acelerada y negociación con desarrolladores en obra." },
        ]}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Referencias"
        sectionClass="bg-neutral-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-neutral-400"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600"
        quotes={[
          { text: "Nos salvaron un juicio laboral grupal sin llegar a mediación pública.", author: "COO Retail", role: "Confidencial demo" },
          { text: "Cerraron la adquisición en tiempo cuando el vendor apuraba wire.", author: "CFO SaaS", role: "Serie B" },
          { text: "Informes claros para directorio no abogado.", author: "Presidencia", role: "Industrial" },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        sectionClass="border-t border-neutral-900 bg-black/40"
        titleClass="text-white"
        qClass="font-bold text-neutral-200"
        aClass="mt-2 text-sm text-neutral-500"
        rowClass="border-b border-neutral-800 py-6 last:border-0"
        items={[
          { q: "¿Atienden otras jurisdicciones?", a: "Red de corresponsales en Brasil, Chile y Estados Unidos con fees transparentes." },
          { q: "¿Idiomas?", a: "Inglés y portugués para contratos; traductor público cuando hace falta." },
          { q: "¿Cuotas?", a: "Plan empresa anual con franja de horas y descuento en litigios derivados." },
          { q: "¿Pro bono?", a: "Un caso trimestral seleccionado con impacto social demo." },
        ]}
      />

      <section className="px-6 py-16 text-center md:px-16">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-700 ${h}`}>Confidencialidad</p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-500">
          Toda comunicación queda sujeta a secreto profesional. Entorno seguro para adjuntar documentación.
        </p>
        <button type="button" className={`mt-8 ${art.secondaryCta}`}>
          Solicitar llamado
        </button>
      </section>

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Bravo y Asociados"
        sectionClass="border-y border-amber-900/25 bg-[#0a0a0a]"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-neutral-400"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-600"
        extraTestimonialsTitle="Más clientes"
        extraTestimonials={[
          {
            text: "El informe semanal para directorio fue claro y sin jerga innecesaria.",
            author: "Mariana Solís",
            role: "GC · retail demo",
          },
          {
            text: "Negociaron la indemnización sin ir a juicio en 6 semanas.",
            author: "Héctor V.",
            role: "RRHH industrial",
          },
          {
            text: "Respuesta en menos de 24 h cuando apareció la carta documento.",
            author: "StartLab",
            role: "Cofounder",
          },
        ]}
      />

      <footer className="border-t border-neutral-900 py-8 text-center text-xs text-neutral-700">
        Demo visual · MadsJeez Design · Contenido ficticio
      </footer>
    </div>
  );
}

export { DemoAbogadosLanding as DemoAbogados };
