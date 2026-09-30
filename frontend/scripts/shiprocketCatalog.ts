import type { Plugin } from "vite";
import { ALL_PERFUMES } from "../src/data/perfumes";

/*
 * The catalog Shiprocket Checkout syncs from us (Custom Endpoints in their
 * dashboard):
 *   /api/sr/seller/products
 *   /api/sr/seller/collections
 *   /api/sr/seller/productsByCollection
 * Shape as in their API doc: { data: { total, products | collections } },
 * every field present. Built from ALL_PERFUMES, so the price, sizes and
 * stock Shiprocket charges are always the ones the site shows. Variant ids
 * are the Shopify variants the site sells (SHOPIFY_VARIANT_MAP).
 *
 * These are static files, so the query string (page, limit, collection_id)
 * is ignored: one page holds everything, and there is a single collection
 * holding every product, which makes "products by collection" exact.
 */

const SITE = "https://sentirebypc.com";
const CREATED = "2026-09-29T10:00:00+05:30";
const STOCK = 250;

// Shopify product id and variant id per size, keyed by the site's product id
const IDS: Record<string, { product: number; variants: Record<number, string> }> = {
  "0809": { product: 8459203940101, variants: { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" } },
  calantha: { product: 8459203940102, variants: { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" } },
  "deep-crush": { product: 8459203940103, variants: { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" } },
  herrlich: { product: 8459203940104, variants: { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" } },
  midnight: { product: 8459203940105, variants: { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" } },
  mirai: { product: 8459203940106, variants: { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" } },
  personna: { product: 8459203940107, variants: { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" } },
  "purple-oud": { product: 8459203940108, variants: { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" } },
  rich: { product: 8459203940109, variants: { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" } },
  seductive: { product: 8459203940110, variants: { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" } },
  "white-oud": { product: 8459203940111, variants: { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" } },
  zephyrine: { product: 8459203940112, variants: { 10: "46946124628129", 30: "46946124660897" } },
  bijou: { product: 8459203940113, variants: { 10: "46946155430049", 30: "46946155462817" } },
  dapper: { product: 8459203940114, variants: { 10: "46946174337185", 30: "46946174369953" } },
  "le-chocolat": { product: 8459203940115, variants: { 10: "46946200354977", 30: "46946200387745" } },
  "pc-leather": { product: 8459203940116, variants: { 10: "46946216509601", 30: "46946216542369" } },
  quantillion: { product: 8459203940117, variants: { 10: "46946240823457", 30: "46946240856225" } },
  reiz: { product: 8459203940118, variants: { 10: "46946264088737", 30: "46946264121505" } },
  "sent-aura": { product: 8459203940119, variants: { 10: "46946279981217", 30: "46946280013985" } },
  vanaco: { product: 8459203940120, variants: { 10: "46946298298529", 30: "46946298331297" } },
  "woo-dy": { product: 8459203940121, variants: { 10: "46946307014817", 30: "46946307047585" } },
};

const abs = (src: string) => (src.startsWith("http") ? src : `${SITE}${src.startsWith("/") ? "" : "/"}${src}`);
const money = (n: number) => n.toFixed(2);
const grams = (ml: number) => (ml <= 10 ? 100 : ml <= 30 ? 200 : 300);

type Variant = {
  id: number;
  title: string;
  price: string;
  compare_at_price: string;
  sku: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  option_values: Record<string, string>;
  grams: number;
  image: { src: string };
  weight: number;
  weight_unit: string;
};

const product = (p: {
  id: number;
  title: string;
  body: string;
  handle: string;
  tags: string;
  image: string;
  optionName: string;
  variants: Variant[];
}) => ({
  id: p.id,
  title: p.title,
  body_html: p.body,
  vendor: "SENTIRE By PC",
  product_type: "Extrait de Parfum",
  created_at: CREATED,
  handle: p.handle,
  updated_at: CREATED,
  tags: p.tags,
  status: "active",
  variants: p.variants,
  image: { src: abs(p.image) },
  options: [{ name: p.optionName, values: p.variants.map((v) => v.option_values[p.optionName]) }],
});

const variant = (v: {
  id: string;
  title: string;
  price: number;
  mrp?: number;
  sku: string;
  inStock: boolean;
  option: [string, string];
  grams: number;
  image: string;
}): Variant => ({
  id: Number(v.id),
  title: v.title,
  price: money(v.price),
  compare_at_price: money(Math.max(v.mrp ?? v.price, v.price)),
  sku: v.sku,
  quantity: v.inStock ? STOCK : 0,
  created_at: CREATED,
  updated_at: CREATED,
  taxable: true,
  option_values: { [v.option[0]]: v.option[1] },
  grams: v.grams,
  image: { src: abs(v.image) },
  weight: v.grams / 1000,
  weight_unit: "kg",
});

export function buildShiprocketCatalog() {
  const products = ALL_PERFUMES.flatMap((p) => {
    const ids = IDS[p.id];
    if (!ids) throw new Error(`Shiprocket catalog: no Shopify ids for "${p.id}"`);
    const sizes = p.sizes.filter((s) => ids.variants[s] && p.prices[s]);
    const title = `SENTIRE ${p.name} Extrait de Parfum`;
    return [
      product({
        id: ids.product,
        title,
        body: `<p>${p.fullDesc || p.desc}</p>`,
        handle: p.id,
        tags: ["Extrait de Parfum", p.scentFamily, ...(p.moods || []), p.badge || ""].filter(Boolean).join(", "),
        image: p.img.split("?")[0],
        optionName: "Size",
        variants: sizes.map((s) =>
          variant({
            id: ids.variants[s],
            title: `${s} ML`,
            price: p.prices[s],
            mrp: p.mrps?.[s],
            sku: `SENTIRE-${p.id.toUpperCase()}-${s}ML`,
            inStock: !p.outOfStockSizes?.includes(s),
            option: ["Size", `${s} ML`],
            grams: grams(s),
            image: (p.sizeImages?.[s]?.[0] || p.img).split("?")[0],
          }),
        ),
      }),
    ];
  });

  products.unshift(
    product({
      id: 8459203940123,
      title: "Sentire Discovery Coffret (6x6 ML)",
      body: "<p>Six 6 ML travel sprays of our extraits de parfum, 36 ML in all.</p>",
      handle: "discovery-set",
      tags: "Discovery Set, Extrait de Parfum",
      image: "/discovery/studio/box-front.jpg",
      optionName: "Size",
      variants: [
        variant({
          id: "46965136031905",
          title: "6x6 ML Discovery Set",
          price: 549,
          mrp: 549,
          sku: "SENTIRE-DISCOVERY-6X6ML",
          inStock: true,
          option: ["Size", "6x6 ML"],
          grams: 250,
          image: "/discovery/studio/box-front.jpg",
        }),
      ],
    }),
  );

  // the engraving fee is its own line in the cart (backend adds it)
  products.push(
    product({
      id: 8459203940199,
      title: "Custom Bottle Engraving",
      body: "<p>Personalised engraving on your bottle.</p>",
      handle: "custom-bottle-engraving",
      tags: "Personalisation",
      image: "/assets/sentire-logo-gold.png",
      optionName: "Title",
      variants: [
        variant({
          id: "46947691659425",
          title: "Engraving",
          price: 200,
          mrp: 200,
          sku: "SENTIRE-ENGRAVING",
          inStock: true,
          option: ["Title", "Engraving"],
          grams: 0,
          image: "/assets/sentire-logo-gold.png",
        }),
      ],
    }),
  );

  const collections = [
    {
      id: 4001002003001,
      updated_at: CREATED,
      body_html: "<p>Every SENTIRE By PC extrait de parfum.</p>",
      handle: "all",
      image: { src: abs("/discovery/studio/box-front.jpg") },
      title: "All Perfumes",
      created_at: CREATED,
    },
  ];

  return {
    products: { data: { total: products.length, products } },
    collections: { data: { total: collections.length, collections } },
    productsByCollection: { data: { total: products.length, products } },
  };
}

/** Writes the three catalog files into the build (served as JSON, see firebase.json). */
export function shiprocketCatalogPlugin(): Plugin {
  return {
    name: "shiprocket-catalog",
    apply: "build",
    generateBundle() {
      const catalog = buildShiprocketCatalog();
      for (const [name, body] of Object.entries(catalog)) {
        this.emitFile({
          type: "asset",
          fileName: `api/sr/seller/${name}/index.html`,
          source: JSON.stringify(body, null, 2),
        });
      }
    },
  };
}
