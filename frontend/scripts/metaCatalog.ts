import type { Plugin } from "vite";
import { ALL_PERFUMES } from "../src/data/perfumes";
import saved from "./metaCatalogImages.json";

/*
 * Meta (Facebook / Instagram) product catalogue feeds:
 *   /feeds/facebook-catalog.csv       (item groups)
 *   /feeds/facebook-catalog-flat.csv  (flat)
 * Built from ALL_PERFUMES on every build, so the price and stock an ad
 * shows are what the product page and the checkout charge. (The old,
 * hand-made files had every 30 ml priced ₹150–₹500 below the site, a
 * 5 × 5 ml Discovery Set, and a fixed-price bundle that doesn't exist.)
 * Product ids and photos are kept from the old files so ads keep working.
 */

const SITE = "https://sentirebypc.com";
const CATEGORY = "Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne";
type Saved = Record<string, { main?: { image: string; label: string; desc: string }; flat?: { image: string; label: string; desc: string } }>;
const prior = saved as Saved;

const FAMILY: Record<string, string> = {
  woody: "Woody",
  fresh: "Fresh",
  ambar: "Amber",
  citrus: "Citrus",
  oriental: "Oriental",
  floral: "Floral",
};

const cell = (v: string | number) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (rows: (string | number)[][]) => rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";
const abs = (src: string) => (src.startsWith("http") ? src : `${SITE}${src.startsWith("/") ? "" : "/"}${src.split("?")[0]}`);

type Item = {
  id: string;
  group: string;
  title: string;
  desc: string;
  inStock: boolean;
  price: number;
  link: string;
  image: string;
  size: string;
  label: string;
};

function items(): Item[] {
  const list: Item[] = [];
  for (const p of ALL_PERFUMES) {
    for (const s of p.sizes) {
      const price = p.prices[s];
      if (!price) continue;
      const id = `${p.id}-${s}`;
      const old = prior[id]?.main || prior[id]?.flat;
      list.push({
        id,
        group: p.id,
        title: `${p.name} Extrait De Parfum (${s}ml)`,
        desc: old?.desc || `${p.desc} Size: ${s}ml.`,
        inStock: !p.outOfStockSizes?.includes(s),
        price,
        link: `${SITE}/perfumes/${p.id}/${s}ml`,
        image: prior[id]?.main?.image || prior[id]?.flat?.image || abs(p.sizeImages?.[s]?.[0] || p.img),
        size: `${s}ml`,
        label: old?.label || FAMILY[p.scentFamily] || "",
      });
    }
  }
  list.push({
    id: "discovery-set",
    group: "discovery-set",
    title: "SENTIRE Discovery Set (6 × 6ML)",
    desc: "Six 6 ml travel sprays of our 35%+ extrait de parfum — find your signature scent before choosing a full bottle.",
    inStock: true,
    price: 549,
    link: `${SITE}/discovery-set`,
    image: prior["discovery-set"]?.main?.image || prior["discovery-set"]?.flat?.image || `${SITE}/discovery/studio/box-front.jpg`,
    size: "6 x 6ml",
    label: "Discovery",
  });
  return list;
}

export function buildMetaCatalog() {
  const all = items();
  const main = csv([
    ["id", "item_group_id", "title", "description", "availability", "condition", "price", "link", "image_link", "brand", "google_product_category", "gender", "age_group", "custom_label_0"],
    ...all.map((i) => [
      i.id, i.group, i.title, i.desc, i.inStock ? "in stock" : "out of stock", "new", `${i.price.toFixed(2)} INR`,
      i.link, i.image, "SENTIRE By PC", CATEGORY, "unisex", "adult", i.label,
    ]),
  ]);
  const flat = csv([
    ["id", "title", "description", "availability", "condition", "price", "link", "image_link", "brand", "google_product_category", "fb_product_category", "size", "gender", "age_group", "identifier_exists", "shipping", "custom_label_0"],
    ...all.map((i) => [
      i.id, i.title, i.desc, i.inStock ? "in stock" : "out of stock", "new", `${i.price.toFixed(2)} INR`, i.link, i.image,
      "SENTIRE By PC", CATEGORY, CATEGORY.toLowerCase(), i.size, "unisex", "adult", "no", "IN::Standard:0.00 INR", i.label,
    ]),
  ]);
  return { main, flat, count: all.length };
}

export function metaCatalogPlugin(): Plugin {
  return {
    name: "meta-catalog",
    apply: "build",
    generateBundle() {
      const { main, flat } = buildMetaCatalog();
      this.emitFile({ type: "asset", fileName: "feeds/facebook-catalog.csv", source: main });
      this.emitFile({ type: "asset", fileName: "feeds/facebook-catalog-flat.csv", source: flat });
    },
  };
}
