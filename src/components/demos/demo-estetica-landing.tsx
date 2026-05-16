"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Plus,
  Share2,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-estetica-premium.css";

const SLUG = "estetica" as const;
const BRAND = "Aura Estética";

const METHOD = [
  {
    n: "01.",
    title: "Escaneo digital",
    text: "Analizamos la profundidad de los poros, niveles de hidratación y daño UV mediante tecnología de imagen multiespectral.",
  },
  {
    n: "02.",
    title: "Plan de acción",
    text: "Diseñamos una rutina personalizada combinando aparatología avanzada y activos biológicos de alta pureza.",
  },
  {
    n: "03.",
    title: "Seguimiento",
    text: "Monitoreamos la evolución cada 15 días ajustando las fórmulas según la respuesta biológica de tu piel.",
  },
] as const;

const TREATMENTS = [
  {
    id: "hifu",
    badge: "Best seller",
    name: "Lifting sin cirugía (HIFU)",
    description:
      "Ultrasonido focalizado de alta intensidad que estimula la producción de colágeno en las capas más profundas de la dermis. Ideal para tensado facial y definición del óvalo.",
    perks: ["Sesión: 60 minutos", "Recuperación: inmediata", "Duración: hasta 12 meses"],
    price: 24000,
  },
  {
    id: "plasma",
    badge: "Premium care",
    name: "Bioestimulación con plasma",
    description:
      "Utilizamos los factores de crecimiento de tu propia sangre para regenerar tejidos dañados, unificar el tono y aportar luminosidad inalcanzable con cosmética convencional.",
    perks: ["Grado médico", "Resultados progresivos", "100% biocompatible"],
    price: 18500,
  },
  {
    id: "peel",
    badge: "Detox",
    name: "Carbon peel laser",
    description:
      'El famoso "Hollywood Peel". Máscara de carbón activo vaporizada por láser que elimina impurezas, cierra poros y deja un acabado mate y suave instantáneo.',
    perks: ["Sin dolor", "Efecto porcelana", "Post-tratamiento: SPF"],
    price: 15200,
  },
] as const;

const FAQ = [
  {
    q: "¿Necesito evaluación previa?",
    a: "Sí. En Aura no realizamos ningún tratamiento sin un diagnóstico previo con nuestro escáner digital para asegurar que el protocolo sea el indicado para tu biotipo cutáneo.",
  },
  {
    q: "¿Son tratamientos dolorosos?",
    a: "Nuestra filosofía es mínimamente invasiva. La mayoría de los protocolos solo generan una sensación de calor o cosquilleo, totalmente tolerables.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Solicitamos un aviso de al menos 24 horas. Los turnos son limitados y personalizados para cada paciente.",
  },
] as const;

function formatPrice(n: number) {
  return `$${n.toLocaleString("es-AR")}`;
}

