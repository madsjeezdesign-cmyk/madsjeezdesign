import { Heart, Leaf, Sparkles, Sun, Wind } from "lucide-react";

export function DemoEsteticaLanding() {
  return (
    <div className="min-h-screen bg-[#faf7f2] font-[family-name:var(--font-demo-montserrat)] text-stone-800">
      <nav className="flex items-center justify-between px-6 py-6 md:px-14">
        <span className="font-[family-name:var(--font-demo-playfair)] text-2xl tracking-tight text-stone-900">
          Aura<span className="text-amber-700">.</span>
        </span>
        <button
          type="button"
          className="rounded-full border border-stone-300 bg-white px-6 py-2 text-xs font-bold uppercase tracking-widest text-stone-700"
        >
          Reservar turno
        </button>
      </nav>

      <header className="relative px-6 pb-20 pt-4 md:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto h-6 w-6 text-amber-600" />
          <h1 className="mt-6 font-[family-name:var(--font-demo-playfair)] text-4xl font-medium leading-tight text-stone-900 md:text-6xl">
            Belleza calmada,
            <br />
            <span className="italic text-stone-600">resultados reales</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm text-stone-600">
            Tratamientos faciales, coloración vegana y masajes descontracturantes.
            Espacio boutique con sólo 3 cabinas — silencio y aromas suaves.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {["Facial glow", "Color & balayage", "Masaje ayurvédico"].map(
            (title, i) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-2xl bg-stone-200/60 p-8 text-left"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200/40 blur-2xl" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800/80">
                  Tratamiento 0{i + 1}
                </p>
                <p className="mt-3 font-[family-name:var(--font-demo-playfair)] text-xl text-stone-900">
                  {title}
                </p>
                <p className="mt-2 text-xs text-stone-600">
                  Sesión demo 60 min · incluye infusión
                </p>
              </div>
            ),
          )}
        </div>
      </header>

      <section className="bg-stone-900 px-6 py-16 text-stone-100 md:px-14">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-demo-playfair)] text-3xl md:text-4xl">
              Protocolos con luz LED y productos cruelty-free
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Evaluación gratuita de piel en primera visita. Armamos un plan
              mensual sin presión de paquetes eternos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Sun, l: "Vitamina C" },
              { icon: Wind, l: "Oxigenación" },
              { icon: Leaf, l: "Extractos botánicos" },
              { icon: Heart, l: "Bienestar" },
            ].map(({ icon: I, l }) => (
              <div
                key={l}
                className="rounded-xl border border-stone-700 bg-stone-800/50 p-4"
              >
                <I className="h-5 w-5 text-amber-500" />
                <p className="mt-2 text-xs font-bold">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-stone-500 md:px-14">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoEsteticaLanding as DemoEstetica };
