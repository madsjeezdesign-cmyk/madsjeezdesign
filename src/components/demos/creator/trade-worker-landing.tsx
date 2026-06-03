"use client";

/**
 * TRADE WORKER — archetype shell for trade demos placed under /creator/.
 * Slugs: electricista, albanil, arquitectos.
 *
 * Why a new shell (not the commerce/trade-trust one):
 * - These slugs were wrongly rendering with the gamer-saas CreatorLanding.
 * - Trade-worker leans editorial-photo + heft, with a softer light surface
 *   and a single restrained accent. Arquitectos gets a desaturated variant.
 * - NO glass, NO clip-path, NO "EN VIVO" badges, NO ALL-CAPS tracking spam.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { getCommerceConfig } from "@/lib/commerce-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

type TradeMeta = {
  matricula: string;
  years: string;
  zone: string;
  urgency: string;
  variant: "editorial" | "restraint";
};

/** Per-slug trust signals. */
const TRADE_META: Record<string, TradeMeta> = {
  electricista: {
    matricula: "Matrícula ENRE-7382",
    years: "12 años en obra",
    zone: "CABA + Zona Norte",
    urgency: "Urgencias 2 h",
    variant: "editorial",
  },
  albanil: {
    matricula: "Reg. constructor 3829",
    years: "18 años de obra",
    zone: "AMBA completo",
    urgency: "Visita gratuita",
    variant: "editorial",
  },
  arquitectos: {
    matricula: "CPAU · matrícula 28419",
    years: "Estudio desde 2014",
    zone: "Buenos Aires + Costa",
    urgency: "Anteproyecto 10 días",
    variant: "restraint",
  },
};

type GalleryItem = { caption: string; meta: string };

const GALLERY: Record<string, GalleryItem[]> = {
  electricista: [
    { caption: "Tablero residencial · Vicente López", meta: "Norma IRAM 2281" },
    { caption: "Iluminación LED comercial · Belgrano", meta: "300 m² intervenidos" },
    { caption: "Puesta a tierra · Recoleta", meta: "Certificación AEA" },
  ],
  albanil: [
    { caption: "Reforma integral baño · Caballito", meta: "21 días · llave en mano" },
    { caption: "Ampliación planta alta · San Isidro", meta: "32 m² · estructura H°A°" },
    { caption: "Revoque y pintura exterior · Adrogué", meta: "Casa de 180 m²" },
  ],
  arquitectos: [
    { caption: "Casa Quebrada — Tigre", meta: "180 m² · 2024" },
    { caption: "Refacción Once — Buenos Aires", meta: "PH · 2023" },
    { caption: "Estudio Costanera — Mar del Plata", meta: "Comercial · 2024" },
  ],
};

const TESTIMONIALS: Record<string, { quote: string; author: string; role: string }[]> = {
  electricista: [
    {
      quote:
        "Vinieron el mismo día que llamé. Cambiaron el tablero entero, dejaron todo certificado y limpio. Cobraron lo presupuestado, ni un peso más.",
      author: "Mariana D.",
      role: "Cliente · Vicente López",
    },
    {
      quote:
        "Trabajan limpio y explican qué hacen. Recomendados. La iluminación del local quedó impecable.",
      author: "Diego A.",
      role: "Local gastronómico · Belgrano",
    },
  ],
  albanil: [
    {
      quote:
        "Terminaron en tiempo y con calidad. Lo más importante: nunca tuve sorpresas en el presupuesto. Una rareza en el rubro.",
      author: "Lucía R.",
      role: "Reforma de baño · Caballito",
    },
    {
      quote:
        "Hicieron la ampliación cuando dijeron y como dijeron. Equipo cuidadoso y respetuoso de la casa.",
      author: "Pablo M.",
      role: "Ampliación · San Isidro",
    },
  ],
  arquitectos: [
    {
      quote:
        "Diseñaron una casa que se parece a nosotros. El proceso fue claro y la obra se mantuvo dentro del presupuesto.",
      author: "Familia Morán",
      role: "Casa Quebrada · Tigre",
    },
    {
      quote:
        "Entienden la escala doméstica como pocos estudios. Resolvieron un PH chico con una claridad sorprendente.",
      author: "Ana V.",
      role: "Refacción Once",
    },
  ],
};

