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
  const canonicalUrl = `${PRODUCTION_DOMAIN}/perfumes/${p.id}`;
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
      "description": `${p.desc} — 35%+ pure perfume oil concentration formulated in Jaipur. Includes complimentary laser photo/name bottle engraving on 50ml flacons.`,
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": p.prices[size] || 1499,
        "availability": "https://schema.org/InStock",
        "seller": { "@id": `${PRODUCTION_DOMAIN}/#organization` }
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Perfume Oil Concentration", "value": "35%+" },
        { "@type": "PropertyValue", "name": "Personalisation", "value": size === 50 ? "Complimentary Laser Photo & Name Engraving" : "Standard Luxury Flacon" },
        { "@type": "PropertyValue", "name": "Fragrance Family", "value": p.scentFamily }
      ]
    }))
  };
}

const routes = [
  {
    path: 'perfumes',
    title: 'All Perfumes | 35%+ Extrait de Parfum | SENTIRE By PC',
    description: 'Explore the complete collection of 35%+ pure perfume oil extraits de parfum with complimentary laser photo flacon engraving in Jaipur.',
    ogTitle: 'All Perfumes | SENTIRE By PC',
    ogDescription: 'Explore the complete collection of 35%+ pure perfume oil extraits de parfum with complimentary laser photo flacon engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
    heading: 'All Perfumes',
    subheading: 'Rare 35%+ Perfume Oil Concentration · Eternal Sillage · Jaipur Atelier Craftsmanship',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">All Perfumes — 35%+ Extrait de Parfum Collection</h1>
        <p class="mt-2 text-ink/70">Every bottle by SENTIRE By PC is formulated with 35%+ pure perfume oil concentration for superior 12+ hour sillage. Complimentary photo and name laser engraving is available on all 50ml flacons.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes/${p.id}" class="block">
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
            { "@type": "ListItem", "position": 2, "name": "All Perfumes", "item": `${PRODUCTION_DOMAIN}/perfumes` }
          ]
        },
        {
          "@type": "ItemList",
          "name": "SENTIRE Extrait de Parfum Collection",
          "numberOfItems": PERFUMES_DATA.length,
          "itemListElement": PERFUMES_DATA.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${PRODUCTION_DOMAIN}/perfumes/${p.id}`,
            "name": `SENTIRE ${p.name} Extrait de Parfum`
          }))
        },
        ...PERFUMES_DATA.map(generateProductSchemaJson)
      ]
    })
  },
  {
    path: 'bestsellers',
    title: 'Best Sellers | SENTIRE By PC',
    description: 'Discover SENTIRE By PC best-selling extraits de parfum, including our most-loved oud, woody, fresh and signature fragrances.',
    ogTitle: 'Best Sellers | SENTIRE By PC',
    ogDescription: 'Discover SENTIRE By PC best-selling extraits de parfum, including our most-loved oud, woody, fresh and signature fragrances.',
    image: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
    heading: 'Best Sellers',
    subheading: 'Curated Customer Favorites · 35%+ Perfume Oil Concentration',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Best Sellers</h1>
        <p class="mt-2 text-ink/70">Discover SENTIRE By PC best-selling extraits de parfum, including our most-loved oud, woody, fresh and signature fragrances.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.filter(p => p.badge === 'bestseller').map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes/${p.id}">
                <img src="${p.img}" alt="Sentire ${p.name} Best Seller Perfume" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <p class="text-xs text-ink/60">${p.desc}</p>
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[0]]}</p>
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
    title: 'New Arrivals | SENTIRE By PC',
    description: 'Explore the latest fragrance launches and new extrait de parfum creations from SENTIRE By PC.',
    ogTitle: 'New Arrivals | SENTIRE By PC',
    ogDescription: 'Explore the latest fragrance launches and new extrait de parfum creations from SENTIRE By PC.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
    heading: 'New Arrivals',
    subheading: 'Latest High-Concentration Master Creations',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">New Arrivals</h1>
        <p class="mt-2 text-ink/70">Explore the latest fragrance launches and new extrait de parfum creations from SENTIRE By PC.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          ${PERFUMES_DATA.filter(p => p.badge === 'new').map(p => `
            <article class="border border-black/10 rounded-2xl p-4 bg-white">
              <a href="/perfumes/${p.id}">
                <img src="${p.img}" alt="Sentire ${p.name} New Arrival Perfume" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
                <h2 class="text-xl font-bold mt-3">${p.name}</h2>
                <p class="text-xs text-ink/60">${p.desc}</p>
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[0]]}</p>
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
    title: 'Build Your Own Bundle | SENTIRE By PC',
    description: 'Create your own SENTIRE perfume bundle. Choose your favourite fragrances and build a personalised set from our extrait de parfum collection.',
    ogTitle: 'Build Your Own Bundle | SENTIRE By PC',
    ogDescription: 'Create your own SENTIRE perfume bundle. Choose your favourite fragrances and build a personalised set from our extrait de parfum collection.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'Build Your Own Bundle',
    subheading: 'Curate 2 to 4 Extraits de Parfum with Automatic Multi-Bottle Savings',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Build Your Own Bundle</h1>
        <p class="mt-2 text-ink/70">Create your own SENTIRE perfume bundle. Choose your favourite fragrances and build a personalised set from our extrait de parfum collection.</p>
        <div class="mt-6 p-6 bg-cream border border-black/10 rounded-2xl">
          <h2 class="text-xl font-bold">Bundle Savings Structure:</h2>
          <ul class="mt-3 space-y-2 text-ink/80">
            <li><strong>2 Bottles:</strong> Instant ₹150 OFF</li>
            <li><strong>3 Bottles:</strong> Instant ₹250 OFF</li>
            <li><strong>4 Bottles:</strong> Instant ₹400 OFF</li>
            <li><strong>Plus:</strong> 5% extra discount on all UPI / Prepaid checkouts.</li>
          </ul>
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
            { "@type": "ListItem", "position": 2, "name": "Build Your Own Bundle", "item": `${PRODUCTION_DOMAIN}/byob` }
          ]
        }
      ]
    })
  },
  {
    path: 'personalised-perfume',
    title: 'Product Personalisation | SENTIRE By PC',
    description: 'Personalise your SENTIRE perfume with photo and name laser engraving. 100% complimentary on all 50ml extraits de parfum in Jaipur.',
    ogTitle: 'Product Personalisation | SENTIRE By PC',
    ogDescription: 'Personalise your SENTIRE perfume with photo and name laser engraving. 100% complimentary on all 50ml extraits de parfum in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
    heading: 'Product Personalisation',
    subheading: 'Personalise your SENTIRE perfume with photo and name laser engraving.',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <header>
          <h1 class="text-3xl md:text-4xl font-bold text-ink">Product Personalisation</h1>
          <p class="mt-3 text-lg text-ink/80 leading-relaxed">
            Personalise your SENTIRE perfume with photo and name laser engraving. At <strong>SENTIRE By PC</strong>, our dedicated Jaipur atelier provides complimentary high-precision laser engraving on every 50ml signature perfume bottle. Personalise your fragrance with a cherished photograph, couple portrait, custom name, wedding date, or initials permanently etched directly onto the glass flacon.
          </p>
        </header>

        <div class="mt-10 space-y-12">
          <section aria-labelledby="turn-memories">
            <h2 id="turn-memories" class="text-2xl font-bold text-ink">Turn Your Memories Into an Engraved Perfume Bottle</h2>
            <p class="mt-2 text-ink/70 leading-relaxed">
              High-precision laser engraving permanently etches your selected photograph and text directly onto the glass bottle. The frosted etching is durable, elegant, and will never peel, fade, or wash off.
            </p>
          </section>

          <section aria-labelledby="how-it-works">
            <h2 id="how-it-works" class="text-2xl font-bold text-ink">How Image Engraving Works</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">1. Choose Fragrance</h3>
                <p class="text-sm text-ink/70 mt-1">Select from our 35%+ pure perfume oil collection (e.g. White Oud, Dapper, Purple Oud, Calantha).</p>
              </div>
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">2. Select 50ml Flacon</h3>
                <p class="text-sm text-ink/70 mt-1">Personalisation is 100% complimentary on all 50ml signature heavy glass bottles.</p>
              </div>
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">3. Upload Image / Photo</h3>
                <p class="text-sm text-ink/70 mt-1">Upload your favorite photograph, couple portrait, wedding snapshot, or custom artwork directly.</p>
              </div>
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">4. Laser Precision Calibration</h3>
                <p class="text-sm text-ink/70 mt-1">Our technician optimizes photo contrast and typography alignment for maximum visual clarity on glass.</p>
              </div>
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">5. Permanent Glass Etching</h3>
                <p class="text-sm text-ink/70 mt-1">Permanent high-resolution engraving is crafted in-house in our Jaipur atelier.</p>
              </div>
              <div class="border border-black/10 rounded-2xl p-5 bg-white">
                <h3 class="font-bold text-gold text-lg">6. Velvet Presentation Box</h3>
                <p class="text-sm text-ink/70 mt-1">Packaged in our signature warm nude luxury presentation box ready for gifting.</p>
              </div>
            </div>
            <p class="mt-4 text-sm font-semibold text-ink">
              7. <strong>Express Dispatch Across India:</strong> Engraving is completed within 24 hours in Jaipur with insured express shipping.
            </p>
          </section>

          <section aria-labelledby="photo-engraving-tech">
            <h2 id="photo-engraving-tech" class="text-2xl font-bold text-ink">Photo Engraving Requirements & Technology</h2>
            <p class="mt-2 text-ink/70 leading-relaxed">
              Any clear, well-lit digital photo taken with a smartphone or camera works beautifully. We recommend high-contrast portraits, couple photos, or pet images against clear backgrounds. Our software dynamically balances shadow and highlight tones to ensure facial expressions and fine hair strands are razor sharp on glass.
            </p>
          </section>

          <section aria-labelledby="name-engraving-tech">
            <h2 id="name-engraving-tech" class="text-2xl font-bold text-ink">Name & Typography Engraving</h2>
            <p class="mt-2 text-ink/70 leading-relaxed">
              Pair your photograph with custom name typography, romantic anniversary dates, initials, or bespoke poetry. Choose between classic serif, contemporary minimalist sans, or elegant calligraphy.
            </p>
          </section>

          <section aria-labelledby="why-sentire-personalisation">
            <h2 id="why-sentire-personalisation" class="text-2xl font-bold text-ink">Why Choose a Personalised SENTIRE Perfume</h2>
            <ul class="mt-3 space-y-2 text-ink/80">
              <li>• <strong>100% Complimentary:</strong> Never pay extra fees for custom photo or name etching on 50ml bottles.</li>
              <li>• <strong>35%+ Pure Fragrance Oil:</strong> The world-class fragrance inside outlasts standard 15% EDPs for 12+ hours.</li>
              <li>• <strong>Jaipur Craftsmanship:</strong> Handcrafted and engraved in-house in Rajasthan with rigorous quality control.</li>
            </ul>
          </section>

          <section aria-labelledby="perfect-for-gifting">
            <h2 id="perfect-for-gifting" class="text-2xl font-bold text-ink">Perfect for Gifting</h2>
            <p class="mt-2 text-ink/70">
              An engraved perfume bottle is one of the most emotional, memorable gifts you can give. Ideal for:
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm font-semibold text-ink">
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">🎂 Birthdays</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">💍 Anniversaries & Weddings</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">💖 Valentine's Day</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">🪢 Raksha Bandhan</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">👩‍❤️‍👨 Couple Keepsakes</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">🤝 Friendship Milestones</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">🏢 VIP Corporate Gifting</div>
              <div class="p-3 bg-white border border-black/10 rounded-xl text-center">🎓 Graduations & Promotions</div>
            </div>
          </section>

          <section aria-labelledby="faqs-heading">
            <h2 id="faqs-heading" class="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
            <div class="space-y-4 mt-4">
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Can I engrave a photograph onto the perfume bottle?</h3>
                <p class="text-ink/70 mt-1">Yes! Our high-precision optical fiber laser etches portraits, couple photos, pet pictures, or custom logos directly into the glass with micro-detail.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">What type of photo works best?</h3>
                <p class="text-ink/70 mt-1">Clear, well-lit digital photos with good contrast between the subjects and background render with the highest visual clarity.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Can I engrave both an image and a name?</h3>
                <p class="text-ink/70 mt-1">Yes, our laser system supports simultaneous portrait rendering and custom name/date typography on the same flacon.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Does engraving fade or wash off?</h3>
                <p class="text-ink/70 mt-1">No. The etching is permanently engraved into the glass flacon and will never peel, fade, or wash off.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Which perfume bottle sizes support image engraving?</h3>
                <p class="text-ink/70 mt-1">Image and photo engraving is available exclusively on our heavy 50ml signature flacons to ensure sufficient glass surface area and optical clarity.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">How long does personalization take?</h3>
                <p class="text-ink/70 mt-1">All engraving is performed in-house at our Jaipur atelier within 24 hours, ensuring zero shipping delays.</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Can I preview my engraving?</h3>
                <p class="text-ink/70 mt-1">Yes, you can upload your photo during checkout or preview the layout with our concierge on WhatsApp (+91 99508 91935).</p>
              </div>
              <div class="border-t border-black/10 pt-4">
                <h3 class="font-bold text-lg">Is image engraving available for every fragrance?</h3>
                <p class="text-ink/70 mt-1">Yes! All 50ml perfumes in our catalogue are eligible for complimentary photo and name laser bottle engraving.</p>
              </div>
            </div>
          </section>

          <div class="pt-6 text-center">
            <a href="/perfumes" class="inline-block bg-[#8C6228] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#a87c3b] transition">
              Select Your 50ml Perfume & Personalise Now
            </a>
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
            { "@type": "ListItem", "position": 2, "name": "Personalised Perfumes", "item": `${PRODUCTION_DOMAIN}/personalised-perfume` }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I engrave a photograph onto the perfume bottle?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our high-precision optical fiber laser etches portraits, couple photos, pet pictures, or custom logos directly into the glass with micro-detail."
              }
            },
            {
              "@type": "Question",
              "name": "What type of photo works best?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Clear, well-lit digital photos with good contrast between the subjects and background render with the highest visual clarity."
              }
            },
            {
              "@type": "Question",
              "name": "Can I engrave both an image and a name?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our laser system supports simultaneous portrait rendering and custom name/date typography on the same flacon."
              }
            },
            {
              "@type": "Question",
              "name": "Does engraving fade or wash off?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. The etching is permanently engraved into the glass flacon and will never peel, fade, or wash off."
              }
            },
            {
              "@type": "Question",
              "name": "Which perfume bottle sizes support image engraving?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Image and photo engraving is available exclusively on our heavy 50ml signature flacons to ensure sufficient glass surface area and optical clarity."
              }
            },
            {
              "@type": "Question",
              "name": "How long does personalization take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All engraving is performed in-house at our Jaipur atelier within 24 hours, ensuring zero shipping delays."
              }
            },
            {
              "@type": "Question",
              "name": "Can I preview my engraving?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can upload your photo during checkout or preview the layout with our concierge on WhatsApp (+91 99508 91935)."
              }
            },
            {
              "@type": "Question",
              "name": "Is image engraving available for every fragrance?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All 50ml perfumes in our catalogue are eligible for complimentary photo and name laser bottle engraving."
              }
            }
          ]
        }
      ]
    })
  },
  {
    path: 'pages/personalised-perfume',
    title: 'Personalised Perfume with Photo Engraving | SENTIRE By PC',
    description: 'Turn your memories into an engraved perfume bottle. Laser photo and name bottle engraving on 35%+ extraits de parfum in Jaipur.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/personalised-perfume`,
    ogTitle: 'Personalised Perfume with Photo & Name Engraving | SENTIRE By PC',
    ogDescription: 'Permanent optical laser photo etching and name engraving directly on luxury 35%+ perfume oil glass flacons in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
    heading: 'Personalised Perfumes & Flacon Laser Engraving Atelier',
    subheading: 'High-Definition Laser Photo Etching, Couple Portraits & Monograms',
    contentHtml: `<p>Redirecting to <a href="/personalised-perfume">Personalised Perfumes</a>...</p>`
  },
  {
    path: 'extrait-de-parfum',
    title: 'Extrait de Parfum India | 35%+ Pure Fragrance Oil | SENTIRE By PC',
    description: 'Why 35%+ pure perfume oil concentration outlasts standard 12-18% Eau de Parfum. Understand the science of sillage, longevity, and climate engineering.',
    ogTitle: 'Why 35%+ Extrait de Parfum Outlasts Standard Perfumes | SENTIRE By PC',
    ogDescription: 'The difference between 15% EDP and 35%+ Extrait de Parfum in tropical climates. Higher oil concentration, zero alcohol blast, and 12+ hour sillage.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: '35%+ Extrait de Parfum Standard | The Science of Sillage',
    subheading: 'Why SENTIRE Refuses to Dilute Fragrances to 15% Eau de Parfum',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <header>
          <h1 class="text-3xl md:text-4xl font-bold text-ink">35%+ Extrait de Parfum Standard | The Science of Sillage</h1>
          <p class="mt-4 text-ink/80 text-lg leading-relaxed">
            In commercial perfumery, most designer perfumes are diluted to <strong>Eau de Parfum (EDP)</strong> containing only 12% to 18% fragrance compounds, with the rest being denatured alcohol and water. While inexpensive to bottle, low-concentration perfumes evaporate within hours in warm and humid Indian climates.
          </p>
        </header>

        <div class="mt-8 border border-black/10 rounded-2xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse text-sm">
            <thead class="bg-black/5 text-ink">
              <tr>
                <th class="p-4 font-bold border-b border-black/10">Fragrance Grade</th>
                <th class="p-4 font-bold border-b border-black/10">Oil Concentration</th>
                <th class="p-4 font-bold border-b border-black/10">Typical Longevity</th>
                <th class="p-4 font-bold border-b border-black/10">Performance in Tropical Climates</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-black/10 text-ink/80">
              <tr>
                <td class="p-4">Eau de Cologne (EDC)</td>
                <td class="p-4">3% – 5%</td>
                <td class="p-4">1 – 2 Hours</td>
                <td class="p-4">Fades almost instantly</td>
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
            By infusing <strong>35%+ pure perfume oil</strong> into every batch in Jaipur, SENTIRE By PC slows the molecular evaporation curve. Top notes transition smoothly into luscious floral and gourmand hearts without an overwhelming alcohol spike. The rich base notes—such as Cambodian agarwood, Mysore sandalwood, and warm amber—cling intimately to skin and textile fibers for over 24 hours.
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
            { "@type": "ListItem", "position": 2, "name": "35%+ Extrait Standard", "item": `${PRODUCTION_DOMAIN}/extrait-de-parfum` }
          ]
        }
      ]
    })
  },
  {
    path: 'pages/35-percent-extrait-de-parfum',
    title: 'Extrait de Parfum India | 35%+ Pure Fragrance Oil | SENTIRE By PC',
    description: 'Why 35%+ pure perfume oil concentration outlasts standard 12-18% Eau de Parfum. Understand the science of sillage, longevity, and climate engineering.',
    canonicalUrl: `${PRODUCTION_DOMAIN}/extrait-de-parfum`,
    ogTitle: 'Why 35%+ Extrait de Parfum Outlasts Standard Perfumes | SENTIRE By PC',
    ogDescription: 'The difference between 15% EDP and 35%+ Extrait de Parfum in tropical climates.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: '35%+ Extrait de Parfum Concentration Explained',
    subheading: 'Why SENTIRE Refuses to Dilute Fragrances to 15% Eau de Parfum',
    contentHtml: `<p>Redirecting to <a href="/extrait-de-parfum">35%+ Extrait de Parfum Standard</a>...</p>`
  },
  {
    path: 'about',
    title: 'About SENTIRE | Jaipur Haute Parfumerie | SENTIRE By PC',
    description: 'Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India\'s only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.',
    ogTitle: 'About SENTIRE | SENTIRE By PC',
    ogDescription: 'Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'About SENTIRE',
    subheading: 'Haute Parfumerie Jaipur · 35%+ Oil Concentration Craftsmanship',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">About SENTIRE — Jaipur Haute Parfumerie</h1>
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
            { "@type": "ListItem", "position": 2, "name": "About SENTIRE", "item": `${PRODUCTION_DOMAIN}/about` }
          ]
        }
      ]
    })
  },
  {
    path: 'client-services',
    title: 'Client Services & Express Delivery | SENTIRE By PC',
    description: 'Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.',
    ogTitle: 'Client Services | SENTIRE By PC',
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
    title: 'Track Your Order | SENTIRE By PC',
    description: 'Track your SENTIRE By PC order and view the latest delivery status.',
    ogTitle: 'Track Your Order | SENTIRE By PC',
    ogDescription: 'Track your SENTIRE By PC order and view the latest delivery status.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
    heading: 'Track Your Order',
    subheading: 'Live Courier Updates with Express Insurance',
    contentHtml: `
      <section class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-ink">Track Your Order</h1>
        <p class="mt-2 text-ink/70">Track your SENTIRE By PC order and view the latest delivery status. Enter your Sentire Order Number (e.g. SNT-12345) to view live courier tracking updates.</p>
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
            { "@type": "ListItem", "position": 2, "name": "Track Your Order", "item": `${PRODUCTION_DOMAIN}/track-order` }
          ]
        }
      ]
    })
  }
];

// Add individual permanent product static routes for all fragrances: /perfumes/[id]
PERFUMES_DATA.forEach(p => {
  routes.push({
    path: `perfumes/${p.id}`,
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
            <img src="${p.img}" alt="SENTIRE ${p.name} 35% Extrait de Parfum Flacon with Laser Photo Engraving" class="w-full aspect-square object-contain bg-white rounded-2xl border border-black/10" width="400" height="400" />
          </div>
          <div class="space-y-4">
            <h2 class="text-xl font-bold text-ink">Olfactory Profile & Longevity</h2>
            <p class="text-ink/80 leading-relaxed">${p.fullDesc}</p>
            <div class="border-t border-black/10 pt-3">
              <h3 class="font-bold text-sm text-ink">Signature Accords & Notes</h3>
              <p class="text-sm text-ink/70">${p.traces.join(' · ')}</p>
            </div>
            <div class="border-t border-black/10 pt-3">
              <h3 class="font-bold text-sm text-ink">Fragrance Specifications</h3>
              <ul class="text-sm text-ink/70 mt-1 space-y-1">
                <li><strong>Concentration:</strong> 35%+ Pure Perfume Oil (Extrait de Parfum)</li>
                <li><strong>Sillage:</strong> 12+ Hours Longevity (Days on textile fabrics)</li>
                <li><strong>Personalisation:</strong> 100% Complimentary Laser Photo & Name Flacon Engraving</li>
                <li><strong>Origin:</strong> Handcrafted in Jaipur Atelier, Rajasthan</li>
              </ul>
            </div>
            <div class="border-t border-black/10 pt-3">
              <h3 class="font-bold text-sm text-ink">Available Sizes & Pricing</h3>
              <ul class="text-sm text-ink/70 mt-1">
                ${p.sizes.map(s => `<li><strong>${s}ml Flacon:</strong> ₹${p.prices[s]}</li>`).join('')}
              </ul>
            </div>
            <div class="pt-4 flex flex-wrap gap-3">
              <a href="/perfumes/${p.id}" class="inline-block bg-[#8C6228] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#a87c3b] transition">
                Order ${p.name} with Free Photo Engraving
              </a>
              <a href="/personalised-perfume" class="inline-block border border-[#8C6228] text-[#8C6228] px-6 py-3 rounded-full font-bold hover:bg-[#8C6228]/5 transition">
                Learn About Photo Engraving
              </a>
            </div>
          </div>
        </div>
        <nav class="mt-12 pt-8 border-t border-black/10 text-center" aria-label="Explore Sentire Collections">
          <p class="text-xs font-bold uppercase tracking-widest text-[#8C6228]">Explore SENTIRE</p>
          <div class="mt-4 flex flex-wrap justify-center gap-3 text-xs font-semibold">
            <a href="/perfumes" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">All Perfumes</a>
            <a href="/bestsellers" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">Best Sellers</a>
            <a href="/new-arrivals" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">New Arrivals</a>
            <a href="/personalised-perfume" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">Product Personalisation</a>
            <a href="/byob" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">Build Your Own Bundle</a>
            <a href="/track-order" class="px-4 py-2 rounded-full border border-black/10 hover:border-[#8C6228] transition">Track Your Order</a>
          </div>
        </nav>
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
            { "@type": "ListItem", "position": 3, "name": p.name, "item": `${PRODUCTION_DOMAIN}/perfumes/${p.id}` }
          ]
        },
        generateProductSchemaJson(p)
      ]
    })
  });

  // Also maintain /products/[id] with canonical pointing to /perfumes/[id]
  routes.push({
    path: `products/${p.id}`,
    title: `${p.name} Extrait de Parfum | ${p.subtitle} | SENTIRE By PC`,
    description: `Crafted with rare 35%+ pure perfume oil concentration for 12+ hour sillage. Customise ${p.name} (${p.subtitle}) with complimentary laser photo or name bottle engraving in Jaipur.`,
    canonicalUrl: `${PRODUCTION_DOMAIN}/perfumes/${p.id}`,
    ogTitle: `${p.name} Extrait de Parfum (${p.subtitle}) | SENTIRE By PC`,
    ogDescription: `Artisanal 35%+ perfume oil Extrait de Parfum outlasting standard 15% EDPs. Precision laser bottle etching and express delivery across India.`,
    image: `${PRODUCTION_DOMAIN}${p.img.split('?')[0]}`,
    heading: `${p.name} Extrait de Parfum`,
    subheading: `35%+ Perfume Oil Concentration · ${p.desc}`,
    contentHtml: `<p>Redirecting to <a href="/perfumes/${p.id}">SENTIRE ${p.name} Extrait de Parfum</a>...</p>`,
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
            { "@type": "ListItem", "position": 3, "name": p.name, "item": `${PRODUCTION_DOMAIN}/perfumes/${p.id}` }
          ]
        },
        generateProductSchemaJson(p)
      ]
    })
  });
});

function generateHtml(templateHtml, route) {
  let html = templateHtml;
  const canonicalUrl = route.canonicalUrl || `${PRODUCTION_DOMAIN}/${route.path}`;
  const buildTimestamp = Date.now();

  // Cache-bust JS asset URL to force Edge CDN / Cloudflare to purge old cached JS bundles
  html = html.replace(/src="(\/assets\/(?:app-v2|index)-[^"]+\.js)"/g, `src="$1?v=${buildTimestamp}"`);

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
    if (/<div id="root"[^>]*>[\s\S]*?<\/noscript>\s*<\/div>/.test(html)) {
      html = html.replace(/<div id="root"[^>]*>[\s\S]*?<\/noscript>\s*<\/div>/, `<div id="root" style="background-color: #050505; min-height: 100vh;">\n      <noscript>\n${route.contentHtml}\n      </noscript>\n    </div>`);
    } else if (/<div id="root"[^>]*>\s*<\/div>/.test(html)) {
      html = html.replace(/<div id="root"[^>]*>\s*<\/div>/, `<div id="root" style="background-color: #050505; min-height: 100vh;">\n      <noscript>\n${route.contentHtml}\n      </noscript>\n    </div>`);
    } else {
      html = html.replace('<body>', `<body>\n    <div id="root" style="background-color: #050505; min-height: 100vh;">\n      <noscript>\n${route.contentHtml}\n      </noscript>\n    </div>`);
    }
  }

  return html;
}

export function buildStaticRoutes() {
  // Always use compiled dist/index.html if available to ensure production bundle JS assets (/assets/index-xxx.js) are used instead of /src/main.tsx
  if (fs.existsSync(distDir)) {
    const distIndexHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf8');
    routes.forEach(route => {
      const distRouteHtml = generateHtml(distIndexHtml, route);
      const distFilePath = path.resolve(distDir, `${route.path}.html`);
      fs.mkdirSync(path.dirname(distFilePath), { recursive: true });
      fs.writeFileSync(distFilePath, distRouteHtml, 'utf8');
      console.log(`Generated dist/${route.path}.html`);
    });
  }
}

buildStaticRoutes();
