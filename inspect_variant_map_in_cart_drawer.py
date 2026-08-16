import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Print SHOPIFY_VARIANT_MAP snippet from CartDrawer.tsx
start_idx = cart_code.find("SHOPIFY_VARIANT_MAP")
if start_idx != -1:
    print(cart_code[start_idx:start_idx+1200])
else:
    print("SHOPIFY_VARIANT_MAP not found!")
