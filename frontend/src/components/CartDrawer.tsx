import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

// Robust variant ID resolver for all 11 perfumes with all possible ID/name/handle aliases
const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {
  // 0809
  "0809": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },
  "perfume-1": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },
  "1": { 10: "46888622293153", 30: "46888622325921", 50: "46888622358689" },

  // Calantha
  "calantha": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },
  "perfume-2": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },
  "2": { 10: "46888622391457", 30: "46888622424225", 50: "46888622456993" },

  // Deep Crush
  "deep-crush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "deepcrush": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "perfume-3": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },
  "3": { 10: "46888622489761", 30: "46888622522529", 50: "46888622555297" },

  // Herrlich
  "herrlich": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },
  "perfume-4": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },
  "4": { 10: "46888622588065", 30: "46888622620833", 50: "46888622653601" },

  // Midnight
  "midnight": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },
  "perfume-5": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },
  "5": { 10: "46888622686369", 30: "46888622719137", 50: "46888622751905" },

  // Mirai
  "mirai": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },
  "perfume-6": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },
  "6": { 10: "46888622784673", 30: "46888622817441", 50: "46888622850209" },

  // Personna
  "personna": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },
  "perfume-7": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },
  "7": { 10: "46888622882977", 30: "46888622915745", 50: "46888622948513" },

  // Purple Oud
  "purple-oud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "purpleoud": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "perfume-8": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },
  "8": { 10: "46888622981281", 30: "46888623014049", 50: "46888623046817" },

  // Rich
  "rich": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },
  "perfume-9": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },
  "9": { 10: "46888623079585", 30: "46888623112353", 50: "46888623145121" },

  // Seductive
  "seductive": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },
  "perfume-10": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },
  "10": { 10: "46888623177889", 30: "46888623210657", 50: "46888623243425" },

  // White Oud
  "white-oud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "whiteoud": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "perfume-11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
  "11": { 10: "46888623276193", 30: "46888623308961", 50: "46888623341729" },
};

const resolveShopifyVariantId = (item: any): string => {
  const pId = String(item.productId || item.id || "").toLowerCase().trim();
  const pName = String(item.name || "").toLowerCase().trim();
  const sizeNum = Number(item.size) || 50;

  // 1. Direct map lookup by productId
  if (SHOPIFY_VARIANT_MAP[pId]?.[sizeNum]) {
    return SHOPIFY_VARIANT_MAP[pId][sizeNum];
  }

  // 2. Lookup by name keywords
  for (const [key, sizeMap] of Object.entries(SHOPIFY_VARIANT_MAP)) {
    if (pName.includes(key) || pId.includes(key)) {
      if (sizeMap[sizeNum]) return sizeMap[sizeNum];
    }
  }

  // Default fallback to Purple Oud 50ML
  return "46888623046817";
};

// Inline SVG Icon components for CartDrawer
const IconClose = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const IconLock = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const IconDiamond = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 9l10 13 10-13-10-7z" />
  </svg>
);


