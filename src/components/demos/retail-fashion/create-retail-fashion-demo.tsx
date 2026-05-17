"use client";

import { RetailFashionLanding } from "./demo-retail-fashion-landing";

export function createRetailFashionDemo(slug: string) {
  return function RetailFashionDemo() {
    return <RetailFashionLanding slug={slug} />;
  };
}

export const DemoModaInfinita = createRetailFashionDemo("moda-infinita");
export const DemoModaMaisonElle = createRetailFashionDemo("moda-maison-elle");
export const DemoModaAtelierNoir = createRetailFashionDemo("moda-atelier-noir");
export const DemoModaLunaBoutique = createRetailFashionDemo("moda-luna-boutique");
export const DemoModaSilkAtelier = createRetailFashionDemo("moda-silk-atelier");
export const DemoModaCasaNova = createRetailFashionDemo("moda-casa-nova");
export const DemoModaLinnea = createRetailFashionDemo("moda-linnea");
export const DemoModaMaisonRose = createRetailFashionDemo("moda-maison-rose");
export const DemoModaUrbanoChic = createRetailFashionDemo("moda-urbano-chic");
export const DemoModaVogueEstudio = createRetailFashionDemo("moda-vogue-estudio");
