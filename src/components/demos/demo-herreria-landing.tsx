"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Flame,
  Hammer,
  Layers,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { site } from "@/lib/data";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-herreria-premium.css";

const SLUG = "herreria" as const;
const BRAND = "Forja Norte";

const NAV = ["Servicios", "Obras", "Proceso", "Contacto"] as const;

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=82&ixlib=rb-4.0.3`;

const SERVICES = [
  {
    title: "Portones & accesos",
    desc: "Corredizos, batientes y automáticos con motores demo y cerradura reforzada.",
    icon: Hammer,
  },
  {
    title: "Barandas & balcones",
    desc: "Diseños minimalistas o clásicos con terminación anticorrosiva y soldadura TIG.",
    icon: Layers,
  },
  {
    title: "Escaleras & estructuras",
    desc: "Caracol, rectas y pérgolas calculadas para carga y normativa local.",
    icon: Ruler,
  },
  {
    title: "Herrería artística",
    desc: "Piezas a medida: faroles, rejas decorativas y detalles forjados a mano.",
    icon: Sparkles,
  },
  {
    title: "Reparación & refuerzo",
    desc: "Restauración de estructuras oxidadas, refuerzos y mantenimiento programado.",
    icon: Wrench,
  },
  {
    title: "Proyecto llave en mano",
    desc: "Desde boceto hasta instalación con visita técnica y presupuesto PDF.",
    icon: ShieldCheck,
  },
] as const;

const WORKS = [
  {
    title: "Portón doble Palermo",
    cat: "Residencial",
    image: img("photo-1513828583688-cf77e2f7aeeb"),
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Baranda vidrio + acero",
    cat: "Departamento",
    image: img("photo-1541888942225-d81a192d04db"),
    span: "",
  },
  {
    title: "Escalera caracol",
    cat: "Interior",
    image: img("photo-1590649837877-78513ad8d0e8"),
    span: "",
  },
  {
    title: "Pérgola comercial",
    cat: "Local",
    image: img("photo-1503387762-592deb58ef4e"),
    span: "",
  },
  {
    title: "Frente rejas seguridad",
    cat: "Comercial",
    image: img("photo-1590859651225-92e35fd71ca8"),
    span: "md:col-span-2",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Consulta en obra",
    text: "Medimos, fotografiamos y definimos estilo, plazos y presupuesto orientativo.",
  },
  {
    n: "02",
    title: "Diseño & planos",
    text: "Boceto, renders y plano de fabricación con materiales y terminaciones.",
  },
  {
    n: "03",
    title: "Forja en taller",
    text: "Corte, soldadura y tratamiento anticorrosivo en nuestro taller de 400 m².",
  },
  {
    n: "04",
    title: "Instalación",
    text: "Montaje, nivelación y entrega con garantía escrita y manual de cuidado.",
  },
] as const;

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".herr-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

export function DemoHerreriaLanding() {
  const rootRef = useRef<HTMLDivElement>(null);
  const v = getDemoVisuals(SLUG);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useScrollReveal(rootRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav]);

  const scrollToLead = useCallback(() => {
    document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  }, []);

  return (
    <div
      ref={rootRef}
      id="top"
      className="herr-premium relative min-h-screen overflow-x-hidden bg-[#0c0a09] font-[family-name:var(--font-demo-b-herreria)] text-stone-200 antialiased"
    >
      <div className="herr-grain" aria-hidden />
      <div className="herr-ember-glow pointer-events-none fixed inset-0 z-0" aria-hidden />

      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-amber-500/10 bg-[#0c0a09]/95 py-3 shadow-lg backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="#top" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-stone-950">
              <Flame size={22} strokeWidth={2} />
            </div>
            <div>
              <span className="block font-[family-name:var(--font-demo-h-herreria)] text-xl font-bold uppercase tracking-tight text-white">
                {BRAND}
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-amber-500/90">
                Herrería & metalurgia
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 transition-colors hover:text-amber-400"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollToLead}
              className="hidden rounded-lg bg-amber-500 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-stone-950 transition-colors hover:bg-amber-400 md:inline-flex"
            >
              Cotizar obra
            </button>
            <button
              type="button"
              className="rounded-lg border border-stone-700 p-2.5 text-stone-300 lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Menú"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileNav ? (
        <div className="fixed inset-0 z-[110] bg-stone-950/98 p-6 backdrop-blur-xl lg:hidden">
          <div className="flex justify-end">
            <button type="button" onClick={() => setMobileNav(false)} aria-label="Cerrar">
              <X size={28} className="text-white" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-6">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileNav(false)}
                className="font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold uppercase text-white"
              >
                {item}
              </a>
            ))}
            <button
              type="button"
              onClick={scrollToLead}
              className="mt-4 rounded-lg bg-amber-500 py-4 text-sm font-black uppercase tracking-widest text-stone-950"
            >
              Cotizar obra
            </button>
          </nav>
        </div>
      ) : null}

      <section className="relative z-10 min-h-[92vh] pt-28 md:pt-32">
        <div className="absolute inset-0">
          <Image src={v.cover} alt="" fill className="object-cover opacity-50" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/85 to-[#0c0a09]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/60" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pb-20 md:min-h-[calc(92vh-8rem)] md:px-8 md:pb-28">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Taller propio · CABA & GBA
          </p>
          <h1 className="max-w-4xl font-[family-name:var(--font-demo-h-herreria)] text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
            Forjamos estructuras
            <span className="block text-amber-400">que duran generaciones</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone-400 md:text-base">
            Herrería de autor con más de 25 años: portones, barandas, escaleras y piezas a medida. Presupuesto en 48 h y
            garantía escrita en cada obra.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scrollToLead}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-[11px] font-black uppercase tracking-widest text-stone-950 shadow-lg shadow-amber-500/25 transition-colors hover:bg-amber-400"
            >
              Pedir presupuesto <ArrowRight size={16} />
            </button>
            <a
              href="#obras"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-600 px-8 py-4 text-[11px] font-bold uppercase tracking-widest text-stone-300 transition-colors hover:border-amber-500/50 hover:text-white"
            >
              Ver obras <ChevronRight size={16} />
            </a>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-stone-800 pt-10 md:grid-cols-4 md:gap-8">
            {[
              { val: "25+", label: "Años en el rubro" },
              { val: "840+", label: "Obras entregadas" },
              { val: "5 años", label: "Garantía estructural" },
              { val: "48 h", label: "Presupuesto demo" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold text-amber-400 md:text-4xl">
                  {s.val}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-stone-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="relative z-10 border-y border-stone-800/80 bg-[#141210] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="herr-scroll-reveal mb-14 max-w-2xl">
            <div className="herr-title-line mb-6" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500">Qué hacemos</p>
            <h2 className="mt-2 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
              Servicios de herrería integral
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Desde el primer boceto hasta el último tornillo: un solo equipo para obra civil, arquitectura y
              particulares.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="herr-scroll-reveal herr-work-card rounded-2xl border border-stone-800 bg-stone-900/50 p-8"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <s.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-demo-h-herreria)] text-xl font-bold uppercase tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="obras" className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="herr-scroll-reveal mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500">Portfolio</p>
              <h2 className="mt-2 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
                Trabajos recientes
              </h2>
            </div>
            <p className="max-w-md text-sm text-stone-400">
              Cada proyecto incluye plano, fotos de avance y certificado de terminación demo para tu tranquilidad.
            </p>
          </div>
          <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[180px]">
            {WORKS.map((w, i) => (
              <article
                key={w.title}
                className={`herr-scroll-reveal herr-work-card group relative overflow-hidden rounded-2xl border border-stone-800 ${w.span}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">{w.cat}</p>
                  <h3 className="mt-1 font-[family-name:var(--font-demo-h-herreria)] text-lg font-bold uppercase text-white md:text-xl">
                    {w.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="relative z-10 border-t border-stone-800/80 bg-[#141210] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="herr-scroll-reveal relative aspect-[4/5] overflow-hidden rounded-3xl border border-stone-800 lg:aspect-auto lg:min-h-[520px]">
              <Image src={v.b} alt="Taller Forja Norte" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-stone-950/80 p-5 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Taller propio</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  400 m² · Soldadura TIG/MIG · Pintura electrostática
                </p>
              </div>
            </div>
            <div>
              <div className="herr-scroll-reveal herr-title-line mb-6" />
              <div className="herr-scroll-reveal">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500">Cómo trabajamos</p>
                <h2 className="mt-2 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                  Proceso claro, sin sorpresas
                </h2>
              </div>
              <ol className="mt-10 space-y-8">
                {STEPS.map((step, i) => (
                  <li
                    key={step.n}
                    className="herr-scroll-reveal flex gap-6"
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <span className="font-[family-name:var(--font-demo-h-herreria)] text-4xl font-bold leading-none text-amber-500/40">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-bold uppercase tracking-tight text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-stone-400">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="herr-scroll-reveal grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "El portón quedó impecable y la instalación fue en un día. Presupuesto claro y cumplieron plazos.",
                name: "María G.",
                role: "Palermo · Portón corredizo",
              },
              {
                quote: "Nos diseñaron la baranda del balcón con vidrio y acero. Muy profesionales en obra.",
                name: "Estudio R&V",
                role: "Arquitectos · Belgrano",
              },
              {
                quote: "Restauraron una estructura oxidada del local. Parece obra nueva, con garantía por escrito.",
                name: "Diego L.",
                role: "Comercial · La Plata",
              },
            ].map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8">
                <div className="mb-4 flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-stone-300">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 border-t border-stone-800 pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="relative z-10 border-t border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent py-20 md:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="herr-scroll-reveal">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-500">Contacto</p>
              <h2 className="mt-2 font-[family-name:var(--font-demo-h-herreria)] text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
                Contanos tu proyecto
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-stone-400">
                Completá el formulario y te respondemos con visita técnica demo y presupuesto detallado. También podés
                escribirnos por WhatsApp.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3 text-stone-300">
                  <Phone size={18} className="text-amber-400" />
                  +54 11 5555-0192
                </li>
                <li className="flex items-center gap-3 text-stone-300">
                  <MessageCircle size={18} className="text-amber-400" />
                  WhatsApp · respuesta en 2 h
                </li>
              </ul>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  className="rounded-full border border-stone-700 p-3 text-stone-400 transition-colors hover:border-amber-500 hover:text-amber-400"
                  aria-label="Compartir"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            <div className="herr-scroll-reveal rounded-3xl border border-stone-800 bg-stone-900/60 p-6 md:p-10">
              <DemoLeadForm
                slug={SLUG}
                brandLabel={BRAND}
                theme={v.lead}
                kicker="Tu próxima obra"
                title="Pedí presupuesto de herrería"
                sub="Portfolio de trabajos, proceso en 4 pasos y formulario con visita técnica demo en 48 h."
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-stone-800 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <p className="text-xs text-stone-500">
            Demo premium {BRAND} · Herrería & metalurgia · {site.name}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600">
            Forja · Soldadura · Instalación
          </p>
        </div>
      </footer>
    </div>
  );
}
