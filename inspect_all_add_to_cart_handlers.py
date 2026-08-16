import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== INSPECTING ADD TO CART HANDLERS ACROSS FRONTEND ===")

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                if "onAddToCart" in content or "handleAddToCart" in content:
                    print(f"\nFile: {os.path.relpath(fp, src_dir)}")
                    for line_no, line in enumerate(content.splitlines(), 1):
                        if "onAddToCart" in line or "handleAddToCart" in line or "cartCreate" in line:
                            print(f"  Line {line_no}: {line.strip()[:120]}")
