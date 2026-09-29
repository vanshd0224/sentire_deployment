import { useState, useEffect } from "react";
import type { PageName } from "../types/appTypes";

interface ExitIntentPopupProps {
  onNavigate: (page: PageName) => void;
}

export default function ExitIntentPopup({ onNavigate }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    // Check if dismissed within last 24 hours
    const lastDismissed = localStorage.getItem("sentire_popup_dismissed_v1");
    if (lastDismissed) {
      const elapsed = Date.now() - parseInt(lastDismissed, 10);
      if (elapsed < 24 * 60 * 60 * 1000) {
        return; // Already shown within 24h
      }
    }

    let hasTriggered = false;
    let armed = false; // not in the first seconds of a visit

    // Never interrupt someone who is deciding or buying: not on a product
    // page, in the bag, at checkout or in their account.
    const busy = () => {
      const p = window.location.pathname;
      return (
        /^\/(perfumes|products?)\/[^/]+/.test(p) ||
        /^\/(cart|bag|checkout|account)/.test(p) ||
        document.body.classList.contains("cart-drawer-open")
      );
    };

    const triggerPopup = () => {
      if (hasTriggered || !armed || busy()) return;
      hasTriggered = true;
      setIsOpen(true);
    };

    // Desktop: the pointer leaving through the top of the window
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };

    // Armed after 20s; the image is fetched only then, not on page load
    const arm = setTimeout(() => {
      armed = true;
      const img = new Image();
      img.src = "/assets/sentire_purple_oud_popup.webp";
    }, 20000);

    // Phones have no exit intent: offer it once after a minute of browsing
    const timer = window.matchMedia("(hover: none)").matches
      ? setTimeout(triggerPopup, 60000)
      : 0;

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(arm);
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Esc closes it
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live 30-minute ticking timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 30 * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("sentire_popup_dismissed_v1", Date.now().toString());
  };

  const handleClaimPrivilege = () => {
    localStorage.setItem("sentire_popup_dismissed_v1", Date.now().toString());
    setIsOpen(false);
    onNavigate("perfumes");
  };

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const mStr = String(minutes).padStart(2, "0");
  const sStr = String(seconds).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/45 p-0 sm:items-center sm:p-6"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Offer"
    >
      <div
        className="ed-offer-card relative max-h-[92svh] w-full max-w-3xl overflow-y-auto bg-paper sm:rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 focus:outline-none backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition-all hover:scale-105"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="grid sm:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-6 sm:order-1 sm:p-10">
            <p className="ed-label">A note before you go</p>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              ₹200 off your first <em className="italic">extrait</em>.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Use code{" "}
              <span className="font-mono text-[13px] tracking-[0.02em] text-ink underline underline-offset-4">
                PC200
              </span>{" "}
              on orders above ₹1,999. Shipping is on us.
            </p>
            <p className="ed-label mt-5 tabular-nums">
              Expires in {mStr}:{sStr}
            </p>
            <button
              onClick={handleClaimPrivilege}
              className="ed-btn ed-btn-solid mt-7 w-full sm:w-auto"
            >
              Shop the library
            </button>
          </div>
          <div className="on-dark order-1 relative min-h-[240px] bg-ink sm:order-2 sm:min-h-[420px] flex items-center justify-center overflow-hidden">
            <picture className="w-full h-full flex items-center justify-center">
              <source
                srcSet="/assets/sentire_purple_oud_popup.webp"
                type="image/webp"
              />
              <img
                src="/assets/sentire_purple_oud_popup.jpg"
                alt="Purple Oud extrait de parfum"
                className="w-full h-full object-contain block"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
