import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

lines = cart_code.splitlines()
for i, line in enumerate(lines, 1):
    if "button" in line.lower() or "checkout" in line.lower() or "action" in line.lower() or "proceed" in line.lower():
        print(f"Line {i}: {line.strip()[:120]}")
