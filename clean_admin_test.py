import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_shopify_admin_api_access.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up test_shopify_admin_api_access.py")
