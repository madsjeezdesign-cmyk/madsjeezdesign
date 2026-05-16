import { BookOpen, Briefcase, Scale, Shield } from "lucide-react";

export function DemoAbogadosLanding() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] font-[family-name:var(--font-demo-montserrat)] text-neutral-200">
      <nav className="flex items-center justify-between border-b border-amber-900/20 px-6 py-6 md:px-16">
        <div className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-amber-600" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700">
              Estudio jurídico
            </p>
            <p className="font-[family-name:var(--font-demo-playfair)] text-lg text-neutral-100">
              Bravo &amp; Asociados
            </p>
          </div>
        </div>
        <button
          type="button"
          className="border border-amber-700/60 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-amber-500"
        >
          Consulta inicial
        </button>
      </nav>

      <header className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-demo-playfair)] text-3xl font-semibold leading-snug text-white md:text-5xl">
            Defensa estratégica en{" "}
            <span className="text-amber-500">derecho civil</span>, laboral y
            empresarial
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-neutral-500">
            Equipo interdisciplinario con más de quince años de actuación.
            Primera reunión de evaluación sin cargo — agenda coordinada por
            secretaría.
          </p>
        </div>
      </header>

      <section className="border-y border-neutral-900 bg-neutral-950 px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            {
              icon: Briefcase,
              t: "Empresas",
              d: "Contratos, due diligence y cumplimiento normativo.",
            },
            {
              icon: BookOpen,
              t: "Civil",
              d: "Sucesiones, daños y mediaciones prejudiciales.",
            },
            {
              icon: Shield,
              t: "Laboral",
              d: "Despidos, riesgos y negociaciones colectivas.",
            },
            {
              icon: Scale,
              t: "Litigios",
              d: "Estrategia procesal y seguimiento online del expediente.",
            },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="flex gap-5 border-l-2 border-amber-700/40 pl-5"
            >
              <I className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <h3 className="font-[family-name:var(--font-demo-playfair)] text-xl text-white">
                  {t}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 text-center md:px-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-700">
          Confidencialidad
        </p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-500">
          Toda comunicación queda sujeta a secreto profesional. Entorno seguro
          para adjuntar documentación.
        </p>
        <button
          type="button"
          className="mt-8 border border-amber-600 bg-amber-950/30 px-10 py-4 text-xs font-bold uppercase tracking-widest text-amber-500"
        >
          Solicitar llamado
        </button>
      </section>

      <footer className="border-t border-neutral-900 py-8 text-center text-xs text-neutral-700">
        Demo visual · MadsJeez Design · Contenido ficticio
      </footer>
    </div>
  );
}

export { DemoAbogadosLanding as DemoAbogados };
