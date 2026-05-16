import {
  Drill,
  HardHat,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

export function DemoFerreteriaLanding() {
  return (
    <div className="min-h-screen bg-zinc-950 font-[family-name:var(--font-demo-montserrat)] text-zinc-100">
      <nav className="flex items-center justify-between border-b border-orange-500/20 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-2xl tracking-wide text-orange-500">
          FDO
        </span>
        <div className="hidden gap-8 text-xs font-bold uppercase tracking-widest text-zinc-500 md:flex">
          <span className="cursor-default hover:text-orange-400">Catálogo</span>
          <span className="cursor-default hover:text-orange-400">Marcas</span>
          <span className="cursor-default hover:text-orange-400">Mayoristas</span>
        </div>
        <button
          type="button"
          className="rounded-full bg-orange-600 px-5 py-2 text-xs font-bold uppercase text-white"
        >
          Pedido express
        </button>
      </nav>

      <header className="relative overflow-hidden px-4 pb-20 pt-16 md:px-10 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-600/25 via-transparent to-transparent" />
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-orange-500/10 md:block" />
        <div className="relative mx-auto max-w-4xl">
          <p className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">
            <HardHat className="h-4 w-4" /> Stock en tiempo real · GBA Sur
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-5xl uppercase leading-none tracking-wide text-white md:text-8xl">
            La ferretería
            <br />
            <span className="text-orange-500">que te manda el camión</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Herramientas eléctricas, bulonería, pinturas y electricidad. Retiro
            en local o envío el mismo día en zona. Precio lista y factura A.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-xl bg-orange-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/30"
            >
              Ver stock destacado
            </button>
            <button
              type="button"
              className="rounded-xl border border-zinc-700 px-8 py-4 text-sm font-bold text-zinc-300"
            >
              Lista mayorista PDF
            </button>
          </div>
        </div>
      </header>

      <section className="border-y border-white/5 bg-zinc-900/50 px-4 py-16 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              icon: Truck,
              t: "Envíos",
              d: "Camioneta propia. Pedidos antes de 14 h salen hoy.",
            },
            { icon: ShieldCheck, t: "Garantía", d: "Productos con soporte de fábrica y cambios 15 días." },
            { icon: Package, t: "Pickup", d: "Retirá sin fila. Te lo dejamos armado en mostrador." },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6"
            >
              <I className="h-8 w-8 text-orange-500" />
              <h3 className="mt-4 font-bold text-white">{t}</h3>
              <p className="mt-2 text-sm text-zinc-500">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 md:px-10">
        <h2 className="font-[family-name:var(--font-demo-bebas)] text-4xl uppercase text-white md:text-5xl">
          Rubros
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Wrench, label: "Herramientas" },
            { icon: Drill, label: "Electricidad" },
            { icon: Package, label: "Bulonería" },
            { icon: HardHat, label: "Seguridad" },
          ].map(({ icon: I, label }) => (
            <div
              key={label}
              className="group cursor-default rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition-colors hover:border-orange-500/40"
            >
              <I className="h-6 w-6 text-orange-500 transition-transform group-hover:scale-110" />
              <p className="mt-4 text-sm font-bold text-white">{label}</p>
              <p className="mt-1 text-xs text-zinc-600">+200 SKU demo</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-600 to-orange-800 px-4 py-16 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-orange-100/90">
              Consultas técnicas
            </p>
            <p className="mt-2 font-[family-name:var(--font-demo-bebas)] text-4xl uppercase text-white">
              ¿Necesitás cantidad?
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold text-white"
          >
            <Phone className="h-4 w-4" />
            Llamar ahora
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-xs text-zinc-600 md:px-10">
        Demo visual · MadsJeez Design · Contenido ficticio
      </footer>
    </div>
  );
}

export { DemoFerreteriaLanding as DemoFerreteria };
