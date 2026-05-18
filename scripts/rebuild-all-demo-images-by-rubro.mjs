/**
 * Rebuild DEMO_IMAGES + premium lib photos with Unsplash search per rubro.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "src/lib/demo-visual-catalog.ts");

/** Múltiples queries por slug para fotos del rubro. */
const SEARCH_BY_SLUG = {
  ferreteria: ["hardware store tools", "construction materials"],
  herreria: ["welding blacksmith forge", "wrought iron gate"],
  restaurante: ["restaurant dining food", "gourmet plate restaurant"],
  estetica: ["beauty salon spa", "nail salon interior"],
  gimnasio: ["gym fitness workout", "crossfit training"],
  veterinaria: ["veterinary clinic dog", "pet shop animals"],
  inmobiliaria: ["luxury apartment interior", "real estate modern house"],
  tech: ["software developer office", "technology startup workspace"],
  floreria: ["flower shop bouquet", "florist roses"],
  taller: ["auto repair garage", "car mechanic workshop"],
  abogados: ["law office professional", "lawyer legal books"],
  farmacia: ["pharmacy drugstore", "medicine healthcare"],
  odontologia: ["dental clinic dentist", "teeth dental care"],
  contadores: ["accounting office finance", "tax documents desk"],
  musica: ["music school instruments", "piano guitar lesson"],
  detailing: ["car detailing polish", "auto ceramic coating"],
  panaderia: ["artisan bakery bread", "pastry croissant cafe"],
  viajes: ["travel vacation beach", "airport vacation luggage"],
  limpieza: ["professional cleaning service", "janitorial office clean"],
  foto: ["photography studio camera", "portrait photographer"],
  optica: ["optician eyeglasses store", "optical frames display"],
  heladeria: ["ice cream gelato shop", "gelato display flavors"],
  lavadero: ["car wash automatic", "car wash foam"],
  seguridad: ["security camera cctv", "home alarm security"],
  yoga: ["yoga studio class", "yoga meditation wellness"],
  hotel: ["boutique hotel room", "luxury hotel lobby"],
  catering: ["catering buffet wedding", "event food catering"],
  paisajismo: ["landscaping garden design", "lawn garden maintenance"],
  tattoo: ["tattoo studio artist", "tattoo ink machine"],
  cerrajeria: ["locksmith keys door", "door lock installation"],
  coworking: ["coworking space modern", "shared office desks"],
  minecraft: ["minecraft blocks game", "gaming pc setup rgb"],
  roblox: ["gaming colorful setup", "kids gaming room"],
  cs2: ["esports gaming setup", "fps gaming monitor"],
  fivem: ["gaming pc rgb desk", "roleplay gaming community"],
  muonline: ["fantasy mmorpg game", "medieval fantasy battle"],
  lineage2: ["mmorpg fantasy warrior", "online rpg game art"],
  rust: ["survival game wilderness", "gaming survival pc"],
  ark: ["dinosaur jungle game", "survival adventure game"],
  terraria: ["pixel art game world", "2d adventure game"],
  palworld: ["cute creature fantasy", "creature collection game"],
  streamer: ["twitch streaming setup", "gaming stream microphone"],
  youtuber: ["youtube studio recording", "video creator camera"],
  tiktoker: ["smartphone content creator", "short video filming"],
  comunicadores: ["podcast radio studio", "broadcast microphone"],
  "taller-motos": ["motorcycle repair workshop", "motorcycle mechanic garage"],
  celulares: ["smartphone store display", "mobile phone retail"],
  almacen: ["warehouse inventory boxes", "wholesale distribution"],
  kiosco: ["convenience store snacks", "corner shop retail"],
  libreria: ["bookstore shelves books", "library reading books"],
  bazar: ["variety store products", "general merchandise retail"],
  carniceria: ["butcher shop meat cuts", "fresh meat display"],
  granja: ["organic farm produce", "fresh vegetables farm"],
  computacion: ["computer store laptops", "electronics retail shop"],
  ropa: ["clothing boutique fashion", "apparel store mannequin"],
  supermercado: ["supermarket grocery aisles", "grocery shopping cart"],
  barberia: ["barbershop haircut men", "barber chair classic"],
  marketing: ["digital marketing team", "marketing agency office"],
  imprenta: ["print shop printing press", "commercial printing"],
  motores: ["car engine repair", "automotive engine block"],
  gasista: ["gas installation plumber", "water heater gas"],
  electricista: ["electrician wiring panel", "electrical installation work"],
  albanil: ["masonry construction site", "bricklayer building wall"],
  arquitectos: ["architecture modern building", "architect blueprint model"],
};

const PREMIUM_FILES = {
  "src/lib/burger-lab.ts": ["gourmet burger restaurant", "french fries", "milkshake soda"],
  "src/lib/gustitos.ts": ["smash burger cheese", "loaded fries", "craft soda drink"],
  "src/lib/central-bebidas.ts": ["liquor store bottles", "wine bar drinks", "beer tap bar"],
  "src/lib/masa-madre-co.ts": ["sourdough bread bakery", "artisan pastry", "coffee bakery"],
  "src/lib/pizzeria-napoles.ts": ["neapolitan pizza oven", "italian pizza margherita", "pizza restaurant"],
  "src/lib/gelato-co.ts": ["gelato ice cream shop", "italian gelato flavors"],
  "src/lib/nido-linaje.ts": ["boutique hotel bedroom", "hotel lobby luxury", "hotel breakfast"],
  "src/lib/leclat-salon.ts": ["hair salon styling", "beauty salon interior", "nail manicure spa"],
  "src/lib/deco-bazar-co.ts": ["home decor living room", "interior design furniture", "home accessories"],
  "src/lib/raices-criollas.ts": ["argentinian empanadas asado", "latin american food restaurant", "choripan grill"],
  "src/lib/intima-co.ts": ["lingerie fashion boutique", "women intimate apparel"],
  "src/lib/cerrajeria-central.ts": ["locksmith keys security", "door lock repair"],
  "src/lib/luna-petit-co.ts": ["kids fashion boutique", "children clothing store"],
  "src/lib/nexus-ferreteria.ts": ["hardware store industrial", "construction tools warehouse"],
  "src/lib/the-barber-club.ts": ["premium barbershop men", "beard trim barber"],
  "src/lib/retail-fashion-demos.ts": ["fashion boutique women", "runway fashion model", "designer clothing store"],
  "src/lib/arana-283.ts": ["streetwear fashion urban", "sneakers fashion store"],
  "src/lib/showroom-weekend.ts": ["fashion showroom clothing", "weekend casual fashion"],
  "src/components/demos/demo-farmacia-landing.tsx": ["pharmacy products medicine", "vitamins supplements", "medical equipment pharmacy"],
  "src/components/demos/demo-herreria-landing.tsx": ["metal gate industrial", "bbq grill iron", "welding workshop steel"],
};

