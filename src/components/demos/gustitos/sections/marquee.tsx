"use client";

const TAGS = [
  "SMASH 400°C",
  "CHEDDAR LAVA",
  "TRUFFLE DROP",
  "NEON HEAT",
  "DELIVERY 35'",
  "BRIoche HORNEADO",
  "BACON CRISPY",
  "SHAKE HOUSE",
];

export function FoodMarquee() {
  const items = [...TAGS, ...TAGS];

  return (
    <section className="border-y border-red-500/10 bg-zinc-950 py-5" aria-hidden>
      <div className="overflow-hidden">
        <div className="gu-marquee flex w-max gap-10 whitespace-nowrap">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-[family-name:var(--font-gu-display)] text-lg tracking-[0.25em] text-[color:var(--muted-body)]"
            >
              {t}
              <span className="mx-8 text-red-500">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
