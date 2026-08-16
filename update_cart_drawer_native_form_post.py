import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Replace onClick in CartDrawer with dynamic HTML Form POST submission
old_click_logic = """              onClick={() => {
                if (items.length === 0) return;
                const permalinkItems = items
                  .map((item) => {
                    const variantId =
                      SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                      item.productId;
                    return `${variantId}:${item.quantity}`;
                  })
                  .join(",");
                const checkoutUrl = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}?checkout=true`;
                window.location.href = checkoutUrl;
              }}"""

new_click_logic = """              onClick={() => {
                if (items.length === 0) return;

                // Create and submit native HTML form POST to Shopify
                const form = document.createElement("form");
                form.method = "POST";
                form.action = "https://hbj1d0-99.myshopify.com/cart/add";

                items.forEach((item, index) => {
                  const variantId =
                    SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                    item.productId;

                  const idInput = document.createElement("input");
                  idInput.type = "hidden";
                  idInput.name = `items[${index}][id]`;
                  idInput.value = String(variantId);
                  form.appendChild(idInput);

                  const qtyInput = document.createElement("input");
                  qtyInput.type = "hidden";
                  qtyInput.name = `items[${index}][quantity]`;
                  qtyInput.value = String(item.quantity);
                  form.appendChild(qtyInput);
                });

                const returnInput = document.createElement("input");
                returnInput.type = "hidden";
                returnInput.name = "return_to";
                returnInput.value = "/checkout";
                form.appendChild(returnInput);

                document.body.appendChild(form);
                form.submit();
              }}"""

cart_code = cart_code.replace(old_click_logic, new_click_logic)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx to use Native HTML Form POST submission to Shopify /cart/add with return_to=/checkout!")
