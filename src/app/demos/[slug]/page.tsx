import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDemoBySlug, DEMO_SLUGS } from "@/lib/demos-registry";
import { getShowcaseMeta } from "@/lib/demos-showcase-meta";
import { isAndreaMariSlug } from "@/lib/andrea-mari";
import { isArana283Slug } from "@/lib/arana-283";
import { isTheBarberClubSlug } from "@/lib/the-barber-club";
import { isMasaMadreCoSlug } from "@/lib/masa-madre-co";
import { isNidoLinajeSlug } from "@/lib/nido-linaje";
import { isCentralBebidasSlug } from "@/lib/central-bebidas";
import { isLeclatSalonSlug } from "@/lib/leclat-salon";
import { isBurgerLabSlug } from "@/lib/burger-lab";
import { isPizzeriaNapolesSlug } from "@/lib/pizzeria-napoles";
import { isGelatoCoSlug } from "@/lib/gelato-co";
import { isDecoBazarCoSlug } from "@/lib/deco-bazar-co";
import { isRaicesCriollasSlug } from "@/lib/raices-criollas";
import { isIntimaCoSlug } from "@/lib/intima-co";
import { isShowroomWeekendSlug } from "@/lib/showroom-weekend";
import { isRetailFashionSlug } from "@/lib/retail-fashion-demos";
import { site } from "@/lib/data";
import { DemoSlugPageShell } from "@/components/demos/demo-slug-page-shell";
import { AndreaMariChrome } from "@/components/demos/andrea-mari/andrea-mari-chrome";
import { DemoModaAndreaMari } from "@/components/demos/andrea-mari/andrea-mari-landing";
import { ShowroomWeekendChrome } from "@/components/demos/showroom-weekend/showroom-weekend-chrome";
import { DemoModaShowroomWeekend } from "@/components/demos/showroom-weekend/showroom-weekend-landing";
import { Arana283Chrome } from "@/components/demos/arana-283/arana-283-chrome";
import { DemoModaArana283 } from "@/components/demos/arana-283/arana-283-landing";
import { TheBarberClubChrome } from "@/components/demos/the-barber-club/the-barber-club-chrome";
import { DemoTheBarberClub } from "@/components/demos/the-barber-club/the-barber-club-landing";
import { MasaMadreCoChrome } from "@/components/demos/masa-madre-co/masa-madre-co-chrome";
import { DemoMasaMadreCo } from "@/components/demos/masa-madre-co/masa-madre-co-landing";
import { NidoLinajeChrome } from "@/components/demos/nido-linaje/nido-linaje-chrome";
import { DemoNidoLinaje } from "@/components/demos/nido-linaje/nido-linaje-landing";
import { CentralBebidasChrome } from "@/components/demos/central-bebidas/central-bebidas-chrome";
import { DemoCentralBebidas } from "@/components/demos/central-bebidas/central-bebidas-landing";
import { LeclatSalonChrome } from "@/components/demos/leclat-salon/leclat-salon-chrome";
import { DemoLeclatSalon } from "@/components/demos/leclat-salon/leclat-salon-landing";
import { BurgerLabChrome } from "@/components/demos/burger-lab/burger-lab-chrome";
import { DemoBurgerLab } from "@/components/demos/burger-lab/burger-lab-landing";
import { PizzeriaNapolesChrome } from "@/components/demos/pizzeria-napoles/pizzeria-napoles-chrome";
import { DemoPizzeriaNapoles } from "@/components/demos/pizzeria-napoles/pizzeria-napoles-landing";
import { GelatoCoChrome } from "@/components/demos/gelato-co/gelato-co-chrome";
import { DemoGelatoCo } from "@/components/demos/gelato-co/gelato-co-landing";
import { DecoBazarCoChrome } from "@/components/demos/deco-bazar-co/deco-bazar-co-chrome";
import { DemoDecoBazarCo } from "@/components/demos/deco-bazar-co/deco-bazar-co-landing";
import { RaicesCriollasChrome } from "@/components/demos/raices-criollas/raices-criollas-chrome";
import { DemoRaicesCriollas } from "@/components/demos/raices-criollas/raices-criollas-landing";
import { IntimaCoChrome } from "@/components/demos/intima-co/intima-co-chrome";
import { DemoIntimaCo } from "@/components/demos/intima-co/intima-co-landing";
import { FashionDemoChrome } from "@/components/demos/retail-fashion/fashion-demo-chrome";
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
  DemoHerreria,
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
  DemoModaInfinita,
  DemoModaMaisonElle,
  DemoModaAtelierNoir,
  DemoModaLunaBoutique,
  DemoModaSilkAtelier,
  DemoModaCasaNova,
  DemoModaLinnea,
  DemoModaMaisonRose,
  DemoModaUrbanoChic,
  DemoModaVogueEstudio,
} from "@/components/demos";

