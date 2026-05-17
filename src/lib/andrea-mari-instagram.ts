/** Posts reales de @showroom_andreamari — imágenes en /public/demos/andrea-mari */

export type AndreaMariIgSource = {
  code: string;
  postUrl: string;
  localPath: string;
  cdnUrl: string;
};

const base = (code: string) =>
  `https://www.instagram.com/showroom_andreamari/p/${code}/`;

export const ANDREA_MARI_IG_POSTS: AndreaMariIgSource[] = [
  {
    code: "DXsCQ-dlnWR",
    postUrl: base("DXsCQ-dlnWR"),
    localPath: "/demos/andrea-mari/ig-01.jpg",
    cdnUrl: "",
  },
  {
    code: "DXsB_XkltjF",
    postUrl: base("DXsB_XkltjF"),
    localPath: "/demos/andrea-mari/ig-02.jpg",
    cdnUrl: "",
  },
  {
    code: "DXsBaRKkjKE",
    postUrl: base("DXsBaRKkjKE"),
    localPath: "/demos/andrea-mari/ig-03.jpg",
    cdnUrl: "",
  },
  {
    code: "DXr8_bIFn5h",
    postUrl: base("DXr8_bIFn5h"),
    localPath: "/demos/andrea-mari/ig-04.jpg",
    cdnUrl: "",
  },
  {
    code: "DXr8idqFm1A",
    postUrl: base("DXr8idqFm1A"),
    localPath: "/demos/andrea-mari/ig-05.jpg",
    cdnUrl: "",
  },
  {
    code: "DXr8KENFlMc",
    postUrl: base("DXr8KENFlMc"),
    localPath: "/demos/andrea-mari/ig-06.jpg",
    cdnUrl: "",
  },
  {
    code: "DXNAYzKllsV",
    postUrl: base("DXNAYzKllsV"),
    localPath: "/demos/andrea-mari/ig-07.jpg",
    cdnUrl: "",
  },
  {
    code: "DXAQpoUEsqe",
    postUrl: base("DXAQpoUEsqe"),
    localPath: "/demos/andrea-mari/ig-08.jpg",
    cdnUrl: "",
  },
  {
    code: "DXAQa4HEgDP",
    postUrl: base("DXAQa4HEgDP"),
    localPath: "/demos/andrea-mari/ig-09.jpg",
    cdnUrl: "",
  },
  {
    code: "DXAQA5EkksL",
    postUrl: base("DXAQA5EkksL"),
    localPath: "/demos/andrea-mari/ig-10.jpg",
    cdnUrl: "",
  },
  {
    code: "DVuF1NDFshF",
    postUrl: base("DVuF1NDFshF"),
    localPath: "/demos/andrea-mari/ig-11.jpg",
    cdnUrl: "",
  },
  {
    code: "DVuFAp8lhY-",
    postUrl: base("DVuFAp8lhY-"),
    localPath: "/demos/andrea-mari/ig-12.jpg",
    cdnUrl: "",
  },
];

export function buildAndreaMariInstagramFeed() {
  return ANDREA_MARI_IG_POSTS.map((post, i) => ({
    code: post.code,
    postUrl: post.postUrl,
    image: post.localPath,
    fallbackImage: post.cdnUrl || undefined,
    alt: `Showroom Andrea Mari — look ${i + 1}`,
  }));
}

export function andreaMariShopImage(index: number): string {
  return ANDREA_MARI_IG_POSTS[index]?.localPath ?? "/demos/andrea-mari/ig-01.jpg";
}
