/**
 * Bloques de contenido reutilizables para landings demo (texto denso, FAQ, etc.).
 * Cada demo pasa `sectionHeadingClass` (p. ej. DEMO_HEADING_CLASS[slug]) para que
 * los h2 no dependan de Bebas/Playfair compartidos.
 */

export function DemoStatsStrip({
  eyebrow,
  stats,
  sectionClass = "border-y border-white/5 bg-zinc-900/40",
  cardClass = "rounded-2xl border border-white/10 bg-zinc-950/80 p-6",
  valueClass = "text-3xl font-black text-white",
  labelClass = "mt-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500",
  hintClass = "mt-1 text-xs text-zinc-600",
}: {
  eyebrow?: string;
  stats: { value: string; label: string; hint?: string }[];
  sectionClass?: string;
  cardClass?: string;
  valueClass?: string;
  labelClass?: string;
  hintClass?: string;
}) {
  return (
    <section className={`px-4 py-14 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-5xl">
        {eyebrow ? (
          <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.35em] opacity-80 md:text-left">
            {eyebrow}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={cardClass}>
              <p className={valueClass}>{s.value}</p>
              <p className={labelClass}>{s.label}</p>
              {s.hint ? <p className={hintClass}>{s.hint}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoProcessSteps({
  title,
  subtitle,
  steps,
  sectionHeadingClass,
  sectionClass = "bg-zinc-950/50",
  titleClass = "text-white",
  subtitleClass = "text-zinc-500",
  stepNumClass = "text-zinc-500",
  cardClass = "rounded-2xl border border-white/10 bg-zinc-900/40 p-6",
  stepTitleClass = "font-bold text-white",
  stepDescClass = "mt-2 text-sm leading-relaxed text-zinc-500",
}: {
  title: string;
  subtitle?: string;
  steps: { n: string; t: string; d: string }[];
  /** Familia display del rubro (p. ej. DEMO_HEADING_CLASS[slug]). */
  sectionHeadingClass: string;
  sectionClass?: string;
  titleClass?: string;
  subtitleClass?: string;
  stepNumClass?: string;
  cardClass?: string;
  stepTitleClass?: string;
  stepDescClass?: string;
}) {
  return (
    <section className={`px-4 py-16 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-5xl">
        <h2
          className={`text-4xl font-semibold uppercase tracking-wide md:text-5xl ${sectionHeadingClass} ${titleClass}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className={`mt-4 max-w-2xl text-sm leading-relaxed md:text-base ${subtitleClass}`}>
            {subtitle}
          </p>
        ) : null}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className={cardClass}>
              <span className={`text-xs font-bold tabular-nums ${stepNumClass}`}>
                {s.n}
              </span>
              <h3 className={`mt-2 ${stepTitleClass}`}>{s.t}</h3>
              <p className={stepDescClass}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoDetailGrid({
  title,
  items,
  sectionHeadingClass,
  sectionClass = "",
  titleClass = "text-white",
  cardClass = "rounded-2xl border border-white/10 bg-zinc-900/30 p-6",
  itemTitleClass = "font-bold text-white",
  itemBodyClass = "mt-2 text-sm leading-relaxed text-zinc-500",
}: {
  title: string;
  items: { title: string; body: string }[];
  sectionHeadingClass: string;
  sectionClass?: string;
  titleClass?: string;
  cardClass?: string;
  itemTitleClass?: string;
  itemBodyClass?: string;
}) {
  return (
    <section className={`px-4 py-16 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-5xl">
        <h2
          className={`text-4xl font-semibold uppercase tracking-wide md:text-5xl ${sectionHeadingClass} ${titleClass}`}
        >
          {title}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className={cardClass}>
              <h3 className={itemTitleClass}>{it.title}</h3>
              <p className={itemBodyClass}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoFaqList({
  title,
  items,
  sectionHeadingClass,
  sectionClass = "border-t border-white/5 bg-black/20",
  titleClass = "text-white",
  qClass = "font-bold text-white",
  aClass = "mt-2 text-sm leading-relaxed text-zinc-500",
  rowClass = "border-b border-white/5 py-6 last:border-0",
}: {
  title: string;
  items: { q: string; a: string }[];
  sectionHeadingClass: string;
  sectionClass?: string;
  titleClass?: string;
  qClass?: string;
  aClass?: string;
  rowClass?: string;
}) {
  return (
    <section className={`px-4 py-16 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-3xl">
        <h2
          className={`text-4xl font-semibold uppercase tracking-wide ${sectionHeadingClass} ${titleClass}`}
        >
          {title}
        </h2>
        <div className="mt-8">
          {items.map((it) => (
            <div key={it.q} className={rowClass}>
              <p className={qClass}>{it.q}</p>
              <p className={aClass}>{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoTestimonials({
  title,
  quotes,
  sectionHeadingClass,
  sectionClass = "bg-zinc-900/25",
  titleClass = "text-white",
  cardClass = "rounded-2xl border border-white/10 bg-zinc-950/60 p-6",
  quoteClass = "text-sm italic leading-relaxed text-zinc-300",
  authorClass = "mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500",
}: {
  title: string;
  quotes: { text: string; author: string; role: string }[];
  sectionHeadingClass: string;
  sectionClass?: string;
  titleClass?: string;
  cardClass?: string;
  quoteClass?: string;
  authorClass?: string;
}) {
  return (
    <section className={`px-4 py-16 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-5xl">
        <h2 className={`text-3xl font-semibold leading-tight md:text-4xl ${sectionHeadingClass} ${titleClass}`}>
          {title}
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <blockquote key={q.author} className={cardClass}>
              <p className={quoteClass}>“{q.text}”</p>
              <footer className={authorClass}>
                {q.author} · {q.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoLongStory({
  kicker,
  title,
  paragraphs,
  sectionHeadingClass,
  sectionClass = "",
  kickerClass = "text-orange-400",
  titleClass = "text-white",
  pClass = "mt-4 text-sm leading-relaxed text-zinc-400 md:text-base",
}: {
  kicker?: string;
  title: string;
  paragraphs: string[];
  sectionHeadingClass: string;
  sectionClass?: string;
  kickerClass?: string;
  titleClass?: string;
  pClass?: string;
}) {
  return (
    <section className={`px-4 py-16 md:px-10 ${sectionClass}`}>
      <div className="mx-auto max-w-3xl">
        {kicker ? (
          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${kickerClass}`}>
            {kicker}
          </p>
        ) : null}
        <h2
          className={`mt-4 text-3xl font-semibold leading-tight md:text-4xl ${sectionHeadingClass} ${titleClass}`}
        >
          {title}
        </h2>
        {paragraphs.map((p, i) => (
          <p key={i} className={pClass}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
