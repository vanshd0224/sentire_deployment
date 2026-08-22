import { useEffect, useRef } from "react";

interface HeroProps {
  onNavigate?: (
    page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation" | "client-services" | "track-order" | "account",
    filters?: any
  ) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLImageElement>(".hero-bg-canvas");
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

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Sentire by PC Bespoke Rakhi Fragrance Gifting"
      className="relative w-full overflow-hidden select-none bg-[#F5E3CD]"
      style={{
        backgroundColor: "#F3DFC5",
      }}
    >
      <style>{`
        /* Luxury typography and responsive rules */
        .font-brand-title {
          font-family: "Cormorant Garamond", "EB Garamond", serif;
        }
        .font-brand-headline {
          font-family: "Bodoni Moda", "Cormorant Garamond", "Playfair Display", serif;
        }
        .font-brand-script {
          font-family: "Allura", "Great Vibes", cursive;
        }
        .font-brand-sans {
          font-family: "Montserrat", "Inter", sans-serif;
        }
        .font-brand-badge {
          font-family: "Cinzel", "Cormorant Garamond", serif;
        }

        /* Desktop CTA double border */
        .hero-rakhi-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #28150E;
          color: #E7B65B;
          border: 1.5px solid #B88638;
          box-shadow: 0 4px 20px rgba(40, 21, 14, 0.25);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          cursor: pointer;
        }
        .hero-rakhi-cta::after {
          content: "";
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(184, 134, 56, 0.45);
          pointer-events: none;
          transition: all 0.35s ease;
        }
        .hero-rakhi-cta:hover {
          background-color: #1e0e09;
          border-color: #d4a34e;
          box-shadow: 0 8px 30px rgba(184, 134, 56, 0.35);
          transform: translateY(-1.5px);
        }
        .hero-rakhi-cta:hover::after {
          border-color: rgba(231, 182, 91, 0.8);
          inset: 4px;
        }

        /* Top-Right Bespoke Rakhi Badge */
        .hero-rakhi-badge {
          position: absolute;
          background: radial-gradient(circle at 45% 45%, #7D1F16 0%, #5E150F 70%, #480F0A 100%);
          border-radius: 50%;
          box-shadow: 0 8px 28px rgba(94, 21, 15, 0.4), inset 0 0 16px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 10;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-rakhi-badge:hover {
          transform: scale(1.03) rotate(0.5deg);
        }
        .badge-ring-outer {
          position: absolute;
          inset: 4px;
          border: 1.5px solid #D8A343;
          border-radius: 50%;
          pointer-events: none;
        }
        .badge-ring-inner {
          position: absolute;
          inset: 8px;
          border: 1px dashed rgba(231, 182, 91, 0.7);
          border-radius: 50%;
          pointer-events: none;
        }
        .badge-ring-innermost {
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(216, 163, 67, 0.5);
          border-radius: 50%;
          pointer-events: none;
        }

        @media (max-width: 1023px) {
          .hero-desktop-artboard { display: none !important; }
          .hero-mobile-artboard { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .hero-desktop-artboard { display: block !important; }
          .hero-mobile-artboard { display: none !important; }
        }
      `}</style>

