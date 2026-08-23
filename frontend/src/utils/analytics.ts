/**
 * Sentire by PC - Privacy-Preserving E-Commerce & Personalisation Analytics
 * Dispatches standard GA4 / GTM events without passing any customer PII.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
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
    }
  } catch (err) {
    // Non-blocking catch to ensure UI never fails on analytics
  }
}
