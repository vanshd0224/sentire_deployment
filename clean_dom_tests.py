import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\expand_order_summary_and_verify.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_actual_shopify_checkout_dom.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\shopify_checkout_rendered_proof.png",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\shopify_checkout_expanded_proof.png"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up DOM test scripts!")
