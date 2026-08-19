import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

print("=== SEARCHING FOR ENV FILES AND SHOPIFY TOKENS ===")

for root, dirs, files in os.walk(base_dir):
    if "node_modules" in root or ".git" in root or "dist" in root:
        continue
    for f in files:
        if ".env" in f or "config" in f or "key" in f.lower():
            fp = os.path.join(root, f)
            print(f"Found file: {os.path.relpath(fp, base_dir)}")
            try:
                with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                    lines = file.readlines()
                    for l in lines:
                        if any(k in l.upper() for k in ["SHOPIFY", "TOKEN", "DOMAIN", "URL", "SECRET"]):
                            print("  •", l.strip())
            except Exception as e:
                print("  • Error reading:", e)
