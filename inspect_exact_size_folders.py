import os
from PIL import Image

downloads_dir = r"C:\Users\asus\Downloads"

def contains_model(fp):
    try:
        with Image.open(fp) as img:
            rgb = img.convert('RGB')
            w, h = rgb.size
            skin_pixels = 0
            jacket_pixels = 0
            samples = 0
            for x in range(int(w*0.2), int(w*0.8), 10):
                for y in range(int(h*0.2), int(h*0.8), 10):
                    r, g, b = rgb.getpixel((x, y))
                    samples += 1
                    if r > 140 and g > 90 and b > 70 and r > g and g > b and (r - g) > 15:
                        skin_pixels += 1
                    if r < 30 and g < 30 and b < 30:
                        jacket_pixels += 1
            skin_ratio = skin_pixels / max(1, samples)
            jacket_ratio = jacket_pixels / max(1, samples)
            if skin_ratio > 0.10 or (skin_ratio > 0.04 and jacket_ratio > 0.12):
                return True
            return False
    except Exception:
        return False

print("=== DETAILED INSPECTION OF EXACT 10 ML, 30 ML, AND 50 ML DOWNLOAD FOLDERS ===")

folder_map = {}

for root, dirs, files in os.walk(downloads_dir):
    for d in dirs:
        d_upper = d.upper()
        if ("10 ML" in d_upper or "10ML" in d_upper or "30 ML" in d_upper or "30ML" in d_upper or "50 ML" in d_upper or "50ML" in d_upper) and not d.startswith("."):
            full_path = os.path.join(root, d)
            clean_files = []
            for f in os.listdir(full_path):
                fp = os.path.join(full_path, f)
                if os.path.isfile(fp) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    if not contains_model(fp):
                        clean_files.append(f)
            folder_map[d] = clean_files
            print(f"Folder: {d} | Clean bottle images: {len(clean_files)} -> {clean_files[:5]}")

