import { Calendar, Microscope, Smile, Sparkles, Stethoscope } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";

export function DemoOdontologiaLanding() {
  return (
    <div className="min-h-screen bg-sky-950 font-[family-name:var(--font-demo-montserrat)] text-sky-50">
      <nav className="flex items-center justify-between border-b border-sky-500/30 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-playfair)] text-xl font-semibold text-white">
          Sonrisa <span className="text-sky-400">Studio</span> Dental
        </span>
        <button type="button" className="rounded-full bg-sky-500 px-5 py-2 text-xs font-bold text-sky-950">
          Reservar valoración
        </button>
      </nav>

      <header className="px-4 pb-16 pt-14 md:px-10 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400">
            <Smile className="h-4 w-4" /> Odontología integral · diagnóstico digital
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase text-white md:text-7xl">
            Sonrisas
            <br />
            <span className="text-sky-400">con ciencia y estética</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-sky-200/75 md:text-base">
            Implantes, ortodoncia invisible demo, blanqueamiento supervisado y
            rehabilitaciones sobre dientes y implantes. Radiografías intraorales y
            tomografía convexa en el mismo turno de evaluación. Financiación en
            cuotas con tarjetas y planes acordes a tratamiento.
          </p>
        </div>
      </header>

      <DemoLongStory
        kicker="Protocolo clínico"
        title="Bioseguridad y seguimiento post-tratamiento"
        paragraphs={[
          "Cada sillón cuenta con sistema de aspiración independiente y eliminación de instrumental por estación de ultrasonido y horno demo. Los pacientes inmunocomprometidos reciben turno en franja exclusiva con previo cuestionario de salud.",
          "Tras cirugías de implantes o extracciones complejas, enviamos video instructivo y WhatsApp de guardia 48 h para consultas urgentes. Las revisiones de mantenimiento de higiene se agendan automáticamente cada 4–6 meses.",
        ]}
        kickerClass="text-sky-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-sky-200/70"
        sectionClass="bg-sky-950/60"
      />

      <section className="border-y border-sky-500/20 px-4 py-14 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: Microscope, t: "Microscopía operatoria", d: "Tratamientos de conducto con visualización ampliada demo para mayor precisión." },
            { icon: Sparkles, t: "Estética dental", d: "Carillas mínimamente invasivas y diseño digital de sonrisa antes de tocar el diente." },
            { icon: Calendar, t: "Ortodoncia", d: "Alineadores y brackets auto-ligables; app de seguimiento de uso." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-sky-500/30 bg-sky-900/40 p-6">
              <I className="h-7 w-7 text-sky-400" />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-sky-200/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoStatsStrip
        stats={[
          { value: "6", label: "Sillones", hint: "Dos quirúrgicos" },
          { value: "15+", label: "Especialistas", hint: "Implantología perio" },
          { value: "98%", label: "Protocolos cerrados", hint: "Checklist esterilización" },
          { value: "24h", label: "Guardia demo", hint: "Trauma dentario agudo" },
        ]}
        sectionClass="bg-sky-900/30"
        cardClass="rounded-2xl border border-sky-500/20 bg-sky-950/70 p-6"
        valueClass="text-3xl font-black text-sky-400"
        labelClass="mt-2 text-[11px] font-bold uppercase text-sky-200/70"
        hintClass="mt-1 text-xs text-sky-300/50"
      />

      <DemoProcessSteps
        title="Primera visita"
        subtitle="Evaluación sin compromiso con plan de tratamiento por etapas."
        steps={[
          { n: "01", t: "Anamnesis y clínica", d: "Historia médica, fotos intraorales y escáner para modelo virtual." },
          { n: "02", t: "Diagnóstico por especialidad", d: "Periodoncia, endodoncia u ortodonia según hallazgos. Informe comprensible en PDF." },
          { n: "03", t: "Presupuesto desglosado", d: "Opciones por etapa con prioridad de dolor y función antes de estética si el paciente lo requiere." },
          { n: "04", t: "Inicio o derivación", d: "Coordinamos con anestesista si hace falta sedación consciente demo." },
        ]}
        sectionClass="bg-sky-950/80"
      />

      <DemoDetailGrid
        title="Tratamientos destacados"
        items={[
          { title: "Implantes carga inmediata", body: "Protocolo All-on-X demo para arcos edéntulos: provisional fijo el mismo día de cirugía con controles nutricionales." },
          { title: "Bruxismo y ATM", body: "Placas de descarga personalizadas, botox masticatorio en casos seleccionados y fisio asociada." },
          { title: "Odontopediatría", body: "Sala con video ceiling, selladores de fosas y manejo conductual sin contenimiento forzado." },
          { title: "Urgencias", body: "Luxaciones, luxaciones alvéolo-dentarias y abscesos drenados con antibiótico según protocolo." },
        ]}
        titleClass="text-white"
        cardClass="rounded-2xl border border-sky-500/25 bg-sky-900/35 p-6"
        itemTitleClass="font-bold text-sky-300"
        itemBodyClass="mt-2 text-sm text-sky-100/70"
      />

      <DemoTestimonials
        title="Opiniones"
        quotes={[
          { text: "Me explicaron cada fase del implante con simulación 3D. Sin sorpresas en el presupuesto.", author: "Diego Coria", role: "Ingeniero" },
          { text: "Llevaba miedo al dentista desde chico; acá usaron sedación leve y fue manejable.", author: "Micaela Ruiz", role: "Diseñadora" },
          { text: "Los niños tienen stickers y la doctora habla su idioma.", author: "Familia Benavídez", role: "Pacientes frecuentes" },
        ]}
        sectionClass="bg-sky-900/25"
      />

      <DemoFaqList
        title="FAQ"
        items={[
          { q: "¿Atienden obras sociales?", a: "Convenios rotativos demo; pedí lista actualizada por WhatsApp antes del turno." },
          { q: "¿Duelen los implantes?", a: "Postquirúrgico controlado con analgesia escalonada y enfriamiento local. Cada caso tiene instructivo escrito." },
          { q: "¿Trabajan fines de semana?", a: "Sábados mañana para ortodoncia y limpiezas; urgencias vía WhatsApp de guardia." },
          { q: "¿Blanqueamiento en consultorio?", a: "Sí, con aislamiento de encía y lámpara LED; casa complementaria solo bajo supervisión." },
        ]}
        sectionClass="border-t border-sky-800/40 bg-black/20"
      />

      <section className="flex items-center justify-center gap-3 bg-sky-600 px-4 py-12">
        <Stethoscope className="h-10 w-10 text-white/90" />
        <p className="font-[family-name:var(--font-demo-bebas)] text-2xl uppercase text-white md:text-3xl">
          Valoración + radiografía demo incluida en agosto
        </p>
      </section>

      <footer className="py-10 text-center text-xs text-sky-800">Demo visual · MadsJeez Design</footer>
    </div>
  );
}

export { DemoOdontologiaLanding as DemoOdontologia };
