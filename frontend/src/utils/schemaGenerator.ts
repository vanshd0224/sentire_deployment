/**
 * Sentire by PC - JSON-LD Structured Data Generator
 * Generates Schema.org compliant structured data for Google Rich Results,
 * Product Knowledge Graph, Local Business, Organization, Breadcrumbs, and FAQs.
 */

import { PRODUCTION_DOMAIN } from "./seo";
import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";
import { getPerfumeReviewStats } from "../data/reviews";

export const ORGANIZATION_SCHEMA = {
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
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jaipur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+919950891935",
    "contactType": "customer service",
    "email": "support@sentirebypc.com",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.instagram.com/sentireforelite"
  ]
};

export const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${PRODUCTION_DOMAIN}/#website`,
  "url": PRODUCTION_DOMAIN,
  "name": "SENTIRE By PC",
  "publisher": {
    "@id": `${PRODUCTION_DOMAIN}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${PRODUCTION_DOMAIN}/perfumes?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const JAIPUR_STORE_SCHEMA = {
  "@type": ["Store", "LocalBusiness"],
  "@id": `${PRODUCTION_DOMAIN}/#jaipur-store`,
  "name": "SENTIRE By PC Haute Parfumerie Atelier",
  "image": `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
  "url": PRODUCTION_DOMAIN,
  "telephone": "+919950891935",
  "email": "support@sentirebypc.com",
  "priceRange": "₹350 - ₹4999",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking, COD",
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
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:30",
      "closes": "21:00"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Jaipur"
    },
    {
      "@type": "Country",
      "name": "India"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sentire Haute Parfumerie & Personalisation Catalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Laser Photo Engraving on Perfume Bottles",
          "description": "High-precision laser etching of portraits, images, and custom line art directly onto luxury perfume glass flacons."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bespoke Name & Monogram Engraving",
          "description": "Personalized typography engraving of names, anniversary dates, and messages on perfume bottles."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Express & Same-Day Perfume Delivery",
          "description": "Break-proof express fragrance delivery across Jaipur, Delhi NCR, Mumbai, Bangalore, and all Indian pincodes."
        }
      }
    ]
  }
};

export const SHIPPING_DETAILS_SCHEMA = {
  "@type": "OfferShippingDetails",
  "@id": `${PRODUCTION_DOMAIN}/#shipping-details`,
  "shippingRate": {
    "@type": "MonetaryAmount",
    "value": 0,
    "currency": "INR"
  },
  "shippingDestination": {
    "@type": "DefinedRegion",
    "addressCountry": "IN"
  },
  "deliveryTime": {
    "@type": "ShippingDeliveryTime",
    "handlingTime": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 1,
      "unitCode": "DAY"
    },
    "transitTime": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": 4,
      "unitCode": "DAY"
    }
  }
};

export const RETURN_POLICY_SCHEMA = {
  "@type": "MerchantReturnPolicy",
  "@id": `${PRODUCTION_DOMAIN}/#return-policy`,
  "applicableCountry": "IN",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 7,
  "returnMethod": "https://schema.org/ReturnByMail",
  "returnFees": "https://schema.org/FreeReturn"
};

/**
 * Builds Schema.org Product / ProductGroup JSON-LD for a given perfume.
 */
