import { prepareShopifyCheckoutItems, resolveShopifyVariantId, SHOPIFY_VARIANT_MAP } from "./shopifyCart";
import { ALL_PERFUMES } from "../data/perfumes";
import { trackInitiateCheckout } from "./analytics";

/*
 * Shiprocket Checkout (custom website integration). Our server signs the
 * cart with the API keys and returns a session token; Shiprocket's script
 * then opens its checkout (phone OTP, address, live shipping, COD/prepaid,
 * coupons) over the page. After the order, Shiprocket sends the customer to
 * /order-success?oid=…&ost=….
 *
 * On for everyone while SR_CHECKOUT_FOR_EVERYONE is true. Per browser,
 * ?srcheckout=0 switches back to the Shopify checkout (?srcheckout=1 on);
 * with the flag false, only browsers that opened ?srcheckout=1 get it.
 */
export const SR_CHECKOUT_FOR_EVERYONE = true;

const API_BASE =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ||
  "https://ecommerce-backend-1041917436859.asia-south1.run.app";
const SCRIPT = "https://checkout-ui.shiprocket.com/assets/js/channels/shopify.js";
const STYLE = "https://checkout-ui.shiprocket.com/assets/styles/shopify.css";
const FLAG = "sentire_sr_checkout";
const SELLER_DOMAIN = "sentirebypc.com"; // the Shop Domain in the Shiprocket dashboard

type HeadlessCheckout = {
  addToCart: (event: Event, token: string, opts: { fallbackUrl: string; isInitiatedFromApp?: boolean }) => void;
};

// the test switch, from the address bar
try {
  const q = new URLSearchParams(window.location.search).get("srcheckout");
  if (q === "1" || q === "0") localStorage.setItem(FLAG, q);
} catch {}

export function isShiprocketCheckoutOn(): boolean {
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(FLAG);
  } catch {}
  return SR_CHECKOUT_FOR_EVERYONE ? choice !== "0" : choice === "1";
}

let loading: Promise<HeadlessCheckout> | null = null;

