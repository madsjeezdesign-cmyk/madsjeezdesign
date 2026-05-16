import { Car, Cog, Gauge, Wrench } from "lucide-react";

export function DemoTallerLanding() {
  return (
    <div className="min-h-screen bg-zinc-900 font-[family-name:var(--font-demo-montserrat)] text-zinc-100">
      <div
        className="h-2 w-full bg-[repeating-linear-gradient(-45deg,#dc2626_0px,#dc2626_12px,#18181b_12px,#18181b_24px)]"
        aria-hidden
      />

      <nav className="flex items-center justify-between px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-3xl tracking-wide text-red-500">
          GARAGE 27
        </span>
        <button
          type="button"
          className="border-2 border-red-600 bg-red-600/10 px-5 py-2 text-xs font-black uppercase text-red-500"
        >
          Pedir turno
        </button>
      </nav>

      <header className="border-b border-zinc-800 px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Multimarca · scanner OBD
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase leading-none text-white md:text-7xl">
              Mecánica
              <br />
              <span className="text-red-500">sin vueltas</span>
            </h1>
            <p className="mt-6 text-sm text-zinc-500">
              Frenos, tren delantero, service con aceites viscosidad OEM y
              alineación digital. Presupuesto antes de tocar un tornillo.
            </p>
          </div>
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
            <Gauge className="h-40 w-full text-red-600/20" strokeWidth={0.25} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-xl border border-red-600/40 bg-black/80 px-6 py-4 text-center">
                <p className="text-3xl font-black text-red-500">15%</p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Off primer service demo
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { icon: Wrench, t: "Mecánica general", d: "Embrague, distribución" },
            { icon: Car, t: "Diagnóstico", d: "Scanner + informe PDF" },
            { icon: Cog, t: "Suspensión", d: "Amortiguadores y tren" },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-red-600/40"
            >
              <I className="h-7 w-7 text-red-500" />
              <p className="mt-4 font-bold text-white">{t}</p>
              <p className="mt-2 text-xs text-zinc-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-red-600 px-4 py-12 md:px-10">
        <p className="mx-auto max-w-3xl text-center font-[family-name:var(--font-demo-bebas)] text-3xl uppercase text-black md:text-4xl">
          “Lo dejamos listo para la ruta”
        </p>
      </section>

      <footer className="py-8 text-center text-xs text-zinc-700">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoTallerLanding as DemoTaller };
