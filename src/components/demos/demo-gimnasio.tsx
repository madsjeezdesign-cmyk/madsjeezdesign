import { Dumbbell, Flame, Trophy, Zap } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoGimnasioLanding() {
  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-demo-montserrat)] text-lime-50">
      <nav className="flex items-center justify-between border-b border-lime-500/20 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-3xl tracking-wider text-lime-400">
          PULSE
        </span>
        <button
          type="button"
          className="bg-lime-400 px-6 py-2 text-xs font-black uppercase tracking-wider text-black"
        >
          Prueba gratis
        </button>
      </nav>

      <header className="relative px-4 py-16 md:px-10 md:py-24">
        <div className="pointer-events-none absolute left-4 top-20 h-64 w-64 skew-x-12 border-4 border-lime-500/20 md:block" />
        <div className="relative mx-auto max-w-4xl">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.4em] text-lime-500">
            Cross · Hyrox · Funcional
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-6xl uppercase leading-[0.9] tracking-wide text-white md:text-9xl">
            Rompé
            <br />
            tu récord
          </h1>
          <p className="mt-8 max-w-2xl text-sm font-medium leading-relaxed text-zinc-400 md:text-base">
            Clases 05:30 a 22:00 con cupos controlados por calidad de coaching. Sala de pesas con plataformas
            certificadas, cinta curve, SkiErg y zona de accesorios. App propia para reservar WOD, registrar
            RM y ver micro-videos de técnica antes de la clase. Hidratación con electrolitos en dispenser y
            café de filtro para el post sin costo en plan full. Si venís de otro box, te hacemos onboarding en
            dos sesiones para alinear escalas y movimientos olímpicos.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:max-w-lg">
            {[
              { n: "24", l: "clases / semana" },
              { n: "400m²", l: "sala + peso" },
              { n: "12", l: "máquinas cardio" },
            ].map((s) => (
              <div key={s.l} className="border border-lime-500/30 bg-lime-500/5 p-4">
                <p className="font-[family-name:var(--font-demo-bebas)] text-2xl text-lime-400">
                  {s.n}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-zinc-950 px-4 py-16 md:px-10">
        <h2 className="font-[family-name:var(--font-demo-bebas)] text-4xl uppercase text-white md:text-5xl">
          Planes demo
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Drop-in",
              price: "$ —",
              feats: ["1 clase", "Locker", "Toalla"],
            },
            {
              name: "Full",
              price: "$$ —",
              feats: ["Ilimitado", "Open gym", "Programa 8 semanas"],
              hot: true,
            },
            {
              name: "Pareja",
              price: "$$ —",
              feats: ["2 membresías", "Nutrición off", "20% shop"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative border p-6 ${
                p.hot
                  ? "border-lime-400 bg-lime-400/10"
                  : "border-zinc-800 bg-black"
              }`}
            >
              {p.hot && (
                <span className="absolute -top-2 right-4 bg-lime-400 px-2 py-0.5 text-[10px] font-black text-black">
                  POPULAR
                </span>
              )}
              <Dumbbell className="h-6 w-6 text-lime-400" />
              <p className="mt-4 font-[family-name:var(--font-demo-bebas)] text-2xl uppercase">
                {p.name}
              </p>
              <p className="mt-2 text-2xl font-black text-lime-400">{p.price}</p>
              <ul className="mt-4 space-y-2">
                {p.feats.map((f) => (
                  <li key={f} className="text-xs text-zinc-400">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        kicker="Entrenamiento inteligente"
        title="No solo sudor: periodización que respeta tu sueño y tu agenda laboral"
        paragraphs={[
          "Nuestros head coaches rotan bloques de fuerza, capacidad aeróbica y velocity en microciclos de 3 semanas con semana de descompresión. Tracking de RPE y vídeos de técnica obligatorios antes de subir carga en movimientos olímpicos demo.",
          "Nutrición deportiva opcional con dietas flexibles y focus en recuperación; franja de movilidad diaria 15 min guiada en piso caliente.",
        ]}
        kickerClass="text-lime-400"
        titleClass="text-white"
        pClass="mt-4 text-sm text-zinc-500"
        sectionClass="bg-black"
      />

      <DemoStatsStrip
        stats={[
          { value: "32", label: "Clases / semana", hint: "Vivos + grabados" },
          { value: "18", label: "Racks", hint: "Eleiko demo" },
          { value: "8", label: "Coaches", hint: "Cred. internacional" },
          { value: "4:30", label: "Primer WOD", hint: "Turno madrugadores" },
        ]}
        sectionClass="border-y border-lime-500/20 bg-zinc-950"
        cardClass="rounded-2xl border border-zinc-800 bg-black/50 p-6"
        valueClass="text-3xl font-black text-lime-400"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500"
        hintClass="mt-1 text-xs text-zinc-600"
      />

      <DemoProcessSteps
        title="Onboarding"
        subtitle="Todos pasan por assessment inicial aunque vengas avanzado: queremos baselines reales."
        steps={[
          { n: "01", t: "Movilidad", d: "Screen FMS adaptado y límites articulares documentados." },
          { n: "02", t: "Strength", d: "RM estimada sin quemar CNS; plan de acceso a zona pesos libres." },
          { n: "03", t: "Objetivo", d: "Hyrox, estética, salud metabólica o rendimiento mixto demo." },
          { n: "04", t: "Check-in 30 d", d: "Ajuste de volumen según adhesión real a clases." },
        ]}
        sectionClass="bg-zinc-950"
        titleClass="text-white"
        subtitleClass="text-zinc-500"
        stepNumClass="text-lime-400"
        cardClass="rounded-2xl border border-zinc-800 bg-black/40 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-zinc-500"
      />

      <DemoDetailGrid
        title="Programas especiales"
        sectionClass="bg-black"
        titleClass="text-white"
        cardClass="rounded-2xl border border-lime-500/20 bg-lime-500/5 p-6"
        itemTitleClass="font-bold text-lime-300"
        itemBodyClass="mt-2 text-sm text-zinc-500"
        items={[
          { title: "Teens athletic", body: "Énfasis en coordinación y educación postural; padres reciben reporte quincenal." },
          { title: "Corporate pack", body: "Facturación empresa + charlas ergonomía y micro pausas activas en oficina demo." },
          { title: "Return to train", body: "Puente con fisio externo para lesiones de hombro y rodilla con clearances." },
          { title: "Competencia interna", body: "Festival trimestral con categorías scaled y RX, jueces propios." },
        ]}
      />

      <DemoLongStory
        kicker="Salud y performance"
        title="Medimos descanso, no solo kilos: adhesión real con semanas de descompresión"
        paragraphs={[
          "Cada trimestre renovemos porcentajes de esfuerzo en levantamientos según test de repetición en fatiga controlada. Integración opcional con wearables demo para correlación sueño–HRV y ajuste de volumen cuando el sistema inmune se deprime por sobreentrenamiento.",
          "Ciclo femenino y menopausia: coaches capacitados en modulación de intensidad; sala femenina con accesorios adicionales y franja solo mujeres martes 20 h. Nutrición deportiva referida con dietista que habla de rendimiento, no de moda.",
          "Hyrox y endurance: sesiones extracurriculares en parque al aire libre con cronometraje y foto finish. Compartimos planilla de carrera para quien corre su primera 10 k o media maratón sin renunciar al box.",
        ]}
        kickerClass="text-lime-500"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-zinc-500"
        sectionClass="bg-zinc-950 border-y border-zinc-800"
      />

      <DemoTestimonials
        title="Atletas"
        sectionClass="bg-zinc-950 border-y border-zinc-800"
        titleClass="text-white"
        cardClass="rounded-2xl border border-zinc-800 bg-black/50 p-6"
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-lime-400"
        quotes={[
          { text: "Bajé 40 s mi 2 k remo en 10 semanas sin lesionarme hombro.", author: "Agu C.", role: "Hyrox demo" },
          { text: "Las clases 05:30 existen de verdad y el coach llega antes.", author: "Mel R.", role: "Medicina" },
          { text: "App con WOD y % programados — no adivinás cargas.", author: "Lucho V.", role: "Dev" },
        ]}
      />

      <DemoFaqList
        title="FAQ"
        sectionClass="bg-black"
        titleClass="text-white"
        qClass="font-bold text-zinc-200"
        aClass="mt-2 text-sm text-zinc-500"
        rowClass="border-b border-zinc-800 py-6 last:border-0"
        items={[
          { q: "¿Lockers?", a: "Smart lock gratis; toalla premium en plan full." },
          { q: "¿Invitado?", a: "Un pase mensual para probar otra disciplina demo." },
          { q: "¿Parking?", a: "200 m cochera convenio 2 h." },
          { q: "Congelación", a: "30 días / año fraccionados con aviso 7 días." },
        ]}
      />

      <section className="flex items-center justify-center gap-4 border-t border-lime-500/20 px-4 py-14 md:gap-10">
        <Flame className="h-8 w-8 text-orange-500" />
        <Zap className="h-8 w-8 text-lime-400" />
        <Trophy className="h-8 w-8 text-amber-400" />
      </section>

      <DemoEnhancements
        slug="gimnasio"
        brandLabel="Pulse Cross"
        shopCardClass="border border-lime-500/25 bg-black/80"
        shopAccentClass="bg-lime-400 font-black text-black"
        sectionClass="border-y border-lime-500/15 bg-zinc-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-zinc-800 bg-black/60 p-6"
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-lime-400"
        extraTestimonialsTitle="Comunidad Pulse"
        extraTestimonials={[
          { text: "El open gym tiene discos competición — raro en la zona.", author: "Pablo", role: "Levantamiento" },
          { text: "Coach me frenó cuando vi la tendinitis venir; eso no tiene precio.", author: "Flor", role: "RX athlete" },
          { text: "CrossFit Kids los sábados — mis hijas duermen rendidas.", author: "Marce", role: "Padre" },
        ]}
      />

      <footer className="py-8 text-center text-xs text-zinc-700">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoGimnasioLanding as DemoGimnasio };
