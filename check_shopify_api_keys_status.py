import os

backend_env = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\.env"
frontend_env = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\.env"

print("=== CHECKING SHOPIFY API KEYS STATUS IN BACKEND & FRONTEND ===")

if os.path.exists(backend_env):
    with open(backend_env, "r", encoding="utf-8") as f:
        content = f.read()
        print("\n--- BACKEND .ENV SHOPIFY KEYS ---")
        for line in content.splitlines():
            if "shopify" in line.lower() or "token" in line.lower() or "secret" in line.lower():
                print(line.strip())
else:
    print("backend/.env not found")

if os.path.exists(frontend_env):
    with open(frontend_env, "r", encoding="utf-8") as f:
        content = f.read()
        print("\n--- FRONTEND .ENV SHOPIFY KEYS ---")
        for line in content.splitlines():
            if "shopify" in line.lower() or "token" in line.lower():
                print(line.strip())
else:
    print("\nfrontend/.env does not exist yet")
