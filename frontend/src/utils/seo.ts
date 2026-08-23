/**
 * Sentire by PC - Technical SEO Metadata Engine
 * Positioned on the Rare 35%+ Perfume Oil Concentration (Extrait de Parfum) Moat
 * and Bespoke Laser Photo/Name Engraving on Luxury Flacons.
 * Preferred Production Domain: https://sentirebypc.com
 */

export const PRODUCTION_DOMAIN = "https://sentirebypc.com";

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: string;
  ogImage: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard: "summary" | "summary_large_image";
  keywords?: string;
}

export const BASE_KEYWORDS = [
  "35% perfume oil concentration",
  "extrait de parfum India",
  "personalised perfume India",
  "photo engraved perfume bottle",
  "name engraved perfume",
  "luxury perfume gift Jaipur",
  "long lasting perfume for men",
  "long lasting perfume for women",
  "custom engraved perfume bottle",
  "express perfume delivery India"
].join(", ");

const PRODUCT_SEO_SUBTITLES: Record<string, string> = {
  "dapper": "Tobacco & Smoky Woods",
  "woo-dy": "Cedarwood & Sandalwood",
  "white-oud": "Clean Woody Oud & Lavender",
  "purple-oud": "Cambodian Oud & Saffron",
  "calantha": "Blooming Florals & Sandalwood",
  "deep-crush": "Warm Musk & Tobacco Woods",
  "herrlich": "Fresh Bergamot & Dark Chocolate",
  "midnight": "Blackcurrant & Vanilla Musk",
  "mirai": "Roasted Coffee & Sweet Vanilla",
  "0809": "Sichuan Pepper & Earthy Vetiver",
  "personna": "Aquatic Marine & Dry Woods",
  "rich": "Icy Fruits & Polished Cedar",
  "seductive": "Italian Limon & Black Pepper",
  "zephyrine": "White Florals & Citrus",
  "bijou": "Floral Bouquet & Warm Vanilla",
  "le-chocolat": "Dark Cocoa & Creamy Vanilla",
  "pc-leather": "Fine Italian Leather & Spices",
  "quantillion": "Vibrant Mandarin & Amberwood",
  "reiz": "Smoky Leather & Amber",
  "sent-aura": "Aromatic Woods & Florals",
  "vanaco": "Pure Madagascar Vanilla & Woods"
};

/**
 * Returns metadata configuration for a given page route and optional selected product.
 */
