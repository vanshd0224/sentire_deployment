import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Inspect onClick in CartDrawer.tsx
start_idx = cart_code.find("PROCEED TO CHECKOUT")
if start_idx != -1:
    btn_code = cart_code[start_idx-400:start_idx+100]
    print("=== CHECKOUT BUTTON ONCLICK IN CartDrawer.tsx ===")
    print(btn_code)
else:
    print("PROCEED TO CHECKOUT text not found!")
