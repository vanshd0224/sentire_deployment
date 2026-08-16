import os

project_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

print("=== SEARCHING FOR SHOPIFY KEYS / TOKENS IN PROJECT ===")
for root, dirs, files in os.walk(project_dir):
    for f in files:
        if any(kw in f.lower() for kw in ["env", "config", "shopify", "key", "token"]):
            fp = os.path.join(root, f)
            print(f"File: {os.path.relpath(fp, project_dir)}")
            try:
                with open(fp, "r", encoding="utf-8") as file_in:
                    content = file_in.read()
                    if "shopify" in content.lower() or "shpat_" in content or "shpca_" in content:
                        print(f"  FOUND SHOPIFY CONTENT IN {f}!")
            except Exception as e:
                pass
