import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file_in:
                text = file_in.read()
                if "checkout" in text.lower() or "shopify" in text.lower() or "cart" in text.lower():
                    print(f"Match in: {os.path.relpath(fp, src_dir)}")
