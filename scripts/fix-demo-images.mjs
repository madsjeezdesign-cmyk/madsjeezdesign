/**
 * Reemplaza IDs de Unsplash rotos en demo-visual-catalog.ts por IDs verificados (GET 200).
 */
import fs from "fs";

const CANDIDATES = [
  "photo-1486312338171-bc6835dcfe52",
  "photo-1467232004584-a241de8bcf5d",
  "photo-1557683316-973673baf926",
  "photo-1498050108023-c5249f4df085",
  "photo-1600566753190-17f0baa2a6c3",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1551218808-94e220e084d2",
  "photo-1557804506-669a67965ba0",
  "photo-1563986768609-322da13575f3",
  "photo-1497366754035-f200968a6e72",
  "photo-1524758631624-e2822e304c36",
  "photo-1519389950473-47ba0277781c",
  "photo-1582719478250-c89cae4dc85b",
  "photo-1520250497591-112f2f40a3f4",
  "photo-1558618666-fcd25c85cd64",
  "photo-1556910103-1c02745aae4d",
  "photo-1542838132-92c53300491e",
  "photo-1555507036-ab1f4038808a",
  "photo-1504674900247-0877df9cc836",
  "photo-1470337302382-05e2f0c1d3b5",
  "photo-1565299624946-b28f40a0ae38",
  "photo-1511920170033-f8393294edc8",
  "photo-1556911220-bff31c812e0a",
  "photo-1487014678447-f12aaeb36322",
  "photo-1497360417054-04038de1f61f",
  "photo-1521737714869-ea242ddcfe7c",
  "photo-1522071820081-009f0129c71c",
  "photo-1556761175-5973dc0f32e7",
  "photo-1553877522-43269d4ea984",
  "photo-1552664730-d307ca884978",
  "photo-1551836022-d5d88e9c4339",
  "photo-1554224155-6726b3ff858f",
  "photo-1454165804606-c3d57bc86b40",
  "photo-1450101499163-c8848c66ca85",
  "photo-1507679799987-c73779587ccf",
  "photo-1581149787766-e32f0e58e3e2",
  "photo-1621905252507-b35492cc74b4",
  "photo-1504384308090-c894fdcc538d",
  "photo-1588776814546-1ffcf47267a5",
  "photo-1609840114035-3c981b782dfe",
  "photo-1555633514-abcee6ab92e1",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1587854692152-cbe660dbde88",
  "photo-1551288049-bebda4e38f71",
  "photo-1550751827-4bd374c3f58b",
  "photo-1561181286-d3fee7d55364",
  "photo-1502877338535-766e1452684a",
  "photo-1503376780353-7e6692767b70",
  "photo-1619405399517-d7fce0f13302",
  "photo-1492144534655-ae79c964c9d7",
  "photo-1489824904134-891ab64532f1",
  "photo-1451187580459-43490279c0fa",
  "photo-1555949963-aa79dcee981c",
  "photo-1460925895917-afdab827c52f",
  "photo-1504639725590-34d0984388bd",
  "photo-1517694712202-14dd9538aa97",
  "photo-1490750967868-88aa4486c946",
  "photo-1560518883-ce09059eeffa",
  "photo-1600596542815-ffad4c1539a9",
  "photo-1600585154340-be6161a56a0c",
  "photo-1548199973-03cce0bbc87b",
  "photo-1583337130417-3346a1be7dee",
  "photo-1601758228041-f3b2795255f1",
  "photo-1587300003388-59208cc962cb",
  "photo-1571902943202-507ec2618e8f",
  "photo-1534438327276-14e5300c3a48",
  "photo-1490645935967-10de6ba17061",
  "photo-1517836357463-d25dfeac3438",
  "photo-1560066984-138dadb4c035",
  "photo-1522337360788-8b13dee7a37e",
  "photo-1511499767150-a48a237f0083",
  "photo-1504148455328-c376907d081c",
  "photo-1625047509168-a7026f36de04",
  "photo-1504328345606-18bbc8c9d7d1",
  "photo-1621905252507-b35492cc74b4",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1414235077428-338989a2e8c0",
  "photo-1555396273-367ea4eb4db5",
  "photo-1559339352-11d035aa65de",
  "photo-1511379938547-c1f69419868d",
  "photo-1511671782779-c97d3d27a1d4",
  "photo-1493225457124-a3eb161ffa5f",
  "photo-1520523839897-bd0b52f945a0",
  "photo-1509440159596-0249088772ff",
  "photo-1488646953014-85cb44e25828",
  "photo-1436491865332-7a61a109cc05",
  "photo-1581578731548-c64695cc6952",
  "photo-1516035069371-29a1b244cc32",
  "photo-1542038784456-1ea8e935640e",
  "photo-1492691527719-9d1e07e534b4",
  "photo-1452587925148-ce544e77e70d",
  "photo-1472214103451-9374bd1c798e",
  "photo-1574258495973-f010dfbb5371",
  "photo-1559757148-5c350d0d3c56",
  "photo-1578985545062-69928b1d9587",
  "photo-1556679343-c7306c1976bc",
  "photo-1544367567-0f2fcb009e0b",
  "photo-1506126613408-eca07ce68773",
  "photo-1599901860904-17e6ed7083a0",
  "photo-1545205597-3d9d02c29597",
  "photo-1566073771259-6a8506099945",
  "photo-1629909613654-28e377c37b09",
  "photo-1558002038-1055907df827",
  "photo-1589756824025-6bb2a6cf8fa1",
  "photo-1506905925346-21bda4d0df21",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1516450360452-9312f5e86fc7",
  "photo-1511795409834-ef04bbd61622",
  "photo-1519167758481-83f550bb49b8",
  "photo-1529156069898-49953e39b3ac",
  "photo-1531058020387-3be4fe790482",
  "photo-1540575467063-178a50c2df87",
  "photo-1542744173-8e7e53415bb0",
  "photo-1543269669-7eef42270a58",
  "photo-1544027993-37dbfe43562a",
  "photo-1551836022-d5d88e9c4339",
  "photo-1556761175-b13c0c1e2580",
  "photo-1556760547-740de6c1d686",
  "photo-1559027612-c481a7c4e4e0",
  "photo-1560179707-f14e90ef3623",
  "photo-1560448204-e02f11c3d0e2",
  "photo-1560472354-b33ff0c44a43",
  "photo-1560518883-ce09059eeffa",
  "photo-1560750588-73207b1ef5b8",
  "photo-1562564055-71e051d63c84",
  "photo-1563729784474-d77dbb033a9e",
  "photo-1564507592337-6066d05757a2",
  "photo-1564974139133-3c921b916b9f",
  "photo-1567401893414-76b7b1e5d7bb",
  "photo-1568605114967-8130f3a36994",
  "photo-1571019613454-1cb2f99b2d8b",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1573497019236-fbf6a1c0ba33",
  "photo-1574623457376-848e0a172ea4",
  "photo-1576765608535-39f21a48ccb3",
  "photo-1579621970563-ebec7560ff3e",
  "photo-1581092160562-40aa08e78837",
  "photo-1581092918056-0c4c3acd3780",
  "photo-1582719478171-f5fe9e7dcc8d",
  "photo-1583484963886-cce2a6a2e3a0",
  "photo-1584464491033-06628f3b6e2b",
  "photo-1586528116311-ad8dd3c8310d",
  "photo-1587293852726-70cdb56f6b43",
  "photo-1587831990711-e684de617d7e",
  "photo-1588420344759-0209f4a5c405",
  "photo-1590490360182-c33d57733427",
  "photo-1596524430615-b46475ddff6e",
  "photo-1598300042242-d08fbb4a2ed7",
  "photo-1600880292203-757bb62b4baf",
  "photo-1600880292089-90aefbbad1f5",
  "photo-1600607687640-4a3ac7fbe8b0",
  "photo-1600047509807-ba139d0a8a8c",
  "photo-1600585154340-be6161a56a0c",
  "photo-1600596542815-ffad4c1539a9",
];

