import { Building2, KeyRound, Landmark, MapPin } from "lucide-react";

export function DemoInmobiliariaLanding() {
  return (
    <div className="min-h-screen bg-slate-950 font-[family-name:var(--font-demo-montserrat)] text-slate-100">
      <nav className="flex items-center justify-between border-b border-amber-900/30 px-6 py-5 md:px-14">
        <div className="flex items-center gap-3">
          <Landmark className="h-7 w-7 text-amber-500" />
          <span className="text-sm font-light tracking-[0.3em] uppercase text-amber-100/90">
            Horizonte
          </span>
        </div>
        <button
          type="button"
          className="border border-amber-600/50 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-amber-200"
        >
          Tasación
        </button>
      </nav>

      <header className="relative px-6 pb-20 pt-12 md:px-14 md:pt-20">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-600">
          Propiedades premium
        </p>
        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-demo-playfair)] text-4xl font-medium leading-tight text-white md:text-6xl">
          Espacios que marcan{" "}
          <span className="text-amber-400">distinción</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
          Portfolio curado en zona norte y proyectos llave en mano. Acompañamiento
          legal y financiero con socios de confianza.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "En venta", n: "24", icon: Building2 },
            { label: "En alquiler", n: "11", icon: KeyRound },
            { label: "USD / ARS", n: "Flexible", icon: MapPin },
          ].map(({ label, n, icon: I }) => (
            <div
              key={label}
              className="border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-amber-700/30"
            >
              <I className="h-5 w-5 text-amber-600" />
              <p className="mt-3 text-2xl font-light text-white">{n}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </header>

      <section className="grid md:grid-cols-2">
        <div className="flex min-h-[360px] flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-800 p-8 md:p-12">
          <p className="text-xs text-amber-600">Destacado demo</p>
          <h2 className="mt-2 font-[family-name:var(--font-demo-playfair)] text-3xl text-white">
            Penthouse con terraza · 320 m²
          </h2>
          <p className="mt-2 text-sm text-slate-500">Cocheras · sum · norte libre</p>
        </div>
        <div className="border-t border-slate-800 p-8 md:border-l md:border-t-0 md:p-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-600">
            Por qué elegirnos
          </h3>
          <ul className="mt-8 space-y-6 text-sm text-slate-400">
            <li className="border-l border-amber-600/50 pl-4">
              Fotografía profesional y tour 360° en cada publicación.
            </li>
            <li className="border-l border-amber-600/50 pl-4">
              Ficha técnica con escritura y consorcio verificados.
            </li>
            <li className="border-l border-amber-600/50 pl-4">
              Newsletter mensual solo para inversores calificados.
            </li>
          </ul>
          <button
            type="button"
            className="mt-10 w-full bg-amber-600 py-4 text-sm font-bold uppercase tracking-wider text-slate-950"
          >
            Agendar visita privada
          </button>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-slate-600">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoInmobiliariaLanding as DemoInmobiliaria };