/** Shiprocket's script and stylesheet, loaded the first time they're needed. */
export function loadShiprocketCheckout(): Promise<HeadlessCheckout> {
  const ready = () => (window as unknown as { HeadlessCheckout?: HeadlessCheckout }).HeadlessCheckout;
  if (ready()) return Promise.resolve(ready()!);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    // tells Shiprocket's script which store this is (it falls back to the page's host)
    if (!document.getElementById("sellerDomain")) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.id = "sellerDomain";
      input.value = SELLER_DOMAIN;
      document.body.appendChild(input);
    }
    if (!document.querySelector(`link[href="${STYLE}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = STYLE;
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => {
      const hc = ready();
      if (hc) resolve(hc);
      else reject(new Error("Shiprocket checkout script loaded without HeadlessCheckout"));
    };
    s.onerror = () => {
      loading = null;
      reject(new Error("Shiprocket checkout script failed to load"));
    };
    document.body.appendChild(s);
  });
  return loading;
}

/** The Shopify cart link for the same items: where the customer goes if Shiprocket is down. */
function shopifyFallbackUrl(rawItems: any[], couponCode?: string) {
  const domain =
    (import.meta.env.VITE_SHOPIFY_CHECKOUT_DOMAIN as string | undefined) || "hbj1d0-99.myshopify.com";
  const parts = prepareShopifyCheckoutItems(rawItems).map(
    (i: any) => `${resolveShopifyVariantId(i)}:${Number(i.quantity) || 1}`,
  );
  const q = couponCode ? `?discount=${encodeURIComponent(couponCode)}` : "";
  return `https://${domain}/cart/${parts.join(",")}${q}`;
}

/**
 * Open Shiprocket's checkout for these bag items. `event` is the click that
 * started it. Resolves once the checkout has been handed to Shiprocket;
 * rejects if it couldn't start (the caller can fall back to Shopify).
 */
export async function startShiprocketCheckout(
  event: Event,
  items: any[],
  opts: { couponCode?: string } = {},
): Promise<void> {
  const utm = (() => {
    try {
      const p = new URLSearchParams(window.location.search);
      return [...p].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => `${k}=${v}`).join("&") || undefined;
    } catch {
      return undefined;
    }
  })();
  const [hc, res] = await Promise.all([
    loadShiprocketCheckout(),
    fetch(`${API_BASE}/api/shiprocket/checkout-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          // the exact Shopify variant the site uses (same ids as our catalog)
          variantId: resolveShopifyVariantId(i),
          productId: String(i.productId ?? i.id ?? ""),
          name: i.name,
          size: i.size,
          quantity: Number(i.quantity) || 1,
          isPersonalised: Boolean(i.isPersonalised),
          engravingText: i.engravingText || undefined,
          engravingDate: i.engravingDate || undefined,
        })),
        couponCode: opts.couponCode || undefined,
        utm,
      }),
    }),
  ]);
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok || !data.token) throw new Error(data?.error || "Could not start checkout");
  // same InitiateCheckout the Shopify checkout path sends (Meta Pixel + GA4)
  try {
    const lines = prepareShopifyCheckoutItems(items);
    trackInitiateCheckout(
      lines.map((i: any) => ({
        id: i.productId || i.id,
        name: i.name,
        price: Number(i.price) || 0,
        quantity: Number(i.quantity) || 1,
      })),
      lines.reduce((sum: number, i: any) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0),
    );
  } catch {}
  // the bag's coupon: Shiprocket's script picks it up from this cookie and
  // shows it applied in the checkout (the code must exist in Shiprocket →
  // Discounts). Cleared when there's none, so an old code isn't reused.
  try {
    const code = (opts.couponCode || "").trim().toUpperCase();
    document.cookie = code
      ? `discount_code=${encodeURIComponent(code)}; path=/; max-age=3600; SameSite=Lax`
      : "discount_code=; path=/; max-age=0";
  } catch {}
  hc.addToCart(event, data.token, { fallbackUrl: shopifyFallbackUrl(items, opts.couponCode) });
}

/** The order's real state from our server (which asks Shiprocket). */
export async function fetchShiprocketOrder(orderId: string) {
  const res = await fetch(`${API_BASE}/api/shiprocket/order-status/${encodeURIComponent(orderId)}`);
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) throw new Error(data?.error || "Could not fetch order");
  return data as {
    number?: string;
    status?: string;
    paymentType?: string;
    paymentStatus?: string;
    edd?: string;
    firstName?: string;
    totalAmount?: number | null;
    items?: { variantId: string; quantity: number }[];
  };
}

export type TrackedOrder = {
  order: {
    orderId: string;
    number: string;
    placedAt: string | null;
    status: string;
    paymentType: string | null;
    paymentStatus: string | null;
    edd: string | null;
    firstName: string | null;
    city: string | null;
    total: number | null;
    items: { variantId: string; quantity: number; price: number | null }[];
  };
  shipment: {
    courier: string | null;
    awb: string | null;
    status: string | null;
    edd: string | null;
    deliveredAt: string | null;
    trackUrl: string | null;
    activities: { date: string; status: string; location: string }[];
  } | null;
};

/** An order's real status (needs the order number and the phone it was placed with). */
export async function trackShiprocketOrder(order: string, phone: string): Promise<TrackedOrder> {
  const res = await fetch(`${API_BASE}/api/shiprocket/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order, phone }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) throw new Error(data?.error || "Tracking is unavailable right now.");
  return data as TrackedOrder;
}

/** What a Shopify variant id is on the site: product name, size and photo. */
export function productForVariant(variantId: string) {
  if (variantId === "46947691659425") return { name: "Custom Bottle Engraving", size: "", img: "/assets/sentire-logo-gold.png" };
  if (variantId === "46965136031905")
    return { name: "SENTIRE Discovery Set", size: "6 × 6 ML", img: "/discovery/studio/box-front.jpg" };
  for (const p of ALL_PERFUMES) {
    for (const [size, id] of Object.entries(SHOPIFY_VARIANT_MAP[p.id] || {})) {
      if (id === variantId)
        return { name: p.name, size: `${size} ML`, img: p.sizeImages?.[Number(size) as 10 | 30 | 50]?.[0] || p.img };
    }
  }
  return { name: "SENTIRE Extrait de Parfum", size: "", img: "/assets/sentire-logo-gold.png" };
}

const MY_ORDERS = "sentire_sr_orders";

/** Orders placed on this device through Shiprocket Checkout (newest first), for My Orders. */
export function getSavedOrders(): any[] {
  try {
    const list = JSON.parse(localStorage.getItem(MY_ORDERS) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: {
  orderId: string;
  number: string;
  total: number | null;
  paymentType?: string | null;
  items: { variantId: string; quantity: number; price?: number | null }[];
}) {
  try {
    const list = getSavedOrders().filter((o) => o.id !== order.orderId);
    list.unshift({
      id: order.orderId,
      orderNumber: order.number,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Confirmed",
      total: Number(order.total) || 0,
      paymentType: order.paymentType || null,
      items: order.items.map((i) => {
        const p = productForVariant(i.variantId);
        return { name: p.name, size: p.size.replace(/\s*ML$/i, ""), quantity: i.quantity, price: Number(i.price) || 0, img: p.img };
      }),
    });
    localStorage.setItem(MY_ORDERS, JSON.stringify(list.slice(0, 50)));
  } catch {}
}
