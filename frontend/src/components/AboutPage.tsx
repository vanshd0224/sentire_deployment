import { useEffect, useState, useRef, useTransition } from "react";

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToPerfumes: () => void;
  onOpenBundleModal?: () => void;
  onNavigate?: (page: string) => void;
}

// Scent note data for Interactive Alchemy Lab
interface ScentNote {
  name: string;
  family: string;
  origin: string;
  description: string;
  freshness: number;
  warmth: number;
  longevity: number;
  projection: number;
  color: string;
  tag: string;
}

const TOP_NOTES: ScentNote[] = [
  {
    name: "Italian Bergamot",
    family: "Citrus Luminous",
    origin: "Reggio Calabria, Italy",
    description: "Cold-pressed sun-ripened citrus oil with crisp, sparkling top facet.",
    freshness: 95,
    warmth: 20,
    longevity: 45,
    projection: 80,
    color: "#e5c158",
    tag: "Calantha / Mirai / White Oud",
  },
  {
    name: "Ozonic Sea Air",
    family: "Aquatic Mineral",
    origin: "Coastal Riviera",
    description: "Electrifying fresh marine breeze accord that instantly lifts the spirits.",
    freshness: 100,
    warmth: 15,
    longevity: 40,
    projection: 85,
    color: "#60a5fa",
    tag: "O809 / Personna / Dapper",
  },
  {
    name: "Saffron Flower",
    family: "Exotic Spice",
    origin: "Kashmir Valley, India",
    description: "Golden red stigmas imparting leathered floral warmth and regal radiance.",
    freshness: 60,
    warmth: 85,
    longevity: 70,
    projection: 75,
    color: "#f59e0b",
    tag: "Rich / Purple Oud / PC Leather",
  },
];

const HEART_NOTES: ScentNote[] = [
  {
    name: "Damask & Grasse Rose",
    family: "Velvet Floral",
    origin: "Grasse, France",
    description: "Hand-picked dawn rose petals delivering romantic, honeyed floral depth.",
    freshness: 70,
    warmth: 65,
    longevity: 80,
    projection: 85,
    color: "#f43f5e",
    tag: "Seductive / Herrlich / Calantha",
  },
  {
    name: "Night Jasmine",
    family: "White Floral",
    origin: "Madurai, Tamil Nadu",
    description: "Intoxicating, luminous jasmine blooming under midnight moonlight.",
    freshness: 75,
    warmth: 55,
    longevity: 75,
    projection: 90,
    color: "#e2e8f0",
    tag: "Midnight / Sent-Aura / Deep Crush",
  },
  {
    name: "Amethyst Violet Petals",
    family: "Powdery Floral",
    origin: "Provence, France",
    description: "Silky powdery violet accord adding sophisticated velvet elegance.",
    freshness: 65,
    warmth: 60,
    longevity: 70,
    projection: 70,
    color: "#c084fc",
    tag: "Purple Oud / Personna",
  },
];

const BASE_NOTES: ScentNote[] = [
  {
    name: "Assam Wild Oud Resin",
    family: "Oriental Wood",
    origin: "Upper Assam, India",
    description: "Rare 30-year aged resinous oud wood delivering profound smoky mystery.",
    freshness: 20,
    warmth: 100,
    longevity: 100,
    projection: 95,
    color: "#c89b5a",
    tag: "White Oud / Purple Oud / Seductive",
  },
  {
    name: "Mysore Sandalwood",
    family: "Sacred Creamy Wood",
    origin: "Karnataka, India",
    description: "Silky, buttery sandalwood providing grounding spiritual warmth.",
    freshness: 30,
    warmth: 90,
    longevity: 95,
    projection: 75,
    color: "#d97706",
    tag: "Deep Crush / Rich / Vanaco",
  },
  {
    name: "Smoked Amber Resin",
    family: "Bespoke Amber",
    origin: "Middle East",
    description: "Golden fossilized amber resin infused with Madagascar vanilla bean.",
    freshness: 25,
    warmth: 95,
    longevity: 90,
    projection: 80,
    color: "#b45309",
    tag: "Herrlich / Rich / Le Chocolat",
  },
];

