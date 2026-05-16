#!/usr/bin/env python3
"""Safely patch demo image slots and commerce copy (block-scoped, no cross-slug regex)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src/lib/demo-visual-catalog.ts"
COMMERCE = ROOT / "src/lib/commerce-demos.ts"
SHOWCASE = ROOT / "src/lib/demos-showcase-meta.ts"

IMAGE_PATCHES: dict[str, dict[str, str]] = {
    "tech": {"d": "1558494949-ef010cbdcc31"},
    "supermercado": {"c": "1578911718230-c84fde644dce"},
    "farmacia": {"a": "1576091160399-112ba8d25d1d"},
    "odontologia": {"d": "1609843597140-79e513dbf735"},
    "coworking": {"d": "1497215848034-ef506c521ca2"},
    "ark": {"e": "1548783368-3333f9e27248"},
    "tiktoker": {"c": "1600880292084-7d9f3b6c5c8f"},
    "granja": {
        "d": "1416877275881-266f228f93c0",
        "e": "1461354469785-3ad3279f5098",
    },
    "computacion": {
        "a": "1593640408188-93c536949986",
        "b": "1587825140708-d74d53dedc0b",
        "c": "1498050108023-c524d48b3f02",
        "d": "1517077304055-6e89abbf07b0",
        "e": "1525547716958-b106687a8f2b",
    },
    "ropa": {
        "cover": "1445205170230-853b72c300a1",
        "a": "1483985989625-7ed1bb2a8286",
        "b": "1490481651871-ab68de25d43d",
        "c": "1469334031218-e382a2b5b751",
        "d": "1515886657611-9f3515b0c78c",
        "e": "1539109136889-912577e4540d",
    },
    "marketing": {
        "cover": "1552664730-d307ca884978",
        "a": "1553877522-43269d4ea984",
        "b": "1556761175-5973dc0f32e7",
        "c": "1486312588861-69d31d03d5ae",
        "d": "1557804506-669a67965ba0",
        "e": "1559136555-9303baea8ebd",
    },
    "imprenta": {
        "cover": "1586953208558-9110e4866980",
        "a": "1586281380349-632531db7ed4",
        "b": "1562834692-992ed6ab9d87",
        "c": "1611224923853-381b4cb5816e",
        "d": "1554224155-6726b3ff99f0",
        "e": "1516033708937-9d65f02b1d61",
    },
    "motores": {
        "c": "1486262715619-67b85a0a2794",
        "d": "1625047509168-a7a83c25cabd",
        "e": "1558618666-fcd25c85cd64",
    },
    "gasista": {
        "b": "1558618047-3c8c76ca7d13",
        "c": "1581578731543-486734fb55b",
        "d": "1607472586893-1918c48ca7c9",
        "e": "1565008574-81a29cd2d273a",
    },
    "electricista": {
        "cover": "1621905893238-f34a1334d6ae",
        "a": "1473341308699-474c88f48330",
        "b": "1595516023476-d8036a29f39d",
        "c": "1621905893238-35a750b6ec3e",
        "d": "1541888942225-d81a192d04db",
        "e": "1625047509168-a7a83c25cabd",
    },
    "albanil": {
        "cover": "1541974247859-004447a4b93d",
        "a": "1504917595217-d0024f06ce79",
        "b": "1590859651225-92e35fd71ca8",
        "c": "1589939707313-9dc202256a01",
        "d": "1590649837877-78513ad8d0e8",
        "e": "1600585154526-990cf4a259a0",
    },
    "arquitectos": {
        "cover": "1513699879411-d49034e9eb58",
        "a": "1618221193970-9cfcb2e73373",
        "b": "1615879443138-773290691f81",
        "c": "1600607687939-ce16a0a7d23b",
        "d": "1600585154340-be6161a56a0c",
        "e": "1600607687645-c7171b42498f",
    },
    "barberia": {
        "c": "1622286364346-6a01585d2ab4",
        "d": "1621605815971-fbc98d665033",
        "e": "1599351431202-1e0c413d6e8f",
    },
}


def iter_blocks(text: str, export_name: str):
    marker = f"export const {export_name}"
    start = text.index(marker)
    next_export = text.find("\nexport const ", start + len(marker))
    section = text[start:next_export if next_export != -1 else len(text)]
    for m in re.finditer(r'^  ("?[\w-]+"?): \{', section, re.M):
        raw_slug = m.group(1)
        slug = raw_slug.strip('"')
        open_brace = section.index("{", m.start())
        depth = 0
        for i in range(open_brace, len(section)):
            ch = section[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    block_start = start + m.start()
                    block_end = start + i + 1
                    yield slug, block_start, block_end, text[block_start:block_end]
                    break


def patch_slot_in_block(block: str, slot: str, photo_id: str) -> str:
    pid = photo_id.removeprefix("photo-")
    lines = block.splitlines(keepends=True)
    for i, line in enumerate(lines):
        stripped = line.lstrip()
        if stripped.startswith(f"{slot}:") and "id(" in stripped:
            indent = line[: len(line) - len(stripped)]
            lines[i] = f'{indent}{slot}: id("photo-{pid}"),\n'
            return "".join(lines)
    raise ValueError(f"slot not found: {slot} in block")


def apply_image_patches(text: str) -> str:
    blocks_by_slug = {slug: (s, e, b) for slug, s, e, b in iter_blocks(text, "DEMO_IMAGES")}
    for slug, slots in IMAGE_PATCHES.items():
        if slug not in blocks_by_slug:
            raise KeyError(f"missing slug in DEMO_IMAGES: {slug}")
        s, e, block = blocks_by_slug[slug]
        for slot, photo_id in slots.items():
            block = patch_slot_in_block(block, slot, photo_id)
        blocks_by_slug[slug] = (s, e, block)
    # Rebuild from end to start
    out = text
    for s, e, block in sorted(blocks_by_slug.values(), key=lambda x: x[0], reverse=True):
        out = out[:s] + block + out[e:]
    return out


def patch_sub_in_block(block: str, sub: str) -> str:
    esc = sub.replace("\\", "\\\\").replace('"', '\\"')
    pattern = re.compile(r'^(\s+sub:\s*")[^"]*(")', re.M)
    new_block, n = pattern.subn(rf"\1{esc}\2", block, count=1)
    if n == 0:
        raise ValueError("sub: not found in block")
    return new_block


def parse_commerce_hero_subs() -> dict[str, str]:
    text = COMMERCE.read_text(encoding="utf-8")
    return {
        m.group(1): m.group(2)
        for m in re.finditer(
            r'slug:\s*"([^"]+)"[\s\S]*?heroSub:\s*\n\s*"([^"]+)"',
            text,
        )
    }


def apply_lead_copy(text: str, subs: dict[str, str]) -> str:
    blocks = {slug: (s, e, b) for slug, s, e, b in iter_blocks(text, "DEMO_LEAD_COPY")}
    for slug, sub in subs.items():
        if slug not in blocks:
            print(f"WARN lead missing: {slug}")
            continue
        s, e, block = blocks[slug]
        blocks[slug] = (s, e, patch_sub_in_block(block, sub))
    out = text
    for s, e, block in sorted((v for v in blocks.values()), key=lambda x: x[0], reverse=True):
        out = out[:s] + block + out[e:]
    return out


def patch_pitch_in_block(block: str, pitch: str) -> str:
    esc = pitch.replace("\\", "\\\\").replace('"', '\\"')
    pattern = re.compile(
        r"(pitch:\s*\n\s*\")[^\"]*(\")",
        re.M,
    )
    new_block, n = pattern.subn(rf"\1{esc}\2", block, count=1)
    if n == 0:
        raise ValueError("pitch not found")
    return new_block


def apply_showcase_pitches(text: str, subs: dict[str, str]) -> str:
    blocks = {slug: (s, e, b) for slug, s, e, b in iter_blocks(text, "SHOWCASE_BY_SLUG")}
    for slug, pitch in subs.items():
        if slug not in blocks:
            print(f"WARN pitch missing: {slug}")
            continue
        s, e, block = blocks[slug]
        blocks[slug] = (s, e, patch_pitch_in_block(block, pitch))
    out = text
    for s, e, block in sorted((v for v in blocks.values()), key=lambda x: x[0], reverse=True):
        out = out[:s] + block + out[e:]
    return out


def main() -> None:
    subs = parse_commerce_hero_subs()
    catalog = CATALOG.read_text(encoding="utf-8")
    catalog = apply_image_patches(catalog)
    catalog = apply_lead_copy(catalog, subs)
    CATALOG.write_text(catalog, encoding="utf-8")
    print("Updated", CATALOG)

    showcase = SHOWCASE.read_text(encoding="utf-8")
    showcase = apply_showcase_pitches(showcase, subs)
    SHOWCASE.write_text(showcase, encoding="utf-8")
    print("Updated", SHOWCASE)


if __name__ == "__main__":
    main()
