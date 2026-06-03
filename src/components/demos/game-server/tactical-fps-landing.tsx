"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Crosshair,
  Cpu,
  HardDrive,
  Radar,
  Shield,
  Signal,
  Target,
  Users,
} from "lucide-react";
import { getGameServerConfig } from "@/lib/game-server-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/**
 * Tactical FPS archetype landing — HUD-driven identity for
 * CS2 / Rust / FiveM / Palworld style data-dense server demos.
 *
 * Visual identity:
 * - Dark base (#0a0a0a) + ONE warning accent (config.accent: amber/red/purple/cyan)
 * - Monospace labels, data-dense above-fold (tickrate, slots, anticheat, ping)
 * - Plans as horizontal stat-row cards with table-like comparison
 * - Live status panel + wipe/event schedule visible
 * - Snappy hover transitions, no glow orbs, no rounded mega-cards
 */
export function TacticalFpsLanding({ slug }: Props) {
  const config = getGameServerConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const snap = useMotionTransition("snap", "snap");
  const ui = useMotionTransition("ui", "ui");

  const accentRgb = useMemo(() => {
    const hex = (config?.accent ?? "#f59e0b").replace("#", "");
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }, [config?.accent]);

  if (!config || !v) return null;

  const accent = config.accent;
  const rgb = `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`;

  const cssVars = {
    ["--fps-accent" as string]: accent,
    ["--fps-accent-rgb" as string]: rgb,
  } as React.CSSProperties;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] font-[family-name:var(--font-demo-b-gameserver)] text-zinc-200 antialiased"
      style={cssVars}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center border"
              style={{ borderColor: accent, color: accent }}
            >
              <Crosshair className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="leading-tight">
              <p className="font-mono text-[13px] font-bold tracking-tight text-white">{config.brand}</p>
              <p className="font-mono text-[10px] uppercase text-zinc-500">{config.gameLabel}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase text-zinc-400 md:flex">
            <a href="#status" className="hover:text-white">status</a>
            <a href="#planes" className="hover:text-white">tiers</a>
            <a href="#schedule" className="hover:text-white">schedule</a>
            <a href="#faq" className="hover:text-white">faq</a>
          </nav>
          <a
            href="#demo-contacto"
            className="inline-flex items-center gap-1.5 border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
            style={{ borderColor: accent, color: accent }}
          >
            Deploy
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
        <div className="border-t border-white/5 bg-black/30">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-1 px-5 py-1.5 font-mono text-[10px] uppercase text-zinc-500 md:px-8">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: accent }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: accent }}
                />
              </span>
              <span style={{ color: accent }}>operational</span>
            </span>
            <span>nodes: AR · BR · US · EU</span>
            <span>
              ping prom <span className="text-white">{config.pingMs}</span>
            </span>
            <span>
              online <span className="text-white">{config.onlinePlayers}</span>
            </span>
            <span className="ml-auto hidden sm:inline">build 25.06.3</span>
          </div>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:px-8 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pb-24">
          <div className="relative">
            <p className="font-mono text-[11px] uppercase text-zinc-500">
              <span style={{ color: accent }}>{"// "}</span>
              {config.heroKicker}
            </p>

            <h1 className="mt-4 text-[42px] font-bold leading-[1.02] tracking-tight text-white md:text-[60px] lg:text-[70px]">
              {config.heroTitle}{" "}
              <span style={{ color: accent }}>{config.heroHighlight}</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-[16px]">
              {config.heroSub}
            </p>

            <p className="mt-5 font-mono text-[12px] uppercase text-zinc-500">
              <span style={{ color: accent }}>{config.industryLabel}</span>
              <span className="mx-2">·</span>
              anticheat propio
              <span className="mx-2">·</span>
              ping argentino
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#planes"
                className="inline-flex items-center gap-2 border px-5 py-3 font-mono text-[12px] uppercase tracking-wide text-white transition-colors hover:bg-[rgba(var(--fps-accent-rgb),0.1)]"
                style={{ borderColor: accent }}
              >
                Ver tiers
              </a>
              <a
                href="#status"
                className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[12px] uppercase tracking-wide text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Status en vivo
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "tickrate", value: tickrateFor(slug) },
                { label: "slots máx", value: maxSlots(config) },
                { label: "ping prom", value: config.pingMs },
                { label: "anticheat", value: "ON" },
              ].map((stat) => (
                <div key={stat.label} className="border border-white/10 bg-white/[0.02] p-3">
                  <dt className="font-mono text-[9px] uppercase text-zinc-500">{stat.label}</dt>
                  <dd className="mt-1 font-mono text-[18px] font-bold" style={{ color: accent }}>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden border border-white/10 bg-black">
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
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              {(
                [
                  ["top-3 left-3", "border-l border-t"],
                  ["top-3 right-3", "border-r border-t"],
                  ["bottom-3 left-3", "border-l border-b"],
                  ["bottom-3 right-3", "border-r border-b"],
                ] as const
              ).map(([pos, edges]) => (
                <span
                  key={pos}
                  className={`pointer-events-none absolute h-4 w-4 ${pos} ${edges}`}
                  style={{ borderColor: accent }}
                  aria-hidden
                />
              ))}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 font-mono text-[10px] uppercase">
                <div>
                  <p className="text-zinc-400">target acquired</p>
                  <p className="text-[14px] font-bold text-white normal-case">{config.industryLabel}</p>
                </div>
                <span className="border px-2 py-0.5" style={{ borderColor: accent, color: accent }}>
                  live
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase text-zinc-500">
              {config.locations.slice(0, 3).map((loc) => (
                <div key={loc} className="flex items-center gap-1.5 border border-white/10 px-2 py-1.5">
                  <Signal className="h-3 w-3" style={{ color: accent }} />
                  {loc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="status" className="relative border-y border-white/10 bg-black/40 py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-6 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-zinc-500">{"// status panel"}</p>
              <h2 className="font-mono text-[22px] font-bold tracking-tight text-white md:text-[28px]">
                Servidores online · ping prom {config.pingMs}
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase text-zinc-500">
              actualizado · hace 12 s
            </p>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {liveNodesFor(config).map((node) => (
              <motion.li
                key={node.name}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={snap}
                className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-[12px] uppercase"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="block h-2 w-2 rounded-full"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <span className="text-white">{node.name}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                  <span>{node.ping}</span>
                  <span>{node.players}</span>
                  <span style={{ color: accent }}>{node.status}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section id="planes" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-zinc-500">{"// tiers"}</p>
              <h2 className="font-mono text-[24px] font-bold tracking-tight text-white md:text-[32px]">
                Comparativa de tiers
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase text-zinc-500">
              ARS · mensual · sin permanencia
            </p>
          </div>

          <div className="hidden grid-cols-[1.2fr_repeat(4,_1fr)_auto] items-center gap-3 border-b border-white/10 px-4 pb-2 font-mono text-[10px] uppercase text-zinc-500 md:grid">
            <span>tier</span>
            <span>ram</span>
            <span>slots</span>
            <span>storage</span>
            <span>precio</span>
            <span className="w-24 text-right">deploy</span>
          </div>

          <ul className="mt-3 space-y-2">
            {config.plans.map((plan, i) => (
              <motion.li
                key={plan.name}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...ui, delay: i * 0.04 }}
                className="grid grid-cols-2 items-center gap-3 border bg-white/[0.02] p-4 md:grid-cols-[1.2fr_repeat(4,_1fr)_auto] md:px-4 md:py-3.5"
                style={{ borderColor: plan.popular ? accent : "rgba(255,255,255,0.1)" }}
              >
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" style={{ color: accent }} />
                    <p className="font-mono text-[14px] font-bold uppercase text-white">{plan.name}</p>
                    {plan.popular ? (
                      <span
                        className="border px-1.5 py-0.5 font-mono text-[9px] uppercase"
                        style={{ borderColor: accent, color: accent }}
                      >
                        best
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] uppercase text-zinc-500 md:hidden">
                    {plan.ram} · {plan.slots} slots · {plan.storage}
                  </p>
                </div>
                <span className="hidden font-mono text-[13px] text-zinc-300 md:inline">{plan.ram}</span>
                <span className="hidden font-mono text-[13px] text-zinc-300 md:inline">{plan.slots}</span>
                <span className="hidden font-mono text-[13px] text-zinc-300 md:inline">{plan.storage}</span>
                <span className="font-mono text-[16px] font-bold text-white">
                  {plan.price}
                  <span className="ml-1 text-[10px] font-normal text-zinc-500">/mes</span>
                </span>
                <a
                  href="#demo-contacto"
                  className="inline-flex items-center justify-center gap-1.5 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wide transition-colors hover:bg-[rgba(var(--fps-accent-rgb),0.12)]"
                  style={{ borderColor: accent, color: accent }}
                >
                  Deploy
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase text-zinc-500">{"// loadout"}</p>
            <h2 className="font-mono text-[22px] font-bold tracking-tight text-white md:text-[28px]">
              Configuración incluida
            </h2>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => {
              const Icon = featureIcon(i);
              return (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...snap, delay: i * 0.03 }}
                  className="flex items-start gap-3 border border-white/10 bg-white/[0.015] p-3.5 transition-colors hover:border-white/25"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                  <span className="text-[13px] leading-snug text-zinc-300">{f}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="schedule" className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-zinc-500">{"// schedule"}</p>
              <h2 className="font-mono text-[22px] font-bold tracking-tight text-white md:text-[28px]">
                Wipes y eventos
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase text-zinc-500">
              GMT-3 · auto-notify a Discord
            </p>
          </div>
          <ol className="grid gap-2">
            {scheduleFor(slug).map((row, i) => (
              <motion.li
                key={row.code}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...snap, delay: i * 0.04 }}
                className="flex items-center justify-between gap-4 border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-[12px] uppercase"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="border px-2 py-0.5 text-[10px]"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {row.code}
                  </span>
                  <span className="text-zinc-200">{row.when}</span>
                </div>
                <span className="text-zinc-400">{row.what}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-6">
            <p className="font-mono text-[11px] uppercase text-zinc-500">{"// stack"}</p>
            <h2 className="font-mono text-[22px] font-bold tracking-tight text-white md:text-[28px]">
              Plugins & mods
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2">
            {config.mods.map((mod) => (
              <li
                key={mod}
                className="border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase text-zinc-300 transition-colors hover:border-[color:var(--fps-accent)] hover:text-white"
              >
                {mod}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-2 sm:grid-cols-3">
            {[v.a, v.b, v.c].map((src, i) => (
              <div key={i} className="relative aspect-video overflow-hidden border border-white/10 bg-black">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase text-zinc-500">{"// faq"}</p>
            <h2 className="font-mono text-[22px] font-bold tracking-tight text-white md:text-[28px]">
              Briefing rápido
            </h2>
          </div>
          <FpsFaqList items={config.faq} accent={accent} ui={ui} />
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div
            className="flex flex-col items-start gap-4 border border-white/10 bg-black/40 p-6 md:flex-row md:items-center md:justify-between md:p-8"
            style={{ boxShadow: `inset 0 0 0 1px rgba(${rgb}, 0.15)` }}
          >
            <div className="flex items-start gap-4">
              <Radar className="h-7 w-7 shrink-0" style={{ color: accent }} />
              <div>
                <h3 className="font-mono text-[18px] font-bold text-white md:text-[22px]">
                  128-tick. Anticheat propio. Ping argentino.
                </h3>
                <p className="mt-1 font-mono text-[12px] uppercase text-zinc-400">
                  Soporte por discord · respuesta &lt; 10 min
                </p>
              </div>
            </div>
            <Link
              href="#demo-contacto"
              className="inline-flex shrink-0 items-center gap-2 border px-5 py-3 font-mono text-[12px] uppercase tracking-wide text-white transition-colors hover:bg-[rgba(var(--fps-accent-rgb),0.12)]"
              style={{ borderColor: accent }}
            >
              Iniciar deploy
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <div id="demo-contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.gameLabel}`}
          theme={v.lead}
          kicker="Deploy"
          title="Solicitá tu nodo"
          sub="Te respondemos con IP, panel y guía técnica en menos de 24 h."
        />
      </div>

      <footer className="border-t border-white/10 px-5 py-8 text-center md:px-8">
        <p className="font-mono text-[10px] uppercase text-zinc-600">
          © {new Date().getFullYear()} {config.brand} · Demo {config.gameLabel}. Marca no afiliada al editor del juego.
        </p>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function tickrateFor(slug: string): string {
  switch (slug) {
    case "cs2":
      return "128t";
    case "rust":
      return "60Hz";
    case "fivem":
      return "OneSync∞";
    case "palworld":
      return "30Hz";
    default:
      return "60Hz";
  }
}

function maxSlots(config: { plans: readonly { slots: string }[] }): string {
  const top = config.plans[config.plans.length - 1]?.slots ?? "—";
  return top;
}

function featureIcon(i: number) {
  const icons = [Shield, Cpu, HardDrive, Users, Activity, Signal];
  return icons[i % icons.length] ?? Shield;
}

function liveNodesFor(config: {
  locations: readonly string[];
  pingMs: string;
  onlinePlayers: string;
}) {
  const baseLocations = config.locations.slice(0, 4);
  return baseLocations.map((loc, i) => {
    const offset = (i + 1) * 4;
    return {
      name: `node-${loc.toLowerCase().replace(/\s+/g, "-")}`,
      ping: `${parseInt(config.pingMs) + offset} ms`,
      players: `${Math.max(120, parseInt(config.onlinePlayers.replace(/\D/g, "")) >> (i + 1))} pl.`,
      status: i === 1 ? "stable" : "online",
    };
  });
}

function scheduleFor(slug: string) {
  if (slug === "rust") {
    return [
      { code: "wipe", when: "jue 18:00", what: "Wipe semanal · BP wipe quincenal" },
      { code: "raid", when: "sáb 21:00", what: "Raid event · loot mejorado" },
      { code: "maint", when: "dom 06:00", what: "Mantenimiento · 10 min" },
    ];
  }
  if (slug === "cs2") {
    return [
      { code: "scrim", when: "mar 22:00", what: "Scrim privado · 5v5" },
      { code: "cup", when: "vie 21:00", what: "Cup interno · BO1" },
      { code: "maint", when: "dom 06:00", what: "Map rotation update" },
    ];
  }
  if (slug === "fivem") {
    return [
      { code: "rp", when: "todos los días 19:00", what: "RP serio · whitelist activa" },
      { code: "econ", when: "dom 20:00", what: "Reset económico semanal" },
      { code: "maint", when: "lun 05:00", what: "Restart programado" },
    ];
  }
  return [
    { code: "evt", when: "sáb 21:00", what: "Evento comunidad · XP boost" },
    { code: "wipe", when: "1ro de mes", what: "Save fresco opcional" },
    { code: "maint", when: "dom 06:00", what: "Mantenimiento · 5 min" },
  ];
}

function FpsFaqList({
  items,
  accent,
  ui,
}: {
  items: readonly { q: string; a: string }[];
  accent: string;
  ui: ReturnType<typeof useMotionTransition>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="border border-white/10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
              <span className="font-mono text-[12px] uppercase tracking-wide text-white">{item.q}</span>
              <span aria-hidden className="font-mono text-[14px]" style={{ color: accent }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={ui}
              className="overflow-hidden"
            >
              <p className="border-t border-white/10 px-4 py-3 text-[13px] leading-relaxed text-zinc-400">
                {item.a}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
