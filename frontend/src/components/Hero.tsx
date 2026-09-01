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
           TYPOGRAPHY SYSTEM (Cormorant Garamond + Montserrat / Inter)
           ═════════════════════════════════════════════════════════════════ */
        .hero-janmashtami-title {
          font-family: "Cormorant Garamond", Georgia, serif !important;
          font-weight: 500 !important;
          font-style: normal !important;
          color: #24133F !important;
          line-height: 1.02 !important;
          letter-spacing: -0.015em !important;
          text-shadow: 0 1px 2px rgba(36, 19, 63, 0.04);
        }

        .hero-janmashtami-kicker {
          font-family: "Montserrat", -apple-system, sans-serif !important;
          font-weight: 500 !important;
          color: #38241D !important;
          letter-spacing: 0.035em !important;
        }

        .hero-janmashtami-body {
          font-family: "Inter", "Montserrat", -apple-system, sans-serif !important;
          font-weight: 400 !important;
          color: #1F1535 !important;
          line-height: 1.62 !important;
          letter-spacing: -0.005em !important;
        }

        .hero-janmashtami-badge {
          font-family: "Montserrat", "Inter", -apple-system, sans-serif !important;
          font-style: normal !important;
          font-weight: 500 !important;
          color: #945722 !important;
          letter-spacing: 0.015em !important;
        }

        /* Primary Button: Shop Now ➔ */
        .hero-cta-shop-now {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #251642;
          background-image: linear-gradient(180deg, #2D1A4D 0%, #201239 100%);
          color: #F8EEE7;
          border: 1px solid rgba(200, 148, 57, 0.4);
          border-radius: 10px;
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.04em;
          box-shadow: 0 6px 22px rgba(37, 22, 66, 0.28);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-shop-now:hover {
          background-color: #1c0e33;
          border-color: #C89439;
          box-shadow: 0 10px 30px rgba(37, 22, 66, 0.38);
          transform: translateY(-1.5px);
        }

        /* Secondary Button: Explore Collection ➔ */
        .hero-cta-explore {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 249, 244, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #251642;
          border: 1.5px solid #C89439;
          border-radius: 10px;
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.03em;
          box-shadow: 0 4px 16px rgba(37, 22, 66, 0.06);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-explore:hover {
          background: rgba(255, 255, 255, 0.9);
          border-color: #A87624;
          box-shadow: 0 8px 24px rgba(200, 148, 57, 0.22);
          transform: translateY(-1.5px);
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
            height: 100vh !important;
            min-height: 720px !important;
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
          FULL-BLEED PHOTOGRAPHIC JANMASHTAMI HERO BACKGROUND (DESKTOP)
          ═════════════════════════════════════════════════════════════════ */}
      <picture className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none">
        <source srcSet="/images/hero-krishna-desktop.webp" type="image/webp" />
        <source srcSet="/images/hero-krishna-desktop.png" type="image/png" />
        <img
          src="/images/hero-krishna-desktop.png"
          alt="SENTIRE By PC Janmashtami Luxury Perfume Collection"
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

      {/* ═════════════════════════════════════════════════════════════════
          DESKTOP JANMASHTAMI EDITORIAL CONTENT LAYER (51-54% Left Content)
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-desktop-content absolute inset-0 flex flex-col justify-center"
        style={{
          paddingLeft: "clamp(48px, 10.2vw, 195px)",
          paddingTop: "clamp(90px, 13vh, 140px)",
          paddingBottom: "clamp(30px, 4vh, 60px)",
          paddingRight: "46%", // Preserves right photographic focus on the perfume bottle
          zIndex: 6,
        }}
      >
        {/* Kicker Eyebrow: Feather Motif + Celebrate Janmashtami in Fragrance */}
        <div className="flex items-center gap-3 mb-2.5 sm:mb-3 select-none">
          <img
            src="/images/janmashtami/kicker-feather.png"
            alt=""
            aria-hidden="true"
            className="h-[28px] sm:h-[34px] w-auto object-contain drop-shadow-[0_1px_3px_rgba(200,148,57,0.25)]"
          />
          <span
            className="hero-janmashtami-kicker"
            style={{
              fontSize: "clamp(13px, 1.05vw, 17px)",
              color: "#352219",
              lineHeight: 1.2,
            }}
          >
            Celebrate Janmashtami in Fragrance
          </span>
        </div>

        {/* Main Headline: A Divine Scent / for Janmashtami */}
        <h1
          className="hero-janmashtami-title m-0"
          style={{
            fontSize: "clamp(54px, 5.3vw, 104px)",
            lineHeight: 0.98,
            marginBottom: "clamp(14px, 2vh, 24px)",
            letterSpacing: "-0.015em",
          }}
        >
          A Divine Scent
          <br />
          for Janmashtami
        </h1>

        {/* Horizontal Gold Ornamental Divider with Central Motif */}
        <div
          className="flex items-center"
          style={{
            maxWidth: "520px",
            width: "100%",
            marginTop: "clamp(4px, 0.8vh, 10px)",
            marginBottom: "clamp(16px, 2.4vh, 28px)",
          }}
          aria-hidden="true"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C89439]/10 via-[#C89439]/60 to-[#C89439]" />
          <div className="mx-3 flex items-center justify-center shrink-0">
            <img
              src="/images/janmashtami/ornament-divider-flower.png"
              alt=""
              aria-hidden="true"
              className="h-[15px] sm:h-[18px] w-auto object-contain"
            />
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C89439] via-[#C89439]/60 to-[#C89439]/10" />
        </div>

        {/* Body Paragraph */}
        <p
          className="hero-janmashtami-body m-0"
          style={{
            fontSize: "clamp(15px, 1.15vw, 19px)",
            lineHeight: 1.62,
            maxWidth: "530px",
            color: "#211638",
            marginBottom: "clamp(18px, 2.6vh, 32px)",
          }}
        >
          Immerse your senses in the soft elegance of Sentire by PC, inspired by devotion, beauty, and timeless celebration.
        </p>

        {/* Limited Festive Edition Badge (Gold Flute Icon + Accent) */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8 select-none">
          <img
            src="/images/janmashtami/flute-badge.png"
            alt=""
            aria-hidden="true"
            className="h-[24px] sm:h-[28px] w-auto object-contain drop-shadow-[0_1px_3px_rgba(200,148,57,0.3)]"
          />
          <span
            className="hero-janmashtami-badge"
            style={{
              fontSize: "clamp(14px, 1.05vw, 17px)",
              color: "#8C5F22",
            }}
          >
            Limited Festive Edition
          </span>
        </div>

        {/* Dual Call-to-Action Buttons Row */}
        <div className="flex items-center gap-4 sm:gap-5 flex-wrap">
          {/* Button 1: Shop Now ➔ */}
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-shop-now"
            style={{
              padding: "0 clamp(28px, 2.4vw, 42px)",
              height: "clamp(48px, 3.6vw, 56px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(13.5px, 1.02vw, 16px)",
                marginRight: "14px",
                color: "#FFF9F4",
                fontWeight: 500,
              }}
            >
              Shop Now
            </span>
            <svg
              width="19"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#D0A24B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>

          {/* Button 2: Explore Collection ➔ */}
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-explore"
            style={{
              padding: "0 clamp(24px, 2.2vw, 38px)",
              height: "clamp(48px, 3.6vw, 56px)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(13.5px, 1.02vw, 16px)",
                marginRight: "14px",
                color: "#251642",
                fontWeight: 500,
              }}
            >
              Explore Collection
            </span>
            <svg
              width="19"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              stroke="#A87624"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            >
              <line x1="1" y1="6" x2="19" y2="6" />
              <polyline points="13 1 19 6 13 11" />
            </svg>
          </a>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          MOBILE 1:1 REPLICA HERO LAYOUT (< 900px)
          Exact 1:1 Replica matching reference 941 × 1506 px canvas
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-mobile-content relative w-full overflow-hidden select-none"
        style={{
          width: "100%",
          aspectRatio: "941 / 1506",
          backgroundColor: "#F2DCD9",
        }}
      >
        {/* Clean Photographic Still-Life Background Plate */}
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/mobile-hero-krishna.webp" type="image/webp" />
          <source srcSet="/images/mobile-hero-krishna.png" type="image/png" />
          <img
            src="/images/mobile-hero-krishna.png"
            alt="SENTIRE By PC Janmashtami Luxury Fragrance Mobile Collection"
            fetchPriority="high"
            width="941"
            height="1506"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              objectPosition: "center 0px",
            }}
            draggable={false}
          />
        </picture>

        {/* ── Mobile Hero Editorial Layer (Locked to 941x1506 Canvas) ── */}
        <div className="absolute inset-0 pointer-events-none z-10">

          {/* 1. Festive Intro Label: Feather Graphic + "Celebrate Janmashtami in Fragrance" */}
          <div
            className="absolute flex items-center"
            style={{
              left: "14.0%",
              top: "2.25%",
              gap: "8px",
            }}
          >
            <img
              src="/images/janmashtami/kicker-feather.png"
              alt=""
              aria-hidden="true"
              className="w-auto select-none pointer-events-none"
              style={{
                height: "clamp(18px, 4.4vw, 32px)",
              }}
            />
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                color: "#85501F",
                fontSize: "clamp(11px, 2.7vw, 20px)",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              Celebrate Janmashtami in Fragrance
            </span>
          </div>

          {/* 2. Main Headline: "A Divine Scent / for Janmashtami" */}
          <div
            className="absolute"
            style={{
              left: "13.5%",
              top: "5.50%",
              width: "75%",
            }}
          >
            <h1
              className="m-0 text-left"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(34px, 8.7vw, 68px)",
                lineHeight: 0.94,
                letterSpacing: "-0.015em",
                color: "#25163F",
                fontWeight: 400,
              }}
            >
              A Divine Scent
              <br />
              for Janmashtami
            </h1>
          </div>

          {/* 3. Ornamental Divider with Central Floral Motif */}
          <div
            className="absolute flex items-center"
            style={{
              left: "14.0%",
              top: "16.50%",
              width: "70%",
            }}
            aria-hidden="true"
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C7903D]/20 via-[#C7903D]/70 to-[#C7903D]" />
            <div className="mx-2 flex items-center justify-center shrink-0">
              <img
                src="/images/janmashtami/ornament-divider-flower.png"
                alt=""
                aria-hidden="true"
                className="w-auto object-contain"
                style={{
                  height: "clamp(12px, 3.2vw, 22px)",
                }}
              />
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#C7903D] via-[#C7903D]/70 to-[#C7903D]/20" />
          </div>

          {/* 4. Body Copy (3 lines exactly as specified) */}
          <div
            className="absolute"
            style={{
              left: "14.0%",
              top: "18.80%",
              width: "72%",
            }}
          >
            <p
              className="m-0 text-left"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(11px, 2.75vw, 20px)",
                lineHeight: 1.40,
                color: "#252047",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
            >
              Immerse your senses in the soft elegance
              <br />
              of Sentire by PC, inspired by devotion,
              <br />
              beauty, and timeless celebration.
            </p>
          </div>

          {/* 5. Limited Festive Edition Badge (Gold Flute Icon + Accent) */}
          <div
            className="absolute flex items-center"
            style={{
              left: "14.0%",
              top: "26.80%",
              gap: "8px",
            }}
          >
            <img
              src="/images/janmashtami/flute-badge.png"
              alt=""
              aria-hidden="true"
              className="w-auto object-contain"
              style={{
                height: "clamp(16px, 4.0vw, 28px)",
              }}
            />
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                color: "#8A571F",
                fontSize: "clamp(11px, 2.7vw, 19px)",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                lineHeight: 1,
              }}
            >
              Limited Festive Edition
            </span>
          </div>

          {/* 6. CTA Buttons Container (Shop Now + Explore Collection) */}
          <div
            className="absolute flex flex-col justify-start pointer-events-auto"
            style={{
              left: "14.0%",
              top: "30.50%",
              width: "47.3%",
              gap: "clamp(6px, 1.4vw, 12px)",
            }}
          >
            {/* Primary CTA: "Shop Now" */}
            <a
              href="#perfumes"
              onClick={handleCtaClick}
              className="w-full flex items-center justify-between transition-all duration-200 active:scale-[0.98]"
              style={{
                height: "clamp(42px, 10.2vw, 76px)",
                backgroundColor: "#2D1748",
                borderRadius: "16px",
                padding: "0 clamp(16px, 4.0vw, 32px)",
                textDecoration: "none",
                boxSizing: "border-box",
                boxShadow: "0 4px 16px rgba(45, 23, 72, 0.22)",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "clamp(13px, 3.4vw, 24px)",
                  fontWeight: 500,
                  color: "#E8BA59",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                Shop Now
              </span>
              <svg
                viewBox="0 0 24 12"
                fill="none"
                stroke="#E3B24E"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: "clamp(15px, 3.8vw, 26px)",
                  height: "auto",
                  flexShrink: 0,
                }}
              >
                <line x1="1" y1="6" x2="22" y2="6" />
                <polyline points="16 1 22 6 16 11" />
              </svg>
            </a>

            {/* Secondary CTA: "Explore Collection" */}
            <button
              type="button"
              onClick={() => onNavigate?.("perfumes")}
              className="w-full flex items-center justify-between cursor-pointer transition-all duration-200 active:scale-[0.98]"
              style={{
                height: "clamp(40px, 9.6vw, 72px)",
                backgroundColor: "#FAEEE8",
                border: "1.5px solid #9D672F",
                borderRadius: "16px",
                padding: "0 clamp(16px, 4.0vw, 32px)",
                boxSizing: "border-box",
                boxShadow: "0 2px 8px rgba(157, 103, 47, 0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(15px, 3.8vw, 27px)",
                  fontWeight: 500,
                  color: "#2B1B43",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                Explore Collection
              </span>
              <svg
                viewBox="0 0 24 12"
                fill="none"
                stroke="#2B1B43"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: "clamp(15px, 3.8vw, 26px)",
                  height: "auto",
                  flexShrink: 0,
                }}
              >
                <line x1="1" y1="6" x2="22" y2="6" />
                <polyline points="16 1 22 6 16 11" />
              </svg>
            </button>
          </div>

          {/* 7. Bottom Double-Chevron Downward Indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center select-none pointer-events-none"
            style={{
              top: "96.40%",
            }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 14"
              fill="none"
              stroke="#D6A94F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "clamp(16px, 3.8vw, 28px)",
                height: "auto",
              }}
            >
              <polyline points="4 2 12 8 20 2" />
              <polyline points="4 7 12 13 20 7" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}

