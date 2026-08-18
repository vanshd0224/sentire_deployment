import os

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

perfumes = [
    "0809", "calantha", "deep-crush", "herrlich", "midnight",
    "mirai", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

print("=== DETAILED EXTRACT OF ALL 50ML IMAGES ===")

for p in perfumes:
    print(f"\n==========================================")
    print(f"PERFUME: {p.upper()} (50 ML)")
    print(f"==========================================")
    
    p_paths = []
    
    # 1. Subfolder: assets/perfumes/<p>/50ml/
    subfolder = os.path.join(base_dir, "perfumes", p, "50ml")
    if os.path.exists(subfolder):
        files = os.listdir(subfolder)
        for f in sorted(files):
            full_path = os.path.join(subfolder, f)
            size = os.path.getsize(full_path)
            p_paths.append(f"Subfolder -> {f} ({size} bytes)")
            
    # 2. Perfumes root: assets/perfumes/<p>-50ml-*.png
    perfumes_root = os.path.join(base_dir, "perfumes")
    if os.path.exists(perfumes_root):
        files = [f for f in os.listdir(perfumes_root) if f.startswith(f"{p}-50ml-") or f.startswith(f"{p}_50ml_") or f.startswith(f"{p}-50-")]
        for f in sorted(files):
            full_path = os.path.join(perfumes_root, f)
            if os.path.isfile(full_path):
                size = os.path.getsize(full_path)
                p_paths.append(f"Perfumes Root -> {f} ({size} bytes)")

    # 3. Assets root: assets/<p>-50ml-*.png
    files = [f for f in os.listdir(base_dir) if f.startswith(f"{p}-50ml-") or f.startswith(f"{p}_50ml_") or f.startswith(f"{p}-50-")]
    for f in sorted(files):
        full_path = os.path.join(base_dir, f)
        if os.path.isfile(full_path):
            size = os.path.getsize(full_path)
            p_paths.append(f"Assets Root -> {f} ({size} bytes)")

    if p_paths:
        for item in p_paths:
            print("  *", item)
    else:
        print("  [WARN] No 50 ML images found in assets for this perfume!")
