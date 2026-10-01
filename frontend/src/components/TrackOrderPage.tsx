import { useState, useEffect } from "react";
import {
  trackShiprocketOrder,
  productForVariant,
  type TrackedOrder,
} from "../utils/shiprocketCheckout";

interface TrackOrderPageProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
}

const fmtDate = (d?: string | null) => {
  if (!d) return null;
  const t = new Date(d);
  return isNaN(t.getTime())
    ? d
    : t.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

const STEPS = [
  { title: "Confirmed", note: "Order received" },
  { title: "Packed", note: "Courier assigned" },
  { title: "Shipped", note: "On its way to you" },
  { title: "Delivered", note: "In your hands" },
];

// how far along the order is, from what the courier reports
function stepFor(r: TrackedOrder): number {
  const s = (r.shipment?.status || "").toUpperCase();
  if (r.shipment?.deliveredAt || (/DELIVERED/.test(s) && !/UNDELIVERED|RTO/.test(s))) return 3;
  if (r.shipment && /TRANSIT|SHIPPED|PICKED|OUT FOR|DISPATCH|REACHED|ARRIVED/.test(s)) return 2;
  if (r.shipment?.awb) return 1;
  return 0;
}

/**
 * Real order tracking: the order number and the phone it was placed with
 * go to our server, which reads the order from Shiprocket (and the
 * courier's tracking once it has shipped). Nothing is shown unless both
 * match an order.
 */
export default function TrackOrderPage({
  onBackToHome,
  onNavigateToContact,
}: TrackOrderPageProps) {
  const [orderQuery, setOrderQuery] = useState("");
  const [phoneQuery, setPhoneQuery] = useState(() => {
    try {
      return (localStorage.getItem("sentire_user_phone") || "").replace(/^\+91/, "");
    } catch {
      return "";
    }
  });
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackedOrder | null>(null);

  const performTrackingSearch = async (order: string, phone: string) => {
    if (!order.trim() || !phone.trim()) return;
    setIsSearching(true);
    setError(null);
    setResult(null);
    try {
      setResult(await trackShiprocketOrder(order.trim(), phone.trim()));
    } catch (e: any) {
      setError(e?.message || "Tracking is unavailable right now.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    // arriving from My Orders / the order page: the order number is filled in
    const activeQuery = localStorage.getItem("sentire_active_track_query");
    if (activeQuery) {
      localStorage.removeItem("sentire_active_track_query");
      setOrderQuery(activeQuery);
      if (phoneQuery) performTrackingSearch(activeQuery, phoneQuery);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performTrackingSearch(orderQuery, phoneQuery);
  };

  const order = result?.order;
  const shipment = result?.shipment;
  const failed = (order?.status || "").toUpperCase() === "FAILED";
  const step = result ? stepFor(result) : 0;
  const cod = (order?.paymentType || "").toUpperCase().includes("CASH");
  const statusText = failed
    ? "Order not completed"
    : shipment?.status || (step === 0 ? "Confirmed — preparing your parcel" : STEPS[step].title);
  const eta = fmtDate(shipment?.deliveredAt) || fmtDate(shipment?.edd) || fmtDate(order?.edd);

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#161616]">
      {/* ── Breadcrumb & Top Bar ── */}
      <div className="border-b border-[color:var(--accent)]/15 bg-[#f2f2f0] px-5 py-4 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between text-[11px] max-sm:text-[12px] font-medium tracking-[0.12em] uppercase text-ink/60">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="hover:text-[color:var(--accent)] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[color:var(--accent)] font-bold">Track My Order</span>
          </div>
          <span className="hidden sm:inline text-[10px] max-sm:text-[12px] tracking-[0.06em] text-[color:var(--accent)]">
            Sentire Concierge Dispatch
          </span>
        </div>
      </div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-[color:var(--accent)]/15 bg-[#0d0a07] text-[#f2f2f0] py-16 lg:py-24 px-5 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6b1422]/15 via-transparent to-transparent opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-[900px] text-center relative z-10">
          <span className="inline-block rounded-full bg-[#6b1422]/15 border border-[color:var(--accent)]/30 px-3.5 py-1 text-[9px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)]">
            Order Tracking & Dispatch Status
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.08em] text-white">
            Track Your Order
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto font-sans">
            Enter your order number (from your order confirmation message or
            the order page) and the phone number you ordered with.
          </p>
          {/* Track Form */}
          <form onSubmit={handleTrackSubmit} className="mt-8 max-w-xl mx-auto">
            <div className="on-dark flex flex-col sm:flex-row gap-3 bg-[#111111] p-2 rounded-[4px] border border-[color:var(--accent)]/30 shadow-2xl">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Order number"
                required
                autoComplete="off"
                className="flex-1 bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 outline-none font-sans"
                id="trackorderpage-input-1"
                name="trackorderpage-input-1"
              />
              <input
                type="tel"
                inputMode="numeric"
                value={phoneQuery}
                onChange={(e) => setPhoneQuery(e.target.value)}
                placeholder="Phone number"
                required
                autoComplete="tel-national"
                className="w-full sm:w-44 bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-xs text-white placeholder-white/30 outline-none font-sans"
                id="trackorderpage-input-2"
                name="trackorderpage-input-2"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 rounded-lg bg-[#6b1422] text-white font-bold text-xs uppercase tracking-[0.06em] hover:bg-[#7d1a2a] transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isSearching ? "SEARCHING..." : "TRACK STATUS →"}
              </button>
            </div>
          </form>
          {error && (
            <p role="alert" className="mt-5 text-xs sm:text-sm text-[#f0b6bf] max-w-xl mx-auto">
              {error}
            </p>
          )}
        </div>
      </section>
      {/* ── Tracking Result ── */}
      {order && (
        <section className="py-16 px-5 lg:px-12 mx-auto max-w-[1000px]">
          <div className="bg-white rounded-[4px] border border-[color:var(--accent)]/25 p-6 sm:p-10 shadow-xl space-y-8">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
              <div>
                <span className="text-[9px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)]">
                  Order status
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1">
                  Order #{order.number}
                </h2>
                <p className="text-xs text-ink/60 mt-1 font-sans">
                  {[
                    order.placedAt && `Placed on ${fmtDate(order.placedAt)}`,
                    order.city && `Delivering to ${order.city}`,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#f7f7f5] border border-[color:var(--accent)]/40 px-4 py-2 rounded-full self-start sm:self-auto">
                <span className={`h-2 w-2 rounded-full ${failed ? "bg-ink/40" : "bg-[#6b1422]"}`} />
                <span className="text-xs font-bold text-ink uppercase tracking-wider">{statusText}</span>
              </div>
            </div>
            {/* Stepper */}
            {!failed && (
              <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    aria-current={i === step ? "step" : undefined}
                    className={
                      i === step
                        ? "on-dark p-4 rounded-[4px] bg-[#111111] text-white border border-[color:var(--accent)] shadow-md"
                        : i < step
                          ? "p-4 rounded-[4px] bg-[#f4e6e8] border border-[#6b1422]/30 text-[#6b1422]"
                          : "p-4 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400"
                    }
                  >
                    <span className={`text-xs font-bold uppercase block ${i === step ? "text-[color:var(--accent)]" : ""}`}>
                      {i + 1}. {s.title}
                    </span>
                    <span className={`text-[10px] max-sm:text-[12px] mt-1 block ${i === step ? "text-white/70" : ""}`}>
                      {i === 3 && eta && step < 3 ? `Expected ${eta}` : s.note}
                    </span>
                  </li>
                ))}
              </ol>
            )}
            {/* Courier details */}
            {!failed && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f7f7f5] p-5 rounded-[4px] border border-[color:var(--accent)]/20">
                <div>
                  <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                    Courier partner
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {shipment?.courier || "Assigned when your parcel ships"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                    AWB tracking number
                  </span>
                  <span className="text-sm font-semibold text-[color:var(--accent)] font-mono">
                    {shipment?.awb || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                    {step === 3 ? "Delivered" : "Expected delivery"}
                  </span>
                  <span className="text-sm font-semibold text-[#6b1422]">{eta || "—"}</span>
                </div>
                {shipment?.trackUrl && (
                  <a
                    href={shipment.trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:col-span-3 text-xs font-semibold text-[color:var(--accent)] hover:underline"
                  >
                    Open live courier tracking →
                  </a>
                )}
              </div>
            )}
            {/* Courier updates */}
            {shipment && shipment.activities.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Updates</h3>
                <ol className="space-y-3 border-l border-[#6b1422]/25 pl-4">
                  {shipment.activities.map((a, i) => (
                    <li key={i} className="text-xs">
                      <p className="font-semibold text-ink">{a.status}</p>
                      <p className="text-ink/60">{[a.location, a.date].filter(Boolean).join(" • ")}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {!failed && !shipment && (
              <p className="text-xs text-ink/70 leading-relaxed">
                We're preparing your order. As soon as it ships you'll get the
                courier tracking link by SMS / WhatsApp, and it will show here.
              </p>
            )}
            {/* Items */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Items in this order</h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => {
                  const p = productForVariant(item.variantId);
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-[4px] border border-black/10 bg-white"
                    >
                      <img src={p.img} alt={p.name} className="h-12 w-12 object-contain rounded-lg bg-[#f2f2f0]" />
                      <div className="flex-1">
                        <h4 className="font-display text-sm font-semibold text-ink">{p.name}</h4>
                        <p className="text-[11px] max-sm:text-[12px] text-ink/60">
                          {[p.size, `Qty: ${item.quantity}`].filter(Boolean).join(" • ")}
                        </p>
                      </div>
                      {item.price != null && (
                        <span className="text-xs font-bold text-ink">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              {order.total != null && (
                <p className="mt-4 flex justify-between text-xs text-ink/70">
                  <span>{cod ? "Cash on delivery" : order.paymentType ? "Paid online" : "Total"}</span>
                  <span className="font-bold text-ink">
                    ₹{Number(order.total).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </span>
                </p>
              )}
            </div>
            {/* Help Callout */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-ink/70">Need help with your delivery or address?</p>
              <button
                onClick={onNavigateToContact}
                className="on-dark px-5 py-2.5 rounded-lg bg-[#111111] text-[color:var(--accent)] font-bold text-xs uppercase tracking-[0.06em] hover:bg-[#1a1511] transition-colors cursor-pointer"
              >
                CONTACT CLIENT SERVICES →
              </button>
            </div>
          </div>
        </section>
      )}
      {/* ── FAQ & Support Info ── */}
      <section className="py-16 px-5 lg:px-12 mx-auto max-w-[1000px]">
        {" "}
        <div className="text-center max-w-xl mx-auto mb-10">
          {" "}
          <span className="text-[9px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)] block mb-1">
            {" "}
            DELIVERY ASSISTANCE
          </span>{" "}
          <h2 className="font-display text-3xl font-normal text-ink">
            Frequently Asked Questions
          </h2>{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          <div className="p-6 rounded-[4px] bg-white border border-black/10 space-y-2">
            {" "}
            <h3 className="font-display text-base font-semibold text-ink">
              How long does shipping take?
            </h3>{" "}
            <p className="text-xs text-ink/70 leading-relaxed font-sans">
              {" "}
              Standard express dispatch takes 2–4 business days across major
              metros in India. Custom engraved bottles require 24 additional
              hours for precision laser-engraving at our Jaipur atelier.
            </p>{" "}
          </div>{" "}
          <div className="p-6 rounded-[4px] bg-white border border-black/10 space-y-2">
            {" "}
            <h3 className="font-display text-base font-semibold text-ink">
              What if I’m unavailable during delivery?
            </h3>{" "}
            <p className="text-xs text-ink/70 leading-relaxed font-sans">
              {" "}
              Our courier partners attempt
              delivery up to 3 times and send SMS alerts prior to arrival. You
              can also request a re-delivery slot through Client Services.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
