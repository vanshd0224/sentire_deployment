import React, { useState } from "react";

interface SentireLogoProps {
  variant?: "navbar" | "footer" | "hero" | "compact";
  theme?: "dark" | "light" | "auto" | "gold";
  animated?: boolean;
  className?: string;
  onClick?: () => void;
  height?: number | string;
}

export default function SentireLogo({
  variant = "navbar",
  theme = "auto",
  animated = true,
  className = "",
  onClick,
  height,
}: SentireLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Height scaling
  const getScale = () => {
    if (height) return typeof height === "number" ? `${height}px` : height;
    switch (variant) {
      case "compact":
        return "22px";
      case "navbar":
        return "30px";
      case "footer":
        return "38px";
      case "hero":
        return "54px";
      default:
        return "30px";
    }
  };

  const logoHeight = getScale();

  // Determine fill color
  const getFillColor = () => {
    if (isHovered) return "#c89b5a"; // Rich champagne gold on hover
    switch (theme) {
      case "dark":
        return "#f8f5f1";
      case "light":
        return "#0b0907";
      case "gold":
        return "#c89b5a";
      case "auto":
      default:
        return "currentColor";
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none group ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      aria-label="Sentire Logo"
    >
      <style>{`
        /* ── Pure Luxury Vector Motion Animations ── */

        /* Smooth Staggered Letter Entrance */
        @keyframes letterFadeIn {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Subtle Specular Light Sweep (Crystal Gold Reflection) */
        @keyframes specularSheenSweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
            opacity: 0;
          }
          25% {
            opacity: 0.55;
          }
          75% {
            opacity: 0.55;
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
            opacity: 0;
          }
        }

        .sentire-path-letter {
          transition: fill 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sentire-animate-letter {
          animation: letterFadeIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sentire-sheen-sweep {
          position: absolute;
          inset: 0;
          width: 35%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 30%,
            rgba(200, 155, 90, 0.45) 50%,
            rgba(255, 255, 255, 0.2) 70%,
            transparent 100%
          );
          pointer-events: none;
          mix-blend-mode: overlay;
          animation: specularSheenSweep 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: 1s;
        }

        .sentire-logo-box {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .group:hover .sentire-logo-box {
          transform: scale(1.02);
        }
      `}</style>

      <div className="sentire-logo-box relative inline-flex items-center justify-center">
        <div className="relative overflow-hidden" style={{ height: logoHeight }}>
          <svg
            className="w-auto block overflow-visible"
            viewBox="0 0 420 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: logoHeight }}
          >
            {/* Letter 's' */}
            <path
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              d="M 52 76 C 52 90 38 98 24 98 C 10 98 2 90 2 78 L 14 78 C 14 84 20 88 25 88 C 31 88 38 84 38 77 C 38 69 31 66 21 63 C 9 59 3 53 3 40 C 3 26 15 18 28 18 C 41 18 49 26 50 37 L 38 37 C 37 30 32 27 27 27 C 21 27 16 30 16 38 C 16 44 21 48 30 51 C 44 55 52 61 52 76 Z"
              fill={getFillColor()}
              style={{ animationDelay: "0.05s" }}
            />

            {/* Letter 'e' */}
            <path
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              d="M 68 58 C 68 37 81 18 100 18 C 119 18 128 35 128 56 C 128 58 128 61 127 63 L 80 63 C 81 78 90 88 102 88 C 112 88 120 83 123 75 L 134 75 C 129 90 117 98 101 98 C 80 98 68 79 68 58 Z M 115 53 C 114 38 107 27 99 27 C 90 27 82 37 80 53 L 115 53 Z"
              fill={getFillColor()}
              style={{ animationDelay: "0.12s" }}
            />

            {/* Letter 'n' */}
            <path
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              d="M 142 20 L 154 20 L 154 32 C 160 23 170 18 182 18 C 197 18 206 27 206 43 L 206 96 L 193 96 L 193 46 C 193 35 187 28 176 28 C 164 28 155 37 155 51 L 155 96 L 142 96 L 142 20 Z"
              fill={getFillColor()}
              style={{ animationDelay: "0.19s" }}
            />

            {/* Letter 't' */}
            <path
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              d="M 234 32 L 234 20 L 221 20 L 221 32 L 210 32 L 210 42 L 221 42 L 221 80 C 221 91 227 97 238 97 C 243 97 248 96 252 94 L 252 83 C 249 84 245 85 242 85 C 237 85 234 82 234 77 L 234 42 L 250 42 L 250 32 L 234 32 Z"
              fill={getFillColor()}
              style={{ animationDelay: "0.26s" }}
            />

            {/* Letter 'i' stem */}
            <path
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              d="M 264 32 L 276 32 L 276 96 L 264 96 L 264 32 Z"
              fill={getFillColor()}
              style={{ animationDelay: "0.33s" }}
            />

            {/* Letter 'i' Dot */}
            <circle
              cx="270"
              cy="18"
              r="7.5"
              className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
              fill={getFillColor()}
              style={{ animationDelay: "0.4s" }}
            />

            {/* Signature Connected 'r' + 'e' Ligature Flourish */}
            <g>
              <path
                className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
                d="M 292 32 L 304 32 L 304 43 C 310 34 319 28 330 28 C 334 28 338 29 342 31 L 339 42 C 335 40 332 40 328 40 C 318 40 306 49 304 63 L 304 96 L 292 96 L 292 32 Z"
                fill={getFillColor()}
                style={{ animationDelay: "0.47s" }}
              />
              <path
                className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
                d="M 345 58 C 345 37 358 18 377 18 C 396 18 405 35 405 56 C 405 58 405 61 404 63 L 357 63 C 358 78 367 88 379 88 C 389 88 397 83 400 75 L 411 75 C 406 90 394 98 378 98 C 357 98 345 79 345 58 Z M 392 53 C 391 38 384 27 376 27 C 367 27 359 37 357 53 L 392 53 Z"
                fill={getFillColor()}
                style={{ animationDelay: "0.54s" }}
              />
              {/* Connected Ligature Curve */}
              <path
                className={`sentire-path-letter ${animated ? "sentire-animate-letter" : ""}`}
                d="M 326 32 C 338 21 355 21 368 27"
                stroke={getFillColor()}
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
                style={{ animationDelay: "0.6s" }}
              />
            </g>
          </svg>

          {/* Specular Light Sheen Sweep Overlay */}
          {animated && <div className="sentire-sheen-sweep" />}
        </div>
      </div>
    </div>
  );
}
