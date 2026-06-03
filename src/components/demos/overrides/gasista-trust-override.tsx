"use client";

/**
 * GASISTA — licensed gas plumber, real trust trade.
 *
 * Identity: light cream surface (#f6f1e6) + dark navy ink (#0d1b2a) + accent
 * brass (#b08948) for matrícula seal. NOT dark glass. NOT card spam.
 * Layout move: matrícula seal + headshot above the fold, URGENCIAS 24H
 * as a primary red CTA, services as a LONG-FORM list with hairline dividers,
 * before/after gallery and zone block.
 *
 * Voice: confiable, sin floreos. "Plomero gasista matriculado MP 1234. 15 años."
 */

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

const CREAM = "#f6f1e6";
const PAPER = "#fcfaf3";
const INK = "#0d1b2a";
const NAVY = "#173757";
const BRASS = "#b08948";
const BRASS_DARK = "#8a6a35";
const MUTED = "#54637b";

const SERVICES = [
  {
    title: "Habilitación municipal de gas",
    desc: "Trámite completo de obra de gas con plano, prueba de hermeticidad y firma profesional.",
    eta: "5 días hábiles",
  },
  {
    title: "Instalación de calefón y termotanque",
    desc: "Provisión y colocación de equipos nuevos. Garantía de obra de 12 meses sobre la instalación.",
    eta: "1 día",
  },
  {
    title: "Reparación de pérdidas",
    desc: "Detección y reparación de fugas con detector electrónico, sin romper paredes innecesariamente.",
    eta: "Mismo día",
  },
  {
    title: "Cambio de cañerías",
    desc: "Reemplazo de cañería interna por hierro galvanizado o cobre certificado. Pruebas de presión.",
    eta: "2 a 4 días",
  },
  {
    title: "Conexión de cocinas y artefactos",
    desc: "Instalación de cocinas, hornos de pared y termotanques eléctrico/gas. Llave de paso por equipo.",
    eta: "3 horas",
  },
  {
    title: "Certificado de gas para venta o alquiler",
    desc: "Inspección + certificado para escritura, ART o requerimientos de inmobiliaria. Reporte PDF.",
    eta: "48 horas",
  },
  {
    title: "Mantenimiento preventivo anual",
    desc: "Servicio para comercios y consorcios. Limpieza de quemadores, calibración y prueba de gases.",
    eta: "Programado",
  },
] as const;

const PORTRAIT =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80";

