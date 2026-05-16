"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  ChevronRight,
  FileText,
  Gavel,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Scale,
  Share2,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-abogados-premium.css";

const SLUG = "abogados" as const;
const BRAND = "Varela & Asociados";

type TabId = "inicio" | "areas" | "equipo" | "publicaciones";

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".va-scroll-reveal");
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

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ${
        active ? "text-amber-500" : "text-slate-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function ActionButton({
  children,
  primary,
  onClick,
  icon: Icon,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-8 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 ${
        primary
          ? "bg-amber-600 text-white shadow-lg hover:bg-amber-500"
          : "border border-slate-700 bg-transparent text-slate-300 hover:border-amber-500 hover:text-white"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon ? <Icon size={14} className="transition-transform group-hover:translate-x-1" /> : null}
      </span>
    </button>
  );
}

function PracticeAreaCard({
  title,
  icon: Icon,
  description,
  index,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  description: string;
  index: number;
}) {
  return (
    <article className="group relative border border-slate-800/50 bg-slate-900/40 p-10 transition-all duration-700 hover:border-amber-600/30 hover:bg-slate-900/60">
      <div className="absolute right-6 top-0 font-serif text-7xl italic text-slate-800/20 transition-colors group-hover:text-amber-500/10">
        {index + 1}
      </div>
      <div className="relative z-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center border-b border-amber-500/20 text-amber-500 transition-all duration-500 group-hover:border-amber-500">
          <Icon size={32} strokeWidth={1.2} />
        </div>
        <h3 className="mb-4 font-serif-display text-xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mb-8 text-sm font-light leading-relaxed text-slate-400">{description}</p>
        <button type="button" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 transition-colors hover:text-white">
          Consultar área <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}

export function DemoAbogadosLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollTo = useCallback((id: string, tab: TabId) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToLead = useCallback(() => {
    setIsMenuOpen(false);
    document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const practiceAreas = [
    {
      title: "Derecho Corporativo",
      icon: Briefcase,
      description: "Fusiones, adquisiciones, gobierno societario y compliance para grupos multinacionales y PyMEs en expansión.",
    },
    {
      title: "Litigios Complejos",
      icon: Gavel,
      description: "Estrategia procesal en disputas civiles y comerciales ante tribunales nacionales y cámaras arbitrales.",
    },
    {
      title: "Propiedad Intelectual",
      icon: ShieldAlert,
      description: "Patentes, marcas, secretos industriales y defensa contra infracciones en entornos digitales.",
    },
    {
      title: "Derecho de Familia",
      icon: Users,
      description: "Divorcios, sucesiones y acuerdos patrimoniales con máxima discreción y enfoque preventivo.",
    },
  ] as const;

  const team = [
    { name: "Dr. Martín Varela", role: "Socio director · Corporativo", cred: "LL.M. Columbia" },
    { name: "Dra. Elena Ríos", role: "Socia · Litigios", cred: "Ex procuradora adjunta" },
    { name: "Dr. Tomás Berger", role: "Socio · IP & Tech", cred: "Arbitraje ICC" },
  ] as const;

  const publications = [
    { tag: "Insight", title: "Nueva ley de fusiones: checklist para directorios", date: "Mar 2026" },
    { tag: "Alerta", title: "Plazos fiscales Q2: riesgos en estructuras offshore", date: "Feb 2026" },
    { tag: "Caso", title: "Arbitraje exitoso en disputa M&A USD 120M", date: "Ene 2026" },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="va-premium min-h-screen bg-[#0a0f18] font-[family-name:var(--font-demo-b-abogados)] text-slate-300 selection:bg-amber-500 selection:text-white"
    >
      <header
        className={`fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 transition-all duration-500 md:px-12 ${
          scrolled ? "border-b border-slate-900 bg-slate-950/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-12">
          <button type="button" onClick={() => scrollTo("inicio", "inicio")} className="group flex cursor-pointer items-center gap-4">
            <div className="border border-amber-600/30 p-2 transition-colors group-hover:border-amber-500">
              <Scale size={28} className="text-amber-500" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-serif-display text-xl font-light uppercase tracking-[0.1em] text-white md:text-2xl">
                Varela <span className="font-bold italic text-amber-500">&</span> Asociados
              </span>
              <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.6em] text-slate-500">
                Gabinete de Abogados Consultores
              </span>
            </div>
          </button>
          <nav className="hidden gap-10 lg:flex">
            <NavItem label="El Estudio" active={activeTab === "inicio"} onClick={() => scrollTo("inicio", "inicio")} />
            <NavItem label="Áreas" active={activeTab === "areas"} onClick={() => scrollTo("areas", "areas")} />
            <NavItem label="Equipo" active={activeTab === "equipo"} onClick={() => scrollTo("equipo", "equipo")} />
            <NavItem label="Publicaciones" active={activeTab === "publicaciones"} onClick={() => scrollTo("publicaciones", "publicaciones")} />
          </nav>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <button type="button" className="hidden items-center gap-2 text-amber-600 transition-colors hover:text-white sm:flex">
            <Globe size={14} />
            <span className="text-[9px] font-bold uppercase tracking-widest">ESP | ENG</span>
          </button>
          <button
            type="button"
            className="hidden border border-amber-600/30 bg-amber-600/10 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-500 transition-all hover:bg-amber-600 hover:text-white md:block"
          >
            Portal Cliente
          </button>
          <button type="button" className="text-white lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Menú">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[110] flex flex-col bg-slate-950 p-10">
          <button type="button" className="mb-16 self-end text-white" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar">
            <X size={32} />
          </button>
          {(
            [
              ["EL ESTUDIO", "inicio", "inicio"],
              ["ÁREAS", "areas", "areas"],
              ["EQUIPO", "equipo", "equipo"],
              ["PUBLICACIONES", "publicaciones", "publicaciones"],
              ["CONSULTA", "lead", "inicio"],
            ] as const
          ).map(([label, id, tab]) => (
            <button
              key={label}
              type="button"
              onClick={() => (id === "lead" ? scrollToLead() : scrollTo(id, tab))}
              className="text-left font-serif-display text-4xl italic text-white hover:text-amber-500"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <main>
        <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0f18] pt-20">
          <div className="va-cubes-bg absolute inset-0" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-transparent" aria-hidden />

          <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 border-l-2 border-amber-600 bg-amber-600/5 px-4 py-1.5">
                <span className="text-[10px] font-bold italic uppercase tracking-[0.5em] text-amber-500">
                  Desde 1985 · Prestigio & Ética
                </span>
              </div>
              <h1 className="font-serif-display text-5xl font-light leading-[1.1] tracking-tight text-white md:text-[4.5rem]">
                Defendemos sus <br />
                <span className="italic text-amber-500">Intereses</span> con Integridad.
              </h1>
              <p className="max-w-lg text-lg font-light leading-relaxed text-slate-400">
                Estudio multidisciplinar enfocado en resultados. Tradición jurídica y estrategias innovadoras para proteger lo que más le importa.
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <ActionButton primary icon={Calendar} onClick={scrollToLead}>
                  Agendar Consulta
                </ActionButton>
                <ActionButton onClick={() => scrollTo("equipo", "equipo")}>Conocer el Equipo</ActionButton>
              </div>
            </div>

            <div className="relative flex h-[480px] items-center justify-center lg:h-[650px]">
              <div className="relative h-full w-full max-w-lg">
                <div className="absolute inset-0 overflow-hidden border border-slate-800 shadow-2xl">
                  <Image
                    src={v.cover}
                    alt="Oficina de abogados"
                    fill
                    priority
                    className="object-cover contrast-[1.1] sepia-[0.2]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -left-8 z-20 border-t-2 border-amber-600 bg-slate-900 p-8 shadow-2xl">
                  <div className="text-center">
                    <Award size={32} className="mx-auto mb-2 text-amber-500" />
                    <p className="font-serif-display text-2xl text-white">Top Tier</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Legal Ranking 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-900 bg-slate-950 py-16">
          <div className="container mx-auto flex flex-wrap justify-center gap-12 px-6 opacity-50 grayscale transition-all duration-700 hover:grayscale-0 md:justify-between">
            {[
              { icon: Globe, label: "INTERNATIONAL LAW" },
              { icon: Briefcase, label: "CORPORATE ALLIANCE" },
              { icon: Users, label: "GLOBAL ADVISORS" },
              { icon: Scale, label: "ETHICS COMMITTEE" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 font-serif-display text-xl tracking-tighter text-slate-300">
                <item.icon size={20} className="text-amber-700" />
                {item.label}
              </div>
            ))}
          </div>
        </section>

        <section id="areas" className="bg-[#0a0f18] py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mb-24 max-w-2xl">
              <h5 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600">Especializaciones</h5>
              <h2 className="font-serif-display text-4xl leading-tight text-white md:text-5xl">
                Áreas de Práctica <br />
                <span className="font-light italic text-slate-500">Donde marcamos la diferencia.</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {practiceAreas.map((area, i) => (
                <PracticeAreaCard key={area.title} {...area} index={i} />
              ))}
            </div>
            <div className="va-scroll-reveal mt-16 grid gap-6 border border-slate-800 bg-slate-900/30 p-8 md:grid-cols-3 md:p-10">
              {[
                { icon: FileText, t: "Due diligence", d: "Informes en 72 h con matriz de riesgos." },
                { icon: Gavel, t: "Mediación", d: "Resolución alternativa con foco en acuerdos." },
                { icon: ShieldAlert, t: "Crisis legal", d: "Línea directa 24/7 para directorios." },
              ].map((item) => (
                <div key={item.t} className="flex gap-4">
                  <item.icon className="mt-1 shrink-0 text-amber-600" size={22} />
                  <div>
                    <p className="font-bold uppercase tracking-wider text-white">{item.t}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 py-32">
          <div className="container relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Quote size={48} className="mx-auto mb-8 text-amber-600/20" />
            <p className="mb-10 font-serif-display text-2xl italic leading-relaxed text-slate-300 md:text-3xl">
              &ldquo;La atención al detalle y la capacidad estratégica del equipo superó todas nuestras expectativas. Son, sin duda, los mejores aliados legales en el sector corporativo.&rdquo;
            </p>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white">Dr. Alejandro Varela</p>
              <p className="text-[10px] font-bold italic uppercase tracking-widest text-amber-600">CEO, Varela International Group</p>
            </div>
          </div>
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" aria-hidden />
        </section>

        <section className="border-y border-slate-900 bg-slate-950 py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-20 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={v.a} alt="Justicia" fill className="object-cover brightness-[0.7] contrast-[1.1]" sizes="50vw" />
                  </div>
                  <div className="bg-amber-600 p-8 text-white">
                    <p className="mb-1 font-serif-display text-4xl italic">35+</p>
                    <p className="text-[9px] font-black uppercase tracking-widest">Años de Trayectoria</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="border border-slate-800 bg-slate-900 p-8">
                    <p className="mb-1 font-serif-display text-4xl italic">98%</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Resoluciones Exitosas</p>
                  </div>
                  <div className="relative h-64 overflow-hidden">
                    <Image src={v.b} alt="Consulta legal" fill className="object-cover grayscale" sizes="50vw" />
                  </div>
                </div>
              </div>
              <div className="va-scroll-reveal space-y-8">
                <h5 className="text-[10px] font-bold uppercase italic tracking-[0.4em] text-amber-600">Nuestra Misión</h5>
                <h2 className="font-serif-display text-5xl italic leading-tight text-white">
                  Excelencia que inspira <br />
                  <span className="text-slate-500 not-italic">tranquilidad.</span>
                </h2>
                <p className="text-lg font-light leading-relaxed text-slate-400">
                  No solo resolvemos casos; construimos relaciones de confianza. Transparencia absoluta, ética inquebrantable y estudio exhaustivo de cada detalle jurídico.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Asesoramiento preventivo personalizado",
                    "Red de contactos globales de alto nivel",
                    "Enfoque multidisciplinar coordinado",
                    "Gestión digital eficiente de expedientes",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-sm font-light">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="equipo" className="bg-[#0a0f18] py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="va-scroll-reveal mb-16 max-w-2xl">
              <h5 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600">Socios y asociados</h5>
              <h2 className="font-serif-display text-4xl text-white md:text-5xl">
                Equipo <span className="italic text-slate-500">director.</span>
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {team.map((member, i) => (
                <article key={member.name} className="va-scroll-reveal border border-slate-800 bg-slate-900/40 p-8">
                  <div className="relative mb-6 h-48 overflow-hidden border border-slate-800">
                    <Image
                      src={[v.c, v.d, v.e][i] ?? v.c}
                      alt={member.name}
                      fill
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      sizes="400px"
                    />
                  </div>
                  <h3 className="font-serif-display text-xl text-white">{member.name}</h3>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-amber-600">{member.role}</p>
                  <p className="mt-2 text-sm text-slate-500">{member.cred}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="publicaciones" className="border-t border-slate-900 bg-slate-950 py-28">
          <div className="container mx-auto px-6">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h5 className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600">Insights</h5>
                <h2 className="font-serif-display text-3xl text-white md:text-4xl">Publicaciones recientes</h2>
              </div>
              <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-amber-500 hover:text-white">
                Ver archivo completo →
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {publications.map((pub) => (
                <article key={pub.title} className="va-scroll-reveal group border border-slate-800 bg-slate-900/30 p-6 transition-colors hover:border-amber-600/30">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">{pub.tag}</span>
                  <h3 className="mt-4 font-serif-display text-lg text-white group-hover:text-amber-500">{pub.title}</h3>
                  <p className="mt-4 text-[10px] uppercase tracking-widest text-slate-500">{pub.date}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="container mx-auto flex max-w-6xl flex-col overflow-hidden border border-slate-800 shadow-2xl lg:flex-row">
            <div className="flex flex-col justify-center bg-slate-900 p-12 md:p-20 lg:w-1/2">
              <h2 className="mb-6 font-serif-display text-3xl italic text-white">Inicie su defensa hoy mismo.</h2>
              <p className="mb-10 font-light leading-relaxed text-slate-400">
                Consulta privada con socios directores. Confidencialidad y excelencia como prioridad absoluta.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <Phone size={18} className="text-amber-600" />
                  <span className="text-sm font-medium tracking-widest">+54 11 4321 8800</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <Mail size={18} className="text-amber-600" />
                  <span className="text-sm font-medium tracking-widest">contacto@varelaasociados.demo</span>
                </div>
              </div>
              <div className="mt-12">
                <ActionButton primary icon={ArrowRight} onClick={scrollToLead}>
                  Solicitar Entrevista Privada
                </ActionButton>
              </div>
            </div>
            <div className="relative min-h-[400px] lg:w-1/2">
              <Image src={v.c} alt="Biblioteca jurídica" fill className="object-cover brightness-50 grayscale" sizes="50vw" />
            </div>
          </div>
        </section>

        <section className="bg-[#0a0f18] py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center font-serif-display text-2xl text-white">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: "¿La primera consulta es confidencial?", a: "Sí. Aplicamos secreto profesional desde el primer contacto, incluso antes de formalizar el mandato." },
                { q: "¿Trabajan con empresas extranjeras?", a: "Asesoramos filiales, M&A cross-border y arbitraje internacional con red en Madrid, Miami y São Paulo." },
                { q: "¿Cómo se facturan los honorarios?", a: "Fee fijo, hora o success fee según complejidad; presupuesto escrito antes de iniciar." },
              ].map((item) => (
                <details key={item.q} className="border border-slate-800 bg-slate-900/40 p-5">
                  <summary className="cursor-pointer font-bold uppercase tracking-wider text-white">{item.q}</summary>
                  <p className="mt-3 text-sm text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Consulta confidencial"
        title="Agendá tu reunión con el estudio"
        sub="Mismo flujo de contacto del sitio principal. Etiquetamos tu consulta como demo jurídica."
      />

      <footer className="bg-[#05080d] pb-12 pt-24 text-slate-500">
        <div className="container mx-auto px-6">
          <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Scale className="text-amber-600" size={24} />
                <span className="font-serif-display text-xl uppercase tracking-widest text-white">
                  VARELA <span className="text-amber-600">&</span> ASOC.
                </span>
              </div>
              <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-slate-400">
                Defensa integral y consultoría estratégica de alto nivel. Comprometidos con la justicia y el éxito de nuestros representados.
              </p>
              <div className="flex gap-6 border-t border-slate-900 pt-4">
                <Share2 size={18} className="cursor-pointer transition-colors hover:text-amber-500" />
                <Share2 size={18} className="cursor-pointer transition-colors hover:text-amber-500" />
                <Share2 size={18} className="cursor-pointer transition-colors hover:text-amber-500" />
              </div>
            </div>
            <div>
              <h4 className="mb-10 inline-block border-b border-amber-600/20 pb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
                Áreas Elite
              </h4>
              <ul className="space-y-5 text-[10px] font-bold uppercase tracking-[0.15em]">
                {["Mercados de Capitales", "Derecho Fiscal", "Compliance & Ética", "Arbitraje Internacional"].map((item) => (
                  <li key={item} className="cursor-pointer transition-colors hover:text-amber-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-10 inline-block border-b border-amber-600/20 pb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
                Sedes
              </h4>
              <ul className="space-y-6 text-[10px] font-medium tracking-widest">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="shrink-0 text-amber-700" />
                  <span>
                    Av. Leandro N. Alem 1020, <br />
                    CABA, Argentina
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="shrink-0 text-amber-700" />
                  <span>
                    Puerto Madero · Torre Catalinas, <br />
                    Piso 24, Buenos Aires
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-10 inline-block border-b border-amber-600/20 pb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
                Legal Tech
              </h4>
              <div className="border border-slate-800 bg-slate-900/50 p-6">
                <p className="mb-4 text-[10px] uppercase leading-relaxed tracking-widest text-slate-400">
                  Acceda a documentos seguros con encriptación de grado empresarial.
                </p>
                <button type="button" className="w-full border border-amber-600/20 bg-amber-600/10 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-amber-500 transition-all hover:bg-amber-600 hover:text-white">
                  Entrar al Vault
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-900 pt-12 md:flex-row">
            <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-600">
              © {new Date().getFullYear()} VARELA & ASOCIADOS · TODOS LOS DERECHOS RESERVADOS
            </p>
            <div className="flex gap-8 text-[8px] font-bold uppercase tracking-[0.2em] text-slate-700">
              <span className="cursor-pointer hover:text-amber-500">Privacidad</span>
              <span className="cursor-pointer hover:text-amber-500">Aviso Legal</span>
              <span className="cursor-pointer hover:text-amber-500">Cookies</span>
            </div>
          </div>
          <p className="mt-8 text-center text-[10px]">
            <Link href="/demos" className="text-amber-700 hover:text-amber-500">
              Volver al showroom
            </Link>
          </p>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Línea legal urgente"
        onClick={scrollToLead}
        className="group fixed bottom-10 right-10 z-50 flex h-16 w-16 flex-col items-center justify-center border border-amber-600/30 bg-slate-900 text-amber-500 shadow-2xl transition-all hover:bg-amber-600 hover:text-white"
      >
        <Phone size={20} className="mb-1 group-hover:animate-bounce" />
        <span className="text-[8px] font-black uppercase tracking-tighter">S.O.S</span>
      </button>
    </div>
  );
}
