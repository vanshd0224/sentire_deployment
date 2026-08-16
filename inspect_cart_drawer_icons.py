import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Inspect top 50 lines of CartDrawer.tsx to see icon imports and definitions
print("=== TOP 50 LINES OF CartDrawer.tsx ===")
print("\n".join(cart_code.splitlines()[:50]))

# Search for IconClose or X icon definitions in CartDrawer.tsx
print("\n=== ICON USAGES IN CartDrawer.tsx ===")
for i, line in enumerate(cart_code.splitlines(), 1):
    if "Icon" in line or "<svg" in line or "lucide" in line:
        print(f"Line {i}: {line.strip()}")
