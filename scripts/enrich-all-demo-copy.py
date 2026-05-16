#!/usr/bin/env python3
"""Enrich showcase pitches and DEMO_LEAD_COPY with brand-specific copy."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PITCH_UPGRADES: dict[str, str] = {
    "ferreteria": "Ferretería del Oeste: catálogo con 2.000+ SKUs, stock por sucursal, envíos same-day y listas para obradores con cuenta corriente B2B.",
    "restaurante": "La Mesa Norteña: carta digital con fotos de plato, reservas sin fricción, delivery por barrio y storytelling de sala que eleva el ticket.",
    "estetica": "Aura Estética: turnos online, protocolos premium visibles, membresías y tienda home care con estética spa minimal.",
    "gimnasio": "Pulse Cross: planes open gym y box, horarios en vivo, coaches destacados y shop de indumentaria para convertir visitas en socios.",
    "veterinaria": "Patitas Sanas: guardia 24 h, vacunación, internación demo y pet shop integrado con recordatorios por WhatsApp.",
    "inmobiliaria": "Horizonte Propiedades: fichas con datos verificables, tours virtuales, tasaciones online y captación de compradores calificados.",
    "contadores": "Número Exacto: calendario AFIP/ARBA, balances para bancos, payroll outsourcing y videollamada de onboarding en 48 h.",
    "musica": "Pentagrama: inscripciones por nivel, calendario de recitales, pagos online para familias y credenciales docentes visibles.",
    "detailing": "Shine Autodetail: antes/después, paquetes cerámicos, coating y membresía mensual con reserva de slot online.",
    "panaderia": "El Horno de Raíz: horno en vivo, encargues B2B, pedido anticipado y narrativa de masa madre que vende por aroma.",
    "viajes": "Atlas Experiencias: itinerarios a medida, MICE corporativo, seguro incluido y asesor humano visible en cada etapa.",
    "limpieza": "ProLimpio: propuestas B2B por m², certificaciones ISO demo, SLA de respuesta y vertical hotel/oficina/edificio.",
    "foto": "Lúmenes Estudio: packs corporativos y sociales, equipamiento listado, plazos claros y galería cinematográfica.",
    "optica": "Visión Clara: examen visual, armazones premium, cristales progresivos y audiología con financiación transparente.",
    "heladeria": "Gelato Alborada: estaciones de sabor, eventos, franquicia demo y delivery nocturno con copy sensorial.",
    "lavadero": "Spin & Gloss: membresías sin fila, detailing express, flota PyME y app de reserva con ocupación en vivo.",
    "seguridad": "Vigilum Alarmas: diagramas de cobertura, botón de pánico, monitoreo 24/7 y bundles hogar/PyME sin jerga.",
    "yoga": "Mat Lumen: estilos Hatha y Vinyasa, agenda mobile-first, packs corporativos y prueba de clase gratuita.",
    "hotel": "Posada 9 Luces: suites boutique, spa 11–21 h, MICE hasta 12 pax y upsells de experiencias locales.",
    "catering": "Banquetes Origen: menús por persona, dietas visibles, producción en sitio y brief online para eventos B2B.",
    "paisajismo": "Verde Horizonte: diseño de jardín, riego inteligente, mantenimiento anual y portafolio antes/después.",
    "tattoo": "Oráculo Ink Lab: flash book, lista de espera, políticas claras y galería de manga & piercing.",
    "cerrajeria": "Llaves 24 Sur: urgencias geolocalizadas, apertura sin daño, cerraduras smart y matrícula visible.",
    "coworking": "Hub Muelle: day pass, salas con occupancy live, fibra dedicada y planes para equipos híbridos.",
}

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


def patch_pitches() -> int:
    path = ROOT / "src/lib/demos-showcase-meta.ts"
    text = path.read_text(encoding="utf-8")
    n = 0
    for slug, pitch in PITCH_UPGRADES.items():
        esc = pitch.replace("\\", "\\\\").replace('"', '\\"')
        pattern = rf'({re.escape(slug)}:\s*\{{[^}}]*?pitch:\s*\n\s*)".*?"'
        repl = rf'\1"{esc}"'
        new, c = re.subn(pattern, repl, text, count=1, flags=re.DOTALL)
        if c:
            text = new
            n += 1
    path.write_text(text, encoding="utf-8")
    return n


def patch_lead_copy() -> int:
    path = ROOT / "src/lib/demo-visual-catalog.ts"
    text = path.read_text(encoding="utf-8")
    n = 0
    for slug, (kicker, title, sub) in LEAD_UPGRADES.items():
        block = (
            f'  {slug}: {{\n'
            f'    kicker: "{kicker}",\n'
            f'    title: "{title}",\n'
            f'    sub: "{sub}",\n'
            f'  }},'
        )
        pattern = rf"  {re.escape(slug)}: \{{[^}}]+\}},"
        new, c = re.subn(pattern, block, text, count=1, flags=re.DOTALL)
        if c:
            text = new
            n += 1
    path.write_text(text, encoding="utf-8")
    return n


def main() -> None:
    p = patch_pitches()
    l = patch_lead_copy()
    print(f"pitches updated: {p}, lead copy updated: {l}")


if __name__ == "__main__":
    main()
