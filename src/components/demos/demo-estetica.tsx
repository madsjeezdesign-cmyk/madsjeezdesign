import { Heart, Leaf, Sparkles, Sun, Wind } from "lucide-react";
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

const SLUG = "estetica" as const;

export function DemoEsteticaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="flex flex-row-reverse items-center justify-between gap-4 px-6 py-5 md:px-14">
        <button type="button" className={art.primaryCta}>
          Reservar turno
        </button>
        <span className={`${h} text-2xl tracking-tight text-stone-900`}>
          Aura<span className="text-amber-700">.</span>
        </span>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-stone-900"
        leadColorClass="text-stone-600"
        kicker={
          <div className="flex justify-center">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
        }
        title={
          <>
            Belleza calmada,
            <br />
            <span className="italic text-stone-600">resultados reales</span>
          </>
        }
        lead="Tratamientos faciales con escalada de activos, coloración vegana con diagnóstico de porosidad y masajes con aromaterapia de grado terapéutico. Espacio boutique con sólo tres cabinas insonorizadas, playlist binaural opcional y temperatura regulada por estación."
      />

      <section className="px-6 pb-20 md:px-14">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {["Facial glow", "Color & balayage", "Masaje ayurvédico"].map((title, i) => (
            <div key={title} className={`relative overflow-hidden p-8 text-left ${art.cardShell}`}>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200/40 blur-2xl" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800/80">Tratamiento 0{i + 1}</p>
              <p className={`mt-3 text-xl text-stone-900 ${h}`}>{title}</p>
              <p className="mt-2 text-xs text-stone-600">Sesión demo 60 min · incluye infusión</p>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Experiencia sensorial"
        title="Cabinas amplias, aire limpio y narrativa clara en cada sesión"
        paragraphs={[
          "No usamos música agresiva ni aromatizantes genéricos. Ventilación mecánica con filtro HEPA y extractores en cabinas de coloración para minimizar alérgenos volátiles. Antes de cada peeling químico enviamos PDF con home-care y bloqueador obligatorio; post sesión tenés WhatsApp directo con tu terapeuta por 48 h para dudas leves.",
          "Línea bridal y editorial: trials con luz natural simulada y fotografía de referencia para que el día del evento no haya sorpresas con el tono del gloss. Masajes prenatal con camilla articulada y almohadas de cuerpo completo certificadas. Política de rebooking: si un tratamiento no rindió como esperabas dentro del rango biológico, reprogramamos mitad del servicio sin discusión demo.",
        ]}
        kickerClass="text-amber-800"
        titleClass="text-stone-900"
        pClass="mt-4 text-sm leading-relaxed text-stone-600"
        sectionClass="bg-white"
      />

      <section className="bg-stone-900 px-6 py-16 text-stone-100 md:px-14">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className={`text-3xl md:text-4xl ${h}`}>Protocolos con luz LED y productos cruelty-free</h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Evaluación gratuita de piel en primera visita. Armamos un plan mensual sin presión de paquetes eternos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sun, l: "Vitamina C" },
              { icon: Wind, l: "Oxigenación" },
              { icon: Leaf, l: "Extractos botánicos" },
              { icon: Heart, l: "Bienestar" },
            ].map(({ icon: I, l }) => (
              <div key={l} className="rounded-xl border border-stone-700 bg-stone-800/50 p-4">
                <I className="h-5 w-5 text-amber-500" />
                <p className="mt-2 text-xs font-bold">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Ciencia suave"
        title="Leemos tu piel como mapa, no como catálogo de promesas imposibles"
        paragraphs={[
          "Usamos analizador de hidratación y fotografía de superficie para registrar mejora objetiva entre sesiones. Los planes combinan activos con ventana de penetración real (vitamina estabilizada, péptidos de señal, niacinamida en dosis prudente) y siempre SPF diario reforzado demo.",
          "Cabinas insonorizadas con circulación HEPA y camillas térmicas. Política anti upsell: si un tratamiento no suma te lo decimos antes de agendar la siguiente visita.",
        ]}
        kickerClass="text-amber-700"
        titleClass="text-stone-900"
        pClass="mt-4 text-sm text-stone-600"
        sectionClass="bg-white"
      />

      <DemoStatsStrip
        stats={[
          { value: "18", label: "Años", hint: "Equipo fundador" },
          { value: "3", label: "Cabinas", hint: "Sin apelotonar" },
          { value: "92 %", label: "Retención", hint: "Planes 6 meses demo" },
          { value: "0", label: "Presión kits", hint: "Política escrita" },
        ]}
        sectionClass="border-y border-stone-200 bg-[#faf7f2]"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-amber-700 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-stone-500"
        hintClass="mt-1 text-xs text-stone-400"
      />

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Primera visita"
        subtitle="45 minutos de evaluación + plan sin obligación de compra."
        steps={[
          { n: "01", t: "Anamnesis", d: "Historial, medicación y objetivos reales (social vs laboral)." },
          { n: "02", t: "Scan", d: "Fotos comparables y niveles TEWL demo." },
          { n: "03", t: "Demo express", d: "Mini facial con productos que usarás en casa." },
          { n: "04", t: "Plan", d: "Cronograma de sesiones + rutina AM/PM con presupuesto cerrado." },
        ]}
        sectionClass="bg-stone-100"
        titleClass="text-stone-900"
        subtitleClass="text-stone-500"
        stepNumClass="text-amber-700"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-stone-900"
        stepDescClass="mt-2 text-sm text-stone-600"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Protocolos destacados"
        sectionClass="bg-[#faf7f2]"
        titleClass="text-stone-900"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-amber-800"
        itemBodyClass="mt-2 text-sm text-stone-600"
        items={[
          { title: "Glow reductor manchas", body: "Serie de 4 con ácido mandélico progresivo y sellado con antioxidantes liposomados." },
          { title: "Detox urbano", body: "Masaje linfático + oxigenación fría para pieles expuestas a aire acondicionado agresivo." },
          { title: "Color vegano", body: "Patch test 48 h, decapación suave argán y gloss sin amoníaco demo." },
          { title: "Ayur prenatal", body: "Posiciones laterales seguras, aceites hipolergénicos y stretch care posterior." },
        ]}
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Clientas"
        sectionClass="bg-white"
        titleClass="text-stone-900"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-stone-700"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-700"
        quotes={[
          { text: "Por fin un lugar donde no te venden una crema cara solo porque sí.", author: "Martu L.", role: "Diseñadora" },
          { text: "Balayage sin straw hair; explicaron cada paso.", author: "Nico G.", role: "Búsqueda laboral demo" },
          { text: "La cabina silenciosa vale oro.", author: "Lu P.", role: "Remote PM" },
        ]}
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="FAQ"
        sectionClass="border-t border-stone-200 bg-[#faf7f2]"
        titleClass="text-stone-900"
        qClass="font-bold text-stone-800"
        aClass="mt-2 text-sm text-stone-600"
        rowClass="border-b border-stone-200 py-6 last:border-0"
        items={[
          { q: "¿Depilación láser?", a: "Módulo aliado en piso 2 con misma recepción; turno coordinado." },
          { q: "¿Pagos?", a: "QR, transfer y 3 cuotas sin interés con bancos seleccionados demo." },
          { q: "¿Regalos?", a: "Gift card física con diseño floral y digital instantánea." },
          { q: "¿Cancelaciones?", a: "Gratis hasta 12 h antes; después se retiene 30 % para cobertura therapist." },
        ]}
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Aura Estética"
        sectionClass="border-y border-stone-200 bg-[#faf7f2]"
        titleClass="text-stone-900"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-stone-700"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-amber-800"
        extraTestimonialsTitle="Más reseñas"
        extraTestimonials={[
          { text: "El patch test me salvó de una alergia que ni sabía que tenía.", author: "Vale R.", role: "Piel sensible" },
          { text: "Coloración sin picor; nunca me pasó en otros salones.", author: "Male F.", role: "Arquitecta" },
          { text: "Plan corporativo con descuento para el equipo — súper prolijo.", author: "HR FinTech", role: "People demo" },
        ]}
      />

      <footer className="px-6 py-10 text-center text-xs text-stone-500 md:px-14">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoEsteticaLanding as DemoEstetica };
