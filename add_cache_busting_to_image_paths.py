import re

perfumes_ts_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"

with open(perfumes_ts_path, "r", encoding="utf-8") as f:
    code = f.read()

# Add ?v=2 to all asset image paths in perfumes.ts if not already present
if "?v=2" not in code:
    code = code.replace(".png\"", ".png?v=2\"")
    code = code.replace(".jpg\"", ".jpg?v=2\"")
    code = code.replace(".webp\"", ".webp?v=2\"")
    with open(perfumes_ts_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("SUCCESS: Added ?v=2 cache-busting parameters to all image paths in perfumes.ts!")

