"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, Cpu, Gamepad2, HardDrive, Pickaxe, ShieldCheck, Users } from "lucide-react";
import { getGameServerConfig } from "@/lib/game-server-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/**
 * Voxel / Blocky archetype landing — playful pixel-grid identity for
 * Minecraft / Roblox / Terraria style game-server demos.
 *
 * Visual identity:
 * - Pixel-grid background via CSS gradient (not via font)
 * - Hard-edged cards (0px / 2px borders, NO rounded corners on key surfaces)
 * - Saturated palette tied to accent (grass / sky / dirt) with cream base
 * - Stacked plan blocks (NOT 3-col grid)
 * - Snappy ease-out, max 1.02 hover scale
 */
export function VoxelBlockyLanding({ slug }: Props) {
  const config = getGameServerConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const snap = useMotionTransition("snap", "snap");
  const ui = useMotionTransition("ui", "ui");

  const [openPlan, setOpenPlan] = useState<string | null>(null);

  const accentRgb = useMemo(() => {
    const hex = (config?.accent ?? "#22c55e").replace("#", "");
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }, [config?.accent]);

  if (!config || !v) return null;

  const accent = config.accent;
  const rgb = `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`;
  const popular = config.plans.find((p) => p.popular) ?? config.plans[0];

  const cssVars = {
    "--vb-accent": accent,
    "--vb-accent-rgb": rgb,
  } as React.CSSProperties;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#f4efe4] font-[family-name:var(--font-demo-b-gameserver)] text-[#1a1a1a] antialiased"
      style={cssVars}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <header className="relative z-20 border-b-2 border-[#1a1a1a] bg-[#f4efe4]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center border-2 border-[#1a1a1a]"
              style={{ background: accent }}
            >
              <Boxes className="h-4 w-4 text-[#1a1a1a]" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="font-mono text-[15px] font-bold tracking-tight">{config.brand}</p>
              <p className="font-mono text-[10px] text-[#555]">{config.gameLabel}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 font-mono text-[12px] font-medium text-[#555] md:flex">
            <a href="#planes" className="hover:text-[#1a1a1a]">planes</a>
            <a href="#how" className="hover:text-[#1a1a1a]">cómo va</a>
            <a href="#mods" className="hover:text-[#1a1a1a]">mods</a>
            <a href="#faq" className="hover:text-[#1a1a1a]">faq</a>
          </nav>
          <a
            href="#planes"
            className="border-2 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-2 font-mono text-[12px] font-bold text-[#f4efe4] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear servidor
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-24">
          <div className="relative">
            <span className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-1.5 font-mono text-[11px] font-semibold">
              <span className="block h-2 w-2" style={{ background: accent }} />
              {config.heroKicker}
            </span>

            <h1 className="mt-5 font-mono text-[44px] font-black uppercase leading-[0.95] tracking-tight md:text-[64px] lg:text-[76px]">
              {config.heroTitle}
              <br />
              <span
                className="inline-block px-2"
                style={{
                  background: accent,
                  color: "#1a1a1a",
                  boxShadow: "4px 4px 0 #1a1a1a",
                }}
              >
                {config.heroHighlight}
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-[#333] md:text-[16px]">
              {config.heroSub}
            </p>

            <p className="mt-5 font-mono text-[12px] font-semibold text-[#1a1a1a]">
              Listo en 2 minutos. Sin vueltas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#planes"
                className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-mono text-[12px] font-bold text-[#f4efe4] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Elegir plan
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-5 py-3 font-mono text-[12px] font-bold text-[#1a1a1a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Cómo funciona
              </a>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-3 font-mono text-[12px] sm:grid-cols-3">
              <li className="flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-2">
                <span className="block h-2 w-2" style={{ background: accent }} />
                Ping {config.pingMs}
              </li>
              <li className="flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-2">
                <span className="block h-2 w-2" style={{ background: accent }} />
                {config.onlinePlayers} jugando
              </li>
              <li className="flex items-center gap-2 border-2 border-[#1a1a1a] bg-white px-3 py-2">
                <span className="block h-2 w-2" style={{ background: accent }} />
                Backups c/6h
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] border-2 border-[#1a1a1a] bg-white">
              <Image
                src={v.cover}
                alt={config.gameLabel}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background: `linear-gradient(180deg, transparent 60%, rgba(${rgb}, 0.18) 100%)`,
                }}
              />
            </div>
            <div
              className="absolute -bottom-5 -left-3 border-2 border-[#1a1a1a] bg-white px-4 py-3 font-mono text-[11px] leading-tight md:-left-5"
              style={{ boxShadow: "5px 5px 0 #1a1a1a" }}
            >
              <p className="text-[10px] uppercase text-[#555]">uptime 30d</p>
              <p className="text-[18px] font-black">99.98%</p>
            </div>
            <div
              className="absolute -right-3 -top-4 hidden border-2 border-[#1a1a1a] px-3 py-2 font-mono text-[10px] font-bold uppercase md:block"
              style={{ background: accent, color: "#1a1a1a", boxShadow: "4px 4px 0 #1a1a1a" }}
            >
              {config.industryLabel}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="relative border-y-2 border-[#1a1a1a] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10 flex flex-col gap-2">
            <p className="font-mono text-[12px] font-semibold text-[#555]">cómo funciona</p>
            <h2 className="font-mono text-[28px] font-black leading-tight md:text-[40px]">
              Tres bloques. Estás dentro.
            </h2>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {[
              { n: "01", title: "Elegís el plan", body: "Tres tamaños. Sin trucos. Ves la RAM, slots y disco antes de pagar." },
              { n: "02", title: "Apretás Deploy", body: "El servidor se enciende en ~60 s con tu nombre y subdominio gratis." },
              { n: "03", title: "Repartís la IP", body: "Compartís el panel y la IP con tus amigos. Listo, a jugar." },
            ].map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...ui, delay: i * 0.06 }}
                className="relative border-2 border-[#1a1a1a] bg-[#f4efe4] p-5"
                style={{ boxShadow: "6px 6px 0 #1a1a1a" }}
              >
                <span
                  className="absolute -right-2 -top-2 border-2 border-[#1a1a1a] px-2 py-1 font-mono text-[11px] font-black"
                  style={{ background: accent }}
                >
                  {step.n}
                </span>
                <h3 className="font-mono text-[16px] font-bold">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#333]">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="planes" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[12px] font-semibold text-[#555]">planes</p>
            <h2 className="mt-1 font-mono text-[28px] font-black leading-tight md:text-[40px]">
              Tres bloques. Tres tamaños.
            </h2>
            <p className="mt-3 text-[14px] text-[#333]">
              Demo en ARS. Sin permanencia. Cambias de plan cuando quieras.
            </p>
          </div>

          <div className="space-y-5">
            {config.plans.map((plan) => {
              const isPopular = plan.name === popular?.name && popular?.popular;
              const isOpen = openPlan === plan.name;
              return (
                <motion.article
                  key={plan.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={ui}
                  className="relative border-2 border-[#1a1a1a] bg-white"
                  style={isPopular ? { boxShadow: "8px 8px 0 #1a1a1a" } : { boxShadow: "4px 4px 0 #1a1a1a" }}
                >
                  {isPopular ? (
                    <span
                      className="absolute -top-3 left-5 border-2 border-[#1a1a1a] px-2 py-0.5 font-mono text-[10px] font-black"
                      style={{ background: accent, color: "#1a1a1a" }}
                    >
                      Más elegido
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setOpenPlan(isOpen ? null : plan.name)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-7 md:py-6"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#1a1a1a] md:h-14 md:w-14"
                        style={{ background: isPopular ? accent : "#f4efe4" }}
                      >
                        <Boxes className="h-5 w-5 text-[#1a1a1a]" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="font-mono text-[16px] font-bold leading-tight md:text-[18px]">{plan.name}</p>
                        <p className="font-mono text-[12px] text-[#555]">
                          {plan.ram} · {plan.slots} slots · {plan.storage}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[20px] font-black md:text-[24px]">{plan.price}</p>
                      <p className="font-mono text-[10px] text-[#555]">/ mes</p>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={ui}
                        className="overflow-hidden border-t-2 border-[#1a1a1a]"
                      >
                        <div className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_auto] md:px-7">
                          <ul className="grid gap-2 text-[14px] text-[#333] sm:grid-cols-2">
                            {[
                              { Icon: HardDrive, text: `${plan.ram} RAM dedicada` },
                              { Icon: Users, text: `${plan.slots} jugadores` },
                              { Icon: Cpu, text: "CPU prioritaria" },
                              { Icon: ShieldCheck, text: "Anti-DDoS incluido" },
                            ].map(({ Icon, text }) => (
                              <li key={text} className="flex items-center gap-2 font-mono text-[12px]">
                                <span
                                  className="flex h-5 w-5 items-center justify-center border-2 border-[#1a1a1a]"
                                  style={{ background: accent }}
                                >
                                  <Icon className="h-3 w-3 text-[#1a1a1a]" strokeWidth={2.5} />
                                </span>
                                {text}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#demo-contacto"
                            className="inline-flex items-center justify-center gap-2 self-start border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-mono text-[12px] font-bold text-[#f4efe4] transition-transform hover:scale-[1.02] active:scale-[0.98] md:self-center"
                          >
                            Activar {plan.name}
                          </a>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative border-y-2 border-[#1a1a1a] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-10">
            <p className="font-mono text-[12px] font-semibold text-[#555]">incluido en todos los planes</p>
            <h2 className="mt-1 font-mono text-[28px] font-black md:text-[40px]">Sin letra chica.</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...snap, delay: i * 0.03 }}
                className="flex items-start gap-3 border-2 border-[#1a1a1a] bg-[#f4efe4] p-4"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[#1a1a1a]"
                  style={{ background: accent }}
                >
                  <Pickaxe className="h-3 w-3 text-[#1a1a1a]" strokeWidth={2.5} />
                </span>
                <span className="text-[14px] leading-snug text-[#1a1a1a]">{f}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="mods" className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-8 flex flex-col gap-2">
            <p className="font-mono text-[12px] font-semibold text-[#555]">mods & stacks</p>
            <h2 className="font-mono text-[28px] font-black md:text-[40px]">Un click. Probás todo.</h2>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {config.mods.map((mod) => (
              <li
                key={mod}
                className="border-2 border-[#1a1a1a] bg-white px-3.5 py-1.5 font-mono text-[12px] font-medium transition-transform hover:scale-[1.02]"
              >
                {mod}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[v.a, v.b, v.c].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] border-2 border-[#1a1a1a] bg-white">
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative border-t-2 border-[#1a1a1a] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8">
            <p className="font-mono text-[12px] font-semibold text-[#555]">faq</p>
            <h2 className="mt-1 font-mono text-[28px] font-black md:text-[40px]">Lo que preguntan.</h2>
          </div>
          <FaqList items={config.faq} ui={ui} />
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div
            className="flex flex-col items-start gap-4 border-2 border-[#1a1a1a] p-6 md:flex-row md:items-center md:justify-between md:p-8"
            style={{ background: accent, boxShadow: "8px 8px 0 #1a1a1a" }}
          >
            <div className="flex items-start gap-4">
              <Gamepad2 className="h-8 w-8 shrink-0 text-[#1a1a1a]" strokeWidth={2.5} />
              <div>
                <h3 className="font-mono text-[18px] font-black text-[#1a1a1a] md:text-[22px]">
                  Listo. Apretá y juga.
                </h3>
                <p className="mt-1 text-[14px] text-[#1a1a1a]/80">
                  Sin tarjeta para probar. Sin permanencia. Sin upsells raros.
                </p>
              </div>
            </div>
            <Link
              href="#demo-contacto"
              className="inline-flex shrink-0 items-center gap-2 border-2 border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 font-mono text-[12px] font-bold text-[#f4efe4] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Crear mi servidor
            </Link>
          </div>
        </div>
      </section>

      <div id="demo-contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.gameLabel}`}
          theme={v.lead}
          kicker="Crear servidor"
          title="Decinos cómo lo querés"
          sub="Te respondemos con IP, panel y guía de conexión en menos de 24 h."
        />
      </div>

      <footer className="border-t-2 border-[#1a1a1a] bg-[#f4efe4] px-5 py-8 text-center md:px-8">
        <p className="font-mono text-[11px] text-[#555]">
          © {new Date().getFullYear()} {config.brand} · Demo {config.gameLabel}. Marca no afiliada al editor del juego.
        </p>
      </footer>
    </div>
  );
}

function FaqList({
  items,
  ui,
}: {
  items: readonly { q: string; a: string }[];
  ui: ReturnType<typeof useMotionTransition>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className="border-2 border-[#1a1a1a] bg-[#f4efe4]"
            style={{ boxShadow: "4px 4px 0 #1a1a1a" }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-mono text-[14px] font-bold leading-snug">{item.q}</span>
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#1a1a1a] font-mono text-[16px] font-black"
                style={{ background: isOpen ? "var(--vb-accent)" : "#fff" }}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={ui}
                  className="overflow-hidden border-t-2 border-[#1a1a1a]"
                >
                  <p className="px-5 py-4 text-[14px] leading-relaxed text-[#333]">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
