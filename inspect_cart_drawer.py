import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
cart_path = os.path.join(src_dir, "components", "CartDrawer.tsx")

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

print("=== CART DRAWER CODE ===")
print(cart_code)
