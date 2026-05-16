"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Code,
  Cpu,
  Globe,
  Layers,
  Menu,
  MessageSquare,
  Microchip,
  Network,
  Search,
  Server,
  ShieldCheck,
  Terminal as TerminalIcon,
  X,
  Zap,
} from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-tech-premium.css";

const SLUG = "tech" as const;
const BRAND = "Vanguardia Tech";

type TabId = "inicio" | "ecosistema" | "soluciones" | "terminal";

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".vt-scroll-reveal");
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

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative py-2 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ${
        active ? "text-cyan-400" : "text-white/40 hover:text-white"
      }`}
    >
      {label}
      {active ? (
        <span className="absolute bottom-0 left-0 h-px w-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      ) : null}
    </button>
  );
}

function TechButton({
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
      className={`group relative flex items-center gap-3 overflow-hidden border px-8 py-4 transition-all duration-500 ${
        primary ? "vt-btn-primary font-bold" : "vt-btn-ghost"
      }`}
    >
      <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]" />
      <span className="relative z-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
        {children}
        {Icon ? <Icon size={14} className="transition-transform group-hover:translate-x-1" /> : null}
      </span>
    </button>
  );
}

function MetricCard({
  label,
  value,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const trendUp = trend.startsWith("+");
  return (
    <div className="relative overflow-hidden border border-white/5 bg-slate-900/60 p-6 backdrop-blur-xl group">
      <div className="absolute right-0 top-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
        <Icon size={40} />
      </div>
      <div className="mb-2 font-mono text-[9px] uppercase tracking-widest text-white/30">{label}</div>
      <div className="flex items-baseline gap-2 font-mono text-3xl font-bold text-white">
        {value}
        <span className={`text-[10px] ${trendUp ? "text-emerald-400" : "text-cyan-400"}`}>{trend}</span>
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-2/3 animate-pulse bg-cyan-500/50" />
      </div>
    </div>
  );
}

export function DemoTechLanding() {
  const v = getDemoVisuals(SLUG);
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);

  const [activeTab, setActiveTab] = useState<TabId>("inicio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const barHeights = useMemo(
    () => Array.from({ length: 50 }, (_, i) => 20 + ((i * 17 + 13) % 80)),
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const scrollTo = useCallback((id: string, tab: TabId) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToLead = useCallback(() => {
    setIsMenuOpen(false);
    document.getElementById(`lead-${SLUG}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const solutions = [
    {
      title: "IA SOBERANA",
      subtitle: "Modelos Privados",
      icon: Cpu,
      desc: "LLMs personalizados en sus propios servidores. Sin fugas de datos, sin dependencias externas.",
      tech: "RAG / VECTOR-DB",
    },
    {
      title: "QUANTUM DEFENSE",
      subtitle: "Encriptación Post-Cuántica",
      icon: ShieldCheck,
      desc: "Protección contra computación cuántica con algoritmos lattice y firmas endurecidas.",
      tech: "AES-512-Q",
    },
    {
      title: "SISTEMAS DISTRIBUIDOS",
      subtitle: "Escalabilidad Horizontal",
      icon: Layers,
      desc: "Arquitecturas que crecen con la demanda sin perder rendimiento en picos críticos.",
      tech: "KUBERNETES / RUST",
    },
    {
      title: "CYBER INTELLIGENCE",
      subtitle: "Detección de Amenazas",
      icon: Search,
      desc: "Análisis proactivo del tráfico para neutralizar ataques antes del firewall principal.",
      tech: "0-DAY DEFENSE",
    },
  ] as const;

  return (
    <div
      ref={rootRef}
      className="vt-premium relative min-h-screen bg-slate-950 font-[family-name:var(--font-demo-b-tech)] text-slate-50 selection:bg-cyan-500 selection:text-slate-950"
    >
      <header className="fixed top-0 z-[100] flex w-full items-center justify-between border-b border-white/5 bg-slate-950/40 px-6 py-6 backdrop-blur-2xl md:px-12">
        <div className="flex items-center gap-8 xl:gap-16">
          <button
            type="button"
            onClick={() => scrollTo("inicio", "inicio")}
            className="group flex cursor-pointer items-center gap-4"
          >
            <div className="relative">
              <div className="flex h-10 w-10 rotate-45 items-center justify-center rounded-lg bg-indigo-600 transition-transform duration-500 group-hover:rotate-90">
                <div className="h-5 w-5 -rotate-45 rounded-sm bg-cyan-400 transition-transform duration-500 group-hover:-rotate-90" />
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-[family-name:var(--font-demo-h-tech)] text-xl font-black uppercase italic tracking-tighter text-white md:text-2xl">
                Vanguardia<span className="text-cyan-400">.</span>Tech
              </span>
              <span className="text-[7px] font-black uppercase tracking-[0.6em] text-white/30">
                Infraestructura Sistémica
              </span>
            </div>
          </button>

          <nav className="hidden gap-10 xl:flex xl:gap-14">
            <NavItem label="Core" active={activeTab === "inicio"} onClick={() => scrollTo("inicio", "inicio")} />
            <NavItem
              label="Network"
              active={activeTab === "ecosistema"}
              onClick={() => scrollTo("ecosistema", "ecosistema")}
            />
            <NavItem
              label="Protocolos"
              active={activeTab === "soluciones"}
              onClick={() => scrollTo("soluciones", "soluciones")}
            />
            <NavItem
              label="Terminal"
              active={activeTab === "terminal"}
              onClick={() => scrollTo("terminal", "terminal")}
            />
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden flex-col text-right md:flex">
            <div className="font-mono text-[10px] font-bold text-cyan-400">{formatTime(currentTime)}</div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-white/20">UTC_GLOBAL_SYNC</div>
          </div>
          <TechButton primary onClick={scrollToLead}>
            Consultar Alpha
          </TechButton>
          <button type="button" className="xl:hidden" onClick={() => setIsMenuOpen((o) => !o)} aria-label="Menú">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center gap-12 bg-slate-950/98 p-10 backdrop-blur-3xl">
          <button type="button" className="absolute right-8 top-8" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar">
            <X size={32} />
          </button>
          {(
            [
              ["INICIO", "inicio", "inicio"],
              ["NETWORK", "ecosistema", "ecosistema"],
              ["PROTOCOLOS", "soluciones", "soluciones"],
              ["TERMINAL", "terminal", "terminal"],
            ] as const
          ).map(([label, id, tab]) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollTo(id, tab)}
              className="text-4xl font-black italic tracking-tighter transition-colors hover:text-cyan-400"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      <main>
        {/* Hero */}
        <section
          id="inicio"
          className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 pt-24"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/40 via-slate-950/90 to-slate-950" />
            <div className="vt-carbon-bg pointer-events-none absolute inset-0 z-[5]" aria-hidden />
            <Image
              src={v.cover}
              alt="Infraestructura global"
              fill
              priority
              className="scale-110 object-cover opacity-40 grayscale"
              sizes="100vw"
            />
          </div>

          <div className="relative z-20 max-w-6xl px-6 text-center">
            <div className="vt-hero-reveal mb-10 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-4 py-2">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400">
                SISTEMA TRIPLE A ONLINE
              </span>
            </div>

            <h1 className="vt-hero-reveal mb-12 font-[family-name:var(--font-demo-h-tech)] text-5xl font-black italic leading-[0.8] tracking-tighter text-white md:text-[7rem] lg:text-[9rem]">
              NUEVA ERA <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text not-italic text-transparent">
                TECNOLÓGICA.
              </span>
            </h1>

            <p className="vt-hero-reveal mx-auto mb-14 max-w-3xl font-mono text-sm font-light leading-relaxed text-white/50 md:text-lg">
              Desarrollamos la arquitectura del mañana. Desde inteligencia artificial soberana hasta infraestructuras de
              latencia cero. El futuro no se predice, se programa.
            </p>

            <div className="vt-hero-reveal flex flex-wrap justify-center gap-6">
              <TechButton primary icon={ArrowUpRight} onClick={scrollToLead}>
                Desplegar Proyecto
              </TechButton>
              <TechButton icon={TerminalIcon} onClick={() => scrollTo("terminal", "terminal")}>
                Acceder a la API
              </TechButton>
            </div>
          </div>

          <div className="absolute bottom-12 z-20 hidden w-full items-end justify-between px-12 lg:flex">
            <div className="flex gap-16">
              <div className="space-y-1">
                <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">Estado del Core</div>
                <div className="flex items-center gap-2 font-mono text-lg text-cyan-400">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  OPTIMAL_V2
                </div>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-16">
                <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">Uptime Semestral</div>
                <div className="font-mono text-lg italic text-white">99.9998%</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 text-white/20">
              <div className="font-mono text-[9px] tracking-tighter">LATENCY_MAP :: SG/DE/US</div>
              <div className="h-1 w-48 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 bg-cyan-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section id="ecosistema" className="relative bg-slate-950 py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="vt-scroll-reveal mb-24 flex flex-col items-start justify-between gap-12 lg:flex-row">
              <div className="max-w-2xl">
                <h5 className="mb-6 font-mono text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500">
                  Panel de Control Operativo
                </h5>
                <h2 className="mb-8 font-[family-name:var(--font-demo-h-tech)] text-5xl font-bold italic tracking-tighter text-white md:text-7xl">
                  Métricas de <span className="text-white/20">Infraestructura.</span>
                </h2>
                <p className="text-sm leading-loose text-white/40">
                  Visualice el rendimiento de su red global en tiempo real. Nuestro motor procesa telemetría para
                  garantizar operaciones sin interrupciones.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">
                <MetricCard label="Peticiones/s" value="1.2M" trend="+4.2%" icon={Zap} />
                <MetricCard label="CPU Load" value="28%" trend="-2.1%" icon={Microchip} />
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="vt-scroll-reveal group relative border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm lg:col-span-2">
                <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-cyan-500 transition-transform duration-700 group-hover:scale-y-100" />
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Network className="text-cyan-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      Tráfico de Red Global
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500" />
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <div className="h-2 w-2 rounded-full bg-slate-800" />
                  </div>
                </div>
                <div className="flex h-80 items-end gap-2 overflow-hidden px-2">
                  {barHeights.map((h, i) => (
                    <div
                      key={i}
                      className="vt-bar flex-1"
                      style={{ height: `${h}%`, opacity: 0.3 + i / 50 }}
                    />
                  ))}
                </div>
                <div className="mt-12 flex justify-between font-mono text-[10px] uppercase tracking-widest text-white/20">
                  <span>00:00:00</span>
                  <span>Sincronizando con Cluster Omega...</span>
                  <span>23:59:59</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="vt-scroll-reveal group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 p-10 shadow-2xl">
                  <Globe className="absolute -bottom-10 -right-10 h-40 w-40 opacity-10 transition-transform duration-1000 group-hover:rotate-12" />
                  <h3 className="mb-4 text-2xl font-bold italic text-white">Expansión Multi-Nube</h3>
                  <p className="mb-8 text-xs leading-relaxed text-white/70">
                    Gestión unificada de Azure, AWS y GCP bajo un único protocolo de seguridad y costos.
                  </p>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all group-hover:gap-4"
                  >
                    Ver Mapa de Red <ChevronRight size={14} />
                  </button>
                  <div className="relative mt-6 h-24 overflow-hidden rounded-lg border border-white/10">
                    <Image src={v.a} alt="" fill className="object-cover opacity-60" sizes="400px" />
                  </div>
                </div>

                <div className="vt-scroll-reveal border border-white/5 bg-slate-900 p-10">
                  <Server className="mb-6 text-cyan-400" />
                  <h3 className="mb-2 text-xl font-bold italic text-white">Bare Metal de Elite</h3>
                  <p className="text-xs leading-relaxed text-white/40">
                    Hardware dedicado con aislamiento físico total para procesos que requieren el máximo rendimiento.
                  </p>
                  <div className="relative mt-6 h-28 overflow-hidden rounded-lg border border-white/5">
                    <Image src={v.b} alt="" fill className="object-cover opacity-70" sizes="400px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="soluciones" className="border-t border-white/5 bg-slate-950 py-28 md:py-40">
          <div className="mx-auto max-w-7xl px-6">
            <div className="vt-scroll-reveal mb-16 max-w-2xl">
              <h5 className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">
                Protocolos
              </h5>
              <h2 className="font-[family-name:var(--font-demo-h-tech)] text-4xl font-bold italic text-white md:text-5xl">
                Stack de <span className="text-cyan-400">excelencia.</span>
              </h2>
            </div>
            <div className="grid gap-1 lg:grid-cols-4">
              {solutions.map((item) => (
                <div
                  key={item.title}
                  className="vt-scroll-reveal group relative border border-white/5 bg-slate-900/20 p-12 transition-all duration-500 hover:bg-white/5"
                >
                  <div className="absolute left-0 top-0 h-[2px] w-full bg-cyan-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <item.icon className="mb-10 h-8 w-8 text-cyan-400 transition-transform group-hover:scale-110" />
                  <div className="mb-2 font-mono text-[10px] tracking-widest text-cyan-500">{item.subtitle}</div>
                  <h3 className="mb-6 text-2xl font-bold italic text-white">{item.title}</h3>
                  <p className="mb-10 min-h-[80px] text-xs leading-loose text-white/30">{item.desc}</p>
                  <div className="text-[9px] font-black tracking-[0.5em] text-white/10">{item.tech}</div>
                </div>
              ))}
            </div>
            <div className="vt-scroll-reveal mt-12 grid gap-4 md:grid-cols-3">
              <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 md:h-56">
                <Image src={v.c} alt="" fill className="object-cover opacity-80" sizes="33vw" />
              </div>
              <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 md:h-56">
                <Image src={v.d ?? v.c} alt="" fill className="object-cover opacity-80" sizes="33vw" />
              </div>
              <div className="relative h-48 overflow-hidden rounded-xl border border-white/5 md:h-56">
                <Image src={v.e ?? v.c} alt="" fill className="object-cover opacity-80" sizes="33vw" />
              </div>
            </div>
          </div>
        </section>

        {/* Terminal */}
        <section id="terminal" className="bg-slate-900/30 py-28 md:py-40">
          <div className="mx-auto max-w-5xl px-6">
            <div className="vt-scroll-reveal mb-20 text-center">
              <h2 className="mb-4 text-4xl font-bold italic">
                Interfaz de <span className="text-cyan-400">Comando.</span>
              </h2>
              <p className="font-mono text-xs uppercase tracking-widest text-white/30">
                Protocolo de comunicación directa con ingenieros_
              </p>
            </div>

            <div className="vt-scroll-reveal overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-white/5 bg-slate-900 px-8 py-5">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                  <TerminalIcon size={12} /> session@vanguardia-kernel:~/alpha
                </div>
                <div className="w-10" />
              </div>

              <div className="min-h-[420px] space-y-6 p-8 font-mono text-sm text-white/70 md:p-12">
                <div className="flex gap-4">
                  <span className="text-emerald-400">➜</span>
                  <span className="font-bold text-white">ssh admin@vanguardia.global</span>
                </div>
                <div className="pl-8 text-cyan-400/80">
                  ESTABLECIENDO CONEXIÓN ENCRIPTADA (PQC-LIB)... <br />
                  AUTENTICACIÓN RECONOCIDA POR BIOMETRÍA DE RED. <br />
                  BIENVENIDO, OPERADOR. TODOS LOS SISTEMAS NOMINALES.
                </div>
                <div className="mt-12 flex gap-4">
                  <span className="text-emerald-400">➜</span>
                  <span className="animate-pulse font-bold text-white">analyze --market-tech --future-readiness_</span>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { label: "Scalability", val: "ULTRA" },
                    { label: "Security", val: "QUANTUM" },
                    { label: "Innovation", val: "PEAK" },
                    { label: "Stability", val: "99.9%" },
                  ].map((m) => (
                    <div key={m.label} className="border border-white/5 bg-white/[0.02] p-4 text-center">
                      <div className="mb-1 text-[8px] font-bold uppercase text-white/20">{m.label}</div>
                      <div className="text-xs font-bold tracking-widest text-cyan-400">{m.val}</div>
                    </div>
                  ))}
                </div>
                <p className="pt-12 text-[10px] italic text-white/20">
                  Escriba su consulta técnica para iniciar el proceso de despliegue automatizado...
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-slate-950 py-40 md:py-60">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-900/10" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <h2 className="vt-scroll-reveal mb-12 font-[family-name:var(--font-demo-h-tech)] text-5xl font-black italic tracking-tighter md:text-8xl">
              ¿LISTO PARA EL <br /> <span className="text-cyan-400">SIGUIENTE NIVEL?</span>
            </h2>
            <div className="vt-scroll-reveal flex flex-col justify-center gap-6 md:flex-row">
              <TechButton primary icon={ChevronRight} onClick={scrollToLead}>
                Agendar Auditoría Tech
              </TechButton>
              <TechButton onClick={() => scrollTo("soluciones", "soluciones")}>Ver Casos de Éxito</TechButton>
            </div>
          </div>
        </section>
      </main>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Consultoría Alpha"
        title="Solicitá auditoría o despliegue"
        sub="Mismo flujo de contacto del sitio principal. Etiquetamos tu consulta como demo Vanguardia Tech."
      />

      <footer className="border-t border-white/5 bg-slate-950 pb-20 pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-32 grid gap-20 lg:grid-cols-4">
            <div className="space-y-12 lg:col-span-2">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <div className="h-6 w-6 rounded-sm bg-slate-950" />
                </div>
                <span className="text-3xl font-black italic tracking-tighter">
                  VANGUARDIA<span className="text-cyan-400">.</span>GROUP
                </span>
              </div>
              <p className="max-w-sm text-sm leading-loose text-white/40">
                Consultoría de arquitectura tecnológica para empresas Fortune 500 y startups unicornio en búsqueda de
                excelencia técnica absoluta.
              </p>
              <div className="flex gap-6">
                <MessageSquare className="cursor-pointer text-white/20 transition-colors hover:text-cyan-400" />
                <Globe className="cursor-pointer text-white/20 transition-colors hover:text-cyan-400" />
                <Code className="cursor-pointer text-white/20 transition-colors hover:text-cyan-400" />
              </div>
            </div>

            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Ecosistema</h5>
              <ul className="space-y-5 text-sm font-medium text-white/50">
                <li className="cursor-pointer transition-all hover:text-cyan-400">Alpha Consulting</li>
                <li className="cursor-pointer transition-all hover:text-cyan-400">Infrastructure-as-Code</li>
                <li className="cursor-pointer transition-all hover:text-cyan-400">Sovereign AI Labs</li>
                <li className="cursor-pointer transition-all hover:text-cyan-400">Quantum Research</li>
              </ul>
            </div>

            <div className="space-y-10">
              <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Contacto</h5>
              <ul className="space-y-5 font-mono text-sm font-medium text-white/50">
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">@</span> HQ_SAN_FRANCISCO
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">@</span> HUB_BERLIN
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">@</span> NOD_SINGAPORE
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 py-12 md:flex-row">
            <div className="flex flex-col items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 md:flex-row md:gap-8">
              <span>© {new Date().getFullYear()} VANGUARDIA TECH SYSTEMS</span>
              <span className="hidden md:block">ALL_RIGHTS_RESERVED</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 font-mono text-[10px] uppercase text-white/30 md:gap-12">
              <span className="cursor-pointer transition-colors hover:text-white">Privacy_Protocol</span>
              <span className="cursor-pointer transition-colors hover:text-white">ISO_27001_COMPLIANT</span>
              <span className="cursor-pointer transition-colors hover:text-white">v2.4.0-FINAL</span>
            </div>
          </div>
          <p className="mt-8 text-center text-[10px] text-white/20">
            Demo visual ·{" "}
            <Link href="/demos" className="text-cyan-500/80 hover:text-cyan-400">
              Volver al showroom
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
