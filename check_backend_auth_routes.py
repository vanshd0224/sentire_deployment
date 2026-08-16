import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend"

print("=== CHECKING BACKEND AUTH AND CUSTOMER ROUTES ===")
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if "auth" in f.lower() or "user" in f.lower() or "customer" in f.lower():
            fp = os.path.join(root, f)
            print(f"File: {os.path.relpath(fp, src_dir)}")
