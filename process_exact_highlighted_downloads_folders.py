import os
import shutil
import glob
from PIL import Image

downloads_path = r"C:\Users\asus\Downloads"
dest_assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

os.makedirs(dest_assets_dir, exist_ok=True)

# List of target extracted perfume folders from user's screenshot
target_folder_names = [
    "WHITE OUD - 50 ML-20260814T211703Z-1-001",
    "WHITE OUD - 30 ML-20260814T211705Z-1-001",
    "WHITE OUD - 10 ML-20260814T211702Z-1-001",
    "CALANTHA - 50 ML-20260814T211225Z-1-001",
    "CALANTHA - 30 ML-20260814T211222Z-1-001",
    "CALANTHA - 10 ML-20260814T211222Z-1-001",
    "MIRAI - 50 ML-20260814T211521Z-1-001",
    "MIRAI- 30ML-20260814T211522Z-1-001",
    "MIRAI - 10 ML-20260814T211519Z-1-001",
    "0809-10ml",
    "0809-30ml",
    "0809-50ml",
    "PERSONNA - 50 ML-20260814T211534Z-1-001",
    "PERSONNA 30ML-20260814T211536Z-1-001",
    "PERSONNA - 10 ML-20260814T211532Z-1-001",
    "HERRLICH - 50 ML-20260814T211340Z-1-001",
    "HERRLICH- 30 ML-20260814T211343Z-1-001",
    "HERRLICH - 10 ML-20260814T211238Z-1-001",
    "DEEP CRUSH - 50 ML-20260814T211232Z-1-001",
    "DEEP CRUSH- 30 ML-20260814T211233Z-1-001",
    "DEEP CRUSH - 10 ML-20260814T211230Z-1-001",
    "MIDNIGHT - 50 ML-20260814T211354Z-1-001",
    "MIDNIGHT -  30 ML-20260814T211351Z-1-001",
    "MIDNIGHT - 10 ML-20260814T211353Z-1-001",
    "drive-download-20260814T211622Z-1-001"
]

processed_catalog = {}

print("Processing highlighted perfume folders from Downloads...")

for folder_name in os.listdir(downloads_path):
    full_folder_path = os.path.join(downloads_path, folder_name)
    if not os.path.isdir(full_folder_path):
        continue

    # Check if folder matches target or starts with known perfume names
    folder_upper = folder_name.upper()
    if any(t.upper() in folder_upper for t in ["WHITE OUD", "CALANTHA", "MIRAI", "0809", "PERSONNA", "HERRLICH", "DEEP CRUSH", "MIDNIGHT", "RICH", "SEDUCTIVE", "PURPLE OUD", "DRIVE-DOWNLOAD"]):
        
        # Collect all image files inside
        image_files = []
        for root, dirs, files in os.walk(full_folder_path):
            for f in files:
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    image_files.append(os.path.join(root, f))

        print(f"Folder: {folder_name} -> {len(image_files)} images found.")

print("Scan complete.")
