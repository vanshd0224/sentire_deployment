import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Separate imports from code
lines = cart_code.splitlines()

imports = []
non_imports = []

for line in lines:
    if line.startswith("import ") or line.startswith("import type "):
        imports.append(line)
    else:
        non_imports.append(line)

fixed_code = "\n".join(imports) + "\n\n" + "\n".join(non_imports)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(fixed_code)

print("SUCCESS: Moved all import statements to the top of CartDrawer.tsx!")
