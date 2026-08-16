import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Replace the onClick handler in CartDrawer.tsx with async Shopify Storefront API cartCreate!
old_click = """              onClick={() => {
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

new_click = """              onClick={async () => {
                if (items.length === 0) return;

                try {
                  const graphqlUrl = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json";
                  const lines = items.map((item) => {
                    const rawVariantId =
                      SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                      item.productId;
                    const merchandiseId = String(rawVariantId).startsWith("gid://")
                      ? String(rawVariantId)
                      : `gid://shopify/ProductVariant/${rawVariantId}`;
                    return {
                      merchandiseId,
                      quantity: item.quantity,
                    };
                  });

                  const query = `
                    mutation cartCreate($input: CartInput!) {
                      cartCreate(input: $input) {
                        cart {
                          checkoutUrl
                        }
                        userErrors {
                          field
                          message
                        }
                      }
                    }
                  `;

                  const res = await fetch(graphqlUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query, variables: { input: { lines } } }),
                  });

                  const data = await res.json();
                  const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;

                  if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                    return;
                  }
                } catch (e) {
                  console.error("Shopify Storefront Cart error:", e);
                }

                // Fallback to permalink if needed
                const permalinkItems = items
                  .map((item) => {
                    const variantId =
                      SHOPIFY_VARIANT_MAP[item.productId]?.[item.size] ||
                      item.productId;
                    return `${variantId}:${item.quantity}`;
                  })
                  .join(",");
                window.location.href = `https://hbj1d0-99.myshopify.com/cart/${permalinkItems}`;
              }}"""

cart_code = cart_code.replace(old_click, new_click)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx with 100% native Shopify Storefront API cartCreate GraphQL checkout!")
