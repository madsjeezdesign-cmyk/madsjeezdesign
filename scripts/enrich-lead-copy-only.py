#!/usr/bin/env python3
"""Patch only DEMO_LEAD_COPY block in demo-visual-catalog.ts."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

LEAD_UPGRADES: dict[str, tuple[str, str, str]] = {
    "ferreteria": (
        "Stock que convierte",
        "Pedí demo para Ferretería del Oeste",
        "Catálogo, envíos y cuenta corriente: te mostramos cómo se ve con tu marca y tus categorías reales.",
    ),
    "restaurante": (
        "Más reservas esta semana",
        "Hablemos de La Mesa Norteña online",
        "Carta con fotos, reservas y delivery sin perder la calidez de tu salón.",
    ),
    "estetica": (
        "Agenda con estilo",
        "Consultá por Aura Estética digital",
        "Turnos, protocolos y retail home care en una experiencia premium mobile-first.",
    ),
    "gimnasio": (
        "Nuevos socios",
        "Coordiná demo Pulse Cross",
        "Planes, horarios y shop integrado para que cada visita al sitio cierre inscripción.",
    ),
    "veterinaria": (
        "Guardia y tienda",
        "Contacto Patitas Sanas",
        "Urgencias, vacunas y pet shop en un flujo claro con CTAs a WhatsApp.",
    ),
    "inmobiliaria": (
        "Leads calificados",
        "Propuesta Horizonte Propiedades",
        "Portfolio filtrable, tasaciones y fichas con datos que generan confianza antes de la visita.",
    ),
    "contadores": (
        "PyME sin sorpresas",
        "Reunión con Número Exacto",
        "Monotributo, SAS y responsables: calendario tributario y carpeta bancaria en un solo lugar.",
    ),
    "musica": (
        "Inscripciones 2026",
        "Escribinos — Pentagrama",
        "Niveles, profesores y pagos online para familias con recordatorios automáticos.",
    ),
    "detailing": (
        "Protección total",
        "Reservá en Shine Autodetail",
        "Paquetes cerámicos, coating y membresía con antes/después que venden el upgrade.",
    ),
    "panaderia": (
        "Horno en marcha",
        "Hablemos — El Horno de Raíz",
        "Encargues B2B, pedido anticipado y vitrina que huele a artesanal antes del click.",
    ),
    "viajes": (
        "Próximo destino",
        "Armá tu viaje con Atlas",
        "Paquetes, MICE y soporte 24/7 con asesor humano visible en cada paso.",
    ),
    "limpieza": (
        "Facility serio",
        "Propuesta ProLimpio",
        "Cotización por m², certificaciones y SLA claros para hotel, oficina o consorcio.",
    ),
    "foto": (
        "Producción con luz",
        "Brief Lúmenes Estudio",
        "Packs, plazos y add-ons entendibles para marcas y eventos corporativos.",
    ),
    "optica": (
        "Ver mejor",
        "Turno Visión Clara",
        "Examen, armazones y cristales con financiación visible y audiología integrada.",
    ),
    "heladeria": (
        "Temporada dulce",
        "Coordiná Gelato Alborada",
        "Sabores rotativos, eventos y delivery que suben ticket sin app propia.",
    ),
    "lavadero": (
        "Sin filas",
        "Membresía Spin & Gloss",
        "Planes recurrentes, detailing rápido y flota PyME con reserva online.",
    ),
    "seguridad": (
        "Cobertura real",
        "Auditoría Vigilum",
        "Diagrama de zonas, SLA de respuesta y bundles hogar/comercio sin letra chica.",
    ),
    "yoga": (
        "Primera clase",
        "Probá Mat Lumen",
        "Estilos, horarios y pack corporativo con agenda mobile-first.",
    ),
    "hotel": (
        "Suite disponible",
        "Reservá Posada 9 Luces",
        "Check-in claro, spa y experiencias locales con tono editorial boutique.",
    ),
    "catering": (
        "Tu evento",
        "Brief Banquetes Origen",
        "Menú por persona, dietas visibles y producción en sitio para B2B.",
    ),
    "paisajismo": (
        "Jardín soñado",
        "Visita Verde Horizonte",
        "Diseño, riego inteligente y contrato de mantenimiento anual transparente.",
    ),
    "tattoo": (
        "Tu próximo tattoo",
        "Lista Oráculo Ink Lab",
        "Flash, manga y políticas claras con calendario de disponibilidad.",
    ),
    "cerrajeria": (
        "Urgencia 24 h",
        "Llaves 24 Sur al toque",
        "Geolocalización de móvil, garantía escrita y catálogo de cerraduras smart.",
    ),
    "coworking": (
        "Day pass",
        "Reservá Hub Muelle",
        "Ocupación en vivo, salas equipadas y planes para equipos remotos.",
    ),
}


def main() -> None:
    path = ROOT / "src/lib/demo-visual-catalog.ts"
    text = path.read_text(encoding="utf-8")
    m = re.search(r"export const DEMO_LEAD_COPY.*", text, re.DOTALL)
    if not m:
        print("DEMO_LEAD_COPY not found")
        return
    lead_section = m.group(0)
    n = 0
    for slug, (kicker, title, sub) in LEAD_UPGRADES.items():
        block = (
            f"  {slug}: {{\n"
            f'    kicker: "{kicker}",\n'
            f'    title: "{title}",\n'
            f'    sub: "{sub}",\n'
            f"  }},"
        )
        pattern = rf"  {re.escape(slug)}: \{{[^}}]+\}},"
        new_lead, c = re.subn(pattern, block, lead_section, count=1, flags=re.DOTALL)
        if c:
            lead_section = new_lead
            n += 1
    new_text = text[: m.start()] + lead_section
    path.write_text(new_text, encoding="utf-8")
    print(f"lead copy updated: {n}")


if __name__ == "__main__":
    main()
