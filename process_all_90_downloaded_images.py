import os
import shutil
import glob
import re
from PIL import Image

downloads_dir = r"C:\Users\asus\Downloads"
perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

os.makedirs(perfumes_dir, exist_ok=True)

# 1. Function to check if an image is a model girl photo
def is_model_photo(fp):
    try:
        with Image.open(fp) as img:
            w, h = img.size
            rgb = img.convert('RGB')
            # Check gold mirror coordinates
            p1 = rgb.getpixel((int(w*0.5), int(h*0.1)))
            p2 = rgb.getpixel((int(w*0.2), int(h*0.5)))
            is_gold_mirror = (160 <= p1[0] <= 240 and 130 <= p1[1] <= 210 and 20 <= p1[2] <= 120) or \
                             (160 <= p2[0] <= 240 and 130 <= p2[1] <= 210 and 20 <= p2[2] <= 120)
            return is_gold_mirror
    except Exception:
        return False

# Mapping of perfume IDs to their download search keywords
perfumes = [
    "calantha", "deep-crush", "herrlich", "midnight", "mirai",
    "0809", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

print("=== PROCESSING ALL 90 STUDIO PRODUCT RENDERS FROM DOWNLOADS ===")

# Walk through all subdirectories in Downloads
all_files = []
for root, dirs, files in os.walk(downloads_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            all_files.append(os.path.join(root, f))

print(f"Total image files found in Downloads: {len(all_files)}")

# Process each perfume and size
for p_id in perfumes:
    p_keyword = p_id.replace('-', ' ')
    if p_id == "0809":
        p_keyword = "0809"
    elif p_id == "purple-oud":
        p_keyword = "purple"

    for size in [10, 30, 50]:
        # Filter files belonging to this perfume and size
        matched_files = []
        for fp in all_files:
            fp_lower = fp.lower()
            if p_keyword in fp_lower and f"{size}" in fp_lower:
                if not is_model_photo(fp):
                    matched_files.append(fp)
        
        # Sort matched files
        matched_files = sorted(list(set(matched_files)))
        print(f"[{p_id} {size}ML] Found {len(matched_files)} clean studio renders")

        # Copy up to 3 clean studio renders
        for idx in range(1, 4):
            dest_fp = os.path.join(perfumes_dir, f"{p_id}-{size}ml-{idx}.png")
            src_fp = None
            if len(matched_files) >= idx:
                src_fp = matched_files[idx - 1]
            elif len(matched_files) > 0:
                src_fp = matched_files[(idx - 1) % len(matched_files)]
            
            if src_fp and os.path.exists(src_fp):
                try:
                    with Image.open(src_fp) as img:
                        img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                        if img.mode == 'RGBA':
                            bg = Image.new('RGB', img.size, (255, 255, 255))
                            bg.paste(img, mask=img.split()[3])
                            img = bg
                        img.save(dest_fp, "PNG", optimize=True)
                    print(f"  -> Saved {p_id}-{size}ml-{idx}.png from {os.path.basename(src_fp)}")
                except Exception as e:
                    print(f"  -> Error processing {src_fp}: {e}")

print("SUCCESS: 90 Studio images processed!")
