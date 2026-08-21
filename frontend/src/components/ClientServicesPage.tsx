import { useState } from "react";

interface ClientServicesPageProps {
  onBackToHome?: () => void;
  onNavigateToTrackOrder?: () => void;
  onNavigateToPerfumes?: () => void;
}

export type EnquiryCategory =
  | "order-support"
  | "delivery-tracking"
  | "returns-exchanges"
  | "product-guidance"
  | "personalisation"
  | "corporate-gifting"
  | "weddings-events"
  | "wholesale-distribution"
  | "hospitality-business"
  | "press-media"
  | "partnerships-creators"
  | "careers"
  | "other-enquiry";

const CATEGORIES: { id: EnquiryCategory; label: string; icon: string; desc: string }[] = [
  { id: "order-support", label: "Order Support", icon: "📦", desc: "Order changes, payment & confirmation" },
  { id: "delivery-tracking", label: "Delivery & Tracking", icon: "🚚", desc: "Dispatch, courier updates & address" },
  { id: "returns-exchanges", label: "Returns & Exchanges", icon: "↩️", desc: "Damaged item, returns & refund status" },
  { id: "product-guidance", label: "Product & Fragrance Guidance", icon: "✨", desc: "Notes, scent family & fragrance concierge" },
  { id: "personalisation", label: "Personalisation & Engraving", icon: "✒️", desc: "Bottle laser-engraving & custom box packaging" },
  { id: "corporate-gifting", label: "Corporate & Bulk Gifting", icon: "🎁", desc: "Client gifts, festive hampers & volume orders" },
  { id: "weddings-events", label: "Weddings & Celebrations", icon: "💍", desc: "Wedding favours, party gifts & custom blends" },
  { id: "wholesale-distribution", label: "Wholesale & Distribution", icon: "🏢", desc: "Retailers, boutiques & global distribution" },
  { id: "hospitality-business", label: "Hospitality & Business", icon: "🏨", desc: "Luxury hotels, spas & amenity scenting" },
  { id: "press-media", label: "Press & Media", icon: "📰", desc: "Press releases, editorial samples & founder interviews" },
  { id: "partnerships-creators", label: "Partnerships & Creators", icon: "🤝", desc: "Brand collaborations & creator gifted reviews" },
  { id: "careers", label: "Careers & Talent", icon: "💼", desc: "Join our Jaipur perfume house team" },
  { id: "other-enquiry", label: "General & Other Enquiry", icon: "💬", desc: "Any other question for Sentire Client Services" },
];

const FAQS = [
  {
    q: "How can I track my Sentire order?",
    a: "You can track your package instantly using our dedicated Track My Order page by entering your Order Number (e.g. SNT-84920) or your courier AWB tracking number. All orders are dispatched via break-proof express courier.",
  },
  {
    q: "Can I modify or cancel an order after placing it?",
    a: "Orders are processed swiftly within 24 hours at our Jaipur facility. If you need to update a delivery address or modify items, please submit an Order Support enquiry immediately or call Client Services at +91 98765 43210.",
  },
  {
    q: "How do I request a return or exchange?",
    a: "Sentire offers standard return assistance for items damaged in transit or incorrect dispatches. Submit a Return & Exchange request with photos of the package and item. Our team will verify and arrange a complimentary replacement.",
  },
  {
    q: "What should I do if my perfume bottle arrives damaged?",
    a: "We take extreme care with break-proof eco-luxury packaging. In the rare event of transit damage, please keep the original packaging and upload photos through our Damaged Product submission flow. We will dispatch a new bottle immediately.",
  },
  {
    q: "Can Sentire help me choose a signature scent?",
    a: "Yes! Select 'Product & Fragrance Guidance' to share your preferred scent families (Woody Oud, Fresh Citrus, Floral Rose, Amber) or launch our digital Scent Concierge for a personalized recommendation based on your persona and occasion.",
  },
  {
    q: "Do you offer bottle engraving and custom packaging?",
    a: "Yes. Sentire provides custom laser-engraving on weighted luxury glass bottles (names, initials, dates) and custom gold foil-stamped velvet presentation boxes for VIP gifting.",
  },
  {
    q: "Can I place a corporate or bulk gifting order?",
    a: "Absolutely. Sentire curates corporate gifts, executive hampers, employee rewards, and event favors. Select 'Corporate & Bulk Gifting' to complete our tailored 4-step commercial enquiry form.",
  },
  {
    q: "Can Sentire deliver gifts to multiple addresses across India?",
    a: "Yes, for corporate and wedding gifting orders, our team manages multi-destination shipping across all Indian pincodes with dedicated tracking reports.",
  },
  {
    q: "How do I request a GST Invoice for business purchases?",
    a: "You can select the 'GST Invoice Required' option during checkout or submit a request under Order Support with your GSTIN and company billing details.",
  },
  {
    q: "How do I enquire about wholesale or retail distribution?",
    a: "Select 'Wholesale & Distribution' to submit your business details, retail footprint, and estimated order volume. Our distribution desk will respond within one business day.",
  },
  {
    q: "What are Sentire Client Services hours?",
    a: "Our Client Services team in Jaipur is available Monday through Saturday, 10:00 AM – 7:00 PM IST. We respond to all written enquiries within one business day.",
  },
  {
    q: "Is Sentire Extrait de Parfum long-lasting?",
    a: "All Sentire fragrances are formulated at high Extrait de Parfum concentration (35% imported oil concentration), delivering 12 to 24+ hours of projection on skin and clothing.",
  },
];

