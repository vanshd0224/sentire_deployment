/**
 * Sentire by PC - Technical SEO Metadata Engine
 * Generates unique, accurate, high-intent metadata for every indexable route.
 * Strictly preserves the visible frontend while maximizing search visibility.
 */

export const PRODUCTION_DOMAIN = "https://sentireparfums.com";

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
        title: "Personalised Perfume with Photo Engraving | Sentire by PC",
        description: "Shop premium personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, long-lasting performance and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Personalised Perfume with Photo Engraving | Sentire by PC",
        ogDescription: "Shop premium personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, long-lasting performance and express delivery.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };

    case "perfumes":
      return {
        title: "Personalised Perfumes with Photo Engraving | Sentire",
        description: "Create a premium personalised perfume with your photo or name laser-engraved on the bottle. Explore long-lasting fragrances with express delivery options.",
        canonical: `${PRODUCTION_DOMAIN}/perfumes`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Personalised Perfumes with Photo Engraving | Sentire",
        ogDescription: "Explore 11 signature extraits de parfum with complimentary laser photo and name engraving. 35%+ perfume oil concentration for eternal sillage.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `personalised perfume collection, custom engraved perfume bottles, ${BASE_KEYWORDS}`,
      };

    case "bestsellers":
      return {
        title: "Best-Selling Luxury Fragrances | Sentire by PC",
        description: "Explore our most-loved signature extraits de parfum crafted with 35%+ perfume oil concentration for eternal sillage, luxury presentation, and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/bestsellers`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Best-Selling Luxury Fragrances | Sentire by PC",
        ogDescription: "Top-rated perfumes with 35%+ perfume oil concentration, photo laser engraving, and express delivery.",
        ogImage: `${PRODUCTION_DOMAIN}/assets/perfumes/calantha-50ml-1.png?v=2`,
        twitterCard: "summary_large_image",
        keywords: `bestselling perfume, top rated perfumes India, ${BASE_KEYWORDS}`,
      };

    case "new-arrivals":
      return {
        title: "New Fragrance Arrivals | 35%+ Perfume Oil | Sentire by PC",
        description: "Discover the newest artisanal perfume creations from Sentire by PC, featuring rare accords, 35%+ perfume oil concentration, and laser bottle engraving.",
        canonical: `${PRODUCTION_DOMAIN}/new-arrivals`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "New Fragrance Arrivals | 35%+ Perfume Oil | Sentire by PC",
        ogDescription: "Latest haute parfumerie releases with custom photo engraving and express delivery options.",
        ogImage: `${PRODUCTION_DOMAIN}/assets/perfumes/purple-oud-50ml-1.png?v=2`,
        twitterCard: "summary_large_image",
        keywords: `new perfumes, latest fragrance arrivals, ${BASE_KEYWORDS}`,
      };

    case "personalisation":
      return {
        title: "Personalised Perfumes with Photo Engraving | Sentire",
        description: "Create a premium personalised perfume with your photo or name laser-engraved on the bottle. Explore long-lasting fragrances with express delivery options.",
        canonical: `${PRODUCTION_DOMAIN}/personalisation`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Atelier Personalisation Studio | Sentire by PC",
        ogDescription: "Bespoke laser engraving studio: high-precision photo etching and custom name personalization on luxury perfume bottles.",
        ogImage: `${PRODUCTION_DOMAIN}/assets/purple-oud.png`,
        twitterCard: "summary_large_image",
        keywords: `photo engraved perfume bottle, laser photo etching perfume, custom perfume gift, ${BASE_KEYWORDS}`,
      };

    case "byob":
      return {
        title: "Custom Perfume Gift Box & Sets | Sentire by PC",
        description: "Build your own bespoke fragrance box with curated 10ml, 30ml, and 50ml extraits de parfum, luxury gift packaging, and express shipping.",
        canonical: `${PRODUCTION_DOMAIN}/byob`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Build Your Own Perfume Box | Sentire by PC",
        ogDescription: "Curate a personalized perfume gift box with your choice of artisanal fragrances and premium gift presentation.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `perfume gift box, custom perfume set, personalised perfume gift, ${BASE_KEYWORDS}`,
      };

    case "about":
      return {
        title: "About Sentire by PC | 10,000+ Perfumes Crafted in Jaipur",
        description: "Discover Sentire by PC — crafted in Jaipur with over 10,000 bottles sold offline. Artisanal extraits de parfum with 35%+ perfume oil concentration and laser bottle engraving.",
        canonical: `${PRODUCTION_DOMAIN}/about`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "About Sentire by PC | Artisanal Fragrance House in Jaipur",
        ogDescription: "10,000+ bottles crafted offline in Jaipur. Uncompromising 35%+ perfume oil concentration and bespoke bottle personalization.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `about Sentire by PC, perfume shop Jaipur, Jaipur luxury perfume, ${BASE_KEYWORDS}`,
      };

    case "client-services":
      return {
        title: "Client Services, Shipping & Returns | Sentire by PC",
        description: "Customer care, express shipping details, return policies, and personalized concierge support for Sentire by PC luxury fragrances.",
        canonical: `${PRODUCTION_DOMAIN}/client-services`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Client Services & Support | Sentire by PC",
        ogDescription: "Assistance with orders, express shipping, engraving customisation, and customer care.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `Sentire customer service, perfume delivery tracking, ${BASE_KEYWORDS}`,
      };

    case "track-order":
      return {
        title: "Track Your Perfume Order | Sentire by PC",
        description: "Track real-time courier status and express delivery updates for your Sentire by PC artisanal perfume and custom engraved orders.",
        canonical: `${PRODUCTION_DOMAIN}/track-order`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Track Your Order | Sentire by PC",
        ogDescription: "Real-time dispatch and delivery tracking for your bespoke perfume order.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `track perfume order, express delivery tracking Sentire, ${BASE_KEYWORDS}`,
      };

    case "account":
    case "checkout":
    case "cart":
      return {
        title: "Your Account | Sentire by PC",
        description: "Manage your Sentire by PC account, VIP rewards, and order history.",
        canonical: `${PRODUCTION_DOMAIN}/account`,
        robots: "noindex, nofollow",
        ogType: "website",
        ogTitle: "Account | Sentire by PC",
        ogDescription: "Private customer account area.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
      };

    default:
      return {
        title: "Personalised Perfume with Photo Engraving | Sentire by PC",
        description: "Shop premium personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, long-lasting performance and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Personalised Perfume with Photo Engraving | Sentire by PC",
        ogDescription: "Shop premium personalised perfumes with photo or name laser engraving, 35%+ perfume oil concentration, long-lasting performance and express delivery.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };
  }
}
