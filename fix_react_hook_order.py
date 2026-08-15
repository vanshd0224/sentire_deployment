modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\ProductDetailModal.tsx"

with open(modal_path, "r", encoding="utf-8") as f:
    code = f.read()

target_block = """  // Recommended products (excluding current)
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  }, [allProducts, product]);

  if (!product) return null;

  const currentPrice = product.prices[selectedSize] || product.prices[product.sizes[0]] || 799;
  const originalPrice = Math.round(currentPrice * 1.45);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  // Gallery Images for Product (3-3 Photos per size: 10ML, 30ML, 50ML)
  const galleryImages = useMemo(() => {
    if (product && product.sizeImages && product.sizeImages[selectedSize]) {
      return product.sizeImages[selectedSize];
    }
    return [product?.img || "", product?.img || "", product?.img || ""];
  }, [product, selectedSize]);"""

replacement_block = """  // Gallery Images for Product (3-3 Photos per size: 10ML, 30ML, 50ML)
  const galleryImages = useMemo(() => {
    if (product && product.sizeImages && product.sizeImages[selectedSize]) {
      return product.sizeImages[selectedSize];
    }
    return [product?.img || "", product?.img || "", product?.img || ""];
  }, [product, selectedSize]);

  // Recommended products (excluding current)
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter((p) => p.id !== product.id).slice(0, 3);
  }, [allProducts, product]);

  if (!product) return null;

  const currentPrice = product.prices[selectedSize] || product.prices[product.sizes[0]] || 799;
  const originalPrice = Math.round(currentPrice * 1.45);
  const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);"""

if target_block in code:
    code = code.replace(target_block, replacement_block)
    with open(modal_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("SUCCESS: Moved galleryImages useMemo before if (!product) return null; to solve React Error #310!")
else:
    print("Target block not found precisely, performing fallback replace...")
