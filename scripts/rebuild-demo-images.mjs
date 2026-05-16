/**
 * Reconstruye DEMO_IMAGES con IDs reales desde Unsplash napi (GET verificado).
 */
import fs from "fs";

const SEARCH_BY_SLUG = {
  ferreteria: "hardware store tools",
  restaurante: "restaurant dining",
  estetica: "beauty salon spa",
  gimnasio: "gym fitness",
  veterinaria: "veterinary pets",
  inmobiliaria: "modern house interior",
  tech: "software developer office",
  floreria: "flower shop bouquet",
  taller: "auto repair garage",
  abogados: "law office professional",
  farmacia: "pharmacy medicine",
  odontologia: "dental clinic",
  contadores: "accounting office",
  musica: "music school instruments",
  detailing: "car detailing wash",
  panaderia: "bakery bread",
  viajes: "travel vacation",
  limpieza: "cleaning service office",
  foto: "photography studio camera",
  optica: "optician eyeglasses",
  heladeria: "ice cream gelato",
  lavadero: "car wash",
  seguridad: "security camera surveillance",
  yoga: "yoga studio",
  hotel: "boutique hotel room",
  catering: "catering buffet event",
  paisajismo: "landscaping garden",
  tattoo: "tattoo studio",
  cerrajeria: "locksmith keys",
  coworking: "coworking space",
};

function extractPhotoId(url) {
  if (!url || !url.includes("images.unsplash.com/photo-")) return null;
  const m = url.match(/photo-([0-9]+-[a-f0-9]+)/i);
  return m ? `photo-${m[1]}` : null;
}

async function fetchSearchIds(query, perPage = 30) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`search failed: ${query} ${res.status}`);
  const data = await res.json();
  const ids = [];
  for (const item of data.results ?? []) {
    const fromRaw = extractPhotoId(item.urls?.raw);
    const fromRegular = extractPhotoId(item.urls?.regular);
    const fromSmall = extractPhotoId(item.urls?.small);
    for (const id of [fromRaw, fromRegular, fromSmall]) {
      if (id && !ids.includes(id)) ids.push(id);
    }
  }
  return ids;
}

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
  const res = await fetch(url, { method: "GET", redirect: "follow" });
  return res.ok;
}

async function pickSixForSlug(slug, globalUsed) {
  const query = SEARCH_BY_SLUG[slug] ?? slug;
  const candidates = await fetchSearchIds(query, 30);
  const picked = [];
  for (const id of candidates) {
    if (globalUsed.has(id) || picked.includes(id)) continue;
    if (!(await isOk(id))) continue;
    picked.push(id);
    if (picked.length >= 6) break;
  }
  if (picked.length < 6) {
  const fallback = await fetchSearchIds(`${query} professional`, 30);
    for (const id of fallback) {
      if (globalUsed.has(id) || picked.includes(id)) continue;
      if (!(await isOk(id))) continue;
      picked.push(id);
      if (picked.length >= 6) break;
    }
  }
  if (picked.length < 6) throw new Error(`${slug}: solo ${picked.length} imágenes válidas`);
  picked.forEach((id) => globalUsed.add(id));
  return { cover: picked[0], a: picked[1], b: picked[2], c: picked[3], d: picked[4], e: picked[5] };
}

const slugs = Object.keys(SEARCH_BY_SLUG);
const globalUsed = new Set();
const images = {};

for (const slug of slugs) {
  console.log("building", slug);
  images[slug] = await pickSixForSlug(slug, globalUsed);
  await new Promise((r) => setTimeout(r, 400));
}

let catalog = fs.readFileSync("src/lib/demo-visual-catalog.ts", "utf8");
const start = catalog.indexOf("export const DEMO_IMAGES");
const end = catalog.indexOf("/** Tiendas demo");

const lines = [
  "export const DEMO_IMAGES: Record<string, DemoImageSet> = {",
];
for (const slug of slugs) {
  const set = images[slug];
  lines.push(`  ${slug}: {`);
  for (const key of ["cover", "a", "b", "c", "d", "e"]) {
    lines.push(`    ${key}: id("${set[key]}"),`);
  }
  lines.push("  },");
}
lines.push("};");
lines.push("");

catalog = catalog.slice(0, start) + lines.join("\n") + "\n" + catalog.slice(end);
fs.writeFileSync("src/lib/demo-visual-catalog.ts", catalog);
console.log("OK:", slugs.length, "demos,", globalUsed.size, "unique images");
