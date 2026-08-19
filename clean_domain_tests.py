import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_shopify_domain_variations.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\fetch_primary_domain_from_shopify_admin.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_signed_storefront_cartcreate_flow.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\selenium_test_redirect_formats.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_all_checkout_redirect_formats.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\debug_shopify_domain_reachability.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up domain test scripts!")
