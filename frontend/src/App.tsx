import { useState, useEffect, useMemo } from "react";
import { syncAddToCartToShopifyStorefront } from "./utils/shopifyCart";
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
import SEOHead from "./components/SEOHead";
import ProductDetailModal from "./components/ProductDetailModal";
import { ALL_PERFUMES } from "./data/perfumes";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState<PageName>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname.toLowerCase();
    if (hash === "#account" || path.includes("account")) return "account";
    if (hash === "#about" || path.includes("about") || path.includes("our-story") || path.includes("extrait-de-parfum") || path.includes("35-percent")) return "about";
    if (hash === "#byob" || path.includes("byob") || path.includes("build-your-own-bundle")) return "byob";
    if (hash === "#personalisation" || path.includes("personalisation") || path.includes("personalised-perfume")) return "perfumes";
    if (hash === "#new-arrivals" || path.includes("new-arrivals")) return "new-arrivals";
    if (hash === "#bestsellers" || path.includes("bestsellers") || path.includes("best-sellers")) return "bestsellers";
    if (hash === "#perfumes" || path.includes("perfumes") || path.includes("collections") || path.includes("products") || path.includes("product")) return "perfumes";
    if (hash === "#client-services" || path.includes("client-services") || path.includes("contact") || path.includes("faqs") || path.includes("shipping")) return "client-services";
    if (hash === "#track-order" || path.includes("track-order")) return "track-order";
    return "home";
  });

  const handleOpenProductModal = (product: any) => {
    setSelectedProductModal(product);
    if (product && product.id) {
      try {
        window.history.pushState(null, "", `/perfumes/${product.id}`);
      } catch (e) {}
    }
  };

  const handleCloseProductModal = () => {
    setSelectedProductModal(null);
    if (window.location.pathname.startsWith("/perfumes/")) {
      try {
        window.history.pushState(null, "", "/perfumes");
      } catch (e) {}
    }
  };

  useEffect(() => {
    // Handle deep-linked or permanent product URL: /perfumes/dapper or legacy /products/sentire-dapper...
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const idFromQuery = params.get("id");

    let targetProductId = idFromQuery;
    let shouldNormalizeUrl = false;
    let normalizedId = "";

    if (idFromQuery) {
      const cleanSlug = idFromQuery.replace(/^sentire-/, "").split(".")[0];
      const found = ALL_PERFUMES.find(
        (p) =>
          p.id.toLowerCase() === idFromQuery.toLowerCase() ||
          p.id.toLowerCase() === cleanSlug.toLowerCase() ||
          cleanSlug.toLowerCase().startsWith(p.id.toLowerCase() + "-") ||
          idFromQuery.toLowerCase().includes(p.id.toLowerCase())
      );
      if (found) {
        targetProductId = found.id;
        normalizedId = found.id;
        shouldNormalizeUrl = true;
      }
    } else if (path.startsWith("/perfumes/")) {
      const perfumeSlug = path.replace("/perfumes/", "").split("/")[0].split(".")[0];
      const found = ALL_PERFUMES.find((p) => p.id.toLowerCase() === perfumeSlug.toLowerCase());
      if (found) targetProductId = found.id;
    } else if (path.includes("/products/") || path.includes("/product/")) {
      const rawSlug = path.split("/").filter(Boolean).pop() || "";
      const cleanSlug = rawSlug.replace(/^sentire-/, "").split(".")[0];
      
      const foundPerfume = ALL_PERFUMES.find(
        (p) =>
          p.id.toLowerCase() === rawSlug.toLowerCase() ||
          p.id.toLowerCase() === cleanSlug.toLowerCase() ||
          cleanSlug.toLowerCase().startsWith(p.id.toLowerCase() + "-") ||
          rawSlug.toLowerCase().includes(p.id.toLowerCase())
      );
      if (foundPerfume) {
        targetProductId = foundPerfume.id;
        normalizedId = foundPerfume.id;
        shouldNormalizeUrl = true;
      }
    }

    if (targetProductId) {
      const match = ALL_PERFUMES.find(
        (p) => p.id.toLowerCase() === targetProductId?.toLowerCase()
      );
      if (match) {
        setSelectedProductModal(match);
        if (shouldNormalizeUrl && normalizedId) {
          try {
            window.history.replaceState(null, "", `/perfumes/${normalizedId}`);
          } catch (e) {}
        }
      }
    }

    const handlePopState = () => {
      const popPath = window.location.pathname.toLowerCase();
      const hash = window.location.hash;
      if (hash === "#account" || popPath.includes("account")) setCurrentPage("account");
      else if (hash === "#about" || popPath.includes("about") || popPath.includes("extrait-de-parfum") || popPath.includes("35-percent")) setCurrentPage("about");
      else if (hash === "#byob" || popPath.includes("byob") || popPath.includes("build-your-own-bundle")) setCurrentPage("byob");
      else if (hash === "#personalisation" || popPath.includes("personalisation") || popPath.includes("personalised-perfume")) setCurrentPage("personalisation");
      else if (hash === "#new-arrivals" || popPath.includes("new-arrivals")) setCurrentPage("new-arrivals");
      else if (hash === "#bestsellers" || popPath.includes("bestsellers")) setCurrentPage("bestsellers");
      else if (hash === "#perfumes" || popPath.includes("perfumes") || popPath.includes("products")) setCurrentPage("perfumes");
      else if (hash === "#client-services" || popPath.includes("client-services") || popPath.includes("contact")) setCurrentPage("client-services");
      else if (hash === "#track-order" || popPath.includes("track-order")) setCurrentPage("track-order");
      else setCurrentPage("home");

      if (popPath.startsWith("/perfumes/")) {
        const slug = popPath.replace("/perfumes/", "").split("/")[0].split(".")[0];
        const match = ALL_PERFUMES.find((p) => p.id.toLowerCase() === slug.toLowerCase());
        if (match) setSelectedProductModal(match);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleAccountClick = () => {
    if (auth.currentUser) {
      handleNavigate("account");
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
    const targetPath = page === "home" ? "/" : `/${page}`;
    if (window.location.pathname !== targetPath && !window.location.hash) {
      try {
        window.history.pushState(null, "", targetPath);
      } catch (e) {
        console.error("Could not update history state", e);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (item: any, sizeArg?: number, priceArg?: number) => {
    const qtyToAdd = item?.quantity ?? 1;
    const safePrice = typeof priceArg === "number" ? priceArg : typeof item?.price === "number" ? item.price : 1489;
    const safeSize = typeof sizeArg === "number" ? sizeArg : typeof item?.size === "number" ? item.size : 50;
    const safeProductId = item?.productId || item?.id || "perfume-1";
    const safeName = item?.name || item?.product || "Luxury Extrait de Parfum";
    const safeImage = item?.image || item?.img || item?.swatch || "/assets/purple-oud-arrival.png";

    const isPersonalised = Boolean(item?.isPersonalised || item?.engravingText);
    const engravingText = item?.engravingText || "";
    const engravingDate = item?.engravingDate || "";

    const newItem = {
      id: `${safeProductId}-${safeSize}${isPersonalised ? "-personalised" : ""}`,
      productId: safeProductId,
      name: safeName,
      size: safeSize,
      price: safePrice,
      image: safeImage,
      img: safeImage,
      quantity: qtyToAdd,
      isPersonalised,
      engravingText,
      engravingDate,
    };

    setCartItems((prev) => {
      // If adding a personalised bottle, replace any unpersonalised version of the same product & size!
      const baseList = isPersonalised
        ? prev.filter((i) => !(i.productId === safeProductId && i.size === safeSize && !i.isPersonalised))
        : prev;

      const existingIndex = baseList.findIndex(
        (i) => i.productId === safeProductId && i.size === safeSize && Boolean(i.isPersonalised) === Boolean(isPersonalised)
      );
      if (existingIndex > -1) {
        const updated = [...baseList];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
          price: safePrice,
          isPersonalised,
          engravingText: engravingText || updated[existingIndex].engravingText,
          engravingDate: engravingDate || updated[existingIndex].engravingDate,
        };
        return updated;
      }
      return [...baseList, newItem];
    });
    
    // Trigger real-time Shopify Storefront GraphQL mutation (cartCreate / cartLinesAdd)
    syncAddToCartToShopifyStorefront(newItem, qtyToAdd);
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
      <SEOHead currentPage={currentPage} selectedProductModal={selectedProductModal} />
      {currentPage !== "home" && <AnnouncementBar />}
      <Navbar
        onOpenBundleModal={openBundleModal}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={handleAccountClick}
        onSelectProduct={handleOpenProductModal}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        onCloseSearch={() => setIsSearchOpen(false)}
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
            onSelectProduct={handleOpenProductModal}
          />
          <NewArrivals
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onNavigate={handleNavigate}
            onSelectProduct={handleOpenProductModal}
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
          onToggleSearch={() => {
            setIsSearchOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
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

      {/* Full Product Detail Modal (High-Res Photoshoot Gallery, Laser Engraving, Reviews) */}
      {selectedProductModal && (
        <ProductDetailModal
          product={ALL_PERFUMES.find(ap => ap.id === selectedProductModal.id) || selectedProductModal}
          onClose={handleCloseProductModal}
          cartItems={cartItems}
          onAddToCart={(prod, size, price) => {
            handleAddToCart({
              productId: prod.id,
              name: prod.name,
              price: price,
              originalPrice: Math.round(price * 1.35),
              image: prod.img,
              size: size,
            });
            handleCloseProductModal();
            setIsCartOpen(true);
          }}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => {
            handleCloseProductModal();
            setIsCartOpen(true);
          }}
          onSelectProduct={handleOpenProductModal}
          allProducts={ALL_PERFUMES}
        />
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