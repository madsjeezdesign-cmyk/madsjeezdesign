import { Clock, HeartPulse, Pill, ShieldPlus, Stethoscope, Truck } from "lucide-react";
import {
  DemoDetailGrid,
  DemoFaqList,
  DemoLongStory,
  DemoProcessSteps,
  DemoStatsStrip,
  DemoTestimonials,
} from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";

export function DemoFarmaciaLanding() {
  return (
    <div className="min-h-screen bg-emerald-950 font-[family-name:var(--font-demo-montserrat)] text-emerald-50">
      <nav className="flex items-center justify-between border-b border-emerald-500/30 px-4 py-4 md:px-10">
        <span className="flex items-center gap-2 font-[family-name:var(--font-demo-playfair)] text-xl font-semibold text-white">
          <Pill className="h-6 w-6 text-emerald-400" />
          Farmacia Del Parque
        </span>
        <button type="button" className="rounded-full bg-emerald-500 px-5 py-2 text-xs font-bold text-emerald-950">
          Pedir por WhatsApp
        </button>
      </nav>

      <header className="relative px-4 pb-16 pt-14 md:px-10 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <p className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            <HeartPulse className="h-4 w-4" /> Farmacia de atención personalizada
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase text-white md:text-7xl">
            Tu salud,
            <br />
            <span className="text-emerald-400">sin vueltas</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-emerald-200/70 md:text-base">
            Dispensación de medicamentos con receta, vacunatorios demo, venta de
            ortopedia liviana y cosmética dermocosmética con asesoría. Turno web
            para evitar fila: te avisamos por SMS cuando tu pedido está listo.
            Coberturas de obras sociales y prepagas según convenio vigente.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-950">
              Sacar turno electrónico
            </button>
            <button type="button" className="rounded-xl border border-white/30 px-6 py-3 text-sm font-bold text-white">
              Ver horarios de vacunación
            </button>
          </div>
        </div>
      </header>

      <DemoLongStory
        kicker="Compromiso con la comunidad"
        title="Cuidado farmacéutico y trazabilidad"
        paragraphs={[
          "Trabajamos con proveedores autorizados ANMAT y registramos lotes en sistema interno demo. Si un medicamento requiere cadena de frío, usamos bolsones térmicos rotulados y entregamos con instructivo de conservación.",
          "Nuestro equipo puede orientarte en genéricos bioequivalentes, horarios de antibióticos y interacciones básicas; las consultas complejas derivamos al prescrittore o a guardia. También tenemos servicio de compresas, alquiler de muletas y TENS demo con seña.",
        ]}
        kickerClass="text-emerald-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-emerald-200/75 md:text-base"
        sectionClass="bg-emerald-950/80"
      />

      <section className="border-y border-emerald-500/20 px-4 py-14 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: Truck, t: "Delivery cubierto", d: "Mismo día pedidos antes de 11 h. Medicamentos controlados con verificación DNI demo." },
            { icon: Clock, t: "Farmacia 24 h", d: "Guardia nocturna fines de semana en sucursal Av. Demo (mapa en contacto)." },
            { icon: Stethoscope, t: "Vacunatorio", d: "Antigripales, fiebre amarilla y refuerzos según calendario nacional actualizado." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl border border-emerald-500/20 bg-emerald-900/30 p-6">
              <I className="h-7 w-7 text-emerald-400" />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-emerald-200/65">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoStatsStrip
        eyebrow="Indicadores operativos demo"
        stats={[
          { value: "18", label: "Años de servicio", hint: "Dos locales en la zona" },
          { value: "92%", label: "Pedidos sin demora", hint: "Stock de alto giro" },
          { value: "450m²", label: "Salón + depósito", hint: "Cadena de frío segregada" },
          { value: "12", label: "Obras convenio", hint: "Actualización mensual" },
        ]}
        sectionClass="border-y border-emerald-800/40 bg-black/20"
        cardClass="rounded-2xl border border-emerald-500/15 bg-emerald-950/60 p-6"
        valueClass="text-3xl font-black text-emerald-400"
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-emerald-200/70"
        hintClass="mt-1 text-xs text-emerald-300/50"
      />

      <DemoProcessSteps
        title="Tu pedido paso a paso"
        subtitle="Flujo transparente para recetas y productos de venta libre."
        steps={[
          { n: "01", t: "Carga de receta o búsqueda", d: "Subís foto legible o traés físico. Validamos cobertura contra padrón de la obra social demo." },
          { n: "02", t: "Dispensación y auditoría", d: "Farmacéutico controla dosis, principio activo y duplicados terapéuticos." },
          { n: "03", t: "Preparación y alerta", d: "Te avisamos por WhatsApp o mail cuando esté listo para retiro o envío." },
          { n: "04", t: "Entrega y consejos", d: "Breve charla sobre conservación, si aplica, y folletería de efectos adversos frecuentes." },
        ]}
        sectionClass="bg-emerald-900/25"
        titleClass="text-white"
        subtitleClass="text-emerald-200/60"
        stepNumClass="text-emerald-400"
        cardClass="rounded-2xl border border-emerald-500/20 bg-emerald-950/50 p-6"
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm leading-relaxed text-emerald-200/60"
      />

      <DemoDetailGrid
        title="Categorías y servicios anexos"
        items={[
          { title: "Medicinal alópata y OTC", body: "Analgésicos, antialérgicos, protectores gástricos y sprays nasales. Sugerimos alternativas de marca según disponibilidad y tu bolsillo." },
          { title: "Dermocosmética", body: "Protectores solares con reemplazo anual, limpiadores para piel sensible y antiage con ácidos — siempre con muestra tester demo." },
          { title: "Ortopedia y home care", body: "Medias de compresión graduada, collares cervicales blandos, caminadores y alquiler de equipos de asistencia." },
          { title: "Salud sexual y bienestar", body: "Preservativos, tests rápidos demo y referencias a centros de salud para seguimiento." },
        ]}
        titleClass="text-white"
        cardClass="rounded-2xl border border-emerald-500/15 bg-emerald-900/20 p-6"
        itemTitleClass="font-bold text-emerald-300"
        itemBodyClass="mt-2 text-sm leading-relaxed text-emerald-100/65"
      />

      <DemoTestimonials
        title="Experiencias de pacientes"
        quotes={[
          { text: "Me guardaron el antibiótico en heladera con mi nombre grande y me explicaron tomarlo lejos de la leche.", author: "Carla Meneses", role: "Vecina del barrio demo" },
          { text: "Turno online funciona: entré, saqué número y salí en 12 minutos.", author: "Rubén López", role: "Jubilado OSDE demo" },
          { text: "La chica de dermocosmética me armó rutina simple para rosácea sin venderme diez productos.", author: "Inés Porta", role: "Docente" },
        ]}
        sectionClass="bg-emerald-950/70"
        titleClass="text-white"
        cardClass="rounded-2xl border border-white/10 bg-black/25 p-6"
        quoteClass="text-sm italic text-emerald-100/85"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-400/80"
      />

      <DemoFaqList
        title="Preguntas frecuentes"
        items={[
          { q: "¿Reemplazan medicamentos si no hay stock?", a: "Ofrecemos bioequivalentes autorizados y avisamos al médico si la receta no admite cambio. Podés dejar número de contacto para reposición." },
          { q: "¿Venden medicación para viajes?", a: "Sí: antimaláricos y profilaxis según indicación médica. Requiere receta y tiempo de encargo según importación demo." },
          { q: "¿Facturan a empresa?", a: "Con convenio y CUIT verificado. Enviamos factura electrónica al mail de compras." },
          { q: "¿Aceptan transferencias?", a: "Sí; para medicamentos controlados puede requerirse identificación adicional según normativa local." },
        ]}
        sectionClass="border-t border-emerald-800/30 bg-black/30"
        titleClass="text-white"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm text-emerald-200/65"
      />

      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-14 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <ShieldPlus className="h-14 w-14 text-white/30" />
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/90">Campaña demo</p>
              <p className="mt-1 font-[family-name:var(--font-demo-bebas)] text-3xl uppercase text-white">20% ortopedia seleccionada</p>
            </div>
          </div>
          <button type="button" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-emerald-800">
            Reservar oferta
          </button>
        </div>
      </section>

      <DemoEnhancements
        slug="farmacia"
        brandLabel="Farmacia Del Parque"
        shopCardClass="border border-emerald-500/30 bg-emerald-950/70"
        shopAccentClass="bg-green-500 font-bold text-emerald-950"
        sectionClass="border-y border-emerald-800/30 bg-emerald-950"
        titleClass="text-white"
        cardClass="rounded-2xl border border-white/10 bg-emerald-900/40 p-6"
        quoteClass="text-sm italic text-emerald-50/90"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-green-400"
        extraTestimonialsTitle="Pacientes y tutores"
        extraTestimonials={[
          { text: "Turno web sin cola y medicamentos fraccionados sin drama.", author: "Abuela Lila", role: "Jubilada demo" },
          { text: "Recordatorio WhatsApp de la vacuna del bebé.", author: "Flor", role: "Mamá primeriza" },
          { text: "Bioequivalente explicado por la farmacéutica, no por Google.", author: "Tom R.", role: "Obra social" },
        ]}
      />

      <footer className="px-4 py-10 text-center text-xs text-emerald-800 md:px-10">
        Demo visual · MadsJeez Design · Contenido ficticio
      </footer>
    </div>
  );
}

export { DemoFarmaciaLanding as DemoFarmacia };
