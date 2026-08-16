import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Replace the onClick handler in CartDrawer.tsx with the proven 100% native HTML Form POST submission!
old_onClick_start = "onClick={async () => {"
old_onClick_end = "window.location.href = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}`;\n              }}"

start_idx = cart_code.find(old_onClick_start)
end_idx = cart_code.find(old_onClick_end)

if start_idx != -1 and end_idx != -1:
    end_idx += len(old_onClick_end)
    
    new_onClick = """onClick={() => {
                if (items.length === 0) return;

                // Create and submit native HTML form POST directly to Shopify /cart/add
                const form = document.createElement("form");
                form.method = "POST";
                form.action = "https://hbj1d0-99.myshopify.com/cart/add";

                items.forEach((item, index) => {
                  const variantId = resolveShopifyVariantId(item);

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
    
    cart_code = cart_code[:start_idx] + new_onClick + cart_code[end_idx:]

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx onClick handler to pure native HTML Form POST!")
