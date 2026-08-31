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
      onNavigate("perfumes");
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Sentire by PC Janmashtami Fragrance Collection"
      className="hero-section relative w-full overflow-hidden select-none bg-[#F3DFC5]"
      style={{
        width: "100%",
        backgroundColor: "#F3DFC5",
        WebkitFontSmoothing: "antialiased",
        textRendering: "geometricPrecision",
      }}
    >
      <style>{`
        .hero-title {
          font-family: "Cormorant Garamond", serif !important;
          font-weight: 300 !important;
          color: #2B160F !important;
          line-height: 0.96 !important;
          letter-spacing: -0.015em !important;
        }

        .hero-script {
          font-family: "Allura", cursive !important;
          font-weight: 400 !important;
          color: #A66B18 !important;
          line-height: 0.88 !important;
        }

        .hero-description {
          font-family: "Cormorant Garamond", serif !important;
          font-weight: 400 !important;
          color: #382219 !important;
          line-height: 1.25 !important;
        }

        /* Primary Button: SHOP NOW */
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
          letter-spacing: 0.14em;
          text-transform: uppercase !important;
          box-shadow: 0 4px 20px rgba(40, 21, 14, 0.22);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-primary:hover {
          background-color: #1a0d08;
          border-color: #d4a34e;
          box-shadow: 0 8px 30px rgba(184, 134, 56, 0.35);
          transform: translateY(-1.5px);
        }

        /* Secondary Button: EXPLORE COLLECTION */
        .hero-cta-secondary {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(243, 223, 197, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #28150E;
          border: 1.5px solid #B88638;
          font-family: "Montserrat", sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.12em;
          text-transform: uppercase !important;
          box-shadow: 0 4px 16px rgba(40, 21, 14, 0.08);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-cta-secondary:hover {
          background-color: #28150E;
          color: #E7B65B;
          border-color: #d4a34e;
          transform: translateY(-1.5px);
        }

        @media (max-width: 900px) {
          .hero-section {
            height: auto !important;
            min-height: 0 !important;
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
          JANMASTHAMI PURPLE OUD STILL-LIFE BACKGROUND (DESKTOP)
          ═════════════════════════════════════════════════════════════════ */}
      <picture className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none">
        <source srcSet="/images/mobile-hero-rakhi.png" type="image/png" />
        <img
          src="/images/mobile-hero-rakhi.png"
          alt="Sentire by PC Janmashtami Purple Oud Fragrance Still Life"
          fetchPriority="high"
          width="1672"
          height="941"
          className="hero-clean-bg absolute inset-0 w-full h-full object-cover object-right md:object-right-top select-none pointer-events-none"
          style={{ transition: "opacity 0.6s ease-out" }}
          draggable={false}
        />
      </picture>

      {/* ═════════════════════════════════════════════════════════════════
          DESKTOP JANMASTHAMI CONTENT LAYER
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-desktop-content absolute inset-0 flex flex-col justify-center"
        style={{
          paddingLeft: "clamp(36px, 7.5vw, 125px)",
          paddingTop: "clamp(28px, 4.5vh, 60px)",
          paddingBottom: "clamp(28px, 4.5vh, 60px)",
          paddingRight: "46%",
          zIndex: 6,
        }}
      >
        {/* Top Janmashtami Badge */}
        <div className="flex items-center gap-2 mb-3 text-[#A66B18] font-sans text-[13px] tracking-[0.16em] uppercase font-semibold">
          <span>🪶</span>
          <span>Celebrate Janmashtami in Fragrance</span>
        </div>

        {/* Main Headline */}
        <h1
          className="hero-title m-0"
          style={{
            fontSize: "clamp(48px, 4.8vw, 84px)",
            lineHeight: 0.96,
          }}
        >
          A Divine Scent
          <br />
          for Janmashtami
        </h1>

        {/* Ornamental Divider */}
        <div
          className="flex items-center my-4"
          style={{ maxWidth: "440px" }}
          aria-hidden="true"
        >
          <div className="flex-1 h-[1px] bg-[#35221A] opacity-50" />
          <div className="mx-2.5 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#A66B18" />
            </svg>
          </div>
          <div className="flex-1 h-[1px] bg-[#35221A] opacity-50" />
        </div>

        {/* Supporting Sentence */}
        <p
          className="hero-description m-0"
          style={{
            fontSize: "clamp(16px, 1.35vw, 22px)",
            lineHeight: 1.3,
            maxWidth: "460px",
          }}
        >
          Immerse your senses in the soft elegance of Sentire by PC, inspired by devotion, beauty, and timeless celebration.
        </p>

        {/* Festive Badge */}
        <div className="mt-4 mb-6 flex items-center gap-2 text-[#A66B18] font-sans text-[12px] font-bold tracking-[0.14em] uppercase">
          <span>🪈</span>
          <span>Limited Festive Edition</span>
        </div>

        {/* Dual Action Buttons Row */}
        <div className="flex items-center flex-wrap gap-4">
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-cta-primary rounded-full"
            style={{
              padding: "0 32px",
              height: "50px",
            }}
          >
            <span style={{ fontSize: "13px", marginRight: "10px" }}>
              SHOP NOW
            </span>
            <svg width="18" height="10" viewBox="0 0 22 12" fill="none" className="text-[#E7B65B]">
              <path d="M1 6H20M15 1L20 6L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            type="button"
            onClick={handlePersonalisationClick}
            className="hero-cta-secondary rounded-full"
            style={{
              padding: "0 28px",
              height: "50px",
            }}
          >
            <span style={{ fontSize: "13px", marginRight: "8px" }}>
              EXPLORE COLLECTION
            </span>
            <svg width="14" height="10" viewBox="0 0 22 12" fill="none" className="text-[#28150E]">
              <path d="M1 6H20M15 1L20 6L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          MOBILE JANMASTHAMI LAYOUT (< 900px)
          ═════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-mobile-content relative w-full overflow-hidden select-none"
        style={{
          width: "100%",
          aspectRatio: "863 / 1432",
          backgroundColor: "#F3DFC5",
        }}
      >
        <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <source srcSet="/images/mobile-hero-rakhi.png" type="image/png" />
          <img
            src="/images/mobile-hero-rakhi.png"
            alt="Sentire by PC Janmashtami Luxury Fragrance Gifting Mobile"
            fetchPriority="high"
            width="863"
            height="1432"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{ objectPosition: "center 0px" }}
            draggable={false}
          />
        </picture>

        {/* Mobile Editorial Content */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Badge */}
          <div
            className="absolute flex items-center gap-1.5"
            style={{ left: "6.0%", top: "4.8%", width: "85%" }}
          >
            <span className="text-[11px]">🪶</span>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.14em] uppercase text-[#A66B18]">
              Celebrate Janmashtami in Fragrance
            </span>
          </div>

          {/* Headline */}
          <div
            className="absolute"
            style={{ left: "6.0%", top: "8.5%", width: "82%" }}
          >
            <div
              role="heading"
              aria-level={1}
              className="hero-title m-0 text-left"
              style={{
                fontSize: "clamp(34px, 9.8vw, 86px)",
                lineHeight: 0.96,
                letterSpacing: "-0.015em",
                color: "#21150F",
                fontWeight: 300,
              }}
            >
              A Divine Scent
              <br />
              for Janmashtami
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute flex items-center"
            style={{ left: "6.0%", top: "24.5%", width: "34.8%" }}
            aria-hidden="true"
          >
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-55" />
            <div className="mx-2 flex items-center justify-center flex-shrink-0">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#A66B18" />
              </svg>
            </div>
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-55" />
          </div>

          {/* Paragraph */}
          <div
            className="absolute"
            style={{ left: "6.0%", top: "27.0%", width: "75%" }}
          >
            <p
              className="hero-description m-0 text-left"
              style={{
                fontSize: "clamp(12px, 3.2vw, 24px)",
                lineHeight: 1.25,
                color: "#2E1E16",
                fontWeight: 400,
              }}
            >
              Immerse your senses in the soft elegance of Sentire by PC, inspired by devotion, beauty, and timeless celebration.
            </p>
          </div>

          {/* Festive Badge */}
          <div
            className="absolute flex items-center gap-1.5"
            style={{ left: "6.0%", top: "37.5%", width: "70%" }}
          >
            <span className="text-[10px]">🪈</span>
            <span className="text-[9.5px] font-sans font-bold tracking-[0.12em] uppercase text-[#A66B18]">
              Limited Festive Edition
            </span>
          </div>

          {/* Dual Action Buttons (Positioned at 41.5% - COMPLETELY ABOVE BOTTLE CAP) */}
          <div
            className="absolute flex flex-col justify-start pointer-events-auto"
            style={{
              left: "6.0%",
              top: "41.5%",
              width: "min(270px, 46%)",
              gap: "8px",
            }}
          >
            <a
              href="#perfumes"
              onClick={handleCtaClick}
              className="hero-cta-primary w-full flex items-center justify-center rounded-full shadow-md"
              style={{
                height: "42px",
                backgroundColor: "#211008",
                border: "1.5px solid #B88638",
                padding: "0 10px",
                textDecoration: "none",
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
                }}
              >
                SHOP NOW
              </span>
              <svg width="13" height="9" viewBox="0 0 24 12" fill="none" stroke="#E7B65B" strokeWidth="2">
                <line x1="1" y1="6" x2="22" y2="6" />
                <polyline points="16 1 22 6 16 11" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handlePersonalisationClick}
              className="hero-cta-secondary w-full flex items-center justify-center rounded-full cursor-pointer shadow-sm"
              style={{
                height: "42px",
                backgroundColor: "rgba(246, 228, 208, 0.92)",
                border: "1.5px solid #9E8066",
                padding: "0 8px",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "9.5px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  color: "#21150F",
                  textTransform: "uppercase",
                  marginRight: "5px",
                }}
              >
                EXPLORE COLLECTION
              </span>
              <svg width="11" height="9" viewBox="0 0 24 12" fill="none" stroke="#21150F" strokeWidth="2">
                <line x1="1" y1="6" x2="22" y2="6" />
                <polyline points="16 1 22 6 16 11" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

