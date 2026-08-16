import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Inspect checkout button JSX in CartDrawer.tsx
start_idx = cart_code.find("PROCEED TO CHECKOUT")
if start_idx != -1:
    print(cart_code[start_idx-600:start_idx+300])
else:
    print("PROCEED TO CHECKOUT text not found!")
