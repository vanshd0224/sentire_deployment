import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

perfumes = [
    "0809", "calantha", "deep-crush", "herrlich", "midnight",
    "mirai", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

print("=== VERIFYING 50ML ASSETS ACROSS ALL 11 PERFUMES ===")

missing_count = 0
for p in perfumes:
    sub_50 = os.path.join(base_dir, "perfumes", p, "50ml")
    root_perfumes_1 = os.path.join(base_dir, "perfumes", f"{p}-50ml-1.png")
    assets_root_1 = os.path.join(base_dir, f"{p}-50ml-1.png")
    
    sub_files = os.listdir(sub_50) if os.path.exists(sub_50) else []
    
    print(f"Perfume {p.upper():<12} -> Subfolder: {len(sub_files)} files | PerfumesRoot: {os.path.exists(root_perfumes_1)} | AssetsRoot: {os.path.exists(assets_root_1)}")
    if len(sub_files) < 3 or not os.path.exists(root_perfumes_1) or not os.path.exists(assets_root_1):
        missing_count += 1

print(f"\nVerification Complete! Missing/inaccessible perfumes: {missing_count}")
