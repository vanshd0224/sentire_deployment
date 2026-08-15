import re

modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\ProductDetailModal.tsx"

with open(modal_path, "r", encoding="utf-8") as f:
    code = f.read()

# Add galleryImages useMemo computation right after selectedSize state definition
gallery_memo = """
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.sizeImages) {
      const imgs = product.sizeImages[selectedSize] || (product.sizeImages as any)[String(selectedSize)];
      if (imgs && imgs.length > 0) return imgs;
    }
    return [
      `/assets/perfumes/${product.id}-${selectedSize}ml-1.png`,
      `/assets/perfumes/${product.id}-${selectedSize}ml-2.png`,
      `/assets/perfumes/${product.id}-${selectedSize}ml-3.png`
    ];
  }, [product, selectedSize]);
"""

if "const galleryImages =" not in code:
    # Insert gallery_memo right after const [selectedSize, setSelectedSize]
    code = code.replace(
        "const [selectedSize, setSelectedSize] = useState<number>(() => product?.sizes[0] || 50);",
        "const [selectedSize, setSelectedSize] = useState<number>(() => product?.sizes[0] || 50);\n" + gallery_memo
    )
else:
    # Replace existing galleryImages definition
    code = re.sub(r"const galleryImages\s*=\s*useMemo\([\s\S]*?\n  \], \[product.*?\]\);", gallery_memo.strip(), code)

with open(modal_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Updated ProductDetailModal.tsx to dynamically render exact 3-3-3 studio thumbnails for selected bottle volume!")
