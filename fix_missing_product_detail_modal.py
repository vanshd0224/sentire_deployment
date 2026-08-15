perfumes_page_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"

with open(perfumes_page_path, "r", encoding="utf-8") as f:
    code = f.read()

modal_jsx = """
      {/* Product Detail Modal Window */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCartQuantity={onUpdateCartQuantity}
          onOpenCart={onOpenCart}
          onSelectProduct={(p) => setSelectedDetailProduct(p)}
          allProducts={allProductsList}
        />
      )}
    </div>
  );
}
"""

if "selectedDetailProduct && (" not in code:
    code = code[:-10] + modal_jsx
    with open(perfumes_page_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("SUCCESS: Injected ProductDetailModal JSX into PerfumesPage.tsx")
else:
    print("Already present")