export function getPageMetadata(
  page: string,
  product?: {
    id: string;
    name: string;
    desc?: string;
    fullDesc?: string;
    img?: string;
    image?: string;
    prices?: Record<number, number> | number;
    scentFamily?: string;
    sizes?: number[];
  } | null
): PageMetadata {
  const defaultRobots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Product Detail Modal or Deep-linked Product Page
  if (product && product.name) {
    const productName = product.name;
    const noteSubtitle = PRODUCT_SEO_SUBTITLES[product.id] || (product.desc ? product.desc.split('·')[0].trim() : "35%+ Extrait de Parfum");
    
    return {
      title: `${productName} Extrait de Parfum | ${noteSubtitle} | SENTIRE By PC`,
      description: `Crafted with rare 35%+ pure perfume oil concentration for 12+ hour sillage. Customise ${productName} (${noteSubtitle}) with complimentary laser photo or name bottle engraving in Jaipur.`,
      canonical: `${PRODUCTION_DOMAIN}/perfumes/${product.id}`,
      robots: defaultRobots,
      ogType: "product",
      ogTitle: `${productName} Extrait de Parfum (${noteSubtitle}) | SENTIRE By PC`,
      ogDescription: `Artisanal 35%+ perfume oil Extrait de Parfum outlasting standard 15% EDPs. Precision laser bottle etching and express delivery across India.`,
      ogImage: product.img || product.image || `${PRODUCTION_DOMAIN}/assets/perfumes/${product.id}-50ml-1.png?v=2`,
      twitterCard: "summary_large_image",
      keywords: `${productName} extrait de parfum, ${productName} perfume, personalised ${productName}, laser engraved ${productName}, ${productName} 35% oil, ${BASE_KEYWORDS}`,
    };
  }

  switch (page) {
    case "pages/personalised-perfume":
    case "personalised-perfume":
    case "personalisation":
      return {
        title: "Personalised Perfume with Photo Engraving | SENTIRE By PC",
        description: "Permanent optical laser bottle engraving on luxury 35%+ extraits de parfum. Upload couple portraits, personal photos, names or dates for complimentary glass etching.",
        canonical: `${PRODUCTION_DOMAIN}/personalised-perfume`,
        robots: defaultRobots,
        ogType: "article",
        ogTitle: "Personalised Perfume with Photo & Name Engraving | SENTIRE By PC",
        ogDescription: "Discover bespoke laser photo flacon engraving in Jaipur. 100% complimentary on all 50ml 35%+ perfume oil extraits de parfum.",
        ogImage: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
        twitterCard: "summary_large_image",
        keywords: `personalised perfume, personalised perfume India, photo engraved perfume, image engraved perfume, personalised perfume with photo, perfume bottle photo engraving, custom image engraved perfume, name engraved perfume, custom perfume bottle, personalised perfume gift, personalised fragrance gift India, ${BASE_KEYWORDS}`,
      };

    case "pages/35-percent-extrait-de-parfum":
    case "35-percent-extrait-de-parfum":
    case "extrait-de-parfum":
      return {
        title: "Extrait de Parfum India | 35%+ Pure Fragrance Oil | SENTIRE By PC",
        description: "Why 35%+ pure perfume oil concentration outlasts standard 12-18% Eau de Parfum. Understand the science of sillage, longevity, and climate engineering.",
        canonical: `${PRODUCTION_DOMAIN}/extrait-de-parfum`,
        robots: defaultRobots,
        ogType: "article",
        ogTitle: "Why 35%+ Extrait de Parfum Outlasts Standard Perfumes | SENTIRE By PC",
        ogDescription: "The difference between 15% EDP and 35%+ Extrait de Parfum in tropical climates. Higher oil concentration, zero alcohol blast, and 12+ hour sillage.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `extrait de parfum India, 35% perfume oil concentration, extrait de parfum vs edp, long lasting perfume concentration, beast mode perfume India, ${BASE_KEYWORDS}`,
      };
    case "home":
      return {
        title: "Personalised Extrait de Parfum & Luxury Perfumes | SENTIRE By PC",
        description: "Discover India's rare 35%+ pure perfume oil extraits de parfum engineered for 12+ hour sillage. Customise with bespoke photo and name laser engraving in Jaipur.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "SENTIRE By PC | 35%+ Pure Perfume Oil Extraits & Photo Engraving",
        ogDescription: "Experience rare 35%+ perfume oil concentration that outlasts standard 15% EDPs. Personalise with complimentary laser photo or name flacon engraving.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };

    case "perfumes":
      return {
        title: "35%+ Perfume Oil Extraits & Personalised Perfumes | SENTIRE By PC",
        description: "Explore 11 signature extraits de parfum formulated with rare 35%+ perfume oil concentration for beast-mode longevity. Includes complimentary laser photo engraving.",
        canonical: `${PRODUCTION_DOMAIN}/perfumes`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "35%+ Pure Oil Extrait de Parfum Catalog | SENTIRE By PC",
        ogDescription: "Artisanal high-concentration perfumes formulated with 35%+ pure fragrance oils and bespoke laser flacon engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `35% perfume oil concentration, extrait de parfum India, long lasting perfume for men, ${BASE_KEYWORDS}`,
      };

    case "bestsellers":
      return {
        title: "Best-Selling 35%+ Perfume Oil Extraits | SENTIRE By PC",
        description: "Shop Jaipur's most coveted signature extraits de parfum crafted with 35%+ pure perfume oil concentration for all-day sillage, luxury packaging, and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/bestsellers`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Best-Selling 35%+ Pure Oil Perfumes | SENTIRE By PC",
        ogDescription: "Our highest-performing extraits de parfum featuring 35%+ perfume oil concentration and precision laser bottle etching.",
        ogImage: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
        twitterCard: "summary_large_image",
        keywords: `best long lasting perfume India, 35% oil concentration bestsellers, ${BASE_KEYWORDS}`,
      };

    case "new-arrivals":
      return {
        title: "New 35%+ Extrait de Parfum Arrivals | SENTIRE By PC",
        description: "Discover new artisanal master releases formulated with 35%+ perfume oil concentration and complimentary laser photo engraving directly on the glass bottle.",
        canonical: `${PRODUCTION_DOMAIN}/new-arrivals`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "New 35%+ Perfume Oil Releases | SENTIRE By PC",
        ogDescription: "The latest high-concentration extraits de parfum with rare olfactory accords and bespoke laser flacon etching.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `new extrait de parfum, 35% concentration releases, ${BASE_KEYWORDS}`,
      };

    case "byob":
      return {
        title: "Custom 35%+ Perfume Gift Box & Sets | SENTIRE By PC",
        description: "Build a bespoke luxury discovery box with curated 10ml, 30ml, and 50ml extraits de parfum featuring 35%+ perfume oil concentration and luxury gift presentation.",
        canonical: `${PRODUCTION_DOMAIN}/byob`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Build Your Own 35%+ Extrait Discovery Box | SENTIRE By PC",
        ogDescription: "Curate a personalized set of 35%+ high-concentration extraits de parfum with custom gift coffret presentation.",
        ogImage: `${PRODUCTION_DOMAIN}/images/build-bundle.png`,
        twitterCard: "summary_large_image",
        keywords: `custom perfume gift box, 35% perfume discovery set, ${BASE_KEYWORDS}`,
      };


    case "about":
      return {
        title: "About Sentire by PC | 35%+ Pure Oil Fragrance House Jaipur",
        description: "Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India's only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.",
        canonical: `${PRODUCTION_DOMAIN}/about`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "The 35%+ Perfume Oil Craftsmanship | SENTIRE By PC",
        ogDescription: "Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `about sentire by pc, 35% perfume oil jaipur, luxury perfumery jaipur, ${BASE_KEYWORDS}`,
      };

    case "client-services":
      return {
        title: "Client Services & Express Delivery | SENTIRE By PC",
        description: "Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.",
        canonical: `${PRODUCTION_DOMAIN}/client-services`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Private Client Concierge & Support | SENTIRE By PC",
        ogDescription: "Dedicated concierge for Sentire by PC artisanal extraits de parfum and custom engraved orders.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `client services, express perfume delivery India, ${BASE_KEYWORDS}`,
      };

    case "track-order":
      return {
        title: "Track Your Perfume Order | SENTIRE By PC",
        description: "Track real-time courier status and express delivery updates for your Sentire by PC 35%+ extrait de parfum and laser-engraved orders.",
        canonical: `${PRODUCTION_DOMAIN}/track-order`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Track Your Order | SENTIRE By PC",
        ogDescription: "Live tracking for your Sentire luxury perfume shipment.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `track perfume order, delivery tracking, ${BASE_KEYWORDS}`,
      };

    case "account":
      return {
        title: "Your Account | SENTIRE By PC",
        description: "Manage your Sentire by PC account, VIP rewards, and order history.",
        canonical: `${PRODUCTION_DOMAIN}/account`,
        robots: "noindex, nofollow",
        ogType: "website",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
      };

    default:
      return {
        title: "Personalised Extrait de Parfum & Luxury Perfumes | SENTIRE By PC",
        description: "Discover Sentire by PC personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, premium presentation and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };
  }
}