function extractPhotoId(url) {
  const m = String(url).match(/photo-([0-9]+-[a-f0-9]+)/i);
  return m ? `photo-${m[1]}` : null;
}

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(12000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchSearchIds(query, perPage = 30) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) return [];
  const data = await res.json();
  const ids = [];
  for (const item of data.results ?? []) {
    for (const u of [item.urls?.raw, item.urls?.regular, item.urls?.small]) {
      const id = extractPhotoId(u);
      if (id && !ids.includes(id)) ids.push(id);
    }
  }
  return ids;
}

async function buildPool(queries, count, globalUsed) {
  const pool = [];
  for (const q of queries) {
    if (pool.length >= count) break;
    for (const id of await fetchSearchIds(q, 30)) {
      if (globalUsed.has(id) || pool.includes(id)) continue;
      if (await isOk(id)) pool.push(id);
      if (pool.length >= count) break;
    }
  }
  return pool;
}

async function pickSixForSlug(slug, globalUsed) {
  const queries = SEARCH_BY_SLUG[slug] ?? [slug.replace(/-/g, " ")];
  const picked = await buildPool(queries, 6, globalUsed);
  if (picked.length < 6) {
    const extra = await buildPool([`${queries[0]} professional`], 6 - picked.length, globalUsed);
    for (const id of extra) {
      if (!picked.includes(id)) picked.push(id);
    }
  }
  if (picked.length < 6) throw new Error(`${slug}: only ${picked.length} images`);
  picked.forEach((id) => globalUsed.add(id));
  return { cover: picked[0], a: picked[1], b: picked[2], c: picked[3], d: picked[4], e: picked[5] };
}

async function replacePhotosInFile(relPath, queries, globalUsed) {
  const fp = path.join(root, relPath);
  let text = fs.readFileSync(fp, "utf8");
  const ids = [...new Set((text.match(/photo-[0-9]+-[a-f0-9]+/gi) ?? []).map((x) => x))];
  if (!ids.length) return 0;
  const pool = await buildPool(queries, ids.length, globalUsed);
  if (pool.length < ids.length) {
    const more = await buildPool([queries[0], "business professional"], ids.length - pool.length + 5, globalUsed);
    for (const id of more) {
      if (!pool.includes(id)) pool.push(id);
      if (pool.length >= ids.length) break;
    }
  }
  const mapping = {};
  ids.forEach((oldId, i) => {
    mapping[oldId] = pool[i];
    globalUsed.add(pool[i]);
  });
  for (const [from, to] of Object.entries(mapping)) {
    text = text.split(from).join(to);
  }
  fs.writeFileSync(fp, text);
  return ids.length;
}

// --- Rebuild catalog DEMO_IMAGES ---
const slugs = Object.keys(SEARCH_BY_SLUG);
const globalUsed = new Set();
const images = {};

console.log(`Rebuilding catalog: ${slugs.length} slugs`);
for (const slug of slugs) {
  process.stderr.write(`\r  catalog: ${slug.padEnd(20)}`);
  images[slug] = await pickSixForSlug(slug, globalUsed);
  await new Promise((r) => setTimeout(r, 250));
}
console.error("\n");

let catalog = fs.readFileSync(catalogPath, "utf8");
const start = catalog.indexOf("export const DEMO_IMAGES");
const end = catalog.indexOf("/** Tiendas demo");
const lines = ["export const DEMO_IMAGES: Record<string, DemoImageSet> = {"];
for (const slug of slugs) {
  const set = images[slug];
  const key = slug.includes("-") ? `"${slug}"` : slug;
  lines.push(`  ${key}: {`);
  for (const k of ["cover", "a", "b", "c", "d", "e"]) {
    lines.push(`    ${k}: id("${set[k]}"),`);
  }
  lines.push("  },");
}
lines.push("};", "");
catalog = catalog.slice(0, start) + lines.join("\n") + "\n" + catalog.slice(end);
fs.writeFileSync(catalogPath, catalog);
console.log(`Catalog OK: ${slugs.length} slugs, ${globalUsed.size} unique IDs`);

// --- Premium + landing components ---
let totalPremium = 0;
for (const [rel, queries] of Object.entries(PREMIUM_FILES)) {
  process.stderr.write(`\r  premium: ${rel.split("/").pop().padEnd(30)}`);
  const n = await replacePhotosInFile(rel, queries, globalUsed);
  totalPremium += n;
  await new Promise((r) => setTimeout(r, 200));
}
console.error(`\nPremium OK: ${totalPremium} photo IDs in ${Object.keys(PREMIUM_FILES).length} files`);
console.log(`Total unique images used: ${globalUsed.size}`);
