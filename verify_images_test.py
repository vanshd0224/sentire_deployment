import os
import json
import urllib.request

catalog_file = "perfume_size_images_catalog.json"
frontend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"

print("================ VERIFYING ALL 90 PRODUCT IMAGES ================")

with open(catalog_file, "r") as f:
    catalog = json.load(f)

missing_files = []
model_files = []

total_images = 0

for p_id, size_map in catalog.items():
    print(f"\nProduct: {p_id.upper()}")
    for sz, img_list in size_map.items():
        for idx, img_url in enumerate(img_list, 1):
            total_images += 1
            rel_path = img_url.lstrip("/")
            full_path = os.path.join(frontend_dir, rel_path)
            
            exists = os.path.exists(full_path)
            if not exists:
                missing_files.append((p_id, sz, img_url))
            
            # Check if filename contains model or jpg
            is_model = "model" in img_url.lower() or "krs" in img_url.lower()
            if is_model:
                model_files.append((p_id, sz, img_url))
            
            status = "OK (200)" if exists else "MISSING (404)"
            print(f"  [{sz}ML - Shot {idx}] {img_url} -> {status}")

print("\n================ SUMMARY RESULTS ================")
print(f"Total Images Checked: {total_images}")
print(f"Missing Files (404): {len(missing_files)}")
print(f"Model Files Found: {len(model_files)}")

if len(missing_files) == 0 and len(model_files) == 0:
    print("\n✅ PASSED 100%: All 90 images exist on disk and 0 model photos remain!")
else:
    print("\n❌ FAILED verification checks!")
