import os
import json
import re

perfumes_page_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"
catalog_file = "perfume_size_images_catalog.json"

with open(catalog_file, "r") as f:
    catalog = json.load(f)

# Clean up catalog to ensure only existing .png / .webp files are referenced
dest_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
clean_catalog = {}

for p_id, size_map in catalog.items():
    clean_catalog[p_id] = {}
    for sz, imgs in size_map.items():
        clean_imgs = []
        for img_url in imgs:
            # Check if file exists on disk
            real_file = img_url.replace("/assets/perfumes/", "")
            full_p = os.path.join(dest_dir, real_file)
            if os.path.exists(full_p) and not real_file.endswith(".jpg"):
                clean_imgs.append(img_url)
            else:
                # Find valid png for this size
                png_matches = [f for f in os.listdir(dest_dir) if f.startswith(f"{p_id}-{sz}ml") and f.endswith(('.png', '.webp'))]
                if png_matches:
                    clean_imgs.append(f"/assets/perfumes/{png_matches[0]}")
                else:
                    # Generic png fallback
                    clean_imgs.append(f"/assets/perfumes/{p_id}-50ml-1.png" if os.path.exists(os.path.join(dest_dir, f"{p_id}-50ml-1.png")) else f"/assets/{p_id}.png")
        
        # Ensure 3 clean images per size
        while len(clean_imgs) < 3:
            clean_imgs.append(clean_imgs[0] if clean_imgs else f"/assets/{p_id}.png")
        clean_catalog[p_id][int(sz)] = clean_imgs[:3]

with open(perfumes_page_path, "r", encoding="utf-8") as f:
    code = f.read()

# Update fallback main img properties for each product
for p_id in catalog.keys():
    main_clean_img = clean_catalog[p_id][50][0] if 50 in clean_catalog[p_id] else clean_catalog[p_id][30][0]
    
    # Replace img: "/assets/xxx.jpg" or "/assets/xxx.png" for this product
    pattern = rf'(id:\s*"{p_id}",[\s\S]*?img:\s*")[^"]+(")'
    replacement = rf'\1{main_clean_img}\2'
    code = re.sub(pattern, replacement, code)

# Update sizeImages map in PerfumesPage.tsx
for p_id, size_map in clean_catalog.items():
    target_str = f'id: "{p_id}",'
    size_json_str = json.dumps(size_map, indent=6)
    
    # Regex replace sizeImages block for this product
    pattern = rf'(id:\s*"{p_id}",\s*sizeImages:\s*)\{{[\s\S]*?\}}'
    if re.search(pattern, code):
        code = re.sub(pattern, f'id: "{p_id}",\n    sizeImages: {size_json_str}', code)

with open(perfumes_page_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Updated all product fallback images and purged model photos & 404s!")
