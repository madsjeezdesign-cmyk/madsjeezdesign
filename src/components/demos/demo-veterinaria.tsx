import { Heart, PawPrint, Scissors, Stethoscope, Syringe } from "lucide-react";

export function DemoVeterinariaLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-950 to-cyan-950 font-[family-name:var(--font-demo-montserrat)] text-cyan-50">
      <nav className="flex items-center justify-between px-5 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-2xl">
            <PawPrint className="h-5 w-5 text-orange-300" />
          </div>
          <span className="font-bold text-white">
            Patitas <span className="text-teal-300">Sanas</span>
          </span>
        </div>
        <button
          type="button"
          className="rounded-full bg-orange-400 px-5 py-2 text-xs font-bold text-teal-950"
        >
          Turno online
        </button>
      </nav>

      <header className="px-5 pb-16 pt-8 md:px-12 md:pt-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-teal-500/20 bg-teal-900/30 p-8 md:grid md:grid-cols-2 md:items-center md:gap-12 md:p-14">
          <div>
            <h1 className="font-[family-name:var(--font-demo-playfair)] text-4xl font-semibold leading-tight text-white md:text-5xl">
              Cuidamos a tu compañero como{" "}
              <span className="text-orange-300">familia</span>
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-teal-200/80">
              Clínica general, cirugía menor, laboratorio y pet shop con
              alimentos premium. Guardia sábados tarde.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900"
              >
                WhatsApp urgencias
              </button>
              <button
                type="button"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white"
              >
                Ver servicios
              </button>
            </div>
          </div>
          <div className="relative mt-10 flex aspect-square items-center justify-center rounded-3xl bg-gradient-to-br from-orange-400/20 to-transparent md:mt-0">
            <Heart className="h-32 w-32 text-orange-300/30" strokeWidth={0.5} />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-teal-950/90 p-4 backdrop-blur">
              <p className="text-xs font-bold text-orange-300">Promo demo</p>
              <p className="text-sm text-white">20% primer consulta + vacuna anual</p>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 md:px-12">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {[
            { icon: Stethoscope, t: "Clínica", d: "ECG, radiografías, internación" },
            { icon: Scissors, t: "Peluquería", d: "Perros y gatos, sedación si hace falta" },
            { icon: Syringe, t: "Vacunación", d: "Calendario y recordatorios" },
          ].map(({ icon: I, t, d }) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <I className="h-8 w-8 text-orange-300" />
              <h3 className="mt-3 font-bold text-white">{t}</h3>
              <p className="mt-2 text-xs text-teal-200/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-5 py-10 text-center text-xs text-teal-700 md:px-12">
        Demo visual · MadsJeez Design
      </footer>
    </div>
  );
}

export { DemoVeterinariaLanding as DemoVeterinaria };
