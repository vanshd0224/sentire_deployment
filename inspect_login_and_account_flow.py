import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

login_path = os.path.join(src_dir, "components", "LoginModal.tsx")
nav_path = os.path.join(src_dir, "components", "Navbar.tsx")

with open(login_path, "r", encoding="utf-8") as f:
    login_code = f.read()

print("=== LOGIN MODAL CAPABILITIES ===")
lines = login_code.splitlines()
for idx, line in enumerate(lines[:50]):
    print(f"L{idx+1}: {line}")
