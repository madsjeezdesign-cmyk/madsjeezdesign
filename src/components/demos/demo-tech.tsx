import { Box, Cpu, Lock, Rocket, Sparkles } from "lucide-react";

export function DemoTechLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-slate-200">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-10">
        <span className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-sm font-bold text-white">
          <Cpu className="h-5 w-5 text-violet-400" />
          NexoLab
        </span>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-slate-500 md:inline">Docs</span>
          <button
            type="button"
            className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-950"
          >
            Empezar trial
          </button>
        </div>
      </nav>

      <header className="relative z-10 mx-auto max-w-4xl px-5 pt-12 text-center md:pt-20">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-300">
          <Sparkles className="h-3 w-3" /> Nuevo · API v2
        </div>
        <h1 className="mt-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text font-[family-name:var(--font-demo-montserrat)] text-4xl font-extrabold leading-tight text-transparent md:text-6xl md:leading-tight">
          Orquestá integraciones sin escribir boilerplate
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-sm text-slate-400">
          Conectores listos, webhooks firmados y panel para tu equipo de soporte.
          SLA 99,9% en plan Business — demo con datos sintéticos.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/30"
          >
            Crear cuenta gratis
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-8 py-3.5 text-sm font-bold text-slate-300 backdrop-blur"
          >
            Ver documentación
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto mt-20 max-w-5xl px-5">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Box,
              t: "SDK TypeScript",
              d: "Types generados, retries y ejemplos copy-paste.",
            },
            {
              icon: Lock,
              t: "Compliance",
              d: "Logs encriptados y roles por workspace.",
            },
            {
              icon: Rocket,
              t: "Edge ready",
              d: "Deploy en multi-región con un click.",
            },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md"
            >
              <I className="h-6 w-6 text-cyan-400" />
              <p className="mt-4 font-bold text-white">{t}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-black/60 p-6 font-[family-name:var(--font-jetbrains)] text-left text-xs text-violet-300/90 backdrop-blur">
          <p className="text-slate-500">$ nexolab init --project demo</p>
          <p className="mt-1 text-emerald-400">✓ Connected · 3 environments</p>
          <p className="mt-1 text-slate-400">→ Dashboard: https://app.nexolab.demo</p>
        </div>
      </section>

      <footer className="relative z-10 mt-20 py-10 text-center text-xs text-slate-600">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoTechLanding as DemoTech };
