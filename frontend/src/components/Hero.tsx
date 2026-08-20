import { useEffect, useRef } from "react";

const PARTICLES = [
  { left: "6%",  top: "60%", size: 3, dur: 12, delay: 0   },
  { left: "18%", top: "45%", size: 2.5, dur: 15, delay: 1.2 },
  { left: "12%", top: "28%", size: 3.5, dur: 14, delay: 2.8 },
  { left: "30%", top: "72%", size: 2, dur: 16, delay: 0.5 },
  { left: "22%", top: "20%", size: 3, dur: 13, delay: 2.0 },
  { left: "38%", top: "80%", size: 2.5, dur: 18, delay: 3.5 },
  { left: "85%", top: "35%", size: 3, dur: 14, delay: 1.0 },
  { left: "92%", top: "65%", size: 2, dur: 17, delay: 2.4 },
];

interface HeroProps {
  onNavigate?: (page: "home" | "perfumes" | "bestsellers" | "new-arrivals" | "about" | "byob" | "personalisation", filters?: any) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current?.querySelector<HTMLImageElement>(".hero-bg-img");
    if (!el) return;
    const t = setTimeout(() => {
      el.style.transform = "scale(1)";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        height: "clamp(560px, 88svh, 92svh)",
        background: "#080604",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .hero-section { height: 88svh !important; min-height: 540px !important; }
          .hero-bg-img {
            object-position: 72% center !important;
          }
          .hero-content-mobile {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 28px 20px 96px;
            z-index: 4;
          }
          .hero-content-desktop { display: none !important; }

          .hero-headline-mobile {
            font-size: 42px;
            line-height: 0.94;
            letter-spacing: -0.02em;
            color: #f8f5f1;
            font-family: var(--font-display);
            text-transform: uppercase;
            text-shadow: 0 4px 30px rgba(0,0,0,0.75);
            margin: 0;
          }

          .hero-cta-mobile {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 22px;
          }
        }
        @media (min-width: 768px) {
          .hero-content-mobile { display: none !important; }
          .hero-content-desktop { display: flex !important; }
          .hero-section { height: clamp(540px, 55vw, 700px) !important; }
        }
      `}</style>

      {/* Full-bleed background image with smooth slow zoom */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/mobile-hero.png" width="768" height="1024" />
        <img
          src="/images/hero-celestial.png"
          alt="Sentire by PC artisanal luxury perfume flacon with 35%+ perfume oil concentration and custom laser bottle engraving"
          fetchPriority="high"
          width="1920"
          height="1080"
          className="hero-bg-img absolute inset-0 w-full h-full select-none pointer-events-none object-cover"
          style={{
            objectPosition: "center 20%",
            transform: "scale(1.03)",
            transformOrigin: "center center",
            transition: "transform 14s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          draggable={false}
        />
      </picture>

      {/* Left directional overlay — cinematic dark gradient for high contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(5,4,2,0.94) 0%, rgba(8,6,3,0.82) 28%, rgba(12,9,4,0.45) 54%, rgba(15,10,4,0.1) 78%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {/* Mobile vignette gradient */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(4,3,2,0.98) 0%, rgba(6,4,2,0.88) 32%, rgba(8,5,2,0.52) 58%, rgba(10,6,2,0.15) 80%, transparent 100%)",
          zIndex: 3,
        }}
      />

      {/* Bottom transition blend */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "90px",
          background: "linear-gradient(to bottom, transparent, rgba(8,6,4,0.5) 60%, rgba(6,4,2,0.9))",
          zIndex: 3,
        }}
      />

      {/* Floating gold mist particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, rgba(212,175,55,0.95) 0%, rgba(200,155,90,0.3) 70%, transparent)",
            animation: `heroParticleFloat ${p.dur}s ${p.delay}s ease-in-out infinite`,
            opacity: 0,
            zIndex: 2,
          }}
        />
      ))}

      {/* ── MOBILE Content Layout ── */}
      <div className="hero-content-mobile">
        {/* Rating & Concentration Badges */}
        <div className="hero-eyebrow flex items-center gap-2 mb-2 flex-wrap" style={{ opacity: 0 }}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c89b5a]/20 border border-[#c89b5a]/45 px-3 py-1 text-[8.5px] font-bold uppercase tracking-wider text-[#d4af37] backdrop-blur-md shadow-sm">
            <span className="text-amber-400">★</span> 4.9 | 10k+ Wearers
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[8.5px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-md">
            35% Extrait de Parfum
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-headline hero-headline-mobile" style={{ opacity: 0 }}>
          Born in<br />
          <em className="text-gold-shimmer" style={{ fontStyle: "italic", textShadow: "0 0 50px rgba(212,175,55,0.6)", fontWeight: 400 }}>
            Heaven,
          </em>
          <br />
          Worn on Earth.
        </h1>

        {/* Subline */}
        <div className="hero-subtitle flex items-center gap-3 mt-3" style={{ opacity: 0 }}>
          <span style={{ width: "24px", height: "1px", flexShrink: 0, background: "linear-gradient(90deg, #d4af37, rgba(212,175,55,0.2))" }} />
          <p style={{ fontSize: "10px", letterSpacing: "0.14em", color: "rgba(248,240,220,0.82)", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 400, margin: 0 }}>
            Crafted in France.&nbsp;&nbsp;14+ Hr Longevity.
          </p>
        </div>

        {/* Mobile CTAs */}
        <div className="hero-cta hero-cta-mobile" style={{ opacity: 0 }}>
          <a
            href="#perfumes"
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate("perfumes"); } }}
            className="btn-luxe-gold w-full text-center"
            style={{ height: "48px", fontSize: "10.5px" }}
          >
            Explore Fragrance House
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#personalisation"
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate("personalisation"); } }}
            className="btn-luxe-ghost w-full text-center"
            style={{ height: "46px", fontSize: "10px" }}
          >
            Product Personalisation
          </a>
        </div>

        {/* Mobile Quick Fragrance Discovery Chips */}
        <div className="mt-4 overflow-x-auto hide-scrollbar flex items-center gap-2 pb-1">
          <button
            onClick={() => onNavigate?.("bestsellers")}
            className="shrink-0 rounded-full border border-[#d4af37]/50 bg-[#120d09]/95 px-3.5 py-1.5 text-[8.5px] font-bold tracking-widest uppercase text-[#d4af37] backdrop-blur-md active:scale-95 transition-all shadow-sm"
          >
            ✨ Bestsellers
          </button>
          <button
            onClick={() => onNavigate?.("perfumes", { size: 10 })}
            className="shrink-0 rounded-full border border-[#c89b5a]/35 bg-black/70 px-3 py-1.5 text-[8.5px] font-semibold tracking-widest uppercase text-[#f8f5f1] backdrop-blur-md active:scale-95 transition-all"
          >
            📦 10ml Discovery
          </button>
          <button
            onClick={() => onNavigate?.("perfumes", { mood: "date-night" })}
            className="shrink-0 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[8.5px] font-medium tracking-widest uppercase text-white/90 backdrop-blur-md active:scale-95 transition-all"
          >
            🌙 Date Night
          </button>
          <button
            onClick={() => onNavigate?.("perfumes", { size: 50 })}
            className="shrink-0 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[8.5px] font-medium tracking-widest uppercase text-white/90 backdrop-blur-md active:scale-95 transition-all"
          >
            👑 Royal Ouds
          </button>
          <button
            onClick={() => onNavigate?.("perfumes", { mood: "sports" })}
            className="shrink-0 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[8.5px] font-medium tracking-widest uppercase text-white/90 backdrop-blur-md active:scale-95 transition-all"
          >
            🌊 Aquatic Fresh
          </button>
        </div>
      </div>

      {/* ── DESKTOP Content Layout ── */}
      <div
        className="hero-content-desktop hero-content-panel absolute top-0 bottom-0 left-0 flex flex-col justify-center"
        style={{
          width: "54%",
          paddingLeft: "clamp(36px, 5.5vw, 92px)",
          paddingRight: "24px",
          paddingBottom: "clamp(24px, 3.5vw, 40px)",
          zIndex: 4,
        }}
      >
        <div className="hero-eyebrow mb-4 flex items-center gap-3.5" style={{ opacity: 0 }}>
          <span style={{ display: "block", width: "44px", height: "1px", flexShrink: 0, background: "linear-gradient(90deg, #d4af37, rgba(212,175,55,0.2))" }} />
          <p style={{ fontSize: "clamp(9px, 0.75vw, 11px)", letterSpacing: "0.32em", color: "#d4af37", textTransform: "uppercase", margin: 0, fontFamily: "var(--font-sans)", fontWeight: 700 }}>
            Haute Parfumerie Française
          </p>
        </div>

        <h1
          className="hero-headline font-display uppercase"
          style={{ fontSize: "clamp(40px, 5.5vw, 72px)", letterSpacing: "-0.03em", lineHeight: 0.9, margin: 0, color: "#f8f5f1", textShadow: "0 6px 40px rgba(0,0,0,0.6)", opacity: 0 }}
        >
          Born in<br />
          <em className="text-gold-shimmer" style={{ fontStyle: "italic", textShadow: "0 0 60px rgba(212,175,55,0.55)", fontWeight: 400 }}>
            Heaven,
          </em>
          <br />Worn on Earth.
        </h1>

        <div className="hero-subtitle mt-6" style={{ opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ width: "32px", height: "1px", flexShrink: 0, background: "rgba(212,175,55,0.75)" }} />
            <p style={{ fontSize: "clamp(11px, 0.9vw, 13.5px)", letterSpacing: "0.14em", color: "rgba(248,240,220,0.82)", textTransform: "uppercase", fontFamily: "var(--font-sans)", fontWeight: 300, margin: 0 }}>
              Rare Botanicals.&nbsp;&nbsp;Celestial Accords.&nbsp;&nbsp;14+ Hr Longevity.
            </p>
          </div>
        </div>

        <div className="hero-cta mt-9 flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
          <a
            href="#perfumes"
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate("perfumes"); } }}
            className="btn-luxe-gold shadow-xl"
          >
            Explore Fragrance House
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="#personalisation"
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate("personalisation"); } }}
            className="btn-luxe-ghost"
          >
            Product Personalisation
          </a>
        </div>
      </div>
    </section>
  );
}
