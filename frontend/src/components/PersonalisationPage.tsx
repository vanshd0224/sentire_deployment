import { useState, useEffect, useRef, useCallback } from "react";

// ── PERFUME DATA ────────────────────────────────────────────────
interface PerfumeOption {
  id: string;
  name: string;
  sub: string;
  image: string;
  price: number;
}

const ATELIER_PERFUMES: PerfumeOption[] = [
  { id: "calantha",   name: "CALANTHA",   sub: "Blooming Florals · Refined Beauty",              image: "/assets/calantha.png",    price: 2499 },
  { id: "deep-crush", name: "DEEP CRUSH", sub: "Lavender & Warm Tobacco Woods",                  image: "/assets/deep-crush.png",  price: 2499 },
  { id: "herrlich",   name: "HERRLICH",   sub: "Fresh Fruits, Bouquet & Dark Chocolate",         image: "/assets/herrlich.png",    price: 2499 },
  { id: "midnight",   name: "MIDNIGHT",   sub: "Blackcurrant, Tuberose & Sensual Vanilla Musk",  image: "/assets/midnight.png",    price: 2499 },
  { id: "mirai",      name: "MIRAI",      sub: "Bright Citrus, Lavender & Earthy Patchouli",     image: "/assets/mirai.png",       price: 2499 },
  { id: "o809",       name: "0809",       sub: "Sichuan Pepper, Earthy Vetiver & Ambroxan",      image: "/assets/o809.png",        price: 2499 },
  { id: "personna",   name: "PERSONNA",   sub: "Mandarin, Black Pepper & Empowering Patchouli",  image: "/assets/personna.png",    price: 2499 },
  { id: "rich",       name: "RICH",       sub: "Opulent Bergamot, Spiced Rose & Velvet Musk",    image: "/assets/rich.png",        price: 2499 },
  { id: "seductive",  name: "SEDUCTIVE",  sub: "Citric Limon, Fresh Lavender & Velvet Amber",    image: "/assets/seductive.png",   price: 2499 },
  { id: "white-oud",  name: "WHITE OUD",  sub: "Smoky Oud, Soothing Lavender & Resinous Amber",  image: "/assets/white-oud.png",   price: 2499 },
  { id: "purple-oud", name: "PURPLE OUD", sub: "Smoky Cambodian Oud, Saffron & Amethyst Rose",   image: "/assets/purple-oud.png",  price: 4999 },
];

const PERSONALISATION_FEE = 2000;

// ── PROPS ────────────────────────────────────────────────────────
interface PersonalisationPageProps {
  onBackToHome: () => void;
  onAddToCart?: (
    product: { id: string; name: string; num?: string; img: string },
    size: number,
    price: number
  ) => void;
  onOpenCart?: () => void;
}

