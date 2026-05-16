"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  Calendar,
  Camera,
  ChevronRight,
  Eye,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Share2,
  ShieldCheck,
  Smile,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-odontologia-premium.css";

const SLUG = "odontologia" as const;
const CONTAINER = "container mx-auto px-6 lg:px-16";

const NAV_ITEMS = ["Tratamientos", "Tecnología", "Especialistas", "Sedes"] as const;

function DentalBadge({ children }: { children: ReactNode }) {
  return (
    <Div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
      <Sparkles size={12} />
      {children}
    </Div>
  );
}

function NavButton({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-2xl px-5 py-2.5 transition-all duration-300 active:scale-95 ${
        active
          ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20"
          : "bg-slate-50 text-slate-600 hover:bg-white hover:shadow-md"
      }`}
    >
      <Icon size={18} className={active ? "" : "group-hover:text-blue-600"} />
      <span className="hidden text-xs font-bold uppercase tracking-widest md:block">{label}</span>
    </button>
  );
}

function ServiceCard({
  title,
  description,
  icon: Icon,
  image,
  span = "",
  dark = false,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number }>;
  image: string;
  span?: string;
  dark?: boolean;
}) {
  return (
    <article
      className={`dent-service-card group relative overflow-hidden rounded-[48px] border ${span} ${
        dark ? "border-white/10 bg-slate-950 text-white" : "border-slate-100 bg-white text-slate-900"
      }`}
    >
      <Div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-40 transition-transform duration-[3s] group-hover:scale-110 group-hover:opacity-60"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <Div
          className={`absolute inset-0 ${
            dark
              ? "bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
              : "bg-gradient-to-t from-white via-white/10 to-transparent"
          }`}
        />
      </Div>
      <Div className="relative z-10 flex min-h-[420px] flex-col justify-end p-8 md:p-12">
        <Div
          className={`mb-8 flex h-16 w-16 items-center justify-center rounded-[24px] shadow-xl transition-all duration-500 group-hover:-translate-y-4 ${
            dark ? "bg-blue-500 text-white" : "bg-slate-950 text-white"
          }`}
        >
          <Icon size={32} />
        </Div>
        <h3 className="mb-4 font-[family-name:var(--font-demo-h-odontologia)] text-3xl font-black uppercase leading-none tracking-tighter md:text-4xl">
          {title}
        </h3>
        <p className={`max-w-xs text-sm font-medium leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {description}
        </p>
        <Div className="mt-10 h-0 overflow-hidden transition-all duration-500 group-hover:h-12">
          <button
            type="button"
            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] ${
              dark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Ver procedimiento <ArrowRight size={16} />
          </button>
        </Div>
      </Div>
    </article>
  );
}

