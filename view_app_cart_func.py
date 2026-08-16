import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

lines = app_code.splitlines()
for idx in range(75, 115):
    if idx < len(lines):
        print(f"L{idx+1}: {lines[idx]}")