import { createOrGetShopifyCheckoutUrl } from "../utils/shopifyCart";

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Calculations
  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const FREE_SHIPPING_THRESHOLD = 999;
  const progressPercent = Math.min(
    100,
    subtotal > 0 ? (subtotal / FREE_SHIPPING_THRESHOLD) * 100 : 0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0;
  const shippingCost = items.length === 0 ? 0 : isFreeShippingUnlocked ? 0 : 99;
  const finalTotal = subtotal + shippingCost;

  const handleQuantityChange = useCallback(
    (item: CartItem, delta: number) => {
      setAnimatingItemId(item.id);
      onUpdateQuantity(item.productId, item.size, delta);
      setTimeout(() => setAnimatingItemId(null), 220);
    },
    [onUpdateQuantity]
  );

  if (!isOpen) return null;

  const countDisplay = String(totalCount).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-stretch justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* ── Backdrop ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 cart-backdrop-luxury cart-backdrop-animate cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ─────────────────────────────────────────────── */}
      <div
        className={[
          "relative z-10 flex flex-col h-[94vh] md:h-full",
          "w-full md:w-[clamp(440px,32vw,520px)] max-w-full md:max-w-[540px]",
          "cart-drawer-surface",
          "rounded-t-2xl md:rounded-none",
          "cart-sheet-enter md:cart-salon-enter",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* Mobile drag handle */}
        <div className="w-9 h-1 rounded-full bg-black/12 mx-auto mt-2.5 mb-0.5 md:hidden shrink-0" />

        {/* ══ HEADER ══════════════════════════════════════════════════ */}
        <header className="cart-header-surface sticky top-0 z-20 px-6 pt-5 pb-4 shrink-0 salon-stagger-1">
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "8.5px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C89A46",
              marginBottom: "6px",
            }}
          >
            Your Private Selection
          </p>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-baseline gap-2.5 min-w-0">
              <h2
                className="font-display leading-none"
                style={{ fontSize: "24px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
              >
                Shopping Bag
              </h2>
              <span className="sentire-count-pill shrink-0">
                {countDisplay}&nbsp;{totalCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {items.length > 0 && onClearCart && (
                <button
                  onClick={onClearCart}
                  className="sentire-remove-btn"
                  title="Clear all items"
                  aria-label="Clear all items from bag"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="sentire-close-btn"
                aria-label="Close shopping bag"
              >
                <IconClose />
              </button>
            </div>
          </div>
        </header>

        {/* ── Scrollable body ───────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto luxury-scrollbar min-h-0">

          {/* ══ DELIVERY PRIVILEGE ══════════════════════════════════ */}
          <div className="cart-delivery-band px-6 py-4 salon-stagger-2">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "8.5px",
                fontWeight: 500,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(25,20,15,0.40)",
                marginBottom: "8px",
              }}
            >
              ✦&nbsp; Private Delivery
            </p>

            {isFreeShippingUnlocked ? (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="font-display"
                    style={{ fontSize: "14px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
                  >
                    Complimentary Express Delivery
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10.5px",
                      color: "rgba(25,20,15,0.50)",
                      marginTop: "1px",
                      fontWeight: 400,
                    }}
                  >
                    Unlocked for your order
                  </p>
                </div>
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "1px solid rgba(190,143,66,0.55)",
                    color: "#C89A46",
                  }}
                >
                  <IconCheck />
                </div>
              </div>
            ) : (
              <div>
                <p
                  className="font-display"
                  style={{ fontSize: "14px", fontWeight: 400, color: "#0B0907" }}
                >
                  Express Delivery
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10.5px",
                    color: "rgba(25,20,15,0.50)",
                    marginTop: "1px",
                    fontWeight: 400,
                  }}
                >
                  {remainingForFreeShipping > 0
                    ? <>Add <strong style={{ color: "#C89A46", fontWeight: 600 }}>₹{(remainingForFreeShipping || 0).toLocaleString()}</strong> more for complimentary delivery</>
                    : "Free shipping on orders over ₹999"}
                </p>
              </div>
            )}

            {/* Progress bar */}
            <div className="cart-progress-track mt-3">
              <div
                className="cart-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
              {isFreeShippingUnlocked && (
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%) translateX(50%)",
                    color: "#C89A46",
                    fontSize: "7px",
                    fontWeight: 700,
                  }}
                >
                  ◆
                </span>
              )}
            </div>

            {isFreeShippingUnlocked && (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "8.5px",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#C89A46",
                  marginTop: "6px",
                }}
              >
                Complete
              </p>
            )}
          </div>

          {/* ══ CART ITEMS / EMPTY STATE ════════════════════════════ */}
          <div className="px-6 py-5 salon-stagger-3">

            {items.length === 0 ? (

              /* ── Empty State ── */
              <div className="flex flex-col items-center text-center py-10 space-y-5">
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "rgba(190,143,66,0.40)",
                    margin: "0 auto",
                  }}
                />

                <div className="space-y-1.5">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "8.5px",
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#C89A46",
                    }}
                  >
                    Your Private Selection
                  </p>
                  <h3
                    className="font-display"
                    style={{ fontSize: "22px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
                  >
                    Your bag awaits<br />its first fragrance.
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "11px",
                      lineHeight: "1.6",
                      color: "rgba(25,20,15,0.50)",
                      maxWidth: "240px",
                      margin: "0 auto",
                      fontWeight: 400,
                    }}
                  >
                    Discover compositions crafted to leave an unforgettable signature.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="sentire-checkout-btn"
                  style={{ maxWidth: "260px", height: "46px", fontSize: "9.5px" }}
                  aria-label="Explore the perfume library"
                >
                  Explore the Perfume Library
                  <span className="cta-arrow"><IconArrow /></span>
                </button>

                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "rgba(190,143,66,0.40)",
                    margin: "0 auto",
                  }}
                />
              </div>

            ) : (

              /* ── Items List ── */
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "8.5px",
                    fontWeight: 500,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(25,20,15,0.38)",
                    marginBottom: "18px",
                  }}
                >
                  Your Selection
                </p>

                <div className="space-y-6">
                  {items.map((item, idx) => {
                    const isAnimating = animatingItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        style={{
                          animation: `salonFadeUp 420ms cubic-bezier(0.22,1,0.36,1) ${idx * 60 + 150}ms both`,
                        }}
                      >
                        {/* Product row */}
                        <div className="flex gap-4 items-start">

                          {/* Image */}
                          <div className="cart-product-img-frame">
                            <img
                              src={item.img || (item as any).image}
                              alt={item.name}
                              draggable={false}
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 pt-0.5">

                            {/* Reference number */}
                            {item.num && (
                              <p
                                style={{
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "8.5px",
                                  fontWeight: 600,
                                  letterSpacing: "0.20em",
                                  textTransform: "uppercase",
                                  color: "#C89A46",
                                  marginBottom: "4px",
                                }}
                              >
                                {item.num}
                              </p>
                            )}

                            {/* Product name */}
                            <h3
                              className="font-display leading-tight"
                              style={{
                                fontSize: "19px",
                                fontWeight: 400,
                                color: "#0B0907",
                                letterSpacing: "-0.01em",
                                marginBottom: "3px",
                              }}
                            >
                              {item.name}
                            </h3>

                            {/* Fragrance type · size */}
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "8.5px",
                                fontWeight: 500,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "rgba(25,20,15,0.45)",
                                marginBottom: "8px",
                              }}
                            >
                              Eau de Parfum&nbsp;·&nbsp;{item.size}&nbsp;ML
                            </p>

                            {/* Price */}
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#18130F",
                                letterSpacing: "0.01em",
                                fontVariantNumeric: "tabular-nums",
                                marginBottom: "12px",
                              }}
                            >
                              ₹{(item.price || 0).toLocaleString()}
                            </p>

                            {/* Controls row */}
                            <div className="flex items-center justify-between gap-3">

                              {/* Quantity control */}
                              <div>
                                <p
                                  style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "7.5px",
                                    fontWeight: 500,
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: "rgba(25,20,15,0.35)",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Quantity
                                </p>
                                <div className="sentire-qty-control" role="group" aria-label={`Quantity for ${item.name}`}>
                                  <button
                                    className="sentire-qty-btn"
                                    onClick={() => handleQuantityChange(item, -1)}
                                    aria-label={`Decrease quantity of ${item.name}`}
                                  >
                                    −
                                  </button>
                                  <span
                                    className={`sentire-qty-num ${isAnimating ? "qty-num-flip" : ""}`}
                                    aria-live="polite"
                                    aria-label={`${item.quantity} items`}
                                  >
                                    {String(item.quantity).padStart(2, "0")}
                                  </span>
                                  <button
                                    className="sentire-qty-btn"
                                    onClick={() => handleQuantityChange(item, 1)}
                                    aria-label={`Increase quantity of ${item.name}`}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Item total + remove */}
                              <div className="flex flex-col items-end gap-1.5">
                                {item.quantity > 1 && (
                                  <p
                                    style={{
                                      fontFamily: "var(--font-sans)",
                                      fontSize: "12.5px",
                                      fontWeight: 500,
                                      color: "#18130F",
                                      fontVariantNumeric: "tabular-nums",
                                    }}
                                  >
                                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                                  </p>
                                )}
                                <button
                                  className="sentire-remove-btn"
                                  onClick={() => onRemoveItem(item.productId, item.size)}
                                  aria-label={`Remove ${item.name} from bag`}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider */}
                        {idx < items.length - 1 && (
                          <div className="cart-ornament-divider mt-6">
                            ✦
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
        {/* ── End scrollable body ─ */}

        {/* ══ FOOTER: ORDER SUMMARY + CTA ═════════════════════════════ */}
        {items.length > 0 && (
          <footer className="cart-footer-surface px-6 pt-4.5 pb-5 shrink-0 salon-stagger-5">
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "8.5px",
                fontWeight: 500,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                color: "rgba(25,20,15,0.38)",
                marginBottom: "12px",
              }}
            >
              Order Summary
            </p>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11.5px", color: "rgba(25,20,15,0.58)" }}>
                  Subtotal
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "#18130F", fontWeight: 500 }}>
                  ₹{(subtotal || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11.5px", color: "rgba(25,20,15,0.58)" }}>
                  Express Delivery
                </span>
                {isFreeShippingUnlocked ? (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.10em", textTransform: "uppercase", color: "#C89A46" }}>
                    Complimentary
                  </span>
                ) : (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12.5px", color: "#18130F", fontWeight: 500 }}>
                    ₹99
                  </span>
                )}
              </div>
            </div>

            <div className="cart-summary-rule" />

            <div className="flex justify-between items-baseline mb-4">
              <span className="font-display" style={{ fontSize: "15px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}>
                Estimated Total
              </span>
              <span className="font-display" style={{ fontSize: "21px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.02em" }}>
                ₹{(finalTotal || 0).toLocaleString()}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              className={`sentire-checkout-btn salon-stagger-6 cursor-pointer flex items-center justify-center gap-2 ${
                isRedirecting ? "opacity-75 cursor-wait" : ""
              }`}
              disabled={isRedirecting || items.length === 0}
              onClick={async () => {
                if (items.length === 0 || isRedirecting) return;
                setIsRedirecting(true);

                try {
                  console.log("[Checkout Debug] Starting async GraphQL cart creation for items:", items);
                  const checkoutUrl = await createOrGetShopifyCheckoutUrl(items);
                  console.log("[Checkout Debug] Redirecting to confirmed Shopify Checkout URL:", checkoutUrl);
                  if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                  } else {
                    setIsRedirecting(false);
                  }
                } catch (err) {
                  console.error("[Checkout Debug Error] Redirection failed:", err);
                  setIsRedirecting(false);
                }
              }}
              aria-label={`Proceed to checkout. Total: ₹${(finalTotal || 0).toLocaleString()}`}
            >
              {isRedirecting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  <span>Redirecting to Shopify...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <span className="cta-arrow" aria-hidden="true"><IconArrow /></span>
                </>
              )}
            </button>

            {/* Trust signals */}
            <div
              className="flex items-center justify-center gap-4 mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "8.5px",
                fontWeight: 400,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(25,20,15,0.35)",
              }}
            >
              <span className="flex items-center gap-1.5">
                <IconLock aria-hidden="true" />
                Secure Checkout
              </span>
              <span style={{ color: "rgba(25,20,15,0.18)" }}>◇</span>
              <span className="flex items-center gap-1.5">
                <IconDiamond aria-hidden="true" />
                Authentic Sentire
              </span>
            </div>

            {/* Sentire signature line */}
            <div className="flex items-center gap-3 mt-4" style={{ color: "rgba(190,143,66,0.30)" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(25,20,15,0.07)" }} />
              <span className="font-display" style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.12em", color: "rgba(190,143,66,0.45)" }}>
                S
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(25,20,15,0.07)" }} />
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}