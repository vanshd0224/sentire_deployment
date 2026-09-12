import { useState, useEffect, useMemo } from "react";
import { syncAddToCartToShopifyStorefront } from "./utils/shopifyCart";
import { ALL_PERFUMES } from "./data/perfumes";
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
import DiscoverySetPage from "./components/DiscoverySetPage";
import PersonalisationPage from "./components/PersonalisationPage";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import CartPage from "./components/CartPage";
import MobileBottomNav from "./components/MobileBottomNav";
import AccountDrawerModal from "./components/AccountDrawerModal";
import AccountPage from "./components/AccountPage";
import ClientServicesPage from "./components/ClientServicesPage";
import TrackOrderPage from "./components/TrackOrderPage";
import SEOHead from "./components/SEOHead";
import ProductDetailModal from "./components/ProductDetailModal";
import ExitIntentPopup from "./components/ExitIntentPopup";
import { auth } from "./lib/firebase";

import type { PageName } from "./types/appTypes";
export type { PageName };

export default function App() {
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<PerfumeFilterOptions | undefined>(undefined);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("sentire_cart_items");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error loading saved cart:", e);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<any>(null);
  const [cartToast, setCartToast] = useState<{ id: number; message: string; img?: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("sentire_cart_items", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartToast) {
      const timer = setTimeout(() => setCartToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [cartToast]);



  const [currentPage, setCurrentPage] = useState<PageName>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname.toLowerCase();
    const ref = (typeof document !== "undefined" ? document.referrer : "").toLowerCase();
    const wentToCheckout = typeof sessionStorage !== "undefined" && sessionStorage.getItem("sentire_went_to_checkout") === "true";

    if (wentToCheckout || ref.includes("myshopify.com") || ref.includes("checkouts")) {
      try {
        sessionStorage.removeItem("sentire_went_to_checkout");
      } catch (e) {}
      return "cart";
    }

    if (hash === "#account" || path.includes("account")) return "account";
    if (hash === "#cart" || path.includes("cart") || path.includes("bag") || hash === "#bag") return "cart";
    if (hash === "#discovery-set" || path.includes("discovery-set") || hash === "#discoveryset" || path.includes("discoveryset")) return "discovery-set";
    if (hash === "#about" || path.includes("about") || path.includes("our-story") || path.includes("extrait-de-parfum") || path.includes("35-percent")) return "about";
    if (hash === "#byob" || path.includes("byob") || path.includes("build-your-own-bundle")) return "byob";
    if (hash === "#personalisation" || path.includes("personalisation") || path.includes("personalised-perfume")) return "perfumes";
    if (hash === "#discovery-set" || path.includes("discovery-set")) return "discovery-set";
    if (hash === "#new-arrivals" || path.includes("new-arrivals")) return "new-arrivals";
    if (hash === "#bestsellers" || path.includes("bestsellers") || path.includes("best-sellers")) return "bestsellers";
    if (hash === "#perfumes" || path.includes("perfumes") || path.includes("collections") || path.includes("products") || path.includes("product")) return "perfumes";
    if (hash === "#client-services" || path.includes("client-services") || path.includes("contact") || path.includes("faqs") || path.includes("shipping")) return "client-services";
    if (hash === "#track-order" || path.includes("track-order")) return "track-order";
    return "home";
  });

  const handleOpenProductModal = (product: any, size?: number) => {
    if (!product) return;
    const targetSize = size || product.initialSize || (product.sizes?.includes(50) ? 50 : product.sizes?.[0] || 50);
    setSelectedProductModal({ ...product, initialSize: targetSize });
    if (product && product.id) {
      try {
        window.history.pushState(null, "", `/perfumes/${product.id}/${targetSize}ml`);
      } catch (e) {}
    }
  };

  const handleCloseProductModal = () => {
    setSelectedProductModal(null);
    if (window.location.pathname.includes("/perfumes/") || window.location.pathname.includes("/products/")) {
      try {
        window.history.pushState(null, "", "/perfumes");
      } catch (e) {}
    }
  };

  useEffect(() => {
    // Handle deep-linked or permanent product URL: /perfumes/seductive/10ml, /seductive/30ml, /products/sentire-dapper-50ml...
    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const idFromQuery = params.get("id");

    let targetProductId: string | null = idFromQuery;
    let targetSize: number | undefined = undefined;

    // Check query params
    const querySize = params.get("size");
    if (querySize) {
      const parsedSize = parseInt(querySize, 10);
      if ([10, 30, 50].includes(parsedSize)) targetSize = parsedSize;
    }

    const pathParts = path.split("/").filter(Boolean);

    // Extract size from path parts (e.g. 10ml, 30ml, 50ml)
    for (const part of pathParts) {
      const sizeMatch = part.match(/^(\d+)(?:-?ml)?$/);
      if (sizeMatch) {
        const parsedNum = parseInt(sizeMatch[1], 10);
        if ([10, 30, 50].includes(parsedNum)) {
          targetSize = parsedNum;
        }
      }
    }

    // Extract perfume ID from path parts
    if (!targetProductId) {
      for (const part of pathParts) {
        if (["perfumes", "products", "product"].includes(part) || /^\d+(?:-?ml)?$/.test(part)) continue;
        const cleanPart = part.replace(/^sentire-/, "").replace(/-(10|30|50)ml$/, "").split(".")[0];
        const found = ALL_PERFUMES.find(
          (p) =>
            p.id.toLowerCase() === part.toLowerCase() ||
            p.id.toLowerCase() === cleanPart.toLowerCase() ||
            cleanPart.toLowerCase().startsWith(p.id.toLowerCase() + "-")
        );
        if (found) {
          targetProductId = found.id;
          break;
        }
      }
    }

    if (targetProductId) {
      const match = ALL_PERFUMES.find(
        (p) => p.id.toLowerCase() === targetProductId?.toLowerCase()
      );
      if (match) {
        setSelectedProductModal({ ...match, initialSize: targetSize });
        if (targetSize) {
          try {
            window.history.replaceState(null, "", `/perfumes/${match.id}/${targetSize}ml`);
          } catch (e) {}
        }
      }
    }

    const handlePopState = () => {
      const popPath = window.location.pathname.toLowerCase();
      const hash = window.location.hash;
      if (hash === "#account" || popPath.includes("account")) setCurrentPage("account");
      else if (hash === "#cart" || popPath.includes("cart") || popPath.includes("bag")) setCurrentPage("cart");
      else if (hash === "#discovery-set" || popPath.includes("discovery-set") || hash === "#discoveryset" || popPath.includes("discoveryset")) setCurrentPage("discovery-set");
      else if (hash === "#about" || popPath.includes("about") || popPath.includes("extrait-de-parfum") || popPath.includes("35-percent")) setCurrentPage("about");
      else if (hash === "#byob" || popPath.includes("byob") || popPath.includes("build-your-own-bundle")) setCurrentPage("byob");
      else if (hash === "#personalisation" || popPath.includes("personalisation") || popPath.includes("personalised-perfume")) setCurrentPage("personalisation");
      else if (hash === "#discovery-set" || popPath.includes("discovery-set")) setCurrentPage("discovery-set");
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

    const handleOpenCartEvent = () => {
      handleNavigate("cart");
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("sentire_open_cart", handleOpenCartEvent);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("sentire_open_cart", handleOpenCartEvent);
    };
  }, []);

  const handleAccountClick = () => {
    const isStoredLoggedIn = localStorage.getItem("sentire_is_logged_in") === "true";
    if (auth.currentUser || isStoredLoggedIn) {
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
    
    const pData = ALL_PERFUMES.find((p) => p.id === safeProductId || p.id === item?.id);
    const safeImage =
      item?.image ||
      item?.img ||
      (item?.swatch && item.swatch.startsWith("/assets/perfumes") ? item.swatch : null) ||
      pData?.img ||
      pData?.sizeImages?.[safeSize as 10 | 30 | 50]?.[0] ||
      "/assets/purple-oud-arrival.png";

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

    // Stay on current page, update cart count badge, and show toast notification!
    setCartToast({
      id: Date.now(),
      message: `Added ${safeName} to Bag!`,
      img: safeImage,
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
      <SEOHead currentPage={currentPage} selectedProductModal={selectedProductModal} />
      {currentPage !== "cart" && (
        <Navbar
          onOpenBundleModal={openBundleModal}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          cartCount={totalCartCount}
          onOpenCart={() => handleNavigate("cart")}
          onOpenAccount={handleAccountClick}
          onSelectProduct={handleOpenProductModal}
          isSearchOpen={isSearchOpen}
          onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
          onCloseSearch={() => setIsSearchOpen(false)}
        />
      )}

      {currentPage === "perfumes" ? (
        <PerfumesPage
          onBackToHome={() => handleNavigate("home")}
          onOpenBundleModal={openBundleModal}
          initialFilters={activeFilters}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => handleNavigate("cart")}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "bestsellers" ? (
        <BestSellersPage
          onBackToHome={() => handleNavigate("home")}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => handleNavigate("cart")}
        />
            ) : currentPage === "discovery-set" ? (
        <DiscoverySetPage
          onAddToCart={handleAddToCart}
          onOpenCart={() => handleNavigate("cart")}
          onBackToHome={() => handleNavigate("home")}
          onNavigate={handleNavigate}
        />
      ) : currentPage === "new-arrivals" ? (
        <NewArrivalsPage
          onBackToHome={() => handleNavigate("home")}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => handleNavigate("cart")}
        />
      ) : currentPage === "discovery-set" ? (
        <DiscoverySetPage
          onBackToHome={() => handleNavigate("home")}
          onAddToCart={handleAddToCart}
          onOpenCart={() => handleNavigate("cart")}
          onNavigate={handleNavigate}
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
          onOpenCart={() => handleNavigate("cart")}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "personalisation" ? (
        <PersonalisationPage
          onBackToHome={() => handleNavigate("home")}
          onAddToCart={handleAddToCart}
          onOpenCart={() => handleNavigate("cart")}
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
      ) : currentPage === "cart" ? (
        <CartPage
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onAddToCart={handleAddToCart}
          onNavigate={handleNavigate}
        />
      ) : (
        <main>
          <Hero onNavigate={handleNavigate} />
          <WatchAndBuy
            onAddToCart={handleAddToCart}
            onOpenCart={() => handleNavigate("cart")}
            onSelectProduct={handleOpenProductModal}
          />
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

      {!isCartOpen && !isBundleModalOpen && currentPage !== "personalisation" && currentPage !== "cart" && (
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenCart={() => handleNavigate("cart")}
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
        onOpenLoginModal={() => setIsAccountOpen(true)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Product Detail Modal (High-Res Photoshoot Gallery, Laser Engraving, Reviews) */}
      {selectedProductModal && (
        <ProductDetailModal
          product={ALL_PERFUMES.find(ap => ap.id === selectedProductModal.id) || selectedProductModal}
          onClose={handleCloseProductModal}
          cartItems={cartItems}
          onAddToCart={(prod, size, price) => {
            handleAddToCart(
              {
                productId: prod.id,
                name: prod.name,
                price: price,
                originalPrice: Math.round(price * 1.35),
                image: prod.img,
                size: size,
                isPersonalised: prod.isPersonalised,
                engravingText: prod.engravingText,
                engravingDate: prod.engravingDate,
              },
              size,
              price
            );
            handleCloseProductModal();
          }}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => {
            handleCloseProductModal();
            handleNavigate("cart");
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
      <ExitIntentPopup onNavigate={handleNavigate} />

      {/* 🛒 LUXURY FLOATING CART TOAST NOTIFICATION (APPROACH 1) */}
      {cartToast && (
        <div
          key={cartToast.id}
          className="fixed z-[9999999] left-1/2 -translate-x-1/2 bottom-20 sm:bottom-8 w-[92%] max-w-md rounded-2xl border border-[#B8863B]/60 bg-[#14110D]/95 backdrop-blur-xl p-3 text-white shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 animate-fadeIn transition-all"
        >
          <div className="flex items-center gap-3 min-w-0">
            {cartToast.img && (
              <div className="h-11 w-11 shrink-0 rounded-xl bg-white/10 p-1 border border-white/20 flex items-center justify-center overflow-hidden">
                <img src={cartToast.img} alt="Cart item thumbnail" className="h-full w-full object-contain" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#D4AF37] tracking-wide truncate">{cartToast.message}</p>
              <p className="text-[10px] text-white/70 font-medium">Cart Updated ({totalCartCount} item{totalCartCount === 1 ? "" : "s"})</p>
            </div>
          </div>

          <button
            onClick={() => {
              setCartToast(null);
              handleNavigate("cart");
            }}
            className="shrink-0 rounded-full bg-[#B8863B] px-3.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C89B5A] transition-all shadow-md cursor-pointer flex items-center gap-1"
          >
            <span>View Bag</span>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}