      {/* ═════════════════════════════════════════════════════════════════════
          DESKTOP CANVAS (Locked Exact 1672 × 941 Reference Geometry)
          ═════════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-desktop-artboard relative w-full mx-auto"
        style={{
          maxWidth: "1672px",
          aspectRatio: "1672 / 941",
          minHeight: "680px",
          maxHeight: "941px",
        }}
      >
        {/* Photographic background still life image */}
        <picture>
          <source srcSet="/images/hero-rakhi-clean.png" type="image/png" />
          <img
            src="/images/hero-rakhi-clean.png"
            alt="Sentire by PC Rakhi Luxury Fragrance Gifting Campaign Still Life"
            fetchPriority="high"
            width="1672"
            height="941"
            className="hero-bg-canvas absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              objectPosition: "center center",
              transition: "opacity 0.6s ease-out",
            }}
            draggable={false}
          />
        </picture>

        {/* Top-Left Subtle Ornamental Mandala Motif */}
        <div
          className="absolute top-0 left-0 pointer-events-none select-none opacity-20"
          style={{ width: "24%", maxWidth: "340px", aspectRatio: "1/1", zIndex: 3 }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#D7AD72]">
            <circle cx="0" cy="0" r="190" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="165" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="140" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="0" cy="0" r="90" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="65" stroke="currentColor" strokeWidth="0.5" />
            {/* Ornamental radial petals */}
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

        {/* ── Left Editorial Content Layer ── */}
        <div
          className="absolute inset-0 flex flex-col justify-between"
          style={{
            paddingLeft: "clamp(36px, 8.2vw, 138px)",
            paddingTop: "clamp(30px, 5.6vw, 54px)",
            paddingBottom: "clamp(36px, 7.8vw, 76px)",
            paddingRight: "48%", // Keeps left side strictly inside 52%
            zIndex: 6,
          }}
        >
          {/* Top Brand Header */}
          <div className="flex items-center">
            <span
              className="font-brand-title font-semibold tracking-[0.24em] text-[#24140E] uppercase"
              style={{
                fontSize: "clamp(20px, 1.85vw, 30px)",
                lineHeight: 1,
              }}
            >
              SENTIRE BY PC
            </span>

            {/* Vertical Divider */}
            <span
              className="mx-4 block flex-shrink-0 bg-[#24140E]"
              style={{
                width: "1px",
                height: "clamp(24px, 2.2vw, 36px)",
              }}
              aria-hidden="true"
            />

            <span
              className="font-brand-sans font-medium tracking-[0.28em] text-[#2A1B15] uppercase"
              style={{
                fontSize: "clamp(9.5px, 0.85vw, 13.5px)",
                lineHeight: 1,
              }}
            >
              EXTRAIT DE PARFUM
            </span>
          </div>

          {/* Main Headline & Script Subheadline Container */}
          <div className="mt-auto mb-auto" style={{ paddingTop: "clamp(12px, 2vw, 28px)", paddingBottom: "clamp(12px, 2vw, 24px)" }}>
            {/* Primary Headline */}
            <h1
              className="font-brand-headline font-normal text-[#2B160F] tracking-[-0.01em] m-0"
              style={{
                fontSize: "clamp(46px, 5.2vw, 86px)",
                lineHeight: 0.98,
              }}
            >
              A Pure
              <br />
              Rakhi Gesture
            </h1>

            {/* Calligraphic Script Subheadline */}
            <div
              className="font-brand-script text-[#A66B18] select-none"
              style={{
                fontSize: "clamp(38px, 4.1vw, 68px)",
                lineHeight: 1.15,
                marginTop: "clamp(2px, 0.5vw, 6px)",
                transform: "translateY(-4px)",
              }}
            >
              Wrapped in Fragrance
            </div>

            {/* Ornamental Divider */}
            <div
              className="flex items-center my-3"
              style={{
                maxWidth: "470px",
                marginTop: "clamp(10px, 1.1vw, 18px)",
                marginBottom: "clamp(10px, 1.1vw, 18px)",
              }}
              aria-hidden="true"
            >
              <div className="flex-1 h-[1px] bg-[#35221A] opacity-70" />
              <div className="mx-2 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 0L10 5L5 10L0 5L5 0Z" fill="#35221A" />
                </svg>
              </div>
              <div className="flex-1 h-[1px] bg-[#35221A] opacity-70" />
            </div>

            {/* Supporting Copy */}
            <p
              className="font-brand-title font-medium text-[#382219] m-0"
              style={{
                fontSize: "clamp(17px, 1.68vw, 27px)",
                lineHeight: 1.25,
                letterSpacing: "0.01em",
              }}
            >
              Personalized. Festive. Made for your bond.
            </p>

            {/* USP Row (3 Columns) */}
            <div
              className="grid grid-cols-3 items-center mt-6"
              style={{
                maxWidth: "490px",
                marginTop: "clamp(20px, 2.4vw, 38px)",
              }}
            >
              {/* Col 1: Photo & Name Engraving */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="h-10 flex items-center justify-center mb-2 text-[#2C211C]">
                  {/* Flacon outline with plus personalization mark */}
                  <svg width="28" height="34" viewBox="0 0 28 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="7" y="2" width="14" height="6" rx="1" />
                    <rect x="3" y="8" width="22" height="24" rx="2" />
                    <line x1="14" y1="15" x2="14" y2="25" />
                    <line x1="9" y1="20" x2="19" y2="20" />
                  </svg>
                </div>
                <div
                  className="font-brand-sans font-medium text-[#2C211C]"
                  style={{ fontSize: "clamp(11px, 0.95vw, 15.5px)", lineHeight: 1.2 }}
                >
                  Photo &amp; Name
                  <br />
                  Engraving
                </div>
              </div>

              {/* Col 2: 35%+ Perfume Oil Concentration */}
              <div className="flex flex-col items-center text-center px-1 border-l border-r border-[#382219]/25">
                <div className="h-10 flex items-center justify-center mb-2 text-[#2C211C]">
                  {/* Perfume droplet outline */}
                  <svg width="26" height="34" viewBox="0 0 26 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 3C13 3 3 15.5 3 22C3 27.5 7.5 31 13 31C18.5 31 23 27.5 23 22C23 15.5 13 3 13 3Z" />
                  </svg>
                </div>
                <div
                  className="font-brand-sans font-medium text-[#2C211C]"
                  style={{ fontSize: "clamp(11px, 0.95vw, 15.5px)", lineHeight: 1.2 }}
                >
                  35%+ Perfume Oil
                  <br />
                  Concentration
                </div>
              </div>

              {/* Col 3: Express Delivery */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="h-10 flex items-center justify-center mb-2 text-[#2C211C]">
                  {/* Stopwatch / express clock outline */}
                  <svg width="32" height="34" viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="17" cy="18" r="11" />
                    <polyline points="17 12 17 18 21 20" />
                    <line x1="17" y1="3" x2="17" y2="7" />
                    <line x1="3" y1="12" x2="7" y2="12" strokeWidth="1.2" />
                    <line x1="1" y1="17" x2="6" y2="17" strokeWidth="1.2" />
                    <line x1="4" y1="22" x2="8" y2="22" strokeWidth="1.2" />
                  </svg>
                </div>
                <div
                  className="font-brand-sans font-medium text-[#2C211C]"
                  style={{ fontSize: "clamp(11px, 0.95vw, 15.5px)", lineHeight: 1.2 }}
                >
                  Express
                  <br />
                  Delivery
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ marginTop: "clamp(16px, 2.2vw, 32px)" }}>
            <a
              href="#perfumes"
              onClick={handleCtaClick}
              className="hero-rakhi-cta"
              style={{
                width: "clamp(280px, 22vw, 368px)",
                height: "clamp(54px, 4.2vw, 68px)",
              }}
            >
              <span
                className="font-brand-sans font-medium uppercase tracking-[0.24em]"
                style={{
                  fontSize: "clamp(14px, 1.15vw, 18.5px)",
                  marginRight: "16px",
                  paddingLeft: "4px",
                }}
              >
                SHOP RAKHI GIFTS
              </span>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-[#E7B65B] flex-shrink-0">
                <path d="M1 6H20M15 1L20 6L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Top-Right Bespoke Rakhi Badge ── */}
        <div
          className="hero-rakhi-badge"
          style={{
            top: "clamp(24px, 3.2vw, 47px)",
            right: "clamp(24px, 3.2vw, 48px)",
            width: "clamp(140px, 12.8vw, 211px)",
            height: "clamp(140px, 12.8vw, 211px)",
          }}
        >
          {/* Concentric Gold Borders */}
          <div className="badge-ring-outer" />
          <div className="badge-ring-inner" />
          <div className="badge-ring-innermost" />

          {/* Badge Inner Content */}
          <div className="relative z-10 flex flex-col items-center justify-center p-3">
            {/* Gold Lotus Icon */}
            <svg width="22" height="15" viewBox="0 0 22 15" fill="none" className="text-[#E7B65B] mb-1.5 opacity-90">
              <path d="M11 1C11 1 8 6 8 10C8 12.2 9.3 13.5 11 13.5C12.7 13.5 14 12.2 14 10C14 6 11 1 11 1Z" stroke="currentColor" strokeWidth="1" />
              <path d="M11 6C8.5 6 4 9 4 12C4 13.5 5.5 14 7 14C9 14 10.5 12 11 10" stroke="currentColor" strokeWidth="1" />
              <path d="M11 6C13.5 6 18 9 18 12C18 13.5 16.5 14 15 14C13 14 11.5 12 11 10" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* BESPOKE */}
            <span
              className="font-brand-sans font-medium text-[#F3DFC7] uppercase tracking-[0.28em]"
              style={{ fontSize: "clamp(7px, 0.65vw, 11px)", lineHeight: 1 }}
            >
              BESPOKE
            </span>

            {/* RAKHI */}
            <span
              className="font-brand-badge font-semibold text-[#FFF7ED] uppercase tracking-[0.08em] my-1"
              style={{
                fontSize: "clamp(18px, 1.8vw, 30px)",
                lineHeight: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              RAKHI
            </span>

            {/* GIFTING */}
            <span
              className="font-brand-sans font-medium text-[#F3DFC7] uppercase tracking-[0.28em]"
              style={{ fontSize: "clamp(7px, 0.65vw, 11px)", lineHeight: 1 }}
            >
              GIFTING
            </span>

            {/* Ornate bottom flourish */}
            <svg width="34" height="6" viewBox="0 0 34 6" fill="none" className="text-[#E7B65B] mt-1.5 opacity-85">
              <path d="M0 3C5 3 6 5 10 5C14 5 15 1 17 1C19 1 20 5 24 5C28 5 29 3 34 3" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="17" cy="1" r="1.2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════
          MOBILE / TABLET ADAPTIVE LAYOUT (< 1024px)
          ═════════════════════════════════════════════════════════════════════ */}
      <div className="hero-mobile-artboard relative w-full flex-col justify-end overflow-hidden pb-10 pt-16 px-5 min-h-[580px]">
        {/* Background image for mobile */}
        <picture>
          <source srcSet="/images/mobile-hero-rakhi.png" type="image/png" />
          <img
            src="/images/hero-rakhi-clean.png"
            alt="Sentire by PC Festive Rakhi"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              objectPosition: "68% center",
              filter: "brightness(0.95)",
            }}
          />
        </picture>

        {/* Soft luxury champagne overlay gradient for contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(243,223,197,0.7) 0%, rgba(243,223,197,0.85) 45%, rgba(245,227,205,0.96) 80%, #F5E3CD 100%)",
            zIndex: 2,
          }}
        />

        {/* Mobile Top Brand Header & Badge */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <div className="font-brand-title font-bold tracking-[0.2em] text-[#24140E] text-[20px] uppercase">
              SENTIRE BY PC
            </div>
            <div className="font-brand-sans font-medium tracking-[0.25em] text-[#2A1B15] text-[9.5px] uppercase mt-0.5">
              EXTRAIT DE PARFUM
            </div>
          </div>

          {/* Compact Mobile Badge */}
          <div
            className="hero-rakhi-badge relative"
            style={{ width: "90px", height: "90px", flexShrink: 0 }}
          >
            <div className="badge-ring-outer" />
            <div className="badge-ring-inner" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-brand-sans text-[#F3DFC7] text-[6px] tracking-[0.2em] uppercase">BESPOKE</span>
              <span className="font-brand-badge text-[#FFF7ED] text-[14px] font-bold tracking-wider leading-none my-0.5">RAKHI</span>
              <span className="font-brand-sans text-[#F3DFC7] text-[6px] tracking-[0.2em] uppercase">GIFTING</span>
            </div>
          </div>
        </div>

        {/* Mobile Headline */}
        <div className="relative z-10 mb-5">
          <h1 className="font-brand-headline text-[#2B160F] text-[40px] leading-[0.96] tracking-tight m-0">
            A Pure
            <br />
            Rakhi Gesture
          </h1>
          <div className="font-brand-script text-[#A66B18] text-[34px] leading-tight mt-1">
            Wrapped in Fragrance
          </div>

          <div className="flex items-center my-3 max-w-[280px]">
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-60" />
            <div className="mx-2">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 0L8 4L4 8L0 4L4 0Z" fill="#35221A" />
              </svg>
            </div>
            <div className="flex-1 h-[1px] bg-[#35221A] opacity-60" />
          </div>

          <p className="font-brand-title font-medium text-[#382219] text-[16px] leading-snug m-0">
            Personalized. Festive. Made for your bond.
          </p>
        </div>

        {/* Mobile USP Strip */}
        <div className="relative z-10 grid grid-cols-3 gap-2 bg-[#F3DFC5]/80 backdrop-blur-md rounded-lg p-3 border border-[#B88638]/30 mb-6">
          <div className="text-center">
            <div className="font-brand-sans font-semibold text-[#2C211C] text-[10px] leading-tight">
              Photo &amp; Name
              <br />
              Engraving
            </div>
          </div>
          <div className="text-center border-l border-r border-[#382219]/20">
            <div className="font-brand-sans font-semibold text-[#2C211C] text-[10px] leading-tight">
              35%+ Oil
              <br />
              Concentration
            </div>
          </div>
          <div className="text-center">
            <div className="font-brand-sans font-semibold text-[#2C211C] text-[10px] leading-tight">
              Express
              <br />
              Delivery
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="relative z-10">
          <a
            href="#perfumes"
            onClick={handleCtaClick}
            className="hero-rakhi-cta w-full py-4 text-center rounded-none"
            style={{ height: "54px" }}
          >
            <span className="font-brand-sans font-medium uppercase tracking-[0.2em] text-[14px] mr-3">
              SHOP RAKHI GIFTS
            </span>
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="text-[#E7B65B] flex-shrink-0">
              <path d="M1 5H16M12 1L16 5L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
