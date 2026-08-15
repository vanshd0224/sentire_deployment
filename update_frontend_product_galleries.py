import json

catalog_file = "perfume_size_images_catalog.json"
perfumes_page_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"
modal_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\ProductDetailModal.tsx"

with open(catalog_file, "r") as f:
    catalog = json.load(f)

# 1. Update PerfumesPage.tsx interface & ALL_SIZES_PRODUCTS
with open(perfumes_page_path, "r", encoding="utf-8") as f:
    code = f.read()

# Add sizeImages to interface if not present
if "sizeImages?:" not in code:
    code = code.replace("img: string;", "img: string;\n  sizeImages?: Record<number, string[]>;")

# Update each product in ALL_SIZES_PRODUCTS to include sizeImages map
for p_id, size_map in catalog.items():
    target_str = f'id: "{p_id}",'
    if target_str in code and f'id: "{p_id}",\n    sizeImages:' not in code:
        size_json_str = json.dumps(size_map, indent=6)
        replacement = f'id: "{p_id}",\n    sizeImages: {size_json_str},'
        code = code.replace(target_str, replacement)

with open(perfumes_page_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Updated PerfumesPage.tsx with sizeImages for all products")

# 2. Update ProductDetailModal.tsx galleryImages logic
with open(modal_path, "r", encoding="utf-8") as f:
    mcode = f.read()

old_gallery_code = """  // Gallery Images for Product
  const galleryImages = [
    product.img,
    product.img, // Angle view / packaging preview
    "/images-[#c89b5a].png", // Aesthetic composition preview fallback
  ];"""

new_gallery_code = """  // Gallery Images for Product (3-3 Photos per size: 10ML, 30ML, 50ML)
  const galleryImages = useMemo(() => {
    if (product && product.sizeImages && product.sizeImages[selectedSize]) {
      return product.sizeImages[selectedSize];
    }
    return [product.img, product.img, product.img];
  }, [product, selectedSize]);"""

mcode = mcode.replace(old_gallery_code, new_gallery_code)

with open(modal_path, "w", encoding="utf-8") as f:
    f.write(mcode)

print("SUCCESS: Updated ProductDetailModal.tsx galleryImages hook")