export function TradeWorkerLanding({ slug }: Props) {
  const config = getCommerceConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const t = useMotionTransition("display");
  const meta = TRADE_META[slug] ?? {
    matricula: "Matriculado",
    years: "Años de oficio",
    zone: "Zona local",
    urgency: "Consultá disponibilidad",
    variant: "editorial" as const,
  };
  const gallery = GALLERY[slug] ?? [
    { caption: "Trabajo entregado", meta: "Buenos Aires" },
    { caption: "Trabajo entregado", meta: "Buenos Aires" },
    { caption: "Trabajo entregado", meta: "Buenos Aires" },
  ];
  const stories = TESTIMONIALS[slug] ?? [];

  const isRestraint = meta.variant === "restraint";

  const accent = config?.accent ?? "#525252";
  const ink = isRestraint ? "#1f1f1d" : accent;
  const surface = isRestraint ? "#f6f5f1" : "#fafaf7";
  const hairline = isRestraint ? "#e3e0d6" : "#e6e3dc";
  const muted = isRestraint ? "#6b675b" : "#6f6a5e";
  const titleFamily = isRestraint
    ? "var(--font-demo-h-creator), Georgia, serif"
    : "var(--font-demo-h-commerce)";

  if (!config || !v) return null;

  return (
    <div
      className="relative min-h-screen font-[family-name:var(--font-demo-b-commerce)] antialiased"
      style={
        {
          background: surface,
          color: "#171717",
          "--tw-accent": ink,
        } as React.CSSProperties
      }
    >
      {/* HEADER — hairline only. */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ borderColor: hairline, background: `${surface}f2` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-baseline gap-3">
            <span
              className="text-xl font-medium tracking-tight md:text-2xl"
              style={{ fontFamily: titleFamily, color: "#171717" }}
            >
              {config.brand}
            </span>
            <span className="hidden text-xs md:inline" style={{ color: muted }}>
              {isRestraint ? "Estudio de arquitectura" : config.tradeLabel}
            </span>
          </div>
          <nav
            className="hidden items-center gap-7 text-sm md:flex"
            style={{ color: "#3a3a36" }}
          >
            <a href="#servicios" className="hover:underline">Servicios</a>
            <a href="#obras" className="hover:underline">{isRestraint ? "Proyectos" : "Obras"}</a>
            <a href="#testimonios" className="hover:underline">{isRestraint ? "Estudio" : "Clientes"}</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.02]"
            style={{ background: ink }}
          >
            {isRestraint ? (
              <>
                <Phone className="h-4 w-4" /> Consultar
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </>
            )}
          </a>
        </div>
      </header>

      {/* HERO — photo-led editorial asymmetry. */}
      <section className="relative px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
            className="relative z-10"
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5"
              style={{ borderColor: hairline }}
            >
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: ink }} />
              <span className="text-xs" style={{ color: "#3a3a36" }}>{meta.matricula}</span>
            </div>
            <h1
              className="text-4xl font-medium leading-[1.04] tracking-tight md:text-6xl"
              style={{ fontFamily: titleFamily, color: "#171717" }}
            >
              {config.heroTitle}
              <span style={{ color: ink }}> {config.heroHighlight}</span>
            </h1>
            <p
              className="mt-6 max-w-lg text-base leading-relaxed md:text-[17px]"
              style={{ color: isRestraint ? "#4a4740" : "#3a3a36" }}
            >
              {config.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                style={{ background: ink }}
              >
                {isRestraint ? "Solicitar reunión" : "Pedir visita"}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#obras"
                className="inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-sm font-medium hover:border-black"
                style={{ borderColor: hairline, color: "#171717" }}
              >
                {isRestraint ? "Ver proyectos" : "Ver obras"}
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-xs">
              <div>
                <dt style={{ color: muted }}>Experiencia</dt>
                <dd className="mt-1 font-medium" style={{ color: "#171717" }}>{meta.years}</dd>
              </div>
              <div>
                <dt style={{ color: muted }}>Cobertura</dt>
                <dd className="mt-1 font-medium" style={{ color: "#171717" }}>{meta.zone}</dd>
              </div>
              <div>
                <dt style={{ color: muted }}>Respaldo</dt>
                <dd className="mt-1 font-medium" style={{ color: "#171717" }}>{meta.urgency}</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={t}
            className="relative"
          >
            <div
              className="relative aspect-[5/6] overflow-hidden border bg-white shadow-[0_24px_60px_-32px_rgba(0,0,0,0.22)]"
              style={{ borderColor: hairline, borderRadius: isRestraint ? 2 : 6 }}
            >
              <Image
                src={v.cover}
                alt={`Trabajo de ${config.tradeLabel}`}
                fill
                priority
                className={`object-cover ${isRestraint ? "saturate-[0.75]" : ""}`}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {!isRestraint && (
                <>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[10px] uppercase tracking-wider opacity-80">{gallery[0]?.meta}</p>
                    <p className="mt-1 text-lg font-medium">{gallery[0]?.caption}</p>
                  </div>
                </>
              )}
            </div>
            <div
              className="absolute -bottom-5 -left-5 hidden border bg-white px-5 py-4 shadow-md md:block"
              style={{ borderColor: hairline, borderRadius: isRestraint ? 2 : 6 }}
            >
              <p className="text-[10px] uppercase tracking-wider" style={{ color: muted }}>
                {isRestraint ? "Próxima entrega" : "Disponibilidad"}
              </p>
              <p
                className="mt-1 text-2xl font-medium"
                style={{ fontFamily: titleFamily, color: "#171717" }}
              >
                {meta.urgency}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="border-y bg-white" style={{ borderColor: hairline }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x md:grid-cols-4" style={{ borderColor: hairline }}>
          {[
            { icon: Award, label: "Matrícula", value: meta.matricula },
            { icon: Clock, label: "Trayectoria", value: meta.years },
            { icon: MapPin, label: "Cobertura", value: meta.zone },
            { icon: ShieldCheck, label: "Respaldo", value: meta.urgency },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 px-5 py-6 md:px-7"
              style={{ borderColor: hairline }}
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ink }} />
              <div>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: muted }}>{item.label}</p>
                <p className="mt-1 text-sm font-medium" style={{ color: "#171717" }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — long rows */}
      <section id="servicios" className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2
              className="text-3xl font-medium tracking-tight md:text-5xl"
              style={{ fontFamily: titleFamily, color: "#171717" }}
            >
              {isRestraint ? "Áreas de trabajo" : "Servicios"}
            </h2>
            <p className="max-w-sm text-sm" style={{ color: muted }}>
              {isRestraint
                ? "Diseño residencial y comercial. Anteproyecto, proyecto ejecutivo y dirección de obra."
                : "Trabajo certificado, presupuesto sin cargo y garantía escrita."}
            </p>
          </div>
          <ul className="divide-y border-t" style={{ borderColor: hairline }}>
            {config.features.map((feature, i) => (
              <li
                key={feature}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-white"
                style={{ borderColor: hairline }}
              >
                <div className="flex items-baseline gap-5">
                  <span className="w-7 text-xs tabular-nums" style={{ color: muted }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium md:text-lg" style={{ color: "#171717" }}>
                    {feature}
                  </span>
                </div>
                <span className="hidden text-xs md:inline" style={{ color: muted }}>
                  {config.categories[i % config.categories.length]}
                </span>
                <ArrowRight
                  className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: ink }}
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OBRAS / PROYECTOS — 21:9 cropped pairs */}
      <section
        id="obras"
        className="border-t bg-white px-5 py-20 md:px-8 md:py-24"
        style={{ borderColor: hairline }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2
              className="text-3xl font-medium tracking-tight md:text-4xl"
              style={{ fontFamily: titleFamily, color: "#171717" }}
            >
              {isRestraint ? "Proyectos seleccionados" : "Obras recientes"}
            </h2>
            <p className="max-w-xs text-sm" style={{ color: muted }}>
              {isRestraint
                ? "Una selección de proyectos entregados entre 2023 y 2024."
                : "Antes y después, foto real, sin retoque comercial."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {gallery.map((item, i) => {
              const sources = [v.a, v.b, v.c];
              return (
                <figure key={`${item.caption}-${i}`} className="space-y-3">
                  <div
                    className="relative aspect-[21/9] overflow-hidden border bg-[#f3efe6] md:aspect-[4/5]"
                    style={{ borderColor: hairline, borderRadius: isRestraint ? 2 : 4 }}
                  >
                    <Image
                      src={sources[i] ?? v.cover}
                      alt={item.caption}
                      fill
                      className={`object-cover ${isRestraint ? "saturate-[0.7]" : ""}`}
                      sizes="33vw"
                    />
                  </div>
                  <figcaption className="space-y-1">
                    <p
                      className="text-base font-medium"
                      style={{
                        fontFamily: isRestraint ? titleFamily : undefined,
                        color: "#171717",
                      }}
                    >
                      {item.caption}
                    </p>
                    <p className="text-xs" style={{ color: muted }}>{item.meta}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — single-quote serif italic */}
      <section id="testimonios" className="px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-10 text-3xl font-medium tracking-tight md:text-4xl"
            style={{ fontFamily: titleFamily, color: "#171717" }}
          >
            {isRestraint ? "Estudio" : "Lo que dicen los clientes"}
          </h2>
          <div className="space-y-12">
            {stories.length > 0 ? (
              stories.map((story, i) => (
                <motion.figure
                  key={`${story.author}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={t}
                  className="border-l pl-6"
                  style={{ borderColor: ink }}
                >
                  <Quote className="mb-4 h-5 w-5" style={{ color: ink }} aria-hidden />
                  <blockquote
                    className="text-xl italic leading-relaxed md:text-2xl"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      color: "#1a1a1a",
                    }}
                  >
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-sm" style={{ color: muted }}>
                    <span className="font-medium" style={{ color: "#171717" }}>{story.author}</span>
                    {" — "}
                    {story.role}
                  </figcaption>
                </motion.figure>
              ))
            ) : (
              <p className="text-sm" style={{ color: muted }}>Próximamente.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section
        className="border-y px-5 py-16 md:px-8 md:py-20"
        style={{
          borderColor: hairline,
          background: isRestraint ? "#1f1f1d" : "#171717",
          color: "white",
        }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs" style={{ color: "#a8a299" }}>{meta.urgency}</p>
            <h3
              className="mt-2 text-3xl font-medium md:text-4xl"
              style={{ fontFamily: titleFamily }}
            >
              {isRestraint
                ? "Conversemos sobre tu proyecto."
                : `${config.heroTitle} ${config.heroHighlight}`}
            </h3>
            <p className="mt-3 max-w-md text-sm" style={{ color: "#cfcabe" }}>
              {isRestraint
                ? "Reunión presencial o por video. Sin costo de primera consulta."
                : `Coordinamos visita por WhatsApp. Presupuesto sin cargo en ${meta.zone}.`}
            </p>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-[#171717] transition-transform hover:scale-[1.02]"
            style={{ background: isRestraint ? "#eee8d8" : accent }}
          >
            {isRestraint ? (
              <>
                <Phone className="h-4 w-4" /> Agendar reunión
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
              </>
            )}
          </a>
        </div>
      </section>

      <div id="contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.tradeLabel}`}
          theme={v.lead}
          kicker={isRestraint ? "Brief de proyecto" : "Consulta directa"}
          title={isRestraint ? "Contanos tu proyecto" : "Pedinos un presupuesto"}
          sub={
            isRestraint
              ? "Te respondemos con una propuesta de honorarios y cronograma en 5 días hábiles."
              : `Te respondemos por WhatsApp. ${meta.zone}.`
          }
        />
      </div>

      <footer
        className="border-t bg-white px-5 py-10 text-center text-xs md:px-8"
        style={{ borderColor: hairline, color: muted }}
      >
        © {new Date().getFullYear()} {config.brand} · {meta.matricula} · {meta.zone}
      </footer>
    </div>
  );
}
