import os

assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
images_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\images"

print("=== CHECKING ALL PURPLE OUD IMAGES IN ASSETS AND IMAGES ===")
for root, dirs, files in os.walk(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"):
    for f in files:
        if "purple" in f.lower() or "oud" in f.lower():
            fp = os.path.join(root, f)
            print(f"Found: {os.path.relpath(fp, r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public')}")

