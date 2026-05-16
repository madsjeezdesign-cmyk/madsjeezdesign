import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoBySlug, DEMO_SLUGS } from "@/lib/demos-registry";
import { getDemoVisuals } from "@/lib/demo-assets";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { site } from "@/lib/data";
import { DemoSlugPageShell } from "@/components/demos/demo-slug-page-shell";
import {
  DemoAbogados,
  DemoContadores,
  DemoDetailing,
  DemoEstetica,
  DemoFarmacia,
  DemoFerreteria,
  DemoFloreria,
  DemoFoto,
  DemoGimnasio,
  DemoInmobiliaria,
  DemoLimpieza,
  DemoMusica,
  DemoOdontologia,
  DemoOptica,
  DemoPanaderia,
  DemoRestaurante,
  DemoTaller,
  DemoTech,
  DemoVeterinaria,
  DemoViajes,
} from "@/components/demos";

const BY_SLUG: Record<(typeof DEMO_SLUGS)[number], ComponentType> = {
  ferreteria: DemoFerreteria,
  restaurante: DemoRestaurante,
  estetica: DemoEstetica,
  gimnasio: DemoGimnasio,
  veterinaria: DemoVeterinaria,
  inmobiliaria: DemoInmobiliaria,
  tech: DemoTech,
  floreria: DemoFloreria,
  taller: DemoTaller,
  abogados: DemoAbogados,
  farmacia: DemoFarmacia,
  odontologia: DemoOdontologia,
  contadores: DemoContadores,
  musica: DemoMusica,
  detailing: DemoDetailing,
  panaderia: DemoPanaderia,
  viajes: DemoViajes,
  limpieza: DemoLimpieza,
  foto: DemoFoto,
  optica: DemoOptica,
};

export function generateStaticParams() {
  return DEMO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDemoBySlug(slug);
  if (!d) return { title: "Demo" };
  return {
    title: `Demo ${d.industry}`,
    description: `${d.title} — modelo de landing ${site.name}. ${d.tagline}`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Demo = BY_SLUG[slug as keyof typeof BY_SLUG];
  if (!Demo) notFound();
  const d = getDemoBySlug(slug);
  if (!d) notFound();
  const showcase = getShowcaseMeta(slug);
  const cover = getDemoVisuals(slug).cover;

  return (
    <DemoSlugPageShell
      industry={d.industry}
      title={d.title}
      tagline={d.tagline}
      coverSrc={cover}
      showcase={showcase}
    >
      <Demo />
    </DemoSlugPageShell>
  );
}
