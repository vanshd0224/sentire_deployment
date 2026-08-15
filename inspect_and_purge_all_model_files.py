import os
from PIL import Image

perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

print("=== CHECKING ALL IMAGES FOR MODEL GIRL OCCURRENCES ===")

# Function to detect model girl photo via skin tone / jacket pixel analysis
def contains_model(fp):
    try:
        with Image.open(fp) as img:
            rgb = img.convert('RGB')
            w, h = rgb.size
            # Sample center-left and center-right areas for skin tone & black leather jacket
            skin_pixels = 0
            jacket_pixels = 0
            samples = 0
            for x in range(int(w*0.2), int(w*0.8), 10):
                for y in range(int(h*0.2), int(h*0.8), 10):
                    r, g, b = rgb.getpixel((x, y))
                    samples += 1
                    # Skin tone detection
                    if r > 140 and g > 90 and b > 70 and r > g and g > b and (r - g) > 15:
                        skin_pixels += 1
                    # Black leather jacket / white t-shirt contrast
                    if r < 30 and g < 30 and b < 30:
                        jacket_pixels += 1
            
            skin_ratio = skin_pixels / max(1, samples)
            jacket_ratio = jacket_pixels / max(1, samples)
            
            # If significant skin ratio or jacket ratio, it's a model girl photo!
            if skin_ratio > 0.12 or (skin_ratio > 0.05 and jacket_ratio > 0.15):
                return True, skin_ratio, jacket_ratio
            return False, skin_ratio, jacket_ratio
    except Exception as e:
        return False, 0, 0

model_found = []

for root, dirs, files in os.walk(perfumes_dir):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            fp = os.path.join(root, f)
            is_m, s_r, j_r = contains_model(fp)
            if is_m:
                print(f"[MODEL DETECTED!] {f} (Skin: {s_r:.2f}, Jacket: {j_r:.2f})")
                model_found.append(fp)

print(f"Total model photos found: {len(model_found)}")
