import { useState, useEffect, useMemo } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar, { PerfumeFilterOptions } from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import WatchAndBuy from "./components/WatchAndBuy";
import RetailerBadges from "./components/RetailerBadges";
import ShopByCategory from "./components/ShopByCategory";
import BestSellers from "./components/BestSellers";
import NewArrivals from "./components/NewArrivals";
import CelebrityReacts from "./components/CelebrityReacts";
import PromoSplit from "./components/PromoSplit";
import Newsletter from "./components/Newsletter";
import InstagramSection from "./components/InstagramSection";
import Footer from "./components/Footer";
import BundleBuilderModal from "./components/BundleBuilderModal";
import PerfumesPage from "./components/PerfumesPage";
import BestSellersPage from "./components/BestSellersPage";
import NewArrivalsPage from "./components/NewArrivalsPage";
import AboutPage from "./components/AboutPage";
import ByobPage from "./components/ByobPage";
import PersonalisationPage from "./components/PersonalisationPage";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import MobileBottomNav from "./components/MobileBottomNav";
import AccountDrawerModal from "./components/AccountDrawerModal";
import AccountPage from "./components/AccountPage";
import ClientServicesPage from "./components/ClientServicesPage";
import TrackOrderPage from "./components/TrackOrderPage";
import { auth } from "./lib/firebase";

export type PageName =
  | "home"
  | "perfumes"
  | "bestsellers"
  | "new-arrivals"
  | "about"
  | "byob"
  | "personalisation"
  | "client-services"
  | "track-order"
  | "account";

