import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Inspect CartDrawer.tsx code for any missing imports, double exports, or syntax errors
print("Length of CartDrawer.tsx:", len(cart_code))
print("First 30 lines:")
print("\n".join(cart_code.splitlines()[:30]))
