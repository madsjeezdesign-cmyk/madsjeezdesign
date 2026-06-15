const SERVICES = [
  { title: "Aperturas urgentes", desc: "Puertas blindadas · autos · persianas" },
  { title: "Cambio de cerraduras", desc: "Cilindros · multipunto · digitales" },
  { title: "Copias certificadas", desc: "Yale · cruz · computadas · chip" },
  { title: "Instalación técnica", desc: "Cajas fuertes · cerraduras alta seguridad" },
];

export function CerrajeriaCentralServices() {
  return (
    <section id="servicios" className="scroll-mt-20 border-b border-zinc-800 bg-zinc-950 py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-3 sm:grid-cols-2 lg:grid-cols-4 sm:px-4">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="text-sm font-black uppercase text-amber-400">{s.title}</h3>
            <p className="mt-2 text-xs text-[color:var(--muted-body)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
