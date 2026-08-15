import json
import os
import shutil

downloads_path = r"C:\Users\asus\Downloads"
dest_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

os.makedirs(dest_dir, exist_ok=True)

# Define Perfume mapping to folders in Downloads
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

print("Processing and copying 3-3 photos for each size of every perfume...")

# Scan all extracted folders in Downloads
all_folders = [os.path.join(downloads_path, d) for d in os.listdir(downloads_path) if os.path.isdir(os.path.join(downloads_path, d))]

catalog_map = {}

for p in perfumes:
    p_id = p["id"]
    p_name = p["name"]
    catalog_map[p_id] = {}

    for sz in sizes:
        # Find matching folder for this perfume and size
        matched_images = []
        
        for f_path in all_folders:
            folder_base = os.path.basename(f_path).upper()
            if p_name in folder_base and str(sz) in folder_base:
                # Walk inside folder
                for root, dirs, files in os.walk(f_path):
                    for fname in sorted(files):
                        if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                            # Filter out model photos if name contains model or human
                            if "model" not in fname.lower() and "human" not in fname.lower():
                                matched_images.append(os.path.join(root, fname))

        # Search inside drive-download folders if empty
        if len(matched_images) < 3:
            for f_path in all_folders:
                if "DRIVE-DOWNLOAD" in os.path.basename(f_path).upper():
                    for root, dirs, files in os.walk(f_path):
                        r_upper = root.upper()
                        if p_name in r_upper and str(sz) in r_upper:
                            for fname in sorted(files):
                                if fname.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                                    if "model" not in fname.lower():
                                        matched_images.append(os.path.join(root, fname))

        # Take up to 3 best photos
        copied_urls = []
        if matched_images:
            # Pick 3 spread out photos
            selected = matched_images[:3] if len(matched_images) <= 3 else [matched_images[0], matched_images[len(matched_images)//2], matched_images[-1]]
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

        # Fallback if less than 3 images
        if not copied_urls:
            # Fallback to main product asset image
            fallback_img = f"/assets/{p_id}.png"
            copied_urls = [fallback_img, fallback_img, fallback_img]
        elif len(copied_urls) == 1:
            copied_urls = [copied_urls[0], copied_urls[0], copied_urls[0]]
        elif len(copied_urls) == 2:
            copied_urls = [copied_urls[0], copied_urls[1], copied_urls[0]]

        catalog_map[p_id][sz] = copied_urls
        print(f"  - {p_name} ({sz} ML): {len(copied_urls)} photos -> {copied_urls}")

print("\nProcessing complete. Writing catalog map...")

with open("perfume_size_images_catalog.json", "w") as f:
    json.dump(catalog_map, f, indent=2)

print("SUCCESS: perfume_size_images_catalog.json created!")
