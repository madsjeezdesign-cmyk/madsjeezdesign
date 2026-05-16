import { Guitar, Mic, Music, Music2, Users } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoMusicaLanding() {
  return (
    <div className="min-h-screen bg-violet-950 font-[family-name:var(--font-demo-montserrat)] text-violet-50">
      <nav className="flex items-center justify-between border-b border-fuchsia-500/30 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-2xl tracking-wider text-fuchsia-400">
          PENTAGRAMA
        </span>
        <button type="button" className="rounded-full bg-fuchsia-500 px-5 py-2 text-xs font-bold text-violet-950">
          Inscripción 2026
        </button>
      </nav>

      <header className="relative overflow-hidden px-4 pb-16 pt-12 md:px-10">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center md:text-left">
          <h1 className="font-[family-name:var(--font-demo-bebas)] text-6xl uppercase leading-none text-white md:text-8xl">
            Música
            <br />
            <span className="text-fuchsia-400">en serio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-violet-200/80 md:mx-0 md:text-base">
            Piano, guitarra, canto, batería, ensambles de jazz y orquesta
            juvenil demo. Metodología por objetivos con grabación trimestral de
            progreso. Salas insonorizadas, préstamo de instrumento para primer
            mes y recitales familiares en teatro propio de 80 butacas.
          </p>
        </div>
      </header>

      <DemoLongStory
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
          <div key={t} className="rounded-2xl border border-fuchsia-500/25 bg-violet-950/60 p-6">
            <I className="h-7 w-7 text-fuchsia-400" />
            <h3 className="mt-3 font-bold">{t}</h3>
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
        cardClass="rounded-2xl border border-fuchsia-500/20 bg-black/30 p-6"
        valueClass="text-3xl font-black text-fuchsia-400"
      />

      <DemoProcessSteps
        title="Inscripción"
        steps={[
          { n: "01", t: "Trial 20 min", d: "Sin costo para conocer alumnado y nivel previo." },
          { n: "02", t: "Plan de estudio", d: "Frecuencia semanal o quincenal + material digital." },
          { n: "03", t: "Cuota y becas", d: "Hermano 15% off; beca social demo con documentación." },
          { n: "04", t: "Seguimiento", d: "Repos grabados en plataforma si faltás con aviso 24 h." },
        ]}
        sectionClass="bg-violet-950/80"
        stepNumClass="text-fuchsia-400"
      />

      <DemoDetailGrid
        title="Cursos y talleres"
        items={[
          { title: "Rock band lab", body: "Arreglos en grupo, ensayo con click y show en vivo al cierre del cuatrimestre demo." },
          { title: "Producción en casa", body: "DAW, MIDI, samples legales y mezcla básica en auriculares." },
          { title: "Trinity & ABRSM prep", body: "Examen internacional opcional con coach de examen simulado." },
          { title: "Adultos 40+", body: "Horarios al mediodía; repertorio cancionero argentino y bossa." },
        ]}
        itemTitleClass="text-fuchsia-300"
        itemBodyClass="text-violet-200/65"
      />

      <DemoTestimonials
        title="Familias"
        quotes={[
          { text: "Mi hija pasó de ver videos a tocar en un escenario real; eso no tiene precio.", author: "Vero Salas", role: "Madre de alumna" },
          { text: "Retomé piano a los 52 sin sentirme fuera de lugar.", author: "Gustavo Prieto", role: "Contador" },
          { text: "El ensamble de jazz le dio amigos para toda la vida.", author: "Leo", role: "Alumno 17 años" },
        ]}
        sectionClass="bg-fuchsia-950/20"
      />

      <DemoFaqList
        title="Preguntas"
        items={[
          { q: "¿Necesito instrumento propio?", a: "Préstamo inicial incluido; luego lista de compra ajustada al presupuesto." },
          { q: "¿Hay clases grupales baratas?", a: "Sí, introducción a ritmo y uke en grupos de 5." },
          { q: "¿Reagendan por viaje?", a: "Hasta 2 clases por trimestre congeladas sin costo demo." },
          { q: "¿Online?", a: "Híbrido disponible para teoría y piano con tecla ponderada en casa." },
        ]}
      />

      <section className="flex flex-wrap items-center justify-center gap-4 bg-fuchsia-600 py-10">
        <Music className="h-10 w-10 text-white" />
        <Users className="h-10 w-10 text-white" />
        <p className="font-[family-name:var(--font-demo-bebas)] text-2xl uppercase text-white">Open day sábado demo · cupo 40 familias</p>
      </section>

      <footer className="py-8 text-center text-xs text-violet-800">Demo · MadsJeez Design</footer>
    </div>
  );
}

export { DemoMusicaLanding as DemoMusica };
