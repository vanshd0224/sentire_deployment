import os
import shutil
import json
from PIL import Image

downloads_dir = r"C:\Users\asus\Downloads"
perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

os.makedirs(perfumes_dir, exist_ok=True)

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

perfumes = [
    "calantha", "deep-crush", "herrlich", "midnight", "mirai",
    "0809", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

print("=== STRICT MAPPING OF 10ML, 30ML, AND 50ML FROM SPECIFIC SUBFOLDERS ===")

# Walk through all directories in Downloads and group by perfume and exact size
strict_catalog = {}

for p in perfumes:
    strict_catalog[p] = {10: [], 30: [], 50: []}

p_keywords = {
    "calantha": "CALANTHA",
    "deep-crush": "DEEP CRUSH",
    "herrlich": "HERRLICH",
    "midnight": "MIDNIGHT",
    "mirai": "MIRAI",
    "0809": "0809",
    "personna": "PERSONNA",
    "purple-oud": "PURPLE",
    "rich": "RICH",
    "seductive": "SEDUCTIVE",
    "white-oud": "WHITE OUD"
}

for root, dirs, files in os.walk(downloads_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')) and not f.startswith("."):
            fp = os.path.join(root, f)
            folder_name = os.path.basename(root).upper()
            
            if contains_model(fp):
                continue
                
            for p_id, kw in p_keywords.items():
                if kw in folder_name:
                    # Check exact size in folder name
                    if "10" in folder_name and ("10 ML" in folder_name or "10ML" in folder_name or "-10" in folder_name):
                        strict_catalog[p_id][10].append(fp)
                    elif "30" in folder_name and ("30 ML" in folder_name or "30ML" in folder_name or "-30" in folder_name):
                        strict_catalog[p_id][30].append(fp)
                    elif "50" in folder_name and ("50 ML" in folder_name or "50ML" in folder_name or "-50" in folder_name):
                        strict_catalog[p_id][50].append(fp)

# Copy strict images for each perfume and size
for p_id in perfumes:
    for sz in [10, 30, 50]:
        imgs = sorted(list(set(strict_catalog[p_id][sz])))
        print(f"[{p_id} {sz}ML] Strictly matched {len(imgs)} clean images in {sz}ML subfolder")
        
        for idx in range(1, 4):
            dest_fp = os.path.join(perfumes_dir, f"{p_id}-{sz}ml-{idx}.png")
            src_fp = None
            if len(imgs) >= idx:
                src_fp = imgs[idx - 1]
            elif len(imgs) > 0:
                src_fp = imgs[(idx - 1) % len(imgs)]
            
            if src_fp and os.path.exists(src_fp):
                try:
                    with Image.open(src_fp) as img:
                        img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                        if img.mode == 'RGBA':
                            bg = Image.new('RGB', img.size, (255, 255, 255))
                            bg.paste(img, mask=img.split()[3])
                            img = bg
                        img.save(dest_fp, "PNG", optimize=True)
                except Exception as e:
                    print(f"  Error copying {src_fp}: {e}")

# Overwrite main card images (img property) with 50ML bottle renders
for p_id in perfumes:
    fifty_clean = strict_catalog[p_id][50]
    if len(fifty_clean) > 0:
        main_dest = os.path.join(assets_dir, f"{p_id}.png")
        shutil.copyfile(fifty_clean[0], main_dest)
        print(f"  Updated main card image for {p_id}.png from 50ML folder ({os.path.basename(fifty_clean[0])})")

print("SUCCESS: Strictly isolated 10 ML, 30 ML, and 50 ML photos from their respective folders!")
