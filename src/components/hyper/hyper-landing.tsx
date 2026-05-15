"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Building2,
  Code2,
  Command,
  Image as ImageIcon,
  LayoutTemplate,
  Menu,
  MonitorSmartphone,
  Plug,
  Share2,
  ShieldCheck,
  ShoppingCart,
  X,
  Zap,
} from "lucide-react";
import {
  portfolioSites,
  services,
  site,
  technologies,
  websiteModels,
  whatWeDo,
  yearsExperience,
} from "@/lib/data";
import { HyperContact } from "./hyper-contact";
import { HyperTerminal } from "./hyper-terminal";
import { LogoQuantum } from "./logo-quantum";
import { ParticleField } from "./particle-field";

const serviceIcons = [
  LayoutTemplate,
  Building2,
  ShoppingCart,
  ImageIcon,
  MonitorSmartphone,
  Plug,
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.mapsQuery)}`;

export function HyperLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const techByCategory = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const t of technologies) {
      const list = map.get(t.category) ?? [];
      list.push(t.name);
      map.set(t.category, list);
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070a] pt-0 font-[family-name:var(--font-plus-jakarta)] text-white selection:bg-[#1de0b1] selection:text-black">
      <ParticleField />

      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-700 ${
          scrolled
            ? "border-b border-white/5 bg-[#05070a]/80 py-4 backdrop-blur-2xl"
            : "bg-transparent py-10"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <a href="#" className="group flex items-center gap-4 md:gap-6">
            <LogoQuantum />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black leading-none tracking-tighter transition-colors group-hover:text-[#1de0b1] md:text-2xl">
                MADSJEEZ
              </span>
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-600 md:text-[10px] md:tracking-[0.4em]">
                Hyperlabs · {site.experienceLabel}
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400 xl:flex xl:gap-10">
            <a href="#que-hacemos" className="transition-all hover:text-[#1de0b1]">Qué hacemos</a>
            <a href="#sistemas" className="transition-all hover:text-[#1de0b1]">Servicios</a>
            <a href="#trabajos" className="transition-all hover:text-[#1de0b1]">Trabajos</a>
            <a href="#modelos" className="transition-all hover:text-[#1de0b1]">Modelos</a>
            <a href="#stack" className="transition-all hover:text-[#1de0b1]">Stack</a>
            <a href="#protocolos" className="transition-all hover:text-[#1de0b1]">Código</a>
            <a href="#nexo" className="transition-all hover:text-[#1de0b1]">Nexo</a>
            <a
              href="#nexo"
              className="rounded-full bg-[#1de0b1] px-6 py-2.5 text-[#05070a] shadow-[0_10px_20px_-5px_rgba(29,224,177,0.4)] transition-all hover:scale-105 hover:bg-white active:scale-95 md:px-8 md:py-3"
            >
              Consultar
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white xl:hidden"
            onClick={() => setMobileOpen((x) => !x)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-b border-white/10 bg-[#05070a]/95 px-6 py-6 backdrop-blur-xl xl:hidden">
            <div className="flex flex-col gap-3 font-[family-name:var(--font-jetbrains)] text-xs font-bold uppercase tracking-widest text-zinc-300">
              <a href="#que-hacemos" onClick={() => setMobileOpen(false)}>Qué hacemos</a>
              <a href="#sistemas" onClick={() => setMobileOpen(false)}>Servicios</a>
              <a href="#trabajos" onClick={() => setMobileOpen(false)}>Trabajos</a>
              <a href="#modelos" onClick={() => setMobileOpen(false)}>Modelos</a>
              <a href="#stack" onClick={() => setMobileOpen(false)}>Stack</a>
              <a href="#protocolos" onClick={() => setMobileOpen(false)}>Código</a>
              <a href="#nexo" onClick={() => setMobileOpen(false)}>Nexo</a>
              <a
                href="#nexo"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-[#1de0b1] py-3 text-black"
              >
                Consultar
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden px-8 pb-32 pt-64">
        <div className="mx-auto grid max-w-7xl items-center gap-24 lg:grid-cols-2">
          <div className="relative z-10 space-y-12 text-left">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#1de0b1]/30 bg-[#1de0b1]/5 px-4 py-2 backdrop-blur-xl md:gap-3 md:px-5 md:py-2.5">
              <Activity className="h-4 w-4 shrink-0 animate-pulse text-[#1de0b1]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-widest text-[#1de0b1] md:text-[10px]">
                Desde {site.foundedYear} · {yearsExperience}+ años · BS AS
              </span>
            </div>

            <h1 className="hyper-glow text-5xl font-extrabold leading-[0.9] tracking-tighter sm:text-7xl md:text-[90px] lg:text-[110px]">
              WEB
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
              >
                QUE
              </span>
              <br />
              CONVIERTE.
            </h1>

            <p className="max-w-lg text-lg font-light leading-relaxed text-zinc-400 md:text-xl">
              {whatWeDo.headline} {whatWeDo.paragraphs[0]}
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:gap-6 sm:pt-6">
              <a
                href="#nexo"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-5 text-xs font-black uppercase tracking-widest text-black transition-all hover:-translate-y-2 hover:bg-[#1de0b1] sm:px-12 sm:py-6 sm:text-sm"
              >
                Pedir presupuesto
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </a>
              <a
                href="#que-hacemos"
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-xs font-black uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/5 sm:px-10 sm:py-6 sm:text-sm"
              >
                <Command className="h-5 w-5 shrink-0" /> Ver qué hacemos
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite] rounded-full border border-[#1de0b1]/10" />
            <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-blue-500/5" />

            <div className="hyper-float relative z-10">
              <HyperTerminal />

              <div className="absolute -bottom-6 -right-4 max-w-[240px] space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-left shadow-2xl backdrop-blur-xl sm:-bottom-10 sm:-right-10 sm:max-w-none sm:space-y-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 sm:h-10 sm:w-10">
                    <ShieldCheck className="h-5 w-5 text-blue-400 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 sm:text-[10px]">
                      Horario de atención
                    </div>
                    <div className="font-[family-name:var(--font-jetbrains)] text-base font-bold leading-tight tracking-tighter sm:text-lg">
                      {site.hours}
                    </div>
                    <div className="mt-0.5 text-[10px] text-zinc-500">
                      {site.address.street}, {site.address.locality} · {site.address.partido}
                    </div>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-3/4 animate-pulse bg-[#1de0b1]" />
                </div>
              </div>

              <div className="absolute -left-4 -top-4 max-w-[140px] rotate-[-6deg] rounded-3xl bg-[#1de0b1] p-4 text-left text-black shadow-2xl transition-transform duration-500 group-hover:rotate-0 sm:-left-12 sm:-top-12 sm:max-w-none sm:p-5">
                <Zap className="mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                <div className="text-xl font-black tracking-tighter sm:text-2xl">{site.experienceLabel}</div>
                <div className="text-[8px] font-bold uppercase tracking-widest sm:text-[9px]">
                  Trayectoria · {yearsExperience}+ años
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="que-hacemos"
        className="relative scroll-mt-24 border-y border-white/5 bg-[#080a0f] px-6 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl space-y-4 text-left">
            <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
              QUÉ{" "}
              <span className="text-[#1de0b1]">HACEMOS</span>
            </h2>
            <div className="h-1 w-20 bg-[#1de0b1]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-base leading-relaxed text-zinc-400 md:text-lg">
              {whatWeDo.headline}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {whatWeDo.paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="hyper-card rounded-[2rem] border border-white/5 p-8 text-left"
              >
                <div className="mb-4 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#1de0b1]">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sistemas" className="relative scroll-mt-24 px-6 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-10 text-left md:mb-24 md:flex-row">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
                SERVICIOS
                <br />
                <span className="text-[#1de0b1]">DIGITALES.</span>
              </h2>
              <div className="h-1 w-20 bg-[#1de0b1]" />
            </div>
            <p className="max-w-md font-[family-name:var(--font-jetbrains)] text-sm leading-relaxed tracking-tight text-zinc-500">
              Sitios, tiendas, sistemas e integraciones: lo que tu operación
              necesita para vender y organizarse online, con código mantenible.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {services.map((item, i) => {
              const Icon = serviceIcons[i % serviceIcons.length]!;
              return (
                <div
                  key={item.title}
                  className="hyper-card group/card relative overflow-hidden rounded-[2.5rem] border border-white/5 p-8 text-left md:p-10"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-all duration-500 group-hover/card:bg-[#1de0b1] group-hover/card:text-black md:h-16 md:w-16">
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold tracking-tight md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mb-5 font-light leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-wider text-zinc-400"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1de0b1] transition-all duration-700 group-hover/card:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="trabajos"
        className="relative scroll-mt-24 border-y border-white/5 bg-[#080a0f] px-6 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 text-left md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
                PÁGINAS
                <br />
                <span className="text-[#1de0b1]">&amp; TRABAJOS.</span>
              </h2>
              <div className="h-1 w-20 bg-[#1de0b1]" />
            </div>
            <p className="max-w-md font-[family-name:var(--font-jetbrains)] text-sm text-zinc-500">
              Tipos de proyectos que entregamos. Podés pedir referencias o ver
              demos al consultar.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioSites.map((proj) => (
              <a
                key={proj.title}
                href={proj.href}
                className="group hyper-card flex flex-col rounded-[2rem] border border-white/5 p-8 text-left transition-all hover:border-[#1de0b1]/30"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="rounded-full border border-[#1de0b1]/30 bg-[#1de0b1]/10 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-[#1de0b1]">
                    {proj.category}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-[family-name:var(--font-jetbrains)] text-[9px] font-bold uppercase tracking-wider ${
                      proj.status === "disponible"
                        ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/40 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {proj.status === "disponible" ? "Referencia" : "Consultar"}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight transition-colors group-hover:text-[#1de0b1]">
                  {proj.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500">
                  {proj.description}
                </p>
                <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  <Code2 className="h-3.5 w-3.5 text-zinc-500" />
                  {proj.tag}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="modelos" className="relative scroll-mt-24 px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl space-y-4 text-left md:mb-16">
            <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
              MODELOS
              <br />
              <span className="text-[#1de0b1]">DISPONIBLES.</span>
            </h2>
            <div className="h-1 w-20 bg-[#1de0b1]" />
            <p className="font-[family-name:var(--font-jetbrains)] text-sm text-zinc-500">
              Paquetes de arranque para ordenar expectativas. El precio final se
              define según alcance y contenidos.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {websiteModels.map((m) => (
              <div
                key={m.id}
                className="hyper-card rounded-[2rem] border border-white/5 p-8 text-left md:p-10"
              >
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter">
                      {m.name}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-sm text-[#1de0b1]">
                      {m.subtitle}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    {m.priceNote}
                  </span>
                </div>
                <ul className="mb-6 space-y-2.5 border-t border-white/5 pt-6">
                  {m.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm leading-relaxed text-zinc-400"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1de0b1]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="border-t border-white/5 pt-6 text-xs font-medium leading-relaxed text-zinc-500">
                  <span className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    Ideal para ·{" "}
                  </span>
                  {m.idealFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stack"
        className="relative scroll-mt-24 border-y border-white/5 bg-[#080a0f] px-6 py-24 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 text-left md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
                LENGUAJES
                <br />
                <span className="text-[#1de0b1]">&amp; STACK.</span>
              </h2>
              <div className="h-1 w-20 bg-[#1de0b1]" />
            </div>
            <p className="max-w-md font-[family-name:var(--font-jetbrains)] text-sm text-zinc-500">
              Herramientas que usamos día a día. Elegimos según el proyecto: velocidad,
              SEO, pagos, datos y mantenimiento.
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from(techByCategory.entries()).map(([category, names]) => (
              <div key={category} className="text-left">
                <div className="mb-4 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-[#1de0b1]" />
                  <h3 className="font-[family-name:var(--font-jetbrains)] text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {names.map((name) => (
                    <span
                      key={name}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-[family-name:var(--font-jetbrains)] text-xs font-medium text-zinc-300"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="protocolos"
        className="relative overflow-hidden scroll-mt-24 border-y border-white/5 bg-[#0a0c10] py-16 md:py-24"
      >
        <div className="flex gap-10 overflow-x-auto py-8 opacity-25 scrollbar-none transition-opacity duration-700 hover:opacity-100 md:gap-12 md:overflow-hidden md:whitespace-nowrap md:py-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 gap-6 font-[family-name:var(--font-jetbrains)] text-2xl font-black italic tracking-tighter text-white md:gap-12 md:text-4xl lg:text-6xl"
            >
              {technologies.map((t, j) => (
                <span
                  key={`${i}-${t.name}-${j}`}
                  className={j % 3 === 1 ? "text-[#1de0b1]" : ""}
                >
                  {t.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <HyperContact />

      <footer className="relative overflow-hidden px-8 pt-40 pb-20">
        <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-2">
          <div className="space-y-12 text-left">
            <h2 className="text-6xl font-black tracking-tighter">
              ¿ESTÁS LISTO PARA
              <br />
              <span className="text-[#1de0b1]">EL SIGUIENTE NIVEL?</span>
            </h2>
            <div className="flex flex-col items-start gap-12 sm:flex-row sm:items-center">
              <a
                href="#nexo"
                className="rounded-full bg-white px-12 py-6 font-black uppercase tracking-widest text-black transition-all hover:scale-110 hover:bg-[#1de0b1]"
              >
                AGENDAR NEXO
              </a>
              <div className="flex gap-6">
                <a
                  href="#protocolos"
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-all hover:bg-white/10"
                  aria-label="Stack en movimiento"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 border-l border-white/10 pl-8 text-left md:pl-20">
            <div className="space-y-6">
              <h4 className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#1de0b1]">
                Directorio
              </h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-zinc-500">
                <li>
                  <a href="#que-hacemos" className="transition-colors hover:text-white">
                    Qué hacemos
                  </a>
                </li>
                <li>
                  <a href="#trabajos" className="transition-colors hover:text-white">
                    Trabajos
                  </a>
                </li>
                <li>
                  <a href="#modelos" className="transition-colors hover:text-white">
                    Modelos
                  </a>
                </li>
                <li>
                  <a href="#stack" className="transition-colors hover:text-white">
                    Stack
                  </a>
                </li>
                <li>
                  <a href="#nexo" className="transition-colors hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#1de0b1]">
                Estudio
              </h4>
              <p className="text-sm font-bold uppercase leading-relaxed tracking-widest text-zinc-500">
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.partido}
                <br />
                {site.address.province}, {site.address.country}
              </p>
              <p className="text-xs font-[family-name:var(--font-jetbrains)] font-bold uppercase tracking-widest text-zinc-600">
                {site.hours}
              </p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#1de0b1] transition-colors hover:text-white"
              >
                Ver en Google Maps
              </a>
              <p className="pt-2 text-[10px] font-[family-name:var(--font-jetbrains)] font-bold uppercase tracking-widest text-zinc-600">
                {site.experienceLabel} · {yearsExperience}+ años
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-40 flex max-w-7xl flex-col items-center justify-between gap-10 border-t border-white/5 pt-10 opacity-40 md:flex-row">
          <div className="text-center font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.35em] md:text-left">
            <span className="tracking-[0.5em]">MadsJeez Design</span>
            <span className="mx-2 text-zinc-600">·</span>
            {site.foundedYear}—{site.activeYear}
            <span className="mx-2 text-zinc-600">·</span>© {site.activeYear}
          </div>
          <div className="flex items-center gap-4 font-[family-name:var(--font-jetbrains)] text-[10px]">
            <span className="text-[#1de0b1]">●</span>
            {yearsExperience}+ AÑOS EN EXPERIENCIA DIGITAL
          </div>
        </div>
      </footer>
    </div>
  );
}
