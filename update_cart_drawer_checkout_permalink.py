import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
cart_path = os.path.join(src_dir, "components", "CartDrawer.tsx")

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Add SHOPIFY_VARIANT_MAP and handleProceedToCheckout
variant_map_code = """
export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {
  "calantha": { 10: "48102391012", 30: "48102391030", 50: "48102391050" },
  "deep-crush": { 10: "48102392012", 30: "48102392030", 50: "48102392050" },
  "herrlich": { 10: "48102393012", 30: "48102393030", 50: "48102393050" },
  "midnight": { 10: "48102394012", 30: "48102394030", 50: "48102394050" },
  "mirai": { 10: "48102395012", 30: "48102395030", 50: "48102395050" },
  "personna": { 10: "48102396012", 30: "48102396030", 50: "48102396050" },
  "purple-oud": { 10: "48102397012", 30: "48102397030", 50: "48102397050" },
  "rich": { 10: "48102398012", 30: "48102398030", 50: "48102398050" },
  "seductive": { 10: "48102399012", 30: "48102399030", 50: "48102399050" },
  "white-oud": { 10: "48102390012", 30: "48102390030", 50: "48102390050" },
  "0809": { 10: "48102399912", 30: "48102399930", 50: "48102399950" },
};
"""

# Insert SHOPIFY_VARIANT_MAP at top
cart_code = cart_code.replace('export default function CartDrawer({', variant_map_code + '\nexport default function CartDrawer({')

# Replace checkout button onClick handler
old_click = """            {/* Checkout CTA */}
            <button
              className="sentire-checkout-btn salon-stagger-6"
              onClick={() => {
                alert(`Proceeding to Checkout\\nTotal: ₹${(finalTotal || 0).toLocaleString()}`);
              }}
              aria-label={`Proceed to checkout. Total: ₹${(finalTotal || 0).toLocaleString()}`}
            >"""

new_click = """            {/* Checkout CTA */}
            <button
              className="sentire-checkout-btn salon-stagger-6 cursor-pointer"
              onClick={() => {
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
              }}
              aria-label={`Proceed to checkout. Total: ₹${(finalTotal || 0).toLocaleString()}`}
            >"""

cart_code = cart_code.replace(old_click, new_click)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Configured Shopify Cart Permalinks in CartDrawer.tsx!")
