---
name: ui-ux-pro
description: Pro-level UI/UX design, luxury e-commerce aesthetics, mobile-first responsiveness, typography hierarchy, micro-interactions, and high-performance Web Vitals optimization.
---

# 🎨 UI/UX Pro Skill & Design System Guidelines

This skill equips Antigravity with pro-level UI/UX design principles, luxury e-commerce layout patterns, mobile-first responsiveness, and high-conversion frontend engineering standards.

---

## 1. 📐 Visual Hierarchy & Luxury Aesthetics
- **Typography & Font Pairing**:
  - Headings: Elegant serif fonts (`Cormorant Garamond`, `Playfair Display`) with luxury tracking (`tracking-[-0.02em]`) and italic accents.
  - Body & UI Controls: Clean sans-serif fonts (`Plus Jakarta Sans`, `Montserrat`) with strong weight hierarchy (`font-medium`, `font-semibold`, `font-bold`).
- **Color Palette**:
  - Primary Background: Warm studio cream (`#FAF8F5`, `#FAF7F0`, `#F5EFE4`).
  - Primary Text: Deep rich obsidian (`#14110D`, `#0D0B08`).
  - Accent / Gold Monogram: Metallic champagne gold (`#B8863B`, `#C89B5A`, `#D4AF37`).
  - Borders & Cards: Soft translucent borders (`border-black/8`, `border-[#B8863B]/25`) with elevated drop-shadows (`shadow-md`, `shadow-xl`, `shadow-2xl`).

---

## 2. 📱 Mobile-First Layout & Responsiveness
- **Zero Horizontal Overflow**: All containers use `max-w-full overflow-hidden` or explicit responsive padding (`px-4 sm:px-8 lg:px-16`).
- **Touch-Friendly Controls**: Minimum touch target size of 44x44px for buttons, sliders, quantity toggles, and navigation links.
- **Adaptive Multi-Column Grids**:
  - Desktop (>=1024px): 3 or 4 columns (`lg:grid-cols-4`, `lg:grid-cols-3`).
  - Tablet (>=640px): 2 columns (`sm:grid-cols-2`).
  - Mobile (<640px): 1 or 2 columns (`grid-cols-1` or `grid-cols-2` for compact vector cards).
- **Navigation & Bottom Bar Clearance**: Ensure fixed/sticky CTA buttons and mobile footers add bottom padding (`pb-8`) to prevent overlap with floating mobile browser bars.

---

## 3. ⚡ Core Web Vitals & Image Optimization
- **LCP (Largest Contentful Paint)**: Always attach `loading="eager"`, `decoding="async"`, and `fetchPriority="high"` to hero section images.
- **CLS (Cumulative Layout Shift)**: Define explicit aspect ratios (`aspect-[3/2]`, `aspect-[2/3]`, `aspect-square`) on image wrappers to reserve layout space.
- **Uncropped Portrait & Landscape Frames**:
  - Use `object-contain` inside ratio containers when full photographic integrity is required (e.g. photoshoots, bottles, pedestals).
  - Use `object-cover` for background textures and full-bleed ambient covers with appropriate focal offsets (`object-[center_35%]`).

---

## 4. ✨ Micro-Interactions & Conversions
- **Smooth State Transitions**: Apply `transition-all duration-300 ease-out` with hover translations (`hover:-translate-y-1 hover:shadow-xl`) on product cards.
- **Interactive Feedback**: Instant visual response on click/active (`active:scale-95`, `active:bg-[#B8863B]`).
- **Conversion Pill CTAs**: Primary action buttons rendered as high-contrast pill capsules (`rounded-full bg-[#14110D] hover:bg-[#B8863B] text-[#FAF8F5] uppercase tracking-[0.2em]`).
