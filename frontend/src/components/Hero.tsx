import React, { useEffect, useRef } from "react";

interface HeroProps {
  onNavigate?: (
    page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order" | "account",
    filters?: any
  ) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLImageElement>(".hero-clean-bg");
    if (!el) return;
    const t = setTimeout(() => {
      el.style.opacity = "1";
    }, 50);
    return () => clearTimeout(t);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("perfumes");
    } else {
      const perfumesEl = document.getElementById("perfumes");
      if (perfumesEl) {
        perfumesEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePersonalisationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("personalisation");
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Sentire by PC Bespoke Rakhi Fragrance Gifting"
      className="hero-section relative w-full overflow-hidden select-none bg-[#F3DFC5]"
      style={{
        width: "100%",
        height: "calc(100vh - 96px)",
        minHeight: "calc(100vh - 96px)",
        backgroundColor: "#F3DFC5",
        WebkitFontSmoothing: "antialiased",
        textRendering: "geometricPrecision",
      }}
    >
      <style>{`
        /* ═════════════════════════════════════════════════════════════════
           TYPOGRAPHY SYSTEM (Cormorant Garamond 300/400 + Allura + Montserrat)
           ═════════════════════════════════════════════════════════════════ */
        .hero-title {
          font-family: "Cormorant Garamond", serif !important;
          font-weight: 300 !important;
          font-style: normal !important;
          color: #2B160F !important;
          line-height: 0.94 !important;
          letter-spacing: -0.015em !important;
        }

        .hero-script {
          font-family: "Allura", cursive !important;
          font-weight: 400 !important;
          font-style: normal !important;
          color: #A66B18 !important;
          line-height: 0.88 !important;
          letter-spacing: 0.01em !important;
        }

        .hero-description {
          font-family: "Cormorant Garamond", serif !important;
          font-weight: 400 !important;
          font-style: normal !important;
          color: #382219 !important;
          line-height: 1.25 !important;
          letter-spacing: -0.005em !important;
        }

        .hero-usp {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          color: #2C211C !important;
          line-height: 1.25 !important;
        }

        /* Primary Button: SHOP RAKHI GIFTS */
        .hero-cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #28150E;
          color: #E7B65B;
          border: 1.5px solid #B88638;
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.16em;
          text-transform: uppercase !important;
          box-shadow: 0 4px 20px rgba(40, 21, 14, 0.22);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-primary::after {
          content: "";
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(184, 134, 56, 0.45);
          pointer-events: none;
          transition: all 0.35s ease;
        }
        .hero-cta-primary:hover {
          background-color: #1a0d08;
          border-color: #d4a34e;
          box-shadow: 0 8px 30px rgba(184, 134, 56, 0.35);
          transform: translateY(-1.5px);
        }
        .hero-cta-primary:hover::after {
          border-color: rgba(231, 182, 91, 0.85);
          inset: 4px;
        }

        /* Secondary Button: PRODUCT PERSONALISATION */
        .hero-cta-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(243, 223, 197, 0.55);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #28150E;
          border: 1.5px solid #B88638;
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.14em;
          text-transform: uppercase !important;
          box-shadow: 0 4px 16px rgba(40, 21, 14, 0.08);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-secondary::after {
          content: "";
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(184, 134, 56, 0.35);
          pointer-events: none;
          transition: all 0.35s ease;
        }
        .hero-cta-secondary:hover {
          background-color: #28150E;
          color: #E7B65B;
          border-color: #d4a34e;
          box-shadow: 0 8px 24px rgba(184, 134, 56, 0.3);
          transform: translateY(-1.5px);
        }
        .hero-cta-secondary:hover::after {
          border-color: rgba(231, 182, 91, 0.85);
          inset: 4px;
        }

        @media (max-width: 900px) {
          .hero-section {
            height: auto !important;
            min-height: 0 !important;
            max-height: none !important;
          }
          .hero-desktop-content {
            display: none !important;
          }
          .hero-mobile-content {
            display: block !important;
          }
        }
        @media (min-width: 901px) {
          .hero-section {
            height: calc(100vh - 96px) !important;
            min-height: calc(100vh - 96px) !important;
            max-height: none !important;
          }
          .hero-desktop-content {
            display: flex !important;
          }
          .hero-mobile-content {
            display: none !important;
          }
        }
      `}</style>

      {/* ═════════════════════════════════════════════════════════════════
          FULL-BLEED PHOTOGRAPHIC STILL-LIFE BACKGROUND (DESKTOP)
          ═════════════════════════════════════════════════════════════════ */}
      <picture className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none">
        <source srcSet="/images/hero-rakhi-clean.webp" type="image/webp" />
        <source srcSet="/images/hero-rakhi-clean.png" type="image/png" />
        <img
          src="/images/hero-rakhi-clean.png"
          alt="Sentire by PC Rakhi Luxury Fragrance Gifting Still Life"
          fetchPriority="high"
          width="1672"
          height="941"
          className="hero-clean-bg absolute inset-0 w-full h-full object-cover object-right md:object-center select-none pointer-events-none"
          style={{
            transition: "opacity 0.6s ease-out",
          }}
          draggable={false}
        />
      </picture>

      {/* Top-Left Subtle Ornamental Mandala Motif (DESKTOP) */}
      <div
        className="hidden md:block absolute top-0 left-0 pointer-events-none select-none opacity-20"
        style={{ width: "24%", maxWidth: "320px", aspectRatio: "1/1", zIndex: 3 }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#D7AD72]">
          <circle cx="0" cy="0" r="190" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="165" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="140" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="90" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="65" stroke="currentColor" strokeWidth="0.5" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 90) / 16;
            const rad = (angle * Math.PI) / 180;
            const x1 = Math.cos(rad) * 65;
            const y1 = Math.sin(rad) * 65;
            const x2 = Math.cos(rad) * 140;
            const y2 = Math.sin(rad) * 140;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" />;
          })}
        </svg>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          DESKTOP EDITORIAL CONTENT LAYER (Full-Bleed, Adjusted Spacing)
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-desktop-content absolute inset-0 flex flex-col justify-center"
        style={{
          paddingLeft: "clamp(36px, 7.5vw, 125px)",
          paddingTop: "clamp(28px, 4.5vh, 60px)",
          paddingBottom: "clamp(28px, 4.5vh, 60px)",
          paddingRight: "46%", // Clear space for the perfume still life on right
          zIndex: 6,
        }}
      >
        {/* Main Headline */}
        <h1
          className="hero-title m-0"
          style={{
            fontSize: "clamp(52px, 5.2vw, 90px)",
            lineHeight: 0.94,
          }}
        >
          A Pure
          <br />
          Rakhi Gesture
        </h1>

        {/* Script Subheadline */}
        <div
          className="hero-script select-none"
          style={{
            fontSize: "clamp(44px, 4.2vw, 70px)",
            lineHeight: 0.88,
            marginTop: "clamp(4px, 0.6vw, 10px)",
            transform: "translateY(-2px)",
          }}
        >
          Wrapped in Fragrance
        </div>

        {/* Ornamental Divider */}
        <div
          className="flex items-center my-3"
          style={{
            maxWidth: "480px",
            marginTop: "clamp(12px, 1.8vh, 22px)",
            marginBottom: "clamp(12px, 1.8vh, 22px)",
          }}
          aria-hidden="true"
        >
          <div className="flex-1 h-[1px] bg-[#35221A] opacity-60" />
          <div className="mx-2.5 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#35221A" />
            </svg>
          </div>
          <div className="flex-1 h-[1px] bg-[#35221A] opacity-60" />
        </div>

        {/* Supporting Sentence */}
        <p
          className="hero-description m-0"
          style={{
            fontSize: "clamp(18px, 1.55vw, 26px)",
            lineHeight: 1.25,
          }}
        >
          Personalized. Festive. Made for your bond.
        </p>

        {/* 3-Column USP Row */}
        <div
          className="grid grid-cols-3 items-center"
          style={{
            maxWidth: "490px",
            marginTop: "clamp(18px, 2.6vh, 34px)",
            marginBottom: "clamp(22px, 3vh, 40px)",
          }}
        >
          {/* Col 1: Photo & Name Engraving */}
          <div className="flex flex-col items-center text-center px-1.5">
            <div className="h-9 flex items-center justify-center mb-1.5 text-[#2C211C]">
              <svg width="24" height="30" viewBox="0 0 28 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="7" y="2" width="14" height="6" rx="1" />
                <rect x="3" y="8" width="22" height="24" rx="2" />
                <line x1="14" y1="15" x2="14" y2="25" />
                <line x1="9" y1="20" x2="19" y2="20" />
              </svg>
            </div>
            <div
              className="hero-usp"
              style={{ fontSize: "clamp(11px, 0.88vw, 14.5px)", lineHeight: 1.22 }}
            >
              Photo &amp; Name
              <br />
              Engraving
            </div>
          </div>

          {/* Col 2: 35%+ Perfume Oil Concentration */}
          <div className="flex flex-col items-center text-center px-1.5 border-l border-r border-[#382219]/25">
            <div className="h-9 flex items-center justify-center mb-1.5 text-[#2C211C]">
              <svg width="22" height="30" viewBox="0 0 26 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 3C13 3 3 15.5 3 22C3 27.5 7.5 31 13 31C18.5 31 23 27.5 23 22C23 15.5 13 3 13 3Z" />
              </svg>
            </div>
            <div
              className="hero-usp"
              style={{ fontSize: "clamp(11px, 0.88vw, 14.5px)", lineHeight: 1.22 }}
            >
              35%+ Perfume Oil
              <br />
              Concentration
            </div>
          </div>

          {/* Col 3: Express Delivery */}
          <div className="flex flex-col items-center text-center px-1.5">
            <div className="h-9 flex items-center justify-center mb-1.5 text-[#2C211C]">
              <svg width="28" height="30" viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="18" r="11" />
                <polyline points="17 12 17 18 21 20" />
                <line x1="17" y1="3" x2="17" y2="7" />
                <line x1="3" y1="12" x2="7" y2="12" strokeWidth="1.2" />
                <line x1="1" y1="17" x2="6" y2="17" strokeWidth="1.2" />
                <line x1="4" y1="22" x2="8" y2="22" strokeWidth="1.2" />
              </svg>
            </div>
            <div
              className="hero-usp"
              style={{ fontSize: "clamp(11px, 0.88vw, 14.5px)", lineHeight: 1.22 }}
            >
              Express
              <br />
              Delivery
            </div>
          </div>
        </div>

        {/* Dual Action Buttons Row */}
        <div className="flex items-center flex-wrap gap-3.5">
          {/* Primary CTA: SHOP RAKHI GIFTS */}
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-primary"
            style={{
              padding: "0 clamp(18px, 1.6vw, 28px)",
              height: "clamp(46px, 3.6vw, 56px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(12px, 0.95vw, 15px)",
                marginRight: "10px",
                paddingLeft: "2px",
              }}
            >
              SHOP RAKHI GIFTS
            </span>
            <svg width="18" height="10" viewBox="0 0 22 12" fill="none" className="text-[#E7B65B] flex-shrink-0">
              <path d="M1 6H20M15 1L20 6L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Secondary CTA: PRODUCT PERSONALISATION */}
          <button
            type="button"
            onClick={handlePersonalisationClick}
            className="hero-cta-secondary"
            style={{
              padding: "0 clamp(16px, 1.4vw, 24px)",
              height: "clamp(46px, 3.6vw, 56px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(12px, 0.95vw, 15px)",
                marginRight: "8px",
                paddingLeft: "2px",
              }}
            >
              PRODUCT PERSONALISATION
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="flex-shrink-0">
              <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          MOBILE 1:1 REPLICA HERO LAYOUT (< 900px)
          Exact 1:1 Replica matching reference 863 × 1551 px canvas
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-mobile-content relative w-full overflow-hidden select-none"
        style={{
          width: "100%",
          aspectRatio: "863 / 1432",
          backgroundColor: "#F3DFC5",
        }}
      >
        {/* Clean Photographic Still-Life Background */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/mobile-hero-rakhi.webp" type="image/webp" />
          <source srcSet="/images/mobile-hero-rakhi.png" type="image/png" />
          <img
            src="/images/mobile-hero-rakhi.png"
            alt="Sentire by PC Rakhi Luxury Fragrance Gifting Mobile Still Life"
            fetchPriority="high"
            width="863"
            height="1432"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              objectPosition: "center 0px",
            }}
            draggable={false}
          />
        </picture>

        {/* Subtle Top-Left Decorative Line-Art Motif (Opacity 5-8%) */}
        <div
          className="absolute top-0 left-0 pointer-events-none select-none"
          style={{
            width: "35%",
            aspectRatio: "1/1",
            opacity: 0.07,
            zIndex: 3,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#B87919]">
            <circle cx="0" cy="0" r="190" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="165" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="140" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="115" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
            <circle cx="0" cy="0" r="90" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="65" stroke="currentColor" strokeWidth="0.6" />
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 90) / 16;
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 65;
              const y1 = Math.sin(rad) * 65;
              const x2 = Math.cos(rad) * 140;
              const y2 = Math.sin(rad) * 140;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" />;
            })}
          </svg>
        </div>

        {/* ── Mobile Hero Editorial Layer (Absolute Positioning locked to 863x1432) ── */}
        <div className="absolute inset-0 pointer-events-none z-10">
          
          {/* Main Headline: A Pure / Rakhi Gesture */}
          <div
            className="absolute"
            style={{
              left: "6.0%",
              top: "5.10%",
              width: "80%",
            }}
          >
            <div
              role="heading"
              aria-level={1}
              className="hero-title m-0 text-left"
              style={{
                fontSize: "clamp(38px, 10.89vw, 94px)",
                lineHeight: 0.96,
                letterSpacing: "-0.015em",
                color: "#21150F",
                fontWeight: 300,
              }}
            >
              A Pure
              <br />
              Rakhi Gesture
            </div>
          </div>

          {/* Script Subhead: Wrapped in / Fragrance */}
          <div
            className="absolute"
            style={{
              left: "6.0%",
              top: "19.55%",
              width: "80%",
            }}
          >
            <div
              className="hero-script text-left select-none"
              style={{
                fontSize: "clamp(28px, 7.88vw, 68px)",
                lineHeight: 0.92,
                color: "#B87919",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              Wrapped in
              <br />
              Fragrance
            </div>
          </div>

          {/* Decorative Divider: ──────── ✦ ──────── */}
          <div
            className="absolute flex items-center"
            style={{
              left: "6.0%",
              top: "31.84%",
              width: "34.8%",
            }}
            aria-hidden="true"
          >
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-55" />
            <div className="mx-2 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="w-[clamp(6px,1vw,9px)] h-[clamp(6px,1vw,9px)]">
                <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#35221A" />
              </svg>
            </div>
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-55" />
          </div>

          {/* Supporting Message: Personalized. Festive. / Made for your bond. */}
          <div
            className="absolute"
            style={{
              left: "6.0%",
              top: "35.12%",
              width: "70%",
            }}
          >
            <p
              className="hero-description m-0 text-left"
              style={{
                fontSize: "clamp(13px, 3.48vw, 30px)",
                lineHeight: 1.28,
                color: "#2E1E16",
                fontWeight: 400,
              }}
            >
              Personalized. Festive.
              <br />
              Made for your bond.
            </p>
          </div>

          {/* Dual Action CTA Buttons (Properly placed in left column with clear bottle margin) */}
          <div
            className="absolute flex flex-col justify-start pointer-events-auto"
            style={{
              left: "6.0%",
              top: "43.50%",
              width: "min(280px, 47%)",
              gap: "10px",
            }}
          >
            {/* Primary CTA Button: SHOP RAKHI GIFTS ⟶ */}
            <a
              href="#perfumes"
              onClick={handleCtaClick}
              className="hero-cta-primary w-full flex items-center justify-center rounded-none shadow-md"
              style={{
                height: "44px",
                backgroundColor: "#211008",
                backgroundImage: "linear-gradient(180deg, #28150E 0%, #1D0E07 100%)",
                border: "1.5px solid #B88638",
                boxShadow: "0 4px 18px rgba(33, 16, 8, 0.3)",
                padding: "0 10px",
                textDecoration: "none",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#E7B65B",
                  textTransform: "uppercase",
                  marginRight: "6px",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                SHOP RAKHI GIFTS
              </span>
              <svg
                width="13"
                height="9"
                viewBox="0 0 24 12"
                fill="none"
                stroke="#E7B65B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "13px", height: "9px", minWidth: "13px", maxWidth: "13px", flexShrink: 0 }}
              >
                <line x1="1" y1="6" x2="22" y2="6" />
                <polyline points="16 1 22 6 16 11" />
              </svg>
            </a>

            {/* Secondary CTA Button: PRODUCT PERSONALISATION ✎ */}
            <button
              type="button"
              onClick={handlePersonalisationClick}
              className="hero-cta-secondary w-full flex items-center justify-center rounded-none cursor-pointer shadow-sm"
              style={{
                height: "44px",
                backgroundColor: "rgba(246, 228, 208, 0.94)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1.5px solid #9E8066",
                boxShadow: "0 4px 14px rgba(33, 16, 8, 0.08)",
                padding: "0 8px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#21150F",
                  textTransform: "uppercase",
                  marginRight: "5px",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                PRODUCT PERSONALISATION
              </span>
              {/* Elegant Edit / Laser Pen Icon */}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#21150F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "11px", height: "11px", minWidth: "11px", maxWidth: "11px", flexShrink: 0 }}
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

