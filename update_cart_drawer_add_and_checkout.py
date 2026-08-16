import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

old_click_logic = """              onClick={() => {
                if (items.length === 0) return;
                const permalinkItems = items
                  .map((item) => {
                    const variantId =
                      SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                      `${item.productId}-${item.size}`;
                    return `${variantId}:${item.quantity}`;
                  })
                  .join(",");
                const checkoutUrl = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}?checkout`;
                window.location.href = checkoutUrl;
              }}"""

new_click_logic = """              onClick={() => {
                if (items.length === 0) return;
                if (items.length === 1) {
                  const item = items[0];
                  const variantId =
                    SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                    item.productId;
                  const checkoutUrl = `https://hbj1d0-99.myshopify.com/cart/add?id=${variantId}&quantity=${item.quantity}`;
                  window.location.href = checkoutUrl;
                } else {
                  const permalinkItems = items
                    .map((item) => {
                      const variantId =
                        SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                        item.productId;
                      return `${variantId}:${item.quantity}`;
                    })
                    .join(",");
                  const checkoutUrl = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}`;
                  window.location.href = checkoutUrl;
                }
              }}"""

cart_code = cart_code.replace(old_click_logic, new_click_logic)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx redirect logic for instant Shopify Cart Add & Checkout!")
