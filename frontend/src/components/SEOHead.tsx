import { useEffect } from "react";
import { getPageMetadata, PRODUCTION_DOMAIN } from "../utils/seo";
import { getStructuredDataForPage } from "../utils/schemaGenerator";

interface SEOHeadProps {
  currentPage: string;
  selectedProductModal?: any;
}

function updateMetaTag(attr: "name" | "property", key: string, value: string | undefined) {
  if (!value) return;
  let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function updateLinkTag(rel: string, href: string | undefined) {
  if (!href) return;
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEOHead({ currentPage, selectedProductModal }: SEOHeadProps) {
  useEffect(() => {
    const meta = getPageMetadata(currentPage, selectedProductModal);
    const structuredData = getStructuredDataForPage(currentPage, selectedProductModal);

    // 1. Page Title
    document.title = meta.title;

    // 2. Meta Description & Keywords
    updateMetaTag("name", "description", meta.description);
    if (meta.keywords) {
      updateMetaTag("name", "keywords", meta.keywords);
    }

    // 3. Robots Directives
    if (meta.robots && meta.robots.includes("noindex")) {
      updateMetaTag("name", "robots", "noindex, nofollow");
    } else {
      updateMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      updateMetaTag("name", "googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      updateMetaTag("name", "bingbot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // 4. Canonical Link
    updateLinkTag("canonical", meta.canonical);

    // 5. Open Graph Metadata
    updateMetaTag("property", "og:title", meta.ogTitle || meta.title);
    updateMetaTag("property", "og:description", meta.ogDescription || meta.description);
    updateMetaTag("property", "og:url", meta.canonical);
    updateMetaTag("property", "og:type", meta.ogType);
    updateMetaTag("property", "og:image", meta.ogImage);
    updateMetaTag("property", "og:site_name", "Sentire by PC");
    updateMetaTag("property", "og:locale", "en_IN");

    // 6. Twitter Card Metadata
    updateMetaTag("name", "twitter:card", meta.twitterCard);
    updateMetaTag("name", "twitter:title", meta.ogTitle || meta.title);
    updateMetaTag("name", "twitter:description", meta.ogDescription || meta.description);
    updateMetaTag("name", "twitter:image", meta.ogImage);
    updateMetaTag("name", "twitter:site", "@sentireforelite");

    // 7. Inject / Update Dynamic JSON-LD Structured Data
    let scriptTag = document.getElementById("sentire-dynamic-jsonld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "sentire-dynamic-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }, [currentPage, selectedProductModal]);

  return null;
}
