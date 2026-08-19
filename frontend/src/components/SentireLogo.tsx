import React, { useState } from "react";

interface SentireLogoProps {
  variant?: "navbar" | "footer" | "hero" | "compact";
  theme?: "dark" | "light" | "auto" | "gold" | "burgundy";
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
        return "24px";
      case "navbar":
        return "34px";
      case "footer":
        return "42px";
      case "hero":
        return "58px";
      default:
        return "34px";
    }
  };

  const logoHeight = getScale();

  // Determine logo image source based on theme & hover
  const getLogoSrc = () => {
    if (isHovered) return "/assets/sentire-logo-gold.png";
    switch (theme) {
      case "light":
        return "/assets/sentire-logo-burgundy.png";
      case "gold":
        return "/assets/sentire-logo-gold.png";
      case "burgundy":
        return "/assets/sentire-logo-burgundy.png";
      case "dark":
      case "auto":
      default:
        return "/assets/sentire-logo-white.png";
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none group transition-transform duration-300 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      aria-label="Sentire by PC Logo"
    >
      <div className="relative inline-flex items-center justify-center transition-all duration-300 group-hover:scale-105">
        <img
          src={getLogoSrc()}
          alt="SENTIRE ® By PC"
          style={{ height: logoHeight, width: "auto" }}
          className="block object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
}
