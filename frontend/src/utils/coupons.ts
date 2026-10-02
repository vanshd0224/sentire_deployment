/*
 * The bag's coupons: the site's own codes plus influencer partner codes
 * (looked up on our server). The checkout server applies the same rules
 * (backend/services/bagCoupons.js) — keep the site codes in step.
 */
export type CouponRule = { off: number; min: number };

const SITE: Record<string, CouponRule> = {
  PC100: { off: 100, min: 999 },
  PC200: { off: 200, min: 1999 },
  TEST99: { off: 99, min: 0 },
  ANSH150: { off: 150, min: 1249 },
  BHAVYA150: { off: 150, min: 1249 },
  AV150: { off: 150, min: 1249 },
};

const API_BASE =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ||
  "https://ecommerce-backend-1041917436859.asia-south1.run.app";
const PARTNER_RULES = "sentire_partner_rules";

const normalize = (code?: string | null) => String(code || "").trim().toUpperCase();

function cachedPartnerRules(): Record<string, CouponRule> {
  try {
    return JSON.parse(localStorage.getItem(PARTNER_RULES) || "{}") || {};
  } catch {
    return {};
  }
}

export function rememberPartnerRule(code: string, rule: CouponRule) {
  try {
    const all = cachedPartnerRules();
    all[normalize(code)] = { off: rule.off, min: rule.min };
    localStorage.setItem(PARTNER_RULES, JSON.stringify(all));
  } catch {}
}

/** A code's rule if we already know it (site code, or a partner code seen before). */
export function couponRule(code?: string | null): CouponRule | null {
  const c = normalize(code);
  return SITE[c] || cachedPartnerRules()[c] || null;
}

/** A code's rule, asking our server about partner codes we haven't seen. */
export async function lookupCoupon(code?: string | null): Promise<CouponRule | null> {
  const c = normalize(code);
  if (!c) return null;
  if (SITE[c]) return SITE[c];
  if (!/^[A-Z0-9]{4,15}$/.test(c)) return null;
  try {
    const res = await fetch(`${API_BASE}/api/partners/code/${encodeURIComponent(c)}`);
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return null;
    const rule = { off: Number(data.off) || 0, min: Number(data.min) || 0 };
    rememberPartnerRule(c, rule);
    return rule;
  } catch {
    return couponRule(c);
  }
}

/** What a code takes off this subtotal (0 if it doesn't apply yet). */
export function couponDiscount(code: string | null | undefined, subtotal: number): number {
  const rule = couponRule(code);
  if (!rule || subtotal < rule.min) return 0;
  return Math.min(rule.off, subtotal);
}
