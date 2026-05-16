import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoBySlug, DEMO_SLUGS } from "@/lib/demos-registry";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { site } from "@/lib/data";
import { DemoSlugPageShell } from "@/components/demos/demo-slug-page-shell";
import {
  DemoAbogados,
  DemoCatering,
  DemoCerrajeria,
  DemoContadores,
  DemoCoworking,
  DemoDetailing,
  DemoEstetica,
  DemoFarmacia,
  DemoFerreteria,
  DemoFloreria,
  DemoFoto,
  DemoGimnasio,
  DemoHeladeria,
  DemoHotel,
  DemoInmobiliaria,
  DemoLavadero,
  DemoLimpieza,
  DemoMusica,
  DemoOdontologia,
  DemoOptica,
  DemoPaisajismo,
  DemoPanaderia,
  DemoRestaurante,
  DemoSeguridad,
  DemoTaller,
  DemoTattoo,
  DemoTech,
  DemoVeterinaria,
  DemoViajes,
  DemoYoga,
  DemoMinecraft,
  DemoRoblox,
  DemoCs2,
  DemoFivem,
  DemoMuonline,
  DemoLineage2,
  DemoRust,
  DemoArk,
  DemoTerraria,
  DemoPalworld,
  DemoStreamer,
  DemoYoutuber,
  DemoTiktoker,
  DemoComunicadores,
  DemoTallerMotos,
  DemoCelulares,
  DemoAlmacen,
  DemoKiosco,
  DemoLibreria,
  DemoBazar,
  DemoCarniceria,
  DemoGranja,
  DemoComputacion,
  DemoRopa,
  DemoSupermercado,
  DemoBarberia,
  DemoMarketing,
  DemoImprenta,
  DemoMotores,
  DemoGasista,
  DemoElectricista,
  DemoAlbanil,
  DemoArquitectos,
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
  heladeria: DemoHeladeria,
  lavadero: DemoLavadero,
  seguridad: DemoSeguridad,
  yoga: DemoYoga,
  hotel: DemoHotel,
  catering: DemoCatering,
  paisajismo: DemoPaisajismo,
  tattoo: DemoTattoo,
  cerrajeria: DemoCerrajeria,
  coworking: DemoCoworking,
  minecraft: DemoMinecraft,
  roblox: DemoRoblox,
  cs2: DemoCs2,
  fivem: DemoFivem,
  muonline: DemoMuonline,
  lineage2: DemoLineage2,
  rust: DemoRust,
  ark: DemoArk,
  terraria: DemoTerraria,
  palworld: DemoPalworld,
  streamer: DemoStreamer,
  youtuber: DemoYoutuber,
  tiktoker: DemoTiktoker,
  comunicadores: DemoComunicadores,
  "taller-motos": DemoTallerMotos,
  celulares: DemoCelulares,
  almacen: DemoAlmacen,
  kiosco: DemoKiosco,
  libreria: DemoLibreria,
  bazar: DemoBazar,
  carniceria: DemoCarniceria,
  granja: DemoGranja,
  computacion: DemoComputacion,
  ropa: DemoRopa,
  supermercado: DemoSupermercado,
  barberia: DemoBarberia,
  marketing: DemoMarketing,
  imprenta: DemoImprenta,
  motores: DemoMotores,
  gasista: DemoGasista,
  electricista: DemoElectricista,
  albanil: DemoAlbanil,
  arquitectos: DemoArquitectos,
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

  return (
    <DemoSlugPageShell
      industry={d.industry}
      title={d.title}
      tagline={d.tagline}
      showcase={showcase}
    >
      <Demo />
    </DemoSlugPageShell>
  );
}
