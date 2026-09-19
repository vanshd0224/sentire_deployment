import { useState, useMemo, useEffect } from "react";
import { createOrGetShopifyCheckoutUrl } from "../utils/shopifyCart";
import { ALL_PERFUMES } from "../data/perfumes";

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

export interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, delta: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onClearCart?: () => void;
  onAddToCart?: (item: any, size?: number, price?: number) => void;
  onNavigate?: (page: string) => void;
}

export default function CartPage({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToCart,
  onNavigate,
}: CartPageProps) {
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
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

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

  // Pincode Checker State
  const [pincodeInput, setPincodeInput] = useState<string>(() => {
    try {
      return localStorage.getItem("sentire_user_pincode") || "";
    } catch (e) {
      return "";
    }
  });
  const [pincodeResult, setPincodeResult] = useState<any>(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState<boolean>(false);
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  const handleCheckPincode = async (codeToCheck?: string) => {
    const pin = (codeToCheck || pincodeInput).trim();
    if (!pin || !/^\d{6}$/.test(pin)) {
      setPincodeError("Please enter a valid 6-digit pincode.");
      return;
    }
    setPincodeError(null);
    setIsCheckingPincode(true);

    try {
      const res = await fetch(
        `https://ecommerce-backend-1041917436859.asia-south1.run.app/api/pincode/check?pincode=${pin}`,
      );
      const data = await res.json();
      if (data && data.success) {
        setPincodeResult(data);
        try {
          localStorage.setItem("sentire_user_pincode", pin);
        } catch (e) {}
      } else {
        setPincodeError(data.message || "Could not verify pincode.");
      }
    } catch (e) {
      if (pin.startsWith("302")) {
        setPincodeResult({
          express: true,
          badge: " 24-Hour Jaipur Express Delivery",
          delivery_text: "Delivered within 24 Hours",
          cod_available: true,
        });
      } else {
        setPincodeResult({
          express: false,
          delivery_text: "Delivered in 2-3 Business Days",
          cod_available: true,
        });
      }
    } finally {
      setIsCheckingPincode(false);
    }
  };

  useEffect(() => {
    if (pincodeInput && pincodeInput.length === 6 && !pincodeResult) {
      handleCheckPincode(pincodeInput);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "PC100" && subtotal >= 999) return 100;
    if (appliedCoupon === "ANSH150" && subtotal >= 1249) return 150;
    if (appliedCoupon === "PC200" && subtotal >= 1999) return 200;
    return 0;
  }, [appliedCoupon, subtotal]);

  const FREE_SHIPPING_THRESHOLD = 999;
  const progressPercent = Math.min(
    100,
    subtotal > 0 ? (subtotal / FREE_SHIPPING_THRESHOLD) * 100 : 0,
  );
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );
  const isFreeShippingUnlocked =
    subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0;
  const shippingCost =
    items.length === 0 ? 0 : isFreeShippingUnlocked ? 0 : 100;
  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingCost);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError(null);
    setCouponSuccess(null);

    if (code === "PC100") {
      if (subtotal < 999) {
        setCouponError("Code PC100 requires a minimum order of ₹999");
        return;
      }
      setAppliedCoupon("PC100");
      setCouponSuccess("Code PC100 applied! ₹100 OFF");
    } else if (code === "ANSH150") {
      if (subtotal < 1249) {
        setCouponError("Code ANSH150 requires a minimum order of ₹1,249");
        return;
      }
      setAppliedCoupon("ANSH150");
      setCouponSuccess("Code ANSH150 applied! ₹150 OFF");
    } else if (code === "PC200") {
      if (subtotal < 1999) {
        setCouponError("Code PC200 requires a minimum order of ₹1,999");
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

  const handleSwitchSize = (item: CartItem, newSize: number) => {
    if (item.size === newSize) return;
    const pData = ALL_PERFUMES.find((p) => p.id === item.productId);
    const newPrice = pData?.prices?.[newSize] ?? item.price;
    onRemoveItem(item.productId, item.size);
    if (onAddToCart) {
      onAddToCart(
        { ...item, size: newSize, price: newPrice },
        newSize,
        newPrice,
      );
    }
  };

  const engravingEligibleItems = useMemo(
    () => items.filter((i) => i.size === 50),
    [items],
  );

  const handleApplyEngravingToTarget = () => {
    if (!engraveName.trim()) return;
    const targetItem =
      engravingEligibleItems.find(
        (i) => `${i.productId}-${i.size}` === engraveTargetKey,
      ) || engravingEligibleItems[0];
    if (!targetItem) return;

    const basePrice = targetItem.isPersonalised
      ? targetItem.price
      : targetItem.price + 200;
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
        basePrice,
      );
    }
    setCouponSuccess(
      `Personalised Engraving (+₹200) added to ${targetItem.name}!`,
    );
    setTimeout(() => setCouponSuccess(null), 3000);
  };

  const handleProceedToShopifyCheckout = async () => {
    if (items.length === 0 || isRedirecting) return;
    setIsRedirecting(true);

    try {
      try {
        sessionStorage.setItem("sentire_went_to_checkout", "true");
      } catch (e) {}
      const checkoutUrl = await createOrGetShopifyCheckoutUrl(
        items,
        appliedCoupon ?? undefined,
      );
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setIsRedirecting(false);
        alert("Could not generate checkout link. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setIsRedirecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f0] text-[#111111] pb-28 md:pb-20">
      {" "}
      {/* ══ HEADER WITH OFFICIAL BURGUNDY LOGO ══════════════════════════ */}
      <header className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#f2f2f0]/95 backdrop-blur-md px-4 sm:px-8 py-3">
        {" "}
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          {" "}
          <button
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#111111]/70 hover:text-[#4f0e19] transition-colors"
          >
            {" "}
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />{" "}
            </svg>{" "}
            <span className="hidden sm:inline">Back to Boutique</span>{" "}
          </button>{" "}
          {/* Official Logo (Bigger & Seamless Cream Background Blending) */}
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onNavigate?.("home")}
          >
            {" "}
            <img
              src="/assets/sentire-logo-user.jpg"
              alt="SENTIRE By PC Logo"
              className="h-10 sm:h-12 object-contain max-w-[220px] mix-blend-multiply scale-110"
            />{" "}
          </div>{" "}
          <div className="flex items-center gap-1.5 text-[10px] max-sm:text-[12px] sm:text-xs font-bold uppercase tracking-wider text-[#4f0e19]">
            {" "}
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />{" "}
            </svg>{" "}
            <span>SSL Secured</span>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        {" "}
        {/*  DYNAMIC FREE DELIVERY BANNER (MATCHING IMAGE 3) */}
        <div
          className={`mb-6 border-y border-[color:var(--color-rule)] py-4 text-center text-ink ${
            items.length === 0 ? "hidden" : ""
          }`}
        >
          {" "}
          {isFreeShippingUnlocked ? (
            <div>
              {" "}
              <p className="text-sm sm:text-base font-medium text-ink">
                {" "}
                Congratulations! You have unlocked{" "}
                <strong className="underline decoration-2">
                  FREE Express Delivery!
                </strong>{" "}
              </p>{" "}
              <p className="mt-1 ed-label">
                {" "}
                Complimentary shipping applied to your signature order
              </p>{" "}
            </div>
          ) : (
            <div>
              {" "}
              <p className="text-sm sm:text-base font-medium text-ink">
                {" "}
                Add{" "}
                <span className="text-ink">
                  ₹{(remainingForFreeShipping || 0).toLocaleString()} more
                </span>{" "}
                to unlock{" "}
                <strong className="font-medium text-ink">
                  free delivery
                </strong>{" "}
              </p>{" "}
              <p className="mt-1 ed-label">(Threshold ₹999)</p>{" "}
              <div className="mt-3 h-px w-full max-w-md mx-auto bg-[color:var(--color-rule)] overflow-hidden">
                {" "}
                <div
                  className="on-dark h-full bg-ink transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />{" "}
              </div>{" "}
            </div>
          )}
        </div>{" "}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center text-center py-16 space-y-4">
            {" "}
            <div className="h-px w-16 bg-[#4f0e19]/40" />{" "}
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light text-[#111111]">
              Your Atelier Bag is Empty
            </h2>{" "}
            <p className="text-[15px] leading-relaxed text-[#111111]/65 max-w-sm">
              Discover our rare 35%+ pure perfume oil extraits de parfum crafted
              in Jaipur.
            </p>{" "}
            <button
              onClick={() => onNavigate?.("perfumes")}
              className="ed-btn ed-btn-solid mt-2"
            >
              {" "}
              Explore Perfume Library
            </button>{" "}
          </div>
        ) : (
          /* Split Layout */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {" "}
            {/* LEFT COLUMN: Products & Customization (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {" "}
              <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3">
                {" "}
                <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#111111]">
                  {" "}
                  Selected Fragrances ({totalCount})
                </h2>{" "}
                {onClearCart && (
                  <button
                    onClick={onClearCart}
                    className="text-xs uppercase tracking-[0.06em] text-[#4f0e19] font-bold hover:underline"
                  >
                    {" "}
                    Clear Bag
                  </button>
                )}
              </div>{" "}
              {/* Items List */}
              <div className="space-y-4">
                {" "}
                {items.map((item) => {
                  const pData = ALL_PERFUMES.find(
                    (p) => p.id === item.productId || p.id === item.id,
                  );
                  const displayImg =
                    item.img ||
                    item.image ||
                    (item.num && pData?.img) ||
                    pData?.sizeImages?.[item.size as 10 | 30 | 50]?.[0] ||
                    pData?.img ||
                    "/assets/purple-oud-arrival.png";

                  const displayName = item.name
                    .toLowerCase()
                    .includes("extrait")
                    ? item.name
                    : `${item.name} Extrait ${item.size}ml`;

                  const availableSizes = pData?.sizes || [item.size];

                  return (
                    <div
                      key={item.id}
                      className="rounded-[4px] border border-[#111111]/10 bg-white p-3 sm:p-4 shadow-sm space-y-3 overflow-hidden"
                    >
                      {" "}
                      <div className="flex gap-3 sm:gap-4">
                        {" "}
                        {/* Bottle Thumbnail */}
                        <div className="relative h-24 sm:h-28 w-20 sm:w-24 shrink-0 overflow-hidden rounded-[4px] bg-[#f2f2f0] border border-[#111111]/10 flex items-center justify-center">
                          {" "}
                          <img
                            src={displayImg}
                            alt={item.name}
                            className="h-full w-full object-contain p-1"
                          />{" "}
                          {item.isPersonalised && (
                            <div className="on-dark absolute bottom-0.5 left-0.5 right-0.5 rounded bg-black/90 text-center text-[7px] font-bold text-[color:var(--accent)] truncate px-1 py-0.5 border border-[#4f0e19]/60 shadow">
                              {" "}
                              {item.engravingText}{" "}
                              {item.engravingDate
                                ? `• ${item.engravingDate}`
                                : ""}
                            </div>
                          )}
                        </div>{" "}
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          {" "}
                          <div>
                            {" "}
                            <div className="flex items-start justify-between gap-1.5">
                              {" "}
                              <div className="min-w-0 flex-1">
                                {" "}
                                <h3 className="font-sans text-sm sm:text-lg font-bold text-[#111111] leading-tight truncate">
                                  {displayName}
                                </h3>{" "}
                                <p className="text-[10px] max-sm:text-[12px] text-[#4f0e19] font-bold uppercase tracking-wider">
                                  35%+ Pure Oil Extrait
                                </p>{" "}
                              </div>{" "}
                              <span className="font-sans text-sm sm:text-base font-extrabold text-[#111111] shrink-0 whitespace-nowrap ml-1">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </span>{" "}
                            </div>{" "}
                            {/* Personalisation Badge */}
                            {item.isPersonalised && (
                              <div className="mt-1 flex items-center gap-1 text-[10px] max-sm:text-[12px] font-bold text-[#4f0e19]">
                                {" "}
                                <span>
                                  {" "}
                                  Laser Engraved: "{item.engravingText}{" "}
                                  {item.engravingDate}" (+₹200)
                                </span>{" "}
                              </div>
                            )}
                          </div>{" "}
                          {/* Inline Size Switcher Pills (ONLY show available sizes for this perfume!) */}
                          {item.productId !== "discovery-set" &&
                            !item.name
                              ?.toLowerCase()
                              .includes("discovery set") &&
                            availableSizes.length > 1 && (
                              <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                                {" "}
                                <span className="text-[10px] max-sm:text-[12px] font-bold text-[#111111]/60 uppercase">
                                  Size:
                                </span>{" "}
                                <div className="flex flex-wrap gap-1">
                                  {" "}
                                  {availableSizes.map((sz) => {
                                    const isSelected = item.size === sz;
                                    return (
                                      <button
                                        key={sz}
                                        onClick={() =>
                                          handleSwitchSize(item, sz)
                                        }
                                        className={`on-dark px-2.5 py-0.5 rounded-md text-[11px] max-sm:text-[12px] font-bold transition-all ${
                                          isSelected
                                            ? "bg-black text-white border border-black shadow-xs"
                                            : "bg-[#111111]/5 text-[#111111]/70 border border-[#111111]/15 hover:border-black"
                                        }`}
                                      >
                                        {" "}
                                        {sz}ml
                                      </button>
                                    );
                                  })}
                                </div>{" "}
                              </div>
                            )}
                          {/* Quantity Stepper & Remove */}
                          <div className="mt-3 flex items-center justify-between">
                            {" "}
                            <div className="flex items-center rounded-full border border-[#111111]/30 bg-white px-2 py-0.5 gap-1.5">
                              {" "}
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.productId,
                                    item.size,
                                    -1,
                                  )
                                }
                                className="font-bold text-sm text-[#111111] hover:opacity-75 px-1"
                              >
                                -
                              </button>{" "}
                              <span className="w-4 text-center text-xs font-bold text-[#111111]">
                                {item.quantity}
                              </span>{" "}
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.productId, item.size, 1)
                                }
                                className="font-bold text-sm text-[#111111] hover:opacity-75 px-1"
                              >
                                +
                              </button>{" "}
                            </div>{" "}
                            <button
                              onClick={() =>
                                onRemoveItem(item.productId, item.size)
                              }
                              className="text-[11px] max-sm:text-[12px] text-red-600 font-semibold hover:underline"
                            >
                              {" "}
                              Remove
                            </button>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  );
                })}
              </div>{" "}
              {/*  ₹200 CUSTOM LASER ENGRAVING MODULE (RESTRICTED TO 50ML BOTTLES ONLY) */}
              {engravingEligibleItems.length > 0 ? (
                <div className="rounded-[4px] border border-[#111111]/15 bg-white p-4 shadow-sm space-y-3">
                  {" "}
                  <div>
                    {" "}
                    <h3 className="font-sans text-base font-bold text-[#111111]">
                      {" "}
                      Custom Laser Name & Date Engraving (+₹200)
                    </h3>{" "}
                    <p className="text-[10px] max-sm:text-[12px] text-[#4f0e19] font-bold mt-0.5">
                      Exclusively available on 50ml signature Extrait bottles
                    </p>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <select
                      value={
                        engraveTargetKey ||
                        `${engravingEligibleItems[0]?.productId}-${engravingEligibleItems[0]?.size}`
                      }
                      onChange={(e) => setEngraveTargetKey(e.target.value)}
                      className="w-full rounded-[4px] border border-[#111111]/20 bg-[#f2f2f0] p-2.5 text-xs font-semibold text-[#111111] focus:border-[#4f0e19] focus:outline-none"
                    >
                      {" "}
                      {engravingEligibleItems.map((i) => {
                        const cleanName = i.name
                          .replace(/Extrait\s*\d+ml/gi, "")
                          .trim();
                        return (
                          <option
                            key={`${i.productId}-${i.size}`}
                            value={`${i.productId}-${i.size}`}
                          >
                            {" "}
                            Select Perfume: {cleanName} (50ml)
                          </option>
                        );
                      })}
                    </select>{" "}
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-2">
                    {" "}
                    <div>
                      {" "}
                      <label className="block text-[10px] max-sm:text-[12px] font-bold uppercase tracking-wider text-[#111111]/70 mb-1">
                        Name
                      </label>{" "}
                      <input
                        type="text"
                        maxLength={12}
                        value={engraveName}
                        onChange={(e) => setEngraveName(e.target.value)}
                        placeholder="e.g. Vansh"
                        className="w-full rounded-[4px] border border-[#111111]/20 p-2.5 text-xs font-semibold text-[#111111] focus:border-[#4f0e19] focus:outline-none"
                      />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <label className="block text-[10px] max-sm:text-[12px] font-bold uppercase tracking-wider text-[#111111]/70 mb-1">
                        Date
                      </label>{" "}
                      <input
                        type="text"
                        maxLength={10}
                        value={engraveDate}
                        onChange={(e) => setEngraveDate(e.target.value)}
                        placeholder="e.g. 11.09.2026"
                        className="w-full rounded-[4px] border border-[#111111]/20 p-2.5 text-xs font-semibold text-[#111111] focus:border-[#4f0e19] focus:outline-none"
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  <button
                    onClick={handleApplyEngravingToTarget}
                    className="w-full rounded-[4px] border border-[#111111] bg-white py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-black hover:text-white transition-all shadow-xs"
                  >
                    {" "}
                    PREVIEW / APPLY ENGRAVING (+₹200)
                  </button>{" "}
                </div>
              ) : (
                <div className="rounded-[4px] border border-[#111111]/10 bg-white p-4 shadow-sm space-y-1">
                  {" "}
                  <h3 className="font-sans text-sm font-bold text-[#111111]">
                    {" "}
                    Custom Laser Name & Date Engraving (+₹200)
                  </h3>{" "}
                  <p className="text-xs text-[#111111]/70">
                    {" "}
                    Custom laser name & date engraving (+₹200) is exclusively
                    available on <strong>50ml Extrait bottles</strong>.
                  </p>{" "}
                </div>
              )}
            </div>{" "}
            {/* RIGHT COLUMN: Order Summary & Checkout (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {" "}
              <div className="sticky top-24 rounded-[4px] border border-[#4f0e19]/30 bg-white p-4 sm:p-5 shadow-xl space-y-4 sm:space-y-5 overflow-hidden">
                {" "}
                <div className="border-b border-[#111111]/10 pb-3 flex items-center justify-between">
                  {" "}
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#111111]">
                    Atelier Order Summary
                  </h3>{" "}
                </div>{" "}
                {/*  1-TAP COUPON CARD */}
                <div className="space-y-2">
                  {" "}
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111111]/70">
                    Apply Atelier Coupons
                  </label>{" "}
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#4f0e19]/10 border border-[#4f0e19]/40 rounded-[4px] p-2.5 text-xs">
                      {" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <span className="font-bold text-[#111111] font-mono tracking-wider text-xs">
                          {" "}
                          {appliedCoupon}
                        </span>{" "}
                        <span className="text-[#6b1422] font-extrabold text-xs">
                          (Saved ₹{couponDiscount})
                        </span>{" "}
                      </div>{" "}
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-600 font-bold text-xs px-2 py-0.5 rounded bg-white border border-red-200"
                      >
                        {" "}
                        Remove
                      </button>{" "}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {" "}
                      <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
                        {" "}
                        <button
                          onClick={() => handleApplyCoupon("PC100")}
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] max-sm:text-[12px] font-bold tracking-wider border transition-all ${
                            subtotal >= 999
                              ? "bg-[#f2f2f0] text-[#4f0e19] border-[#4f0e19] hover:bg-[#4f0e19] hover:text-white"
                              : "bg-black/5 text-gray-400 border-black/10"
                          }`}
                        >
                          {" "}
                          PC100 (₹100 OFF)
                        </button>{" "}
                        <button
                          onClick={() => handleApplyCoupon("PC200")}
                          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] max-sm:text-[12px] font-bold tracking-wider border transition-all ${
                            subtotal >= 1999
                              ? "bg-[#f2f2f0] text-[#4f0e19] border-[#4f0e19] hover:bg-[#4f0e19] hover:text-white"
                              : "bg-black/5 text-gray-400 border-black/10"
                          }`}
                        >
                          {" "}
                          PC200 (₹200 OFF)
                        </button>{" "}
                      </div>{" "}
                      <div className="flex items-center gap-1.5 w-full">
                        {" "}
                        <input
                          type="text"
                          placeholder="ENTER PROMO CODE"
                          value={couponInput}
                          onChange={(e) =>
                            setCouponInput(e.target.value.toUpperCase())
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleApplyCoupon();
                          }}
                          className="flex-1 min-w-0 rounded-[4px] border border-[#111111]/20 bg-[#f2f2f0] px-2.5 sm:px-3 py-2 text-xs font-bold font-sans tracking-tight text-[#111111] focus:border-[#4f0e19] focus:outline-none"
                        />{" "}
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="on-dark shrink-0 rounded-[4px] bg-[#111111] px-3.5 sm:px-4 py-2 text-xs font-bold uppercase text-[color:var(--accent)] hover:bg-[#4f0e19] hover:text-white transition-colors"
                        >
                          {" "}
                          Apply
                        </button>{" "}
                      </div>{" "}
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[10px] max-sm:text-[12px] text-red-500 font-medium">
                      {couponError}
                    </p>
                  )}
                  {couponSuccess && (
                    <p className="text-[10px] max-sm:text-[12px] text-[#6b1422] font-bold">
                      ✓ {couponSuccess}
                    </p>
                  )}
                </div>{" "}
                {/* Breakdown */}
                <div className="space-y-2 border-t border-b border-[#111111]/10 py-3 text-xs">
                  {" "}
                  <div className="flex justify-between text-[#111111]/80">
                    {" "}
                    <span>Items Subtotal ({totalCount} items)</span>{" "}
                    <span className="font-bold">
                      ₹ {subtotal.toLocaleString()}
                    </span>{" "}
                  </div>{" "}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#6b1422] font-semibold">
                      {" "}
                      <span>Coupon Discount ({appliedCoupon})</span>{" "}
                      <span>- ₹ {couponDiscount.toLocaleString()}</span>{" "}
                    </div>
                  )}
                  <div className="flex justify-between text-[#111111]/80">
                    {" "}
                    <span>Express Shipping</span>{" "}
                    <span className="font-bold text-[#6b1422]">
                      {isFreeShippingUnlocked ? "FREE" : "₹ 100"}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex justify-between border-t border-dashed border-[#111111]/10 pt-2 text-base font-bold text-[#111111]">
                    {" "}
                    <span className="font-sans font-bold">
                      Total Payable
                    </span>{" "}
                    <span className="font-sans text-xl font-extrabold text-[#111111]">
                      ₹ {finalTotal.toLocaleString()}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                {/*  PINCODE DELIVERY & COD CHECKER WIDGET */}
                <div className="rounded-[4px] border border-[#4f0e19]/30 bg-[#f2f2f0] p-3 space-y-2">
                  {" "}
                  <div className="flex items-center justify-between">
                    {" "}
                    <span className="text-[11px] max-sm:text-[12px] font-bold uppercase tracking-wider text-[#111111]/80 flex items-center gap-1">
                      {" "}
                      Check Delivery & COD
                    </span>{" "}
                    {pincodeResult && (
                      <span className="text-[10px] max-sm:text-[12px] font-bold text-[#4f0e19] uppercase">
                        Checked
                      </span>
                    )}
                  </div>{" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) =>
                        setPincodeInput(e.target.value.replace(/\D/g, ""))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCheckPincode();
                      }}
                      placeholder="Enter 6-digit Pincode"
                      className="flex-1 min-w-0 rounded-lg border border-[#111111]/20 bg-white px-3 py-2 text-xs font-semibold text-[#111111] focus:border-[#4f0e19] focus:outline-none"
                    />{" "}
                    <button
                      onClick={() => handleCheckPincode()}
                      disabled={isCheckingPincode}
                      className="on-dark shrink-0 rounded-lg bg-[#111111] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[color:var(--accent)] hover:bg-[#4f0e19] hover:text-white transition-all shadow-sm disabled:opacity-50"
                    >
                      {" "}
                      {isCheckingPincode ? "..." : "CHECK"}
                    </button>{" "}
                  </div>{" "}
                  {pincodeError && (
                    <p className="text-[10px] max-sm:text-[12px] text-red-500 font-medium">
                      {pincodeError}
                    </p>
                  )}
                  {pincodeResult && (
                    <div className="mt-2 rounded-lg p-2.5 text-xs space-y-1 border bg-white border-[#4f0e19]/30">
                      {" "}
                      {pincodeResult.express ? (
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                          {" "}
                          <span>
                            {" "}
                            {pincodeResult.badge || "Delivered within 24 Hours"}
                          </span>{" "}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-[#6b1422]">
                          {" "}
                          <span>
                            {" "}
                            {pincodeResult.delivery_text ||
                              `Estimated Delivery: ${pincodeResult.estimated_days}`}
                          </span>{" "}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[11px] max-sm:text-[12px] text-[#111111]/80">
                        {" "}
                        <span>
                          {" "}
                          Cash on Delivery:{" "}
                          <strong>
                            {pincodeResult.cod_available
                              ? "Available"
                              : "Not Available"}
                          </strong>
                        </span>{" "}
                      </div>{" "}
                    </div>
                  )}
                </div>{" "}
                {/* Primary CTA (Visible on Desktop Only - Mobile Uses Fixed Bottom Bar) */}
                <button
                  onClick={handleProceedToShopifyCheckout}
                  disabled={isRedirecting}
                  className="hidden lg:flex w-full rounded-full bg-[#4f0e19] hover:bg-[#6b1422] py-3.5 text-center text-xs font-bold uppercase tracking-[0.06em] text-white shadow-md items-center justify-center gap-2 transition-all"
                >
                  {" "}
                  <span>
                    {isRedirecting
                      ? "REDIRECTING TO CHECKOUT..."
                      : "PROCEED TO CHECKOUT"}
                  </span>{" "}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />{" "}
                  </svg>{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        )}
      </main>{" "}
      {/* ══ MOBILE STICKY BOTTOM CHECKOUT DOCK (MATCHING IMAGE 3) ══════════════════════════ */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-[999] border-t border-[#111111]/10 bg-[#f2f2f0]/95 backdrop-blur-md p-3 text-[#111111] lg:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.12)]">
          {" "}
          <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-1">
            {" "}
            <div className="flex items-center gap-1.5">
              {" "}
              <span className="text-xs font-bold text-[#111111]">
                Total:
              </span>{" "}
              <p className="font-sans text-lg font-extrabold text-[#111111]">
                ₹{finalTotal.toLocaleString()}
              </p>{" "}
            </div>{" "}
            <button
              onClick={handleProceedToShopifyCheckout}
              disabled={isRedirecting}
              className="flex-1 rounded-full bg-[#4f0e19] py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md flex items-center justify-center gap-1.5 hover:bg-[#6b1422] transition-all"
            >
              {" "}
              <span>
                {isRedirecting ? "CHECKING OUT..." : "PROCEED TO CHECKOUT"}
              </span>{" "}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />{" "}
              </svg>{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
}
