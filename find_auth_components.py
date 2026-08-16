import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components"

print("=== COMPONENTS LIST ===")
for f in os.listdir(src_dir):
    if "account" in f.lower() or "login" in f.lower() or "auth" in f.lower() or "user" in f.lower():
        print(f"File: {f}")
