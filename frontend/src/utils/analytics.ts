/**
 * Sentire by PC - E-Commerce & Personalisation Analytics Suite
 * Dispatches standard GA4 / GTM AND Meta Pixel (Facebook Pixel) events safely.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export type AnalyticsEvent =
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "select_size"
  | "personalisation_selected"
  | "photo_engraving_selected"
  | "name_engraving_selected"
  | "photo_upload_started"
  | "photo_upload_completed"
  | "photo_upload_failed"
  | "engraving_preview_generated"
  | "engraving_preview_viewed"
  | "pincode_checked"
  | "express_delivery_available"
  | "express_delivery_unavailable"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "whatsapp_clicked"
  | "corporate_enquiry_submitted"
  | "wedding_enquiry_submitted";

export interface AnalyticsPayload {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  item_variant?: string | number;
  price?: number;
  currency?: string;
  quantity?: number;
  value?: number;
  search_term?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    item_category?: string;
    item_variant?: string | number;
    price: number;
    quantity: number;
  }>;
  pincode_state?: string;
  delivery_type?: "standard" | "express" | "same_day_jaipur";
  personalisation_type?: "photo_laser" | "name_engraving" | "none";
  [key: string]: any;
}

/**
 * Strips any potential PII (customer names, emails, raw photos, messages)
 * before dispatching to analytics layers.
 */
function sanitizePayload(payload: AnalyticsPayload): AnalyticsPayload {
  const sanitized: AnalyticsPayload = { ...payload };
  delete sanitized.customer_name;
  delete sanitized.name;
  delete sanitized.email;
  delete sanitized.phone;
  delete sanitized.photo_file;
  delete sanitized.engraving_text;
  delete sanitized.custom_message;
  delete sanitized.uploaded_image;
  return sanitized;
}

const META_PIXEL_ID = "4305047443093499";
const META_CAPI_TOKEN = "EAAOrZBJm6eOUBSVZBpg9UVS3ZBZBUWdY9UyAlAQzF3q9iIHZAM41lXnevRq2dGOh1YHTMLsML8aB56ZAXX99Nkz0BZCAsjmb54NgZC3qleyNqalKvQdV1ZA7ZBD9ispcMX7vfD5nZCWaYZAZAzc66FZBUfr5XoRjR8G90EvhiMwCZCocDAQ2eX4haWoIHKbfk7H5Cj5n9AZCHQZDZD";

export function sendMetaCapiEvent(eventName: string, customData: Record<string, any> = {}) {
  try {
    if (typeof window === "undefined") return;
    const eventTime = Math.floor(Date.now() / 1000);
    const eventSourceUrl = window.location.href;
    const userAgent = navigator.userAgent || "";

    // Extract fbp / fbc cookies if available or fallback
    let fbp = "";
    let fbc = "";
    try {
      const cookies = document.cookie.split(";");
      for (let c of cookies) {
        const [k, v] = c.trim().split("=");
        if (k === "_fbp") fbp = v;
        if (k === "_fbc") fbc = v;
      }
    } catch (e) {}

    if (!fbp) {
      fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1000000000)}`;
    }

    const userData: Record<string, any> = {
      client_user_agent: userAgent,
      fbp: fbp,
    };
    if (fbc) userData.fbc = fbc;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          event_source_url: eventSourceUrl,
          action_source: "website",
          user_data: userData,
          custom_data: customData,
        },
      ],
    };

    fetch(`https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_CAPI_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch (err) {
    // Non-blocking
  }
}

/**
 * Dispatch Meta Pixel (Facebook Pixel) & Conversions API (CAPI) events
 */
export function trackMetaPixel(eventName: string, data: Record<string, any> = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", eventName, data);
    }
    sendMetaCapiEvent(eventName, data);
  } catch (err) {
    // Non-blocking catch
  }
}

/**
 * Convenience helper for AddToCart (Meta + GTM)
 */
