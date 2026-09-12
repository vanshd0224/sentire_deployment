import React, { useEffect, useRef } from "react";
import type { PageName } from "../types/appTypes";

interface HeroProps {
  onNavigate?: (page: PageName, filters?: any) => void;
  onOpenCart?: () => void;
  onOpenAccount?: () => void;
  onToggleSearch?: () => void;
  cartCount?: number;
}

export default function Hero({
  onNavigate,
  onOpenCart,
  onOpenAccount,
  onToggleSearch,
  cartCount = 0,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLImageElement>(".hero-bg-img");
    if (!el) return;
    const t = setTimeout(() => {
      el.style.opacity = "1";
    }, 40);
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

  const scrollToNextSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextEl = document.getElementById("perfumes") || document.querySelector("main > section:nth-of-type(2)");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Sentire by PC Ganesh Chaturthi Luxury Fragrance Collection"
      className="hero-section relative w-full overflow-hidden select-none bg-[#FAF7F7]"
      style={{
        WebkitFontSmoothing: "antialiased",
        textRendering: "geometricPrecision",
      }}
    >
      <style>{`
        /* ── Scoped Typography & Keyframe Animations ── */
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .font-cormorant {
          font-family: "Cormorant Garamond", Georgia, serif !important;
        }
        .font-montserrat {
          font-family: "Montserrat", -apple-system, sans-serif !important;
        }

        .hero-ganesh-title {
          font-family: "Cormorant Garamond", Georgia, serif !important;
          font-weight: 400 !important;
          color: #32113F !important;
          letter-spacing: -1.2px !important;
          text-shadow: 0 1px 2px rgba(50, 17, 63, 0.06);
        }

        .hero-eyebrow-text {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          color: #966127 !important;
          letter-spacing: 3.4px !important;
          text-indent: 3.4px;
        }

        .hero-happy-text {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 400 !important;
          color: #BA8844 !important;
          letter-spacing: 28px !important;
          text-indent: 28px;
        }

        .hero-subhead-text {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          color: #32113F !important;
          letter-spacing: 7.5px !important;
          text-indent: 7.5px;
        }

        .hero-body-text {
          font-family: "Montserrat", sans-serif !important;
          font-weight: 400 !important;
          color: #49414A !important;
          line-height: 1.55 !important;
          letter-spacing: 0.2px !important;
        }

        /* Primary Explore CTA Button */
        .hero-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #552060 0%, #32103D 100%);
          color: #FFFFFF;
          border-radius: 4px;
          border: none;
          box-shadow: 0 4px 18px rgba(50, 16, 61, 0.28);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-btn:hover {
          filter: brightness(1.08);
          box-shadow: 0 8px 24px rgba(50, 16, 61, 0.38);
          transform: translateY(-1.5px);
        }

        /* Secondary Discovery CTA Button */
        .hero-discovery-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid #B9863E;
          border-radius: 4px;
          box-shadow: 0 3px 14px rgba(185, 134, 62, 0.16);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-discovery-btn:hover {
          background: #32113F;
          border-color: #32113F;
          box-shadow: 0 6px 20px rgba(50, 17, 63, 0.25);
          transform: translateY(-1.5px);
        }
        .hero-discovery-btn:hover span {
          color: #F7D488 !important;
        }
        .hero-discovery-btn:hover svg {
          stroke: #F7D488 !important;
        }

        /* Nav link hover */
        .hero-nav-link {
          position: relative;
          font-family: "Montserrat", sans-serif !important;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.4px;
          color: #161217;
          text-decoration: none;
          transition: color 0.22s ease;
          white-space: nowrap;
        }
        .hero-nav-link:hover {
          color: #B9863E;
        }

        .hero-icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #161217;
          transition: transform 0.2s ease, color 0.2s ease;
          padding: 0;
        }
        .hero-icon-btn:hover {
          color: #B9863E;
          transform: scale(1.08);
        }

        /* Responsive Breakpoints */
        @media (max-width: 767px) {
          .hero-section {
            height: auto !important;
            min-height: 0 !important;
          }
          .hero-desktop-view {
            display: none !important;
          }
          .hero-tablet-view {
            display: none !important;
          }
          .hero-mobile-view {
            display: block !important;
          }
          .mobile-hero-tagline {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 500 !important;
            color: #B47833 !important;
            letter-spacing: clamp(1.4px, 0.4vw, 2.2px) !important;
            text-indent: clamp(1.4px, 0.4vw, 2.2px);
            font-size: clamp(8.5px, 2.2vw, 10.5px) !important;
          }
          .mobile-hero-happy {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 500 !important;
            color: #B88241 !important;
            letter-spacing: clamp(10px, 2.9vw, 15px) !important;
            text-indent: clamp(10px, 2.9vw, 15px);
            font-size: clamp(18px, 5.2vw, 25px) !important;
          }
          .mobile-hero-title {
            font-family: "Cormorant Garamond", Georgia, serif !important;
            font-weight: 500 !important;
            color: #30103D !important;
            letter-spacing: -0.012em !important;
            line-height: 0.94 !important;
            font-size: clamp(37px, 10.4vw, 54px) !important;
          }
          .mobile-hero-subhead {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 600 !important;
            color: #30103D !important;
            letter-spacing: clamp(2.2px, 0.7vw, 3.4px) !important;
            text-indent: clamp(2.2px, 0.7vw, 3.4px);
            font-size: clamp(10px, 2.5vw, 13px) !important;
          }
          .mobile-hero-desc {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 400 !important;
            color: #4D4A4F !important;
            line-height: 1.4 !important;
            font-size: clamp(10px, 2.4vw, 12px) !important;
          }
          .mobile-hero-feature-label {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 500 !important;
            color: #30103D !important;
            line-height: 1.2 !important;
            letter-spacing: 0.35px !important;
            font-size: clamp(7.5px, 2vw, 9.2px) !important;
          }
          .mobile-hero-cta-text {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 500 !important;
            color: #FFFFFF !important;
            letter-spacing: 0.5px !important;
            font-size: clamp(11.5px, 2.8vw, 13px) !important;
          }
          .mobile-trust-text {
            font-family: "Montserrat", sans-serif !important;
            font-weight: 500 !important;
            color: #30103D !important;
            line-height: 1.2 !important;
            letter-spacing: 0.2px !important;
            font-size: clamp(7.5px, 1.9vw, 9px) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 900px) {
          .hero-section {
            height: auto !important;
            min-height: 0 !important;
          }
          .hero-desktop-view {
            display: none !important;
          }
          .hero-tablet-view {
            display: block !important;
          }
          .hero-mobile-view {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .hero-section {
            height: calc(100vh - 115px) !important;
            min-height: 560px !important;
            max-height: 850px !important;
          }
          .hero-desktop-view {
            display: block !important;
            height: 100% !important;
          }
          .hero-tablet-view {
            display: none !important;
          }
          .hero-mobile-view {
            display: none !important;
          }
        }
        @media (min-width: 1718px) {
          .hero-section {
            height: calc(100vh - 125px) !important;
            min-height: 700px !important;
            max-height: 920px !important;
          }
        }
      `}</style>

      {/* ═════════════════════════════════════════════════════════════════
          DESKTOP HERO (≥ 901px) — Exact 1:1 match to reference 1717 × 916 px
          ═════════════════════════════════════════════════════════════════ */}
      <div className="hero-desktop-view relative w-full h-full overflow-hidden">
        {/* Absolutely Positioned Clean Photographic Background */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/hero-ganesh-desktop.webp" type="image/webp" />
          <source srcSet="/images/hero-ganesh-desktop.png" type="image/png" />
          <img
            src="/images/hero-ganesh-desktop.png"
            alt="Sentire By PC Ganesh Chaturthi Luxury Perfume"
            fetchPriority="high"
            decoding="async"
            width="1695"
            height="928"
            className="hero-bg-img absolute inset-0 w-full h-full select-none pointer-events-none"
            style={{
              objectFit: "cover",
              objectPosition: "center -5px",
              transition: "opacity 0.5s ease-out",
            }}
            draggable={false}
          />
        </picture>



        {/* ── LEFT HERO EDITORIAL CONTENT BLOCK ── */}
        <div
          className="absolute z-20 flex flex-col items-center text-center"
          style={{
            left: "clamp(32px, 5.5vw, 95px)",
            top: "clamp(12px, 2.2vh, 26px)",
            width: "min(676px, 48vw)",
          }}
        >
          {/* 1. Eyebrow: NEW BEGINNINGS. DIVINE BLESSINGS. */}
          <div
            className="hero-eyebrow-text uppercase text-[12.5px] leading-none"
            style={{ transform: "translateX(-15px)" }}
          >
            NEW BEGINNINGS. DIVINE BLESSINGS.
          </div>

          {/* Ornamental Lotus Divider */}
          <div
            className="flex items-center justify-center select-none pointer-events-none"
            style={{
              marginTop: "8px",
              transform: "translateX(-16px)",
              width: "220px",
              height: "18px",
            }}
            aria-hidden="true"
          >
            <img
              src="/images/ganesh/eyebrow_ornament.png"
              alt=""
              width="250"
              height="20"
              className="w-[220px] h-auto object-contain"
            />
          </div>

          {/* 2. HAPPY Text */}
          <div
            className="hero-happy-text uppercase leading-none"
            style={{
              marginTop: "2px",
              transform: "translateX(-12px)",
              fontSize: "clamp(32px, 2.7vw, 42px)",
              letterSpacing: "18px",
              textIndent: "18px",
            }}
          >
            HAPPY
          </div>

          {/* 3. Main Headline: Ganesh Chaturthi */}
          <h1
            className="hero-ganesh-title m-0 whitespace-nowrap leading-[0.88]"
            style={{
              marginTop: "6px",
              fontSize: "clamp(62px, 5.8vw, 90px)",
            }}
          >
            Ganesh Chaturthi
          </h1>

          {/* 4. Gold Divider with Ampersand Medallion */}
          <div
            className="relative flex items-center justify-center select-none"
            style={{
              marginTop: "6px",
              width: "min(620px, 95%)",
              height: "26px",
              marginLeft: "3px",
            }}
            aria-hidden="true"
          >
            {/* Horizontal Line Left */}
            <div className="flex-1 flex items-center">
              <span className="w-[4.5px] h-[4.5px] rounded-full bg-[#B9863E] shrink-0" />
              <div className="flex-1 h-[1.2px] bg-[#B9863E]" />
            </div>

            {/* Center Circular Medallion */}
            <div
              className="mx-[10px] flex items-center justify-center rounded-full bg-[#B9863E] shadow-[0_1px_4px_rgba(185,134,62,0.3)] shrink-0"
              style={{
                width: "26px",
                height: "26px",
              }}
            >
              <span
                className="font-cormorant text-white font-normal text-[18px] leading-none select-none"
                style={{
                  marginTop: "-2px",
                  marginLeft: "-0.5px",
                }}
              >
                &amp;
              </span>
            </div>

            {/* Horizontal Line Right */}
            <div className="flex-1 flex items-center">
              <div className="flex-1 h-[1.2px] bg-[#B9863E]" />
              <span className="w-[4.5px] h-[4.5px] rounded-full bg-[#B9863E] shrink-0" />
            </div>
          </div>

          {/* 5. Subhead: WELCOME TO OUR NEW BEGINNING */}
          <div
            className="hero-subhead-text uppercase whitespace-nowrap leading-none"
            style={{
              marginTop: "6px",
              fontSize: "clamp(13px, 1.15vw, 17px)",
              letterSpacing: "4px",
              textIndent: "4px",
            }}
          >
            WELCOME TO OUR NEW BEGINNING
          </div>

          {/* 6. Description Copy */}
          <p
            className="hero-body-text text-center m-0"
            style={{
              marginTop: "8px",
              fontSize: "clamp(12px, 0.95vw, 15px)",
              lineHeight: "1.45",
              maxWidth: "440px",
            }}
          >
            As we celebrate wisdom and prosperity, we begin a
            <br />
            new journey of crafting emotions through fragrances.
          </p>

          {/* 7. Three Benefit Items with Thin Vertical Separators */}
          <div
            className="flex items-center justify-between select-none"
            style={{
              marginTop: "12px",
              width: "min(460px, 90%)",
              height: "64px",
            }}
          >
            {/* Benefit 1: Divine Blessings (Ganesh) */}
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <div className="h-[30px] flex items-center justify-center mb-[3px]">
                <img
                  src="/images/ganesh/benefit_ganesh.png"
                  alt="Divine Blessings"
                  width="64"
                  height="74"
                  className="h-[26px] w-auto object-contain"
                />
              </div>
              <span
                className="font-montserrat font-medium text-[10.5px] leading-[1.25] tracking-[0.35px] text-[#31183A] uppercase"
              >
                DIVINE
                <br />
                BLESSINGS
              </span>
            </div>

            {/* Vertical Separator 1 */}
            <div
              className="w-[1px] h-[48px] shrink-0"
              style={{ background: "rgba(185, 134, 62, 0.35)" }}
              aria-hidden="true"
            />

            {/* Benefit 2: New Beginnings New Essences (Lotus) */}
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <div className="h-[30px] flex items-center justify-center mb-[3px]">
                <img
                  src="/images/ganesh/benefit_lotus.png"
                  alt="New Beginnings New Essences"
                  width="74"
                  height="68"
                  className="h-[23px] w-auto object-contain"
                />
              </div>
              <span
                className="font-montserrat font-medium text-[10.5px] leading-[1.25] tracking-[0.35px] text-[#31183A] uppercase"
              >
                NEW BEGINNINGS
                <br />
                NEW ESSENCES
              </span>
            </div>

            {/* Vertical Separator 2 */}
            <div
              className="w-[1px] h-[48px] shrink-0"
              style={{ background: "rgba(185, 134, 62, 0.35)" }}
              aria-hidden="true"
            />

            {/* Benefit 3: Crafted With Passion (Perfume) */}
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <div className="h-[30px] flex items-center justify-center mb-[3px]">
                <img
                  src="/images/ganesh/benefit_perfume.png"
                  alt="Crafted With Passion"
                  width="54"
                  height="68"
                  className="h-[25px] w-auto object-contain"
                />
              </div>
              <span
                className="font-montserrat font-medium text-[10.5px] leading-[1.25] tracking-[0.35px] text-[#31183A] uppercase"
              >
                CRAFTED
                <br />
                WITH PASSION
              </span>
            </div>
          </div>

          {/* 8. Primary CTA Button: EXPLORE OUR FRAGRANCES → */}
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-btn"
            style={{
              marginTop: "14px",
              width: "min(390px, 86%)",
              height: "42px",
            }}
          >
            <span
              className="font-montserrat font-medium text-[14.5px] tracking-[0.5px] text-white mr-[10px]"
            >
              EXPLORE OUR FRAGRANCES
            </span>
            <svg
              width="17"
              height="11"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#E0B368"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>

          {/* 9. Secondary CTA Button: DISCOVERY SET • ₹549 */}
          <a
            href="/discovery-set"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("discovery-set");
            }}
            className="hero-discovery-btn"
            style={{
              marginTop: "8px",
              width: "min(390px, 86%)",
              height: "38px",
            }}
          >
            <span
              className="font-montserrat font-semibold text-[13.5px] tracking-[0.5px] text-[#32113F] mr-[8px]"
            >
              DISCOVERY SET • ₹549
            </span>
            <svg
              width="15"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#B9863E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════════
          TABLET HERO (768px – 900px) — Preserved Tablet Layout
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-tablet-view relative w-full overflow-hidden select-none bg-[#FAF7F7]"
        style={{
          aspectRatio: "941 / 1672",
        }}
      >
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/hero-ganesh-mobile.webp" type="image/webp" />
          <source srcSet="/images/hero-ganesh-mobile.png" type="image/png" />
          <img
            src="/images/hero-ganesh-mobile.png"
            alt="Sentire By PC Ganesh Chaturthi Luxury Perfume"
            fetchPriority="high"
            decoding="async"
            width="941"
            height="1672"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              objectPosition: "center 0px",
            }}
            draggable={false}
          />
        </picture>

        {/* Tablet Content */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center text-center px-6"
          style={{ paddingTop: "24px" }}
        >
          <div
            className="hero-eyebrow-text uppercase text-center"
            style={{
              fontSize: "clamp(10px, 2.5vw, 14px)",
              letterSpacing: "1.8px",
              marginBottom: "4px",
            }}
          >
            NEW BEGINNINGS. DIVINE BLESSINGS.
          </div>

          <div className="w-[200px] h-[20px] mb-2 flex items-center justify-center">
            <img
              src="/images/ganesh/eyebrow_ornament.png"
              alt=""
              width="280"
              height="34"
              className="w-full h-auto object-contain"
            />
          </div>

          <div
            className="hero-happy-text uppercase leading-none text-center"
            style={{
              fontSize: "clamp(26px, 6vw, 40px)",
              letterSpacing: "10px",
              textIndent: "10px",
              marginBottom: "4px",
            }}
          >
            HAPPY
          </div>

          <h1
            className="hero-ganesh-title m-0 text-center"
            style={{
              fontSize: "clamp(40px, 9vw, 64px)",
              lineHeight: 0.95,
              marginBottom: "8px",
            }}
          >
            Ganesh Chaturthi
          </h1>

          <div className="flex items-center justify-center w-[85%] max-w-[380px] my-2" aria-hidden="true">
            <div className="flex-1 h-[1px] bg-[#B9863E]" />
            <div
              className="mx-2 flex items-center justify-center rounded-full bg-[#B9863E] shrink-0"
              style={{ width: "22px", height: "22px" }}
            >
              <span className="font-cormorant text-white text-[14px] leading-none">&amp;</span>
            </div>
            <div className="flex-1 h-[1px] bg-[#B9863E]" />
          </div>

          <div
            className="hero-subhead-text uppercase text-center"
            style={{
              fontSize: "clamp(11px, 2.7vw, 16px)",
              letterSpacing: "3.5px",
              textIndent: "3.5px",
              marginBottom: "8px",
            }}
          >
            WELCOME TO OUR NEW BEGINNING
          </div>

          <p
            className="hero-body-text text-center m-0 px-4"
            style={{
              fontSize: "clamp(12px, 2.8vw, 15.5px)",
              lineHeight: 1.5,
              maxWidth: "380px",
              marginBottom: "16px",
            }}
          >
            As we celebrate wisdom and prosperity, we begin a new journey of crafting emotions through fragrances.
          </p>

          <div
            className="flex items-center justify-between w-[92%] max-w-[380px] mb-4 py-2 px-3 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.65)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(185, 134, 62, 0.3)",
              boxShadow: "0 2px 12px rgba(50, 17, 63, 0.06)",
            }}
          >
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <img
                src="/images/ganesh/benefit_ganesh.png"
                alt="Divine Blessings"
                className="h-[30px] w-auto object-contain mb-1"
              />
              <span className="font-montserrat font-medium text-[9.5px] leading-[1.25] text-[#31183A] uppercase">
                DIVINE<br />BLESSINGS
              </span>
            </div>
            <div className="w-[1px] h-[40px] bg-[#B9863E]/40" />
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <img
                src="/images/ganesh/benefit_lotus.png"
                alt="New Beginnings"
                className="h-[28px] w-auto object-contain mb-1"
              />
              <span className="font-montserrat font-medium text-[9.5px] leading-[1.25] text-[#31183A] uppercase">
                NEW BEGINNINGS<br />NEW ESSENCES
              </span>
            </div>
            <div className="w-[1px] h-[40px] bg-[#B9863E]/40" />
            <div className="flex-1 flex flex-col items-center text-center px-1">
              <img
                src="/images/ganesh/benefit_perfume.png"
                alt="Crafted With Passion"
                className="h-[30px] w-auto object-contain mb-1"
              />
              <span className="font-montserrat font-medium text-[9.5px] leading-[1.25] text-[#31183A] uppercase">
                CRAFTED<br />WITH PASSION
              </span>
            </div>
          </div>

          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-btn w-[80%] max-w-[320px] py-2 px-4 mb-2"
            style={{ height: "42px" }}
          >
            <span className="font-montserrat font-medium text-[13.5px] tracking-[0.4px] text-white mr-2">
              EXPLORE OUR FRAGRANCES
            </span>
            <svg width="16" height="10" viewBox="0 0 20 12" fill="none" stroke="#E0B368" strokeWidth="1.8">
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>

          <a
            href="/discovery-set"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("discovery-set");
            }}
            className="hero-discovery-btn w-[80%] max-w-[320px] py-2 px-4"
            style={{ height: "40px" }}
          >
            <span className="font-montserrat font-semibold text-[13px] tracking-[0.4px] text-[#32113F] mr-2">
              DISCOVERY SET • ₹549
            </span>
            <svg width="15" height="10" viewBox="0 0 20 12" fill="none" stroke="#B9863E" strokeWidth="1.8">
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          MOBILE HERO (≤ 767px) — 1:1 Match to Ganesh Chaturthi Reference
          ═════════════════════════════════════════════════════════════════ */}
      <div className="hero-mobile-view relative w-full overflow-hidden select-none bg-[#FAF3F5]">
        {/* Atmosphere: Corner Lilac Flowers */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10" aria-hidden="true">
          <img
            src="/images/ganesh/corner-flower-left.png"
            alt=""
            width="360"
            height="320"
            className="absolute top-0 left-0 w-[125px] sm:w-[155px] h-auto object-contain pointer-events-none select-none opacity-85"
            draggable={false}
          />
          <img
            src="/images/ganesh/corner-flower-right.png"
            alt=""
            width="360"
            height="320"
            className="absolute top-0 right-0 w-[125px] sm:w-[155px] h-auto object-contain pointer-events-none select-none opacity-85"
            draggable={false}
          />
        </div>

        {/* ── Mobile Hero Editorial Content Layer (Sequential Order matching Ref 1) ── */}
        <div className="relative z-20 flex flex-col items-center text-center px-4 pt-2.5 sm:pt-3">
          {/* 1. Tagline: NEW BEGINNINGS. DIVINE BLESSINGS. */}
          <div className="mobile-hero-tagline uppercase text-center mb-0.5">
            NEW BEGINNINGS. DIVINE BLESSINGS.
          </div>

          {/* 2. Ornamental Lotus Divider */}
          <div
            className="w-[36%] max-w-[160px] h-[11px] sm:h-[14px] mb-0.5 flex items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <img
              src="/images/ganesh/eyebrow_ornament.png"
              alt=""
              width="280"
              height="34"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* 3. HAPPY */}
          <div className="mobile-hero-happy uppercase leading-none text-center mb-0">
            HAPPY
          </div>

          {/* 4. Ganesh Chaturthi Title */}
          <h1 className="mobile-hero-title text-center m-0 mb-0.5">
            Ganesh Chaturthi
          </h1>

          {/* 5. Gold Divider with & Medallion */}
          <div
            className="w-[80%] max-w-[330px] h-[12px] sm:h-[14px] mb-0.5 flex items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <img
              src="/images/ganesh/divider_ampersand.png"
              alt=""
              width="622"
              height="35"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* 6. Welcome Heading */}
          <div className="mobile-hero-subhead uppercase text-center mb-0.5">
            WELCOME TO OUR NEW BEGINNING
          </div>

          {/* 7. Description Body */}
          <p className="mobile-hero-desc text-center m-0 max-w-[340px] mb-1.5 px-2">
            As we celebrate wisdom and prosperity, we begin a
            <br className="hidden min-[360px]:inline" /> new journey of crafting
            emotions through fragrances.
          </p>

          {/* 8. 3 Feature Icons Row (Equal Columns with Vertical Dividers) */}
          <div className="flex items-center justify-between w-[86%] max-w-[315px] mb-2 py-0">
            {/* Column 1: Divine Blessings */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-[22px] flex items-center justify-center mb-0.5">
                <img
                  src="/images/ganesh/benefit_ganesh.png"
                  alt="Divine Blessings"
                  width="64"
                  height="74"
                  className="h-[20px] sm:h-[23px] w-auto object-contain"
                />
              </div>
              <span className="mobile-hero-feature-label uppercase">
                DIVINE<br />BLESSINGS
              </span>
            </div>

            {/* Vertical Separator 1 */}
            <div className="w-[1px] h-[30px] bg-[#B9863E]/35 shrink-0" aria-hidden="true" />

            {/* Column 2: New Beginnings */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-[22px] flex items-center justify-center mb-0.5">
                <img
                  src="/images/ganesh/benefit_lotus.png"
                  alt="New Beginnings"
                  width="74"
                  height="68"
                  className="h-[19px] sm:h-[22px] w-auto object-contain"
                />
              </div>
              <span className="mobile-hero-feature-label uppercase">
                NEW BEGINNINGS<br />NEW ESSENCES
              </span>
            </div>

            {/* Vertical Separator 2 */}
            <div className="w-[1px] h-[30px] bg-[#B9863E]/35 shrink-0" aria-hidden="true" />

            {/* Column 3: Crafted With Passion */}
            <div className="flex-1 flex flex-col items-center text-center px-0.5">
              <div className="h-[22px] flex items-center justify-center mb-0.5">
                <img
                  src="/images/ganesh/benefit_perfume.png"
                  alt="Crafted With Passion"
                  width="54"
                  height="68"
                  className="h-[20px] sm:h-[23px] w-auto object-contain"
                />
              </div>
              <span className="mobile-hero-feature-label uppercase">
                CRAFTED<br />WITH PASSION
              </span>
            </div>
          </div>

          {/* 9. Primary CTA Button: EXPLORE OUR FRAGRANCES → */}
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-btn flex items-center justify-center pointer-events-auto transition-all duration-200 active:scale-[0.98]"
            style={{
              width: "clamp(205px, 58%, 250px)",
              height: "38px",
              minHeight: "38px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #44174F 0%, #2D0E35 100%)",
              boxShadow: "0 4px 18px rgba(45, 14, 53, 0.30)",
              textDecoration: "none",
              marginBottom: "6px",
            }}
          >
            <span className="mobile-hero-cta-text uppercase mr-2 text-[11.5px] sm:text-[12.5px]">
              EXPLORE OUR FRAGRANCES
            </span>
            <svg
              width="14"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#E0B368"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>

          {/* 10. Secondary CTA Button: DISCOVERY SET • ₹549 */}
          <a
            href="/discovery-set"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.("discovery-set");
            }}
            className="hero-discovery-btn flex items-center justify-center pointer-events-auto transition-all duration-200 active:scale-[0.98]"
            style={{
              width: "clamp(205px, 58%, 250px)",
              height: "36px",
              minHeight: "36px",
              borderRadius: "6px",
              marginBottom: "4px",
            }}
          >
            <span className="font-montserrat font-semibold text-[11px] sm:text-[12px] tracking-[0.4px] text-[#32113F] mr-2">
              DISCOVERY SET • ₹549
            </span>
            <svg
              width="13"
              height="9"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#B9863E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>
        </div>

        {/* ── 10. Main Hero Product Visual (Pulls up directly behind CTA & 3 Icons) ── */}
        <div
          className="relative w-full overflow-hidden select-none"
          style={{
            marginTop: "clamp(-106px, -27vw, -78px)",
          }}
        >
          {/* Seamless gradient blend between upper background and artwork */}
          <div
            className="absolute top-0 left-0 right-0 h-[50px] z-10 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, #FAF3F5 0%, rgba(250, 243, 245, 0.8) 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <picture className="w-full block select-none pointer-events-none">
            <source srcSet="/images/ganesh/ganesh-hero-mobile-artwork.webp" type="image/webp" />
            <source srcSet="/images/ganesh/ganesh-hero-mobile-artwork.png" type="image/png" />
            <img
              src="/images/ganesh/ganesh-hero-mobile-artwork.png"
              alt="Sentire By PC Ganesh Chaturthi Luxury Perfume"
              fetchPriority="high"
              decoding="async"
              width="941"
              height="1295"
              className="w-full h-auto object-contain block select-none pointer-events-none"
              draggable={false}
            />
          </picture>

        </div>
      </div>
    </section>
  );
}
