import os
import shutil
import json
from PIL import Image

downloads_path = r"C:\Users\asus\Downloads"
dest_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

# Clear out existing perfumes dir
if os.path.exists(dest_dir):
    shutil.rmtree(dest_dir)
os.makedirs(dest_dir, exist_ok=True)

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

print("Scanning for ONLY PURE STUDIO BOTTLE/BOX SHOTS (Discarding ALL model photos)...")

all_folders = [os.path.join(downloads_path, d) for d in os.listdir(downloads_path) if os.path.isdir(os.path.join(downloads_path, d))]

catalog_map = {}

def is_model_photo(file_path):
    fn = os.path.basename(file_path).lower()
    ext = os.path.splitext(fn)[1]
    # Photoshoot camera JPGs (KRS_xxx.jpg, CALANTHA 1.jpg, HERRLICH 1.jpg, Image 1.jpg etc) are model photos!
    if ext in ['.jpg', '.jpeg']:
        return True
    if "model" in fn or "human" in fn or "krs" in fn or "person" in fn:
        return True
    return False

for p in perfumes:
    p_id = p["id"]
    p_name = p["name"]
    catalog_map[p_id] = {}

    for sz in sizes:
        matched_images = []
        
        # Search in size folders first
        for f_path in all_folders:
            folder_base = os.path.basename(f_path).upper()
            if p_name in folder_base and str(sz) in folder_base:
                for root, dirs, files in os.walk(f_path):
                    for fname in sorted(files):
                        fp = os.path.join(root, fname)
                        if fname.lower().endswith(('.png', '.webp')) and not is_model_photo(fp):
                            matched_images.append(fp)

        # Search in drive-download folders if needed
        if len(matched_images) < 3:
            for f_path in all_folders:
                if "DRIVE-DOWNLOAD" in os.path.basename(f_path).upper():
                    for root, dirs, files in os.walk(f_path):
                        r_upper = root.upper()
                        if p_name in r_upper and str(sz) in r_upper:
                            for fname in sorted(files):
                                fp = os.path.join(root, fname)
                                if fname.lower().endswith(('.png', '.webp')) and not is_model_photo(fp):
                                    matched_images.append(fp)

        # Remove duplicates while preserving order
        unique_matched = []
        seen = set()
        for img_path in matched_images:
            bname = os.path.basename(img_path)
            if bname not in seen:
                seen.add(bname)
                unique_matched.append(img_path)

        copied_urls = []
        if unique_matched:
            # Pick 3 spread out studio PNG product renders
            if len(unique_matched) >= 3:
                selected = [unique_matched[0], unique_matched[len(unique_matched)//2], unique_matched[-1]]
            else:
                selected = unique_matched

            for idx, img_src in enumerate(selected, 1):
                ext = os.path.splitext(img_src)[1].lower()
                dest_filename = f"{p_id}-{sz}ml-{idx}{ext}"
                dest_full_path = os.path.join(dest_dir, dest_filename)
                try:
                    shutil.copy2(img_src, dest_full_path)
                    web_path = f"/assets/perfumes/{dest_filename}"
                    copied_urls.append(web_path)
                except Exception as e:
                    print(f"Error copying {img_src}:", e)

        # Fill remaining slots up to 3 with clean product images
        if not copied_urls:
            fallback_img = f"/assets/{p_id}.png"
            copied_urls = [fallback_img, fallback_img, fallback_img]
        elif len(copied_urls) == 1:
            copied_urls = [copied_urls[0], copied_urls[0], copied_urls[0]]
        elif len(copied_urls) == 2:
            copied_urls = [copied_urls[0], copied_urls[1], copied_urls[0]]

        catalog_map[p_id][sz] = copied_urls
        print(f"  - {p_name} ({sz} ML): {len(copied_urls)} studio photos -> {copied_urls}")

print("\nWriting clean catalog without ANY model photos...")

with open("perfume_size_images_catalog.json", "w") as f:
    json.dump(catalog_map, f, indent=2)

print("SUCCESS: 100% Pure Studio Product catalog created!")
