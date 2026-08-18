import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

print("=== CHECKING ALL PURPLE OUD FILES IN ASSETS ===")

files_assets = [f for f in os.listdir(base_dir) if "purple" in f.lower() or "oud" in f.lower()]
print("In frontend/public/assets:")
for f in sorted(files_assets):
    print("  •", f, f"({os.path.getsize(os.path.join(base_dir, f))} bytes)")

perfumes_dir = os.path.join(base_dir, "perfumes")
if os.path.exists(perfumes_dir):
    files_perfumes = [f for f in os.listdir(perfumes_dir) if "purple" in f.lower() or "oud" in f.lower()]
    print("\nIn frontend/public/assets/perfumes:")
    for f in sorted(files_perfumes):
        print("  •", f)
        
    po_sub = os.path.join(perfumes_dir, "purple-oud")
    if os.path.exists(po_sub):
        print("\nIn frontend/public/assets/perfumes/purple-oud:")
        for root, dirs, files in os.walk(po_sub):
            print(root, dirs, files)
