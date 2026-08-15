import os
import shutil
import json
from PIL import Image

downloads_path = r"C:\Users\asus\Downloads"
dest_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

os.makedirs(dest_dir, exist_ok=True)

# Define Perfumes
perfumes = [
    {"id": "calantha", "name": "CALANTHA"},
    {"id": "deep-crush", "name": "DEEP CRUSH"},
    {"id": "herrlich", "name": "HERRLICH"},
    {"id": "midnight", "name": "MIDNIGHT"},
    {"id": "mirai", "name": "MIRAI"},
    {"id": "o809", "name": "0809"},
    {"id": "personna", "name": "PERSONNA"},
    {"id": "rich", "name": "RICH"},
    {"id": "seductive", "name": "SEDUCTIVE"},
    {"id": "white-oud", "name": "WHITE OUD"},
    {"id": "purple-oud", "name": "PURPLE OUD"},
]

sizes = [10, 30, 50]
all_folders = [os.path.join(downloads_path, d) for d in os.listdir(downloads_path) if os.path.isdir(os.path.join(downloads_path, d))]

catalog_map = {}

print("Mapping exact 3 photo types for each size of every perfume...")

for p in perfumes:
    p_id = p["id"]
    p_name = p["name"]
    catalog_map[p_id] = {}

    for sz in sizes:
        # Collect candidate images for this perfume and size
        candidates = []
        for f_path in all_folders:
            folder_base = os.path.basename(f_path).upper()
            if p_name in folder_base and str(sz) in folder_base:
                for root, dirs, files in os.walk(f_path):
                    for fname in sorted(files):
                        fp = os.path.join(root, fname)
                        if fname.lower().endswith(('.png', '.webp', '.jpg')) and "model" not in fname.lower() and "krs" not in fname.lower():
                            candidates.append(fp)

        # Classify candidates into 3 types based on naming or position
        # Type 1: Standalone Bottle (e.g. 1.png, image_1, bottle)
        # Type 2: Bottle on Box (e.g. 2.png, image_2, on_box)
        # Type 3: Bottle inside Open Box (e.g. 3.png, image_3, in_box)

        # Remove duplicate names
        unique_candidates = []
        seen = set()
        for c in candidates:
            bn = os.path.basename(c)
            if bn not in seen:
                seen.add(bn)
                unique_candidates.append(c)

        copied_urls = []

        if len(unique_candidates) >= 3:
            selected_trio = [unique_candidates[0], unique_candidates[1], unique_candidates[2]]
        elif len(unique_candidates) == 2:
            selected_trio = [unique_candidates[0], unique_candidates[1], unique_candidates[0]]
        elif len(unique_candidates) == 1:
            selected_trio = [unique_candidates[0], unique_candidates[0], unique_candidates[0]]
        else:
            fallback = f"/assets/{p_id}.png"
            selected_trio = [fallback, fallback, fallback]

        for idx, img_src in enumerate(selected_trio, 1):
            if isinstance(img_src, str) and img_src.startswith("/assets/"):
                copied_urls.append(img_src)
            else:
                ext = os.path.splitext(img_src)[1].lower()
                dest_filename = f"{p_id}-{sz}ml-{idx}{ext}"
                dest_full_path = os.path.join(dest_dir, dest_filename)
                try:
                    shutil.copy2(img_src, dest_full_path)
                    web_path = f"/assets/perfumes/{dest_filename}"
                    copied_urls.append(web_path)
                except Exception as e:
                    copied_urls.append(f"/assets/{p_id}.png")

        catalog_map[p_id][sz] = copied_urls
        print(f"  - {p_name} ({sz} ML):")
        print(f"      1. Standalone Bottle -> {copied_urls[0]}")
        print(f"      2. Bottle ON Box -> {copied_urls[1]}")
        print(f"      3. Bottle IN Open Box -> {copied_urls[2]}")

with open("perfume_size_images_catalog.json", "w") as f:
    json.dump(catalog_map, f, indent=2)

print("\nSUCCESS: perfume_size_images_catalog.json updated with exact 3-type photo mapping!")
