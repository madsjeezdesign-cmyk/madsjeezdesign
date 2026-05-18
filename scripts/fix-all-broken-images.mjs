/**
 * Replace broken Unsplash photo IDs using verified pool + Unsplash search.
 * Reads scripts/broken-images.json (from verify-demo-images-get.mjs).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "src/lib/demo-visual-catalog.ts");
const brokenPath = path.join(root, "scripts/broken-images.json");

const SEARCH_QUERIES = [
  "business professional",
  "restaurant food",
  "workshop tools",
  "office team",
  "retail shop",
  "fitness gym",
  "beauty salon",
  "automotive garage",
  "gaming setup",
  "construction site",
  "bakery bread",
  "fashion boutique",
  "bar drinks",
  "home interior decor",
  "family restaurant",
];

function extractPhotoId(url) {
  const m = String(url).match(/photo-([0-9]+-[a-f0-9]+)/i);
  return m ? `photo-${m[1]}` : null;
}

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchSearchIds(query, perPage = 40) {
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

async function buildPool(globalUsed, needCount) {
  const pool = [];
  for (const q of SEARCH_QUERIES) {
    if (pool.length >= needCount + 80) break;
    const ids = await fetchSearchIds(q, 30);
    for (const id of ids) {
      if (globalUsed.has(id) || pool.includes(id)) continue;
      if (await isOk(id)) pool.push(id);
      if (pool.length >= needCount + 80) break;
    }
    process.stderr.write(`\rPool: ${pool.length}/${needCount}`);
  }
  console.error("");
  return pool;
}

let catalog = fs.readFileSync(catalogPath, "utf8");
const globalUsed = new Set();
for (const m of catalog.matchAll(/id\("(photo-[^"]+)"\)/g)) {
  const id = m[1];
  if (await isOk(id)) globalUsed.add(id);
}

const broken = fs.existsSync(brokenPath)
  ? JSON.parse(fs.readFileSync(brokenPath, "utf8"))
  : [];

const toReplace = new Set(broken.map((b) => b.photoId));
// Also catch obviously fake hashes
for (const m of catalog.matchAll(/id\("(photo-[^"]+)"\)/g)) {
  const id = m[1];
  if (/[0-9a-f]{8,}-[0-9a-f]{8,}/.test(id) && id.includes("e8a0d0a2e2e")) toReplace.add(id);
  if (/photo-17[56]\d{10,}/.test(id)) toReplace.add(id);
  if (/photo-1715322554946/.test(id)) toReplace.add(id);
}

console.log(`Working in catalog: ${globalUsed.size}, to replace: ${toReplace.size}`);

const pool = await buildPool(globalUsed, toReplace.size);
let poolIdx = 0;
function nextId() {
  if (poolIdx >= pool.length) {
    throw new Error(`Pool exhausted at ${poolIdx}/${pool.length}, need ${toReplace.size}`);
  }
  const id = pool[poolIdx++];
  globalUsed.add(id);
  return id;
}

const replacements = [];
for (const oldId of toReplace) {
  if (!catalog.includes(`"${oldId}"`)) continue;
  const newId = nextId();
  replacements.push({ from: oldId, to: newId });
}

for (const { from, to } of replacements) {
  catalog = catalog.split(`"${from}"`).join(`"${to}"`);
}

fs.writeFileSync(catalogPath, catalog);
fs.writeFileSync(path.join(root, "scripts/image-replacements.json"), JSON.stringify(replacements, null, 2));
console.log(`Replaced ${replacements.length} photo IDs in demo-visual-catalog.ts`);
