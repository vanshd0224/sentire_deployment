import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\audit_shopify_admin_settings.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_token_test.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_graphql_cart_creation_and_redirect.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up audit scripts!")
