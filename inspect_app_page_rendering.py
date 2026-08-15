import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
app_path = os.path.join(src_dir, "App.tsx")

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

lines = app_code.splitlines()
for idx, line in enumerate(lines):
    if "activePage ===" in line:
        print(f"Line {idx+1}: {line}")
