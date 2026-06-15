"use client";

/**
 * VETERINARIA — neighborhood vet clinic.
 *
 * Identity: warm sage + clay on cream surface (cream as CARD only, never body bg).
 * Body is off-white #fbfaf6. Soft serif headline (Instrument Serif) paired with
 * Plus Jakarta body. No luxury cosplay. No ALL-CAPS eyebrows. No "01/02/03".
 *
 * Layout move: split hero with friendly clinic photo on the right, opening hours
 * and matrícula veterinaria pill above-the-fold. Services in a soft 2x3 grid
 * with sage hairline. Testimonials as serif italic single quotes, no card.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bone,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  PawPrint,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { MagneticButton, ScrollReveal } from "@/components/primitives";
import { DemoLeadForm } from "./demo-lead-form";

const SLUG = "veterinaria" as const;
const BRAND = "Don Pancho";
const WA_URL = "https://wa.me/5491100000000?text=Hola%20Don%20Pancho%2C%20necesito%20una%20consulta";
const URGENCIAS_URL = "https://wa.me/5491100000000?text=URGENCIA%20-%20mi%20mascota%20necesita%20atenci%C3%B3n%20ya%21";

const SAGE = "#5b7a5c";
const SAGE_DARK = "#3f5a40";
const CLAY = "#c87b54";
const INK = "#1c2421";
const PAPER = "#fbfaf6";
const CREAM = "#f1ecdf";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Consulta general",
    desc: "Examen clínico completo, vacunación y plan sanitario por etapa de vida.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    desc: "Plan anual con recordatorio por WhatsApp. Antirrábica, séxtuple y triple felina.",
  },
  {
    icon: Scissors,
    title: "Cirugía",
    desc: "Castraciones, tumores benignos y traumatología con anestesia monitoreada.",
  },
  {
    icon: PawPrint,
    title: "Peluquería",
    desc: "Baño, corte y desenredo sin sedación. Reservá el turno y dejá tu mascota desde las 9.",
  },
  {
    icon: Bone,
    title: "Nutrición",
    desc: "Plan alimentario para sobrepeso, alergias o cachorros. Te asesoramos sin venderte de más.",
  },
  {
    icon: HeartPulse,
    title: "Exóticos",
    desc: "Conejos, hurones, aves, reptiles. Atención específica con especialista los jueves.",
  },
] as const;

const HOURS = [
  { d: "Lunes a viernes", h: "9:00 — 20:00" },
  { d: "Sábados", h: "9:00 — 14:00" },
  { d: "Domingos", h: "Urgencias por WhatsApp" },
] as const;

const TESTIMONIALS = [
  {
    text: "Atendieron a Mocha de madrugada cuando se intoxicó. Don Pancho contestó el WhatsApp en cinco minutos. Hoy está perfecta.",
    name: "Mariana B.",
    pet: "con Mocha, 4 años",
  },
  {
    text: "Llevo a Roco y a Pulga acá desde 2014. La doctora Carla explica todo sin tecnicismos y nunca infla la factura.",
    name: "Federico L.",
    pet: "con Roco (15) y Pulga (3)",
  },
  {
    text: "Mi conejo necesitaba un veterinario de exóticos y son los únicos del barrio que saben. Precio justo, mucha paciencia.",
    name: "Sofía Q.",
    pet: "con Tito, conejo holandés",
  },
] as const;

export function DemoVeterinariaLanding() {
  const v = getDemoVisuals(SLUG);
  const t = useMotionTransition("display");
  const tUi = useMotionTransition("ui");
  const [openDay, setOpenDay] = useState(true);

  useEffect(() => {
    const h = new Date().getHours();
    const day = new Date().getDay();
    const inHours =
      (day >= 1 && day <= 5 && h >= 9 && h < 20) ||
      (day === 6 && h >= 9 && h < 14);
    setOpenDay(inHours);
  }, []);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{
        background: PAPER,
        color: INK,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
      }}
    >
      <header
        className="sticky top-0 z-40"
        style={{
          background: `${PAPER}f2`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${INK}10`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: SAGE, color: PAPER }}
            >
              <PawPrint className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-[1.25rem] leading-none"
                style={{ fontFamily: "var(--font-instrument), serif", color: INK }}
              >
                Veterinaria {BRAND}
              </span>
              <span className="text-[0.72rem]" style={{ color: SAGE_DARK }}>
                Almagro · MP Vet. 4821
              </span>
            </div>
          </div>

          <nav
            className="hidden items-center gap-7 text-[0.92rem] md:flex"
            style={{ color: `${INK}b3` }}
          >
            <a href="#servicios">Servicios</a>
            <a href="#equipo">Equipo</a>
            <a href="#testimonios">Familias</a>
            <a href="#horarios">Horarios</a>
          </nav>

          <a
            href={URGENCIAS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-transform hover:scale-[1.02]"
            style={{ background: CLAY, color: PAPER }}
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Urgencias
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-12 md:gap-16 md:px-8 md:py-24">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.76rem]"
              style={{
                background: openDay ? `${SAGE}1a` : `${CLAY}1a`,
                color: openDay ? SAGE_DARK : CLAY,
                border: `1px solid ${openDay ? SAGE : CLAY}33`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: openDay ? SAGE : CLAY }}
              />
              {openDay ? "Abierto ahora" : "Cerrado · urgencias por WhatsApp"}
            </div>

            <h1
              className="leading-[1.02] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(2.4rem, 6vw, 4.6rem)",
                color: INK,
              }}
            >
              Veterinaria de barrio.
              <br />
              <span style={{ color: SAGE_DARK, fontStyle: "italic" }}>
                12 años cuidando
              </span>{" "}
              perros, gatos y exóticos.
            </h1>

            <p
              className="mt-6 max-w-xl text-[1.04rem] leading-relaxed"
              style={{ color: `${INK}b3` }}
            >
              Don Pancho atiende en Almagro desde 2013. Consultas, vacunación,
              cirugía, peluquería y atención de animales exóticos los jueves.
              Te respondemos el WhatsApp el mismo día.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton
                href={WA_URL}
                variant="ghost"
                strength={8}
                className="!gap-2 !rounded-full !px-5 !py-3 !text-[0.95rem] !font-medium bg-[#1c2421] !text-[#fbfaf6]"
                ariaLabel="Pedir turno por WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                Pedir turno por WhatsApp
              </MagneticButton>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.95rem]"
                style={{ border: `1px solid ${INK}26`, color: INK }}
              >
                Ver servicios <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-[0.82rem]" style={{ color: `${INK}80` }}>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" style={{ color: SAGE_DARK }} />
                Matrícula profesional 4821
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: SAGE_DARK }} />
                Av. Corrientes 4750, Almagro
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative md:col-span-5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...t, delay: 0.1 }}
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[28px]"
              style={{ background: CREAM, boxShadow: `0 30px 80px -40px ${INK}40` }}
            >
              <Image
                src={v.cover}
                alt="Veterinaria Don Pancho, Almagro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>

            <div
              className="absolute -bottom-6 -left-6 hidden rounded-2xl p-5 md:block"
              style={{
                background: PAPER,
                border: `1px solid ${INK}14`,
                boxShadow: `0 18px 40px -20px ${INK}30`,
                minWidth: 240,
              }}
            >
              <p className="text-[0.7rem]" style={{ color: SAGE_DARK, letterSpacing: "0.02em" }}>
                Horarios
              </p>
              <p className="mt-1 text-[1rem]" style={{ fontFamily: "var(--font-instrument), serif" }}>
                Lun – Vie · 9 a 20 hs
              </p>
              <p className="text-[0.84rem]" style={{ color: `${INK}99` }}>
                Sábados · 9 a 14 hs
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicios" className="py-20 md:py-28" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal className="max-w-2xl">
            <p className="text-[0.82rem]" style={{ color: SAGE_DARK }}>
              Lo que hacemos
            </p>
            <h2
              className="mt-2 leading-[1.05]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                color: INK,
              }}
            >
              Atención clínica, sin
              <span style={{ fontStyle: "italic", color: SAGE_DARK }}> sobreventa</span>.
            </h2>
            <p className="mt-4 text-[1rem]" style={{ color: `${INK}b3` }}>
              Nuestro principio: te decimos lo que tu mascota realmente
              necesita. Si no hace falta un estudio, no lo pedimos.
            </p>
          </ScrollReveal>

          <div
            className="mt-12 grid gap-px overflow-hidden rounded-3xl"
            style={{ background: `${INK}10`, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          >
            {SERVICES.map((s) => (
              <motion.article
                key={s.title}
                className="p-7 transition-colors"
                style={{ background: PAPER }}
                whileHover={{ background: `${SAGE}08` }}
                transition={tUi}
              >
                <div
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: `${SAGE}15`, color: SAGE_DARK }}
                >
                  <s.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3
                  className="text-[1.18rem] leading-tight"
                  style={{ fontFamily: "var(--font-instrument), serif", color: INK }}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed" style={{ color: `${INK}99` }}>
                  {s.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="equipo" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]" style={{ background: CREAM }}>
            <Image
              src={v.a}
              alt="Equipo Don Pancho"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[0.82rem]" style={{ color: SAGE_DARK }}>
              El equipo
            </p>
            <h2
              className="mt-2 leading-[1.05]"
              style={{
                fontFamily: "var(--font-instrument), serif",
                fontSize: "clamp(1.85rem, 4vw, 2.8rem)",
                color: INK,
              }}
            >
              Tres veterinarios. Un único <span style={{ fontStyle: "italic" }}>compromiso</span>.
            </h2>

            <ul className="mt-8 space-y-5">
              {[
                { name: "Dra. Carla Pérez", role: "Clínica y cirugía · 14 años de oficio" },
                { name: "Dr. Mateo Robles", role: "Animales exóticos · jueves y sábados" },
                { name: "Téc. Lucía Aguilar", role: "Peluquería y enfermería · ATR todo el día" },
              ].map((p) => (
                <li key={p.name} className="flex items-start gap-4">
                  <div
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: CLAY }}
                  />
                  <div>
                    <p className="text-[1rem]" style={{ color: INK, fontWeight: 500 }}>
                      {p.name}
                    </p>
                    <p className="text-[0.92rem]" style={{ color: `${INK}99` }}>
                      {p.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-9 text-[0.96rem] leading-relaxed" style={{ color: `${INK}b3` }}>
              Atendemos con la creencia simple de que tu animal no es un
              cliente. Por eso te llamamos por el nombre de tu mascota cuando
              te ve por la puerta.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-20 md:py-28" style={{ background: CREAM }}>
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <p className="text-[0.82rem]" style={{ color: SAGE_DARK }}>
            Familias del barrio
          </p>
          <h2
            className="mt-2 max-w-2xl leading-[1.05]"
            style={{
              fontFamily: "var(--font-instrument), serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: INK,
            }}
          >
            Lo que dicen quienes nos eligen hace años.
          </h2>

          <div className="mt-14 space-y-12">
            {TESTIMONIALS.map((q, i) => (
              <motion.figure
                key={q.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...t, delay: i * 0.08 }}
                className="border-t pt-9"
                style={{ borderColor: `${INK}1a` }}
              >
                <blockquote
                  className="leading-snug"
                  style={{
                    fontFamily: "var(--font-instrument), serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)",
                    color: INK,
                  }}
                >
                  &ldquo;{q.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[0.92rem]" style={{ color: SAGE_DARK }}>
                  {q.name} <span style={{ color: `${INK}80` }}>· {q.pet}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="horarios" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div
            className="rounded-3xl p-9"
            style={{ background: INK, color: PAPER }}
          >
            <p className="text-[0.82rem]" style={{ color: `${CREAM}aa` }}>
              Horarios y dirección
            </p>
            <h2
              className="mt-2 leading-[1.05]"
              style={{ fontFamily: "var(--font-instrument), serif", fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)" }}
            >
              Estamos en Almagro.
            </h2>

            <div className="mt-8 space-y-3">
              {HOURS.map((row) => (
                <div
                  key={row.d}
                  className="flex items-center justify-between border-b pb-3 text-[0.95rem]"
                  style={{ borderColor: `${PAPER}1a` }}
                >
                  <span style={{ color: `${PAPER}cc` }}>{row.d}</span>
                  <span style={{ color: PAPER, fontFamily: "var(--font-instrument), serif" }}>
                    {row.h}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={URGENCIAS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-medium"
              style={{ background: CLAY, color: PAPER }}
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Urgencia · WhatsApp 24h
            </a>
          </div>

          <div>
            <h3
              className="leading-[1.05]"
              style={{ fontFamily: "var(--font-instrument), serif", fontSize: "clamp(1.4rem, 2.6vw, 1.85rem)", color: INK }}
            >
              Cerca de la estación de Castro Barros
            </h3>
            <p className="mt-3 text-[0.96rem]" style={{ color: `${INK}99` }}>
              Av. Corrientes 4750, esquina Castro Barros.
              <br />
              Estacionamiento medido en la cuadra.
              <br />
              Frente al kiosco de diarios.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {[v.b, v.c, v.cover].map((src, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                  style={{ background: CREAM }}
                >
                  <Image
                    src={src}
                    alt={`Foto clínica ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>

            <div
              className="mt-8 flex items-center gap-3 rounded-2xl p-4"
              style={{ background: `${SAGE}10`, border: `1px solid ${SAGE}33` }}
            >
              <Sparkles className="h-5 w-5 shrink-0" style={{ color: SAGE_DARK }} />
              <p className="text-[0.92rem]" style={{ color: INK }}>
                Convenio con Provet y OSDE Salud Animal · 20% off en planes anuales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={`Veterinaria ${BRAND}`}
        theme={{
          ...v.lead,
          invert: true,
          section: "py-20 md:py-28",
          card: "rounded-3xl p-7 md:p-10",
          label: "text-[0.82rem]",
          input: "mt-1 w-full border-b border-[#1c2421]/15 bg-transparent px-0 py-3 text-[0.96rem] text-[#1c2421] outline-none focus:border-[#3f5a40]",
          button: "w-full rounded-full bg-[#1c2421] py-3.5 text-[0.95rem] font-medium text-[#fbfaf6]",
          focus: "focus:border-[#3f5a40]",
        }}
        kicker="Contanos sobre tu mascota"
        title="Reservá tu turno"
        sub="Te contestamos en el día. Para urgencias, escribinos directo al WhatsApp del consultorio."
      />

      <footer
        className="border-t py-10"
        style={{ borderColor: `${INK}14`, background: PAPER }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-[0.84rem] md:flex-row md:px-8">
          <span style={{ color: `${INK}80` }}>
            © Veterinaria {BRAND} · MP Vet. 4821 · Almagro
          </span>
          <span style={{ color: `${INK}66` }}>
            Demo · Mads Jeez Design
          </span>
        </div>
      </footer>
    </div>
  );
}

export { DemoVeterinariaLanding as DemoVeterinaria };
