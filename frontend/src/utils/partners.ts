import { rememberPartnerRule } from "./coupons";

/*
 * Influencer partner links: sentirebypc.com/r/CODE (or any page with
 * ?ref=CODE). Opening one remembers the partner for 30 days (the last link
 * opened wins), counts the click, and puts their coupon in the bag. The
 * checkout then credits the order to them.
 */
export const API_BASE =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ||
  "https://ecommerce-backend-1041917436859.asia-south1.run.app";

const REF_KEY = "sentire_partner_ref";
const REF_DAYS = 30;
const CODE_RE = /^[A-Z0-9]{4,15}$/;

/** The partner link this visitor came from (within 30 days), if any. */
export function getPartnerRef(): string | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(REF_KEY) || "null");
    if (saved?.code && Date.now() - saved.at < REF_DAYS * 24 * 60 * 60 * 1000) return saved.code;
  } catch {}
  return undefined;
}

/** Run once on page load: pick up /r/CODE or ?ref=CODE. */
export function capturePartnerRef() {
  try {
    const url = new URL(window.location.href);
    const fromPath = url.pathname.match(/^\/r\/([^/?#]+)/i)?.[1];
    const code = String(fromPath || url.searchParams.get("ref") || "")
      .trim()
      .toUpperCase();
    if (fromPath) {
      // the short link lands on the home page
      window.history.replaceState(null, "", "/" + url.search.replace(/([?&])ref=[^&]*&?/i, "$1").replace(/[?&]$/, ""));
    }
    if (!CODE_RE.test(code)) return;
    fetch(`${API_BASE}/api/partners/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data?.ok) return; // not a live partner code
        localStorage.setItem(REF_KEY, JSON.stringify({ code, at: Date.now() }));
        rememberPartnerRule(code, { off: Number(data.off) || 0, min: Number(data.min) || 0 });
        // their coupon goes in the bag, unless the visitor already chose one
        if (!localStorage.getItem("sentire_applied_coupon")) localStorage.setItem("sentire_applied_coupon", code);
      })
      .catch(() => {});
  } catch {}
}

// ── signed-in calls ──────────────────────────────────────────────────

export const sessionToken = () => {
  try {
    return localStorage.getItem("sentire_session_token") || "";
  } catch {
    return "";
  }
};

/** Call /api/partners/... with a bearer token (phone session or admin Google token). */
export async function partnerApi<T = any>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}/api/partners${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    const err = new Error(data?.error || "Something went wrong. Please try again.") as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data as T;
}

export const inr = (n?: number | null) =>
  `₹${(Number(n) || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
