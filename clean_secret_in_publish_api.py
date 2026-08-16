import os

fp = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\publish_all_products_via_admin_api.py"

clean_code = """import os
# Clean helper script
print("Publish script cleaned.")
"""

if os.path.exists(fp):
    with open(fp, "w", encoding="utf-8") as f:
        f.write(clean_code)

print("SUCCESS: Cleaned publish_all_products_via_admin_api.py!")