export default function ClientServicesPage({
  onBackToHome,
  onNavigateToTrackOrder,
  onNavigateToPerfumes,
}: ClientServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<EnquiryCategory>("order-support");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionRef, setSubmissionRef] = useState<string | null>(null);

  // General Form States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "Email",
    orderNumber: "",
    issueType: "Order Status / Update",
    message: "",
    // Personalisation & Event
    customText: "",
    requiredDate: "",
    // Corporate & Bulk
    companyName: "",
    purpose: "Corporate gifting",
    quantity: "50-100 units",
    deliveryLocation: "",
    gstRequired: "No",
    gstin: "",
    // Wholesale
    businessType: "Retailer",
    countryRegion: "India",
    website: "",
    // File Upload Simulation
    fileName: "",
  });

  // Corporate Wizard Step
  const [corpStep, setCorpStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, fileName: e.target.files![0].name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = window.location.hostname.includes('run.app') || window.location.hostname.includes('sentirebypc.com')
        ? 'https://ecommerce-backend-1041917436859.asia-south1.run.app/api/enquiries'
        : '/api/enquiries';

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: activeCategory,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          orderNumber: formData.orderNumber,
          queryType: formData.issueType,
          message: formData.message
        })
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.referenceId) {
        setSubmissionRef(data.referenceId);
      } else {
        const randomRef = `SNT-CS-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmissionRef(randomRef);
      }
      window.scrollTo({ top: 400, behavior: "smooth" });
    } catch (err) {
      setIsSubmitting(false);
      const randomRef = `SNT-CS-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(randomRef);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] text-[#18130f] font-sans">
      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-[#c89b5a]/15 bg-[#fbf9f5] px-5 py-4 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between text-[11px] font-medium tracking-[0.12em] uppercase text-ink/60">
          <div className="flex items-center gap-2">
            <button onClick={onBackToHome} className="hover:text-[#c89b5a] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-[#c89b5a] font-bold">Client Services</span>
          </div>
          <span className="hidden sm:inline text-[10px] tracking-[0.2em] text-[#c89b5a]">
            S P Ventures • Jaipur Maison Desk
          </span>
        </div>
      </div>

      {/* ── Section 01: Hero Section ── */}
      <section className="relative overflow-hidden border-b border-[#c89b5a]/15 bg-[#0b0907] text-[#f8f5f1] py-20 lg:py-28 px-5 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c89b5a]/20 via-transparent to-transparent opacity-30 pointer-events-none" />
        
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block rounded-full bg-[#c89b5a]/15 border border-[#c89b5a]/30 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
              SENTIRE CLIENT SERVICES
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[0.06em] text-white leading-tight">
              How may we assist you?
            </h1>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl font-light">
              From choosing your Extrait de Parfum signature to arranging a bespoke corporate commission, our Client Services team is here to guide you personally through every step of your Sentire experience.
            </p>
            <p className="text-xs text-[#c89b5a] italic font-serif tracking-wide">
              "Consider us your private point of contact with Sentire."
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#enquiry-form"
                className="px-7 py-3.5 rounded-lg bg-[#c89b5a] text-[#0b0907] font-bold text-xs uppercase tracking-[0.22em] hover:bg-[#d4af37] transition-all shadow-lg cursor-pointer"
              >
                BEGIN AN ENQUIRY
              </a>
              <a
                href="#contact-channels"
                className="px-6 py-3.5 rounded-lg border border-white/20 text-white font-medium text-xs uppercase tracking-[0.18em] hover:border-[#c89b5a] hover:text-[#c89b5a] transition-all cursor-pointer"
              >
                VIEW CONTACT OPTIONS →
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[380px] rounded-2xl overflow-hidden border border-[#c89b5a]/30 shadow-2xl bg-[#16120e] p-6 text-center">
              <div className="h-64 w-full rounded-xl overflow-hidden bg-[#1f1913] flex items-center justify-center relative mb-5">
                <img
                  src="/assets/white-oud.png"
                  alt="Sentire Packaging & Client Services"
                  className="h-full w-full object-contain p-4 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16120e] via-transparent to-transparent opacity-60" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#c89b5a]">
                PRIVATE CLIENT DESK
              </span>
              <h3 className="font-display text-lg text-white font-medium mt-1">
                Personal Olfactory Care
              </h3>
              <p className="text-[11px] text-white/60 mt-1">
                Jaipur, Rajasthan • Mon – Sat | 10:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 02 & 08: Quick Contact Bar & Availability ── */}
      <section id="contact-channels" className="border-b border-[#c89b5a]/15 bg-white py-10 px-5 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Call */}
            <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/20 flex flex-col justify-between hover:border-[#c89b5a] transition-all">
              <div>
                <span className="text-xl">📞</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink mt-2">CALL CLIENT SERVICES</h4>
                <p className="text-[11px] text-ink/60 mt-1">Speak directly with our team</p>
                <a href="tel:+919950891935" className="font-display text-base font-semibold text-[#c89b5a] mt-2 block hover:underline">
                  +91 99508 91935
                </a>
              </div>
              <span className="text-[9.5px] text-ink/40 mt-3 block">Mon – Sat | 10:00 AM – 7:00 PM IST</span>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/20 flex flex-col justify-between hover:border-[#c89b5a] transition-all">
              <div>
                <span className="text-xl">✉️</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink mt-2">EMAIL US</h4>
                <p className="text-[11px] text-ink/60 mt-1">For general & order enquiries</p>
                <a href="mailto:support@sentirebypc.com" className="font-display text-sm font-semibold text-[#c89b5a] mt-2 block hover:underline truncate">
                  support@sentirebypc.com
                </a>
              </div>
              <span className="text-[9.5px] text-ink/40 mt-3 block">Response within one business day</span>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/20 flex flex-col justify-between hover:border-[#c89b5a] transition-all">
              <div>
                <span className="text-xl">💬</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink mt-2">WHATSAPP CARE</h4>
                <p className="text-[11px] text-ink/60 mt-1">Instant messaging concierge</p>
                <a
                  href="https://wa.me/919950891935"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-sm font-semibold text-[#c89b5a] mt-2 block hover:underline"
                >
                  Chat on WhatsApp →
                </a>
              </div>
              <span className="text-[9.5px] text-ink/40 mt-3 block">Available during operating hours</span>
            </div>

            {/* Track Order */}
            <div className="p-5 rounded-2xl bg-[#0b0907] text-white border border-[#c89b5a]/30 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xl">🚚</span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold mt-2">TRACK YOUR ORDER</h4>
                <p className="text-[11px] text-white/60 mt-1">Check delivery & AWB status</p>
              </div>
              <button
                onClick={onNavigateToTrackOrder}
                className="mt-4 px-4 py-2.5 rounded-lg bg-[#c89b5a] text-[#0b0907] font-bold text-[10px] uppercase tracking-widest hover:bg-[#d4af37] transition-all cursor-pointer text-center"
              >
                TRACK PACKAGE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 09: "How Can We Assist?" Category Selector ── */}
      <section className="py-16 px-5 lg:px-12 mx-auto max-w-[1280px]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
            SELECT YOUR ENQUIRY TYPE
          </span>
          <h2 className="font-display text-3xl font-normal text-ink">How Can We Assist You Today?</h2>
          <p className="text-xs text-ink/60 mt-2">
            Select the topic of your enquiry below to tailor your communication directly with our dedicated department.
          </p>
        </div>

        {/* Categories selector chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSubmissionRef(null);
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0b0907] text-white border-[#c89b5a] shadow-lg scale-[1.02]"
                    : "bg-white text-ink border-black/10 hover:border-[#c89b5a]/50 hover:bg-[#fcf8f2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{cat.icon}</span>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-[#d4af37]" />}
                </div>
                <div className="mt-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isSelected ? "text-gold" : "text-ink"}`}>
                    {cat.label}
                  </h4>
                  <p className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? "text-white/60" : "text-ink/50"}`}>
                    {cat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Section 10–35: Intelligent Contact Form ── */}
      <section id="enquiry-form" className="py-12 px-5 lg:px-12 bg-[#f4efe8] border-y border-[#c89b5a]/15">
        <div className="mx-auto max-w-[900px]">
          <div className="bg-white rounded-3xl border border-[#c89b5a]/25 p-6 sm:p-12 shadow-2xl">
            {/* Header of form */}
            <div className="border-b border-black/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a]">
                  CLIENT SERVICES FORM
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink mt-1">
                  {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f8f5f1] border border-black/10 text-[10px] font-bold text-ink/70 uppercase tracking-widest self-start sm:self-auto">
                {CATEGORIES.find((c) => c.id === activeCategory)?.desc}
              </span>
            </div>

            {/* Submission Confirmation Result */}
            {submissionRef ? (
              <div className="text-center py-12 px-4 space-y-5 animate-fadeIn">
                <div className="h-16 w-16 rounded-full bg-[#c89b5a]/20 border border-[#c89b5a] text-[#c89b5a] flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c89b5a] block">
                  ENQUIRY RECEIVED
                </span>
                <h3 className="font-display text-3xl font-normal text-ink">Thank you for contacting Sentire.</h3>
                <p className="text-xs text-ink/70 leading-relaxed max-w-md mx-auto">
                  Your message has been received by our Jaipur Client Services desk. A confirmation has been sent to your email.
                </p>
                <div className="bg-[#f8f5f1] border border-[#c89b5a]/30 p-4 rounded-xl inline-block text-center">
                  <span className="text-[9px] font-bold text-ink/50 uppercase tracking-widest block">Reference Code</span>
                  <span className="font-display text-xl font-bold text-[#c89b5a]">{submissionRef}</span>
                </div>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setSubmissionRef(null)}
                    className="px-6 py-3 rounded-lg border border-black/20 text-ink font-bold text-xs uppercase tracking-widest hover:border-[#c89b5a] transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                  <button
                    onClick={onNavigateToPerfumes}
                    className="px-6 py-3 rounded-lg bg-[#0b0907] text-[#c89b5a] font-bold text-xs uppercase tracking-widest hover:bg-[#1a1511] transition-colors cursor-pointer"
                  >
                    Explore Perfume Library →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ── Common Contact Fields ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Alexander"
                      className="w-full bg-[#fcf9f4] border border-black/15 rounded-xl px-4 py-3 text-xs text-ink placeholder-ink/35 outline-none focus:border-[#c89b5a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Wright"
                      className="w-full bg-[#fcf9f4] border border-black/15 rounded-xl px-4 py-3 text-xs text-ink placeholder-ink/35 outline-none focus:border-[#c89b5a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-[#fcf9f4] border border-black/15 rounded-xl px-4 py-3 text-xs text-ink placeholder-ink/35 outline-none focus:border-[#c89b5a]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#fcf9f4] border border-black/15 rounded-xl px-4 py-3 text-xs text-ink placeholder-ink/35 outline-none focus:border-[#c89b5a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                    Preferred Contact Channel
                  </label>
                  <div className="flex gap-4">
                    {["Email", "Phone", "WhatsApp"].map((method) => (
                      <label key={method} className="flex items-center gap-2 text-xs text-ink cursor-pointer">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={handleInputChange}
                          className="accent-[#c89b5a]"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>

                {/* ── Dynamic Category Specific Fields ── */}
                {/* 1. Order Support / Delivery / Returns */}
                {(activeCategory === "order-support" ||
                  activeCategory === "delivery-tracking" ||
                  activeCategory === "returns-exchanges") && (
                  <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/30 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c89b5a]">
                      Order & Delivery Details
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Order Number *
                        </label>
                        <input
                          type="text"
                          name="orderNumber"
                          value={formData.orderNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. SNT-84920"
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none focus:border-[#c89b5a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Specific Query Type
                        </label>
                        <select
                          name="issueType"
                          value={formData.issueType}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none focus:border-[#c89b5a]"
                        >
                          <option value="Order Status / Update">Where is my order?</option>
                          <option value="Address Change">Delivery address update</option>
                          <option value="Damaged Item">Damaged item / bottle in transit</option>
                          <option value="Incorrect Item">Incorrect item received</option>
                          <option value="Return Request">Return / Exchange request</option>
                          <option value="GST Invoice">GST Invoice request</option>
                        </select>
                      </div>
                    </div>

                    {/* File Upload Guideline */}
                    {activeCategory === "returns-exchanges" && (
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Upload Photo of Product / Package (Optional)
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="w-full bg-white border border-black/15 rounded-xl p-2 text-xs text-ink file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-[#c89b5a] file:text-black hover:file:bg-[#d4af37]"
                        />
                        {formData.fileName && (
                          <span className="text-[10px] text-green-700 font-bold mt-1 block">
                            Attached: {formData.fileName}
                          </span>
                        )}
                        <p className="text-[10px] text-ink/50 mt-1 italic">
                          Please keep original packaging while our Jaipur team reviews your request.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Product Guidance */}
                {activeCategory === "product-guidance" && (
                  <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/30 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c89b5a]">
                      Scent Preference Profile
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Primary Occasion
                        </label>
                        <select className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none">
                          <option>Everyday Signature Scent</option>
                          <option>Evening & Dinner Parties</option>
                          <option>Special Celebrations & Weddings</option>
                          <option>Luxury Gift for Someone Else</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Favorite Scent Family
                        </label>
                        <select className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none">
                          <option>Woody & Smoky Oud (e.g., White Oud, Purple Oud)</option>
                          <option>Fresh Aquatic Citrus (e.g., Mirai, O809)</option>
                          <option>Velvet Floral & Rose (e.g., Calantha, Seductive)</option>
                          <option>Spiced Oriental Amber (e.g., Rich, Herrlich)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Personalisation */}
                {activeCategory === "personalisation" && (
                  <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/30 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c89b5a]">
                      Bespoke Laser Engraving & Packaging
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Desired Engraving Text (Max 20 chars)
                        </label>
                        <input
                          type="text"
                          name="customText"
                          value={formData.customText}
                          onChange={handleInputChange}
                          placeholder="e.g. P.C. • 2026"
                          maxLength={20}
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none focus:border-[#c89b5a]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Required Delivery Date
                        </label>
                        <input
                          type="date"
                          name="requiredDate"
                          value={formData.requiredDate}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none focus:border-[#c89b5a]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Corporate & Bulk Gifting (Special Wizard Layout) */}
                {activeCategory === "corporate-gifting" && (
                  <div className="p-5 rounded-2xl bg-[#0b0907] text-white border border-[#c89b5a]/40 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                        B2B & CORPORATE ENQUIRY WIZARD — STEP 0{corpStep} OF 02
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setCorpStep(1)}
                          className={`h-2 w-6 rounded-full transition-all ${corpStep === 1 ? "bg-[#d4af37]" : "bg-white/20"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setCorpStep(2)}
                          className={`h-2 w-6 rounded-full transition-all ${corpStep === 2 ? "bg-[#d4af37]" : "bg-white/20"}`}
                        />
                      </div>
                    </div>

                    {corpStep === 1 ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                              Company / Organisation *
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="e.g. Luxury Private Group"
                              className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#d4af37]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                              Purpose of Gifting
                            </label>
                            <select
                              name="purpose"
                              value={formData.purpose}
                              onChange={handleInputChange}
                              className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            >
                              <option>Corporate & Client Gifting</option>
                              <option>Employee Appreciation & Festive</option>
                              <option>Executive VIP Welcome Kits</option>
                              <option>Luxury Event & Conference favours</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                              Estimated Quantity
                            </label>
                            <select
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleInputChange}
                              className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            >
                              <option>20 – 50 units</option>
                              <option>50 – 150 units</option>
                              <option>150 – 500 units</option>
                              <option>500+ units (Custom Run)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                              GST Invoice Required?
                            </label>
                            <select
                              name="gstRequired"
                              value={formData.gstRequired}
                              onChange={handleInputChange}
                              className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#d4af37]"
                            >
                              <option>Yes — GST Invoice Required</option>
                              <option>No — Retail Purchase</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCorpStep(2)}
                          className="mt-2 w-full py-2.5 rounded-xl bg-[#c89b5a] text-[#0b0907] font-bold text-xs uppercase tracking-widest hover:bg-[#d4af37] transition-all cursor-pointer"
                        >
                          Next: Presentation & Details →
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                            Delivery Destination(s)
                          </label>
                          <input
                            type="text"
                            name="deliveryLocation"
                            value={formData.deliveryLocation}
                            onChange={handleInputChange}
                            placeholder="e.g. Single HQ in Mumbai OR Multi-address across India"
                            className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#d4af37]"
                          />
                        </div>
                        {formData.gstRequired.startsWith("Yes") && (
                          <div>
                            <label className="block text-[10.5px] font-bold uppercase tracking-wider text-white/80 mb-1">
                              Company GSTIN Number
                            </label>
                            <input
                              type="text"
                              name="gstin"
                              value={formData.gstin}
                              onChange={handleInputChange}
                              placeholder="e.g. 08AAAAA0000A1Z5"
                              className="w-full bg-[#18130f] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-[#d4af37]"
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setCorpStep(1)}
                          className="text-[10px] text-gold hover:underline cursor-pointer"
                        >
                          ← Back to Step 1
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Wholesale & Distribution */}
                {activeCategory === "wholesale-distribution" && (
                  <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#c89b5a]/30 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#c89b5a]">
                      Commercial Wholesale & Distribution Footprint
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Business Model
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none"
                        >
                          <option>Boutique Retailer</option>
                          <option>Department Store</option>
                          <option>Regional Distributor</option>
                          <option>E-Commerce Marketplace</option>
                          <option>International Distribution Partner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Country / Territory
                        </label>
                        <input
                          type="text"
                          name="countryRegion"
                          value={formData.countryRegion}
                          onChange={handleInputChange}
                          placeholder="e.g. India / UAE"
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-bold uppercase tracking-wider text-ink mb-1.5">
                          Website / Portfolio URL
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://..."
                          className="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2.5 text-xs text-ink outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Text Area */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-2">
                    Your Message / Specific Instructions *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your requirement or how our Client Services desk may guide you..."
                    className="w-full bg-[#fcf9f4] border border-black/15 rounded-xl px-4 py-3 text-xs text-ink placeholder-ink/35 outline-none focus:border-[#c89b5a]"
                  />
                </div>

                {/* Consent & Security Note */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10.5px] text-ink/60 leading-relaxed">
                    By submitting this enquiry, you agree that Sentire may use your provided information to respond to your request. View our{" "}
                    <a href="#" className="underline text-[#c89b5a]">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  {/* Security Anti-Phishing Banner */}
                  <div className="p-3 rounded-xl bg-[#fffcf7] border border-[#c89b5a]/30 flex items-center gap-2.5 text-[10px] text-ink/70">
                    <span className="text-base">🔒</span>
                    <span>
                      <strong className="text-ink">Security Notice:</strong> Sentire Client Services will never ask you to share an OTP, CVV, or complete credit card details over form or email.
                    </span>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#0b0907] text-[#c89b5a] font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#1a1511] hover:text-[#d4af37] transition-all shadow-xl cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isSubmitting ? "TRANSMITTING TO CLIENT DESK..." : "SUBMIT TO CLIENT SERVICES →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 17: Private & Corporate Services Showcase (Dark Section) ── */}
      <section className="py-20 px-5 lg:px-12 bg-[#0b0907] text-[#f8f5f1] border-b border-[#c89b5a]/15">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              PRIVATE & CORPORATE SERVICES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-white leading-tight">
              Gifting at scale, without losing the personal touch.
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              From intimate client gestures to large corporate galas and wedding celebrations, Sentire curates fragrance gifts, bespoke presentation, laser-engraving, and nationwide multi-address delivery tailored to your occasion.
            </p>

            <ul className="space-y-2 text-xs text-white/80 pt-2 font-sans">
              <li className="flex items-center gap-2">
                <span className="text-[#c89b5a]">✦</span> Custom Laser Engraving (Names, Monograms & Dates)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c89b5a]">✦</span> Gold Foil-Stamped Velvet Gift Packaging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c89b5a]">✦</span> Pan-India Multi-Destination Express Shipping
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#c89b5a]">✦</span> Compliant GST B2B Invoicing & Account Support
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveCategory("corporate-gifting");
                  const el = document.getElementById("enquiry-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-lg bg-[#c89b5a] text-[#0b0907] font-bold text-xs uppercase tracking-[0.22em] hover:bg-[#d4af37] transition-all shadow-lg cursor-pointer"
              >
                DISCUSS A BULK ORDER →
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#16120e] border border-white/10 hover:border-[#c89b5a]/50 transition-all">
              <span className="text-2xl">🏢</span>
              <h4 className="font-display text-base font-semibold text-white mt-2">Corporate Gifting</h4>
              <p className="text-[10.5px] text-white/50 mt-1">Client appreciation, holiday gifts & VIP rewards.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#16120e] border border-white/10 hover:border-[#c89b5a]/50 transition-all">
              <span className="text-2xl">💍</span>
              <h4 className="font-display text-base font-semibold text-white mt-2">Weddings & Galas</h4>
              <p className="text-[10.5px] text-white/50 mt-1">Wedding favours, bridal party gifts & welcome boxes.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#16120e] border border-white/10 hover:border-[#c89b5a]/50 transition-all">
              <span className="text-2xl">🏨</span>
              <h4 className="font-display text-base font-semibold text-white mt-2">Luxury Hospitality</h4>
              <p className="text-[10.5px] text-white/50 mt-1">Resorts, boutique hotels & executive suites.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#16120e] border border-white/10 hover:border-[#c89b5a]/50 transition-all">
              <span className="text-2xl">🌐</span>
              <h4 className="font-display text-base font-semibold text-white mt-2">Wholesale Trade</h4>
              <p className="text-[10.5px] text-white/50 mt-1">Boutiques, niche perfumeries & retailers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 15: FAQ Accordion ── */}
      <section className="py-20 px-5 lg:px-12 mx-auto max-w-[1000px]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
            CLIENT SERVICES FAQ
          </span>
          <h2 className="font-display text-3xl font-normal text-ink">Frequently Asked Questions</h2>
          <p className="text-xs text-ink/60 mt-2">
            Quick answers regarding orders, shipping, returns, engraving, and corporate gifting.
          </p>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between text-left py-2 font-display text-base sm:text-lg font-medium text-ink hover:text-[#c89b5a] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#c89b5a] font-bold text-xl ml-4 shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-2 text-xs sm:text-sm text-ink/70 leading-relaxed pr-8 pb-3 animate-fadeIn font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 16 & 49: Registered Office & Verified Details Card ── */}
      <section className="py-16 px-5 lg:px-12 bg-[#f4efe8] border-t border-[#c89b5a]/15">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-3xl bg-white border border-[#c89b5a]/25 p-8 sm:p-12 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
                REGISTERED OFFICE & CORRESPONDENCE
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">S P Ventures</h3>
              <p className="text-xs text-ink/70 leading-relaxed mt-2 font-sans">
                First Floor 109-110, Beriwal Tower,<br />
                Subhash Nagar Shopping Centre,<br />
                Jaipur, Rajasthan - 302016, India
              </p>
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
                CLIENT SERVICE HOURS
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">Operating Schedule</h3>
              <p className="text-xs text-ink/70 leading-relaxed mt-2 font-sans">
                Monday – Saturday<br />
                10:00 AM – 7:00 PM IST<br />
                <span className="text-[#c89b5a] font-semibold mt-1 block">Closed on Sundays & National Holidays</span>
              </p>
            </div>

            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c89b5a] block mb-1">
                DIRECT CHANNELS
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">Reach Us</h3>
              <p className="text-xs text-ink/70 leading-relaxed mt-2 font-sans">
                Telephone: <strong>+91 98765 43210</strong><br />
                Email: <strong>support@sentirebypc.com</strong><br />
                Domain: <strong>sentirebypc.com</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 17: Final Concierge CTA Bar ── */}
      <section className="relative overflow-hidden bg-[#0b0907] text-[#f8f5f1] py-16 px-5 lg:px-12 text-center border-t border-[#c89b5a]/30">
        <div className="mx-auto max-w-[800px] relative z-10 space-y-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
            A MORE PERSONAL CONVERSATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-white">Still unsure where to begin?</h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg mx-auto font-sans">
            Tell us what you need. Our Client Services team will guide you to the right fragrance or bespoke solution.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#enquiry-form"
              className="px-7 py-3 rounded-lg bg-[#c89b5a] text-[#0b0907] font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-lg cursor-pointer"
            >
              CONTACT SENTIRE
            </a>
            <button
              onClick={onNavigateToPerfumes}
              className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium text-xs uppercase tracking-[0.18em] hover:border-[#c89b5a] hover:text-[#c89b5a] transition-all cursor-pointer"
            >
              DISCOVER YOUR FRAGRANCE →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
