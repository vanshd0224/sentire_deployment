import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

perfumes = [
    "0809", "calantha", "deep-crush", "herrlich", "midnight",
    "mirai", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

print("=== CHECKING 50ML IMAGES FOR ALL 11 PERFUMES ===")

for p in perfumes:
    print(f"\n--- PERFUME: {p.upper()} ---")
    
    # 1. Check folder assets/perfumes/<p>/50ml
    sub_dir = os.path.join(base_dir, "perfumes", p, "50ml")
    if os.path.exists(sub_dir):
        files = os.listdir(sub_dir)
        print(f"In {sub_dir}:", files)
    else:
        print(f"Folder {sub_dir} does not exist")
        
    # 2. Check assets/perfumes/<p>-50ml-*.png
    perfumes_root = os.path.join(base_dir, "perfumes")
    if os.path.exists(perfumes_root):
        root_files = [f for f in os.listdir(perfumes_root) if f.startswith(f"{p}-50ml-")]
        print(f"In assets/perfumes/{p}-50ml-*: ", root_files)

    # 3. Check assets/<p>-50ml-*.png
    assets_files = [f for f in os.listdir(base_dir) if f.startswith(f"{p}-50ml-")]
    print(f"In assets/{p}-50ml-*: ", assets_files)
