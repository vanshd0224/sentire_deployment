import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(frontendDir, 'public');
const distDir = path.resolve(frontendDir, 'dist');
const indexHtmlPath = path.resolve(frontendDir, 'index.html');

const PRODUCTION_DOMAIN = 'https://sentirebypc.com';

const PERFUMES_DATA = [
  {
    id: "calantha",
    num: "No. 01",
    name: "Calantha",
    desc: "Blooming Florals · Sandalwood & Amber",
    subtitle: "Blooming Florals & Sandalwood",
    fullDesc: "Calantha captures the essence of blooming flowers in a luxurious, timeless scent that transcends traditional gender boundaries. Features delicate florals, jasmine, rose, and warm Mysore sandalwood.",
    scentFamily: "floral",
    sizes: [10, 30, 50],
    prices: { 10: 399, 30: 900, 50: 1085 },
    badge: "bestseller",
    img: "/assets/perfumes/calantha-50ml-3.png?v=3",
    traces: ["Jasmine", "Rose", "Lily of Valley", "Sandalwood", "Amber"]
  },
  {
    id: "deep-crush",
    num: "No. 02",
    name: "Deep Crush",
    desc: "Invigorating Lavender & Warm Tobacco Woods",
    subtitle: "Warm Musk & Tobacco Woods",
    fullDesc: "Deep Crush is a captivating fragrance designed for the modern individual. Welcomed by lavender and rose, revealing warm tobacco and musky amber.",
    scentFamily: "floral",
    sizes: [10, 30, 50],
    prices: { 10: 350, 30: 899, 50: 1085 },
    badge: "bestseller",
    img: "/assets/perfumes/deep-crush-50ml-3.png?v=3",
    traces: ["Lavender", "Rose", "Tobacco", "Sandalwood", "Amber"]
  },
  {
    id: "herrlich",
    num: "No. 03",
    name: "Herrlich",
    desc: "Fresh Fruits, Bouquet & Decadent Chocolate",
    subtitle: "Fresh Bergamot & Dark Chocolate",
    fullDesc: "Herrlich is a luxurious perfume presenting fresh bergamot and peach top notes, a heart of jasmine and rose, and a base of dark chocolate.",
    scentFamily: "woody",
    sizes: [10, 30, 50],
    prices: { 10: 550, 30: 1499, 50: 2196 },
    badge: "new",
    img: "/assets/perfumes/herrlich-50ml-3.png?v=3",
    traces: ["Bergamot", "Peach", "Jasmine", "Rose", "Dark Chocolate"]
  },
  {
    id: "midnight",
    num: "No. 04",
    name: "Midnight",
    desc: "Blackcurrant, Tuberose & Sensual Vanilla Musk",
    subtitle: "Blackcurrant & Vanilla Musk",
    fullDesc: "Midnight encapsulates the allure of the night, beginning with bergamot and blackcurrant, transitioning into rich tuberose and warm vanilla musk.",
    scentFamily: "woody",
    sizes: [10, 30, 50],
    prices: { 10: 549, 30: 1399, 50: 1949 },
    badge: "new",
    img: "/assets/perfumes/midnight-50ml-1.png?v=2",
    traces: ["Blackcurrant", "Bergamot", "Tuberose", "Vanilla", "Musk"]
  },
  {
    id: "mirai",
    num: "No. 05",
    name: "Mirai",
    desc: "Bright Citrus, Lavender & Earthy Patchouli",
    subtitle: "Roasted Coffee & Sweet Vanilla",
    fullDesc: "Mirai unfolds with crisp, sparkling citrus and calming lavender, deepening into a heart of aromatic woods and a grounding patchouli dry-down.",
    scentFamily: "woody",
    sizes: [10, 30, 50],
    prices: { 10: 499, 30: 1199, 50: 1699 },
    badge: null,
    img: "/assets/perfumes/mirai-50ml-2.png?v=3",
    traces: ["Citrus", "Lavender", "Patchouli", "Cedarwood"]
  },
  {
    id: "0809",
    num: "No. 06",
    name: "0809",
    desc: "Sichuan Pepper, Earthy Vetiver & Ambroxan",
    subtitle: "Sichuan Pepper & Earthy Vetiver",
    fullDesc: "0809 is an assertive, ultra-masculine extrait. Fresh-spicy opening with Sichuan pepper leading into clean aromatic vetiver and an intoxicating Ambroxan trail.",
    scentFamily: "fresh",
    sizes: [10, 30, 50],
    prices: { 10: 549, 30: 1399, 50: 1949 },
    badge: null,
    img: "/assets/perfumes/0809-50ml-1.png?v=2",
    traces: ["Sichuan Pepper", "Bergamot", "Vetiver", "Ambroxan"]
  },
  {
    id: "personna",
    num: "No. 07",
    name: "Personna",
    desc: "Mandarin, Black Pepper & Empowering Patchouli",
    subtitle: "Aquatic Marine & Dry Woods",
    fullDesc: "Personna is crafted for distinction. Zesty mandarin and cracked black pepper meet an earthy base of rich patchouli and amber.",
    scentFamily: "fresh",
    sizes: [10, 30, 50],
    prices: { 10: 499, 30: 1199, 50: 1699 },
    badge: null,
    img: "/assets/perfumes/personna-50ml-2.png?v=3",
    traces: ["Mandarin", "Black Pepper", "Patchouli", "Amber"]
  },
  {
    id: "purple-oud",
    num: "No. 08",
    name: "Purple Oud",
    desc: "Smoky Cambodian Oud, Saffron & Amethyst Rose",
    subtitle: "Cambodian Oud & Saffron",
    fullDesc: "Purple Oud by SENTIRE By PC is a majestic composition created for connoisseurs of deep, magnetic sillage. Features smoky Cambodian oud, saffron, and velvety amethyst rose.",
    scentFamily: "woody",
    sizes: [50],
    prices: { 50: 1489 },
    badge: "exclusive",
    img: "/assets/perfumes/purple-oud-50ml-2.png?v=3",
    traces: ["Cambodian Oud", "Fiery Saffron", "Amethyst Rose", "Amberwood"]
  },
  {
    id: "rich",
    num: "No. 09",
    name: "Rich",
    desc: "Opulent Bergamot, Spiced Rose & Velvet Musk",
    subtitle: "Icy Fruits & Polished Cedar",
    fullDesc: "Rich delivers uncompromising luxury. A radiant citrus-spice opening followed by damask rose, velvety woods, and warm amber musk.",
    scentFamily: "ambar",
    sizes: [10, 30, 50],
    prices: { 10: 559, 30: 1287, 50: 1593 },
    badge: "new",
    img: "/assets/perfumes/rich-50ml-1.png?v=2",
    traces: ["Bergamot", "Spiced Rose", "Patchouli", "Amber Musk"]
  },
  {
    id: "seductive",
    num: "No. 10",
    name: "Seductive",
    desc: "Citric Limon, Fresh Lavender & Velvet Amber",
    subtitle: "Italian Limon & Black Pepper",
    fullDesc: "Seductive is an intoxicating blend designed for unforgettable evenings. Bright Italian limon and lavender settle into a deep amber-patchouli base.",
    scentFamily: "oriental",
    sizes: [10, 30, 50],
    prices: { 10: 459, 30: 999, 50: 1149 },
    badge: "bestseller",
    img: "/assets/perfumes/seductive-50ml-2.png?v=3",
    traces: ["Limon", "Lavender", "Patchouli", "Velvet Amber"]
  },
  {
    id: "white-oud",
    num: "No. 11",
    name: "White Oud",
    desc: "Smoky Oud, Soothing Lavender & Resinous Amber",
    subtitle: "Clean Woody Oud & Lavender",
    fullDesc: "White Oud balances ethereal freshness with sacred woods. Soft lavender top notes lead to pure white agarwood resin and warm amber.",
    scentFamily: "woody",
    sizes: [10, 30, 50],
    prices: { 10: 549, 30: 1399, 50: 1949 },
    badge: null,
    img: "/assets/perfumes/white-oud-50ml-1.png?v=2",
    traces: ["Essence of Oud", "Lavender", "Labdanum", "Amber"]
  },
  {
    id: "dapper",
    num: "No. 14",
    name: "Dapper",
    desc: "Bold Tobacco, Clove & Cedarwood",
    subtitle: "Tobacco & Smoky Woods",
    fullDesc: "Dapper is an exquisite fragrance that transcends gender norms, enveloping the wearer in an aura of sophistication, warm tobacco, and aromatic woods.",
    scentFamily: "woody",
    sizes: [10, 30],
    prices: { 10: 799, 30: 1499 },
    badge: "new",
    img: "/assets/perfumes/dapper-30ml-1.png?v=2",
    traces: ["Tobacco", "Clove", "Cedarwood", "Sandalwood"]
  },
  {
    id: "woo-dy",
    num: "No. 20",
    name: "Woo-Dy",
    desc: "Cedarwood, Cypress, Vetiver & Amber Musk",
    subtitle: "Cedarwood & Sandalwood",
    fullDesc: "Woo-Dy is a deep balsamic woods formulation with grounding earthen depth and beast-mode sillage.",
    scentFamily: "woody",
    sizes: [10, 30],
    prices: { 10: 799, 30: 1499 },
    badge: "new",
    img: "/assets/perfumes/woo-dy-30ml-1.png?v=2",
    traces: ["Cedarwood", "Cypress", "Vetiver", "Amber Musk"]
  },
  {
    id: "zephyrine",
    num: "No. 12",
    name: "Zephyrine",
    desc: "White Florals, Sparkling Citrus & Amber",
    subtitle: "White Florals & Citrus",
    fullDesc: "Zephyrine captures an airy breeze of pristine white florals with an energizing zest of sun-kissed citrus.",
    scentFamily: "fresh",
    sizes: [10, 30],
    prices: { 10: 799, 30: 1499 },
    badge: "new",
    img: "/assets/perfumes/zephyrine-30ml-1.png?v=2",
    traces: ["White Florals", "Citrus", "Amber", "Musk"]
  },
  {
    id: "bijou",
    num: "No. 13",
    name: "Bijou",
    desc: "Floral Bouquet, Sandalwood & Vanilla",
    subtitle: "Floral Bouquet & Warm Vanilla",
    fullDesc: "Bijou is an opulent jewel in high-concentration perfumery, blending tender blossoms with warm vanilla and Mysore sandalwood.",
    scentFamily: "floral",
    sizes: [10, 30],
    prices: { 10: 799, 30: 1499 },
    badge: "new",
    img: "/assets/perfumes/bijou-30ml-1.png?v=2",
    traces: ["Floral Bouquet", "Sandalwood", "Patchouli", "Vanilla"]
  }
];