function Div({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function DemoOdontologiaLanding() {
  const v = getDemoVisuals(SLUG);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
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
  }, []);

  return (
    <Div className="dent-premium min-h-screen bg-[#FDFDFD] font-[family-name:var(--font-demo-b-odontologia)] text-slate-900 antialiased">
      <nav
        className={`fixed top-0 z-[100] w-full transition-all duration-700 ${
          scrolled ? "px-6 py-4" : "px-6 py-8 lg:px-10"
        }`}
      >
        <Div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-[32px] px-6 py-5 transition-all duration-700 md:px-10 ${
            scrolled
              ? "border border-slate-100 bg-white/90 shadow-2xl shadow-slate-200/40 backdrop-blur-3xl"
              : "bg-transparent"
          }`}
        >
          <Div className="flex items-center gap-8 lg:gap-16">
            <Link href="#top" className="group flex cursor-pointer items-center gap-3">
              <Div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition-transform group-hover:rotate-12">
                <Smile size={28} />
              </Div>
              <Div>
                <span className="block font-[family-name:var(--font-demo-h-odontologia)] text-xl font-black uppercase leading-none tracking-tighter">
                  Galénica
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-600">Dental Elite</span>
              </Div>
            </Link>
            <Div className="hidden items-center gap-10 lg:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href="#tratamientos"
                  className="group relative text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-blue-600"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </Div>
          </Div>
          <Div className="flex items-center gap-3">
            <NavButton icon={Calendar} label="Reservar turno" active onClick={scrollToLead} />
            <NavButton icon={User} label="Paciente" />
            <button
              type="button"
              className="rounded-2xl p-3 text-slate-900 lg:hidden"
              onClick={() => setMobileNav((o) => !o)}
              aria-label="Menú"
            >
              {mobileNav ? <X size={24} /> : <Menu size={24} />}
            </button>
          </Div>
        </Div>
      </nav>

      {mobileNav ? (
        <Div className="fixed inset-0 z-[90] flex flex-col gap-6 bg-white px-8 pt-32 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#tratamientos"
              onClick={() => setMobileNav(false)}
              className="font-[family-name:var(--font-demo-h-odontologia)] text-lg font-black uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </Div>
      ) : null}

      <header id="top" className="relative overflow-hidden pb-32 pt-40 md:pb-40 md:pt-48">
        <Div className="absolute -z-10 right-0 top-0 h-[900px] w-1/2 rounded-bl-[300px] bg-blue-50/50" aria-hidden />
        <Div
          className="absolute left-10 top-1/4 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-[140px]"
          aria-hidden
        />
        <Div className={CONTAINER}>
          <Div className="grid items-center gap-16 lg:grid-cols-12">
            <Div className="space-y-10 lg:col-span-7 lg:space-y-12">
              <DentalBadge>Odontología digital de precisión</DentalBadge>
              <h1 className="font-[family-name:var(--font-demo-h-odontologia)] text-5xl font-black uppercase leading-[0.85] tracking-tighter text-slate-950 md:text-7xl lg:text-8xl">
                Diseñamos <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text italic text-transparent">
                  tu mejor
                </span>{" "}
                <br />
                versión.
              </h1>
              <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
                Combinamos arte, biología y escaneo 3D para crear sonrisas que cambian vidas.
              </p>
              <Div className="flex flex-wrap items-center gap-6 md:gap-8">
                <button
                  type="button"
                  onClick={scrollToLead}
                  className="group flex items-center gap-4 rounded-[28px] bg-slate-950 px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:-translate-y-2 hover:bg-blue-600 md:px-12 md:py-6"
                >
                  Consulta de diagnóstico <ChevronRight size={18} />
                </button>
                <Div className="flex items-center gap-5">
                  <Div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 p-1">
                    <Div className="flex h-full w-full items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Camera size={24} />
                    </Div>
                  </Div>
                  <Div>
                    <p className="text-xs font-black uppercase tracking-widest">Simulación AI</p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                      Mirá tu sonrisa antes de empezar
                    </p>
                  </Div>
                </Div>
              </Div>
            </Div>
            <Div className="relative lg:col-span-5">
              <Div className="group relative aspect-[3/4] overflow-hidden rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] md:rounded-[80px]">
                <Image
                  src={v.cover}
                  alt="Sonrisa premium"
                  fill
                  priority
                  className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <Div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <Div className="absolute bottom-8 left-6 right-6 rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl md:bottom-12 md:left-10 md:right-10 md:rounded-[40px] md:p-8">
                  <Div className="flex items-end justify-between gap-4">
                    <Div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Procedimiento</p>
                      <p className="font-[family-name:var(--font-demo-h-odontologia)] text-xl font-black uppercase tracking-tighter text-white md:text-2xl">
                        Implante zirconia
                      </p>
                    </Div>
                    <span className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1 text-[10px] font-black uppercase text-white">
                      <Activity size={12} /> 100% bio
                    </span>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

      <section id="tratamientos" className="bg-slate-50/50 py-24 md:py-40">
        <Div className={CONTAINER}>
          <Div className="mb-16 grid items-end gap-8 lg:mb-24 lg:grid-cols-3">
            <Div className="space-y-6 lg:col-span-2">
              <DentalBadge>Excelencia clínica</DentalBadge>
              <h2 className="font-[family-name:var(--font-demo-h-odontologia)] text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
                Nuestras áreas de <br /> maestría dental.
              </h2>
            </Div>
            <p className="pb-2 font-medium italic text-slate-400">
              &ldquo;La odontología no es solo salud, es la arquitectura de la confianza.&rdquo;
            </p>
          </Div>
          <Div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            <ServiceCard
              title="Estética dental"
              description="Carillas de porcelana ultra-finas y blanqueamiento láser de última generación."
              icon={Sparkles}
              image={v.a}
              span="md:col-span-2 lg:col-span-2"
            />
            <ServiceCard
              title="Ortodoncia invisible"
              description="Alineadores transparentes con seguimiento digital semanal sin brackets."
              icon={Eye}
              image={v.b}
              dark
            />
            <ServiceCard
              title="Implantología 3D"
              description="Cirugía guiada por computadora para una recuperación dos veces más rápida."
              icon={Microscope}
              image={v.c}
              dark
            />
            <ServiceCard
              title="Diseño digital"
              description="Escaneamos tu boca en 3D para proyectar tu sonrisa final antes del tratamiento."
              icon={Camera}
              image={v.d ?? v.cover}
              span="md:col-span-2 lg:col-span-2"
            />
          </Div>
        </Div>
      </section>

      <section className="overflow-hidden py-24 md:py-40">
        <Div className={CONTAINER}>
          <Div className="relative overflow-hidden rounded-[60px] bg-slate-950 p-10 md:rounded-[80px] md:p-16 lg:p-24">
            <Div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
              <Div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.4),transparent_50%)]" />
            </Div>
            <Div className="relative z-10 grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <Div className="space-y-10 md:space-y-12">
                <Div className="flex items-center gap-4 text-blue-500">
                  <ShieldCheck size={32} />
                  <span className="text-xs font-black uppercase tracking-[0.5em]">Seguridad y biocompatibilidad</span>
                </Div>
                <h3 className="font-[family-name:var(--font-demo-h-odontologia)] text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-6xl lg:text-7xl">
                  Tecnología que <br />
                  <span className="text-blue-500">elimina el miedo.</span>
                </h3>
                <p className="text-lg leading-relaxed text-slate-400 md:text-xl">
                  Sedación consciente y técnicas mínimamente invasivas para una experiencia tan placentera como un spa.
                </p>
                <Div className="grid grid-cols-2 gap-8">
                  {[
                    { val: "0.1mm", lab: "Precisión láser" },
                    { val: "100%", lab: "Digital flow" },
                  ].map((stat) => (
                    <Div key={stat.lab} className="border-l-2 border-blue-600 pl-6">
                      <p className="text-3xl font-black text-white md:text-4xl">{stat.val}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.lab}</p>
                    </Div>
                  ))}
                </Div>
              </Div>
              <Div className="relative">
                <Div className="absolute -inset-10 animate-pulse rounded-full bg-blue-600/10" aria-hidden />
                <Div className="relative overflow-hidden rounded-[48px] border-8 border-white/5 md:rounded-[60px]">
                  <Div className="relative aspect-square">
                    <Image src={v.e ?? v.cover} alt="Tecnología dental" fill className="object-cover" sizes="50vw" />
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel="Galénica Dental Elite"
        theme={v.lead}
        kicker="Primera visita"
        title="Reservá tu evaluación digital"
        sub="Te respondemos con plan de tratamiento, financiación demo y turnos de urgencia."
      />

      <footer className="border-t border-slate-100 bg-white pb-16 pt-24 md:pt-40">
        <Div className={CONTAINER}>
          <Div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-2 lg:mb-32 lg:grid-cols-5 lg:gap-20">
            <Div className="space-y-8 lg:col-span-2 lg:space-y-10">
              <Div className="flex items-center gap-4">
                <Div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Smile size={28} />
                </Div>
                <span className="font-[family-name:var(--font-demo-h-odontologia)] text-2xl font-black uppercase tracking-tighter">
                  Galénica Dental
                </span>
              </Div>
              <p className="max-w-sm text-[11px] font-medium uppercase leading-relaxed tracking-widest text-slate-400">
                Redefiniendo el estándar de salud bucodental con innovación tecnológica y arte médico.
              </p>
              <Div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 text-slate-500 transition-all hover:bg-slate-950 hover:text-white"
                    aria-label="Red social"
                  >
                    <Share2 size={20} />
                  </button>
                ))}
              </Div>
            </Div>
            {[
              { t: "Servicios", links: ["Implantes", "Ortodoncia", "Estética", "Pediátrica"] },
              { t: "Clínica", links: ["Tecnología", "Médicos", "Sedes", "Carreras"] },
              { t: "Pacientes", links: ["Turnos online", "Financiación", "Blog salud", "Contacto"] },
            ].map((col) => (
              <Div key={col.t}>
                <h4 className="mb-8 text-[11px] font-black uppercase tracking-[0.4em] text-slate-950 md:mb-10">{col.t}</h4>
                <ul className="space-y-5 md:space-y-6">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#tratamientos"
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-blue-600"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Div>
            ))}
          </Div>
          <Div className="flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-12 md:flex-row md:gap-10 md:pt-16">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 md:text-left">
              © {new Date().getFullYear()} Galénica Dental Elite · Demo MadsJeez Design
            </p>
            <Div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                Status: sistemas online
              </span>
            </Div>
          </Div>
        </Div>
      </footer>

      <Div className="fixed bottom-8 right-6 z-[100] flex flex-col gap-5 md:bottom-10 md:right-10 md:gap-6">
        <button
          type="button"
          onClick={scrollToLead}
          className="group relative flex h-14 w-14 items-center justify-center rounded-[24px] border border-slate-200 bg-white shadow-2xl transition-all duration-500 hover:bg-slate-950 hover:text-white md:h-16 md:w-16"
          aria-label="Chat médico"
        >
          <MessageCircle size={24} />
          <span className="pointer-events-none absolute right-20 whitespace-nowrap rounded-xl bg-slate-950 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white opacity-0 transition-opacity group-hover:opacity-100">
            Chat médico
          </span>
        </button>
        <a
          href="tel:+541148229000"
          className="group relative flex h-16 w-16 items-center justify-center rounded-[28px] bg-blue-600 text-white shadow-[0_30px_60px_-15px_rgba(37,99,235,0.5)] transition-all duration-500 hover:-translate-y-2 md:h-20 md:w-20 md:rounded-[32px]"
          aria-label="Urgencias"
        >
          <Phone size={26} className="md:hidden" />
          <Phone size={28} className="hidden md:block" />
          <span className="absolute -right-1 -top-2 animate-bounce rounded-full border-2 border-white bg-rose-500 px-2 py-0.5 text-[8px] font-black uppercase text-white md:-top-2 md:px-3 md:py-1 md:text-[9px]">
            Urgencias
          </span>
        </a>
      </Div>
    </Div>
  );
}
