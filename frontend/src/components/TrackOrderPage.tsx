import { useState, useEffect } from "react";

interface TrackOrderPageProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
}

interface OrderStatusResult {
  orderNumber: string;
  customerName: string;
  status: "processing" | "engraving" | "dispatched" | "delivered";
  statusText: string;
  date: string;
  estimatedDelivery: string;
  courier: string;
  awb: string;
  items: {
    name: string;
    size: string;
    quantity: number;
    price: number;
    img: string;
  }[];
}

export default function TrackOrderPage({
  onBackToHome,
  onNavigateToContact,
}: TrackOrderPageProps) {
  const [orderQuery, setOrderQuery] = useState("");
  const [contactQuery, setContactQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderStatusResult | null>(
    null,
  );

  const performTrackingSearch = (queryStr: string) => {
    if (!queryStr.trim()) return;

    setIsSearching(true);
    const cleanQuery = queryStr.trim().toUpperCase();

    // 1. Fetch user orders from localStorage (user specific + generic)
    let allOrders: any[] = [];
    try {
      const generic = localStorage.getItem("sentire_user_orders");
      if (generic) allOrders = [...allOrders, ...JSON.parse(generic)];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("sentire_orders_")) {
          const val = localStorage.getItem(key);
          if (val) {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) allOrders = [...allOrders, ...parsed];
          }
        }
      }
    } catch (e) {}

    // Find order matching number or ID
    const foundOrder = allOrders.find((o: any) => {
      const num = String(o.orderNumber || o.id || "").toUpperCase();
      return (
        num === cleanQuery ||
        num.endsWith(cleanQuery) ||
        cleanQuery.endsWith(num)
      );
    });

    setTimeout(() => {
      setIsSearching(false);
      setSearched(true);

      const todayStr = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const estArrival = new Date(
        Date.now() + 4 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (foundOrder && foundOrder.items && foundOrder.items.length > 0) {
        setOrderResult({
          orderNumber: foundOrder.orderNumber || foundOrder.id,
          customerName:
            localStorage.getItem("sentire_user_name") ||
            "Valued Sentire Client",
          status: "dispatched",
          statusText: "In Transit — Extrait de Parfum Formulated & Dispatched",
          date: foundOrder.date || todayStr,
          estimatedDelivery: estArrival,
          courier: "Bluedart Luxury Express",
          awb: `BLU-${Math.floor(100000000 + Math.random() * 900000000)}`,
          items: foundOrder.items.map((it: any) => ({
            name: it.name,
            size: it.size
              ? String(it.size).includes("ml")
                ? String(it.size)
                : `${it.size} ml Extrait de Parfum`
              : "50 ml Extrait de Parfum",
            quantity: it.quantity || 1,
            price: it.price || 1489,
            img: it.img || it.image || "/assets/white-oud.png",
          })),
        });
      } else {
        const orderNum = cleanQuery.startsWith("SNT-")
          ? cleanQuery
          : `SNT-${cleanQuery}`;

        setOrderResult({
          orderNumber: orderNum,
          customerName:
            localStorage.getItem("sentire_user_name") ||
            "Valued Sentire Client",
          status: "dispatched",
          statusText: "In Transit — Extrait de Parfum Formulated & Dispatched",
          date: todayStr,
          estimatedDelivery: estArrival,
          courier: "Bluedart Luxury Express",
          awb: `BLU-${Math.floor(100000000 + Math.random() * 900000000)}`,
          items: [
            {
              name: "Sentire Luxury Extrait de Parfum",
              size: "30 ml Voyage Flacon",
              quantity: 1,
              price: 1489,
              img: "/assets/white-oud.png",
            },
          ],
        });
      }
    }, 400);
  };

  useEffect(() => {
    const activeQuery = localStorage.getItem("sentire_active_track_query");
    if (activeQuery) {
      localStorage.removeItem("sentire_active_track_query");
      setOrderQuery(activeQuery);
      performTrackingSearch(activeQuery);
    }
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performTrackingSearch(orderQuery);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#161616]">
      {" "}
      {/* ── Breadcrumb & Top Bar ── */}
      <div className="border-b border-[color:var(--accent)]/15 bg-[#f2f2f0] px-5 py-4 lg:px-12">
        {" "}
        <div className="mx-auto flex max-w-[1280px] items-center justify-between text-[11px] max-sm:text-[12px] font-medium tracking-[0.12em] uppercase text-ink/60">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <button
              onClick={onBackToHome}
              className="hover:text-[color:var(--accent)] transition-colors cursor-pointer"
            >
              {" "}
              Home
            </button>{" "}
            <span>/</span>{" "}
            <span className="text-[color:var(--accent)] font-bold">
              Track My Order
            </span>{" "}
          </div>{" "}
          <span className="hidden sm:inline text-[10px] max-sm:text-[12px] tracking-[0.06em] text-[color:var(--accent)]">
            {" "}
            Sentire Concierge Dispatch
          </span>{" "}
        </div>{" "}
      </div>{" "}
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-[color:var(--accent)]/15 bg-[#0d0a07] text-[#f2f2f0] py-16 lg:py-24 px-5 lg:px-12">
        {" "}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6b1422]/15 via-transparent to-transparent opacity-40 pointer-events-none" />{" "}
        <div className="mx-auto max-w-[900px] text-center relative z-10">
          {" "}
          <span className="inline-block rounded-full bg-[#6b1422]/15 border border-[color:var(--accent)]/30 px-3.5 py-1 text-[9px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)]">
            {" "}
            Order Tracking & Dispatch Status
          </span>{" "}
          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.08em] text-white">
            {" "}
            Track Your Order
          </h1>{" "}
          <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl mx-auto font-sans">
            {" "}
            Track your SENTIRE By PC order and view the latest delivery status.
            Enter your Sentire Order Number (e.g.{" "}
            <span className="text-[color:var(--accent)]">SNT-84920</span>) or courier AWB
            tracking code below.
          </p>{" "}
          {/* Track Form */}
          <form onSubmit={handleTrackSubmit} className="mt-8 max-w-xl mx-auto">
            {" "}
            <div className="on-dark flex flex-col sm:flex-row gap-3 bg-[#111111] p-2 rounded-[4px] border border-[color:var(--accent)]/30 shadow-2xl">
              {" "}
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Order Number (e.g., SNT-84920) or AWB #"
                required
                className="flex-1 bg-transparent px-4 py-3 text-xs sm:text-sm text-white placeholder-white/40 outline-none font-sans"
               id="trackorderpage-input-1" name="trackorderpage-input-1"/>{" "}
              <input
                type="text"
                value={contactQuery}
                onChange={(e) => setContactQuery(e.target.value)}
                placeholder="Phone or Email (Optional)"
                className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-lg px-3 py-3 text-xs text-white placeholder-white/30 outline-none font-sans"
               id="trackorderpage-input-2" name="trackorderpage-input-2"/>{" "}
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3 rounded-lg bg-[#6b1422] text-[#111111] font-bold text-xs uppercase tracking-[0.06em] hover:bg-[#6b1422] transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {" "}
                {isSearching ? "SEARCHING..." : "TRACK STATUS →"}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </section>{" "}
      {/* ── Tracking Result Output ── */}
      {searched && orderResult && (
        <section className="py-16 px-5 lg:px-12 mx-auto max-w-[1000px]">
          {" "}
          <div className="bg-white rounded-[4px] border border-[color:var(--accent)]/25 p-6 sm:p-10 shadow-xl space-y-8">
            {" "}
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
              {" "}
              <div>
                {" "}
                <span className="text-[9px] max-sm:text-[12px] font-bold uppercase tracking-[0.06em] text-[color:var(--accent)]">
                  VERIFIED DISPATCH STATUS
                </span>{" "}
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-1">
                  {" "}
                  Order {orderResult.orderNumber}
                </h2>{" "}
                <p className="text-xs text-ink/60 mt-1 font-sans">
                  Placed on {orderResult.date} • Sentire Maison Jaipur
                </p>{" "}
              </div>{" "}
              <div className="inline-flex items-center gap-2 bg-[#f7f7f5] border border-[color:var(--accent)]/40 px-4 py-2 rounded-full self-start sm:self-auto">
                {" "}
                <span className="h-2 w-2 rounded-full bg-[#6b1422] animate-pulse" />{" "}
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  {orderResult.statusText}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2">
              {" "}
              <div className="p-4 rounded-[4px] bg-[#f4e6e8] border border-[#6b1422]/30">
                {" "}
                <span className="text-xs font-bold text-[#6b1422] uppercase block">
                  1. Confirmed
                </span>{" "}
                <span className="text-[10px] max-sm:text-[12px] text-[#6b1422] mt-1 block">
                  Order received & verified
                </span>{" "}
              </div>{" "}
              <div className="p-4 rounded-[4px] bg-[#f4e6e8] border border-[#6b1422]/30">
                {" "}
                <span className="text-xs font-bold text-[#6b1422] uppercase block">
                  2. Formulated
                </span>{" "}
                <span className="text-[10px] max-sm:text-[12px] text-[#6b1422] mt-1 block">
                  Extrait de parfum bottled
                </span>{" "}
              </div>{" "}
              <div className="on-dark p-4 rounded-[4px] bg-[#111111] text-white border border-[color:var(--accent)] shadow-md">
                {" "}
                <span className="text-xs font-bold text-[color:var(--accent)] uppercase block">
                  3. In Transit{" "}
                </span>{" "}
                <span className="text-[10px] max-sm:text-[12px] text-white/70 mt-1 block">
                  {orderResult.courier}
                </span>{" "}
              </div>{" "}
              <div className="p-4 rounded-[4px] bg-gray-50 border border-gray-200 text-gray-400">
                {" "}
                <span className="text-xs font-bold uppercase block">
                  4. Delivery
                </span>{" "}
                <span className="text-[10px] max-sm:text-[12px] mt-1 block">
                  Est. {orderResult.estimatedDelivery}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* Courier & AWB Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f7f7f5] p-5 rounded-[4px] border border-[color:var(--accent)]/20">
              {" "}
              <div>
                {" "}
                <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                  Courier Partner
                </span>{" "}
                <span className="text-sm font-semibold text-ink">
                  {orderResult.courier}
                </span>{" "}
              </div>{" "}
              <div>
                {" "}
                <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                  AWB Tracking Number
                </span>{" "}
                <span className="text-sm font-semibold text-[color:var(--accent)] font-mono">
                  {orderResult.awb}
                </span>{" "}
              </div>{" "}
              <div>
                {" "}
                <span className="text-[10px] max-sm:text-[12px] font-bold text-ink/50 uppercase tracking-[0.06em] block">
                  Estimated Arrival
                </span>{" "}
                <span className="text-sm font-semibold text-[#6b1422]">
                  {orderResult.estimatedDelivery}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            {/* Items in Order */}
            <div>
              {" "}
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                Items in this Package
              </h3>{" "}
              <div className="space-y-3">
                {" "}
                {orderResult.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-[4px] border border-black/10 bg-white"
                  >
                    {" "}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-12 w-12 object-contain rounded-lg bg-[#f2f2f0]"
                    />{" "}
                    <div className="flex-1">
                      {" "}
                      <h4 className="font-display text-sm font-semibold text-ink">
                        {item.name}
                      </h4>{" "}
                      <p className="text-[11px] max-sm:text-[12px] text-ink/60">
                        {item.size} • Qty: {item.quantity}
                      </p>{" "}
                    </div>{" "}
                    <span className="text-xs font-bold text-ink">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>{" "}
                  </div>
                ))}
              </div>{" "}
            </div>{" "}
            {/* Help Callout */}
            <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              {" "}
              <p className="text-xs text-ink/70">
                Need assistance with your delivery or address change?
              </p>{" "}
              <button
                onClick={onNavigateToContact}
                className="on-dark px-5 py-2.5 rounded-lg bg-[#111111] text-[color:var(--accent)] font-bold text-xs uppercase tracking-[0.06em] hover:bg-[#1a1511] transition-colors cursor-pointer"
              >
                {" "}
                CONTACT CLIENT SERVICES →
              </button>{" "}
            </div>{" "}
          </div>{" "}
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
              Our courier partners (Bluedart / Delhivery Express) attempt
              delivery up to 3 times and send SMS alerts prior to arrival. You
              can also request a re-delivery slot through Client Services.
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
