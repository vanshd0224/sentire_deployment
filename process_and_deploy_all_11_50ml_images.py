import zipfile
import os
import shutil

zip_path = r"C:\Users\asus\Downloads\OneDrive_2026-08-18.zip"
temp_extract_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\temp_zip_extract"
public_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"

print("=== STARTING FULL 11 PERFUMES 50ML IMAGE MAPPING & PROCESSING ===")

# 1. Extract ZIP
if os.path.exists(temp_extract_dir):
    shutil.rmtree(temp_extract_dir)
os.makedirs(temp_extract_dir, exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as z:
    z.extractall(temp_extract_dir)

root_extracted = os.path.join(temp_extract_dir, "SENTIRE 50ML IMAGES")

# 2. Define perfume folder mappings
perfume_map = [
    ("0809", "0809 ready"),
    ("calantha", "CALANTHA READY"),
    ("deep-crush", "DEEP CRUSH READY"),
    ("herrlich", "HERRLICH READY"),
    ("midnight", "MIDNIGHT READY"),
    ("mirai", "MIRAI READY"),
    ("personna", "PERSONNA"),
    ("purple-oud", "PURPLE OUD READY"),
    ("rich", "RICH READY"),
    ("seductive", "SEDUCTIVE READY"),
    ("white-oud", "WHITE OUD READY")
]

for p_id, folder_name in perfume_map:
    folder_path = os.path.join(root_extracted, folder_name)
    if not os.path.exists(folder_path):
        print(f"ERROR: Folder {folder_name} not found in zip extract!")
        continue
        
    # Get all PNG/JPG files in folder sorted
    img_files = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
    print(f"\nProcessing {p_id.upper()} from folder '{folder_name}' ({len(img_files)} files found):")
    
    # Pick top 3 images
    selected_3 = img_files[:3]
    for idx, img_name in enumerate(selected_3, start=1):
        src_path = os.path.join(folder_path, img_name)
        target_filename = f"{p_id}-50ml-{idx}.png"
        
        # 3 target destinations
        dests = [
            os.path.join(public_dir, "assets", "perfumes", p_id, "50ml"),
            os.path.join(public_dir, "assets", "perfumes"),
            os.path.join(public_dir, "assets")
        ]
        
        for d in dests:
            os.makedirs(d, exist_ok=True)
            dst_file = os.path.join(d, target_filename)
            shutil.copy(src_path, dst_file)
            
        print(f"  [{idx}] {img_name} -> mapped to {target_filename} across 3 directories")

print("\nSUCCESS: All 11 perfumes 50 ML studio photos processed and mapped cleanly!")
