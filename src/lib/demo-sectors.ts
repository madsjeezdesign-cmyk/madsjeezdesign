/**
 * Sectores del showroom /demos — agrupa demos por rubro comercial.
 */

export type DemoSectorId = "moda-retail" | "inmobiliaria" | "general";

export type DemoSectorMeta = {
  id: DemoSectorId;
  label: string;
  description: string;
  /** Orden en el índice (menor = más arriba). */
  order: number;
};

export const DEMO_SECTORS: DemoSectorMeta[] = [
  {
    id: "moda-retail",
    label: "Tiendas de ropa",
    description:
      "Boutiques y locales de moda con estética editorial, lookbook, Instagram y WhatsApp — ideal para mostrar el sitio a comercios reales.",
    order: 0,
  },
  {
    id: "inmobiliaria",
    label: "Inmobiliaria & inversión",
    description:
      "Portfolio premium, tasaciones y landings de educación / influencer para captar inversores y alumnos.",
    order: 1,
  },
  {
    id: "general",
    label: "Todos los rubros",
    description:
      "Ferreterías, gastronomía, servicios, hosting, creadores y más modelos listos para adaptar.",
    order: 2,
  },
];

export const DEFAULT_DEMO_SECTOR: DemoSectorId = "general";

export function getSectorMeta(id: DemoSectorId): DemoSectorMeta {
  return DEMO_SECTORS.find((s) => s.id === id) ?? DEMO_SECTORS[DEMO_SECTORS.length - 1]!;
}
