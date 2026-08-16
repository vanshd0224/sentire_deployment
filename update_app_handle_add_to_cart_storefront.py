import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

# Add import for syncAddToCartToShopifyStorefront at top of App.tsx
if 'import { syncAddToCartToShopifyStorefront }' not in app_code:
    lines = app_code.splitlines()
    lines.insert(1, 'import { syncAddToCartToShopifyStorefront } from "./utils/shopifyCart";')
    app_code = "\n".join(lines)

# Update handleAddToCart in App.tsx to call syncAddToCartToShopifyStorefront
old_handle_start = "const handleAddToCart = (item: any, sizeArg?: number, priceArg?: number) => {"
start_idx = app_code.find(old_handle_start)

if start_idx != -1:
    end_idx = app_code.find("setIsCartOpen(true);", start_idx)
    if end_idx != -1:
        insert_code = "\n    // Trigger real-time Shopify Storefront GraphQL mutation (cartCreate / cartLinesAdd)\n    syncAddToCartToShopifyStorefront(newItem, qtyToAdd);\n"
        app_code = app_code[:end_idx] + insert_code + "    " + app_code[end_idx:]

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)

print("SUCCESS: Updated handleAddToCart in App.tsx to call syncAddToCartToShopifyStorefront!")
