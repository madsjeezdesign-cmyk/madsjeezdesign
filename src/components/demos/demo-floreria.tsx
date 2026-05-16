import { Flower2, Gift, Heart, Leaf, Truck } from "lucide-react";

export function DemoFloreriaLanding() {
  return (
    <div className="min-h-screen bg-emerald-950 font-[family-name:var(--font-demo-montserrat)] text-emerald-50">
      <nav className="flex items-center justify-between px-5 py-5 md:px-10">
        <span className="font-[family-name:var(--font-demo-playfair)] text-2xl italic text-pink-200">
          Jardín Urbano
        </span>
        <button
          type="button"
          className="rounded-full bg-pink-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-pink-500/20"
        >
          Armar ramo
        </button>
      </nav>

      <header className="relative overflow-hidden px-5 pb-24 pt-8 md:px-10">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full border border-pink-500/20 bg-pink-500/5 blur-2xl" />
        <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl md:flex md:items-center md:gap-16">
          <div className="flex-1">
            <h1 className="font-[family-name:var(--font-demo-playfair)] text-4xl leading-tight md:text-6xl">
              Flores
              <br />
              <span className="text-pink-400">que emocionan</span>
            </h1>
            <p className="mt-6 max-w-md text-sm text-emerald-200/80">
              Ramos a domicilio, suscripción semanal de tulipanes y decoración
              para eventos. Entrega en frío y nota personalizada.
            </p>
          </div>
          <div className="relative mt-12 flex flex-1 justify-center md:mt-0">
            <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-pink-400/30 bg-gradient-to-br from-emerald-900 to-pink-950/50">
              <Flower2 className="h-28 w-28 text-pink-300/80" strokeWidth={1} />
            </div>
            <div className="absolute -bottom-2 flex gap-2">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <Heart className="h-8 w-8 text-pink-400" />
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-emerald-800/50 bg-emerald-900/40 px-5 py-14 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            { icon: Truck, t: "Envíos", d: "Misma tarde · CABA & GBA" },
            { icon: Gift, t: "Eventos", d: "Bodas, 15 años, lanzamientos" },
            { icon: Flower2, t: "Club", d: "Flor fresca en tu oficina" },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl bg-emerald-950/60 p-6 text-center">
              <I className="mx-auto h-7 w-7 text-pink-400" />
              <p className="mt-3 font-bold text-white">{t}</p>
              <p className="mt-1 text-xs text-emerald-300/60">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 md:px-10">
        <h2 className="text-center font-[family-name:var(--font-demo-playfair)] text-3xl text-pink-100">
          Colección temporada demo
        </h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {["Peonías & eucalipto", "Garden roses blush", "Monocromo blanco", "Tropical punch"].map(
            (name) => (
              <div
                key={name}
                className="rounded-xl border border-pink-500/20 bg-gradient-to-r from-emerald-900/80 to-pink-950/40 px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-emerald-300/70">Desde $ — · stock demo</p>
              </div>
            ),
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-emerald-800">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoFloreriaLanding as DemoFloreria };
