import os
import re

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

# 1. Update App.tsx render block for "bestsellers" and "new-arrivals" to render PerfumesPage!
app_path = os.path.join(src_dir, "App.tsx")
with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

# Replace currentPage === "bestsellers" block
old_bs_block = r'\) : currentPage === "bestsellers" \? \([\s\S]*?\) : currentPage === "new-arrivals" \? \([\s\S]*?\) : currentPage === "about" \? \('

new_bs_block = """) : currentPage === "bestsellers" ? (
        <PerfumesPage
          onBackToHome={() => handleNavigate("home")}
          onOpenBundleModal={openBundleModal}
          initialFilters={{ category: "bestsellers" }}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "new-arrivals" ? (
        <PerfumesPage
          onBackToHome={() => handleNavigate("home")}
          onOpenBundleModal={openBundleModal}
          initialFilters={{ category: "new" }}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAccount={handleAccountClick}
        />
      ) : currentPage === "about" ? ("""

app_code = re.sub(old_bs_block, new_bs_block, app_code)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)

# 2. Update BestSellers.tsx button click handler
bs_path = os.path.join(src_dir, "components", "BestSellers.tsx")
with open(bs_path, "r", encoding="utf-8") as f:
    bs_code = f.read()

bs_code = bs_code.replace(
    'onClick={() => onOpenPerfumesPage?.(undefined, undefined, "bestsellers")}',
    'onClick={() => onNavigate ? onNavigate("bestsellers") : onOpenPerfumesPage?.(undefined, undefined, "bestsellers")}'
)

with open(bs_path, "w", encoding="utf-8") as f:
    f.write(bs_code)

# 3. Update NewArrivals.tsx button click handler
na_path = os.path.join(src_dir, "components", "NewArrivals.tsx")
with open(na_path, "r", encoding="utf-8") as f:
    na_code = f.read()

na_code = na_code.replace(
    'onClick={() => onOpenPerfumesPage?.(undefined, undefined, "new")}',
    'onClick={() => onNavigate ? onNavigate("new-arrivals") : onOpenPerfumesPage?.(undefined, undefined, "new")}'
)

with open(na_path, "w", encoding="utf-8") as f:
    f.write(na_code)

print("SUCCESS: Configured bestsellers & new-arrivals pages to render PerfumesPage with filter bar (Screenshot 109)!")