export function GasistaTrustOverride({ slug }: { slug: string }) {
  const v = getDemoVisuals(slug);
  const t = useMotionTransition("display");
  const tUi = useMotionTransition("ui");
  const wa = "https://wa.me/5491100000000?text=Hola%2C%20necesito%20un%20gasista%20matriculado";
  const waUrg = "https://wa.me/5491100000000?text=URGENCIA%20gas%20-%20necesito%20visita%20YA";

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{
        background: CREAM,
        color: INK,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      <header
        className="sticky top-0 z-40"
        style={{ background: `${CREAM}ee`, borderBottom: `1px solid ${INK}10`, backdropFilter: "blur(10px)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[0.95rem] font-bold"
              style={{ background: NAVY, color: PAPER }}
            >
              MR
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[1.02rem] font-semibold">Miguel Romero</span>
              <span className="text-[0.74rem]" style={{ color: BRASS_DARK }}>
                Gasista matriculado · MP 1234
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-[0.92rem] md:flex" style={{ color: MUTED }}>
            <a href="#servicios">Servicios</a>
            <a href="#zona">Zona</a>
            <a href="#trabajos">Trabajos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a
            href={waUrg}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.86rem] font-semibold"
            style={{ background: "#9d2b2b", color: PAPER }}
          >
            <Flame className="h-4 w-4" />
            Urgencia 24h
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-8 md:py-24">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <div
              className="inline-flex items-center gap-3 rounded-full px-3 py-1.5 text-[0.8rem]"
              style={{ background: `${BRASS}14`, border: `1px solid ${BRASS}55`, color: BRASS_DARK }}
            >
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
              Matrícula profesional MP 1234 · Habilitado ENARGAS
            </div>

            <h1
              className="mt-6 leading-[1.04] tracking-[-0.018em]"
              style={{
                fontSize: "clamp(2.3rem, 5.5vw, 4rem)",
                fontWeight: 700,
                color: INK,
              }}
            >
              Plomero gasista
              <br />
              matriculado.
              <br />
              <span style={{ color: NAVY }}>15 años en CABA y GBA Sur.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.04rem] leading-relaxed" style={{ color: MUTED }}>
              Habilitaciones municipales, instalación de equipos, certificados
              de gas para escritura y urgencias 24h. Te paso presupuesto por
              WhatsApp el mismo día.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={waUrg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-[0.96rem] font-semibold transition-transform hover:scale-[1.02]"
                style={{ background: "#9d2b2b", color: PAPER }}
              >
                <Flame className="h-4 w-4" />
                Urgencias 24h por WhatsApp
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-[0.96rem] font-medium"
                style={{ background: NAVY, color: PAPER }}
              >
                <MessageCircle className="h-4 w-4" />
                Pedir presupuesto
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-2 max-w-md">
              {[
                { l: "Años", v: "15+" },
                { l: "Obras", v: "1.200+" },
                { l: "Resp.", v: "ART vigente" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[0.78rem]" style={{ color: MUTED }}>
                    {s.l}
                  </p>
                  <p className="text-[1.4rem] font-bold tracking-[-0.02em]" style={{ color: INK }}>
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            className="md:col-span-5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...t, delay: 0.08 }}
          >
            <div className="relative">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                style={{ background: `${NAVY}10` }}
              >
                <Image
                  src={PORTRAIT}
                  alt="Miguel Romero, gasista matriculado MP 1234"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 35vw"
                  priority
                />
              </div>
              <div
                className="absolute -bottom-5 -left-5 flex w-[180px] flex-col items-start gap-1 rounded-2xl px-5 py-4"
                style={{
                  background: PAPER,
                  border: `2px solid ${BRASS}`,
                  boxShadow: `0 16px 40px -20px ${INK}40`,
                }}
              >
                <div className="flex items-center gap-2 text-[0.7rem]" style={{ color: BRASS_DARK }}>
                  <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Matrícula vigente
                </div>
                <p className="text-[1.45rem] font-bold leading-none tracking-[-0.02em]" style={{ color: INK }}>
                  MP 1234
                </p>
                <p className="text-[0.74rem]" style={{ color: MUTED }}>
                  ENARGAS · CABA · GBA Sur
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section
        id="servicios"
        className="py-20 md:py-24"
        style={{ background: PAPER, borderTop: `1px solid ${INK}0d`, borderBottom: `1px solid ${INK}0d` }}
      >
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.84rem]" style={{ color: BRASS_DARK }}>
              Servicios
            </p>
            <h2
              className="mt-2 text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.015em]"
              style={{ color: INK }}
            >
              Trabajos que hacemos. Tiempos reales.
            </h2>
            <p className="mt-3 text-[0.98rem]" style={{ color: MUTED }}>
              Listado completo con tiempos estimados. Si tu necesidad no
              aparece, escribime y vemos.
            </p>
          </div>

          <ul className="mt-12">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...tUi, delay: i * 0.04 }}
                className="grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t py-7"
                style={{ borderColor: `${INK}14` }}
              >
                <div
                  className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `${NAVY}14`, color: NAVY }}
                >
                  <Wrench className="h-4 w-4" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-[1.08rem] font-semibold" style={{ color: INK }}>
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[0.94rem] leading-relaxed" style={{ color: MUTED }}>
                    {s.desc}
                  </p>
                </div>
                <div
                  className="hidden shrink-0 rounded-full px-3 py-1 text-[0.78rem] font-medium sm:inline-flex"
                  style={{ background: `${BRASS}14`, color: BRASS_DARK }}
                >
                  {s.eta}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trabajos" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-[0.84rem]" style={{ color: BRASS_DARK }}>
              Trabajos hechos
            </p>
            <h2
              className="mt-2 text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.015em]"
              style={{ color: INK }}
            >
              Antes y después. Sin Photoshop.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[v.a, v.b, v.c].map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...t, delay: i * 0.06 }}
                className="space-y-3"
              >
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  style={{ background: `${NAVY}08`, border: `1px solid ${INK}10` }}
                >
                  <Image
                    src={src}
                    alt={`Obra ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="text-[0.92rem]" style={{ color: MUTED }}>
                  Obra {String(i + 1).padStart(2, "0")} ·{" "}
                  {[
                    "Cambio de cañería interna · Caballito",
                    "Termotanque + habilitación · San Cristóbal",
                    "Reparación pérdida + cert. venta · Boedo",
                  ][i]}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="zona" className="py-20 md:py-28" style={{ background: PAPER }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="text-[0.84rem]" style={{ color: BRASS_DARK }}>
              Zona de trabajo
            </p>
            <h2
              className="mt-2 text-[clamp(1.85rem,4vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.015em]"
              style={{ color: INK }}
            >
              CABA + GBA Sur, en el día.
            </h2>
            <p className="mt-4 text-[0.98rem]" style={{ color: MUTED }}>
              Almagro, Boedo, San Cristóbal, Constitución, Pompeya, Barracas y
              Lanús. Para urgencias salgo en moto, 30 a 60 minutos según
              tránsito.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Visita técnica gratuita en CABA",
                "Presupuesto por WhatsApp con fotos",
                "Pago: efectivo, transferencia, débito",
                "Factura A o C según corresponda",
              ].map((row) => (
                <li key={row} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0"
                    style={{ color: BRASS_DARK }}
                    strokeWidth={1.8}
                  />
                  <span className="text-[0.96rem]" style={{ color: INK }}>
                    {row}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-[0.84rem]" style={{ background: `${NAVY}10`, color: NAVY }}>
              <MapPin className="h-4 w-4" />
              Av. La Plata 1880, CABA · Atención por turno
            </div>
          </div>

          <div
            className="rounded-3xl p-8 md:p-9"
            style={{ background: INK, color: PAPER }}
          >
            <p className="text-[0.82rem]" style={{ color: `${BRASS}cc` }}>
              Familias que me eligen
            </p>
            <blockquote className="mt-3 text-[1.2rem] leading-relaxed md:text-[1.3rem]">
              &ldquo;Me hicieron toda la instalación de gas para escriturar.
              Pasaron en el día, trabajo prolijo, certificado en mano. Volvería
              sin dudar.&rdquo;
            </blockquote>
            <p className="mt-5 text-[0.92rem]" style={{ color: `${PAPER}aa` }}>
              Mariana Solís · escrituración Boedo
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-7" style={{ borderColor: `${PAPER}1a` }}>
              <a
                href="tel:+5491100000000"
                className="inline-flex items-center gap-2 text-[0.94rem]"
                style={{ color: PAPER }}
              >
                <Phone className="h-4 w-4" /> 11 0000 0000
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.94rem]"
                style={{ color: PAPER }}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={slug}
        brandLabel="Gasista MP 1234"
        theme={{
          ...v.lead,
          invert: true,
          section: "py-20 md:py-28",
          card: "rounded-3xl p-7 md:p-10",
          label: "text-[0.84rem]",
          input: "mt-1 w-full border-b border-[#0d1b2a]/15 bg-transparent px-0 py-3 text-[0.96rem] text-[#0d1b2a] outline-none focus:border-[#173757]",
          button: "w-full rounded-xl bg-[#0d1b2a] py-3.5 text-[0.95rem] font-semibold text-[#f6f1e6]",
          focus: "focus:border-[#173757]",
        }}
        kicker="Contame qué necesitás"
        title="Presupuesto sin compromiso"
        sub="Mandame fotos del trabajo por WhatsApp y te paso presupuesto en el día. Visita gratuita en CABA."
      />

      <footer className="border-t py-10" style={{ borderColor: `${INK}10`, background: CREAM }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-[0.84rem] md:flex-row md:px-8">
          <span style={{ color: MUTED }}>
            © Miguel Romero · MP 1234 · CABA + GBA Sur · ART vigente
          </span>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{ color: INK }}
          >
            <ArrowRight className="h-3.5 w-3.5" /> Coordinar visita
          </a>
        </div>
      </footer>
    </div>
  );
}
