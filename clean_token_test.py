import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_storefront_token_checkout.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up test_storefront_token_checkout.py")
