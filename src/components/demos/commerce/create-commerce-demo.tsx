"use client";

import { CommerceLanding } from "./demo-commerce-landing";

export function createCommerceDemo(slug: string) {
  return function CommerceDemo() {
    return <CommerceLanding slug={slug} />;
  };
}

export const DemoTallerMotos = createCommerceDemo("taller-motos");
export const DemoCelulares = createCommerceDemo("celulares");
export const DemoAlmacen = createCommerceDemo("almacen");
export const DemoKiosco = createCommerceDemo("kiosco");
export const DemoLibreria = createCommerceDemo("libreria");
export const DemoBazar = createCommerceDemo("bazar");
export const DemoCarniceria = createCommerceDemo("carniceria");
export const DemoGranja = createCommerceDemo("granja");
export const DemoComputacion = createCommerceDemo("computacion");
export const DemoRopa = createCommerceDemo("ropa");
export const DemoSupermercado = createCommerceDemo("supermercado");
export const DemoBarberia = createCommerceDemo("barberia");
export const DemoMarketing = createCommerceDemo("marketing");
export const DemoImprenta = createCommerceDemo("imprenta");
export const DemoMotores = createCommerceDemo("motores");
export const DemoGasista = createCommerceDemo("gasista");
export const DemoElectricista = createCommerceDemo("electricista");
export const DemoAlbanil = createCommerceDemo("albanil");
export const DemoArquitectos = createCommerceDemo("arquitectos");
