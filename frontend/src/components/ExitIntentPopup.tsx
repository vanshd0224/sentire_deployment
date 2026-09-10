import React, { useState, useEffect } from "react";
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
    }, 6000);

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      {/* POPUP CARD ASSEMBLY (50/50 Split Layout - faithful to approved prototype) */}
      <div
        className="max-w-2xl w-full bg-[#FAF6F0] rounded-[24px] overflow-hidden flex flex-col md:flex-row relative transition-all duration-300 border border-[#C89B5A]/50 shadow-2xl"
        style={{
          boxShadow: "0 30px 90px rgba(0,0,0,0.6), 0 0 35px rgba(200, 155, 90, 0.35)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Top Right over image) */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs font-bold backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer"
        >
          ✕
        </button>

        {/* LEFT COLUMN (50% Half): Official Logo + Up to 30% OFF Main Offer (Warm Silk Cream #FAF6F0) */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-center items-center text-center bg-[#FAF6F0] shrink-0">
          
          {/* OFFICIAL SENTIRE BY PC LOGO */}
          <div className="mb-2 max-w-[150px] sm:max-w-[175px]">
            <img
              src="/assets/sentire-logo-official-transparent.png"
              alt="SENTIRE® By PC"
              className="w-full h-auto object-contain block max-h-[46px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/sentire-logo-gold.png";
              }}
            />
          </div>

          {/* HEADLINE (Two lines: Dark + Bold Red) */}
          <div className="mb-3 text-center">
            <div className="font-serif text-[#1C1814] font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase leading-tight">
              DON'T WORRY,
            </div>
            <div className="font-serif text-[#9E2A2B] font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase leading-tight mt-0.5" style={{ textShadow: "0 0.5px 0 #9E2A2B" }}>
              IT'S A SAFE ADDICTION.
            </div>
          </div>

          {/* DARK EXCLUSIVE PRIVILEGE CONTAINER BOX */}
          <div className="bg-[#1C1917] text-white py-3 px-5 rounded-[16px] w-full mb-3 border border-[#C89B5A]/40 shadow-md flex flex-col items-center justify-center">
            <span className="text-[9px] uppercase tracking-widest text-[#C89B5A] font-bold block mb-0.5">
              EXCLUSIVE PRIVILEGE
            </span>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-[#F5F0E8]">
              UP TO 30% OFF
            </div>
          </div>

          {/* SUBTEXT WITH PC200 HIGHLIGHT BADGE */}
          <p className="text-[11px] sm:text-xs text-[#57534E] leading-relaxed mb-3 max-w-[240px]">
            Use code{" "}
            <span className="font-bold text-[#1C1814] bg-[#E8DEC8] px-1.5 py-0.5 rounded border border-[#C89B5A]/30">
              PC200
            </span>{" "}
            for <span className="font-bold text-black">Flat ₹200 OFF</span> on orders above ₹1,999 + Free Shipping
          </p>

          {/* DIGITAL COUNTDOWN TIMER */}
          <div className="mb-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-6 sm:w-7 h-7 sm:h-8 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs sm:text-sm shadow border border-black/40">
                {mStr[0]}
              </div>
              <div className="w-6 sm:w-7 h-7 sm:h-8 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs sm:text-sm shadow border border-black/40">
                {mStr[1]}
              </div>
              <span className="text-[#1C1917] font-extrabold text-sm mx-0.5">:</span>
              <div className="w-6 sm:w-7 h-7 sm:h-8 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs sm:text-sm shadow border border-black/40">
                {sStr[0]}
              </div>
              <div className="w-6 sm:w-7 h-7 sm:h-8 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs sm:text-sm shadow border border-black/40">
                {sStr[1]}
              </div>
            </div>
            <span className="text-[10px] text-[#78716C] font-medium">
              Privilege expires in <span className="font-bold text-[#1C1917]">30:00 mins</span>
            </span>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handleClaimPrivilege}
            className="w-full py-3 px-4 bg-[#1C1917] hover:bg-[#2C2724] text-white text-xs font-extrabold tracking-wider uppercase rounded-full shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer border border-[#C89B5A]/30"
          >
            CLAIM PRIVILEGE &amp; SHOP →
          </button>
        </div>

        {/* RIGHT COLUMN (50% Half): Creative Visual Image */}
        <div className="w-full md:w-1/2 relative min-h-[260px] md:min-h-[420px] bg-[#1C1917] overflow-hidden flex items-end">
          <picture className="w-full h-full absolute inset-0">
            <source srcSet="/assets/sentire_purple_oud_popup.webp" type="image/webp" />
            <img
              src="/assets/sentire_purple_oud_popup.jpg"
              alt="Sentire Purple Oud Luxury Perfume"
              className="w-full h-full object-cover block"
            />
          </picture>
          
          {/* BOTTOM LEFT IMAGE BADGE */}
          <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent w-full text-left">
            <span className="text-[9px] uppercase tracking-widest text-[#E8DEC8] bg-black/70 backdrop-blur-sm border border-[#C89B5A]/40 px-2.5 py-1 rounded-full font-bold inline-block shadow-md">
              PURPLE OUD EXTRAIT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
