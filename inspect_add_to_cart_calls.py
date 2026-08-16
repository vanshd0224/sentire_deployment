import os

app_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\App.tsx"

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

# Inspect handleAddToCart signature and object construction
start_idx = app_code.find("handleAddToCart")
if start_idx != -1:
    print(app_code[start_idx:start_idx+1000])
