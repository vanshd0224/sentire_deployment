import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Add a timestamp comment to force fresh trigger
comment = f"// Force deployment trigger timestamp: 2026-08-16T18:42:00Z\n"
if "// Force deployment trigger" not in cart_code:
    cart_code = comment + cart_code
else:
    # Update timestamp comment
    lines = cart_code.splitlines()
    lines[0] = comment.strip()
    cart_code = "\n".join(lines)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Updated CartDrawer.tsx comment to trigger fresh GitHub Actions build!")
