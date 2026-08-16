import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
acc_path = os.path.join(src_dir, "components", "AccountPage.tsx")

with open(acc_path, "r", encoding="utf-8") as f:
    acc_code = f.read()

print("=== ACCOUNT PAGE CODE SNIPPET ===")
lines = acc_code.splitlines()
for idx, line in enumerate(lines[:60]):
    print(f"L{idx+1}: {line}")
