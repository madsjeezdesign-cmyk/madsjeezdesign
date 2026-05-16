"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Award, ArrowRight, X } from "lucide-react";
import { getDemoVisuals } from "@/lib/demo-assets";
import { DemoLeadForm } from "./demo-lead-form";
import "./demo-gimnasio-premium.css";

const SLUG = "gimnasio" as const;
const BRAND = "Pulse Cross";

const MARQUEE = [
  "HAMMER STRENGTH",
  "ELEIKO",
  "ROGUE FITNESS",
  "LIFE FITNESS",
  "PANATTA",
] as const;

const PROGRAMS = [
  {
    title: "Hypertrophy",
    subtitle: "Advanced",
    description: "Protocolos RPE 9-10 para desarrollo de masa muscular crítica.",
    tags: ["8 sesiones/mes", "Avanzado"],
    neon: false,
  },
  {
    title: "Performance",
    subtitle: "Conditioning",
    description:
      "Capacidad cardiovascular extrema para deportes de contacto y CrossFit.",
    tags: ["Diario", "Pro"],
    neon: true,
  },
  {
    title: "Bio-Hacking",
    subtitle: "Wellness",
    description: "Optimización hormonal, recuperación infrarroja y nutrición celular.",
    tags: ["Personalizado", "Salud"],
    neon: false,
  },
] as const;

const COACHES = [
  { name: "Marcus Thorne", role: "Head of biomechanics" },
  { name: "Elena Volkov", role: "Strength specialist" },
  { name: "David Chen", role: "Nutrition & biochemistry" },
  { name: "Sarah Jenkins", role: "Rehab & mobility" },
] as const;

