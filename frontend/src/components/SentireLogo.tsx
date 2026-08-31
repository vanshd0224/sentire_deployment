import React, { useState } from "react";

interface SentireLogoProps {
  variant?: "navbar" | "footer" | "hero" | "compact";
  theme?: "dark" | "light" | "auto" | "gold" | "white-gold";
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

  // Height scaling - Optimized for luxury proportions without overlapping nav items
  const getScale = () => {
    if (height) return typeof height === "number" ? `${height}px` : height;
    switch (variant) {
      case "compact":
        return "32px";
      case "navbar":
        return "44px"; // Prominent size for header navbar
      case "footer":
        return "56px";
      case "hero":
        return "80px";
      default:
        return "44px";
    }
  };

  const logoHeight = getScale();

  // Determine logo image source based on website theme
  const getLogoSrc = () => {
    if (isHovered) return "/assets/sentire-logo-gold.png";
    switch (theme) {
      case "gold":
        return "/assets/sentire-logo-gold.png";
      case "light":
        return "/assets/sentire-logo-gold.png";
      case "white-gold":
      case "dark":
      case "auto":
      default:
        return "/assets/sentire-logo-gold.png";
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none group transition-all duration-300 shrink-0 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      aria-label="Sentire by PC Logo"
    >
      <div className="relative inline-flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
        <img
          src={getLogoSrc()}
          alt="SENTIRE ® By PC"
          style={{ height: logoHeight, width: "auto" }}
          className="block object-contain max-h-[44px] sm:max-h-[50px] md:max-h-[56px] max-w-[220px] sm:max-w-[260px] md:max-w-[320px] w-auto transition-all duration-300 drop-shadow-[0_2px_12px_rgba(200,155,90,0.2)] shrink-0"
        />
      </div>
    </div>
  );
}
