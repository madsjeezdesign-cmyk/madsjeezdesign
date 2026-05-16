import { Guitar, Mic, Music, Music2, Users } from "lucide-react";
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

const SLUG = "musica" as const;

export function DemoMusicaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug="musica"
        brand="PENTAGRAMA"
        iconKey="Music"
        variant="dark"
        primaryCta="Inscripción 2026"
        primaryCtaClass={art.primaryCta}
      />


      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-violet-200/80"
        kicker={
          <div className="flex items-center justify-center gap-2 text-fuchsia-400 opacity-90 sm:justify-start">
            <Music className="h-5 w-5" />
            <span className={`text-[10px] uppercase tracking-[0.35em] ${h}`}>Conservatorio · bandas · producción</span>
          </div>
        }
        title={
          <>
            Música
            <br />
            <span className="text-fuchsia-400">en serio</span>
          </>
        }
        lead="Piano, guitarra, canto, batería, ensambles de jazz y orquesta juvenil demo. Metodología por objetivos con grabación trimestral de progreso. Salas insonorizadas, préstamo de instrumento para primer mes y recitales familiares en teatro propio de 80 butacas."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Probar clase
            </button>
            <button type="button" className={art.secondaryCta}>
              Ver sedes
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Propuesta pedagógica"
        title="Lectura, oído y escena desde el primer mes"
        paragraphs={[
          "No enseñamos solo ‘temas’: trabajamos técnica gradual, teoría aplicada y improvisación guiada según edad. Los grupos de banda adolescente ensayan con técnico de sonido para entender monitores y másters demo.",
          "Padres reciben informe breve con videos privados: tres objetivos cumplidos y uno siguiente. Así evitamos sorpresas antes de invertir en instrumento definitivo.",
        ]}
        kickerClass="text-fuchsia-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-violet-200/75"
        sectionClass="bg-violet-900/30"
      />

      <section className="grid gap-4 border-y border-fuchsia-500/20 px-4 py-12 md:grid-cols-3 md:px-10">
        {[
          { icon: Guitar, t: "Cuerdas y folk", d: "Ukelele a partir de 6 años; guitarra eléctrica con backing tracks." },
          { icon: Mic, t: "Canto moderno", d: "Respiración diafragmática, registro mixto y mic técnica en vivo." },
          { icon: Music2, t: "Teoría y audición", d: "Solfeo movido, armonía pop y transcripción por oído." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-6 ${art.cardShell}`}>
            <I className="h-7 w-7 text-fuchsia-400" />
            <h3 className={`mt-3 font-bold text-white ${h}`}>{t}</h3>
            <p className="mt-2 text-sm text-violet-300/70">{d}</p>
          </div>
        ))}
      </section>

      <DemoStatsStrip
        stats={[
          { value: "480", label: "Alumnos", hint: "Todas las sedes" },
          { value: "32", label: "Docentes", hint: "Titulados y session players" },
          { value: "14", label: "Salas", hint: "Acústica tratada" },
          { value: "2", label: "Shows / año", hint: "Teatro propio" },
        ]}
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-fuchsia-400 ${h}`}
        sectionClass="border-y border-fuchsia-500/20 bg-black/20"
        labelClass="mt-2 text-[11px] font-bold uppercase text-violet-300/80"
        hintClass="mt-1 text-xs text-violet-400/60"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Inscripción"
        steps={[
          { n: "01", t: "Trial 20 min", d: "Sin costo para conocer alumnado y nivel previo." },
          { n: "02", t: "Plan de estudio", d: "Frecuencia semanal o quincenal + material digital." },
          { n: "03", t: "Cuota y becas", d: "Hermano 15% off; beca social demo con documentación." },
          { n: "04", t: "Seguimiento", d: "Repos grabados en plataforma si faltás con aviso 24 h." },
        ]}
        sectionClass="bg-violet-950/80"
        titleClass="text-white"
        stepNumClass="text-fuchsia-400"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-violet-300/80"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Cursos y talleres"
        items={[
          { title: "Rock band lab", body: "Arreglos en grupo, ensayo con click y show en vivo al cierre del cuatrimestre demo." },
          { title: "Producción en casa", body: "DAW, MIDI, samples legales y mezcla básica en auriculares." },
          { title: "Trinity & ABRSM prep", body: "Examen internacional opcional con coach de examen simulado." },
          { title: "Adultos 40+", body: "Horarios al mediodía; repertorio cancionero argentino y bossa." },
        ]}
        itemTitleClass="font-bold text-fuchsia-300"
        itemBodyClass="mt-2 text-sm text-violet-200/65"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Familias"
        quotes={[
          { text: "Mi hija pasó de ver videos a tocar en un escenario real; eso no tiene precio.", author: "Vero Salas", role: "Madre de alumna" },
          { text: "Retomé piano a los 52 sin sentirme fuera de lugar.", author: "Gustavo Prieto", role: "Contador" },
          { text: "El ensamble de jazz le dio amigos para toda la vida.", author: "Leo", role: "Alumno 17 años" },
        ]}
        sectionClass="bg-fuchsia-950/20"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-violet-100/85"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-fuchsia-400"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Preguntas"
        items={[
          { q: "¿Necesito instrumento propio?", a: "Préstamo inicial incluido; luego lista de compra ajustada al presupuesto." },
          { q: "¿Hay clases grupales baratas?", a: "Sí, introducción a ritmo y uke en grupos de 5." },
          { q: "¿Reagendan por viaje?", a: "Hasta 2 clases por trimestre congeladas sin costo demo." },
          { q: "¿Online?", a: "Híbrido disponible para teoría y piano con tecla ponderada en casa." },
        ]}
        titleClass="text-white"
        qClass="font-bold text-violet-100"
        aClass="mt-2 text-sm text-violet-300/80"
      />

      <section className="flex flex-wrap items-center justify-center gap-4 bg-fuchsia-600 py-10">
        <Music className="h-10 w-10 text-white" />
        <Users className="h-10 w-10 text-white" />
        <p className={`text-center text-2xl uppercase text-white ${h}`}>Open day sábado demo · cupo 40 familias</p>
      </section>

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Pentagrama"
        shopCardClass="border border-violet-500/30 bg-black/50"
        shopAccentClass="bg-fuchsia-500 font-bold text-white"
        sectionClass="border-y border-violet-500/20 bg-violet-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-violet-100/85"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-fuchsia-400"
        extraTestimonialsTitle="Alumnos y padres"
        extraTestimonials={[
          { text: "Mi hijo practicó Trinity sin sentir examen de tortura.", author: "Caro P.", role: "Madre demo" },
          { text: "Sala de ensayo con backline lista para la muestra anual.", author: "Tomi", role: "Batería" },
          { text: "Profes de rock sin snobismo con los clásicos.", author: "Leo", role: "Adulto iniciante" },
        ]}
      />

      <footer className="py-8 text-center text-xs text-violet-800">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoMusicaLanding as DemoMusica };
