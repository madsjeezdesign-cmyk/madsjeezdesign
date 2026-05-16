import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoBySlug, DEMO_SLUGS } from "@/lib/demos-registry";
import { site } from "@/lib/data";
import {
  DemoAbogados,
  DemoEstetica,
  DemoFerreteria,
  DemoFloreria,
  DemoGimnasio,
  DemoInmobiliaria,
  DemoRestaurante,
  DemoTaller,
  DemoTech,
  DemoVeterinaria,
} from "@/components/demos";

const BY_SLUG = {
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
} as const;

type Slug = keyof typeof BY_SLUG;

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
  if (!(slug in BY_SLUG)) notFound();
  const Demo = BY_SLUG[slug as Slug];
  return <Demo />;
}
