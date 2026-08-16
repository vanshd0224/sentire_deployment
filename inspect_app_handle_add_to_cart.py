import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

lines = app_code.splitlines()
for idx, line in enumerate(lines):
    if "handleAddToCart" in line or "safePrice" in line or "2499" in line:
        print(f"L{idx+1}: {line}")
