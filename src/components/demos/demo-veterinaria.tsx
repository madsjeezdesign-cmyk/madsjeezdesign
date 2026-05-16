import { Heart, PawPrint, Scissors, Stethoscope, Syringe } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoVeterinariaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-cyan-950 font-[family-name:var(--font-demo-montserrat)] text-cyan-50">
      <nav className="flex items-center justify-between px-5 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-2xl">
            <PawPrint className="h-5 w-5 text-orange-300" />
          </div>
          <span className="font-bold text-white">
            Patitas <span className="text-teal-300">Sanas</span>
          </span>
        </div>
        <button
          type="button"
          className="rounded-full bg-orange-400 px-5 py-2 text-xs font-bold text-teal-950"
        >
          Turno online
        </button>
      </nav>

      <header className="px-5 pb-16 pt-8 md:px-12 md:pt-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-teal-500/20 bg-teal-900/30 p-8 md:grid md:grid-cols-2 md:items-center md:gap-12 md:p-14">
          <div>
            <h1 className="font-[family-name:var(--font-demo-playfair)] text-4xl font-semibold leading-tight text-white md:text-5xl">
              Cuidamos a tu compañero como{" "}
              <span className="text-orange-300">familia</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-teal-200/80">
              Clínica general, cirugía menor, laboratorio y pet shop con
              alimentos premium. Guardia sábados tarde.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900"
              >
                WhatsApp urgencias
              </button>
              <button
                type="button"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white"
              >
                Ver servicios
              </button>
            </div>
          </div>
          <div className="relative mt-10 flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400/20 to-transparent md:mt-0">
            <Heart className="h-32 w-32 text-orange-300/30" strokeWidth={0.5} />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-teal-950/90 p-4 backdrop-blur">
              <p className="text-xs font-bold text-orange-300">Promo demo</p>
              <p className="text-sm text-white">20% primer consulta + vacuna anual</p>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 md:px-12">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { icon: Stethoscope, t: "Clínica", d: "ECG, radiografías, internación" },
            { icon: Scissors, t: "Peluquería", d: "Perros y gatos, sedación si hace falta" },
            { icon: Syringe, t: "Vacunación", d: "Calendario y recordatorios" },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <I className="h-8 w-8 text-orange-300" />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-2 text-xs text-teal-200/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        kicker="Medicina basada en evidencia"
        title="Historia clínica digital, dolor escala y planes que el humano puede seguir"
        paragraphs={[
          "Cada ingreso genera hoja de ruta con signos vitales, score de dolor canino/felino traducido y fotos de lesión para comparar evolución. Usamos antibióticos solo con cultivo o guiados por protocolo ID cuando la fisiología del paciente lo permite demo.",
          "Pet shop rotativo con lotes trazables y alimento veterinars recetado; grooming con sedación monitorizada en box con oxímetro cuando el temperamento lo exige.",
        ]}
        kickerClass="text-orange-300"
        titleClass="text-white"
        pClass="mt-4 text-sm text-teal-100/75"
        sectionClass="bg-teal-950/80"
      />

      <DemoStatsStrip
        stats={[
          { value: "09:00", label: "Guardia sáb", hint: "Hasta 21 h" },
          { value: "6", label: "Veterinarios", hint: "Rotación guardia" },
          { value: "350m²", label: "Clínica", hint: "Quirófano y RX demo" },
          { value: "24 h", label: "Internación", hint: "Casos estables" },
        ]}
        sectionClass="border-y border-teal-800/50 bg-cyan-950/40"
        cardClass="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        valueClass="text-3xl font-black text-orange-200"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-teal-200/70"
        hintClass="mt-1 text-xs text-teal-200/60"
      />

      <DemoProcessSteps
        title="Primera visita cachorro"
        subtitle="Vacunas, desparasitación y socialización sana desde el inicio."
        steps={[
          { n: "01", t: "Pesar", d: "Curva de crecimiento por raza mixta si aplica." },
          { n: "02", t: "Vacunar", d: "Esquema adaptado si vive en edificio vs quinta demo." },
          { n: "03", t: "Chip", d: "Registro nacional y pegatina en carnet." },
          { n: "04", t: "Educar", d: "Charla mordida jug y horarios de comida." },
        ]}
        sectionClass="bg-teal-900/30"
        titleClass="text-white"
        subtitleClass="text-teal-200/70"
        stepNumClass="text-orange-300"
        cardClass="rounded-2xl border border-white/10 bg-white/5 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-teal-100/70"
      />

      <DemoDetailGrid
        title="Especialidades"
        sectionClass="bg-gradient-to-b from-teal-950 to-cyan-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-white/10 bg-black/20 p-6"
        itemTitleClass="font-bold text-orange-200"
        itemBodyClass="mt-2 text-sm text-teal-100/70"
        items={[
          { title: "Odontología", body: "Extracciones con tacos loco-regionales y lavado bajo sedación supervisada." },
          { title: "Dermatitis alérgicas", body: "Intradermoreacción o dieta eliminación con seguimiento fotográfico demo." },
          { title: "Geriatría", body: "Manejo dolor crónico multimodal sin sobre opioidar." },
          { title: "Travel certificate", body: "Certificados internacionales con vacunas y desparasitación al día." },
        ]}
      />

      <DemoTestimonials
        title="Familias"
        sectionClass="border-y border-teal-800/40 bg-teal-950/50"
        titleClass="text-white"
        cardClass="rounded-2xl border border-white/10 bg-white/5 p-6"
        quoteClass="text-sm italic text-teal-50/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-orange-300"
        quotes={[
          { text: "Me explicaron la ecografía sin tecnicismos imposibles.", author: "Paula M.", role: "Gata persa demo" },
          { text: "Respetan cuando digo que mi perro odia la balanza.", author: "Seba K.", role: "Border collie" },
          { text: "Recordatorios de vacuna por WhatsApp.", author: "Vicky L.", role: "Dos caniches" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        sectionClass="bg-cyan-950/60"
        titleClass="text-white"
        qClass="font-bold text-teal-100"
        aClass="mt-2 text-sm text-teal-200/70"
        rowClass="border-b border-white/10 py-6 last:border-0"
        items={[
          { q: "¿Urgencias domingo?", a: "Derivación a centro aliado con ambulancia propia hasta medianoche demo." },
          { q: "¿Planes preventivos?", a: "Wellness senior con descuentos en estudios de rutina y grooming incluido 1 vez al año." },
          { q: "¿Exóticos?", a: "Conejos y aves pequeñas viernes AM con turno especial; reptiles derivamos." },
          { q: "¿Alimentos?", a: "Si abrís bolsa en el acto y no gustó, crédito store dentro de 7 días demo." },
        ]}
      />

      <DemoEnhancements
        slug="veterinaria"
        brandLabel="Patitas Sanas"
        shopCardClass="border border-teal-500/25 bg-teal-950/50"
        shopAccentClass="bg-orange-400 font-bold text-teal-950"
        sectionClass="border-y border-teal-800/40 bg-teal-950/60"
        titleClass="text-white"
        cardClass="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        quoteClass="text-sm italic text-teal-100/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-orange-300"
        extraTestimonialsTitle="Familias y criadores"
        extraTestimonials={[
          {
            text: "El plan senior de mi rottie incluye analítica con descuento — súper útil.",
            author: "Gaby N.",
            role: "Dos perros",
          },
          {
            text: "Guardia de sábado nos salvó cuando vomitó el hilo dental.",
            author: "Nico",
            role: "Gato europeo",
          },
          {
            text: "Trajeron alimento urinary sin que se los pidiera; conocen al paciente.",
            author: "Vet Sur",
            role: "Criadero demo",
          },
        ]}
      />

      <footer className="px-5 py-10 text-center text-xs text-teal-700 md:px-12">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoVeterinariaLanding as DemoVeterinaria };
