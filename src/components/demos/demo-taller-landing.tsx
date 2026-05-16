"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Calendar,
  ChevronRight,
  Cpu,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Phone,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-taller-premium.css";

const SLUG = "taller" as const;
const BRAND = "Motor Dynamics";

type TabId = "inicio" | "servicios" | "proyectos" | "contacto";

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".md-scroll-reveal");
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
      className={`relative py-2 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
        active ? "text-orange-500" : "text-zinc-400 hover:text-white"
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
      className={`group relative flex items-center gap-3 overflow-hidden rounded-sm px-8 py-4 text-xs font-black uppercase tracking-tighter transition-all duration-300 ${
        primary
          ? "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:bg-orange-500"
          : "border border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-orange-500 hover:text-white"
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon ? <Icon size={16} className="transition-transform group-hover:translate-x-1" /> : null}
      </span>
    </button>
  );
}

function ServiceCard({
  title,
  icon: Icon,
  description,
  index,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  description: string;
  index: number;
}) {
  return (
    <article className="group relative border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-500 hover:border-orange-500/50">
      <div className="absolute right-4 top-0 text-6xl font-black italic text-zinc-800 transition-colors group-hover:text-orange-500/10">
        0{index + 1}
      </div>
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center bg-orange-600/10 text-orange-500 transition-all duration-500 group-hover:bg-orange-600 group-hover:text-white">
          <Icon size={28} />
        </div>
        <h3 className="mb-4 text-xl font-bold uppercase tracking-tighter text-white">{title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-zinc-500">{description}</p>
        <button type="button" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 transition-colors hover:text-white">
          Ver detalles <ChevronRight size={14} />
        </button>
      </div>
    </article>
  );
}

export function DemoTallerLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gallery = [v.a, v.b, v.c, v.d ?? v.a, v.e ?? v.b, v.cover] as const;

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

  const services = [
    { title: "Mecánica General", icon: Wrench, description: "Motor, transmisión y suspensión con repuestos OEM y trazabilidad de cada intervención." },
    { title: "Optimización ECU", icon: Cpu, description: "Reprogramación para potencia y eficiencia con mapas personalizados y log de antes/después." },
    { title: "Frenado Pro", icon: ShieldCheck, description: "Cerámicos, líquidos racing y mantenimiento de circuito para uso calle y pista." },
    { title: "Diagnóstico Digital", icon: Gauge, description: "Escaneo OBD, osciloscopio y prueba dinámica para fallas intermitentes." },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="md-premium min-h-screen bg-black font-[family-name:var(--font-demo-b-taller)] text-zinc-300 selection:bg-orange-500 selection:text-black"
    >
      <header
        className={`fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-5 transition-all duration-300 md:px-12 ${
          scrolled ? "border-b border-zinc-800 bg-black/95 shadow-2xl backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-12">
          <button type="button" onClick={() => scrollTo("inicio", "inicio")} className="group flex cursor-pointer items-center gap-3">
            <div className="flex h-12 w-12 skew-x-[-10deg] items-center justify-center bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.4)]">
              <Settings size={24} className="skew-x-[10deg] transition-transform duration-700 group-hover:rotate-180" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="font-[family-name:var(--font-demo-h-taller)] text-2xl font-black uppercase italic tracking-tighter text-white">
                Motor<span className="text-orange-500">Dynamics</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">Rendimiento y Reparación</span>
            </div>
          </button>
          <nav className="hidden gap-8 lg:flex">
            <NavItem label="Inicio" active={activeTab === "inicio"} onClick={() => scrollTo("inicio", "inicio")} />
            <NavItem label="Servicios" active={activeTab === "servicios"} onClick={() => scrollTo("servicios", "servicios")} />
            <NavItem label="Proyectos" active={activeTab === "proyectos"} onClick={() => scrollTo("proyectos", "proyectos")} />
            <NavItem label="Contacto" active={activeTab === "contacto"} onClick={() => scrollToLead()} />
          </nav>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            className="hidden items-center gap-2 border border-zinc-800 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 transition-all hover:border-orange-500 hover:text-white sm:flex"
          >
            <Settings size={14} /> Cliente VIP
          </button>
          <button type="button" className="text-white lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Menú">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[110] flex flex-col bg-black p-10">
          <button type="button" className="mb-16 self-end text-white" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar">
            <X size={32} />
          </button>
          {(
            [
              ["INICIO", "inicio", "inicio"],
              ["SERVICIOS", "servicios", "servicios"],
              ["PROYECTOS", "proyectos", "proyectos"],
              ["CONTACTO", "lead", "contacto"],
            ] as const
          ).map(([label, id, tab]) => (
            <button
              key={label}
              type="button"
              onClick={() => (id === "lead" ? scrollToLead() : scrollTo(id, tab))}
              className="text-left font-[family-name:var(--font-demo-h-taller)] text-5xl font-black uppercase italic tracking-tighter text-white hover:text-orange-500"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <main>
        <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(234,88,12,0.15),transparent_50%)]" aria-hidden />
          <div className="md-carbon absolute inset-0" aria-hidden />
          <div className="md-scan-line" aria-hidden />

          <div className="container relative z-10 mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
            <div className="md-hero-in space-y-8">
              <div className="inline-flex items-center gap-2 rounded-none border border-orange-600/20 bg-orange-600/10 px-3 py-1">
                <Activity size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
                  Diagnóstico de Rendimiento 4.0
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-demo-h-taller)] text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-[5rem]">
                Ingeniería de <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text italic text-transparent">
                  Precisión
                </span>
              </h1>
              <p className="max-w-lg text-lg font-light leading-relaxed text-zinc-400">
                Especialistas en mecánica de alta gama y competición. Tecnología de vanguardia y pasión por la velocidad en cada intervención.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <ActionButton primary icon={Calendar} onClick={scrollToLead}>
                  Agendar Cita
                </ActionButton>
                <ActionButton onClick={() => scrollTo("servicios", "servicios")}>Servicios Pro</ActionButton>
              </div>
            </div>

            <div className="relative flex h-[420px] items-center justify-center lg:h-[600px]">
              <div className="md-hero-in-delay relative h-full w-full">
                <div className="absolute inset-0 rotate-2 overflow-hidden rounded-sm border border-zinc-800">
                  <Image
                    src={v.cover}
                    alt="Taller mecánico moderno"
                    fill
                    priority
                    className="scale-110 object-cover grayscale transition-all duration-700 hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-4 z-20 border border-orange-600/50 bg-zinc-900 p-6 shadow-[0_0_30px_rgba(234,88,12,0.2)] md:-right-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-black italic text-orange-500">
                      99<span className="text-sm uppercase not-italic text-white">%</span>
                    </div>
                    <div className="h-10 w-px bg-zinc-800" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Precisión de</p>
                      <p className="text-xs font-bold uppercase text-white">Diagnóstico</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-800 bg-zinc-950 py-12">
          <div className="container mx-auto grid grid-cols-2 gap-8 px-6 md:grid-cols-4">
            {[
              { label: "Caballos de Fuerza", val: "+50k", icon: Zap },
              { label: "Vehículos Pro", val: "1.2k", icon: Settings },
              { label: "Garantía Meses", val: "24", icon: ShieldCheck },
              { label: "Expertos Cert.", val: "12", icon: Star },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-4 md:justify-start">
                <s.icon className="text-orange-600" size={24} />
                <div>
                  <div className="text-xl font-black text-white">{s.val}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="servicios" className="bg-black py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="mb-20">
              <h5 className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Especialidades</h5>
              <h2 className="font-[family-name:var(--font-demo-h-taller)] text-5xl font-black uppercase tracking-tighter text-white">
                Servicios de <br />
                <span className="italic text-zinc-700">Alta Gama.</span>
              </h2>
            </div>
            <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} />
              ))}
            </div>
            {v.shop ? (
              <div className="md-scroll-reveal mt-16 border border-zinc-800 bg-zinc-900/50 p-8 md:p-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">{v.shop.eyebrow ?? "Repuestos"}</p>
                <h3 className="mt-2 font-[family-name:var(--font-demo-h-taller)] text-3xl uppercase text-white">{v.shop.headline}</h3>
                <p className="mt-2 max-w-2xl text-sm text-zinc-500">{v.shop.sub}</p>
                <ul className="mt-8 grid gap-4 md:grid-cols-3">
                  {v.shop.products.map((p) => (
                    <li key={p.id} className="border-l-4 border-orange-600 bg-zinc-950 p-5">
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="mt-1 text-sm text-orange-500">{p.price}</p>
                      {p.note ? <p className="mt-1 text-xs text-zinc-500">{p.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <section id="proyectos" className="bg-zinc-950 py-28 md:py-32">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="md-scroll-reveal space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Portfolio</h5>
                <h2 className="font-[family-name:var(--font-demo-h-taller)] text-5xl font-black uppercase italic tracking-tighter text-white">
                  Resultados <br /> que hablan.
                </h2>
                <p className="max-w-md leading-relaxed text-zinc-500">
                  Desde clásicos restaurados hasta superdeportivos optimizados. Cada vehículo entra como proyecto y sale como pieza maestra.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="border-l-4 border-orange-600 bg-zinc-900 p-4">
                    <p className="text-2xl font-black italic text-white">500+</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest">Motores Optimizados</p>
                  </div>
                  <div className="border-l-4 border-zinc-700 bg-zinc-900 p-4">
                    <p className="text-2xl font-black italic text-white">100%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest">Garantía Real</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {gallery.map((src, i) => (
                  <div
                    key={`gallery-${i}`}
                    className={`relative h-48 overflow-hidden rounded-sm border border-zinc-800 ${i === 1 ? "mt-8" : ""} ${i === 2 ? "-mt-8" : ""}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      sizes="300px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-16">
          <div className="container mx-auto px-6">
            <h2 className="md-scroll-reveal mb-12 text-center font-[family-name:var(--font-demo-h-taller)] text-3xl uppercase text-white">
              Proceso <span className="text-orange-500">certificado</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { n: "01", t: "Recepción", d: "Escaneo inicial y registro fotográfico del vehículo." },
                { n: "02", t: "Diagnóstico", d: "Informe digital con prioridades y presupuesto transparente." },
                { n: "03", t: "Intervención", d: "Técnicos senior y repuestos trazables." },
                { n: "04", t: "Entrega", d: "Prueba en ruta y garantía por escrito." },
              ].map((step) => (
                <div key={step.n} className="md-scroll-reveal border border-zinc-800 bg-zinc-900/40 p-6">
                  <span className="text-3xl font-black italic text-orange-500/40">{step.n}</span>
                  <h3 className="mt-4 font-bold uppercase text-white">{step.t}</h3>
                  <p className="mt-2 text-sm text-zinc-500">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="container relative mx-auto max-w-5xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-12 md:p-20">
            <div className="absolute right-0 top-0 h-64 w-64 bg-orange-600/10 blur-[100px]" aria-hidden />
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div className="md-scroll-reveal">
                <h2 className="mb-6 font-[family-name:var(--font-demo-h-taller)] text-4xl font-black uppercase italic tracking-tighter text-white">
                  ¿Tu motor está listo para el siguiente nivel?
                </h2>
                <p className="mb-8 leading-relaxed text-zinc-400">
                  Diagnóstico preventivo hoy con expertos certificados. Turnos con confirmación por WhatsApp demo.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <ActionButton primary icon={ArrowRight} onClick={scrollToLead}>
                    Solicitar Turno
                  </ActionButton>
                  <div className="flex items-center gap-3 px-4 text-white">
                    <Phone size={20} className="text-orange-500" />
                    <span className="text-sm font-bold tracking-widest">+54 11 4000 MOTOR</span>
                  </div>
                </div>
              </div>
              <div className="relative hidden h-64 overflow-hidden rounded-sm lg:block lg:h-80">
                <Image src={v.c} alt="Detalle de motor" fill className="object-cover opacity-70 grayscale" sizes="500px" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-900 bg-zinc-950 py-20">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="mb-10 text-center font-[family-name:var(--font-demo-h-taller)] text-2xl uppercase text-white">FAQ técnica</h2>
            <div className="space-y-4">
              {[
                { q: "¿Cuánto tarda un service completo?", a: "Entre 4 y 8 h según modelo; te confirmamos al diagnosticar." },
                { q: "¿Trabajan con seguros?", a: "Sí, gestionamos peritaje y repuestos homologados demo." },
                { q: "¿Garantía en ECU?", a: "6 meses sobre mapa y componentes instalados en taller." },
              ].map((item) => (
                <details key={item.q} className="group border border-zinc-800 bg-black/40 p-5">
                  <summary className="cursor-pointer font-bold uppercase tracking-wider text-white">{item.q}</summary>
                  <p className="mt-3 text-sm text-zinc-500">{item.a}</p>
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
        kicker="Turno o presupuesto"
        title="Coordiná tu visita al taller"
        sub="Mismo flujo de contacto del sitio principal. Etiquetamos tu consulta como demo Motor Dynamics."
      />

      <footer className="border-t border-zinc-900 bg-black pb-12 pt-24 text-zinc-500">
        <div className="container mx-auto px-6">
          <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 skew-x-[-10deg] items-center justify-center bg-zinc-800">
                  <Settings className="text-orange-500" size={16} />
                </div>
                <span className="font-[family-name:var(--font-demo-h-taller)] text-xl font-black italic tracking-tighter text-white">
                  MOTOR DYNAMICS
                </span>
              </div>
              <p className="text-xs font-bold uppercase leading-loose tracking-widest">
                Excelencia automotriz con tecnología de punta y detalle industrial.
              </p>
              <div className="flex gap-4">
                <Share2 size={20} className="cursor-pointer transition-colors hover:text-orange-500" />
                <Share2 size={20} className="cursor-pointer transition-colors hover:text-orange-500" />
              </div>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Servicios Pro</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                {["Modificación ECU", "Diagnóstico láser", "Alineación 3D", "Tuning competición"].map((item) => (
                  <li key={item} className="cursor-pointer transition-colors hover:text-orange-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Sedes</h4>
              <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 text-orange-500" /> Parque Industrial Oeste, CABA
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 text-orange-500" /> Hub técnico · Zona Norte
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-orange-500" /> service@motordynamics.demo
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Estado del sistema</h4>
              <div className="rounded-sm bg-zinc-900 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest">Servidores</span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest">Turnos libres</span>
                  <span className="text-sm font-black italic text-white">8 disponibles</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-900 pt-12 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">
              © {new Date().getFullYear()} MOTOR DYNAMICS SYSTEMS · INTERFAZ DE GRADO INDUSTRIAL
            </p>
            <p className="mt-4 text-[10px]">
              <Link href="/demos" className="text-orange-600 hover:text-orange-400">
                Volver al showroom
              </Link>
            </p>
          </div>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Emergencia / turno rápido"
        onClick={scrollToLead}
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 skew-x-[-10deg] items-center justify-center bg-orange-600 text-white shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-transform hover:scale-110"
      >
        <Activity size={28} className="skew-x-[10deg]" />
      </button>
    </div>
  );
}
