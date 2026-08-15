import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
app_path = os.path.join(src_dir, "App.tsx")

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

print("=== APP.TSX CODE SNIPPET ===")
print(app_code[:2000])