export function DemoEsteticaLanding() {
  const v = getDemoVisuals(SLUG);
  const treatmentImages = [v.a, v.b, v.c];
  const [bookingOpen, setBookingOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [treatmentSlide, setTreatmentSlide] = useState(0);

  const toggleBooking = useCallback(() => setBookingOpen((o) => !o), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  return (
    <div className="aura-premium relative min-h-screen overflow-x-hidden bg-[#faf7f4] font-[family-name:var(--font-demo-b-estetica)] text-[#3d3d3d] antialiased selection:bg-[#c48e58]/20">
      <div
        className="aura-blob -right-40 -top-40 h-[800px] w-[800px] bg-[#f2ebe4]"
        aria-hidden
      />

      {/* Nav */}
      <nav
        className={`aura-nav fixed top-0 z-50 w-full px-6 py-5 md:px-8 ${navScrolled ? "is-scrolled" : ""}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-[family-name:var(--font-demo-h-estetica)] text-2xl leading-none tracking-[0.2em] text-[#c48e58] md:text-3xl">
              AURA
            </h1>
            <span className="mt-1 text-[8px] uppercase tracking-[0.5em] opacity-60">
              Advanced skin clinic
            </span>
          </div>

          <div className="hidden items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] lg:flex">
            <a href="#filosofia" className="transition-colors hover:text-[#c48e58]">
              Nuestra visión
            </a>
            <a href="#metodo" className="transition-colors hover:text-[#c48e58]">
              El método
            </a>
            <a href="#servicios" className="transition-colors hover:text-[#c48e58]">
              Tratamientos
            </a>
            <a href="#faq" className="transition-colors hover:text-[#c48e58]">
              Consultas
            </a>
          </div>

          <button
            type="button"
            onClick={toggleBooking}
            className="aura-btn px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] md:px-8 md:py-3"
          >
            Agendar diagnóstico
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen items-center px-6 pb-16 pt-28 md:px-8 md:pt-20">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12">
          <div className="aura-reveal lg:col-span-6">
            <h5 className="mb-8 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.6em] text-[#c48e58]">
              <span className="h-px w-8 bg-[#c48e58]" />
              Pioneros en dermocosmética
            </h5>
            <h2 className="mb-10 font-[family-name:var(--font-demo-h-estetica)] text-5xl leading-[0.95] text-gray-800 md:text-7xl lg:text-[5.5rem]">
              Ciencia aplicada <br />a la{" "}
              <span className="font-light italic text-[#c48e58]">belleza real.</span>
            </h2>
            <p className="mb-12 max-w-xl text-lg font-light leading-relaxed text-gray-500 md:text-xl">
              No creemos en soluciones mágicas, sino en protocolos basados en la fisiología de tu
              propia piel. Diagnóstico digital y tratamientos de grado médico.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <button
                type="button"
                onClick={toggleBooking}
                className="aura-btn px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] shadow-lg md:px-12"
              >
                Comenzar proceso
              </button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["A", "M", "L"].map((initial) => (
                    <span
                      key={initial}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#f2ebe4] text-[10px] font-bold text-[#c48e58]"
                    >
                      {initial}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  +2.500 pacientes felices
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-xl">
              <div className="aura-img-mask relative aspect-square w-full overflow-hidden bg-gray-200 shadow-2xl">
                <Image
                  src={v.cover}
                  alt="Tratamiento facial profesional"
                  fill
                  priority
                  className="scale-110 object-cover transition-transform duration-1000 hover:scale-100"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute right-0 top-10 rounded-sm border-l-4 border-[#c48e58] bg-white/80 p-6 shadow-xl backdrop-blur">
                <p className="font-[family-name:var(--font-demo-h-estetica)] text-3xl leading-none text-[#c48e58]">
                  98%
                </p>
                <p className="mt-2 text-[8px] font-bold uppercase tracking-widest">
                  Efectividad en <br />
                  rejuvenecimiento
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section
        id="filosofia"
        className="relative z-10 border-y border-gray-100 bg-white/60 px-6 py-24 md:px-8 md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c48e58]">
            Nuestra visión
          </span>
          <h3 className="mt-6 font-[family-name:var(--font-demo-h-estetica)] text-4xl text-gray-800 md:text-5xl">
            Salud cutánea <span className="font-light italic">antes que moda.</span>
          </h3>
          <p className="mt-8 text-base font-light leading-relaxed text-gray-500 md:text-lg">
            {BRAND} combina medicina estética, tecnología de diagnóstico y formulación propia para
            resultados medibles. Cada protocolo se documenta y ajusta con datos, no con promesas
            vacías.
          </p>
        </div>
      </section>

      {/* Método */}
      <section
        id="metodo"
        className="relative z-10 border-y border-gray-100 bg-white/50 px-6 py-24 md:px-8 md:py-40"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-3 lg:gap-20">
            {METHOD.map((step) => (
              <div key={step.n} className="space-y-6">
                <span className="font-[family-name:var(--font-demo-h-estetica)] text-4xl italic text-[#c48e58]">
                  {step.n}
                </span>
                <h4 className="text-lg font-bold uppercase tracking-widest">{step.title}</h4>
                <p className="text-sm font-light leading-relaxed text-gray-400">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tratamientos */}
      <section id="servicios" className="relative z-10 px-6 py-24 md:px-8 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col items-end justify-between gap-10 md:mb-24 md:flex-row">
            <div className="max-w-2xl">
              <h3 className="mb-8 font-[family-name:var(--font-demo-h-estetica)] text-4xl text-gray-800 md:text-6xl">
                Nuestras <span className="font-light italic">especialidades</span>
              </h3>
              <p className="font-light leading-relaxed text-gray-400">
                Cada tratamiento es una pieza de ingeniería estética diseñada para restaurar el
                equilibrio celular sin procedimientos invasivos.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => setTreatmentSlide((s) => (s === 0 ? 2 : s - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-all hover:border-[#c48e58] hover:text-[#c48e58]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => setTreatmentSlide((s) => (s === 2 ? 0 : s + 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 transition-all hover:border-[#c48e58] hover:text-[#c48e58]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {TREATMENTS.map((t, i) => (
              <article
                key={t.id}
                className={`aura-premium-card group overflow-hidden ${i === treatmentSlide ? "ring-1 ring-[#c48e58]/30 lg:ring-0" : ""}`}
              >
                <div className="relative h-72 overflow-hidden md:h-80">
                  <Image
                    src={treatmentImages[i] ?? v.cover}
                    alt={t.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute left-6 top-6 bg-white/90 px-4 py-2 text-[8px] font-black uppercase tracking-widest">
                    {t.badge}
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <h4 className="mb-6 font-[family-name:var(--font-demo-h-estetica)] text-2xl md:text-3xl">
                    {t.name}
                  </h4>
                  <p className="mb-8 text-sm font-light leading-relaxed text-gray-400">
                    {t.description}
                  </p>
                  <ul className="mb-10 space-y-3">
                    {t.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-3 text-[10px] font-bold uppercase text-[#c48e58]/60"
                      >
                        <Check className="h-4 w-4 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-demo-h-estetica)] text-2xl">
                      {formatPrice(t.price)}
                    </span>
                    <button
                      type="button"
                      onClick={toggleBooking}
                      className="border-b border-[#c48e58] pb-1 text-[10px] font-black uppercase tracking-widest"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 bg-zinc-900 px-6 py-24 text-white md:px-8 md:py-40">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-16 text-center font-[family-name:var(--font-demo-h-estetica)] text-4xl italic text-[#c48e58] md:mb-20 md:text-5xl">
            Consultas frecuentes
          </h3>
          <div className="space-y-6">
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="group w-full border-b border-white/10 pb-6 text-left"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h5 className="text-sm font-bold uppercase tracking-widest">{item.q}</h5>
                    <Plus
                      className={`h-4 w-4 shrink-0 text-[#c48e58] transition-transform ${open ? "rotate-45" : "group-hover:rotate-45"}`}
                    />
                  </div>
                  <p
                    className={`text-sm font-light text-white/40 ${open ? "block" : "hidden"}`}
                  >
                    {item.a}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Contacto clínico"
        title="Consultá con nuestro equipo"
        sub="Reservá diagnóstico, preguntá por protocolos o coordiná seguimiento post-tratamiento."
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 px-6 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-4 lg:gap-20">
          <div>
            <h4 className="mb-6 font-[family-name:var(--font-demo-h-estetica)] text-3xl">AURA</h4>
            <p className="text-xs leading-loose text-gray-400">
              Excelencia en estética avanzada. El equilibrio perfecto entre salud y belleza consciente.
            </p>
            <div className="mt-10 flex gap-6">
              <Share2 className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-[#c48e58]" />
              <Globe className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-[#c48e58]" />
              <Briefcase className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-[#c48e58]" />
            </div>
          </div>
          <div>
            <h5 className="mb-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#c48e58]">
              Navegación
            </h5>
            <ul className="space-y-4 text-xs text-gray-400">
              <li>
                <a href="#metodo" className="transition-colors hover:text-[#c48e58]">
                  El método digital
                </a>
              </li>
              <li>
                <a href="#servicios" className="transition-colors hover:text-[#c48e58]">
                  Tratamientos médicos
                </a>
              </li>
              <li>
                <Link href="#lead-estetica" className="transition-colors hover:text-[#c48e58]">
                  Productos home care
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#c48e58]">
              Ubicación
            </h5>
            <p className="text-xs leading-loose text-gray-400">
              Av. Alvear 1800, Recoleta
              <br />
              CABA, Argentina
              <br />
              +54 911 5566 7788
            </p>
          </div>
          <div>
            <h5 className="mb-8 text-[9px] font-black uppercase tracking-[0.4em] text-[#c48e58]">
              Newsletter
            </h5>
            <p className="mb-6 text-xs text-gray-400">
              Recibí consejos de cuidado y lanzamientos exclusivos.
            </p>
            <div className="flex border-b border-gray-200 pb-2">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full bg-transparent text-xs outline-none"
              />
              <button type="button" className="text-[10px] font-bold uppercase text-[#c48e58]">
                Unirse
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal reservas */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${bookingOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!bookingOpen}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeBooking}
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
        />
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col overflow-y-auto bg-white p-10 shadow-2xl md:p-16">
          <div className="mb-12 flex items-start justify-between gap-6 md:mb-16">
            <div>
              <h3 className="font-[family-name:var(--font-demo-h-estetica)] text-4xl italic leading-none md:text-5xl">
                Mi turno
              </h3>
              <p className="mt-4 text-[9px] uppercase tracking-widest text-[#c48e58]">
                Completá tu solicitud de diagnóstico
              </p>
            </div>
            <button
              type="button"
              onClick={closeBooking}
              className="text-gray-300 transition-colors hover:text-[#c48e58]"
              aria-label="Cerrar panel"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          <form
            className="space-y-10"
            onSubmit={(e) => {
              e.preventDefault();
              closeBooking();
              document.getElementById("lead-estetica")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-b border-gray-100 pb-4">
                <label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-[#c48e58]">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </div>
              <div className="border-b border-gray-100 pb-4">
                <label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-[#c48e58]">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </div>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-[#c48e58]">
                Tratamiento de interés
              </label>
              <select className="w-full bg-transparent text-sm font-medium outline-none">
                <option>Diagnóstico digital (recomendado)</option>
                <option>Lifting sin cirugía (HIFU)</option>
                <option>Bioestimulación con plasma</option>
                <option>Carbon peel laser</option>
                <option>Consulta dermatológica</option>
              </select>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <label className="mb-2 block text-[8px] font-black uppercase tracking-widest text-[#c48e58]">
                Preocupación principal
              </label>
              <textarea
                rows={3}
                placeholder="Arrugas, manchas, acné, flacidez..."
                className="w-full resize-none bg-transparent text-sm font-medium outline-none placeholder:text-gray-200"
              />
            </div>

            <div className="rounded-sm border border-[#c48e58]/10 bg-[#faf7f4] p-8">
              <p className="text-[10px] italic leading-relaxed text-[#c48e58]">
                * Al solicitar tu turno, uno de nuestros especialistas se contactará en un plazo de
                2 horas hábiles para coordinar el horario exacto.
              </p>
            </div>

            <button
              type="submit"
              className="aura-btn w-full py-6 text-[11px] font-black uppercase tracking-[0.4em] shadow-xl"
            >
              Solicitar turno ahora
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export { DemoEsteticaLanding as DemoEstetica };
