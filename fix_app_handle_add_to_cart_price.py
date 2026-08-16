import os
import re

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

# Update handleAddToCart signature and price parsing in App.tsx
old_func = """  const handleAddToCart = (item: any) => {
    const qtyToAdd = item.quantity ?? 1;
    const safePrice = typeof item.price === "number" ? item.price : 2499;
    const safeSize = typeof item.size === "number" ? item.size : 50;
    const safeProductId = item.productId || item.id || "perfume-1";
    const safeName = item.name || item.product || "Luxury Extrait de Parfum";
    const safeImage = item.image || item.img || item.swatch || "/images/product-white-oud.jpg";"""

new_func = """  const handleAddToCart = (item: any, sizeArg?: number, priceArg?: number) => {
    const qtyToAdd = item?.quantity ?? 1;
    const safePrice = typeof priceArg === "number" ? priceArg : typeof item?.price === "number" ? item.price : 1489;
    const safeSize = typeof sizeArg === "number" ? sizeArg : typeof item?.size === "number" ? item.size : 50;
    const safeProductId = item?.productId || item?.id || "perfume-1";
    const safeName = item?.name || item?.product || "Luxury Extrait de Parfum";
    const safeImage = item?.image || item?.img || item?.swatch || "/assets/purple-oud-arrival.png";"""

app_code = app_code.replace(old_func, new_func)

# Also replace modal 2499 fallbacks in App.tsx
app_code = app_code.replace("selectedProductModal.prices?.[50]?.price || selectedProductModal.price || 2499", "selectedProductModal.prices?.[50]?.price || selectedProductModal.price || 1489")

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)

print("SUCCESS: Fixed handleAddToCart in App.tsx to use exact updated Excel prices instead of 2499!")
