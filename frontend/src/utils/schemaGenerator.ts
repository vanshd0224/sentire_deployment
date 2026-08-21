/**
 * Sentire by PC - JSON-LD Structured Data Generator
 * Generates Schema.org compliant structured data for Google Rich Results,
 * Product Knowledge Graph, Local Business, Organization, and Breadcrumbs.
 */

import { PRODUCTION_DOMAIN } from "./seo";
import { ALL_PERFUMES, PerfumeProduct } from "../data/perfumes";

export const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${PRODUCTION_DOMAIN}/#organization`,
  "name": "Sentire by PC",
  "alternateName": "Sentire",
  "url": PRODUCTION_DOMAIN,
  "logo": {
    "@type": "ImageObject",
    "url": `${PRODUCTION_DOMAIN}/assets/logo.png`,
    "caption": "Sentire by PC Luxury Fragrance House"
  },
  "description": "Indian artisanal luxury fragrance house crafting extraits de parfum with 35%+ perfume oil concentration and complimentary laser bottle photo & name engraving.",
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
    "telephone": "+91-98765-43210",
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
  "name": "Sentire by PC",
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
  "name": "Sentire by PC - Luxury Perfumes & Laser Engraving Jaipur",
  "image": `${PRODUCTION_DOMAIN}/images/hero-celestial.png`,
  "url": PRODUCTION_DOMAIN,
  "telephone": "+91-98765-43210",
  "priceRange": "₹₹ - ₹₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "M.I. Road",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.9124,
    "longitude": 75.7873
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
    "name": "Sentire Haute Parfumerie & Personalisation",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Photo Laser Engraving on Perfume Bottles",
          "description": "High-precision laser etching of portraits, images, and custom line art directly onto the perfume flacon."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Name & Monogram Engraving",
          "description": "Personalized typography engraving of names, dates, and bespoke messages."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Jaipur Express & Same-Day Delivery",
          "description": "Express fragrance delivery across Jaipur and major metropolitan hubs in India."
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
  const primaryMrp = product.mrps?.[defaultSize] || primaryPrice + 800;
  const canonicalUrl = `${PRODUCTION_DOMAIN}/perfumes?id=${product.id}`;
  const fullImageUrl = product.img.startsWith("http")
    ? product.img
    : `${PRODUCTION_DOMAIN}${product.img.split("?")[0]}`;

  const variants = product.sizes.map((size) => {
    const sizePrice = product.prices[size] || 2499;
    const isOutOfStock = product.outOfStockSizes?.includes(size);
    const sizeTitle = size === 50
      ? `Sentire ${product.name} Personalised Perfume with Photo Engraving (50ml)`
      : size === 30
      ? `Sentire ${product.name} Voyage Flacon (30ml)`
      : `Sentire ${product.name} Discovery Purse Spray (10ml)`;

    return {
      "@type": "Product",
      "@id": `${canonicalUrl}#size-${size}ml`,
      "name": sizeTitle,
      "sku": `SENTIRE-${product.id.toUpperCase()}-${size}ML`,
      "image": fullImageUrl,
      "description": `${product.desc} — Extraits de parfum featuring 35%+ perfume oil concentration and complimentary laser photo/name engraving.`,
      "size": `${size}ml`,
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
          "value": "Photo and Name Laser Engraving"
        },
        {
          "@type": "PropertyValue",
          "name": "Fragrance Family",
          "value": product.scentFamily
        }
      ]
    };
  });

  return {
    "@type": "ProductGroup",
    "@id": `${canonicalUrl}#productgroup`,
    "name": `Sentire ${product.name} Personalised Perfume`,
    "description": product.fullDesc || `${product.desc}. Featuring 35%+ perfume oil concentration and complimentary laser engraving.`,
    "url": canonicalUrl,
    "brand": {
      "@id": `${PRODUCTION_DOMAIN}/#organization`
    },
    "image": fullImageUrl,
    "productGroupID": `SENTIRE-GRP-${product.id.toUpperCase()}`,
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
    // Add product summaries
    ALL_PERFUMES.slice(0, 11).forEach((p) => {
      graph.push(generateProductSchema(p));
    });
  } else if (page === "bestsellers") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Best Sellers", url: "/bestsellers" }
      ])
    );
  } else if (page === "new-arrivals") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "New Arrivals", url: "/new-arrivals" }
      ])
    );
  } else if (page === "personalisation") {
    graph.push(
      generateBreadcrumbsSchema([
        { name: "Home", url: "/" },
        { name: "Atelier Personalisation", url: "/personalisation" }
      ])
    );
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
