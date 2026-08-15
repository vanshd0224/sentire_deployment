import os

pub_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"

print("=== ALL IMAGE FILES IN FRONTEND/PUBLIC ===")
for root, dirs, files in os.walk(pub_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            rel = os.path.relpath(os.path.join(root, f), pub_dir)
            print(f"  /assets/{rel.replace('\\', '/')}" if not rel.startswith("assets") else f"  /{rel.replace('\\', '/')}")

