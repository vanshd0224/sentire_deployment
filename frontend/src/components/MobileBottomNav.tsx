import type { PageName } from "../types/appTypes";

interface MobileBottomNavProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  onOpenCart: () => void;
  onOpenAccount?: () => void;
  onOpenBundleModal?: () => void;
  onToggleSearch: () => void;
  cartCount: number;
}

export default function MobileBottomNav({
  currentPage,
  onNavigate,
  onOpenCart,
  onToggleSearch,
  cartCount,
}: MobileBottomNavProps) {
  const isPerfumesActive =
    currentPage === "perfumes" ||
    currentPage === "bestsellers" ||
    currentPage === "new-arrivals";
  const isHomeActive = currentPage === "home";
  const isDiscoveryActive = currentPage === "discovery-set";

  return (
    <>
      {" "}
      <style>{`
        .snav-dock-container {
          position: fixed;
          bottom: max(12px, env(safe-area-inset-bottom, 12px));
          left: 14px;
          right: 14px;
          max-width: 460px;
          margin-inline: auto;
          z-index: 50;
          pointer-events: auto;
        }
        @media (min-width: 901px) {
          .snav-dock-container {
            display: none !important;
          }
        }

        .snav-dock {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          background: rgba(251, 248, 242, 0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 38px;
          border: 1px solid rgba(170, 130, 72, 0.12);
          box-shadow:
            0 8px 32px rgba(70, 48, 24, 0.09),
            0 2px 8px rgba(70, 48, 24, 0.04);
          padding: 0 8px;
          box-sizing: border-box;
        }

        /* Center BYOB circle clean floating dock integration */
        .snav-dock::before {
          display: none;
        }

        .snav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-width: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          z-index: 2;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          color: #9A9186;
          padding: 0;
          gap: 5px;
          transition: color 0.18s ease, transform 0.14s ease;
        }
        .snav-item:active {
          transform: scale(0.95);
        }
        .snav-item.is-active {
          color: #AC7D33;
        }

        .snav-icon {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
        }

        .snav-label {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
          white-space: nowrap;
        }
        .snav-item.is-active .snav-label {
          font-weight: 600;
        }

        /* Center BYOB Raised Button */
        .snav-center {
          flex: 0 0 68px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          z-index: 3;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          padding: 0;
        }
        .snav-center:active .snav-byob-circle {
          transform: scale(0.94);
        }

        .snav-byob-circle {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E2C278 0%, #D4AF60 50%, #C3994B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid #FFFFFF;
          box-shadow:
            0 0 0 1px rgba(175, 128, 60, 0.16),
            0 6px 18px rgba(88, 60, 25, 0.15),
            inset 0 1px 1px rgba(255, 255, 255, 0.6);
          margin-top: -16px;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease;
          flex-shrink: 0;
        }

        .snav-center-label {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #AE8032;
          line-height: 1;
          margin-top: 5px;
        }

        /* Center: the Discovery Set case, turning in 3D (as on its page) */
        .snav-byob-circle.snav-disc-circle {
          background: #fbfaf6 !important;
          border: 1px solid #161616 !important;
          perspective: 140px;
          overflow: hidden;
        }
        .snav-center.is-active .snav-byob-circle.snav-disc-circle {
          box-shadow: 0 0 0 2px #f2f2f0, 0 0 0 3px #161616 !important;
        }
        .snav-disc-tilt {
          display: block;
          transform-style: preserve-3d;
          transform: rotateX(-14deg);
        }
        .snav-disc-box {
          display: block;
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          animation: snavDiscSpin 7s linear infinite;
          will-change: transform;
        }
        .snav-disc-face {
          position: absolute;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background-color: #121212;
          background-size: cover;
          background-position: center;
        }
        @keyframes snavDiscSpin {
          from { transform: rotateY(-28deg); }
          to { transform: rotateY(332deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .snav-disc-box { animation: none; transform: rotateY(-28deg); }
        }

        /* Luxury Cart Badge */
        .snav-cart-badge {
          position: absolute;
          top: -4px;
          right: -6px;
          min-width: 15px;
          height: 15px;
          padding: 0 3.5px;
          border-radius: 999px;
          background: #D9B266;
          color: #161616;
          font-size: 8px;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(70, 48, 24, 0.25);
          line-height: 1;
          border: 1.5px solid #FBF8F2;
        }
      `}</style>{" "}
      <div
        className="snav-dock-container"
        aria-label="Mobile Bottom Navigation"
      >
        {" "}
        <nav className="snav-dock">
          {" "}
          {/* 1. HOME */}
          <button
            onClick={() => onNavigate("home")}
            className={`snav-item${isHomeActive ? " is-active" : ""}`}
            aria-label="Home"
          >
            {" "}
            <span className="snav-icon">
              {" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={isHomeActive ? 1.9 : 1.65}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={21}
                height={21}
              >
                {" "}
                <path d="M3 10.5L12 3l9 7.5v10a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20.5v-10z" />{" "}
                <path d="M9 22V13h6v9" />{" "}
              </svg>{" "}
            </span>{" "}
            <span className="snav-label">Home</span>{" "}
          </button>{" "}
          {/* 2. PERFUMES */}
          <button
            onClick={() => onNavigate("perfumes")}
            className={`snav-item${isPerfumesActive ? " is-active" : ""}`}
            aria-label="Shop perfumes"
          >
            {" "}
            <span className="snav-icon">
              {" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={isPerfumesActive ? 1.9 : 1.65}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={21}
                height={21}
              >
                {" "}
                <rect x="7" y="9" width="10" height="12" rx="2" />{" "}
                <path d="M10 9V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />{" "}
                <line x1="12" y1="3" x2="12" y2="5" />{" "}
                <circle cx="12" cy="14" r="0.9" fill="currentColor" />{" "}
              </svg>{" "}
            </span>{" "}
            <span className="snav-label">Perfumes</span>{" "}
          </button>{" "}
          {/* 3. CENTER: DISCOVERY SET */}
          <button
            onClick={() => onNavigate("discovery-set")}
            className={`snav-center${isDiscoveryActive ? " is-active" : ""}`}
            aria-label="Discovery set"
          >
            <span className="snav-byob-circle snav-disc-circle">
              <MiniDiscoveryBox />
            </span>
            <span className="snav-center-label">Discovery</span>
          </button>
          {/* 4. SEARCH */}
          <button
            onClick={onToggleSearch}
            className="snav-item"
            aria-label="Search fragrances"
          >
            {" "}
            <span className="snav-icon">
              {" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.65}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={21}
                height={21}
              >
                {" "}
                <circle cx="11" cy="11" r="7" />{" "}
                <line x1="16.5" y1="16.5" x2="21.5" y2="21.5" />{" "}
              </svg>{" "}
            </span>{" "}
            <span className="snav-label">Search</span>{" "}
          </button>{" "}
          {/* 5. CART */}
          <button
            onClick={onOpenCart}
            className="snav-item"
            aria-label={`Cart ${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            {" "}
            <span className="snav-icon">
              {" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.65}
                strokeLinecap="round"
                strokeLinejoin="round"
                width={21}
                height={21}
              >
                {" "}
                <path d="M6 8.5h12l-1 12a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5l-1-12z" />{" "}
                <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />{" "}
              </svg>{" "}
              {cartCount > 0 && (
                <span className="snav-cart-badge">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </span>{" "}
            <span className="snav-label">Cart</span>{" "}
          </button>{" "}
        </nav>{" "}
      </div>{" "}
    </>
  );
}

// The Discovery Set case at button size: the same five faces as the 3D case
// on the Discovery Set page (204 × 330 × 152), scaled to the star's size.
const DISC_FACES = "/discovery/cube";
const DW = 15;
const DH = 25;
const DD = 11;

function MiniDiscoveryBox() {
  const face = (name: string, w: number, h: number, transform: string) => (
    <span
      className="snav-disc-face"
      style={{
        width: w,
        height: h,
        left: -w / 2,
        top: -h / 2,
        transform,
        backgroundImage: `url(${DISC_FACES}/${name}.webp)`,
      }}
    />
  );
  return (
    <span className="snav-disc-tilt" aria-hidden>
      <span className="snav-disc-box">
        {face("front", DW, DH, `translateZ(${DD / 2}px)`)}
        {face("right", DD, DH, `rotateY(90deg) translateZ(${DW / 2}px)`)}
        {face("back", DW, DH, `rotateY(180deg) translateZ(${DD / 2}px)`)}
        {face("left", DD, DH, `rotateY(-90deg) translateZ(${DW / 2}px)`)}
        {face("top", DW, DD, `rotateX(90deg) translateZ(${DH / 2}px)`)}
      </span>
    </span>
  );
}
