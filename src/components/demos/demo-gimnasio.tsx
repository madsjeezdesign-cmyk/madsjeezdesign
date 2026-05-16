import { Dumbbell, Flame, Trophy, Zap } from "lucide-react";

export function DemoGimnasioLanding() {
  return (
    <div className="min-h-screen bg-black font-[family-name:var(--font-demo-montserrat)] text-lime-50">
      <nav className="flex items-center justify-between border-b border-lime-500/20 px-4 py-4 md:px-10">
        <span className="font-[family-name:var(--font-demo-bebas)] text-3xl tracking-wider text-lime-400">
          PULSE
        </span>
        <button
          type="button"
          className="bg-lime-400 px-6 py-2 text-xs font-black uppercase tracking-wider text-black"
        >
          Prueba gratis
        </button>
      </nav>

      <header className="relative px-4 py-16 md:px-10 md:py-24">
        <div className="pointer-events-none absolute left-4 top-20 h-64 w-64 skew-x-12 border-4 border-lime-500/20 md:block" />
        <div className="relative mx-auto max-w-4xl">
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.4em] text-lime-500">
            Cross · Hyrox · Funcional
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-demo-bebas)] text-6xl uppercase leading-[0.9] tracking-wide text-white md:text-9xl">
            Rompé
            <br />
            tu récord
          </h1>
          <p className="mt-8 max-w-md text-sm font-medium text-zinc-500">
            Clases 05:30 a 22:00. Coaches certificados. App para reservar WOD y
            ver tu progreso de levantamiento.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:max-w-lg">
            {[
              { n: "24", l: "clases / semana" },
              { n: "400m²", l: "sala + peso" },
              { n: "12", l: "máquinas cardio" },
            ].map((s) => (
              <div key={s.l} className="border border-lime-500/30 bg-lime-500/5 p-4">
                <p className="font-[family-name:var(--font-demo-bebas)] text-2xl text-lime-400">
                  {s.n}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-zinc-950 px-4 py-16 md:px-10">
        <h2 className="font-[family-name:var(--font-demo-bebas)] text-4xl uppercase text-white md:text-5xl">
          Planes demo
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Drop-in",
              price: "$ —",
              feats: ["1 clase", "Locker", "Toalla"],
            },
            {
              name: "Full",
              price: "$$ —",
              feats: ["Ilimitado", "Open gym", "Programa 8 semanas"],
              hot: true,
            },
            {
              name: "Pareja",
              price: "$$ —",
              feats: ["2 membresías", "Nutrición off", "20% shop"],
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative border p-6 ${
                p.hot
                  ? "border-lime-400 bg-lime-400/10"
                  : "border-zinc-800 bg-black"
              }`}
            >
              {p.hot && (
                <span className="absolute -top-2 right-4 bg-lime-400 px-2 py-0.5 text-[10px] font-black text-black">
                  POPULAR
                </span>
              )}
              <Dumbbell className="h-6 w-6 text-lime-400" />
              <p className="mt-4 font-[family-name:var(--font-demo-bebas)] text-2xl uppercase">
                {p.name}
              </p>
              <p className="mt-2 text-2xl font-black text-lime-400">{p.price}</p>
              <ul className="mt-4 space-y-2">
                {p.feats.map((f) => (
                  <li key={f} className="text-xs text-zinc-400">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center gap-4 border-t border-lime-500/20 px-4 py-14 md:gap-10">
        <Flame className="h-8 w-8 text-orange-500" />
        <Zap className="h-8 w-8 text-lime-400" />
        <Trophy className="h-8 w-8 text-amber-400" />
      </section>

      <footer className="py-8 text-center text-xs text-zinc-700">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoGimnasioLanding as DemoGimnasio };