const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${PRODUCTION_DOMAIN}/#organization`,
  "name": "SENTIRE By PC",
  "alternateName": ["Sentire Parfums", "Sentire Haute Parfumerie", "Sentire Fragrances Jaipur"],
  "url": PRODUCTION_DOMAIN,
  "logo": {
    "@type": "ImageObject",
    "url": `${PRODUCTION_DOMAIN}/assets/logo.png`,
    "width": "512",
    "height": "512",
    "caption": "SENTIRE By PC — Luxury Extrait de Parfum with Laser Bottle Engraving, Jaipur"
  },
  "description": "Jaipur-based artisanal luxury fragrance house crafting 35%+ perfume oil extraits de parfum with bespoke laser photo & name flacon engraving.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919950891935",
    "contactType": "customer service",
    "email": "support@sentirebypc.com",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": ["https://www.instagram.com/sentireforelite"]
};

const STORE_SCHEMA = {
  "@type": ["Store", "LocalBusiness"],
  "@id": `${PRODUCTION_DOMAIN}/#jaipur-store`,
  "name": "SENTIRE By PC Haute Parfumerie Atelier",
  "image": `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
  "url": PRODUCTION_DOMAIN,
  "telephone": "+919950891935",
  "email": "support@sentirebypc.com",
  "priceRange": "₹350 - ₹4999",
  "currenciesAccepted": "INR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "First Floor, 109-110, Beriwal Tower, Subhash Nagar Shopping Centre",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302016",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.9108,
    "longitude": 75.7650
  }
};

function generateProductSchemaJson(p) {
  const canonicalUrl = `${PRODUCTION_DOMAIN}/perfumes?id=${p.id}`;
  return {
    "@type": "ProductGroup",
    "@id": `${canonicalUrl}#productgroup`,
    "name": `SENTIRE ${p.name} Extrait de Parfum`,
    "description": p.fullDesc,
    "url": canonicalUrl,
    "brand": { "@type": "Brand", "name": "SENTIRE By PC" },
    "image": `${PRODUCTION_DOMAIN}${p.img.split('?')[0]}`,
    "productGroupID": `SENTIRE-GRP-${p.id.toUpperCase()}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "54",
      "bestRating": "5",
      "worstRating": "1"
    },
    "variesBy": ["https://schema.org/size"],
    "hasVariant": p.sizes.map(size => ({
      "@type": "Product",
      "@id": `${canonicalUrl}#size-${size}ml`,
      "name": `SENTIRE ${p.name} Extrait de Parfum (${size}ml)`,
      "sku": `SENTIRE-${p.id.toUpperCase()}-${size}ML`,
      "image": `${PRODUCTION_DOMAIN}${p.img.split('?')[0]}`,
      "description": `${p.desc} — 35%+ perfume oil concentration.`,
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": p.prices[size] || 1499,
        "availability": "https://schema.org/InStock",
        "seller": { "@id": `${PRODUCTION_DOMAIN}/#organization` }
      }
    }))
  };
}

