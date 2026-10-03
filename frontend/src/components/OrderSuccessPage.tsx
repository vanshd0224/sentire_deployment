import { useEffect, useState } from "react";
import type { PageName } from "../types/appTypes";
import { fetchShiprocketOrder, saveOrder } from "../utils/shiprocketCheckout";
import { trackEvent } from "../utils/analytics";
import { isLoggedIn } from "../utils/account";
import { API_BASE } from "../utils/partners";

type Order = Awaited<ReturnType<typeof fetchShiprocketOrder>>;

/**
 * Where Shiprocket Checkout sends the customer after an order
 * (/order-success?oid=…&ost=…). The order's state comes from our server,
 * which asks Shiprocket, rather than from the address bar.
 */
export default function OrderSuccessPage({
  onNavigate,
  onClearCart,
}: {
  onNavigate?: (page: PageName) => void;
  onClearCart?: () => void;
}) {
  const params = new URLSearchParams(window.location.search);
  const oid = params.get("oid") || "";
  const ost = (params.get("ost") || "").toUpperCase();
  const [order, setOrder] = useState<Order | null>(null);
  const [state, setState] = useState<"loading" | "placed" | "failed" | "pending">(oid ? "loading" : "pending");
  // the account they're logged in to (from the number Shiprocket verified)
  const [account, setAccount] = useState<{ name: string; phone: string } | null>(() => {
    try {
      const phone = localStorage.getItem("sentire_user_phone") || "";
      return isLoggedIn() && phone ? { name: localStorage.getItem("sentire_user_name") || "", phone } : null;
    } catch {
      return null;
    }
  });

  // Placed an order without logging in to the site: Shiprocket verified their
  // phone at checkout, so log them in with it (no second OTP) — their name,
  // number and this order then show in their profile / My Orders.
  useEffect(() => {
    if (state !== "placed" || !oid || isLoggedIn()) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/shiprocket/claim-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: oid }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled || !d?.ok || !d.token) return;
        try {
          localStorage.setItem("sentire_session_token", d.token);
          localStorage.setItem("sentire_user_phone", d.phone);
          localStorage.setItem("sentire_is_logged_in", "true");
          if (d.name) localStorage.setItem("sentire_user_name", d.name);
          if (d.email) localStorage.setItem("sentire_user_email", d.email);
        } catch {}
        setAccount({ name: d.name || "", phone: d.phone });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [state, oid]);

  useEffect(() => {
    if (!oid) return;
    let cancelled = false;
    fetchShiprocketOrder(oid)
      .then((o) => {
        if (cancelled) return;
        setOrder(o);
        const s = (o.status || "").toUpperCase();
        setState(s === "SUCCESS" ? "placed" : s === "FAILED" ? "failed" : "pending");
      })
      // couldn't reach us: go by what Shiprocket put in the redirect
      .catch(() => !cancelled && setState(ost === "SUCCESS" ? "placed" : ost === "FAILED" ? "failed" : "pending"));
    return () => {
      cancelled = true;
    };
  }, [oid, ost]);

  useEffect(() => {
    if (state !== "placed") return;
    onClearCart?.();
    try {
      localStorage.removeItem("sentire_applied_coupon");
    } catch {}
    if (!order || !oid) return;
    // for My Orders on this device
    saveOrder({
      orderId: oid,
      number: order.number || oid.slice(-8).toUpperCase(),
      total: order.totalAmount ?? null,
      paymentType: order.paymentType,
      items: order.items || [],
    });
    // Purchase (Meta Pixel + GA4), once per order even if the page is reopened
    try {
      const key = `sentire_purchase_tracked_${oid}`;
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {}
    trackEvent("purchase", {
      transaction_id: oid,
      value: Number(order.totalAmount) || 0,
      currency: "INR",
      payment_type: order.paymentType,
      items: (order.items || []).map((i) => ({
        item_id: i.variantId,
        item_name: i.variantId,
        price: 0,
        quantity: i.quantity,
      })),
    });
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const cod = (order?.paymentType || "").toUpperCase().includes("CASH");
  const eyebrow =
    state === "placed" ? "Order confirmed" : state === "failed" ? "Order not placed" : "Order received";

  return (
    <main className="flex min-h-[70svh] w-full items-center justify-center bg-[#f2f2f0] px-5 py-24 text-ink">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 max-sm:text-[12px]">
          {state === "loading" ? "One moment" : eyebrow}
        </p>

        {state === "loading" ? (
          <div className="mt-8 flex justify-center" aria-label="Checking your order">
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-ink/20 border-t-ink" />
          </div>
        ) : (
          <>
            <h1
              className="mt-4 text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.95]"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              {state === "failed" ? (
                <>
                  That didn't{" "}
                  <em className="text-[#6b1422]" style={{ fontStyle: "italic" }}>
                    go through.
                  </em>
                </>
              ) : (
                <>
                  Thank you{order?.firstName ? `, ${order.firstName}` : ""}.{" "}
                  <em className="text-[#6b1422]" style={{ fontStyle: "italic" }}>
                    {state === "placed" ? "It's on its way." : "We've got it."}
                  </em>
                </>
              )}
            </h1>

            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ink/70">
              {state === "failed"
                ? "No money has been taken for this order. Your bag is just as you left it, so you can try again."
                : state === "placed"
                  ? `Your order is confirmed${cod ? " as cash on delivery" : ""}. We'll send the details and tracking to your phone as soon as it ships.`
                  : "We're confirming your order now. You'll get the details on your phone shortly."}
            </p>

            {(oid || order?.edd) && state !== "failed" && (
              <dl className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-px overflow-hidden border border-ink/10 bg-ink/10 text-left">
                {oid && (
                  <div className="bg-[#f2f2f0] px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">Order number</dt>
                    <dd className="mt-1 truncate text-[13px]" title={oid}>
                      {order?.number || oid.slice(-8).toUpperCase()}
                    </dd>
                  </div>
                )}
                <div className="bg-[#f2f2f0] px-4 py-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">
                    {order?.edd ? "Arrives by" : "Payment"}
                  </dt>
                  <dd className="mt-1 text-[13px]">
                    {order?.edd || (cod ? "Cash on delivery" : order?.paymentType ? "Paid online" : "—")}
                  </dd>
                </div>
              </dl>
            )}

            {account && state === "placed" && (
              <p className="mx-auto mt-6 max-w-sm border border-ink/10 bg-white px-4 py-3 text-[13px] text-ink/75">
                Your account: <strong className="text-ink">{account.name || "SENTIRE customer"}</strong> ·{" "}
                {account.phone}
                <br />
                <button
                  type="button"
                  onClick={() => onNavigate?.("account")}
                  className="mt-1 cursor-pointer text-[13px] font-semibold text-[#6b1422] underline"
                >
                  View my orders →
                </button>
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {state === "failed" ? (
                <button
                  type="button"
                  onClick={() => onNavigate?.("cart")}
                  className="cursor-pointer bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-[#6b1422]"
                >
                  Back to bag
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate?.("perfumes")}
                  className="cursor-pointer bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-[#6b1422]"
                >
                  Continue shopping
                </button>
              )}
              {state !== "failed" && (
                <button
                  type="button"
                  onClick={() => {
                    try {
                      localStorage.setItem("sentire_active_track_query", order?.number || oid);
                    } catch {}
                    onNavigate?.("track-order");
                  }}
                  className="cursor-pointer border-b border-ink/30 pb-1 text-[13px] text-ink hover:border-ink"
                >
                  Track this order →
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigate?.("client-services")}
                className="cursor-pointer border-b border-ink/30 pb-1 text-[13px] text-ink hover:border-ink"
              >
                Need help? →
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
