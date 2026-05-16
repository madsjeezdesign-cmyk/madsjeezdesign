import { Key, PhoneCall, ScanLine, Timer } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoLongStory, DemoProcessSteps, DemoTestimonials } from "./demo-common-sections";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "cerrajeria" as const;

export function DemoCerrajeriaLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <div className="bg-yellow-500 px-4 py-2 text-center text-[11px] font-black uppercase tracking-wider text-black">
        <Timer className="mx-auto mb-1 h-4 w-4 md:inline md:mr-2" />
        Urgencias 24 h — promedio llegada 35 min (radio demo)
      </div>
      <nav className="flex items-center justify-between px-4 py-4 md:px-10">
        <span className={`flex items-center gap-2 ${h} text-2xl text-yellow-50`}>
          <Key className="h-7 w-7 text-yellow-400" /> Llaves 24 Sur
        </span>
        <button type="button" className={art.primaryCta}>
          Llamar móvil
        </button>
      </nav>

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-yellow-50"
        leadColorClass="text-yellow-100/55"
        kicker={
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500">
            <ScanLine className="h-4 w-4" />
            Cilindros · RFID · control accesos
          </p>
        }
        title={
          <>
            Cerrajería
            <br />
            <span className="text-yellow-400">que deja constancia</span>
          </>
        }
        lead="Clientes buscan transparencia de precios, facturas digitales y trazabilidad de llaves maestras. Esta demo incluye copy legal, geolocalización de móviles y carrito estándar para insumos con retiro en taller — ideal para franquicias y consorcios."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Pedir urgencia
            </button>
            <button type="button" className={art.secondaryCta}>
              Presupuesto digital
            </button>
          </>
        }
      />

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3 md:px-10">
        {[
          {
            icon: PhoneCall,
            t: "Derivación inteligente",
            d: "Si el móvil más cercano está ocupado, el sistema propone el siguiente técnico demo.",
          },
          { icon: Key, t: "Cadena de custodia", d: "Registro fotográfico de cilindros retirados y reinstalados." },
          { icon: ScanLine, t: "Pases biométricos", d: "Integración con lectores existentes sin tumbar red." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className={`p-7 ${art.cardShell}`}>
            <I className="h-7 w-7 text-yellow-400" />
            <h3 className={`mt-4 ${h} text-xl text-white`}>{t}</h3>
            <p className="mt-2 text-sm text-yellow-100/55">{d}</p>
          </div>
        ))}
      </section>

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="Service estándar consorcio"
        subtitle="Pasos visibles para administradores exigentes."
        steps={[
          { n: "1", t: "Incidente", d: "Ticket con foto de puerta y marca de cilindro." },
          { n: "2", t: "Cotización", d: "Alternativas homologadas con stock local demo." },
          { n: "3", t: "Instalación", d: "Acta firmada digital con entrega de llaves nuevas." },
          { n: "4", t: "Garantía", d: "90 días con revisión sin costo por torque." },
        ]}
        sectionClass="border-y border-yellow-900/40 bg-neutral-950/80"
        titleClass="text-yellow-50"
        subtitleClass="text-yellow-200/40"
        stepNumClass="text-yellow-500"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-yellow-100/55"
      />

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Confianza"
        title="Señales que buscan edificios corporativos"
        paragraphs={[
          "Sellos de aseguradoras, partner brands y certificaciones de capacitación en altura.",
          "Bloque comparativo anti-bumping vs productos comunes de ferretería — sin denostar competencia demo.",
        ]}
        kickerClass="text-yellow-500"
        titleClass="text-yellow-50"
        pClass="mt-4 text-sm text-yellow-100/60"
        sectionClass="bg-zinc-900/40"
      />

      <DemoTestimonials
        sectionHeadingClass={h}
        title="Administradores"
        quotes={[
          { text: "El timeline de obra evitó cruces con pintores de la medianera.", author: "Cecilia", role: "Administración demo" },
        ]}
        sectionClass="border-t border-yellow-900/30"
        titleClass="text-yellow-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-yellow-100/65"
        authorClass="mt-4 text-xs font-bold uppercase text-yellow-500"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Llaves 24 Sur"
        shopCardClass="border border-yellow-700/40 bg-zinc-900/80"
        shopAccentClass="bg-yellow-400 font-bold text-black"
        sectionClass="bg-neutral-950"
        titleClass="text-yellow-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-yellow-100/60"
        authorClass="mt-4 text-xs font-bold text-yellow-400"
      />

      <footer className="py-8 text-center text-xs text-yellow-200/25">Demo · Llaves 24 Sur</footer>
    </div>
  );
}

export { DemoCerrajeriaLanding as DemoCerrajeria };
