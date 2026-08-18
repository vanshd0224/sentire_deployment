import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_storefront_cart_checkouturl.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\verify_and_harden_shopify_cart.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up hardening scripts!")
