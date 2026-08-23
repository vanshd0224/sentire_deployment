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

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  img?: string;
  size: number;
  quantity: number;
  num?: string;
  variantId?: string;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, delta: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onClearCart?: () => void;
}

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
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Touch gesture & smooth closing state (for mobile right-side swipe-to-dismiss)
  const [touchOffset, setTouchOffset] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDraggingHorizontally = useRef<boolean>(false);

  const handleCloseSmooth = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setTouchOffset(0);
      onClose();
    }, 280);
  }, [onClose]);

  // Touch handlers for mobile swipe-to-close
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.innerWidth >= 768) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDraggingHorizontally.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || window.innerWidth >= 768) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    const deltaY = e.touches[0].clientY - touchStartY.current;

    // Detect horizontal swipe intention vs vertical scroll
    if (!isDraggingHorizontally.current) {
      if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
        isDraggingHorizontally.current = true;
      } else if (Math.abs(deltaY) > 10) {
        touchStartX.current = null;
        touchStartY.current = null;
        return;
      }
    }

    if (isDraggingHorizontally.current) {
      // Swiping rightwards (positive deltaX) to dismiss
      if (deltaX > 0) {
        setTouchOffset(deltaX);
      } else {
        setTouchOffset(0);
      }
    }
  };

  const handleTouchEnd = () => {
    if (window.innerWidth >= 768) return;
    if (touchOffset > 75) {
      handleCloseSmooth();
    } else {
      setTouchOffset(0);
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDraggingHorizontally.current = false;
  };

  // Reset isRedirecting state on Browser Back Button (BFCache pageshow), visibilitychange, or drawer/items state change
  useEffect(() => {
    const handlePageShow = () => {
      setIsRedirecting(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsRedirecting(false);
      }
    };

    const handlePopState = () => {
      setIsRedirecting(false);
    };

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    setIsRedirecting(false);
    setIsClosing(false);
    setTouchOffset(0);
  }, [isOpen, items.length]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleCloseSmooth();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleCloseSmooth]);

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

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "PC100" && subtotal >= 999) return 100;
    if (appliedCoupon === "PC200" && subtotal >= 1999) return 200;
    return 0;
  }, [appliedCoupon, subtotal]);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    if (code === "PC100") {
      if (subtotal < 999) {
        setCouponError("PC100 requires a minimum order of ₹999");
        return;
      }
      setAppliedCoupon("PC100");
      setCouponSuccess("Code PC100 applied! ₹100 OFF");
    } else if (code === "PC200") {
      if (subtotal < 1999) {
        setCouponError("PC200 requires a minimum order of ₹1,999");
        return;
      }
      setAppliedCoupon("PC200");
      setCouponSuccess("Code PC200 applied! ₹200 OFF");
    } else {
      setCouponError("Invalid promo code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
    setCouponSuccess(null);
  };

  const FREE_SHIPPING_THRESHOLD = 999;
  const progressPercent = Math.min(
    100,
    subtotal > 0 ? (subtotal / FREE_SHIPPING_THRESHOLD) * 100 : 0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0;
  const shippingCost = items.length === 0 ? 0 : isFreeShippingUnlocked ? 0 : 100;
  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingCost);

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
      className="fixed inset-0 z-50 flex items-stretch justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* ── Backdrop ─────────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 cart-backdrop-luxury cart-backdrop-animate cursor-pointer transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleCloseSmooth}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ─────────────────────────────────────────────── */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform:
            touchOffset > 0 && !isClosing
              ? `translateX(${touchOffset}px)`
              : undefined,
          transition: isClosing
            ? "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease"
            : touchOffset > 0
            ? "none"
            : undefined,
        }}
        className={[
          "relative z-10 flex flex-col h-full h-[100dvh]",
          "w-full max-w-[100vw] sm:max-w-[420px] md:w-[clamp(440px,32vw,520px)] md:max-w-[540px]",
          "cart-drawer-surface",
          "rounded-none",
          isClosing
            ? "translate-x-full opacity-90"
            : "cart-mobile-drawer-enter md:cart-salon-enter",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* ══ HEADER ══════════════════════════════════════════════════ */}
        <header className="cart-header-surface sticky top-0 z-20 px-5 md:px-6 pt-4 md:pt-5 pb-3.5 md:pb-4 shrink-0 salon-stagger-1">
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "8px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C89A46",
              marginBottom: "5px",
            }}
          >
            Your Private Selection
          </p>

          {/* Title row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <h2
                className="font-display leading-tight"
                style={{ fontSize: "21px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
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
                  className="sentire-remove-btn text-[10px] md:text-xs"
                  title="Clear all items"
                  aria-label="Clear all items from bag"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={handleCloseSmooth}
                className="sentire-close-btn w-9 h-9 md:w-10 md:h-10"
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
          <div className="cart-delivery-band px-5 md:px-6 py-3.5 md:py-4 salon-stagger-2">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(25,20,15,0.45)",
                }}
              >
                ✦&nbsp; Private Delivery
              </p>
              {isFreeShippingUnlocked && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "8px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#C89A46",
                  }}
                >
                  Unlocked
                </span>
              )}
            </div>

            {isFreeShippingUnlocked ? (
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p
                    className="font-display"
                    style={{ fontSize: "13.5px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
                  >
                    Complimentary Express Delivery
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      color: "rgba(25,20,15,0.55)",
                      marginTop: "1px",
                      fontWeight: 400,
                    }}
                  >
                    Unlocked for your signature order
                  </p>
                </div>
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "1px solid rgba(190,143,66,0.55)",
                    background: "rgba(200,154,70,0.12)",
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
                  style={{ fontSize: "13.5px", fontWeight: 400, color: "#0B0907" }}
                >
                  Express Delivery
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    color: "rgba(25,20,15,0.55)",
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
            <div className="cart-progress-track mt-2.5">
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
          </div>

          {/* ══ CART ITEMS / EMPTY STATE ════════════════════════════ */}
          <div className="px-5 md:px-6 py-4 md:py-5 salon-stagger-3">

            {items.length === 0 ? (

              /* ── Empty State ── */
              <div className="flex flex-col items-center text-center py-12 md:py-16 space-y-4 md:space-y-5">
                <div
                  style={{
                    width: "36px",
                    height: "1px",
                    background: "rgba(190,143,66,0.40)",
                    margin: "0 auto",
                  }}
                />

                <div className="space-y-1.5">
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "8px",
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#C89A46",
                    }}
                  >
                    Your Private Selection
                  </p>
                  <h3
                    className="font-display"
                    style={{ fontSize: "20px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}
                  >
                    Your bag awaits<br />its first fragrance.
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10.5px",
                      lineHeight: "1.6",
                      color: "rgba(25,20,15,0.50)",
                      maxWidth: "230px",
                      margin: "0 auto",
                      fontWeight: 400,
                    }}
                  >
                    Discover compositions crafted to leave an unforgettable signature.
                  </p>
                </div>

                <button
                  onClick={handleCloseSmooth}
                  className="sentire-checkout-btn mt-2"
                  style={{ maxWidth: "240px", height: "44px", fontSize: "9px" }}
                  aria-label="Explore the perfume library"
                >
                  Explore Fragrances
                  <span className="cta-arrow"><IconArrow /></span>
                </button>

                <div
                  style={{
                    width: "36px",
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
                    fontSize: "8px",
                    fontWeight: 600,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: "rgba(25,20,15,0.40)",
                    marginBottom: "14px",
                  }}
                >
                  Your Fragrances ({items.length})
                </p>

                <div className="space-y-4 md:space-y-6">
                  {items.map((item, idx) => {
                    const isAnimating = animatingItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        style={{
                          animation: `salonFadeUp 380ms cubic-bezier(0.22,1,0.36,1) ${idx * 50 + 100}ms both`,
                        }}
                      >
                        {/* Product row */}
                        <div className="flex gap-3.5 md:gap-4 items-start">

                          {/* Image */}
                          <div className="cart-product-img-frame">
                            <img
                              src={item.img || (item as any).image}
                              alt={item.name}
                              draggable={false}
                              loading="lazy"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 pt-0.5">

                            {/* Reference number */}
                            {item.num && (
                              <p
                                style={{
                                  fontFamily: "var(--font-sans)",
                                  fontSize: "8px",
                                  fontWeight: 600,
                                  letterSpacing: "0.18em",
                                  textTransform: "uppercase",
                                  color: "#C89A46",
                                  marginBottom: "2px",
                                }}
                              >
                                {item.num}
                              </p>
                            )}

                            {/* Product name */}
                            <h3
                              className="font-display leading-tight truncate"
                              style={{
                                fontSize: "17px",
                                fontWeight: 400,
                                color: "#0B0907",
                                letterSpacing: "-0.01em",
                                marginBottom: "2px",
                              }}
                            >
                              {item.name}
                            </h3>

                            {/* Fragrance type · size */}
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "8px",
                                fontWeight: 500,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "rgba(25,20,15,0.48)",
                                marginBottom: "6px",
                              }}
                            >
                              Eau de Parfum&nbsp;·&nbsp;{item.size}&nbsp;ML
                            </p>

                            {/* Price */}
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "13.5px",
                                fontWeight: 600,
                                color: "#18130F",
                                letterSpacing: "0.01em",
                                fontVariantNumeric: "tabular-nums",
                                marginBottom: "10px",
                              }}
                            >
                              ₹{(item.price || 0).toLocaleString()}
                            </p>

                            {/* Controls row */}
                            <div className="flex items-center justify-between gap-2">

                              {/* Quantity control */}
                              <div className="sentire-qty-control" role="group" aria-label={`Quantity for ${item.name}`}>
                                <button
                                  className="sentire-qty-btn"
                                  onClick={() => handleQuantityChange(item, -1)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                >
                                  −
                                </button>
                                <span
                                  className={`sentire-qty-num text-xs font-semibold ${isAnimating ? "qty-num-flip" : ""}`}
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

                              {/* Item total + remove */}
                              <div className="flex flex-col items-end gap-1">
                                {item.quantity > 1 && (
                                  <p
                                    style={{
                                      fontFamily: "var(--font-sans)",
                                      fontSize: "11.5px",
                                      fontWeight: 600,
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
                          <div className="cart-ornament-divider mt-4 md:mt-6">
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
          <footer className="cart-footer-surface px-5 md:px-6 pt-3.5 md:pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))] md:pb-5 shrink-0 salon-stagger-5 border-t border-black/8">
            {/* Promo Code Input & Badges */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "8px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C89A46",
                  }}
                >
                  Promo / Coupon Code
                </span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-[#C89A46]/10 border border-[#C89A46]/30 rounded-lg px-2.5 py-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0B0907] font-mono tracking-wider text-[11px]">{appliedCoupon}</span>
                    <span className="text-[#C89A46] font-semibold text-[11px]">(-₹{couponDiscount})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-gray-500 hover:text-red-500 font-bold text-base px-1.5 leading-none cursor-pointer"
                    title="Remove Code"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleApplyCoupon();
                      }}
                      className="flex-1 bg-black/5 border border-black/15 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#C89A46] font-mono tracking-wider text-[#0B0907] h-8"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-[#18130F] text-[#f5f0e8] hover:bg-[#C89A46] hover:text-[#0B0907] transition-colors rounded px-3 py-1 text-[10px] font-semibold uppercase tracking-wider cursor-pointer h-8"
                    >
                      Apply
                    </button>
                  </div>
                  {/* Quick Code Pills */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <button
                      onClick={() => handleApplyCoupon("PC100")}
                      className={`text-[9px] rounded px-2 py-0.5 font-mono tracking-wider transition-colors cursor-pointer border ${
                        subtotal >= 999
                          ? "bg-[#C89A46]/10 text-[#C89A46] border-[#C89A46]/30 hover:border-[#C89A46]"
                          : "bg-black/5 text-gray-400 border-black/10"
                      }`}
                    >
                      PC100 (₹100 OFF &gt; ₹999)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon("PC200")}
                      className={`text-[9px] rounded px-2 py-0.5 font-mono tracking-wider transition-colors cursor-pointer border ${
                        subtotal >= 1999
                          ? "bg-[#C89A46]/10 text-[#C89A46] border-[#C89A46]/30 hover:border-[#C89A46]"
                          : "bg-black/5 text-gray-400 border-black/10"
                      }`}
                    >
                      PC200 (₹200 OFF &gt; ₹1999)
                    </button>
                  </div>
                </div>
              )}

              {couponError && (
                <p className="text-[9.5px] text-red-500 mt-1 font-sans">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-[9.5px] text-emerald-600 mt-1 font-sans font-medium">{couponSuccess}</p>
              )}
            </div>

            {/* Order Summary Rows */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(25,20,15,0.60)" }}>
                  Subtotal
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#18130F", fontWeight: 500 }}>
                  ₹{(subtotal || 0).toLocaleString()}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between items-baseline">
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "#C89A46", fontWeight: 500 }}>
                    Promo Discount ({appliedCoupon})
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#C89A46", fontWeight: 600 }}>
                    -₹{couponDiscount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-baseline">
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "rgba(25,20,15,0.60)" }}>
                  Express Delivery
                </span>
                {isFreeShippingUnlocked ? (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "#C89A46" }}>
                    Complimentary
                  </span>
                ) : (
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "#18130F", fontWeight: 500 }}>
                    ₹100
                  </span>
                )}
              </div>
            </div>

            <div className="cart-summary-rule my-2.5" />

            <div className="flex justify-between items-baseline mb-3">
              <span className="font-display" style={{ fontSize: "14px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.01em" }}>
                Estimated Total
              </span>
              <span className="font-display" style={{ fontSize: "19px", fontWeight: 400, color: "#0B0907", letterSpacing: "-0.02em" }}>
                ₹{(finalTotal || 0).toLocaleString()}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              className={`sentire-checkout-btn salon-stagger-6 cursor-pointer flex items-center justify-center gap-2 ${
                isRedirecting ? "opacity-75 cursor-wait" : ""
              }`}
              disabled={isRedirecting || items.length === 0}
              onClick={() => {
                if (items.length === 0 || isRedirecting) return;
                setIsRedirecting(true);

                const winRef = window;
                createOrGetShopifyCheckoutUrl(items, appliedCoupon || undefined)
                  .then((checkoutUrl) => {
                    if (checkoutUrl) {
                      winRef.location.href = checkoutUrl;
                    } else {
                      setIsRedirecting(false);
                    }
                  })
                  .catch((err) => {
                    console.error("[Checkout Error]", err);
                    setIsRedirecting(false);
                  });
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
              className="flex items-center justify-center gap-3 mt-2.5"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "8px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(25,20,15,0.40)",
              }}
            >
              <span className="flex items-center gap-1">
                <IconLock aria-hidden="true" />
                Secure Checkout
              </span>
              <span style={{ color: "rgba(25,20,15,0.20)" }}>◇</span>
              <span className="flex items-center gap-1">
                <IconDiamond aria-hidden="true" />
                Authentic Sentire
              </span>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}