export function generateProductSchema(product: PerfumeProduct) {
  const defaultSize = product.sizes.includes(50) ? 50 : product.sizes[0];
  const primaryPrice = product.prices[defaultSize] || 2499;
  const canonicalUrl = `${PRODUCTION_DOMAIN}/perfumes?id=${product.id}`;
  const fullImageUrl = product.img.startsWith("http")
    ? product.img
    : `${PRODUCTION_DOMAIN}${product.img.split("?")[0]}`;

  const variants = product.sizes.map((size) => {
    const sizePrice = product.prices[size] || 2499;
    const isOutOfStock = product.outOfStockSizes?.includes(size);
    const sizeTitle = size === 50
      ? `SENTIRE ${product.name} Personalised Extrait de Parfum (50ml) — Photo & Name Engraved`
      : size === 30
      ? `SENTIRE ${product.name} Voyage Flacon Extrait de Parfum (30ml)`
      : `SENTIRE ${product.name} Discovery Purse Spray Extrait de Parfum (10ml)`;

    return {
      "@type": "Product",
      "@id": `${canonicalUrl}#size-${size}ml`,
      "name": sizeTitle,
      "sku": `SENTIRE-${product.id.toUpperCase()}-${size}ML`,
      "image": fullImageUrl,
      "description": `${product.desc} — Luxury Extrait de Parfum formulated with 35%+ pure perfume oil concentration for all-day 12+ hour sillage. Complimentary photo or name laser bottle engraving available on 50ml flacons.`,
      "size": `${size}ml`,
      "brand": {
        "@type": "Brand",
        "name": "SENTIRE By PC"
      },
      "offers": {
        "@type": "Offer",
        "url": canonicalUrl,
        "priceCurrency": "INR",
        "price": sizePrice,
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": isOutOfStock
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
        "seller": {
          "@id": `${PRODUCTION_DOMAIN}/#organization`
        },
        "shippingDetails": {
          "@id": `${PRODUCTION_DOMAIN}/#shipping-details`
        },
        "hasMerchantReturnPolicy": {
          "@id": `${PRODUCTION_DOMAIN}/#return-policy`
        }
      },
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Bottle Size",
          "value": `${size}ml`
        },
        {
          "@type": "PropertyValue",
          "name": "Perfume Oil Concentration",
          "value": "35%+"
        },
        {
          "@type": "PropertyValue",
          "name": "Personalisation",
          "value": size === 50 ? "Photo and Name Laser Bottle Engraving" : "Standard Luxury Flacon"
        },
        {
          "@type": "PropertyValue",
          "name": "Fragrance Family",
          "value": product.scentFamily
        }
      ]
    };
  });

  const stats = getPerfumeReviewStats(product.id);

  return {
    "@type": "ProductGroup",
    "@id": `${canonicalUrl}#productgroup`,
    "name": `SENTIRE ${product.name} Extrait de Parfum`,
    "description": product.fullDesc || `${product.desc}. Formulated with rare 35%+ pure perfume oil concentration for eternal longevity and sillage. Includes complimentary precision laser bottle engraving.`,
    "url": canonicalUrl,
    "brand": {
      "@type": "Brand",
      "name": "SENTIRE By PC"
    },
    "image": fullImageUrl,
    "productGroupID": `SENTIRE-GRP-${product.id.toUpperCase()}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": stats.averageRating,
      "reviewCount": stats.count,
      "bestRating": "5",
      "worstRating": "1"
    },
    "variesBy": ["https://schema.org/size"],
    "hasVariant": variants
  };
}

/**
 * Builds BreadcrumbList JSON-LD
 */
export function generateBreadcrumbsSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${PRODUCTION_DOMAIN}${item.url}`
    }))
  };
}

