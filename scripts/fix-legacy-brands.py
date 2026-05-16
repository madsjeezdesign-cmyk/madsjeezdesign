#!/usr/bin/env python3
"""Align DemoBrandNav brand strings with demos-registry titles."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src/components/demos"

FIXES = {
    "demo-panaderia.tsx": ('brand="Masa Madre"', 'brand="El Horno de Raíz"'),
    "demo-limpieza.tsx": ('brand="PULCRO"', 'brand="ProLimpio"'),
    "demo-foto.tsx": ('brand="LUZ NEGRA"', 'brand="Lúmenes Estudio"'),
    "demo-optica.tsx": ('brand="VISIÓN+"', 'brand="Visión Clara"'),
    "demo-viajes.tsx": ('brand="RUMBO"', 'brand="Atlas Experiencias"'),
    "demo-detailing.tsx": ('brand="SHINE"', 'brand="Shine Autodetail"'),
    "demo-seguridad.tsx": ('brand="BUNKER"', 'brand="Vigilum Alarmas"'),
    "demo-heladeria.tsx": ('brand="Alborada"', 'brand="Gelato Alborada"'),
    "demo-tattoo.tsx": ('brand="INK · ORÁCULO"', 'brand="Oráculo Ink Lab"'),
    "demo-cerrajeria.tsx": ('brand="LLAVE 24"', 'brand="Llaves 24 Sur"'),
    "demo-catering.tsx": ('brand="Origen"', 'brand="Banquetes Origen"'),
}


def main() -> None:
    for fname, (old, new) in FIXES.items():
        path = ROOT / fname
        if not path.exists():
            print("skip", fname)
            continue
        text = path.read_text(encoding="utf-8")
        if old not in text:
            print("no match", fname, old)
            continue
        path.write_text(text.replace(old, new, 1), encoding="utf-8")
        print("ok", fname)


if __name__ == "__main__":
    main()
