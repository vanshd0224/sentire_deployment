import os
import glob
from PIL import Image

downloads_path = r"C:\Users\asus\Downloads"

print("Examining all PNG files in perfume folders in Downloads...")

all_folders = [os.path.join(downloads_path, d) for d in os.listdir(downloads_path) if os.path.isdir(os.path.join(downloads_path, d))]

for f_path in sorted(all_folders):
    dname = os.path.basename(f_path)
    if any(k in dname.upper() for k in ["WHITE OUD", "CALANTHA", "MIRAI", "0809", "PERSONNA", "HERRLICH", "DEEP CRUSH", "MIDNIGHT", "RICH", "SEDUCTIVE"]):
        print(f"\n================ FOLDER: {dname} ================")
        for root, dirs, files in os.walk(f_path):
            png_files = [f for f in files if f.lower().endswith(('.png', '.webp'))]
            for fname in sorted(png_files):
                full_p = os.path.join(root, fname)
                try:
                    with Image.open(full_p) as img:
                        w, h = img.size
                        rel = os.path.relpath(full_p, f_path)
                        print(f"  - {rel} ({w}x{h})")
                except Exception as e:
                    pass
