import os

components_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components"

for root, dirs, files in os.walk(components_dir):
    for f in files:
        if f.endswith(".tsx"):
            filepath = os.path.join(root, f)
            with open(filepath, "r", encoding="utf-8", errors="ignore") as file:
                lines = file.readlines()
                for line_no, line in enumerate(lines, start=1):
                    if "ProductDetailModal" in line:
                        print(f"{f}:{line_no}: {line.strip()}")
