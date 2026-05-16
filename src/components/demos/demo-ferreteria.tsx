import {
  Drill,
  HardHat,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
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

const SLUG = "ferreteria" as const;

export function DemoFerreteriaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b-4 border-orange-600 bg-[#0c0a09]/95 px-4 py-3 backdrop-blur-md md:px-10">
        <span className={`${h} text-2xl tracking-wide text-orange-500`}>FDO</span>
        <div className="hidden flex-1 justify-center gap-10 md:flex">
          {["Catálogo online", "Marcas líder", "Cuenta corriente"].map((l) => (
            <span
              key={l}
              className="cursor-default text-xs font-bold uppercase tracking-[0.35em] text-zinc-500 hover:text-orange-400"
            >
              {l}
            </span>
          ))}
        </div>
        <button type="button" className={art.primaryCta}>
          Pedido express
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-white"
        leadColorClass="text-zinc-400"
        kicker={
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">
            <HardHat className="h-4 w-4" /> Stock sincronizado · obras y retail
          </p>
        }
        title={
          <>
            La ferretería
            <br />
            <span className="text-orange-500">que te manda el camión</span>
          </>
        }
        lead="Herramientas eléctricas, bulonería indexada, pinturas al agua y solvente, electricidad industrial y ferretería de obra seca. Atendemos comercios, constructoras y vecinos: podés chequear disponibilidad, reservar materiales para el día siguiente o coordinar entrega con hidráulica en horario extendido."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Ver stock destacado
            </button>
            <button type="button" className={art.secondaryCta}>
              Lista mayorista PDF
            </button>
          </>
        }
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Por qué elegirnos"
        title="Proveedor que entiende obra, stock y plazos"
        paragraphs={[
          "Llevamos más de tres décadas abasteciendo obradores y ferreterías de barrio. Nuestro depósito central trabaja con rotación semanal: lo que figura disponible en la web o en lista PDF existe físicamente, con ubicación de pasillo para retiro express.",
          "Ofrecemos asesoría técnica breve en mostrador (iluminación LED, espesores de bulón, dilución de látex) y despacho con remito electrónico. Para cuentas verificadas aceptamos orden de compra y facturación diferida según condiciones comerciales demo.",
        ]}
        kickerClass="text-orange-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base"
      />

      <section className="border-y border-white/5 bg-zinc-900/50 px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              icon: Truck,
              t: "Envíos propios",
              d: "Camioneta con ayudante. Pedidos cargados antes de 14 h alcanzan reparto mismo día en radios acordados.",
            },
            {
              icon: ShieldCheck,
              t: "Garantía y cambios",
              d: "Productos con ticket y embalaje sin uso: 15 días. Herramientas eléctricas con garantía de fábrica gestionada.",
            },
            {
              icon: Package,
              t: "Retiro sin fila",
              d: "Pedido armado en mécano con número de remito. Mostrador mayorista acceso lateral para camiones chicos.",
            },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`p-6 ${art.cardShell}`}>
              <I className="h-8 w-8 text-orange-500" />
              <h3 className={`mt-4 font-bold text-white ${h}`}>{t}</h3>
              <p className="mt-2 text-sm text-zinc-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoStatsStrip
        eyebrow="Indicadores demo"
        stats={[
          { value: "12.400+", label: "Referencias activas", hint: "Herramientas, pinturas, electricidad" },
          { value: "35", label: "Años en el rubro", hint: "Tercera generación familiar" },
          { value: "48 h", label: "Interior y cordón", hint: "Logística programada" },
          { value: "4,8", label: "Valoración clientes", hint: "Encuestas post-venta demo" },
        ]}
        sectionClass="border-y border-white/5 bg-zinc-900/30"
        cardClass={`p-6 ${art.cardShell}`}
        valueClass={`text-3xl font-black text-orange-500 ${h}`}
        labelClass="mt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400"
        hintClass="mt-1 text-xs text-zinc-600"
      />

      <section className="px-4 py-20 md:px-10">
        <h2 className={`${h} text-4xl uppercase text-white md:text-5xl`}>Rubros del salón</h2>
        <p className="mt-4 max-w-2xl text-sm text-zinc-500">
          Ampliamos catálogo según temporada de construcción: en invierno más impermeabilizantes y calefacción; en
          verano pinturas exteriores y riego automático.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Wrench, label: "Herramientas manuales y neumática" },
            { icon: Drill, label: "Cable, tableros y protecciones" },
            { icon: Package, label: "Bulonería grado 8.8 y anclajes químicos" },
            { icon: HardHat, label: "EPP: arneses, barbijos, guantes dielectric" },
          ].map(({ icon: I, label }) => (
            <div
              key={label}
              className={`group cursor-default p-6 transition-colors hover:border-orange-500/40 ${art.cardShell}`}
            >
              <I className="h-6 w-6 text-orange-500 transition-transform group-hover:scale-110" />
              <p className="mt-4 text-sm font-bold text-white">{label}</p>
              <p className="mt-1 text-xs text-zinc-600">Consultá disponibilidad por WhatsApp comercial</p>
            </div>
          ))}
        </div>
      </section>

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Cómo comprar"
        subtitle="Flujo simple para profesionales y particulares que necesitan certeza de stock."
        steps={[
          { n: "01", t: "Consultá o pasá lista", d: "Subí tu planilla por mail o usá el buscador con código de artículo. Respondemos disponibilidad y alternativas de marca." },
          { n: "02", t: "Confirmación y reserva", d: "Generamos reserva con número de pedido. Podés abonar seña o cuenta corriente según tu perfil." },
          { n: "03", t: "Preparación en depósito", d: "Control de peso y volumen para envío. Fotos opcionales de bultos para transportistas externos." },
          { n: "04", t: "Retiro o entrega", d: "Coordinamos franja horaria. Remito digital y factura listas para contabilidad." },
        ]}
        sectionClass="bg-zinc-900/40"
        titleClass="text-white"
        subtitleClass="text-zinc-500"
        stepNumClass="text-orange-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm leading-relaxed text-zinc-500"
      />

      <DemoDetailGrid
        sectionHeadingClass={h}
        title="Soluciones por tipo de cliente"
        items={[
          { title: "Constructoras y refacciones", body: "Listas maestras por obra con entregas parciales. Facturación B2B, remitos consolidados y contacto dedicado demo para urgencias de fin de semana." },
          { title: "Ferreterías de barrio", body: "Reposición semanal, devolución de mercadería lenta rotación y capacitación breve en nuevas líneas de herramientas a batería." },
          { title: "Hogar y bricolage", body: "Asesoría en cantidades (pintura, pegamento cerámico) para evitar faltantes a mitad de fin de semana. Financiación con tarjetas en sala." },
          { title: "Instaladores matriculados", body: "Precio convenio en electricidad y sanitaria. Préstamo de burlete para pruebas de presión en obra gris (sujeto a disponibilidad demo)." },
        ]}
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        itemTitleClass="font-bold text-orange-400"
        itemBodyClass="mt-2 text-sm leading-relaxed text-zinc-500"
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Operación y datos"
        title="Catálogo conectado al depósito: menos promesas, más remitos limpios"
        paragraphs={[
          "Integración demo entre ERP y vitrina: cada SKU muestra ubicación de picking, lote cuando aplica normativa y tiempo estimado de armado. Si el sistema detecta divergencia de inventario, el cliente ve la unidad reservable real o la alternativa equivalente aprobada por compras.",
          "Para pinturería, el módulo tintométrico guarda fórmulas por cliente y envía alerta cuando cambia la base química del fabricante. Los EPP y elementos de altura se venden con checklist de tallas y capacidad de carga visible en ficha técnica en PDF descargable.",
        ]}
        kickerClass="text-orange-400"
        titleClass="text-white"
        pClass="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base"
        sectionClass="bg-zinc-900/60"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Lo que dicen nuestros clientes"
        quotes={[
          { text: "Nunca más perdí una jornada esperando que me traigan bulones equivocados. El remito coincide con lo pedido.", author: "Mariano Quinteros", role: "Jefe de obra · Ampliación Norte" },
          { text: "Tengo ferretería chica y el stock de respaldo me salva los fines de semana largos.", author: "Lucía Fanti", role: "Ferretería San José demo" },
          { text: "Factura electrónica llega el mismo día; contadora feliz.", author: "Pablo Méndez", role: "Instalador matriculado" },
        ]}
        sectionClass="bg-orange-950/20"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic leading-relaxed text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-orange-400/80"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Preguntas frecuentes"
        items={[
          { q: "¿Trabajan con cuenta corriente y orden de compra?", a: "Sí para clientes con línea aprobada demo: enviás OC firmada y coordinamos entrega contra remito. El circuito exacto se define con tu comercial asignado." },
          { q: "¿Puedo devolver pintura abierta?", a: "No aceptamos devolución de producto tintometricado ya mezclado salvo defecto de fabricación acreditado." },
          { q: "¿Hacen envío al interior?", a: "Sí, con transporte de terceros o flete propio según volumen. Coordinación con 48–72 h hábiles desde confirmación de pago." },
          { q: "¿Tienen lista de precios actualizada?", a: "Lista mayorista en PDF y CSV semanal para clientes registrados. Los precios publicados en web son orientativos demo." },
        ]}
        sectionClass="border-t border-white/5 bg-zinc-950"
        titleClass="text-white"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm leading-relaxed text-zinc-500"
        rowClass="border-b border-white/5 py-6 last:border-0"
      />

      <section className="bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-16 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-100/90">Mesa de ayuda técnica</p>
            <p className={`mt-2 text-4xl uppercase text-white ${h}`}>¿Pedido grande o urgencia?</p>
            <p className="mt-2 max-w-md text-sm text-orange-100/80">
              Dejanos número de obra y lista preliminar: un vendedor te confirma ventanas de entrega y alternativas
              de marca equivalente.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white"
          >
            <Phone className="h-4 w-4" />
            Llamar ahora
          </button>
        </div>
      </section>

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Ferretería del Oeste"
        shopCardClass="border border-orange-500/25 bg-zinc-950/90"
        shopAccentClass="bg-orange-600 font-bold text-white"
        sectionClass="border-y border-orange-500/20 bg-zinc-950"
        titleClass="text-white"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-zinc-300"
        authorClass="mt-4 text-xs font-bold uppercase tracking-wider text-orange-400"
        extraTestimonialsTitle="Más testimonios verificados"
        extraTestimonials={[
          { text: "El catálogo online ordenó las compras de obra: menos idas en vano al local.", author: "Ing. Correa", role: "Loteo Lomas demo" },
          { text: "Me dejaron lista curada con recambios de marcas cuando no había Milwaukee.", author: "Taller 8", role: "Metalúrgica" },
          { text: "Mostrador mayorista me carga el camión sin hacer fila con chicos.", author: "Román", role: "Gasista matriculado" },
        ]}
      />

      <footer className="border-t border-white/10 px-4 py-10 text-center text-xs text-zinc-600 md:px-10">
        Demo visual · MadsJeez Design · Contenido ficticio para presentación comercial
      </footer>
    </div>
  );
}

export { DemoFerreteriaLanding as DemoFerreteria };
