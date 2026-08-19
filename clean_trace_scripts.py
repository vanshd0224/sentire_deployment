import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_graphql_cartcreate_unauthenticated.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\deep_cart_url_trace.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_shopify_cart_with_cookie_jar.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up trace scripts!")
