import type { RetailFashionConfig, RetailFashionProduct } from "@/lib/retail-fashion-demos";

export function fashionWhatsAppBase(config: RetailFashionConfig): string {
  return `https://wa.me/${config.whatsapp}`;
}

export function buildFashionWhatsAppLink(
  config: RetailFashionConfig,
  message: string,
): string {
  return `${fashionWhatsAppBase(config)}?text=${encodeURIComponent(message)}`;
}

/** Mensaje para una prenda — abre WhatsApp listo para enviar. */
export function whatsappProductUrl(
  config: RetailFashionConfig,
  product: RetailFashionProduct,
): string {
  const lines = [
    `Hola ${config.brand}! 👋`,
    `Quiero comprar esta prenda de su web:`,
    ``,
    `🛍 ${product.name}`,
    product.price ? `💰 ${product.price}` : "",
    product.sizeHint ? `📐 Talle: ${product.sizeHint}` : "",
    ``,
    `¿Tienen stock? ¿Cómo puedo pagar y retirar?`,
    ``,
    `Gracias — vengo desde la web.`,
  ].filter(Boolean);

  return buildFashionWhatsAppLink(config, lines.join("\n"));
}

/** Carrito completo — un solo mensaje con todas las prendas. */
export function whatsappCartUrl(
  config: RetailFashionConfig,
  items: RetailFashionProduct[],
): string {
  if (items.length === 0) {
    return buildFashionWhatsAppLink(config, config.whatsappMessage);
  }

  const list = items
    .map((p, i) => {
      const extra = [p.price, p.sizeHint].filter(Boolean).join(" · ");
      return `${i + 1}. ${p.name}${extra ? ` (${extra})` : ""}`;
    })
    .join("\n");

  const lines = [
    `Hola ${config.brand}! 👋`,
    `Quiero comprar las siguientes prendas de su web:`,
    ``,
    list,
    ``,
    `Total de artículos: ${items.length}`,
    `¿Me confirman disponibilidad y formas de pago?`,
    ``,
    `Gracias — vengo desde la web.`,
  ];

  return buildFashionWhatsAppLink(config, lines.join("\n"));
}

export function whatsappGeneralUrl(config: RetailFashionConfig): string {
  return buildFashionWhatsAppLink(config, config.whatsappMessage);
}
