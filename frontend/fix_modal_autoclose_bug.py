import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"
modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\AccountDrawerModal.tsx"

# Clean up App.tsx completely
clean_app_code = """import { useState, useEffect, useMemo } from "react";
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

  const handleAddToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = item.quantity ?? 1;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
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
          onNavigate={handleNavigate}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "new-arrivals" ? (
        <NewArrivalsPage
          onBackToHome={() => handleNavigate("home")}
          onNavigate={handleNavigate}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
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
          />
          <NewArrivals
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onNavigate={handleNavigate}
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
"""

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(clean_app_code)

print("SUCCESS: Rewrote App.tsx with clean, robust state management (0 auto-close loops)")
