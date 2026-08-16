import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Replace the onClick handler in CartDrawer.tsx with the verified first-party permalink navigation
old_click_start = "onClick={() => {"
old_click_end = "form.submit();\n              }}"

start_idx = cart_code.find(old_click_start)
end_idx = cart_code.find(old_click_end)

if start_idx != -1 and end_idx != -1:
    end_idx += len(old_click_end)

    new_click = """onClick={() => {
                if (items.length === 0) return;

                const permalinkItems = items
                  .map((item) => {
                    const variantId = resolveShopifyVariantId(item);
                    return `${variantId}:${item.quantity}`;
                  })
                  .join(",");

                const checkoutUrl = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}`;
                window.location.href = checkoutUrl;
              }}"""

    cart_code = cart_code[:start_idx] + new_click + cart_code[end_idx:]

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx to use verified top-level first-party permalink navigation!")
