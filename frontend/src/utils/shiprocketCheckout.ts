import { prepareShopifyCheckoutItems, resolveShopifyVariantId } from "./shopifyCart";

/*
 * Shiprocket Checkout (custom website integration). Our server signs the
 * cart with the API keys and returns a session token; Shiprocket's script
 * then opens its checkout (phone OTP, address, live shipping, COD/prepaid,
 * coupons) over the page. After the order, Shiprocket sends the customer to
 * /order-success?oid=…&ost=….
 *
 * While being tested it's switched on per browser: visit any page with
 * ?srcheckout=1 (and ?srcheckout=0 to turn it off again). Everyone else
 * keeps the Shopify checkout until SR_CHECKOUT_FOR_EVERYONE is true.
 */
export const SR_CHECKOUT_FOR_EVERYONE = false;

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
  if (q === "1") localStorage.setItem(FLAG, "1");
  if (q === "0") localStorage.removeItem(FLAG);
} catch {}

export function isShiprocketCheckoutOn(): boolean {
  if (SR_CHECKOUT_FOR_EVERYONE) return true;
  try {
    return localStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
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
  hc.addToCart(event, data.token, { fallbackUrl: shopifyFallbackUrl(items, opts.couponCode) });
}

/** The order's real state from our server (which asks Shiprocket). */
export async function fetchShiprocketOrder(orderId: string) {
  const res = await fetch(`${API_BASE}/api/shiprocket/order-status/${encodeURIComponent(orderId)}`);
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) throw new Error(data?.error || "Could not fetch order");
  return data as {
    status?: string;
    paymentType?: string;
    paymentStatus?: string;
    edd?: string;
    firstName?: string;
    items?: { variantId: string; quantity: number }[];
  };
}