/**
 * Builds FAQPage JSON-LD for verified questions
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

export const CLIENT_SERVICES_FAQS = [
  {
    q: "How can I track my Sentire perfume order?",
    a: "You can track your package in real time using our Track Order page with your Order Number or courier AWB tracking number. All orders are dispatched via break-proof express courier with complimentary transit insurance."
  },
  {
    q: "What makes Sentire's 35%+ perfume oil concentration special?",
    a: "Standard Eau de Parfum (EDP) contains only 12% to 18% fragrance oil. Sentire crafts Extrait de Parfum with 35%+ pure perfume oil concentration, providing an intense 12+ hour sillage that lasts all day without aggressive alcohol evaporation."
  },
  {
    q: "How does laser bottle photo and name engraving work?",
    a: "Our atelier uses precision high-definition laser technology to etch customer portraits, custom names, anniversaries, or messages directly onto the weighted glass perfume bottle."
  },
  {
    q: "What is Sentire's return and exchange policy?",
    a: "Sentire offers standard return assistance for items damaged in transit or incorrect dispatches. Submit a Return & Exchange request with photos and our Jaipur concierge will dispatch an express replacement."
  },
  {
    q: "How long does delivery take across India?",
    a: "Orders are processed within 24 hours in Jaipur. Express delivery typically takes 24-48 hours for metro cities and 2-4 days for other pincodes across India."
  }
];

export const PERSONALISATION_FAQS = [
  {
    q: "Can I engrave both a photograph and a name on the perfume bottle?",
    a: "Yes! Sentire's Bespoke Atelier allows you to upload any portrait or artwork for high-definition laser glass etching along with a personalized name or date in elegant serif typography."
  },
  {
    q: "Which perfume bottle sizes support custom engraving?",
    a: "Photo and name laser engraving is available exclusively on our 50ml Grand Flacons to ensure flawless resolution and luxury glass surface area."
  },
  {
    q: "Does bottle engraving delay shipping?",
    a: "No. Our Jaipur atelier processes precision laser engravings in-house within 24 hours, ensuring fast dispatch without delivery delays."
  }
];

/**
 * Builds ItemList JSON-LD for collection pages
 */
export function generateItemListSchema(title: string, products: PerfumeProduct[]) {
  return {
    "@type": "ItemList",
    "name": title,
    "numberOfItems": products.length,
    "itemListElement": products.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${PRODUCTION_DOMAIN}/perfumes?id=${p.id}`,
      "name": `SENTIRE ${p.name} Extrait de Parfum`
    }))
  };
}

/**
 * Generates the master JSON-LD graph for any given route.
 */
export function getStructuredDataForPage(
  page: string,
  product?: PerfumeProduct | null
) {
  const graph: any[] = [
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    JAIPUR_STORE_SCHEMA,
    SHIPPING_DETAILS_SCHEMA,
    RETURN_POLICY_SCHEMA
  ];

  if (product) {
    graph.push(generateProductSchema(product));
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Perfumes", url: "/perfumes" },
        { name: product.name, url: `/perfumes?id=${product.id}` }
      ])
    );
  } else if (page === "perfumes") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Perfumes", url: "/perfumes" }
      ])
    );
    graph.push(generateItemListSchema("SENTIRE Extrait de Parfum Collection", ALL_PERFUMES));
    ALL_PERFUMES.forEach((p) => {
      graph.push(generateProductSchema(p));
    });
  } else if (page === "bestsellers") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Best Sellers", url: "/bestsellers" }
      ])
    );
    const bestSellers = ALL_PERFUMES.filter((p) => p.badge === "bestseller");
    graph.push(generateItemListSchema("SENTIRE Best-Selling Extraits de Parfum", bestSellers.length ? bestSellers : ALL_PERFUMES.slice(0, 4)));
  } else if (page === "new-arrivals") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "New Arrivals", url: "/new-arrivals" }
      ])
    );
    const newArrivals = ALL_PERFUMES.filter((p) => p.badge === "new" || p.badge === "exclusive");
    graph.push(generateItemListSchema("SENTIRE New Artisanal Perfume Arrivals", newArrivals.length ? newArrivals : ALL_PERFUMES.slice(0, 4)));
  } else if (page === "personalisation") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Atelier Personalisation", url: "/personalisation" }
      ])
    );
    graph.push(generateFAQSchema(PERSONALISATION_FAQS));
  } else if (page === "byob") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Build Your Own Box", url: "/byob" }
      ])
    );
  } else if (page === "about") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" }
      ])
    );
  } else if (page === "client-services") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Client Services", url: "/client-services" }
      ])
    );
    graph.push(generateFAQSchema(CLIENT_SERVICES_FAQS));
  } else if (page === "track-order") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Track Order", url: "/track-order" }
      ])
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

