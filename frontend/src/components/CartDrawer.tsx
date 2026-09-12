import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { createOrGetShopifyCheckoutUrl, resolveShopifyVariantId } from "../utils/shopifyCart";
import { auth } from "../lib/firebase";
import { ALL_PERFUMES } from "../data/perfumes";

const IconClose = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

const IconShield = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconDiamond = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 9l10 13 10-13-10-7z" />
  </svg>
);

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
  isPersonalised?: boolean;
  engravingText?: string;
  engravingDate?: string;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, delta: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onClearCart?: () => void;
  onOpenLoginModal?: () => void;
  onAddToCart?: (item: any, size?: number, price?: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenLoginModal,
  onAddToCart,
}: CartDrawerProps) {
  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem("sentire_applied_coupon") || null;
    } catch (e) {
      return null;
    }
  });
  const [couponInput, setCouponInput] = useState<string>("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem("sentire_applied_coupon", appliedCoupon);
      } else {
        localStorage.removeItem("sentire_applied_coupon");
      }
    } catch (e) {}
  }, [appliedCoupon]);

  // Engraving state module
  const [engraveTargetKey, setEngraveTargetKey] = useState<string>("");
  const [engraveName, setEngraveName] = useState<string>("");
  const [engraveDate, setEngraveDate] = useState<string>("");

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
    if (appliedCoupon === "ANSH150" && subtotal >= 1249) return 150;
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
    } else if (code === "ANSH150") {
      if (subtotal < 1249) {
        setCouponError("ANSH150 requires a minimum order of ₹1,249");
        return;
      }
      setAppliedCoupon("ANSH150");
      setCouponSuccess("Code ANSH150 applied! ₹150 OFF");
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("cart-drawer-open");
    } else {
      document.body.classList.remove("cart-drawer-open");
    }
    return () => {
      document.body.classList.remove("cart-drawer-open");
    };
  }, [isOpen]);

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

  const handleSwitchSize = (item: CartItem, newSize: number) => {
    if (item.size === newSize) return;
    const pData = ALL_PERFUMES.find((p) => p.id === item.productId);
    const newPrice = pData?.prices?.[newSize] ?? item.price;
    onRemoveItem(item.productId, item.size);
    if (onAddToCart) {
      onAddToCart({ ...item, size: newSize, price: newPrice }, newSize, newPrice);
    }
  };

  const handleApplyEngravingToTarget = () => {
    if (!engraveName.trim()) return;
    const targetItem = items.find((i) => `${i.productId}-${i.size}` === engraveTargetKey) || items[0];
    if (!targetItem) return;

    const basePrice = targetItem.isPersonalised ? targetItem.price : targetItem.price + 200;
    if (onAddToCart) {
      onAddToCart(
        {
          ...targetItem,
          price: basePrice,
          isPersonalised: true,
          engravingText: engraveName.trim(),
          engravingDate: engraveDate.trim(),
        },
        targetItem.size,
        basePrice
      );
    }
    setCouponSuccess(`Personalised Engraving (+₹200) added to ${targetItem.name}!`);
    setTimeout(() => setCouponSuccess(null), 3000);
  };

  if (!isOpen) return null;

  const countDisplay = String(totalCount).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-stretch justify-end overflow-hidden"
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
          "absolute top-0 bottom-0 right-0 z-10 flex flex-col h-full",
          "w-full max-w-[100vw] sm:max-w-[420px] md:w-[clamp(440px,32vw,520px)] md:max-w-[540px]",
          "cart-drawer-surface bg-[#F8F4EC]",
          "rounded-none",
          isClosing
            ? "translate-x-full opacity-90"
            : "cart-mobile-drawer-enter md:cart-salon-enter",
          "overflow-hidden shadow-2xl",
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
              <img
                src="/assets/sentire-logo-user.jpg"
                alt="SENTIRE By PC Logo"
                className="h-7 md:h-8 object-contain max-w-[170px]"
              />
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
        <div className="flex-1 overflow-y-auto luxury-scrollbar min-h-0 pb-12 md:pb-16">

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
                    className="font-display font-bold text-[#C89A46]"
                    style={{ fontSize: "13.5px", letterSpacing: "-0.01em" }}
                  >
                    🎉 Congratulations! FREE Delivery Unlocked!
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
                    Free Express Delivery on orders ₹999 & above
                  </p>
                </div>
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    border: "1px solid rgba(190,143,66,0.6)",
                    background: "rgba(200,154,70,0.15)",
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
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Add <strong style={{ color: "#C89A46", fontWeight: 700 }}>₹{(remainingForFreeShipping || 0).toLocaleString()}</strong> more to get <strong style={{ color: "#C89A46", textTransform: "uppercase", fontWeight: 700 }}>FREE Delivery</strong>
                    </>
                  ) : (
                    "Free shipping on orders over ₹999"
                  )}
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
                  Free delivery on orders ₹999 & above
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
                              loading="eager"
                              decoding="async"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0 pt-0.5">

                            {/* Product name */}
                            <h3
                              className="font-display leading-tight truncate text-[15px] sm:text-[17px]"
                              style={{
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
                                marginBottom: "4px",
                              }}
                            >
                              {item.productId === "discovery-set" || item.name?.toLowerCase().includes("discovery set")
                                ? "Discovery Set · 6 × 6 ML (36 ML)"
                                : `Eau de Parfum · ${item.size} ML`}
                            </p>

                            {/* Inline Size Switcher Pills (10ML | 30ML | 50ML) */}
                            {item.productId !== "discovery-set" && !item.name?.toLowerCase().includes("discovery set") && (
                              <div className="mt-1.5 mb-2 flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#14110D]/50">Size:</span>
                                {[10, 30, 50].map((sz) => {
                                  const isSelected = item.size === sz;
                                  return (
                                    <button
                                      key={sz}
                                      onClick={() => handleSwitchSize(item, sz)}
                                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                                        isSelected
                                          ? "bg-[#C89A46] text-white border border-[#C89A46] shadow-sm"
                                          : "bg-[#14110D]/5 text-[#14110D]/70 border border-[#14110D]/10 hover:border-[#C89A46]"
                                      }`}
                                    >
                                      {sz}ML
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Price */}
                            <p
                              style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "13.5px",
                                fontWeight: 600,
                                color: "#18130F",
                                letterSpacing: "0.01em",
                                fontVariantNumeric: "tabular-nums",
                                marginBottom: "4px",
                              }}
                            >
                              ₹{(item.price || 0).toLocaleString()}
                            </p>

                            {/* Personalisation Badge & Notes */}
                            {item.isPersonalised && (
                              <div className="mb-2 flex flex-col gap-0.5 rounded-lg border border-[#c89b5a]/30 bg-[#c89b5a]/10 px-2 py-1 text-[10px] text-[#18130F]">
                                <span className="font-bold text-[#c89b5a] tracking-wider uppercase">✨ Personalised (+₹200)</span>
                                {item.engravingText && <span>Name: <strong className="font-serif uppercase tracking-wider">{item.engravingText}</strong></span>}
                                {item.engravingDate && <span>Date: <strong>{item.engravingDate}</strong></span>}
                              </div>
                            )}

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

                {/* ══ 🏷️ PROMINENT COUPON & DISCOUNTS CARD ══════════════════════ */}
                <div className="mt-5 rounded-2xl border border-[#C89A46]/35 bg-white p-4 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#14110D]/10 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#C89A46] text-sm">🏷️</span>
                      <h4 className="font-serif text-sm font-bold text-[#14110D]">Apply Coupon & Atelier Offers</h4>
                    </div>
                    <span className="text-[9px] font-bold text-[#C89A46] uppercase tracking-wider">Instant Savings</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#C89A46]/10 border border-[#C89A46]/40 rounded-xl p-2.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0B0907] font-mono tracking-wider text-xs">🎉 {appliedCoupon}</span>
                        <span className="text-emerald-700 font-extrabold text-xs">(Saved ₹{couponDiscount})</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-600 hover:text-red-800 font-bold text-xs px-2 py-0.5 rounded bg-white border border-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* 1-Tap Pill Chips */}
                      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
                        <button
                          onClick={() => handleApplyCoupon("PC100")}
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider transition-all border ${
                            subtotal >= 999
                              ? "bg-[#FAF6F0] text-[#C89A46] border-[#C89A46] hover:bg-[#C89A46] hover:text-white shadow-sm"
                              : "bg-black/5 text-gray-400 border-black/10"
                          }`}
                        >
                          ⚡ PC100 (₹100 OFF &gt; ₹999)
                        </button>
                        <button
                          onClick={() => handleApplyCoupon("PC200")}
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold tracking-wider transition-all border ${
                            subtotal >= 1999
                              ? "bg-[#FAF6F0] text-[#C89A46] border-[#C89A46] hover:bg-[#C89A46] hover:text-white shadow-sm"
                              : "bg-black/5 text-gray-400 border-black/10"
                          }`}
                        >
                          ⚡ PC200 (₹200 OFF &gt; ₹1,999)
                        </button>
                      </div>

                      {/* Manual Code Input */}
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="ENTER PROMO CODE (e.g. PC100)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleApplyCoupon();
                          }}
                          className="flex-1 rounded-xl border border-[#14110D]/20 bg-[#FAF8F5] px-3 py-2 text-xs font-bold font-mono tracking-wider text-[#14110D] focus:border-[#C89A46] focus:outline-none"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="rounded-xl bg-[#14110D] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#C89A46] hover:text-white transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[10px] text-red-500 font-medium">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span>✓</span> {couponSuccess}
                    </p>
                  )}
                </div>

                {/* ══ ₹200 PERSONALISATION ENGRAVING MODULE ══════════════════════ */}
                <div className="mt-6 rounded-2xl border border-[#C89A46]/35 bg-white p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-[#14110D]/10 pb-2">
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#C89A46]">Personalised Craftsmanship</span>
                      <h4 className="font-serif text-sm font-bold text-[#14110D]">Add Custom Name & Date Engraving (+₹200)</h4>
                    </div>
                    <span className="rounded bg-[#C89A46]/10 border border-[#C89A46]/30 px-2 py-0.5 text-[9px] font-bold text-[#C89A46]">Jaipur Laser Engraved</span>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#14110D]/70 mb-1">Select Perfume to Engrave:</label>
                    <select
                      value={engraveTargetKey || `${items[0]?.productId}-${items[0]?.size}`}
                      onChange={(e) => setEngraveTargetKey(e.target.value)}
                      className="w-full rounded-xl border border-[#14110D]/20 bg-[#FAF8F5] p-2 text-xs font-bold text-[#14110D] focus:border-[#C89A46] focus:outline-none"
                    >
                      {items.map((i) => (
                        <option key={`${i.productId}-${i.size}`} value={`${i.productId}-${i.size}`}>
                          {i.name} ({i.size}ML)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#14110D]/70 mb-1">Name (Max 12 Chars):</label>
                      <input
                        type="text"
                        maxLength={12}
                        value={engraveName}
                        onChange={(e) => setEngraveName(e.target.value)}
                        placeholder="e.g. Vansh"
                        className="w-full rounded-xl border border-[#14110D]/20 p-2 text-xs font-bold text-[#14110D] focus:border-[#C89A46] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#14110D]/70 mb-1">Date (Max 10 Chars):</label>
                      <input
                        type="text"
                        maxLength={10}
                        value={engraveDate}
                        onChange={(e) => setEngraveDate(e.target.value)}
                        placeholder="e.g. 11.09.2026"
                        className="w-full rounded-xl border border-[#14110D]/20 p-2 text-xs font-bold text-[#14110D] focus:border-[#C89A46] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleApplyEngravingToTarget}
                    className="w-full rounded-xl border-2 border-[#C89A46] bg-[#FAF6F0] py-2 text-center text-xs font-bold uppercase tracking-wider text-[#C89A46] hover:bg-[#C89A46] hover:text-white transition-all shadow-sm"
                  >
                    Apply Engraving to Bottle (+₹200)
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
        {/* ── End scrollable body ─ */}

        {/* ══ FOOTER: ORDER SUMMARY + CTA ═════════════════════════════ */}
        {items.length > 0 && (
          <footer className="cart-footer-surface bg-[#F8F4EC] relative z-20 px-4 md:px-6 pt-2.5 md:pt-4 pb-[max(1rem,env(safe-area-inset-bottom,1rem))] md:pb-5 shrink-0 border-t border-black/10 shadow-[0_-10px_25px_rgba(0,0,0,0.06)]">
            {/* Promo Code Input & Badges */}
            <div className="mb-2 md:mb-3">
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
                      className="flex-1 bg-black/5 border border-black/15 rounded px-2 py-1 text-[10px] sm:text-xs focus:outline-none focus:border-[#C89A46] font-mono tracking-normal sm:tracking-wider text-[#0B0907] h-6 sm:h-8"
                    />
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-[#18130F] text-[#f5f0e8] hover:bg-[#C89A46] hover:text-[#0B0907] transition-colors rounded px-2 sm:px-3 py-1 text-[9px] font-semibold uppercase tracking-tight sm:tracking-wider cursor-pointer h-6 sm:h-8 shrink-0"
                    >
                      Apply
                    </button>
                  </div>
                  {/* Quick Code Pills */}
                  <div className="flex items-center gap-1.5 mt-1 md:mt-1.5">
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
            <div className="space-y-1 md:space-y-1.5 pt-0.5 md:pt-1">
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

            <div className="cart-summary-rule my-1.5 md:my-2.5" />

            <div className="flex justify-between items-baseline mb-2 md:mb-3">
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

                const currentUser = auth.currentUser;
                const isStoredLoggedIn = localStorage.getItem("sentire_is_logged_in") === "true";
                const isLoggedIn = !!currentUser || isStoredLoggedIn;

                if (!isLoggedIn) {
                  localStorage.setItem("sentire_pending_checkout", "true");
                  handleCloseSmooth();
                  if (onOpenLoginModal) {
                    onOpenLoginModal();
                  }
                  return;
                }

                setIsRedirecting(true);
                const userEmail = currentUser?.email || localStorage.getItem("sentire_user_email") || undefined;
                const userPhone = currentUser?.phoneNumber || localStorage.getItem("sentire_user_phone") || undefined;

                // Save snapshot of order to register under user's Account upon return from Shopify
                try {
                  const pendingOrder = {
                    id: `SNT-${Math.floor(10000 + Math.random() * 90000)}`,
                    orderNumber: `SNT-${Math.floor(10000 + Math.random() * 90000)}`,
                    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                    status: "Confirmed",
                    total: finalTotal,
                    items: items.map((i) => ({
                      name: i.name,
                      size: `${i.size}`,
                      quantity: i.quantity,
                      price: i.price,
                      img: i.img || i.image,
                    })),
                  };
                  localStorage.setItem("sentire_pending_checkout_order", JSON.stringify(pendingOrder));
                } catch (e) {}

                const winRef = window;
                createOrGetShopifyCheckoutUrl(items, appliedCoupon || undefined, userEmail, userPhone)
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
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-[#f5f0e8] border-t-transparent" />
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