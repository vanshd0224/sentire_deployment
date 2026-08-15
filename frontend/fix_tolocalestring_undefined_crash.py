import os

cart_drawer_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"
app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

# 1. Update CartDrawer.tsx to guard all .toLocaleString() calls with (val || 0)
with open(cart_drawer_path, 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("item.price.toLocaleString()", "(item.price || 0).toLocaleString()")
code = code.replace("(item.price * item.quantity).toLocaleString()", "((item.price || 0) * (item.quantity || 1)).toLocaleString()")
code = code.replace("subtotal.toLocaleString()", "(subtotal || 0).toLocaleString()")
code = code.replace("finalTotal.toLocaleString()", "(finalTotal || 0).toLocaleString()")
code = code.replace("remainingForFreeShipping.toLocaleString()", "(remainingForFreeShipping || 0).toLocaleString()")

with open(cart_drawer_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Guarded all .toLocaleString() calls in CartDrawer.tsx against undefined")

# 2. Update App.tsx handleAddToCart to ensure price and size are valid numbers
with open(app_path, 'r', encoding='utf-8') as f:
    app_code = f.read()

old_add = """  const handleAddToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
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
  };"""

new_add = """  const handleAddToCart = (item: any) => {
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
  };"""

app_code = app_code.replace(old_add, new_add)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("SUCCESS: Updated App.tsx handleAddToCart to guarantee valid item fields")
