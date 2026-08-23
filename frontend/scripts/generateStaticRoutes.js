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
    fullDesc: "White Oud balances ethereal freshness with sacred woods. Soft lavender top notes lead to pure white agarwood resin and warm amber.",
    scentFamily: "woody",
    sizes: [10, 30, 50],
    prices: { 10: 549, 30: 1399, 50: 1949 },
    badge: null,
    img: "/assets/perfumes/white-oud-50ml-1.png?v=2",
    traces: ["Essence of Oud", "Lavender", "Labdanum", "Amber"]
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
                <img src="${p.img}" alt="Sentire ${p.name} Extrait de Parfum 50ml bottle" class="w-full aspect-square object-contain" width="300" height="300" loading="lazy" />
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
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[p.sizes.length - 1]]} (50ML)</p>
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
                <p class="text-sm font-semibold mt-2">₹${p.prices[p.sizes[p.sizes.length - 1]]} (50ML)</p>
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
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I track my order?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enter your order ID or tracking AWB on our Track Order page for real-time status."
              }
            },
            {
              "@type": "Question",
              "name": "What is your shipping timeframe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Orders are dispatched within 24 hours from Jaipur and delivered within 2-4 business days across India."
              }
            }
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

function generateHtml(templateHtml, route) {
  let html = templateHtml;
  const canonicalUrl = `${PRODUCTION_DOMAIN}/${route.path}`;

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
    html = html.replace('<div id="root"></div>', `<div id="root"><noscript>${route.contentHtml}</noscript></div>`);
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


