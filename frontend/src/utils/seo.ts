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
        title: "Product Personalisation | SENTIRE By PC",
        description: "Personalise your SENTIRE perfume with photo and name laser engraving. 100% complimentary on all 50ml extraits de parfum in Jaipur.",
        canonical: `${PRODUCTION_DOMAIN}/personalised-perfume`,
        robots: defaultRobots,
        ogType: "article",
        ogTitle: "Product Personalisation | SENTIRE By PC",
        ogDescription: "Personalise your SENTIRE perfume with photo and name laser engraving. 100% complimentary on all 50ml extraits de parfum in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
        twitterCard: "summary_large_image",
        keywords: `product personalisation, personalised perfume, personalised perfume India, photo engraved perfume, image engraved perfume, name engraved perfume, custom perfume bottle, personalised perfume gift, ${BASE_KEYWORDS}`,
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
        title: "All Perfumes | 35%+ Extrait de Parfum | SENTIRE By PC",
        description: "Explore the complete collection of 35%+ pure perfume oil extraits de parfum with complimentary laser photo flacon engraving.",
        canonical: `${PRODUCTION_DOMAIN}/perfumes`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "All Perfumes | SENTIRE By PC",
        ogDescription: "Explore the complete collection of 35%+ pure perfume oil extraits de parfum with complimentary laser photo flacon engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `all perfumes, 35% perfume oil concentration, extrait de parfum India, long lasting perfume for men, ${BASE_KEYWORDS}`,
      };

    case "bestsellers":
      return {
        title: "Best Sellers | SENTIRE By PC",
        description: "Discover SENTIRE By PC best-selling extraits de parfum, including our most-loved oud, woody, fresh and signature fragrances.",
        canonical: `${PRODUCTION_DOMAIN}/bestsellers`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Best Sellers | SENTIRE By PC",
        ogDescription: "Discover SENTIRE By PC best-selling extraits de parfum, including our most-loved oud, woody, fresh and signature fragrances.",
        ogImage: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
        twitterCard: "summary_large_image",
        keywords: `best sellers, best long lasting perfume India, 35% oil concentration bestsellers, ${BASE_KEYWORDS}`,
      };

    case "new-arrivals":
      return {
        title: "New Arrivals | SENTIRE By PC",
        description: "Explore the latest fragrance launches and new extrait de parfum creations from SENTIRE By PC.",
        canonical: `${PRODUCTION_DOMAIN}/new-arrivals`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "New Arrivals | SENTIRE By PC",
        ogDescription: "Explore the latest fragrance launches and new extrait de parfum creations from SENTIRE By PC.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `new arrivals, new extrait de parfum, 35% concentration releases, ${BASE_KEYWORDS}`,
      };

    case "byob":
      return {
        title: "Build Your Own Bundle | SENTIRE By PC",
        description: "Create your own SENTIRE perfume bundle. Choose your favourite fragrances and build a personalised set from our extrait de parfum collection.",
        canonical: `${PRODUCTION_DOMAIN}/byob`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Build Your Own Bundle | SENTIRE By PC",
        ogDescription: "Create your own SENTIRE perfume bundle. Choose your favourite fragrances and build a personalised set from our extrait de parfum collection.",
        ogImage: `${PRODUCTION_DOMAIN}/images/build-bundle.png`,
        twitterCard: "summary_large_image",
        keywords: `build your own bundle, custom perfume gift box, 35% perfume discovery set, ${BASE_KEYWORDS}`,
      };

    case "about":
      return {
        title: "About SENTIRE | Jaipur Haute Parfumerie | SENTIRE By PC",
        description: "Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India's only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.",
        canonical: `${PRODUCTION_DOMAIN}/about`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "About SENTIRE | SENTIRE By PC",
        ogDescription: "Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `about sentire by pc, about sentire, 35% perfume oil jaipur, luxury perfumery jaipur, ${BASE_KEYWORDS}`,
      };

    case "client-services":
      return {
        title: "Client Services & Express Delivery | SENTIRE By PC",
        description: "Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.",
        canonical: `${PRODUCTION_DOMAIN}/client-services`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Client Services | SENTIRE By PC",
        ogDescription: "Dedicated concierge for Sentire by PC artisanal extraits de parfum and custom engraved orders.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `client services, express perfume delivery India, ${BASE_KEYWORDS}`,
      };

    case "track-order":
      return {
        title: "Track Your Order | SENTIRE By PC",
        description: "Track your SENTIRE By PC order and view the latest delivery status.",
        canonical: `${PRODUCTION_DOMAIN}/track-order`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Track Your Order | SENTIRE By PC",
        ogDescription: "Track your SENTIRE By PC order and view the latest delivery status.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `track your order, track order, delivery tracking, ${BASE_KEYWORDS}`,
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

