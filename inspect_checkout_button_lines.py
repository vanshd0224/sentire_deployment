import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

lines = cart_code.splitlines()
print("=== LINES 690 TO 745 OF CartDrawer.tsx ===")
for i in range(689, min(745, len(lines))):
    print(f"Line {i+1}: {lines[i]}")