const GOALS = ["Hipertrofia", "Powerlifting", "Fat loss"] as const;

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll(".iron-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export function DemoGimnasioLanding() {
  const v = getDemoVisuals(SLUG);
  const programImages = [v.a, v.b, v.c];
  const coachImages = [v.cover, v.a, v.b, v.c];
  const rootRef = useScrollReveal();
  const [joinOpen, setJoinOpen] = useState(false);
  const [goal, setGoal] = useState<string>(GOALS[0]);

  const toggleJoin = useCallback(() => setJoinOpen((o) => !o), []);
  const closeJoin = useCallback(() => setJoinOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = joinOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [joinOpen]);

  return (
    <div
      ref={rootRef}
      className="iron-premium relative min-h-screen overflow-x-hidden bg-[#050505] font-[family-name:var(--font-demo-b-gimnasio)] text-white antialiased selection:bg-[#dfff00]/30"
    >
      {/* Nav */}
      <nav className="fixed top-0 z-[100] flex w-full items-center justify-between px-6 py-6 mix-blend-difference md:px-10 md:py-8">
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-demo-h-gimnasio)] text-2xl uppercase italic tracking-tight md:text-3xl">
            PULSE<span className="text-[#dfff00]">.</span>
          </span>
        </div>
        <div className="hidden gap-10 text-[10px] font-bold uppercase tracking-[0.4em] lg:flex">
          <a href="#about" className="transition-colors hover:text-[#dfff00]">
            La instalación
          </a>
          <a href="#training" className="transition-colors hover:text-[#dfff00]">
            Entrenamiento
          </a>
          <a href="#coaches" className="transition-colors hover:text-[#dfff00]">
            Mentores
          </a>
          <a href="#contact" className="transition-colors hover:text-[#dfff00]">
            Acceso
          </a>
        </div>
        <button
          type="button"
          aria-label="Menú"
          className="flex h-8 w-8 flex-col justify-center gap-1.5 group"
        >
          <span className="h-0.5 w-full bg-white transition-colors group-hover:bg-[#dfff00]" />
          <span className="h-0.5 w-2/3 bg-white transition-all group-hover:w-full group-hover:bg-[#dfff00]" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <p
          className="iron-giant-text font-[family-name:var(--font-demo-h-gimnasio)] top-1/4 left-0 uppercase"
          aria-hidden
        >
          HARDCORE
        </p>

        <div className="relative z-10 px-6 text-center">
          <h5 className="mb-10 text-xs font-black uppercase tracking-[0.8em] text-[#dfff00]">
            Establecido en 2024
          </h5>
          <h1 className="mb-12 font-[family-name:var(--font-demo-h-gimnasio)] text-5xl uppercase leading-none md:text-8xl lg:text-[8.75rem]">
            LIMITS ARE <br />
            <span className="italic text-[#dfff00]">FICTION.</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            <button type="button" onClick={toggleJoin} className="iron-btn-triple-a text-sm">
              Obtener membresía
            </button>
            <p className="max-w-[250px] text-left text-[10px] font-bold uppercase leading-relaxed tracking-widest text-gray-400">
              Sistemas de entrenamiento basados en datos para atletas de alto rendimiento.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <Image
            src={v.cover}
            alt="Entrenamiento en gimnasio"
            fill
            priority
            className="object-cover opacity-40 grayscale"
            sizes="100vw"
          />
        </div>

        <div className="absolute bottom-10 left-6 flex items-center gap-4 md:left-10">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#dfff00]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
            Status: entrenando ahora (42 atletas)
          </span>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/5 bg-[#0e0e0e] py-10">
        <div className="iron-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-20 px-10">
              {MARQUEE.map((brand) => (
                <span
                  key={`${dup}-${brand}`}
                  className="font-[family-name:var(--font-demo-sub-gimnasio)] text-2xl uppercase text-white/20 md:text-4xl"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-32">
            <div className="iron-scroll-reveal">
              <h2 className="mb-12 font-[family-name:var(--font-demo-h-gimnasio)] text-4xl uppercase md:text-5xl">
                La <span className="italic text-[#dfff00]">ingeniería</span> de la fuerza.
              </h2>
              <p className="mb-12 text-lg font-light leading-relaxed text-gray-400">
                No somos un gimnasio comercial. Somos un laboratorio de rendimiento. Equipado con la
                mejor tecnología biomecánica del mundo para maximizar el reclutamiento de fibras y
                minimizar el riesgo de lesiones.
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div className="border-l-2 border-[#dfff00] pl-6">
                  <h4 className="mb-2 font-[family-name:var(--font-demo-sub-gimnasio)] text-xl uppercase md:text-2xl">
                    Biomecánica
                  </h4>
                  <p className="text-xs text-gray-500">Máquinas Panatta de eje convergente.</p>
                </div>
                <div className="border-l-2 border-[#dfff00] pl-6">
                  <h4 className="mb-2 font-[family-name:var(--font-demo-sub-gimnasio)] text-xl uppercase md:text-2xl">
                    Nutrición
                  </h4>
                  <p className="text-xs text-gray-500">Bioquímica aplicada al deporte.</p>
                </div>
              </div>
            </div>
            <div className="iron-scroll-reveal relative">
              <div
                className="absolute -inset-4 -z-10 translate-x-4 translate-y-4 border border-[#dfff00]/20 md:translate-x-8 md:translate-y-8"
                aria-hidden
              />
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={v.b}
                  alt="Instalación de entrenamiento"
                  fill
                  className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="iron-glass absolute -left-4 bottom-6 max-w-xs p-6 md:-left-10 md:p-8">
                <Award className="mb-4 h-6 w-6 text-[#dfff00]" />
                <p className="text-xs font-bold leading-relaxed">
                  Única instalación certificada Elite Hammer Strength en la región.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programas */}
      <section id="training" className="bg-[#0e0e0e] py-24 md:py-40">
        <div className="mb-16 px-6 text-center md:mb-20 md:px-10">
          <h3 className="font-[family-name:var(--font-demo-h-gimnasio)] text-4xl uppercase md:text-6xl">
            Disciplinas <span className="text-white/20">AAA</span>
          </h3>
        </div>
        <div className="grid gap-1 lg:grid-cols-3">
          {PROGRAMS.map((prog, i) => (
            <article
              key={prog.title}
              className={`iron-program-card group cursor-pointer ${i === 1 ? "border-x border-white/5" : ""}`}
            >
              <Image
                src={programImages[i] ?? v.cover}
                alt={prog.title}
                fill
                className="iron-program-img absolute inset-0 object-cover opacity-60"
                sizes="33vw"
              />
              <div className="relative z-20 flex h-full flex-col justify-end p-10 md:p-16">
                <h4
                  className={`mb-4 font-[family-name:var(--font-demo-h-gimnasio)] text-3xl uppercase transition-transform group-hover:-translate-y-4 md:text-4xl ${prog.neon ? "text-[#dfff00]" : ""}`}
                >
                  {prog.title}
                  <br />
                  {prog.subtitle}
                </h4>
                <p className="text-sm text-gray-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {prog.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {prog.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-[8px] font-bold uppercase ${
                        prog.neon ? "bg-[#dfff00]/20 text-[#dfff00]" : "bg-white/10"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1400px]">
          <h5 className="mb-4 text-[10px] font-black tracking-[0.5em] text-[#dfff00]">
            COACHING STAFF
          </h5>
          <h2 className="mb-16 font-[family-name:var(--font-demo-h-gimnasio)] text-4xl uppercase md:mb-24 md:text-5xl">
            No solo entrenas.
            <br />
            <span className="font-light italic">Evolucionás.</span>
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
            {COACHES.map((coach, i) => (
              <div
                key={coach.name}
                className="iron-scroll-reveal group"
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <div className="relative mb-8 aspect-[3/4] overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
                  <Image
                    src={coachImages[i] ?? v.cover}
                    alt={coach.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h4 className="font-[family-name:var(--font-demo-sub-gimnasio)] text-xl uppercase md:text-2xl">
                  {coach.name}
                </h4>
                <p className="mt-2 text-[10px] font-black tracking-widest text-[#dfff00]">
                  {coach.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoLeadForm
        slug={SLUG}
        brandLabel={BRAND}
        theme={v.lead}
        kicker="Acceso y membresías"
        title="Consultá planes y horarios"
        sub="Coordinamos visita guiada, evaluación inicial y plan según tu objetivo."
      />

      {/* Footer */}
      <footer id="contact" className="border-t border-white/5 bg-[#0e0e0e] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="mb-10 font-[family-name:var(--font-demo-h-gimnasio)] text-5xl uppercase leading-none md:text-7xl">
              START YOUR
              <br />
              <span className="italic text-[#dfff00]">REIGN.</span>
            </h2>
            <div className="mt-12 flex flex-col gap-10 md:mt-20 md:flex-row md:gap-12">
              <div>
                <h5 className="mb-4 text-[10px] font-black tracking-widest text-[#dfff00]">
                  UBICACIÓN
                </h5>
                <p className="text-sm text-gray-400">
                  Sector industrial A1
                  <br />
                  Distrito de innovación, CABA
                </p>
              </div>
              <div>
                <h5 className="mb-4 text-[10px] font-black tracking-widest text-[#dfff00]">
                  CONTACTO
                </h5>
                <p className="text-sm text-gray-400">
                  hq@pulsecross.demo
                  <br />
                  +54 11 8899 0011
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-wrap justify-end gap-8 md:gap-10">
              {["Instagram", "YouTube", "Twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs font-bold uppercase transition-colors hover:text-[#dfff00]"
                >
                  {s}
                </a>
              ))}
            </div>
            <div className="mt-12 flex items-center border-b border-white/10 pb-2 md:mt-20">
              <input
                type="email"
                placeholder="Tu e-mail para newsletter elite"
                className="w-full bg-transparent text-[10px] font-black uppercase tracking-widest outline-none placeholder:text-white/30"
              />
              <ArrowRight className="h-5 w-5 shrink-0 cursor-pointer text-[#dfff00]" />
            </div>
            <p className="mt-8 text-[8px] font-bold uppercase tracking-widest text-gray-600 md:mt-10">
              © {new Date().getFullYear()} {BRAND}. Demo MadsJeez. No se admiten excusas.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal membresía */}
      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${joinOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!joinOpen}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeJoin}
          className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
        />
        <aside className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col justify-center overflow-y-auto border-l border-white/5 bg-[#050505] p-10 md:p-16">
          <button
            type="button"
            onClick={closeJoin}
            className="absolute right-6 top-6 text-white/40 transition-colors hover:text-white md:right-10 md:top-10"
            aria-label="Cerrar panel"
          >
            <X className="h-8 w-8" />
          </button>
          <h3 className="mb-6 font-[family-name:var(--font-demo-h-gimnasio)] text-4xl uppercase md:text-5xl">
            RECLUTA
            <br />
            <span className="italic text-[#dfff00]">ACCESO.</span>
          </h3>
          <p className="mb-10 text-sm leading-relaxed text-gray-500 md:mb-12">
            Solo 5 slots disponibles para nuevos ingresos este mes. Nuestro equipo de admisión
            revisará tu perfil en 24 h.
          </p>
          <form
            className="space-y-10 md:space-y-12"
            onSubmit={(e) => {
              e.preventDefault();
              closeJoin();
              document.getElementById("lead-gimnasio")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="border-b border-white/10 pb-4 transition-colors focus-within:border-[#dfff00]">
              <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-[#dfff00]">
                Full identity
              </label>
              <input
                type="text"
                placeholder="NOMBRE COMPLETO"
                className="w-full bg-transparent font-[family-name:var(--font-demo-h-gimnasio)] text-xl uppercase outline-none placeholder:text-white/5 md:text-2xl"
              />
            </div>
            <div className="border-b border-white/10 pb-4 transition-colors focus-within:border-[#dfff00]">
              <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-[#dfff00]">
                Comms channel
              </label>
              <input
                type="email"
                placeholder="E-MAIL O WHATSAPP"
                className="w-full bg-transparent font-[family-name:var(--font-demo-h-gimnasio)] text-xl uppercase outline-none placeholder:text-white/5 md:text-2xl"
              />
            </div>
            <div className="border-b border-white/10 pb-4 transition-colors focus-within:border-[#dfff00]">
              <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-[#dfff00]">
                Objetivo actual
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`px-5 py-2 text-[9px] font-black uppercase transition-all ${
                      goal === g
                        ? "bg-[#dfff00] text-black"
                        : "border border-white/10 hover:bg-[#dfff00] hover:text-black"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="iron-btn-triple-a w-full py-6 text-sm md:py-8">
              Enviar postulación
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export { DemoGimnasioLanding as DemoGimnasio };
