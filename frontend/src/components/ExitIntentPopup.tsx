import { useState, useEffect } from "react";
import type { PageName } from "../types/appTypes";

interface ExitIntentPopupProps {
  onNavigate: (page: PageName) => void;
}

export default function ExitIntentPopup({ onNavigate }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    // Preload image and logo into browser cache immediately on page load
    const preloadImg1 = new Image();
    preloadImg1.src = "/assets/sentire_purple_oud_popup.webp";
    const preloadImg2 = new Image();
    preloadImg2.src = "/assets/sentire-logo-official-transparent.png";

    // Check if dismissed within last 24 hours
    const lastDismissed = localStorage.getItem("sentire_popup_dismissed_v1");
    if (lastDismissed) {
      const elapsed = Date.now() - parseInt(lastDismissed, 10);
      if (elapsed < 24 * 60 * 60 * 1000) {
        return; // Already shown within 24h
      }
    }

    let hasTriggered = false;

    const triggerPopup = () => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsOpen(true);
      }
    };

    // Desktop Exit-Intent listener
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerPopup();
      }
    };

    // Timer fallback (trigger after 6 seconds)
    const timer = setTimeout(() => {
      triggerPopup();
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
      {" "}
      <div
        className="ed-offer-card relative w-full max-w-3xl overflow-hidden bg-paper sm:rounded-[2px]"
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 cursor-pointer items-center justify-center text-ink/70 transition-colors hover:text-ink sm:text-paper/80 sm:hover:text-paper"
        >
          {" "}
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {" "}
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />{" "}
          </svg>{" "}
        </button>{" "}
        <div className="grid sm:grid-cols-2">
          {" "}
          <div className="order-2 flex flex-col justify-center p-6 sm:order-1 sm:p-10">
            {" "}
            <p className="ed-label">A note before you go</p>{" "}
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
              {" "}
              ₹200 off your first <em className="italic">extrait</em>.
            </h2>{" "}
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              {" "}
              Use code{" "}
              <span className="font-mono text-[13px] tracking-[0.02em] text-ink underline underline-offset-4">
                {" "}
                PC200
              </span>{" "}
              on orders above ₹1,999. Shipping is on us.
            </p>{" "}
            <p className="ed-label mt-5 tabular-nums">
              {" "}
              Expires in {mStr}:{sStr}
            </p>{" "}
            <button
              onClick={handleClaimPrivilege}
              className="ed-btn ed-btn-solid mt-7 w-full sm:w-auto"
            >
              {" "}
              Shop the library
            </button>{" "}
          </div>{" "}
          <div className="order-1 relative min-h-[180px] bg-ink sm:order-2 sm:min-h-[420px]">
            {" "}
            <picture>
              {" "}
              <source
                srcSet="/assets/sentire_purple_oud_popup.webp"
                type="image/webp"
              />{" "}
              <img
                src="/assets/sentire_purple_oud_popup.jpg"
                alt="Purple Oud extrait de parfum"
                className="absolute inset-0 h-full w-full object-cover"
              />{" "}
            </picture>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