// ── HELPERS ──────────────────────────────────────────────────────
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload  = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// ── COMPONENT ────────────────────────────────────────────────────
export default function PersonalisationPage({
  onBackToHome,
  onAddToCart,
  onOpenCart,
}: PersonalisationPageProps) {
  // ── State
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeOption>(ATELIER_PERFUMES[0]);
  const [engravingText,   setEngravingText]   = useState("");
  const [uploadedSrc,     setUploadedSrc]     = useState<string | null>(null);
  const [uploadedFile,    setUploadedFile]    = useState<string>("");
  const [isPreviewOpen,   setIsPreviewOpen]   = useState(false);
  const [cartAdded,       setCartAdded]       = useState(false);
  const [isDragOver,      setIsDragOver]      = useState(false);

  // ── Refs
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const modalCanvasRef  = useRef<HTMLCanvasElement>(null);
  const fileInputRef    = useRef<HTMLInputElement>(null);
  const bottleImgRef    = useRef<HTMLImageElement | null>(null);
  const uploadedImgRef  = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Load bottle image when selected perfume changes
  useEffect(() => {
    loadImage(selectedPerfume.image).then((img) => {
      bottleImgRef.current = img;
      drawCanvas(canvasRef.current);
    });
  }, [selectedPerfume]);

  // ── Re-draw whenever state changes
  useEffect(() => {
    drawCanvas(canvasRef.current);
  }, [engravingText, uploadedSrc]);

  // ── CANVAS DRAW ──────────────────────────────────────────────
  const drawCanvas = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Dark rich background
    const bg = ctx.createRadialGradient(W * 0.5, H * 0.38, 0, W * 0.5, H * 0.5, W * 0.8);
    bg.addColorStop(0, "rgba(26,18,11,1)");
    bg.addColorStop(0.6, "rgba(13,9,6,1)");
    bg.addColorStop(1, "rgba(5,3,2,1)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Ambient gold glow
    const glow = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.42);
    glow.addColorStop(0, "rgba(200,155,90,0.12)");
    glow.addColorStop(1, "rgba(200,155,90,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    const bottle = bottleImgRef.current;

    if (bottle) {
      // Scale bottle to fit canvas
      const scale = Math.min((W * 0.68) / bottle.width, (H * 0.68) / bottle.height);
      const dw = bottle.width  * scale;
      const dh = bottle.height * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2 - H * 0.03;

      // Drop shadow
      ctx.save();
      ctx.shadowColor   = "rgba(0,0,0,0.75)";
      ctx.shadowBlur    = 48;
      ctx.shadowOffsetY = 24;
      ctx.drawImage(bottle, dx, dy, dw, dh);
      ctx.restore();

      // Subtle mirror reflection
      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.scale(1, -1);
      const reflY = -(dy + dh + dh * 0.22);
      ctx.drawImage(bottle, dx, reflY, dw, dh);
      ctx.restore();

      // Uploaded image on bottle label area
      if (uploadedImgRef.current) {
        const uImg = uploadedImgRef.current;
        const iX = dx + dw * 0.18;
        const iY = dy + dh * 0.22;
        const iW = dw * 0.64;
        const iH = dh * 0.26;
        const cr = 8;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(iX + cr, iY);
        ctx.lineTo(iX + iW - cr, iY);
        ctx.quadraticCurveTo(iX + iW, iY, iX + iW, iY + cr);
        ctx.lineTo(iX + iW, iY + iH - cr);
        ctx.quadraticCurveTo(iX + iW, iY + iH, iX + iW - cr, iY + iH);
        ctx.lineTo(iX + cr, iY + iH);
        ctx.quadraticCurveTo(iX, iY + iH, iX, iY + iH - cr);
        ctx.lineTo(iX, iY + cr);
        ctx.quadraticCurveTo(iX, iY, iX + cr, iY);
        ctx.closePath();
        ctx.clip();
        ctx.globalAlpha = 0.70;
        ctx.drawImage(uImg, iX, iY, iW, iH);
        ctx.restore();

        // Gold border around uploaded image
        ctx.save();
        ctx.strokeStyle = "rgba(200,155,90,0.55)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(iX + cr, iY);
        ctx.lineTo(iX + iW - cr, iY);
        ctx.quadraticCurveTo(iX + iW, iY, iX + iW, iY + cr);
        ctx.lineTo(iX + iW, iY + iH - cr);
        ctx.quadraticCurveTo(iX + iW, iY + iH, iX + iW - cr, iY + iH);
        ctx.lineTo(iX + cr, iY + iH);
        ctx.quadraticCurveTo(iX, iY + iH, iX, iY + iH - cr);
        ctx.lineTo(iX, iY + cr);
        ctx.quadraticCurveTo(iX, iY, iX + cr, iY);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // Engraving text
      if (engravingText.trim()) {
        const cx  = W / 2;
        const cy  = dy + dh * 0.62;
        const fs  = Math.min(dw * 0.105, 32);

        // Thin separator lines
        ctx.save();
        ctx.strokeStyle = "rgba(200,155,90,0.45)";
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx - dw * 0.22, cy - 18); ctx.lineTo(cx + dw * 0.22, cy - 18); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - dw * 0.22, cy + 18); ctx.lineTo(cx + dw * 0.22, cy + 18); ctx.stroke();
        ctx.restore();

        // Gold gradient text
        const tg = ctx.createLinearGradient(cx - dw * 0.3, cy, cx + dw * 0.3, cy);
        tg.addColorStop(0,    "#9a6e2a");
        tg.addColorStop(0.35, "#d8b272");
        tg.addColorStop(0.65, "#c89b5a");
        tg.addColorStop(1,    "#8d5e1a");

        ctx.save();
        ctx.font         = `400 ${fs}px "Cormorant Garamond", "EB Garamond", Georgia, serif`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle    = tg;
        ctx.fillText(engravingText, cx, cy);
        // Depth
        ctx.globalAlpha = 0.20;
        ctx.fillStyle   = "#000";
        ctx.fillText(engravingText, cx + 0.8, cy + 0.8);
        ctx.restore();
      }

    } else {
      // Fallback: draw minimal placeholder silhouette
      drawFallbackBottle(ctx, W, H, engravingText);
    }

    // Marble gradient vignette at bottom
    const vignette = ctx.createLinearGradient(0, H * 0.78, 0, H);
    vignette.addColorStop(0, "rgba(13,9,6,0)");
    vignette.addColorStop(0.5, "rgba(13,9,6,0.65)");
    vignette.addColorStop(1, "rgba(13,9,6,1)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, H * 0.78, W, H * 0.22);

    // Brand text at bottom
    ctx.save();
    ctx.font      = `500 ${W * 0.024}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(200,155,90,0.45)";
    ctx.textAlign = "center";
    ctx.fillText("SENTIRE BY PC · EXTRAIT DE PARFUM · 50ML", W / 2, H * 0.93);
    ctx.restore();
  }, [engravingText, uploadedSrc]);

  function drawFallbackBottle(
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    text: string
  ) {
    const bx = W * 0.32, by = H * 0.10, bw = W * 0.36, bh = H * 0.68;
    const cr = 10;

    const bodyGrad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    bodyGrad.addColorStop(0,    "rgba(28,22,14,1)");
    bodyGrad.addColorStop(0.25, "rgba(52,42,24,1)");
    bodyGrad.addColorStop(0.55, "rgba(80,64,36,1)");
    bodyGrad.addColorStop(1,    "rgba(22,18,10,1)");

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.7)"; ctx.shadowBlur = 32; ctx.shadowOffsetY = 16;
    ctx.beginPath();
    ctx.moveTo(bx + cr, by + bh * 0.14);
    ctx.lineTo(bx + bw - cr, by + bh * 0.14);
    ctx.quadraticCurveTo(bx + bw, by + bh * 0.14, bx + bw, by + bh * 0.14 + cr);
    ctx.lineTo(bx + bw, by + bh - cr);
    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - cr, by + bh);
    ctx.lineTo(bx + cr, by + bh);
    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - cr);
    ctx.lineTo(bx, by + bh * 0.14 + cr);
    ctx.quadraticCurveTo(bx, by + bh * 0.14, bx + cr, by + bh * 0.14);
    ctx.closePath();
    ctx.fillStyle = bodyGrad; ctx.fill();
    ctx.restore();

    // Neck
    const nx = bx + bw * 0.27, nw = bw * 0.46, nh = bh * 0.14;
    const neckG = ctx.createLinearGradient(nx, 0, nx + nw, 0);
    neckG.addColorStop(0, "rgba(35,28,16,1)");
    neckG.addColorStop(0.5, "rgba(110,88,52,1)");
    neckG.addColorStop(1, "rgba(35,28,16,1)");
    ctx.fillStyle = neckG;
    ctx.fillRect(nx, by, nw, nh);

    // Gold cap
    const capG = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    capG.addColorStop(0, "#7a4f10"); capG.addColorStop(0.35, "#d4a055");
    capG.addColorStop(0.65, "#c89b5a"); capG.addColorStop(1, "#6b4412");
    ctx.fillStyle = capG;
    ctx.fillRect(nx - 8, by - 24, nw + 16, 24);

    // Gold border
    ctx.save();
    ctx.strokeStyle = "rgba(200,155,90,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx + cr, by + bh * 0.14);
    ctx.lineTo(bx + bw - cr, by + bh * 0.14);
    ctx.quadraticCurveTo(bx + bw, by + bh * 0.14, bx + bw, by + bh * 0.14 + cr);
    ctx.lineTo(bx + bw, by + bh - cr);
    ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - cr, by + bh);
    ctx.lineTo(bx + cr, by + bh);
    ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - cr);
    ctx.lineTo(bx, by + bh * 0.14 + cr);
    ctx.quadraticCurveTo(bx, by + bh * 0.14, bx + cr, by + bh * 0.14);
    ctx.closePath(); ctx.stroke();
    ctx.restore();

    // Engraving on fallback
    if (text.trim()) {
      const cx = bx + bw / 2;
      const cy = by + bh * 0.55;
      const fs = Math.min(bw * 0.24, 28);

      ctx.save();
      ctx.strokeStyle = "rgba(200,155,90,0.4)"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(bx + bw * 0.12, cy - 16); ctx.lineTo(bx + bw * 0.88, cy - 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + bw * 0.12, cy + 16); ctx.lineTo(bx + bw * 0.88, cy + 16); ctx.stroke();

      const tg = ctx.createLinearGradient(bx, cy, bx + bw, cy);
      tg.addColorStop(0, "#9a6e2a"); tg.addColorStop(0.5, "#d8b272"); tg.addColorStop(1, "#8d5e1a");
      ctx.font = `400 ${fs}px "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = tg;
      ctx.fillText(text, cx, cy);
      ctx.restore();
    }
  }

  // ── FILE UPLOAD ──────────────────────────────────────────────
  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) return;

    setUploadedFile(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setUploadedSrc(src);
      const img = new Image();
      img.onload = () => {
        uploadedImgRef.current = img;
        drawCanvas(canvasRef.current);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  function clearUpload() {
    setUploadedSrc(null);
    setUploadedFile("");
    uploadedImgRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
    drawCanvas(canvasRef.current);
  }

  // ── PREVIEW MODAL ────────────────────────────────────────────
  function openPreview() {
    setIsPreviewOpen(true);
    // Draw modal canvas after render
    setTimeout(() => drawCanvas(modalCanvasRef.current), 50);
  }

  function closePreview() {
    setIsPreviewOpen(false);
  }

  // ── ADD TO CART ──────────────────────────────────────────────
  function handleAddToCart() {
    if (onAddToCart) {
      onAddToCart(
        {
          id:  `${selectedPerfume.id}-personalised`,
          name: `${selectedPerfume.name} (Personalised)`,
          num: "Bespoke",
          img: selectedPerfume.image,
        },
        50,
        selectedPerfume.price + PERSONALISATION_FEE
      );
    }
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 4000);
    if (onOpenCart) onOpenCart();
  }

  const totalPrice = selectedPerfume.price + PERSONALISATION_FEE;
  const charCount  = engravingText.length;
  const MAX_CHARS  = 20;

  return (
    <div className="min-h-screen w-full bg-[#0d0906] text-[#f8f5f1] selection:bg-[#c89b5a] selection:text-black">

      {/* ── HERO INTRO ─────────────────────────────────────────── */}
      <div className="relative border-b border-[#c89b5a]/20 bg-[#0d0906] pt-8 pb-10 text-center overflow-hidden">
        {/* Radial ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(200,155,90,0.09) 0%, transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6">
          {/* Back link */}
          <button
            onClick={onBackToHome}
            className="group mb-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#c89b5a]/70 transition-colors hover:text-[#c89b5a] cursor-pointer"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3 w-3 transition-transform group-hover:-translate-x-0.5">
              <path d="M10 12L4 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Boutique
          </button>

          {/* Eyebrow */}
          <p className="mb-4 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-[0.35em] text-[#c89b5a]">
            <span className="block h-px w-10 bg-gradient-to-r from-transparent via-[#c89b5a] to-transparent" />
            BESPOKE ATELIER
            <span className="block h-px w-10 bg-gradient-to-r from-transparent via-[#c89b5a] to-transparent" />
          </p>

          <h1 className="font-display text-3xl font-light leading-[1.08] tracking-tight text-[#f8f5f1] sm:text-5xl lg:text-6xl">
            Product <em className="font-serif not-italic text-[#c89b5a]">Personalisation</em>
          </h1>

          <p className="mt-4 text-sm font-light leading-relaxed text-[#f8f5f1]/70 sm:text-base">
            Personalise your SENTIRE perfume with photo and name laser engraving.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/40 bg-[#c89b5a]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#c89b5a] shadow-sm">
            <span>✨</span> Personalisation Available Exclusively on 50ML Luxury Flacons
          </div>
        </div>
      </div>

      {/* ── MAIN CONFIGURATOR ─────────────────────────────────── */}
      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">

          {/* ── LEFT: LIVE PREVIEW ─────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-[#c89b5a]/18 bg-[#100c09] shadow-[0_32px_80px_rgba(0,0,0,0.75)]">

              {/* Live preview badge */}
              <div className="flex items-center justify-between border-b border-white/6 px-5 py-3">
                <span className="flex items-center gap-2 rounded-full border border-[#c89b5a]/25 bg-[#c89b5a]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#c89b5a]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c89b5a] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c89b5a]" />
                  </span>
                  LIVE PREVIEW
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-[#f8f5f1]/30">
                  {selectedPerfume.name} · 50ML
                </span>
              </div>

              {/* Canvas */}
              <div className="relative flex items-center justify-center bg-[#0a0704]" style={{ minHeight: 420 }}>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={960}
                  className="w-full object-contain"
                  style={{ maxHeight: 520 }}
                  aria-label="Live personalisation preview"
                />
              </div>

              {/* Specs bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-white/6 px-5 py-3">
                {["SENTIRE BY PC", "EXTRAIT DE PARFUM", "50 ML"].map((s, i) => (
                  <span key={i} className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#f8f5f1]/30">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: CONFIG PANEL ────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Panel card */}
            <div className="rounded-2xl border border-[#c89b5a]/18 bg-[#120e0b]/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-8">

              <div className="mb-7 border-b border-[#c89b5a]/12 pb-6">
                <h2 className="font-display text-2xl font-light text-[#f8f5f1] sm:text-3xl">
                  Personalise
                </h2>
                <p className="mt-1.5 text-sm font-light text-[#f8f5f1]/50">
                  Choose your fragrance, add a name and upload an image.
                </p>
              </div>

              {/* ── FRAGRANCE SELECTOR ─────────────────────────── */}
              <div className="mb-7">
                <label className="mb-3 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#f8f5f1]/50">
                  SELECT FRAGRANCE
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
                  {ATELIER_PERFUMES.map((p) => {
                    const active = selectedPerfume.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPerfume(p)}
                        className={`group relative flex flex-shrink-0 flex-col items-center rounded-xl border px-2 py-2.5 text-center transition-all duration-200 cursor-pointer ${
                          active
                            ? "border-[#c89b5a] bg-[#c89b5a]/12 shadow-[0_0_12px_rgba(200,155,90,0.22)]"
                            : "border-white/8 bg-white/[0.02] hover:border-[#c89b5a]/40 hover:bg-white/[0.05]"
                        }`}
                        style={{ width: 72 }}
                        aria-pressed={active}
                        title={p.name}
                      >
                        <div className="mb-1.5 h-12 w-full rounded-lg bg-gradient-to-b from-[#1c1510] to-[#0d0906] flex items-center justify-center overflow-hidden">
                          <img src={p.image} alt={p.name} className="h-10 w-full object-contain" />
                        </div>
                        <span className={`block w-full truncate text-[8px] font-bold uppercase tracking-wider ${active ? "text-[#c89b5a]" : "text-[#f8f5f1]/60"}`}>
                          {p.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[10px] text-[#f8f5f1]/35">
                  {selectedPerfume.sub} · ₹{selectedPerfume.price.toLocaleString("en-IN")} (50ML)
                  {selectedPerfume.id === "purple-oud" && (
                    <span className="ml-2 rounded-full border border-[#c89b5a]/30 bg-[#c89b5a]/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#c89b5a]">
                      EXCLUSIVE
                    </span>
                  )}
                </p>
              </div>

              {/* ── NAME ENGRAVING ──────────────────────────────── */}
              <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="engravingInput" className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f8f5f1]/50">
                    NAME FOR ENGRAVING
                  </label>
                  <span
                    className={`text-[10px] font-medium tabular-nums transition-colors ${
                      charCount >= MAX_CHARS
                        ? "text-red-400"
                        : charCount >= MAX_CHARS - 4
                        ? "text-[#c89b5a]"
                        : "text-[#f8f5f1]/30"
                    }`}
                  >
                    {charCount} / {MAX_CHARS}
                  </span>
                </div>
                <input
                  id="engravingInput"
                  type="text"
                  value={engravingText}
                  maxLength={MAX_CHARS}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Enter name or text"
                  onChange={(e) => setEngravingText(e.target.value)}
                  className="w-full rounded-lg border border-[#c89b5a]/22 bg-[#070503]/70 px-4 py-3.5 font-serif text-xl text-[#f8f5f1] placeholder:font-sans placeholder:text-sm placeholder:text-[#f8f5f1]/25 focus:border-[#c89b5a] focus:outline-none focus:ring-1 focus:ring-[#c89b5a]/20 transition-all"
                  style={{ fontFamily: '"Cormorant Garamond", "EB Garamond", Georgia, serif', letterSpacing: "0.06em" }}
                />
                <p className="mt-1.5 text-[10px] font-light text-[#f8f5f1]/30">
                  Engraved in elegant serif lettering on the bottle.
                </p>
              </div>

              {/* ── IMAGE UPLOAD ────────────────────────────────── */}
              <div className="mb-7">
                <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#f8f5f1]/50">
                  UPLOAD IMAGE
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="sr-only"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />

                {!uploadedSrc ? (
                  /* Drop zone */
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      const f = e.dataTransfer.files[0];
                      if (f) handleFile(f);
                    }}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all focus-visible:outline-[#c89b5a] ${
                      isDragOver
                        ? "border-[#c89b5a] bg-[#c89b5a]/8"
                        : "border-[#c89b5a]/22 bg-[#070503]/50 hover:border-[#c89b5a]/55 hover:bg-[#c89b5a]/5"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c89b5a]/22 bg-[#c89b5a]/10 text-[#c89b5a]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <polyline points="16 16 12 12 8 16" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#f8f5f1]">Drag &amp; drop your image here</p>
                      <p className="mt-0.5 text-xs text-[#f8f5f1]/40">or <span className="text-[#c89b5a] underline">browse files</span> · PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  /* Uploaded state */
                  <div className="flex items-center gap-4 rounded-xl border border-[#c89b5a]/30 bg-[#c89b5a]/6 px-4 py-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={uploadedSrc}
                        alt="Your upload"
                        className="h-14 w-14 rounded-lg border border-[#c89b5a]/50 object-cover"
                      />
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#120e0b] bg-emerald-500 text-white">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#c89b5a]">YOUR IMAGE</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-[#f8f5f1]">{uploadedFile}</p>
                      <div className="mt-1.5 flex gap-3">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[10px] font-semibold text-[#c89b5a] underline underline-offset-2 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          onClick={clearUpload}
                          className="text-[10px] font-semibold text-red-400/80 underline underline-offset-2 cursor-pointer hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-2 text-[10px] font-light text-[#f8f5f1]/25">
                  🔒 Images are used only for personalisation and never stored.
                </p>
              </div>

              {/* ── PRICE SUMMARY ───────────────────────────────── */}
              <div className="mb-6 rounded-xl border border-[#c89b5a]/12 bg-[#c89b5a]/4 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#f8f5f1]/45">
                    FRAGRANCE
                  </span>
                  <span className="text-sm font-medium text-[#f8f5f1]">
                    ₹{selectedPerfume.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#f8f5f1]/45">
                    PERSONALISATION FEE
                  </span>
                  <span className="text-sm font-medium text-[#f8f5f1]">
                    ₹{PERSONALISATION_FEE.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="my-3 h-px bg-[#c89b5a]/12" />
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f8f5f1]">
                    TOTAL
                  </span>
                  <span
                    className="font-display text-2xl font-semibold text-[#c89b5a]"
                    style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
                  >
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* ── CTA BUTTONS ─────────────────────────────────── */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={openPreview}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#c89b5a]/35 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c89b5a] transition-all hover:border-[#c89b5a] hover:bg-[#c89b5a]/8 cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  PREVIEW DESIGN
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#c89b5a] via-[#d8b272] to-[#c89b5a] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_8px_24px_rgba(200,155,90,0.28)] transition-all hover:shadow-[0_12px_32px_rgba(200,155,90,0.42)] hover:-translate-y-px active:translate-y-0 cursor-pointer"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  ADD PERSONALISED PRODUCT TO CART
                </button>
              </div>

              {/* Success state */}
              {cartAdded && (
                <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Added to cart — your bespoke bottle awaits.
                </div>
              )}
            </div>

            {/* ── BENEFITS STRIP ──────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: (
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  ),
                  label: "CRAFTED FOR YOU",
                },
                {
                  icon: (
                    <>
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </>
                  ),
                  label: "BESPOKE FINISH",
                },
                {
                  icon: (
                    <>
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </>
                  ),
                  label: "SECURE DELIVERY",
                },
                {
                  icon: (
                    <>
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 .49-4.47" />
                    </>
                  ),
                  label: "30-DAY RETURNS",
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2.5 rounded-xl border border-[#c89b5a]/10 bg-[#0d0906]/80 px-3 py-4 text-center"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c89b5a]/20 bg-[#c89b5a]/8 text-[#c89b5a]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      {b.icon}
                    </svg>
                  </div>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider text-[#f8f5f1]/55">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      {/* ── PREVIEW MODAL ─────────────────────────────────────── */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Design preview"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/88 backdrop-blur-md"
            onClick={closePreview}
          />

          {/* Modal panel */}
          <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 overflow-y-auto rounded-2xl border border-[#c89b5a]/22 bg-[#120e0b] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.85)]" style={{ maxHeight: "90vh", animation: "modalIn 0.28s cubic-bezier(.22,.68,0,1)" }}>

            <button
              onClick={closePreview}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f8f5f1]/50 transition-all hover:border-[#c89b5a]/40 hover:text-[#c89b5a] cursor-pointer"
              aria-label="Close preview"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="m5 5 14 14M19 5 5 19" />
              </svg>
            </button>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a]">
              BESPOKE DESIGN PREVIEW
            </p>

            <div className="w-full overflow-hidden rounded-xl border border-[#c89b5a]/18">
              <canvas
                ref={modalCanvasRef}
                width={800}
                height={960}
                className="w-full object-contain"
                aria-label="Full design preview"
              />
            </div>

            <div className="text-center">
              <p
                className="text-2xl text-[#c89b5a]"
                style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: "0.06em" }}
              >
                {engravingText.trim() || "—"}
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f8f5f1]/30">
                SENTIRE BY PC · EXTRAIT DE PARFUM · 50ML
              </p>
            </div>

            <button
              onClick={() => { closePreview(); setTimeout(handleAddToCart, 200); }}
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#c89b5a] via-[#d8b272] to-[#c89b5a] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_8px_24px_rgba(200,155,90,0.28)] transition-all hover:shadow-[0_12px_32px_rgba(200,155,90,0.42)] cursor-pointer"
            >
              ADD PERSONALISED PRODUCT TO CART
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}
