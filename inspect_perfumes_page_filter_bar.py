import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
perfumes_page_path = os.path.join(src_dir, "components", "PerfumesPage.tsx")

with open(perfumes_page_path, "r", encoding="utf-8") as f:
    code = f.read()

print("=== PERFUMES PAGE HEADER AND FILTER BAR CODE ===")
print(code[:3000])
