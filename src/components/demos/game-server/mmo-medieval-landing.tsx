"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Crown, Scroll, ShieldCheck, Swords } from "lucide-react";
import { getGameServerConfig } from "@/lib/game-server-demos";
import { getDemoVisuals } from "@/lib/demo-assets";
import { useMotionTransition } from "@/lib/motion";
import { DemoLeadForm } from "../demo-lead-form";

type Props = { slug: string };

/**
 * MMO / Medieval archetype landing — ornamental parchment identity for
 * MU Online / Lineage 2 / ARK style MMO server demos.
 *
 * Visual identity:
 * - Parchment-cream base (oxblood + gold accents), warm deep tones
 * - Editorial serif heading (font-serif), single-column scroll
 * - Hairline gold borders and illuminated-manuscript plan boxes (1 per row)
 * - Lore-style copy block + wipe schedule prominently displayed
 * - Solemn fade-up, slow scroll-into-view (display speed)
 */
export function MmoMedievalLanding({ slug }: Props) {
  const config = getGameServerConfig(slug);
  const v = config ? getDemoVisuals(slug) : null;
  const ui = useMotionTransition("ui", "ui");
  const display = useMotionTransition("display", "display");

  if (!config || !v) return null;

  const accent = config.accent;
  const gold = "#c8a456";
  const oxblood = "#3a1517";
  const parchment = "#f3ead3";

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-[family-name:var(--font-demo-b-gameserver)] antialiased"
      style={{
        background: parchment,
        color: oxblood,
        ["--mmo-accent" as string]: accent,
        ["--mmo-gold" as string]: gold,
        ["--mmo-oxblood" as string]: oxblood,
      } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 18%, rgba(200,164,86,0.10), transparent 55%), radial-gradient(circle at 80% 70%, rgba(58,21,23,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(rgba(58,21,23,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <header className="relative z-20 border-b border-[color:var(--mmo-gold)]/40">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--mmo-gold)]"
              style={{ background: "rgba(255,255,255,0.4)" }}
            >
              <Crown className="h-4 w-4" style={{ color: oxblood }} />
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[16px] font-semibold tracking-tight">{config.brand}</p>
              <p className="text-[11px] italic" style={{ color: "rgba(58,21,23,0.6)" }}>
                {config.gameLabel}
              </p>
            </div>
          </div>
          <nav
            className="hidden items-center gap-7 text-[12px] italic md:flex"
            style={{ color: "rgba(58,21,23,0.7)" }}
          >
            <a href="#prologo" className="hover:text-[color:var(--mmo-oxblood)]">prólogo</a>
            <a href="#planes" className="hover:text-[color:var(--mmo-oxblood)]">reinos</a>
            <a href="#wipe" className="hover:text-[color:var(--mmo-oxblood)]">calendario</a>
            <a href="#faq" className="hover:text-[color:var(--mmo-oxblood)]">consultas</a>
          </nav>
          <a
            href="#demo-contacto"
            className="border border-[color:var(--mmo-oxblood)] px-4 py-2 font-serif text-[12px] tracking-wide transition-colors hover:bg-[color:var(--mmo-oxblood)] hover:text-[color:var(--mmo-parchment)]"
            style={{ color: oxblood }}
          >
            Solicitar siege
          </a>
        </div>
      </header>

      <section id="prologo" className="relative">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={display}
            className="inline-flex items-center gap-3 text-[11px] italic"
            style={{ color: "rgba(58,21,23,0.75)" }}
          >
            <span className="h-px w-8" style={{ background: gold }} />
            {config.heroKicker}
            <span className="h-px w-8" style={{ background: gold }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...display, delay: 0.08 }}
            className="mt-6 font-serif text-[44px] font-medium leading-[1.05] tracking-tight md:text-[64px] lg:text-[72px]"
          >
            {config.heroTitle}
            <br />
            <em
              className="not-italic"
              style={{
                color: oxblood,
                background: `linear-gradient(180deg, transparent 65%, ${gold}55 65%, ${gold}55 90%, transparent 90%)`,
              }}
            >
              {config.heroHighlight}
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...display, delay: 0.16 }}
            className="mx-auto mt-8 max-w-xl text-[16px] leading-[1.65] md:text-[17px]"
            style={{ color: "rgba(58,21,23,0.78)" }}
          >
            {config.heroSub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...display, delay: 0.24 }}
            className="mt-6 font-serif text-[14px] italic"
            style={{ color: gold }}
          >
            Reino abierto. Sin reset.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...display, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#planes"
              className="border border-[color:var(--mmo-oxblood)] bg-[color:var(--mmo-oxblood)] px-6 py-3 font-serif text-[13px] tracking-wide transition-opacity hover:opacity-90"
              style={{ color: parchment }}
            >
              Ver reinos
            </a>
            <a
              href="#wipe"
              className="border border-[color:var(--mmo-oxblood)]/60 px-6 py-3 font-serif text-[13px] tracking-wide transition-colors hover:bg-[color:var(--mmo-oxblood)]/5"
              style={{ color: oxblood }}
            >
              Calendario de eventos
            </a>
          </motion.div>

          <div className="mt-14 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-20" style={{ background: gold }} />
            <Swords className="h-4 w-4 rotate-90" style={{ color: gold }} />
            <span className="h-px w-20" style={{ background: gold }} />
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={display}
            className="relative aspect-[16/10] overflow-hidden border border-[color:var(--mmo-gold)]/60"
            style={{ boxShadow: "0 1px 0 0 #fff8 inset, 0 30px 60px -30px rgba(58,21,23,0.25)" }}
          >
            <Image
              src={v.cover}
              alt={config.gameLabel}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(58,21,23,0.08), rgba(58,21,23,0.35))",
              }}
            />
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 border border-[color:var(--mmo-gold)]/50 px-4 py-3 backdrop-blur-sm md:bottom-6 md:left-6 md:right-6 md:px-5"
              style={{ background: "rgba(243,234,211,0.85)" }}
            >
              <div className="flex items-center gap-3">
                <Scroll className="h-4 w-4" style={{ color: oxblood }} />
                <p className="font-serif text-[13px]" style={{ color: oxblood }}>
                  {config.industryLabel}
                </p>
              </div>
              <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
                {config.onlinePlayers} héroes en campo
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-2xl px-5 pb-16 text-center md:px-8 md:pb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={display}
            className="font-serif text-[17px] leading-[1.7] md:text-[19px]"
            style={{ color: "rgba(58,21,23,0.82)" }}
          >
            En cada reino abierto se cuenta lo mismo: la primera noche define la siege.
            Acá no hay shortcut. Hay infra que no se cae, drops que no se duplican y un staff
            que conoce la chronicle desde el primer cliente. El resto, lo escribís vos.
          </motion.p>
        </div>
      </section>

      <section id="wipe" className="relative border-y border-[color:var(--mmo-gold)]/40 py-12 md:py-14">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
                calendario del reino
              </p>
              <h2 className="font-serif text-[26px] leading-tight md:text-[32px]">Sieges y eventos</h2>
            </div>
            <p className="hidden font-serif text-[12px] italic md:block" style={{ color: gold }}>
              GMT-3 · hora local
            </p>
          </div>
          <ol className="grid gap-2 md:gap-3">
            {[
              { when: "Mié 21:00", what: "Castle Siege · semanal", note: "Recompensas dobles para clanes" },
              { when: "Sáb 22:00", what: "Olympiad / PvP open", note: "Spectator mode habilitado" },
              { when: "Dom 18:00", what: "Boss raid serverwide", note: "Drop mejorado" },
            ].map((row, i) => (
              <motion.li
                key={row.when}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...ui, delay: i * 0.05 }}
                className="flex items-center justify-between gap-4 border border-[color:var(--mmo-gold)]/30 px-4 py-3 md:px-5"
                style={{ background: "rgba(255,255,255,0.5)" }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[13px] font-semibold" style={{ color: oxblood }}>
                    {row.when}
                  </span>
                  <span className="font-serif text-[14px]" style={{ color: oxblood }}>
                    {row.what}
                  </span>
                </div>
                <span
                  className="hidden font-serif text-[12px] italic md:block"
                  style={{ color: "rgba(58,21,23,0.65)" }}
                >
                  {row.note}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="planes" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-10 text-center">
            <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
              reinos disponibles
            </p>
            <h2 className="mt-1 font-serif text-[30px] leading-tight md:text-[40px]">Elegí tu casa</h2>
          </div>
          <div className="space-y-7">
            {config.plans.map((plan, idx) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...display, delay: idx * 0.05 }}
                className="relative grid gap-6 border border-[color:var(--mmo-gold)]/55 px-6 py-7 md:grid-cols-[1.05fr_auto] md:px-9 md:py-9"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  boxShadow: plan.popular
                    ? "0 0 0 1px rgba(200,164,86,0.4), 0 22px 50px -32px rgba(58,21,23,0.35)"
                    : "0 14px 30px -22px rgba(58,21,23,0.25)",
                }}
              >
                {plan.popular ? (
                  <span
                    className="absolute -top-3 left-6 border border-[color:var(--mmo-gold)] px-3 py-0.5 font-serif text-[10px] tracking-widest"
                    style={{ background: parchment, color: oxblood }}
                  >
                    Casa preferida
                  </span>
                ) : null}
                <div>
                  <div className="flex items-center gap-3">
                    <Crown className="h-4 w-4" style={{ color: gold }} />
                    <h3
                      className="font-serif text-[22px] leading-tight md:text-[26px]"
                      style={{ color: oxblood }}
                    >
                      Casa {plan.name}
                    </h3>
                  </div>
                  <p
                    className="mt-3 font-serif text-[14px] leading-relaxed md:text-[15px]"
                    style={{ color: "rgba(58,21,23,0.78)" }}
                  >
                    {`Recursos: ${plan.ram} de RAM dedicada, hasta ${plan.slots} héroes simultáneos y ${plan.storage} para tu chronicle.`}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2 font-serif text-[12px] italic"
                    style={{ color: "rgba(58,21,23,0.7)" }}
                  >
                    <li className="border border-[color:var(--mmo-gold)]/40 px-3 py-1">geodata</li>
                    <li className="border border-[color:var(--mmo-gold)]/40 px-3 py-1">backup horario</li>
                    <li className="border border-[color:var(--mmo-gold)]/40 px-3 py-1">staff es/en</li>
                  </ul>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end md:justify-between">
                  <div>
                    <p
                      className="font-serif text-[12px] italic"
                      style={{ color: "rgba(58,21,23,0.6)" }}
                    >
                      tributo mensual
                    </p>
                    <p
                      className="font-serif text-[30px] leading-tight md:text-[36px]"
                      style={{ color: oxblood }}
                    >
                      {plan.price}
                    </p>
                  </div>
                  <a
                    href="#demo-contacto"
                    className="inline-flex items-center justify-center border border-[color:var(--mmo-oxblood)] bg-[color:var(--mmo-oxblood)] px-5 py-2.5 font-serif text-[12px] tracking-wide transition-opacity hover:opacity-90"
                    style={{ color: parchment }}
                  >
                    Solicitar casa
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative border-y border-[color:var(--mmo-gold)]/40 py-16 md:py-20"
        style={{ background: "rgba(255,255,255,0.4)" }}
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8 text-center">
            <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
              defensas del reino
            </p>
            <h2 className="mt-1 font-serif text-[28px] leading-tight md:text-[36px]">
              Infraestructura forjada
            </h2>
          </div>
          <ul className="grid gap-2 md:gap-3">
            {config.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...ui, delay: i * 0.04 }}
                className="flex items-center gap-4 border-b border-[color:var(--mmo-gold)]/30 py-3 font-serif text-[15px] md:text-[16px]"
                style={{ color: oxblood }}
              >
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: gold }} />
                {f}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-8 text-center">
            <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
              chronicles disponibles
            </p>
            <h2 className="mt-1 font-serif text-[28px] leading-tight md:text-[36px]">
              Tu versión, tu historia
            </h2>
          </div>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {config.mods.map((mod) => (
              <li
                key={mod}
                className="border border-[color:var(--mmo-gold)]/50 px-4 py-1.5 font-serif text-[13px] tracking-wide"
                style={{ background: "rgba(255,255,255,0.55)", color: oxblood }}
              >
                {mod}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="relative border-t border-[color:var(--mmo-gold)]/40 py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <div className="mb-8 text-center">
            <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.7)" }}>
              consultas
            </p>
            <h2 className="mt-1 font-serif text-[28px] leading-tight md:text-[36px]">
              Antes de abrir el reino
            </h2>
          </div>
          <MmoFaqList
            items={config.faq}
            ui={ui}
            oxblood={oxblood}
            gold={gold}
            parchment={parchment}
          />
        </div>
      </section>

      <section className="relative pb-16 pt-4 md:pb-20">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Link
            href="#demo-contacto"
            className="inline-flex items-center gap-3 border border-[color:var(--mmo-oxblood)] bg-[color:var(--mmo-oxblood)] px-7 py-3.5 font-serif text-[14px] tracking-wide transition-opacity hover:opacity-90"
            style={{ color: parchment }}
          >
            <Swords className="h-4 w-4" />
            Abrir mi reino
          </Link>
        </div>
      </section>

      <div id="demo-contacto">
        <DemoLeadForm
          slug={slug}
          brandLabel={`${config.brand} · ${config.gameLabel}`}
          theme={v.lead}
          kicker="Alta de reino"
          title="Decinos cómo lo querés"
          sub="Respondemos con IP, panel, chronicle y guía de migración en menos de 24 h."
        />
      </div>

      <footer className="border-t border-[color:var(--mmo-gold)]/40 px-5 py-8 text-center md:px-8">
        <p className="font-serif text-[12px] italic" style={{ color: "rgba(58,21,23,0.6)" }}>
          © {new Date().getFullYear()} · {config.brand} · Demo {config.gameLabel}. No oficial.
        </p>
      </footer>
    </div>
  );
}

function MmoFaqList({
  items,
  ui,
  oxblood,
  gold,
  parchment,
}: {
  items: readonly { q: string; a: string }[];
  ui: ReturnType<typeof useMotionTransition>;
  oxblood: string;
  gold: string;
  parchment: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-[color:var(--mmo-gold)]/35 border-y border-[color:var(--mmo-gold)]/35">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-[color:var(--mmo-gold)]/5"
            >
              <span
                className="font-serif text-[15px] leading-snug md:text-[16px]"
                style={{ color: oxblood }}
              >
                {item.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                style={{ color: gold }}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={ui}
                  className="overflow-hidden"
                >
                  <p
                    className="pb-5 font-serif text-[14px] italic leading-[1.7]"
                    style={{ color: "rgba(58,21,23,0.78)", background: parchment }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