const BY_SLUG: Record<(typeof DEMO_SLUGS)[number], ComponentType> = {
  ferreteria: DemoFerreteria,
  herreria: DemoHerreria,
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
  "moda-infinita": DemoModaInfinita,
  "moda-maison-elle": DemoModaMaisonElle,
  "moda-atelier-noir": DemoModaAtelierNoir,
  "moda-luna-boutique": DemoModaLunaBoutique,
  "moda-silk-atelier": DemoModaSilkAtelier,
  "moda-casa-nova": DemoModaCasaNova,
  "moda-linnea": DemoModaLinnea,
  "moda-maison-rose": DemoModaMaisonRose,
  "moda-urbano-chic": DemoModaUrbanoChic,
  "moda-vogue-estudio": DemoModaVogueEstudio,
  "moda-andrea-mari": DemoModaAndreaMari,
  "moda-showroom-weekend": DemoModaShowroomWeekend,
  "moda-arana-283": DemoModaArana283,
  "the-barber-club": DemoTheBarberClub,
  "masa-madre-co": DemoMasaMadreCo,
  "nido-linaje": DemoNidoLinaje,
  "central-bebidas": DemoCentralBebidas,
  "leclat-salon": DemoLeclatSalon,
  "burger-lab": DemoBurgerLab,
  "pizzeria-napoles": DemoPizzeriaNapoles,
  "gelato-co": DemoGelatoCo,
  "deco-bazar-co": DemoDecoBazarCo,
  "raices-criollas": DemoRaicesCriollas,
  "intima-co": DemoIntimaCo,
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

  if (isAndreaMariSlug(slug)) {
    return (
      <>
        <AndreaMariChrome />
        <Demo />
      </>
    );
  }

  if (isShowroomWeekendSlug(slug)) {
    return (
      <>
        <ShowroomWeekendChrome />
        <Demo />
      </>
    );
  }

  if (isArana283Slug(slug)) {
    return (
      <>
        <Arana283Chrome />
        <Demo />
      </>
    );
  }

  if (isTheBarberClubSlug(slug)) {
    return (
      <>
        <TheBarberClubChrome />
        <Demo />
      </>
    );
  }

  if (isMasaMadreCoSlug(slug)) {
    return (
      <>
        <MasaMadreCoChrome />
        <Demo />
      </>
    );
  }

  if (isNidoLinajeSlug(slug)) {
    return (
      <>
        <NidoLinajeChrome />
        <Demo />
      </>
    );
  }

  if (isCentralBebidasSlug(slug)) {
    return (
      <>
        <CentralBebidasChrome />
        <Demo />
      </>
    );
  }

  if (isLeclatSalonSlug(slug)) {
    return (
      <>
        <LeclatSalonChrome />
        <Demo />
      </>
    );
  }

  if (isBurgerLabSlug(slug)) {
    return (
      <>
        <BurgerLabChrome />
        <Demo />
      </>
    );
  }

  if (isPizzeriaNapolesSlug(slug)) {
    return (
      <>
        <PizzeriaNapolesChrome />
        <Demo />
      </>
    );
  }

  if (isGelatoCoSlug(slug)) {
    return (
      <>
        <GelatoCoChrome />
        <Demo />
      </>
    );
  }

  if (isDecoBazarCoSlug(slug)) {
    return (
      <>
        <DecoBazarCoChrome />
        <Demo />
      </>
    );
  }

  if (isRaicesCriollasSlug(slug)) {
    return (
      <>
        <RaicesCriollasChrome />
        <Demo />
      </>
    );
  }

  if (isIntimaCoSlug(slug)) {
    return (
      <>
        <IntimaCoChrome />
        <Demo />
      </>
    );
  }

  if (isRetailFashionSlug(slug)) {
    return (
      <>
        <FashionDemoChrome brand={d.title} />
        <Demo />
      </>
    );
  }

  return (
    <DemoSlugPageShell
      slug={slug}
      industry={d.industry}
      title={d.title}
      tagline={d.tagline}
      showcase={showcase}
    >
      <Demo />
    </DemoSlugPageShell>
  );
}
