import os
import shutil
from PIL import Image

perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

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

print("=== PURGING ALL 37 MODEL PHOTOS AND REPLACING WITH CLEAN BOTTLE RENDERS ===")

perfumes = [
    "calantha", "deep-crush", "herrlich", "midnight", "mirai",
    "0809", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

# 1. Find all 100% clean bottle renders for each perfume
clean_renders = {}
for p_id in perfumes:
    clean_renders[p_id] = []
    for root, dirs, files in os.walk(perfumes_dir):
        for f in files:
            if f.startswith(p_id) and f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                fp = os.path.join(root, f)
                if not contains_model(fp):
                    clean_renders[p_id].append(fp)
    # Also check root assets folder for clean renders
    for f in os.listdir(assets_dir):
        if p_id in f and f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(assets_dir, f)
            if not contains_model(fp):
                clean_renders[p_id].append(fp)

    clean_renders[p_id] = sorted(list(set(clean_renders[p_id])))
    print(f"[{p_id}] Found {len(clean_renders[p_id])} 100% pure bottle studio renders")

# 2. Overwrite any model photo with the pure bottle studio render
purged_count = 0
for root, dirs, files in os.walk(perfumes_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(root, f)
            if contains_model(fp):
                # Determine which perfume this file belongs to
                p_id = None
                for p in perfumes:
                    if f.startswith(p):
                        p_id = p
                        break
                if p_id and len(clean_renders[p_id]) > 0:
                    best_clean_src = clean_renders[p_id][0]
                    # Copy clean render over model photo
                    shutil.copyfile(best_clean_src, fp)
                    purged_count += 1
                    print(f"  [PURGED & OVERWRITTEN] {f} replaced with {os.path.basename(best_clean_src)}")

# Also check root assets dir (mirai.png, personna.png, calantha.png, midnight.png)
for f in ["mirai.png", "personna.png", "calantha.png", "midnight.png", "seductive.png", "rich.png", "herrlich.png", "0809.png", "white-oud.png", "purple-oud.png"]:
    fp = os.path.join(assets_dir, f)
    if os.path.exists(fp) and contains_model(fp):
        p_id = f.replace(".png", "")
        if p_id in clean_renders and len(clean_renders[p_id]) > 0:
            best_clean_src = clean_renders[p_id][0]
            shutil.copyfile(best_clean_src, fp)
            print(f"  [ROOT ASSETS PURGED] {f} replaced with {os.path.basename(best_clean_src)}")

# 3. Final Verification Run
remaining_models = 0
for root, dirs, files in os.walk(perfumes_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(root, f)
            if contains_model(fp):
                remaining_models += 1

print(f"\nFINAL VERIFICATION RESULT: Remaining model girl photos = {remaining_models} / 99")
