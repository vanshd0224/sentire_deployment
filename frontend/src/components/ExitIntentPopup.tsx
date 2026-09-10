import React, { useState, useEffect } from "react";
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

    const triggerPopup = () => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsOpen(true);
      }
    };

    // Desktop Exit-Intent listener (mouse leaving viewport at top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerPopup();
      }
    };

    // Timer fallback (trigger after 6 seconds if not triggered yet)
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fadeIn">
      {/* POPUP CARD ASSEMBLY (50/50 Split Layout) */}
      <div 
        className="max-w-2xl w-full bg-[#FAF6F0] rounded-[24px] overflow-hidden flex flex-col md:flex-row relative transition-all duration-300 border border-[#C89B5A]/50 shadow-2xl"
        style={{
          boxShadow: "0 30px 90px rgba(0,0,0,0.5), 0 0 35px rgba(200, 155, 90, 0.3)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs font-bold backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer"
        >
          ✕
        </button>

        {/* LEFT COLUMN (50% Half): Official Logo + Up to 30% OFF Main Offer */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-center items-center text-center bg-[#FAF6F0] shrink-0">
          {/* OFFICIAL SENTIRE BY PC LOGO */}
          <div className="mb-2 max-w-[150px] sm:max-w-[170px]">
            <img
              src="/assets/sentire-logo-official-transparent.png"
              alt="SENTIRE® By PC"
              className="w-full h-auto object-contain block max-h-[48px]"
            />
          </div>

          {/* HEADLINE */}
          <h3 className="font-serif text-[#1C1917] font-bold text-xs sm:text-sm tracking-wider uppercase mb-2">
            DON'T WORRY. IT'S A SAFE ADDICTION.
          </h3>

          {/* MAIN OFFER BADGE */}
          <div className="inline-block bg-black text-[#F5F0E8] text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full tracking-wide mb-2 shadow-sm">
            UP TO 30% OFF
          </div>

          {/* SUBTEXT */}
          <p className="text-[11px] sm:text-xs text-[#57534E] leading-relaxed mb-4 max-w-[230px]">
            Use code <span className="font-bold text-black">PC200</span> for flat ₹200 OFF on orders above ₹1,999 + Free Express Shipping
          </p>

          {/* DIGIT COUNTDOWN TIMER */}
          <div className="mb-5 flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-widest text-[#8C6228] font-bold mb-1">
              Offer Expires In
            </span>
            <div className="flex items-center gap-1">
              <div className="w-6 h-7 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs shadow">
                {mStr[0]}
              </div>
              <div className="w-6 h-7 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs shadow">
                {mStr[1]}
              </div>
              <span className="text-[#1C1917] font-bold text-sm mx-0.5">:</span>
              <div className="w-6 h-7 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs shadow">
                {sStr[0]}
              </div>
              <div className="w-6 h-7 bg-[#1C1917] text-[#F5F0E8] font-mono font-extrabold flex items-center justify-center rounded text-xs shadow">
                {sStr[1]}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handleClaimPrivilege}
            className="w-full py-3 px-4 text-white text-xs font-extrabold tracking-wider uppercase rounded-full shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #C89B5A 0%, #A87C3B 50%, #8C6228 100%)"
            }}
          >
            CLAIM PRIVILEGE &amp; SHOP →
          </button>
        </div>

        {/* RIGHT COLUMN (50% Half): Creative Visual Image */}
        <div className="w-full md:w-1/2 relative min-h-[240px] md:min-h-[380px] bg-black overflow-hidden">
          <img
            src="/assets/sentire_purple_oud_popup.jpg"
            alt="Sentire Purple Oud Luxury Perfume"
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
}