export function trackAddToCart(item: {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  variant?: string | number;
  category?: string;
}) {
  const qty = item.quantity || 1;
  const val = item.price * qty;

  // 1. Meta Pixel AddToCart Event
  trackMetaPixel("AddToCart", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    content_category: item.category || "Perfumes",
    value: val,
    currency: "INR",
  });

  // 2. GA4 / GTM trackEvent
  trackEvent("add_to_cart", {
    item_id: item.id,
    item_name: item.name,
    item_category: item.category || "Perfumes",
    item_variant: item.variant,
    price: item.price,
    quantity: qty,
    value: val,
    currency: "INR",
  });
}

/**
 * Convenience helper for ViewContent / Product View (Meta + GTM)
 */
export function trackViewContent(item: {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string | number;
}) {
  // 1. Meta Pixel ViewContent Event
  trackMetaPixel("ViewContent", {
    content_ids: [item.id],
    content_name: item.name,
    content_type: "product",
    content_category: item.category || "Perfumes",
    value: item.price,
    currency: "INR",
  });

  // 2. GA4 / GTM trackEvent
  trackEvent("view_item", {
    item_id: item.id,
    item_name: item.name,
    item_category: item.category || "Perfumes",
    item_variant: item.variant,
    price: item.price,
    value: item.price,
    currency: "INR",
  });
}

/**
 * Convenience helper for InitiateCheckout (Meta + GTM)
 */
export function trackInitiateCheckout(
  items: Array<{ id: string; name: string; price: number; quantity: number }>,
  totalValue: number
) {
  const contentIds = items.map((i) => i.id);

  // 1. Meta Pixel InitiateCheckout Event
  trackMetaPixel("InitiateCheckout", {
    content_ids: contentIds,
    content_type: "product",
    value: totalValue,
    currency: "INR",
    num_items: items.reduce((acc, curr) => acc + curr.quantity, 0),
  });

  // 2. GA4 / GTM trackEvent
  trackEvent("begin_checkout", {
    value: totalValue,
    currency: "INR",
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity,
    })),
  });
}

/**
 * Convenience helper for Search (Meta + GTM)
 */
export function trackSearch(query: string) {
  if (!query.trim()) return;

  trackMetaPixel("Search", {
    search_string: query,
  });

  trackEvent("search", {
    search_term: query,
  });
}

/**
 * Main event dispatcher
 */
export function trackEvent(eventName: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  try {
    const safePayload = sanitizePayload(payload);

    // 1. Google Tag Manager / dataLayer push
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ecommerce: safePayload,
        timestamp: Date.now(),
      });

      // 2. Direct gtag support if configured
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, safePayload);
      }

      // 3. Meta Pixel Automatic Mapping
      if (eventName === "add_to_cart" && safePayload.item_id) {
        trackMetaPixel("AddToCart", {
          content_ids: [safePayload.item_id],
          content_name: safePayload.item_name,
          content_type: "product",
          value: safePayload.value || safePayload.price || 0,
          currency: safePayload.currency || "INR",
        });
      } else if (eventName === "view_item" && safePayload.item_id) {
        trackMetaPixel("ViewContent", {
          content_ids: [safePayload.item_id],
          content_name: safePayload.item_name,
          content_type: "product",
          value: safePayload.price || 0,
          currency: safePayload.currency || "INR",
        });
      } else if (eventName === "begin_checkout") {
        const ids = safePayload.items?.map((i) => i.item_id) || [];
        trackMetaPixel("InitiateCheckout", {
          content_ids: ids,
          content_type: "product",
          value: safePayload.value || 0,
          currency: "INR",
          num_items: safePayload.items?.length || 1,
        });
      } else if (eventName === "purchase") {
        const ids = safePayload.items?.map((i) => i.item_id) || [];
        trackMetaPixel("Purchase", {
          content_ids: ids,
          content_type: "product",
          value: safePayload.value || 0,
          currency: "INR",
        });
      }
    }
  } catch (err) {
    // Non-blocking catch to ensure UI never fails on analytics
  }
}
