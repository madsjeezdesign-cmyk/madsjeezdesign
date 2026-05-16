import { Droplet, Leaf, Shovel, Sun } from "lucide-react";
import Image from "next/image";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DEMO_HEADING_CLASS, demoBodyStyle, getDemoArtDirection } from "@/lib/demo-art-direction";
import { DemoFaqList, DemoLongStory, DemoProcessSteps } from "./demo-common-sections";
import { demoContainer, demoSectionTight } from "./demo-layout";
import { DemoBrandNav } from "./demo-brand-nav";
import { DemoEnhancements } from "./demo-enhancements";
import { DemoThemedHero } from "./demo-themed-hero";

const SLUG = "paisajismo" as const;

export function DemoPaisajismoLanding() {
  const v = getDemoVisuals(SLUG);
  const art = getDemoArtDirection(SLUG);
  const h = DEMO_HEADING_CLASS[SLUG];

  return (
    <div style={demoBodyStyle(SLUG)} className={art.pageRoot}>
      <DemoBrandNav
        slug={SLUG}
        brand="Verde Horizonte"
        iconKey="Leaf"
        primaryCta="Visita técnica"
        primaryCtaClass={art.primaryCta}
      />

      <DemoThemedHero
        variant={art.heroVariant}
        imageSrc={v.cover}
        headingClass={h}
        titleColorClass="text-lime-50"
        leadColorClass="text-lime-100/60"
        kicker={
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-lime-400">
            <Leaf className="h-4 w-4" /> Nativas · riego · compostaje
          </p>
        }
        title={
          <>
            Paisajismo
            <br />
            <span className="text-lime-400">que lee el suelo</span>
          </>
        }
        lead="Constructoras y consorcios buscan cronogramas de manutención, especies con bajo riego y dashboards de humedad. Esta demo combina fichas técnicas, SLA anuales y carrito tipo lista para insumos recurrentes."
        ctas={
          <>
            <button type="button" className={art.primaryCta}>
              Portfolio obras
            </button>
            <button type="button" className={art.secondaryCta}>
              Plan de riego PDF
            </button>
          </>
        }
      />

      <section className={`${demoSectionTight} bg-green-950/30`}>
        <div className={demoContainer}>
          <div className="relative aspect-[21/8] min-h-[160px] w-full overflow-hidden rounded-2xl border border-green-800/40">
            <Image src={v.e ?? v.b} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 1152px" />
            <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-md text-sm text-lime-50/90">
              Antes y después de diseño de parterres — prueba social que cierra proyectos grandes.
            </p>
          </div>
        </div>
      </section>

      <DemoProcessSteps
        sectionHeadingClass={h}
        title="De la topografía a la primera fumigación"
        subtitle="Transparencia que cierra contratos anuales."
        steps={[
          { n: "A", t: "Suelo & drenaje", d: "Perforaciones test y malla anti maleza." },
          { n: "B", t: "Especies", d: "Paleta nativa + pollinizers para cumplir normativa municipal demo." },
          { n: "C", t: "Riego", d: "Sensores de flujo y app de mantenimiento preventivo." },
          { n: "D", t: "Mantenimiento", d: "Podas programadas y fertilización orgánica." },
        ]}
        sectionClass="bg-green-950/40"
        titleClass="text-lime-50"
        subtitleClass="text-lime-200/40"
        stepNumClass="text-lime-400"
        cardClass={`p-6 ${art.cardShell}`}
        stepTitleClass="font-bold text-white"
        stepDescClass="mt-2 text-sm text-lime-100/55"
      />

      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
          {[
            { icon: Sun, t: "Sombras", d: "Árboles de dosel para patios cero pasta." },
            { icon: Droplet, t: "Agua", d: "Recalibración trimestral por horario eléctrico." },
            { icon: Shovel, t: "Tierra viva", d: "Compostaje on-site para reducir retiros." },
            { icon: Leaf, t: "Biodiversidad", d: "Índices demo de aves y polinizadores." },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className={`border-t-4 border-lime-500 p-6 pt-8 ${art.cardShell}`}>
              <I className="h-6 w-6 text-lime-400" />
              <h3 className={`mt-4 ${h} text-lg text-white`}>{t}</h3>
              <p className="mt-2 text-sm text-lime-100/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoLongStory
        sectionHeadingClass={h}
        kicker="Smart irrigation"
        title="Contenido para buscadores y facility managers"
        paragraphs={[
          "Landing con FAQs sobre caudal, fugas y ROI hídrico — palabras clave que importan en licitaciones verdes.",
          "Sección descargable de fichas de especies en CSV para arquitectos y renders colaborativos demo.",
        ]}
        kickerClass="text-lime-400"
        titleClass="text-lime-50"
        pClass="mt-4 text-sm text-lime-100/65"
        sectionClass="border-y border-green-800/40"
      />

      <DemoFaqList
        sectionHeadingClass={h}
        title="Contratos"
        items={[
          { q: "¿Trabajan por m² o por alcance?", a: "Ambos modelos con anexo de visitas extra." },
          { q: "¿Garantía de planta?", a: "90 días con riego automático funcionando — detalle en PDF demo." },
        ]}
        sectionClass="bg-green-950/60"
        titleClass="text-lime-50"
        qClass="font-bold text-white"
        aClass="mt-2 text-sm text-lime-100/55"
        rowClass="border-b border-green-800/40 py-5 last:border-0"
      />

      <DemoEnhancements
        slug={SLUG}
        omitCoverBanner
        brandLabel="Verde Horizonte"
        shopCardClass="border border-green-700/40 bg-green-950/50"
        shopAccentClass="bg-lime-500 font-bold text-green-950"
        sectionClass="bg-green-950"
        titleClass="text-lime-50"
        cardClass={`p-6 ${art.cardShell}`}
        quoteClass="text-sm italic text-lime-100/70"
        authorClass="mt-4 text-xs font-bold text-lime-400"
        extraTestimonials={[{ text: "El listado vertical del shop encaja con insumos repetibles.", author: "Adm consorcio", role: "Cliente demo" }]}
      />

      <footer className="py-8 text-center text-xs text-green-900/70">Demo · Verde Horizonte</footer>
    </div>
  );
}

export { DemoPaisajismoLanding as DemoPaisajismo };