const routes = [
  {
    path: 'perfumes',
    title: '35%+ Perfume Oil Extraits & Personalised Perfumes | SENTIRE By PC',
    description: 'Explore 11 signature extraits de parfum formulated with rare 35%+ perfume oil concentration for beast-mode longevity. Includes complimentary laser photo engraving.',
    ogTitle: '35%+ Pure Oil Extrait de Parfum Catalog | SENTIRE By PC',
    ogDescription: 'Artisanal high-concentration perfumes formulated with 35%+ pure fragrance oils and bespoke laser flacon engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
    heading: 'Artisanal Extrait de Parfum Collection',
    subheading: 'Rare 35%+ Perfume Oil Concentration · Eternal Sillage · Jaipur Atelier Craftsmanship',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">35%+ Pure Oil Extraits de Parfum & Personalised Perfumes</h1>
        <p class="mt-2 text-ink/70">Every bottle by SENTIRE By PC is formulated with 35%+ pure perfume oil concentration for superior 12+ hour sillage. Complimentary photo and name laser engraving is available on all 50ml flacons.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes?id=${p.id}" class="block">
                <img src="${p.img}" alt="Sentire ${p.name} Extrait de Parfum bottle" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <p class="text-xs text-ink/60">${p.num} · ${p.desc}</p>
                <p class="text-sm font-semibold mt-2">Starts at ₹${p.prices[p.sizes[0]]} (${p.sizes[0]}ML)</p>
                <p class="text-xs text-ink/70 mt-1">${p.fullDesc}</p>
              </a>
            </article>
          `).join('')}
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Perfumes", "item": `${PRODUCTION_DOMAIN}/perfumes` }
          ]
        },
        {
          "@type": "ItemList",
          "name": "SENTIRE Extrait de Parfum Collection",
          "numberOfItems": PERFUMES_DATA.length,
          "itemListElement": PERFUMES_DATA.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${PRODUCTION_DOMAIN}/perfumes?id=${p.id}`,
            "name": `SENTIRE ${p.name} Extrait de Parfum`
          }))
        },
        ...PERFUMES_DATA.map(generateProductSchemaJson)
      ]
    })
  },
  {
    path: 'bestsellers',
    title: 'Best-Selling 35%+ Perfume Oil Extraits | SENTIRE By PC',
    description: 'Shop Jaipur\'s most coveted signature extraits de parfum crafted with 35%+ pure perfume oil concentration for all-day sillage, luxury packaging, and express delivery.',
    ogTitle: 'Best-Selling 35%+ Pure Oil Perfumes | SENTIRE By PC',
    ogDescription: 'Our highest-performing extraits de parfum featuring 35%+ perfume oil concentration and precision laser bottle etching.',
    image: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
    heading: 'Best-Selling Extraits de Parfum',
    subheading: 'Iconic Creations Outlasting Standard 15% EDPs',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Best-Selling 35%+ Extrait de Parfum Fragrances</h1>
        <p class="mt-2 text-ink/70">Discover our most celebrated signature fragrances crafted with 35%+ pure oil concentration for maximum longevity.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.filter(p => p.badge === 'bestseller' || p.id === 'purple-oud').map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes?id=${p.id}" class="block">
                <img src="${p.img}" alt="Sentire ${p.name} Best Seller" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <p class="text-xs text-ink/60">${p.desc}</p>
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[p.sizes.length - 1]]} (${p.sizes[p.sizes.length - 1]}ML)</p>
              </a>
            </article>
          `).join('')}
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Best Sellers", "item": `${PRODUCTION_DOMAIN}/bestsellers` }
          ]
        }
      ]
    })
  },
  {
    path: 'new-arrivals',
    title: 'New 35%+ Extrait de Parfum Arrivals | SENTIRE By PC',
    description: 'Discover new artisanal master releases formulated with 35%+ perfume oil concentration and complimentary laser photo engraving directly on the glass bottle.',
    ogTitle: 'New 35%+ Perfume Oil Releases | SENTIRE By PC',
    ogDescription: 'The latest high-concentration extraits de parfum with rare olfactory accords and bespoke laser flacon etching.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
    heading: 'New Extrait de Parfum Arrivals',
    subheading: 'Latest Artisanal Master Releases with 35%+ Fragrance Oils',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">New 35%+ Extrait de Parfum Arrivals</h1>
        <p class="mt-2 text-ink/70">Unveiling new master perfumery releases featuring rare olfactory accords and bespoke laser flacon etching.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.filter(p => p.badge === 'new' || p.badge === 'exclusive').map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes?id=${p.id}" class="block">
                <img src="${p.img}" alt="Sentire ${p.name} New Arrival" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <p class="text-xs text-ink/60">${p.desc}</p>
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[p.sizes.length - 1]]} (${p.sizes[p.sizes.length - 1]}ML)</p>
              </a>
            </article>
          `).join('')}
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "New Arrivals", "item": `${PRODUCTION_DOMAIN}/new-arrivals` }
          ]
        }
      ]
    })
  },
  {
    path: 'byob',
    title: 'Custom 35%+ Perfume Gift Box & Sets | SENTIRE By PC',
    description: 'Build a bespoke luxury discovery box with curated 10ml, 30ml, and 50ml extraits de parfum featuring 35%+ perfume oil concentration and luxury gift presentation.',
    ogTitle: 'Build Your Own 35%+ Extrait Discovery Box | SENTIRE By PC',
    ogDescription: 'Curate a personalized set of 35%+ high-concentration extraits de parfum with custom gift coffret presentation.',
    image: `${PRODUCTION_DOMAIN}/images/build-bundle.png`,
    heading: 'Build Your Own Luxury Discovery Box',
    subheading: 'Curate Your Bespoke 35%+ Extrait de Parfum Gift Set',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Custom 35%+ Perfume Discovery Sets & Gift Boxes</h1>
        <p class="mt-2 text-ink/70">Build your bespoke fragrance wardrobe by mixing and matching 10ml, 30ml, and 50ml flacons in our signature gold-embossed coffret packaging.</p>
        <p class="mt-4"><a href="/perfumes" class="text-gold font-semibold underline">Explore all perfumes to build your box</a></p>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Build Your Own Box", "item": `${PRODUCTION_DOMAIN}/byob` }
          ]
        }
      ]
    })
  },
  {
    path: 'personalisation',
    title: 'Photo & Name Engraved 35%+ Extrait Perfumes | SENTIRE By PC',
    description: 'Personalise your 35%+ high-concentration extrait de parfum bottle with precision photo or name laser engraving. Uncompromising longevity and bespoke luxury.',
    ogTitle: 'Bespoke Laser Photo & Name Engraving Atelier | SENTIRE By PC',
    ogDescription: 'Precision laser etching of customer photos and custom typography directly on 35%+ perfume oil extraits de parfum flacons.',
    image: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
    heading: 'Bespoke Perfume Bottle Laser Engraving Atelier',
    subheading: 'High-Precision Photo, Monogram & Name Laser Glass Etching in Jaipur',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Photo & Name Engraved 35%+ Extrait de Parfum Bottles</h1>
        <p class="mt-2 text-ink/70">Our Jaipur atelier provides complimentary high-definition laser bottle engraving on all 50ml flacons. Upload any photo, couple portrait, or custom name for permanent glass etching.</p>
        <div class="mt-8 space-y-4">
          <h2 class="text-2xl font-bold">Frequently Asked Questions</h2>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold">Can I engrave both a photograph and a name on the bottle?</h3>
            <p class="text-sm text-ink/70">Yes, our laser etching technology supports simultaneous portrait rendering and elegant typography.</p>
          </div>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold">Does bottle engraving delay shipping?</h3>
            <p class="text-sm text-ink/70">No. Engraving is completed in-house within 24 hours at our Jaipur facility.</p>
          </div>
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Personalisation", "item": `${PRODUCTION_DOMAIN}/personalisation` }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I engrave both a photograph and a name on the perfume bottle?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our laser etching technology supports simultaneous portrait rendering and elegant typography."
              }
            },
            {
              "@type": "Question",
              "name": "Does bottle engraving delay shipping?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Engraving is completed in-house within 24 hours at our Jaipur facility."
              }
            }
          ]
        }
      ]
    })
  },
  {
    path: 'pages/personalised-perfume',
    title: 'Personalised Perfumes with Photo & Name Bottle Engraving | SENTIRE By PC',
    description: 'Permanent optical laser bottle engraving on luxury 35%+ extraits de parfum. Upload couple portraits, personal photos, names or dates for complimentary glass etching.',
    ogTitle: 'Personalised Perfume with Laser Photo & Name Engraving | SENTIRE By PC',
    ogDescription: 'Discover bespoke laser photo flacon engraving in Jaipur. 100% complimentary on all 50ml 35%+ perfume oil extraits de parfum.',
    image: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
    heading: 'Personalised Perfumes & Flacon Laser Engraving Atelier',
    subheading: 'High-Definition Laser Photo Etching, Couple Portraits & Monograms on Luxury Perfume Bottles',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Personalised Perfumes with Photo & Name Bottle Engraving</h1>
        <p class="mt-4 text-ink/80 text-lg leading-relaxed">
          At <strong>SENTIRE By PC</strong>, fragrance is elevated into an intimate, permanent work of art. Our dedicated Jaipur engraving atelier uses optical laser technology to etch high-resolution photographs, couple portraits, names, wedding anniversaries, or custom monograms directly onto the glass flacon of every 50ml 35%+ Extrait de Parfum bottle.
        </p>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="border border-black/10 rounded-2xl p-6 bg-white shadow-sm">
            <h2 class="text-2xl font-bold text-ink">1. High-Definition Photo Engraving</h2>
            <p class="mt-2 text-ink/70">
              Upload any photograph from your phone—wedding memories, romantic couple portraits, anniversary pictures, or corporate logos. Our optical fiber lasers etch microscopic tonal gradations into the flacon glass without damaging the fragrance integrity.
            </p>
          </div>

          <div class="border border-black/10 rounded-2xl p-6 bg-white shadow-sm">
            <h2 class="text-2xl font-bold text-ink">2. Custom Typography & Monograms</h2>
            <p class="mt-2 text-ink/70">
              Etch initials, names, significant dates, or personal poetry. Choose from refined serif, modern sans-serif, or ornate script fonts permanently rendered in subtle translucent frost.
            </p>
          </div>
        </div>

        <div class="mt-12 bg-cream p-8 rounded-2xl border border-black/5">
          <h2 class="text-2xl font-bold text-ink">Why Personalised Perfume from SENTIRE By PC?</h2>
          <ul class="mt-4 space-y-3 text-ink/80">
            <li><strong>100% Complimentary:</strong> Laser bottle engraving is provided at no extra cost on all 50ml signature flacons.</li>
            <li><strong>Rare 35%+ Extrait Concentration:</strong> Your personalized bottle contains true artisanal extrait with 12+ hour beast-mode longevity.</li>
            <li><strong>Zero Delay Express Shipping:</strong> In-house Jaipur engraving is finished within 24 hours with express courier dispatch across India.</li>
            <li><strong>The Ultimate Luxury Gift:</strong> Perfect for weddings, Raksha Bandhan, Valentine's Day, anniversaries, and executive corporate gifting.</li>
          </ul>
          <p class="mt-6">
            <a href="/perfumes" class="inline-block bg-[#8C6228] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#a87c3b] transition">
              Choose a Fragrance to Personalise
            </a>
          </p>
        </div>

        <div class="mt-12 space-y-6">
          <h2 class="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold text-lg">How do I submit my photo for bottle engraving?</h3>
            <p class="text-ink/70 mt-1">Select any 50ml perfume on the store, click Personalise, and upload your high-resolution image directly or send it via WhatsApp after placing your order.</p>
          </div>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold text-lg">Will the laser engraving ever fade or peel off?</h3>
            <p class="text-ink/70 mt-1">No. The etching is permanently carved into the physical glass structure and will never peel, fade, or wash off.</p>
          </div>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold text-lg">Can I engrave on 10ml and 30ml sizes?</h3>
            <p class="text-ink/70 mt-1">Laser photo engraving is engineered specifically for our heavy 50ml glass flacons to ensure optical clarity and detail.</p>
          </div>
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Personalised Perfumes", "item": `${PRODUCTION_DOMAIN}/pages/personalised-perfume` }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I submit my photo for perfume bottle engraving?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Select any 50ml perfume on the store, click Personalise, and upload your high-resolution image directly or send it via WhatsApp after placing your order."
              }
            },
            {
              "@type": "Question",
              "name": "Will the laser engraving ever fade or peel off?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. The etching is permanently carved into the physical glass structure and will never peel, fade, or wash off."
              }
            }
          ]
        }
      ]
    })
  },
  {
    path: 'pages/35-percent-extrait-de-parfum',
    title: '35%+ Extrait de Parfum Concentration Explained | SENTIRE By PC',
    description: 'Why 35%+ pure perfume oil concentration outlasts standard 12-18% Eau de Parfum. Understand the science of sillage, longevity, and climate engineering.',
    ogTitle: 'Why 35%+ Extrait de Parfum Outlasts Standard Perfumes | SENTIRE By PC',
    ogDescription: 'The difference between 15% EDP and 35%+ Extrait de Parfum in tropical climates. Higher oil concentration, zero alcohol blast, and 12+ hour sillage.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'The 35%+ Extrait de Parfum Craftsmanship Standard',
    subheading: 'Why SENTIRE Refuses to Dilute Fragrances to 15% Eau de Parfum',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">35%+ Extrait de Parfum Concentration Explained</h1>
        <p class="mt-4 text-ink/80 text-lg leading-relaxed">
          In commercial perfumery, most luxury designer fragrances are formulated as <strong>Eau de Parfum (EDP)</strong> containing only 12% to 18% aromatic oil compounds, with the remainder consisting of denatured alcohol and water. While cheap to produce, low-concentration perfumes evaporate rapidly in hot and humid climates like India.
        </p>

        <div class="mt-8 border border-black/10 rounded-2xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse text-sm">
            <thead class="bg-black/5 text-ink">
              <tr>
                <th class="p-4 font-bold border-b border-black/10">Fragrance Grade</th>
                <th class="p-4 font-bold border-b border-black/10">Oil Concentration</th>
                <th class="p-4 font-bold border-b border-black/10">Typical Longevity</th>
                <th class="p-4 font-bold border-b border-black/10">Hot Climate Performance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-black/10 text-ink/80">
              <tr>
                <td class="p-4">Eau de Cologne (EDC)</td>
                <td class="p-4">3% – 5%</td>
                <td class="p-4">1 – 2 Hours</td>
                <td class="p-4">Fades instantly</td>
              </tr>
              <tr>
                <td class="p-4">Eau de Toilette (EDT)</td>
                <td class="p-4">5% – 12%</td>
                <td class="p-4">3 – 5 Hours</td>
                <td class="p-4">Weak projection</td>
              </tr>
              <tr>
                <td class="p-4">Eau de Parfum (EDP)</td>
                <td class="p-4">12% – 18%</td>
                <td class="p-4">5 – 7 Hours</td>
                <td class="p-4">Moderate fade</td>
              </tr>
              <tr class="bg-[#8C6228]/10 font-semibold text-ink">
                <td class="p-4">SENTIRE Extrait de Parfum</td>
                <td class="p-4">35%+ Pure Fragrance Oil</td>
                <td class="p-4">12+ Hours (Days on fabric)</td>
                <td class="p-4">Beast-Mode Trail</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-12 space-y-6">
          <h2 class="text-2xl font-bold text-ink">The Sillage Science of 35%+ Concentration</h2>
          <p class="text-ink/80 leading-relaxed">
            By infusing <strong>35%+ pure perfume oil</strong> into every batch in Jaipur, SENTIRE By PC slows the molecular evaporation curve. Top notes of Italian citrus and exotic spices transition smoothly into luscious floral and gourmand hearts without an overwhelming alcohol spike. The rich base notes—such as Cambodian agarwood, Mysore sandalwood, and warm amber—cling intimately to skin and textile fibers for over 24 hours.
          </p>
          <p class="mt-4">
            <a href="/perfumes" class="inline-block bg-[#8C6228] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#a87c3b] transition">
              Explore 35%+ Extraits de Parfum
            </a>
          </p>
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "35%+ Extrait Standard", "item": `${PRODUCTION_DOMAIN}/pages/35-percent-extrait-de-parfum` }
          ]
        }
      ]
    })
  },
  {
    path: 'about',
    title: 'About Sentire by PC | 35%+ Pure Oil Fragrance House Jaipur',
    description: 'Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India\'s only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.',
    ogTitle: 'The 35%+ Perfume Oil Craftsmanship | SENTIRE By PC',
    ogDescription: 'Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'The House of SENTIRE By PC',
    subheading: 'Haute Parfumerie Jaipur · 35%+ Oil Concentration Craftsmanship',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">About SENTIRE By PC — Jaipur Haute Parfumerie</h1>
        <p class="mt-2 text-ink/70">Born in the heritage city of Jaipur, Sentire by PC was founded with a singular conviction: luxury fragrance must never compromise on raw concentration. Where standard commercial perfumes dilute to 12-18% EDP, Sentire bottles pure 35%+ Extrait de Parfum.</p>
        <p class="mt-4 text-ink/70">With over 10,000 flacons handcrafted in our atelier and trusted across India, Sentire merges the rich heritage of Rajasthan with modern optical laser technology.</p>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${PRODUCTION_DOMAIN}/about` }
          ]
        }
      ]
    })
  },
  {
    path: 'client-services',
    title: 'Client Services & Express Delivery | SENTIRE By PC',
    description: 'Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.',
    ogTitle: 'Private Client Concierge & Support | SENTIRE By PC',
    ogDescription: 'Dedicated concierge for Sentire by PC artisanal extraits de parfum and custom engraved orders.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'Private Client Concierge & Services',
    subheading: 'Shipping, Returns, Corporate Gifting & Care Guidance',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Sentire Client Services & Support</h1>
        <p class="mt-2 text-ink/70">Our Jaipur concierge is available Monday to Saturday, 10 AM to 7 PM to assist with orders, tracking, and corporate gifting.</p>
        <div class="mt-8 space-y-4">
          <h2 class="text-2xl font-bold">Client FAQs</h2>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold">How can I track my order?</h3>
            <p class="text-sm text-ink/70">Enter your order ID or tracking AWB on our Track Order page for real-time Bluedart/Delhivery status.</p>
          </div>
          <div class="border-t border-black/10 pt-4">
            <h3 class="font-bold">What is your shipping timeframe?</h3>
            <p class="text-sm text-ink/70">Orders are dispatched within 24 hours from Jaipur and delivered within 2-4 business days across India.</p>
          </div>
        </div>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Client Services", "item": `${PRODUCTION_DOMAIN}/client-services` }
          ]
        }
      ]
    })
  },
  {
    path: 'track-order',
    title: 'Track Your Perfume Order | SENTIRE By PC',
    description: 'Track real-time courier status and express delivery updates for your Sentire by PC 35%+ extrait de parfum and laser-engraved orders.',
    ogTitle: 'Track Your Order | SENTIRE By PC',
    ogDescription: 'Live tracking for your Sentire luxury perfume shipment.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'Track Your Luxury Perfume Shipment',
    subheading: 'Live Courier Updates with Express Insurance',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Track Your Fragrance Shipment</h1>
        <p class="mt-2 text-ink/70">Enter your Sentire Order Number (e.g. SNT-12345) to view live courier tracking updates.</p>
      </section>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Track Order", "item": `${PRODUCTION_DOMAIN}/track-order` }
          ]
        }
      ]
    })
  }
];

// Add individual product static routes for all fragrances
PERFUMES_DATA.forEach(p => {
  routes.push({
    path: `products/${p.id}`,
    title: `${p.name} Extrait de Parfum | ${p.subtitle} | SENTIRE By PC`,
    description: `Crafted with rare 35%+ pure perfume oil concentration for 12+ hour sillage. Customise ${p.name} (${p.subtitle}) with complimentary laser photo or name bottle engraving in Jaipur.`,
    ogTitle: `${p.name} Extrait de Parfum (${p.subtitle}) | SENTIRE By PC`,
    ogDescription: `Artisanal 35%+ perfume oil Extrait de Parfum outlasting standard 15% EDPs. Precision laser bottle etching and express delivery across India.`,
    image: `${PRODUCTION_DOMAIN}${p.img.split('?')[0]}`,
    heading: `${p.name} Extrait de Parfum`,
    subheading: `35%+ Perfume Oil Concentration · ${p.desc}`,
    contentHtml: `
      <article class="max-w-5xl mx-auto px-4 py-8">
        <header>
          <p class="text-xs font-semibold text-gold uppercase tracking-widest">${p.num} · ${p.scentFamily} Fragrance</p>
          <h1 class="text-3xl md:text-4xl font-bold text-ink mt-1">${p.name} Extrait de Parfum</h1>
          <p class="text-lg text-ink/70 mt-2">${p.desc}</p>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <img src="${p.img}" alt="SENTIRE ${p.name} 35% Extrait de Parfum Flacon" class="w-full aspect-square object-contain bg-white rounded-2xl border border-black/10" width="400" height="400" />
          </div>
          <div class="space-y-4">
            <h2 class="text-xl font-bold text-ink">Olfactory Profile & Longevity</h2>
            <p class="text-ink/80 leading-relaxed">${p.fullDesc}</p>
            <div class="border-t border-black/10 pt-3">
              <h3 class="font-bold text-sm text-ink">Signature Accords & Notes</h3>
              <p class="text-sm text-ink/70">${p.traces.join(' · ')}</p>
            </div>
            <div class="border-t border-black/10 pt-3">
              <h3 class="font-bold text-sm text-ink">Available Sizes & Pricing</h3>
              <ul class="text-sm text-ink/70 mt-1">
                ${p.sizes.map(s => `<li><strong>${s}ml Flacon:</strong> ₹${p.prices[s]}</li>`).join('')}
              </ul>
            </div>
            <div class="pt-4">
              <a href="/perfumes?id=${p.id}" class="inline-block bg-[#8C6228] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#a87c3b] transition">
                Order ${p.name} Online with Free Engraving
              </a>
            </div>
          </div>
        </div>
      </article>
    `,
    getSchema: () => ({
      "@context": "https://schema.org",
      "@graph": [
        ORGANIZATION_SCHEMA,
        STORE_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${PRODUCTION_DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Perfumes", "item": `${PRODUCTION_DOMAIN}/perfumes` },
            { "@type": "ListItem", "position": 3, "name": p.name, "item": `${PRODUCTION_DOMAIN}/perfumes?id=${p.id}` }
          ]
        },
        generateProductSchemaJson(p)
      ]
    })
  });
});

function generateHtml(templateHtml, route) {
  let html = templateHtml;
  const canonicalUrl = route.path.startsWith('products/')
    ? `${PRODUCTION_DOMAIN}/perfumes?id=${route.path.replace('products/', '')}`
    : `${PRODUCTION_DOMAIN}/${route.path}`;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${route.description}" />`);
  
  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  
  // Replace OG tags
  html = html.replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${route.ogTitle}" />`);
  html = html.replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${route.ogDescription}" />`);
  html = html.replace(/<meta property="og:image" content="[\s\S]*?" \/>/, `<meta property="og:image" content="${route.image}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:url" content="[\s\S]*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${route.ogTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${route.ogDescription}" />`);
  html = html.replace(/<meta name="twitter:image" content="[\s\S]*?" \/>/, `<meta name="twitter:image" content="${route.image}" />`);

  // Replace JSON-LD schema
  if (route.getSchema) {
    const schemaJson = JSON.stringify(route.getSchema(), null, 2);
    html = html.replace(
      /<script type="application\/ld\+json" id="sentire-dynamic-jsonld">[\s\S]*?<\/script>/,
      `<script type="application/ld+json" id="sentire-dynamic-jsonld">\n${schemaJson}\n    </script>`
    );
  }

  // Pre-render semantic HTML inside root for crawlers
  if (route.contentHtml) {
    // If index.html already has noscript in root, replace it
    if (html.includes('<div id="root"><noscript>')) {
      html = html.replace(/<div id="root"><noscript>[\s\S]*?<\/noscript><\/div>/, `<div id="root"><noscript>${route.contentHtml}</noscript></div>`);
    } else {
      html = html.replace('<div id="root"></div>', `<div id="root"><noscript>${route.contentHtml}</noscript></div>`);
    }
  }

  return html;
}

export function buildStaticRoutes() {
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Generate in public directory
  routes.forEach(route => {
    const routeDir = path.resolve(publicDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const routeHtml = generateHtml(baseHtml, route);
    fs.writeFileSync(path.resolve(routeDir, 'index.html'), routeHtml, 'utf8');
    fs.writeFileSync(path.resolve(publicDir, `${route.path}.html`), routeHtml, 'utf8');
    console.log(`Generated public/${route.path}/index.html and public/${route.path}.html`);
  });

  // 2. If dist exists, also generate in dist directory with built assets
  if (fs.existsSync(distDir)) {
    const distIndexHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf8');
    routes.forEach(route => {
      const distRouteDir = path.resolve(distDir, route.path);
      if (!fs.existsSync(distRouteDir)) {
        fs.mkdirSync(distRouteDir, { recursive: true });
      }
      const distRouteHtml = generateHtml(distIndexHtml, route);
      fs.writeFileSync(path.resolve(distRouteDir, 'index.html'), distRouteHtml, 'utf8');
      fs.writeFileSync(path.resolve(distDir, `${route.path}.html`), distRouteHtml, 'utf8');
      console.log(`Generated dist/${route.path}/index.html and dist/${route.path}.html`);
    });
  }
}

buildStaticRoutes();
