import os

# Overwrite helper python files to remove hardcoded secret strings
files_to_clean = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\update_backend_env_admin_token.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\update_backend_env_shopify_keys.py"
]

clean_code = """import os
# Secret loader helper
print("Secret helper executed safely.")
"""

for fp in files_to_clean:
    if os.path.exists(fp):
        with open(fp, "w", encoding="utf-8") as f:
            f.write(clean_code)

print("SUCCESS: Cleaned hardcoded secrets from python scripts!")
