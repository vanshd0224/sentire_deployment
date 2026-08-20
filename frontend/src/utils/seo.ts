/**
 * Sentire by PC - Technical SEO Metadata Engine
 * Generates unique, accurate, high-intent metadata for every indexable route.
 * Preferred Production Domain: https://sentirebypc.com/
 * Strictly preserves the visible frontend while maximizing search visibility.
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
  "personalised perfume",
  "personalized perfume",
  "customised perfume",
  "customized perfume",
  "photo engraved perfume",
  "image engraved perfume",
  "perfume with photo",
  "personalised perfume with photo",
  "laser engraved perfume bottle",
  "name engraved perfume",
  "personalised perfume with name",
  "long-lasting perfume",
  "35%+ perfume oil concentration",
  "high perfume oil concentration",
  "premium perfume gift",
  "personalised perfume gift",
  "express perfume delivery",
  "personalised perfume Jaipur",
  "custom perfume bottle Jaipur",
  "premium personalised perfume in India"
].join(", ");

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
  const isStaging =
    typeof window !== "undefined" &&
    (window.location.hostname.includes("run.app") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1"));

  const defaultRobots = isStaging
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Product Detail Modal or Deep-linked Product Page
  if (product && product.name) {
    const productName = product.name;
    const concentrationClaim = "35%+ perfume oil concentration";
    
    return {
      title: `${productName} Personalised Perfume | Sentire by PC`,
      description: `Personalise ${productName} with photo or name laser engraving. Featuring ${concentrationClaim}, premium presentation and express delivery where available.`,
      canonical: `${PRODUCTION_DOMAIN}/perfumes?id=${product.id}`,
      robots: defaultRobots,
      ogType: "product",
      ogTitle: `${productName} Photo-Engraved Perfume | Sentire by PC`,
      ogDescription: `Artisanal extrait de parfum featuring ${concentrationClaim}, photo & name laser engraving, and express delivery.`,
      ogImage: product.img || product.image || `${PRODUCTION_DOMAIN}/assets/perfumes/${product.id}-50ml-1.png?v=2`,
      twitterCard: "summary_large_image",
      keywords: `${productName} perfume, personalised ${productName}, laser engraved ${productName}, ${BASE_KEYWORDS}`,
    };
  }

  switch (page) {
    case "home":
      return {
        title: "Sentire by PC | Personalised Perfumes with Photo Engraving",
        description: "Discover Sentire by PC personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, premium presentation and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Sentire by PC | Personalised Perfumes with Photo Engraving",
        ogDescription: "Discover Sentire by PC personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, premium presentation and express delivery.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };

    case "perfumes":
      return {
        title: "Personalised Perfumes with Photo Engraving | Sentire by PC",
        description: "Create a premium personalised perfume with your photo or name laser-engraved on the bottle. Explore long-lasting fragrances with express delivery options.",
        canonical: `${PRODUCTION_DOMAIN}/perfumes`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Personalised Perfumes & Luxury Extraits | Sentire by PC",
        ogDescription: "Explore our collection of artisanal perfumes crafted with 35%+ perfume oil concentration and bespoke laser engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `perfumes catalog, buy perfume online India, custom perfume, ${BASE_KEYWORDS}`,
      };

    case "bestsellers":
      return {
        title: "Best-Selling Luxury Fragrances | Sentire by PC",
        description: "Explore our most-loved signature extraits de parfum crafted with 35%+ perfume oil concentration for eternal sillage, luxury presentation, and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/bestsellers`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Best-Selling Perfumes | Sentire by PC",
        ogDescription: "Discover Jaipur's most coveted luxury fragrances with 35%+ oil concentration and bespoke laser etching.",
        ogImage: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
        twitterCard: "summary_large_image",
        keywords: `best selling perfume, top fragrances India, long lasting perfume, ${BASE_KEYWORDS}`,
      };

    case "new-arrivals":
      return {
        title: "New Fragrance Arrivals | 35%+ Perfume Oil | Sentire by PC",
        description: "Discover the newest artisanal perfume creations from Sentire by PC, featuring rare accords, 35%+ perfume oil concentration, and laser bottle engraving.",
        canonical: `${PRODUCTION_DOMAIN}/new-arrivals`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "New Perfume Arrivals | Sentire by PC",
        ogDescription: "Unveiling new luxury extraits de parfum with 35%+ concentration and custom flacon engraving.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `new perfume releases, latest luxury fragrances, new perfume arrivals India, ${BASE_KEYWORDS}`,
      };

    case "byob":
      return {
        title: "Custom Perfume Gift Box & Sets | Sentire by PC",
        description: "Build your own bespoke fragrance box with curated 10ml, 30ml, and 50ml extraits de parfum, luxury gift packaging, and express shipping.",
        canonical: `${PRODUCTION_DOMAIN}/byob`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Build Your Own Fragrance Box | Sentire by PC",
        ogDescription: "Curate a personalized discovery set of luxury perfumes with custom presentation and express delivery.",
        ogImage: `${PRODUCTION_DOMAIN}/images/build-bundle.png`,
        twitterCard: "summary_large_image",
        keywords: `custom perfume box, perfume gift box, fragrance discovery set, personalised perfume gift, ${BASE_KEYWORDS}`,
      };

    case "personalisation":
      return {
        title: "Personalised Perfumes with Photo Engraving | Sentire by PC",
        description: "Create a premium personalised perfume with your photo or name laser-engraved on the bottle. Explore long-lasting fragrances with express delivery options.",
        canonical: `${PRODUCTION_DOMAIN}/personalisation`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Bespoke Laser Photo & Name Engraving Atelier | Sentire by PC",
        ogDescription: "Upload your photo or enter your custom name for precision laser etching on premium perfume bottles.",
        ogImage: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
        twitterCard: "summary_large_image",
        keywords: `photo engraved perfume, laser engraved perfume bottle, personalised perfume with photo, custom name perfume, ${BASE_KEYWORDS}`,
      };

    case "about":
      return {
        title: "About Sentire by PC | 10,000+ Perfumes Crafted in Jaipur",
        description: "Discover Sentire by PC — crafted in Jaipur with over 10,000 bottles sold offline. Artisanal extraits de parfum with 35%+ perfume oil concentration and laser bottle engraving.",
        canonical: `${PRODUCTION_DOMAIN}/about`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Our Heritage & Craftsmanship | Sentire by PC",
        ogDescription: "Born in Jaipur, India. Over 10,000 perfume bottles handcrafted with 35%+ oil concentration and bespoke engraving.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `about sentire by pc, jaipur perfumery, luxury perfumes jaipur, ${BASE_KEYWORDS}`,
      };

    case "client-services":
      return {
        title: "Client Services, Shipping & Returns | Sentire by PC",
        description: "Customer care, express shipping details, return policies, and personalized concierge support for Sentire by PC luxury fragrances.",
        canonical: `${PRODUCTION_DOMAIN}/client-services`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Client Services & Concierge | Sentire by PC",
        ogDescription: "Dedicated private client concierge, express delivery timelines, and return policy details.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `client care, customer support, express perfume shipping, returns policy, ${BASE_KEYWORDS}`,
      };

    case "track-order":
      return {
        title: "Track Your Perfume Order | Sentire by PC",
        description: "Track real-time courier status and express delivery updates for your Sentire by PC artisanal perfume and custom engraved orders.",
        canonical: `${PRODUCTION_DOMAIN}/track-order`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Track Your Order | Sentire by PC",
        ogDescription: "Live tracking for your Sentire luxury perfume shipment.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `track perfume order, delivery tracking, courier status, ${BASE_KEYWORDS}`,
      };

    case "account":
      return {
        title: "Your Account | Sentire by PC",
        description: "Manage your Sentire by PC account, VIP rewards, and order history.",
        canonical: `${PRODUCTION_DOMAIN}/account`,
        robots: "noindex, nofollow",
        ogType: "website",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
      };

    default:
      return {
        title: "Sentire by PC | Personalised Perfumes with Photo Engraving",
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
