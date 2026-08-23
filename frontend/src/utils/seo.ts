/**
 * Sentire by PC - Aggressive Technical SEO Metadata Engine
 * Positioned on the Rare 35%+ Perfume Oil Concentration (Extrait de Parfum) Moat
 * and Bespoke Laser Photo/Name Engraving on Luxury Flacons.
 * Preferred Production Domain: https://sentirebypc.com/
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
  "35%+ perfume oil perfume",
  "highest perfume oil concentration India",
  "35% extrait de parfum",
  "pure perfume oil concentration",
  "long lasting perfume India",
  "longest lasting perfume for men",
  "longest lasting perfume for women",
  "beast mode perfume India",
  "extrait de parfum outlasts edp",
  "personalised perfume with photo",
  "personalized perfume with photo",
  "photo engraved perfume",
  "image engraved perfume bottle",
  "laser engraved perfume bottle",
  "name engraved perfume",
  "personalised perfume with name",
  "customised perfume bottle India",
  "luxury perfume gift Jaipur",
  "express perfume delivery India"
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
  const defaultRobots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  // Product Detail Modal or Deep-linked Product Page
  if (product && product.name) {
    const productName = product.name;
    const concentrationTag = "35%+ Pure Perfume Oil Extrait de Parfum";
    
    return {
      title: `${productName} Personalised Perfume (35%+ Pure Oil Extrait) | Sentire by PC`,
      description: `Crafted with rare 35%+ pure perfume oil concentration for eternal 12+ hour sillage. Personalise ${productName} with complimentary laser photo or name bottle engraving.`,
      canonical: `${PRODUCTION_DOMAIN}/perfumes?id=${product.id}`,
      robots: defaultRobots,
      ogType: "product",
      ogTitle: `${productName} (35%+ Pure Oil Extrait) Photo-Engraved | Sentire by PC`,
      ogDescription: `One of India's few 35%+ pure perfume oil Extraits de Parfum. Outlasts standard 15% EDPs with eternal sillage and precision laser photo etching.`,
      ogImage: product.img || product.image || `${PRODUCTION_DOMAIN}/assets/perfumes/${product.id}-50ml-1.png?v=2`,
      twitterCard: "summary_large_image",
      keywords: `${productName} 35% oil concentration, ${productName} extrait de parfum, personalised ${productName}, laser engraved ${productName}, ${BASE_KEYWORDS}`,
    };
  }

  switch (page) {
    case "home":
      return {
        title: "Sentire by PC | 35%+ Perfume Oil Extraits & Photo-Engraved Bottles",
        description: "Discover India's rare 35%+ pure perfume oil extraits de parfum engineered for eternal longevity. Customised with precision photo & name laser bottle engraving.",
        canonical: `${PRODUCTION_DOMAIN}/`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Sentire by PC | 35%+ Pure Perfume Oil Extraits & Photo Engraving",
        ogDescription: "Experience rare 35%+ perfume oil concentration that outlasts standard 15% EDPs. Personalise with complimentary laser photo or name flacon engraving.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: BASE_KEYWORDS,
      };

    case "perfumes":
      return {
        title: "35%+ Perfume Oil Extraits & Personalised Perfumes | Sentire by PC",
        description: "Explore 11 signature extraits de parfum formulated with rare 35%+ perfume oil concentration for beast-mode longevity. Includes complimentary laser photo engraving.",
        canonical: `${PRODUCTION_DOMAIN}/perfumes`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "35%+ Pure Oil Extrait de Parfum Catalog | Sentire by PC",
        ogDescription: "Artisanal high-concentration perfumes formulated with 35%+ pure fragrance oils and bespoke laser flacon engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `35% perfume oil concentration, extrait de parfum India, long lasting perfume for men, ${BASE_KEYWORDS}`,
      };

    case "bestsellers":
      return {
        title: "Best-Selling 35%+ Perfume Oil Extraits | Sentire by PC",
        description: "Shop Jaipur's most coveted signature extraits de parfum crafted with 35%+ pure perfume oil concentration for all-day sillage, luxury packaging, and express delivery.",
        canonical: `${PRODUCTION_DOMAIN}/bestsellers`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Best-Selling 35%+ Pure Oil Perfumes | Sentire by PC",
        ogDescription: "Our highest-performing extraits de parfum featuring 35%+ perfume oil concentration and precision laser bottle etching.",
        ogImage: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`,
        twitterCard: "summary_large_image",
        keywords: `best long lasting perfume India, 35% oil concentration bestsellers, ${BASE_KEYWORDS}`,
      };

    case "new-arrivals":
      return {
        title: "New 35%+ Extrait de Parfum Arrivals | Sentire by PC",
        description: "Discover new artisanal master releases formulated with 35%+ perfume oil concentration and complimentary laser photo engraving directly on the glass bottle.",
        canonical: `${PRODUCTION_DOMAIN}/new-arrivals`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "New 35%+ Perfume Oil Releases | Sentire by PC",
        ogDescription: "The latest high-concentration extraits de parfum with rare olfactory accords and bespoke laser flacon etching.",
        ogImage: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`,
        twitterCard: "summary_large_image",
        keywords: `new extrait de parfum, 35% concentration releases, ${BASE_KEYWORDS}`,
      };

    case "byob":
      return {
        title: "Custom 35%+ Perfume Gift Box & Sets | Sentire by PC",
        description: "Build a bespoke luxury discovery box with curated 10ml, 30ml, and 50ml extraits de parfum featuring 35%+ perfume oil concentration and luxury gift presentation.",
        canonical: `${PRODUCTION_DOMAIN}/byob`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Build Your Own 35%+ Extrait Discovery Box | Sentire by PC",
        ogDescription: "Curate a personalized set of 35%+ high-concentration extraits de parfum with custom gift coffret presentation.",
        ogImage: `${PRODUCTION_DOMAIN}/images/build-bundle.png`,
        twitterCard: "summary_large_image",
        keywords: `custom perfume gift box, 35% perfume discovery set, ${BASE_KEYWORDS}`,
      };

    case "personalisation":
      return {
        title: "Photo & Name Engraved 35%+ Extrait Perfumes | Sentire by PC",
        description: "Personalise your 35%+ high-concentration extrait de parfum bottle with precision photo or name laser engraving. Uncompromising longevity and bespoke luxury.",
        canonical: `${PRODUCTION_DOMAIN}/personalisation`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Bespoke Laser Photo & Name Engraving Atelier | Sentire by PC",
        ogDescription: "Precision laser etching of customer photos and custom typography directly on 35%+ perfume oil extraits de parfum flacons.",
        ogImage: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`,
        twitterCard: "summary_large_image",
        keywords: `photo engraved perfume, laser engraved perfume bottle, 35% concentration engraved perfume, ${BASE_KEYWORDS}`,
      };

    case "about":
      return {
        title: "About Sentire by PC | 35%+ Pure Oil Fragrance House Jaipur",
        description: "Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India's only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.",
        canonical: `${PRODUCTION_DOMAIN}/about`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "The 35%+ Perfume Oil Craftsmanship | Sentire by PC",
        ogDescription: "Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary_large_image",
        keywords: `about sentire by pc, 35% perfume oil jaipur, luxury perfumery jaipur, ${BASE_KEYWORDS}`,
      };

    case "client-services":
      return {
        title: "Client Services & Express Delivery | Sentire by PC",
        description: "Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.",
        canonical: `${PRODUCTION_DOMAIN}/client-services`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Private Client Concierge & Support | Sentire by PC",
        ogDescription: "Dedicated concierge for Sentire by PC artisanal extraits de parfum and custom engraved orders.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `client services, express perfume delivery India, ${BASE_KEYWORDS}`,
      };

    case "track-order":
      return {
        title: "Track Your Perfume Order | Sentire by PC",
        description: "Track real-time courier status and express delivery updates for your Sentire by PC 35%+ extrait de parfum and laser-engraved orders.",
        canonical: `${PRODUCTION_DOMAIN}/track-order`,
        robots: defaultRobots,
        ogType: "website",
        ogTitle: "Track Your Order | Sentire by PC",
        ogDescription: "Live tracking for your Sentire luxury perfume shipment.",
        ogImage: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
        twitterCard: "summary",
        keywords: `track perfume order, delivery tracking, ${BASE_KEYWORDS}`,
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
        title: "Sentire by PC | 35%+ Perfume Oil Extraits & Photo Engraving",
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
