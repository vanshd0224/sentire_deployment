import { PageName } from "../App";

interface MobileBottomNavProps {
  currentPage: PageName;
  onNavigate: (page: PageName) => void;
  onOpenCart: () => void;
  onOpenBundleModal: () => void;
  onToggleSearch: () => void;
  cartCount: number;
}

export default function MobileBottomNav({
  currentPage,
  onNavigate,
  onOpenCart,
  onOpenBundleModal,
  onToggleSearch,
  cartCount,
}: MobileBottomNavProps) {
  return (
    <>
      <style>{`
        .snav-root {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 40;
          display: flex;
          align-items: stretch;
          background: rgba(7, 5, 3, 0.96);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border-top: 1px solid rgba(212, 175, 55, 0.22);
          box-shadow:
            0 -1px 0 rgba(212, 175, 55, 0.1),
            0 -16px 48px rgba(0, 0, 0, 0.65),
            0 -4px 16px rgba(0, 0, 0, 0.4);
          padding-bottom: env(safe-area-inset-bottom, 4px);
          min-height: 64px;
        }
        @media (min-width: 1024px) { .snav-root { display: none !important; } }

        .snav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 4px 8px;
          gap: 3.5px;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          color: rgba(248, 245, 241, 0.42);
          min-width: 48px;
        }
        .snav-item:active {
          transform: scale(0.93);
          transition: transform 0.1s ease;
        }
        .snav-item.is-active {
          color: #d4af37;
        }
        .snav-item.is-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 1.5px;
          background: linear-gradient(90deg, #d4af37, #c89b5a);
          border-radius: 0 0 2px 2px;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.7);
        }

        .snav-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .snav-item.is-active .snav-icon {
          transform: translateY(-1px);
        }

        .snav-label {
          font-family: var(--font-sans);
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          line-height: 1;
          white-space: nowrap;
        }

        .snav-center {
          flex: 0 0 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          position: relative;
          -webkit-tap-highlight-color: transparent;
          outline: none;
          gap: 3px;
        }
        .snav-center:active .snav-gem-pill {
          transform: scale(0.92);
        }
        .snav-gem-pill {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e5c365 0%, #c89b5a 50%, #8e6527 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.35),
            0 4px 20px rgba(200, 155, 90, 0.5),
            0 8px 32px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          margin-top: -8px;
        }
        .snav-center-label {
          font-family: var(--font-sans);
          font-size: 7px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(212, 175, 55, 0.9);
          line-height: 1;
          margin-top: 0;
        }

        .snav-cart-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          border-radius: 999px;
          background: linear-gradient(135deg, #d4af37, #f7e6c4);
          color: #070503;
          font-size: 8px;
          font-weight: 800;
          font-family: var(--font-sans);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
          line-height: 1;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      <nav className="snav-root" aria-label="Mobile navigation">
        {/* Home */}
        <button
          onClick={() => onNavigate("home")}
          className={`snav-item${currentPage === "home" ? " is-active" : ""}`}
          aria-label="Home"
        >
          <span className="snav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentPage === "home" ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span className="snav-label">Home</span>
        </button>

        {/* Fragrances */}
        <button
          onClick={() => onNavigate("perfumes")}
          className={`snav-item${currentPage === "perfumes" ? " is-active" : ""}`}
          aria-label="Shop fragrances"
        >
          <span className="snav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={currentPage === "perfumes" ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
              <rect x="8" y="9" width="8" height="12" rx="2" />
              <path d="M11 9V6.5h2V9" />
              <line x1="12" y1="4" x2="12" y2="6.5" />
            </svg>
          </span>
          <span className="snav-label">Perfumes</span>
        </button>

        {/* Center: BYOB Bundle */}
        <button
          onClick={() => onNavigate("byob")}
          className={`snav-center${currentPage === "byob" ? " is-active" : ""}`}
          aria-label="Build your own bundle"
        >
          <span className="snav-gem-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="#070503" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={20} height={20}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
          <span className="snav-center-label">BYOB</span>
        </button>

        {/* Search */}
        <button onClick={onToggleSearch} className="snav-item" aria-label="Search fragrances">
          <span className="snav-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" width={20} height={20}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <span className="snav-label">Search</span>
        </button>

        {/* Cart */}
        <button onClick={onOpenCart} className="snav-item" aria-label={`Cart ${cartCount > 0 ? `, ${cartCount} items` : ""}`}>
          <span className="snav-icon" style={{ position: "relative" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" width={20} height={20}>
              <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {cartCount > 0 && (
              <span className="snav-cart-badge">{cartCount > 9 ? "9+" : cartCount}</span>
            )}
          </span>
          <span className="snav-label">Cart</span>
        </button>
      </nav>
    </>
  );
}