export default function AboutPage({
  onBackToHome,
  onNavigateToPerfumes,
  onOpenBundleModal,
  onNavigate,
}: AboutPageProps) {
  const [, startTransition] = useTransition();
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeNoteCategory, setActiveNoteCategory] = useState<"top" | "heart" | "base">("base");
  const [selectedNote, setSelectedNote] = useState<ScentNote>(BASE_NOTES[0]);
  
  // Extrait Concentration Interactive Slider State (12% to 30%)
  const [concentration, setConcentration] = useState<number>(35);
  
  // Audio Ambience Soundscape State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Founder view tab
  const [founderTab, setFounderTab] = useState<"vision" | "craft">("vision");

  // Handle smooth scroll & active chapter tracking
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);

      // Node tracking based on section IDs
      const sections = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveChapter(i + 1);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio API Ambience Synthesizer (Luxury Scent Soundscape)
  const toggleSoundscape = () => {
    if (isAudioPlaying) {
      // Stop audio
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          setIsAudioPlaying(false);
        }, 1000);
      } else {
        setIsAudioPlaying(false);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);
        gainNodeRef.current = gain;

        // Warm ambient drone oscillators (A2 110Hz + E3 164.81Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm root

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3 perfect fifth

        // Gentle LFO filter for breathing effect
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;

        setIsAudioPlaying(true);
      } catch (err) {
        console.error("Audio synthesis error:", err);
      }
    }
  };

  const scrollToSection = (sectionId: string, chapterNo: number) => {
    setActiveChapter(chapterNo);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeNotesList =
    activeNoteCategory === "top" ? TOP_NOTES : activeNoteCategory === "heart" ? HEART_NOTES : BASE_NOTES;

  return (
    <div className="min-h-screen w-full bg-[#0d0906] text-[#f8f5f1] selection:bg-[#c89b5a] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* ── STICKY HIGH-TECH CHAPTER HUD & PROGRESS BAR ── */}
      <div className="sticky top-16 z-40 w-full border-b border-[#c89b5a]/30 bg-black/90 backdrop-blur-2xl py-3 px-4 md:px-8 shadow-2xl transition-all">
        {/* Progress Bar Line */}
        <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#c89b5a] via-[#e5c158] to-[#c89b5a] transition-all duration-300 shadow-[0_0_10px_#c89b5a]" style={{ width: `${scrollProgress}%` }} />
        
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-2.5 w-2.5 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-[#c89b5a] animate-ping" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#c89b5a]">
              HOUSE TELEMETRY <span className="hidden sm:inline text-white/40">| CH.0{activeChapter} OF 07</span>
            </span>
          </div>

          {/* Chapter Quick Nav Nodes */}
          <div className="hidden lg:flex items-center gap-1.5">
            {[
              { id: "ch1", no: 1, label: "01 Conviction" },
              { id: "ch2", no: 2, label: "02 Founder" },
              { id: "ch3", no: 3, label: "03 35% Extrait" },
              { id: "ch4", no: 4, label: "04 Olfactory Lab" },
              { id: "ch5", no: 5, label: "05 Kannauj Alchemy" },
              { id: "ch6", no: 6, label: "06 Wardrobe" },
              { id: "ch7", no: 7, label: "07 Manifesto" },
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => scrollToSection(node.id, node.no)}
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeChapter === node.no
                    ? "bg-[#c89b5a] text-black border-[#c89b5a] shadow-[0_0_15px_rgba(200,155,90,0.5)] scale-105"
                    : "bg-white/5 text-[#f8f5f1]/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-[#c89b5a]/40"
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>

          {/* Ambience Audio Synthesizer Button */}
          <button
            onClick={toggleSoundscape}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              isAudioPlaying
                ? "border-[#c89b5a] bg-[#c89b5a]/20 text-[#e5c158] shadow-[0_0_12px_rgba(229,193,88,0.4)]"
                : "border-white/20 bg-white/5 text-white/70 hover:border-[#c89b5a]/50 hover:text-white"
            }`}
            title="Toggle Sensory Olfactory Ambience Soundscape"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span className={`w-0.5 bg-current rounded-full transition-all ${isAudioPlaying ? "h-3 animate-bounce" : "h-1"}`} />
              <span className={`w-0.5 bg-current rounded-full transition-all ${isAudioPlaying ? "h-2 animate-bounce delay-75" : "h-1.5"}`} />
              <span className={`w-0.5 bg-current rounded-full transition-all ${isAudioPlaying ? "h-3.5 animate-bounce delay-150" : "h-2"}`} />
            </span>
            <span>{isAudioPlaying ? "Ambience Active" : "Olfactory Soundscape"}</span>
          </button>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center lg:px-12">
        {/* Chromatic Glow Aura Background */}
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105" style={{ backgroundImage: "url('/images/hero-bg.png')" }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,rgba(200,155,90,0.18)_0%,rgba(13,9,6,0.98)_85%)]" />

        {/* Dynamic Morphing Golden Orbs */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(200,155,90,0.25)_0%,transparent_70%)] blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute bottom-10 right-10 h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(229,193,88,0.15)_0%,transparent_75%)] blur-2xl" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Back Button */}
          <button
            onClick={onBackToHome}
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/40 bg-black/60 backdrop-blur-md px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] transition-all duration-300 hover:border-[#c89b5a] hover:bg-[#c89b5a] hover:text-black cursor-pointer shadow-lg"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1">
              <path d="M10 12L4 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Return to Boutique
          </button>

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/30 bg-[#c89b5a]/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e5c158] shadow-[0_0_20px_rgba(200,155,90,0.2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e5c158]" />
            HAUTE PARFUMERIE DOSSIER • JAIPUR 2023
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            The Science of Emotion, <br />
            <span className="bg-gradient-to-r from-[#c89b5a] via-[#f8f5f1] to-[#e5c158] bg-clip-text text-transparent italic">
              The Alchemy of Oud
            </span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#f8f5f1]/80 leading-relaxed font-light mb-10">
            Founded in Jaipur by entrepreneur Pranav Chaudhary, <strong className="text-white font-medium">SENTIRE By PC</strong> redefines niche perfumery. We synthesize French floral distillation with rare Indian Oud resins at an uncompromising <span className="text-[#e5c158] font-semibold">35%+ Extrait de Parfum</span> concentration.
          </p>

          {/* Live Telemetry Ticker Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl mb-12">
            {[
              { stat: "35%", label: "Extrait Oil Concentration", sub: "Highest Industry Tier" },
              { stat: "100%", label: "Wild Indian Assam Oud", sub: "Ethically Harvested" },
              { stat: "24+ Hrs", label: "Skin Projection Radius", sub: "Unrivaled Longevity" },
              { stat: "4,200+", label: "Verified 5-Star Reviews", sub: "Pan-India Devotees" },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 text-center transition-all duration-300 hover:border-[#c89b5a]/60 hover:bg-white/[0.07] hover:-translate-y-1 shadow-xl"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#e5c158] font-serif tracking-tight group-hover:scale-105 transition-transform">
                  {card.stat}
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">{card.label}</div>
                <div className="text-[9px] text-white/50 tracking-wider uppercase mt-0.5">{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Scroll Down Trigger */}
          <button
            onClick={() => scrollToSection("ch1", 1)}
            className="group flex flex-col items-center gap-2 text-white/50 hover:text-[#c89b5a] transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Begin Telemetry Journey</span>
            <div className="flex h-8 w-5 items-center justify-center rounded-full border border-white/20 group-hover:border-[#c89b5a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c89b5a] animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* ── CHAPTER 01: CONVICTION & ETYMOLOGY ── */}
      <section id="ch1" className="relative w-full border-t border-white/10 bg-[#080503] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 01</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">
            Latin Genesis: What It Means to <span className="italic text-[#e5c158]">Feel</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-[#f8f5f1]/80 text-sm sm:text-base leading-relaxed font-light">
              <p>
                The name <strong className="text-[#e5c158] font-semibold">"SENTIRE"</strong> originates from the ancient Latin verb meaning <em>to feel, to perceive through senses, or to experience emotionally</em>. Scent is the only human sense directly wired into the brain’s limbic system—the seat of memory, passion, and instinct.
              </p>
              <p>
                We do not create perfumes merely to smell pleasant. We engineer scent armors that announce your presence before you speak and leave a memorable echo long after you have departed the room.
              </p>
              
              <div className="p-6 rounded-2xl border border-[#c89b5a]/30 bg-[radial-gradient(ellipse_at_top_left,rgba(200,155,90,0.12)_0%,transparent_70%)] backdrop-blur-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-[#c89b5a] mb-2">FOUNDER'S CORE CONVICTION</div>
                <blockquote className="font-serif text-lg sm:text-xl italic text-white leading-snug">
                  "Luxury perfumery in India was broken—split between cheap short-lived synthetic sprays and hyper-inflated foreign designer brands. We created SENTIRE to deliver uncompromised 35% Extrait craftsmanship."
                </blockquote>
                <div className="text-xs font-bold text-white/70 mt-3">— Pranav Chaudhary ("PC"), Founder &amp; Visionary</div>
              </div>
            </div>

            {/* 3 Pillars Glass Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {[
                { title: "Sensory Perception", desc: "Formulated with 35%+ pure essence oils reacting dynamically with your skin lipids." },
                { title: "Empathy in Craft", desc: "Sourced directly from sustainable harvesters in Assam, Kannauj, Grasse & Calabria." },
                { title: "Everyday Signature", desc: "Luxury made accessible without multi-tier middleman distributor markups." },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#c89b5a]/50 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c89b5a]/20 text-xs font-bold text-[#e5c158]">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-white/70 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 02: JAIPUR 2023 & FOUNDER'S STORY ── */}
      <section id="ch2" className="relative w-full border-t border-white/10 bg-[#0d0906] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 02</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">
            Born in Jaipur, <span className="italic text-[#e5c158]">December 2022</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Founder Dossier Card */}
            <div className="lg:col-span-5 rounded-3xl border border-[#c89b5a]/40 bg-[linear-gradient(145deg,rgba(200,155,90,0.15)_0%,rgba(13,9,6,0.95)_100%)] p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-[#c89b5a]/10 blur-3xl" />
              
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/30 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#e5c158] mb-6">
                  FOUNDER PROFILE • S P VENTURES
                </div>
                <h3 className="font-serif text-3xl font-bold text-white mb-2">Pranav Chaudhary</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-[#c89b5a] mb-6">Creator &amp; Master Strategist ("PC")</p>

                {/* Perspective Tabs */}
                <div className="flex rounded-xl bg-black/50 p-1 border border-white/10 mb-6">
                  <button
                    onClick={() => startTransition(() => setFounderTab("vision"))}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      founderTab === "vision" ? "bg-[#c89b5a] text-black shadow" : "text-white/60 hover:text-white"
                    }`}
                  >
                    The Origin
                  </button>
                  <button
                    onClick={() => startTransition(() => setFounderTab("craft"))}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      founderTab === "craft" ? "bg-[#c89b5a] text-black shadow" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Engineering Mind
                  </button>
                </div>

                {founderTab === "vision" ? (
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-6">
                    While still pursuing his university education in Jaipur, Pranav recognized a striking anomaly. Millions of Indian fragrance enthusiasts were forced to settle for short-lived synthetic sprays or pay astronomical tariffs for European luxury brands. He founded S P Ventures in December 2022 to engineer high-concentration Extrait formulations in Jaipur.
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-6">
                    Combining design thinking with motorsport automotive precision, Pranav treated fragrance creation like aerodynamic engineering. Every note ratio, oil viscosity, and atomization spray pattern is calculated for maximum thermodynamic diffusion on human skin.
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40">HEADQUARTERS</span>
                <span className="text-xs font-bold text-[#e5c158]">Jaipur, Rajasthan (302016)</span>
              </div>
            </div>

            {/* Story Timeline Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
              {[
                { year: "DEC 2022", title: "Genesis in Pink City", detail: "S P Ventures established in Jaipur, initiating 14 months of rigorous raw material testing with French & Indian scent alchemists." },
                { year: "MID 2023", title: "The Kannauj & Grasse Bridge", detail: "Formed direct sourcing agreements with heritage wood-fired stills in Kannauj for Wild Assam Oud & rose absolutes." },
                { year: "LATE 2023", title: "The 21 Formulations", detail: "Finalized the core 21 Extrait de Parfum lineup, spanning Calantha, White Oud, Deep Crush, Herrlich, and Rich." },
                { year: "PRESENT", title: "Pan-India Luxury Cult", detail: "Over 4,200+ verified 5-star customer reviews, serving fragrance connoisseurs across all 28 Indian states." },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl flex gap-4 items-start transition-all hover:border-[#c89b5a]/40 hover:bg-white/[0.05]"
                >
                  <div className="rounded-xl border border-[#c89b5a]/30 bg-[#c89b5a]/10 px-3 py-1.5 text-xs font-bold text-[#e5c158] whitespace-nowrap">
                    {step.year}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-xs text-white/70 font-light leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 03: THE 35% EXTRAIT OBSESSION (INTERACTIVE SLIDER) ── */}
      <section id="ch3" className="relative w-full border-t border-white/10 bg-[#080503] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 03</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            The Extrait Standard: <span className="italic text-[#e5c158]">Interactive Ion Density Meter</span>
          </h2>
          <p className="text-sm text-white/70 max-w-2xl font-light mb-12">
            Slide the concentration control below to visualize how fragrance oil density directly impacts skin projection radius, sillage aura, and wear longevity.
          </p>

          {/* Interactive Density Simulator Box */}
          <div className="rounded-3xl border border-[#c89b5a]/40 bg-black/60 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Controls Column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="concentration-slider" className="text-xs font-bold uppercase tracking-widest text-[#c89b5a]">
                      Fragrance Oil Concentration Tier
                    </label>
                    <span className="text-2xl font-bold font-serif text-[#e5c158]">{concentration}%</span>
                  </div>

                  {/* Range Slider */}
                  <input
                    id="concentration-slider"
                    aria-label="Fragrance Oil Concentration Tier"
                    type="range"
                    min={10}
                    max={30}
                    step={1}
                    value={concentration}
                    onChange={(e) => setConcentration(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c89b5a]"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1 uppercase font-bold">
                    <span>10% Eau de Toilette</span>
                    <span>15% Eau de Parfum</span>
                    <span className="text-[#e5c158]">35%+ SENTIRE Extrait</span>
                    <span>35% Pure Essence</span>
                  </div>
                </div>

                {/* Dynamic Metrics Output */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Longevity</div>
                    <div className="text-lg font-bold font-serif text-white mt-1">
                      {concentration < 15 ? "3-5 Hours" : concentration < 20 ? "6-8 Hours" : "18-24+ Hours"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Sillage Radius</div>
                    <div className="text-lg font-bold font-serif text-white mt-1">
                      {concentration < 15 ? "0.5 Meter" : concentration < 20 ? "1.5 Meters" : "3+ Meters"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3 text-center">
                    <div className="text-[10px] text-white/50 uppercase font-bold">Resin Purity</div>
                    <div className="text-lg font-bold font-serif text-white mt-1">
                      {concentration < 35 ? "Standard" : "Haute Grade"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Particle Density Preview */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d0906] p-8 text-center relative overflow-hidden min-h-[260px]">
                {/* Dynamic Glowing Rings based on concentration */}
                <div
                  className="absolute rounded-full border border-[#c89b5a]/40 transition-all duration-500 animate-ping"
                  style={{
                    width: `${concentration * 8}px`,
                    height: `${concentration * 8}px`,
                    opacity: concentration / 50,
                  }}
                />
                <div
                  className="absolute rounded-full bg-[radial-gradient(circle,rgba(200,155,90,0.35)_0%,transparent_70%)] transition-all duration-300"
                  style={{
                    width: `${concentration * 10}px`,
                    height: `${concentration * 10}px`,
                  }}
                />

                <div className="relative z-10">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#c89b5a] mb-2">
                    {concentration >= 35 ? "★ SENTIRE EXTRAIT THRESHOLD ACHIEVED" : "STANDARD COMMERCE CONCENTRATION"}
                  </div>
                  <div className="font-serif text-2xl font-bold text-white mb-2">
                    {concentration >= 35 ? "Unrivaled Scent Signature" : "Short-lived Surface Spray"}
                  </div>
                  <p className="text-xs text-[#f8f5f1]/80 font-light max-w-sm">
                    {concentration >= 35
                      ? "At 35%+ oil concentration, natural oud resins bond deeply with skin lipids to release evolving olfactory accords for up to 24 hours."
                      : "Lower oil concentration results in high alcohol evaporation, losing subtle heart and base notes within hours."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 04: THE OLFACTORY CRAFT & NOTE ALCHEMY LAB ── */}
      <section id="ch4" className="relative w-full border-t border-white/10 bg-[#0d0906] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 04</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Interactive Olfactory <span className="italic text-[#e5c158]">Alchemy Lab</span>
          </h2>
          <p className="text-sm text-white/70 max-w-2xl font-light mb-10">
            Explore our ethically sourced global botanicals, wild harvested oud resins, and French floral absolutes. Select a note tier below to inspect ingredient telemetry.
          </p>

          {/* Note Category Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { id: "top", label: "Top Notes (0 - 30 Mins)" },
              { id: "heart", label: "Heart Notes (1 - 6 Hours)" },
              { id: "base", label: "Base Notes (6 - 24+ Hours)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const cat = tab.id as "top" | "heart" | "base";
                  startTransition(() => {
                    setActiveNoteCategory(cat);
                    setSelectedNote(cat === "top" ? TOP_NOTES[0] : cat === "heart" ? HEART_NOTES[0] : BASE_NOTES[0]);
                  });
                }}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  activeNoteCategory === tab.id
                    ? "bg-[#c89b5a] text-black border-[#c89b5a] shadow-[0_0_15px_rgba(200,155,90,0.4)]"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-[#c89b5a]/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Note Selector Buttons */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              {activeNotesList.map((note, idx) => (
                <button
                  key={idx}
                  onClick={() => startTransition(() => setSelectedNote(note))}
                  className={`group rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                    selectedNote.name === note.name
                      ? "border-[#c89b5a] bg-white/[0.08] shadow-[0_0_20px_rgba(200,155,90,0.25)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-lg font-bold text-white group-hover:text-[#e5c158] transition-colors">
                      {note.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c89b5a]">
                      {note.family}
                    </span>
                  </div>
                  <div className="text-xs text-white/50">{note.origin}</div>
                </button>
              ))}
            </div>

            {/* Selected Note Telemetry Detail Card */}
            <div className="lg:col-span-7 rounded-3xl border border-[#c89b5a]/40 bg-black/80 p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#c89b5a]">
                    INGREDIENT ORIGIN &amp; RADAR
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white mt-1">{selectedNote.name}</h3>
                </div>
                <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#e5c158]">
                  {selectedNote.origin}
                </span>
              </div>

              <p className="text-sm text-white/80 font-light leading-relaxed mb-8">
                {selectedNote.description}
              </p>

              {/* Intensity Radar Bars */}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Freshness / Sparkle", val: selectedNote.freshness },
                  { label: "Warmth & Resin Depth", val: selectedNote.warmth },
                  { label: "Skin Longevity (Hours)", val: selectedNote.longevity },
                  { label: "Projection Radius", val: selectedNote.projection },
                ].map((bar, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                      <span>{bar.label}</span>
                      <span className="text-[#e5c158] font-bold">{bar.val}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#c89b5a] to-[#e5c158] transition-all duration-500 shadow-[0_0_10px_#c89b5a]"
                        style={{ width: `${bar.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
                <span className="text-xs text-white/60 font-medium">FEATURED IN SIGNATURE PERFUMES:</span>
                <span className="text-xs font-bold text-[#e5c158]">{selectedNote.tag}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 05: KANNAUJ WOOD-FIRED ALCHEMY ── */}
      <section id="ch5" className="relative w-full border-t border-white/10 bg-[#080503] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 05</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-6">
            Kannauj Craftsmanship: <span className="italic text-[#e5c158]">The Deg &amp; Bhapka Legacy</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 text-[#f8f5f1]/80 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Known as the <em>Grasse of the East</em>, Kannauj has preserved copper-still hydro-distillation for over 400 years. Artisans heat copper cauldrons (<em>Degs</em>) over wood fires, capturing delicate floral steam inside receiver vessels (<em>Bhapka</em>) cooled by underwater tanks.
              </p>
              <p>
                SENTIRE combines this timeless Indian hydro-distillation method with modern French cold-filtration techniques. The result is pure, crystal-clear Extrait formulations that retain the soul of natural botanical flowers without cloudiness or residue.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl font-serif font-bold text-[#e5c158]">400+ Years</div>
                  <div className="text-xs text-white/60 mt-1">Heritage Distillation Legacy</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-2xl font-serif font-bold text-[#e5c158]">Zero Harm</div>
                  <div className="text-xs text-white/60 mt-1">Ethical Botanical Harvesting</div>
                </div>
              </div>
            </div>

            {/* Distillation Process Steps */}
            <div className="lg:col-span-6 rounded-3xl border border-[#c89b5a]/30 bg-black/60 p-6 md:p-8 backdrop-blur-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#c89b5a] mb-6">DISTILLATION WORKFLOW</div>
              <div className="space-y-6">
                {[
                  { title: "1. Dawn Flower Harvest", text: "Fresh jasmine and roses are picked at dawn before sunrise when oil potency is highest." },
                  { title: "2. Wood-Fired Copper Deg", text: "Botanicals are sealed in copper Degs with natural spring water and heated gently." },
                  { title: "3. Bhapka Condensation", text: "Aromatic steam travels through bamboo pipes into sandalwood or oil receivers." },
                  { title: "4. Cold Extrait Maturation", text: "Essential oils age in dark temperature-controlled glass carboys for 90 days." },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c89b5a] text-black font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">{step.title}</h4>
                      <p className="text-xs text-white/70 font-light mt-0.5 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 06: BESPOKE WARDROBE & PERSONALIZATION ── */}
      <section id="ch6" className="relative w-full border-t border-white/10 bg-[#0d0906] py-24 px-6 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89b5a]">CHAPTER 06</span>
            <span className="h-[1px] w-12 bg-[#c89b5a]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Tailored Luxury: <span className="italic text-[#e5c158]">Bespoke Personalization</span>
          </h2>
          <p className="text-sm text-white/70 max-w-2xl font-light mb-12">
            Luxury is not one-size-fits-all. SENTIRE puts personalization at the heart of your scent journey with custom laser engraving, AI matchmakers, and wardrobe bundling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Laser Bottle Engraving */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#c89b5a]/60 hover:bg-white/[0.06] hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c89b5a]/10 text-[#e5c158] mb-6 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Laser Bottle Engraving</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  Engrave your name, anniversary date, or personalized monogram directly onto our weighted luxury glass bottles.
                </p>
              </div>
              <button
                onClick={() => onNavigate?.("personalisation")}
                className="w-full rounded-xl border border-[#c89b5a]/40 bg-[#c89b5a]/10 py-2.5 text-xs font-bold uppercase tracking-wider text-[#e5c158] transition-all hover:bg-[#c89b5a] hover:text-black cursor-pointer"
              >
                Personalize Bottle
              </button>
            </div>

            {/* Feature 2: AI Signature Scent Concierge */}
            <div className="group rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#c89b5a]/60 hover:bg-white/[0.06] hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c89b5a]/10 text-[#e5c158] mb-6 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">AI Scent Matchmaker</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  Answer 3 quick questions about your mood, persona, and occasion to discover your ideal Extrait fragrance match.
                </p>
              </div>
              <button
                onClick={() => onNavigate?.("personalisation")}
                className="w-full rounded-xl border border-[#c89b5a]/40 bg-[#c89b5a]/10 py-2.5 text-xs font-bold uppercase tracking-wider text-[#e5c158] transition-all hover:bg-[#c89b5a] hover:text-black cursor-pointer"
              >
                Start Scent Quiz
              </button>
            </div>

            {/* Feature 3: Build Your Own Bundle (BYOB) */}
            <div className="group rounded-3xl border border-[#c89b5a]/40 bg-[radial-gradient(ellipse_at_top_left,rgba(200,155,90,0.15)_0%,transparent_70%)] p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#c89b5a] hover:-translate-y-1 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c89b5a] text-black mb-6 group-hover:scale-110 transition-transform font-bold">
                  ₹300
                </div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#e5c158] mb-1">AUTOMATED SAVINGS</div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">Build Your Scent Wardrobe</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  Curate 3 perfumes across our 21 Extrait scents (Work Citrus, Evening Amber, Night Oud) and instantly save ₹300.
                </p>
              </div>
              <button
                onClick={() => onNavigate?.("byob")}
                className="w-full rounded-xl bg-[#c89b5a] py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#e5c158] shadow-[0_0_15px_rgba(200,155,90,0.4)] cursor-pointer"
              >
                Curate 3-Bottle Set
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 07: HOUSE MANIFESTO & CLIMAX CTAS ── */}
      <section id="ch7" className="relative w-full border-t border-white/10 bg-[#080503] py-24 px-6 lg:px-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c89b5a]/30 bg-[#c89b5a]/10 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#e5c158] mb-6">
            CHAPTER 07 • THE HOUSE MANIFESTO
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            "Luxury should not be reserved for rare moments; it should be your <span className="italic text-[#e5c158]">everyday signature</span>."
          </h2>

          <div className="rounded-3xl border border-[#c89b5a]/40 bg-black/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl mb-12 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#c89b5a]/10 rounded-full blur-3xl" />

            <div className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-8">
              <p>
                We believe that true luxury lies in unyielding quality, master craftsmanship, and authenticity. We reject mass-market compromises, water-diluted body sprays, and inflated designer price tags.
              </p>
              <p>
                Every drop of SENTIRE Extrait de Parfum is blended in India, housing natural wild Assam oud, hand-picked Grasse roses, and luminous Italian bergamot. When you wear SENTIRE, you wear a testament to Indian heritage and international luxury.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <div className="font-serif text-xl font-bold text-white">Pranav Chaudhary</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#c89b5a]">Founder &amp; Visionary, SENTIRE By PC</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-white/50">Jaipur, Rajasthan</div>
                <div className="text-[10px] text-[#e5c158] uppercase tracking-widest font-bold">EST. DEC 2022</div>
              </div>
            </div>
          </div>

          {/* Climax Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToPerfumes}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#c89b5a] to-[#e5c158] px-8 py-4 text-xs font-extrabold uppercase tracking-[0.25em] text-black shadow-[0_0_25px_rgba(200,155,90,0.5)] transition-all hover:scale-105 cursor-pointer"
            >
              Explore 21 Extrait Scents
            </button>
            <button
              onClick={() => onNavigate?.("byob")}
              className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-extrabold uppercase tracking-[0.25em] text-white backdrop-blur-md transition-all hover:border-[#c89b5a] hover:bg-white/10 hover:text-[#e5c158] cursor-pointer"
            >
              Build Custom Discovery Set
            </button>
          </div>
        </div>
      </section>

      {/* Footer copyright indicator */}
      <div className="w-full border-t border-white/10 bg-black py-6 text-center text-[10px] text-white/40 tracking-widest uppercase">
        © SENTIRE BY PC • S P VENTURES • JAIPUR, RAJASTHAN • HAUTE PARFUMERIE
      </div>
    </div>
  );
}