export default function App() {
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<PerfumeFilterOptions | undefined>(undefined);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState<PageName>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === "#account" || path.includes("account")) return "account";
    if (hash === "#about" || path.includes("about")) return "about";
    if (hash === "#byob" || path.includes("byob")) return "byob";
    if (hash === "#personalisation" || path.includes("personalisation")) return "personalisation";
    if (hash === "#new-arrivals" || path.includes("new-arrivals")) return "new-arrivals";
    if (hash === "#bestsellers" || path.includes("bestsellers")) return "bestsellers";
    if (hash === "#perfumes" || path.includes("perfumes")) return "perfumes";
    if (hash === "#client-services" || path.includes("client-services")) return "client-services";
    if (hash === "#track-order" || path.includes("track-order")) return "track-order";
    return "home";
  });

  const handleAccountClick = () => {
    if (auth.currentUser) {
      setCurrentPage("account");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsAccountOpen(true);
    }
  };

  const handleNavigate = (
    page: PageName,
    filters?: PerfumeFilterOptions
  ) => {
    setCurrentPage(page);
    setActiveFilters(filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (item: any) => {
    const qtyToAdd = item.quantity ?? 1;
    const safePrice = typeof item.price === "number" ? item.price : 2499;
    const safeSize = typeof item.size === "number" ? item.size : 50;
    const safeProductId = item.productId || item.id || "perfume-1";
    const safeName = item.name || item.product || "Luxury Extrait de Parfum";
    const safeImage = item.image || item.img || item.swatch || "/images/product-white-oud.jpg";

    const newItem = {
      id: `${safeProductId}-${safeSize}`,
      productId: safeProductId,
      name: safeName,
      size: safeSize,
      price: safePrice,
      image: safeImage,
      img: safeImage,
      quantity: qtyToAdd,
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === safeProductId && i.size === safeSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, size: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveCartItem = (productId: string, size: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const openBundleModal = () => setIsBundleModalOpen(true);
  const closeBundleModal = () => setIsBundleModalOpen(false);

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen w-full bg-cream text-ink mobile-page-padding lg:pb-0">
      <AnnouncementBar />
      <Navbar
        onOpenBundleModal={openBundleModal}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={handleAccountClick}
      />

      {currentPage === "perfumes" ? (
        <PerfumesPage
          onBackToHome={() => handleNavigate("home")}
          onOpenBundleModal={openBundleModal}
          initialFilters={activeFilters}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "bestsellers" ? (
        <BestSellersPage
          onBackToHome={() => handleNavigate("home")}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
        />
      ) : currentPage === "new-arrivals" ? (
        <NewArrivalsPage
          onBackToHome={() => handleNavigate("home")}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
        />
      ) : currentPage === "about" ? (
        <AboutPage
          onBackToHome={() => handleNavigate("home")}
          onNavigateToPerfumes={() => handleNavigate("perfumes")}
          onNavigate={handleNavigate}
        />
      ) : currentPage === "byob" ? (
        <ByobPage
          onBackToHome={() => handleNavigate("home")}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "personalisation" ? (
        <PersonalisationPage
          onBackToHome={() => handleNavigate("home")}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "client-services" ? (
        <ClientServicesPage
          onBackToHome={() => handleNavigate("home")}
          onNavigate={handleNavigate}
        />
      ) : currentPage === "account" ? (
        <AccountPage
          onNavigate={handleNavigate}
          onOpenLoginModal={() => setIsAccountOpen(true)}
        />
      ) : currentPage === "track-order" ? (
        <TrackOrderPage
          onBackToHome={() => handleNavigate("home")}
          onNavigate={handleNavigate}
        />
      ) : (
        <main>
          <Hero onNavigate={handleNavigate} />
          <WatchAndBuy onAddToCart={handleAddToCart} onOpenCart={() => setIsCartOpen(true)} onOpenAccount={handleAccountClick} />
          <RetailerBadges />
          <ShopByCategory onNavigate={handleNavigate} />
          <BestSellers
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProductModal(p)}
          />
          <NewArrivals
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onNavigate={handleNavigate}
            onSelectProduct={(p) => setSelectedProductModal(p)}
          />
          <CelebrityReacts />
          <TrustBadges />
          <Newsletter />
          <InstagramSection />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />

      {!isCartOpen && !isBundleModalOpen && currentPage !== "personalisation" && (
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
          onOpenBundleModal={openBundleModal}
          onToggleSearch={() => handleNavigate("perfumes")}
          cartCount={totalCartCount}
        />
      )}

      <BundleBuilderModal
        isOpen={isBundleModalOpen}
        onClose={closeBundleModal}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      {/* Product Quick View Modal */}
      {selectedProductModal && (
        <div
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedProductModal(null); }}
        >
          <div className="relative w-full max-w-xl bg-[#ffffff] text-[#1e1e1e] rounded-3xl shadow-2xl overflow-hidden border border-[#c89b5a]/40 p-6 sm:p-8">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#1e1e1e] text-2xl font-light leading-none cursor-pointer"
            >
              &times;
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-1/2 aspect-square bg-[#f6f2ec] rounded-2xl p-4 flex items-center justify-center border border-[#e5dfd5]">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="max-h-56 object-contain filter drop-shadow-md"
                />
              </div>

              <div className="w-full sm:w-1/2 space-y-3 text-left">
                <span className="text-[10px] font-bold text-[#c89b5a] uppercase tracking-widest bg-[#c89b5a]/10 px-2.5 py-1 rounded-full border border-[#c89b5a]/30">
                  {selectedProductModal.family || "Haute Parfumerie"}
                </span>

                <h3 className="text-2xl font-serif font-bold text-[#1e1e1e]">
                  {selectedProductModal.name}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed">
                  {selectedProductModal.description || selectedProductModal.desc || "Crafted beyond time with rare botanicals, precious woods, and luminous accords."}
                </p>

                <div className="pt-2 border-t border-[#f0ebe3]">
                  <span className="text-xs font-bold text-[#1e1e1e] uppercase">Scent Notes:</span>
                  <p className="text-xs text-[#c89b5a] font-medium mt-0.5">
                    {selectedProductModal.notes || "Clean Oud • Luminous Wood • Soft Musk"}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#1e1e1e]">
                    ₹{selectedProductModal.prices?.[50]?.price || selectedProductModal.price || "2,499"}
                  </span>
                  <span className="text-xs text-[#777] line-through">
                    ₹{selectedProductModal.prices?.[50]?.originalPrice || "3,299"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart({
                      productId: selectedProductModal.id,
                      name: selectedProductModal.name,
                      price: selectedProductModal.prices?.[50]?.price || selectedProductModal.price || 2499,
                      originalPrice: selectedProductModal.prices?.[50]?.originalPrice || 3299,
                      image: selectedProductModal.image,
                      size: 50,
                    });
                    setSelectedProductModal(null);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3.5 bg-[#1e1e1e] hover:bg-[#c89b5a] text-[#ffffff] hover:text-[#000000] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer mt-3"
                >
                  Add 50 ML Bottle to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AccountDrawerModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onSuccessLogin={() => {
          setIsAccountOpen(false);
          handleNavigate("account");
        }}
      />
    </div>
  );
}