async function isOk(photoId) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=400&q=80`;
  const res = await fetch(url, { method: "GET", redirect: "follow" });
  return res.ok;
}

const verifiedPool = [];
for (const id of CANDIDATES) {
  if (verifiedPool.includes(id)) continue;
  if (await isOk(id)) verifiedPool.push(id);
  if (verifiedPool.length >= 250) break;
}
console.log("verified pool:", verifiedPool.length);

const catalogPath = "src/lib/demo-visual-catalog.ts";
let catalog = fs.readFileSync(catalogPath, "utf8");
const used = new Set();
const idRegex = /id\("(photo-[^"]+)"\)/g;

let match;
while ((match = idRegex.exec(catalog)) !== null) {
  const photoId = match[1];
  if (await isOk(photoId)) used.add(photoId);
}

let poolIdx = 0;
function nextReplacement() {
  while (poolIdx < verifiedPool.length) {
    const id = verifiedPool[poolIdx++];
    if (!used.has(id)) {
      used.add(id);
      return id;
    }
  }
  throw new Error("Pool agotado — ampliar CANDIDATES");
}

const replacements = [];
catalog = catalog.replace(/id\("(photo-[^"]+)"\)/g, (full, photoId) => {
  if (used.has(photoId)) return full;
  const replacement = nextReplacement();
  replacements.push({ from: photoId, to: replacement });
  return `id("${replacement}")`;
});

fs.writeFileSync(catalogPath, catalog);
console.log("replaced", replacements.length, "broken ids");
fs.writeFileSync("scripts/image-replacements.json", JSON.stringify(replacements, null, 2));
