import os
import shutil

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"

print("=== SWAPPING MIDNIGHT 30ML AND 50ML IMAGES ===")

def swap_files(path1, path2):
    if os.path.exists(path1) and os.path.exists(path2):
        temp_path = path1 + ".tmp"
        shutil.move(path1, temp_path)
        shutil.move(path2, path1)
        shutil.move(temp_path, path2)
        print(f"Swapped: {os.path.basename(path1)} <--> {os.path.basename(path2)}")

# 1. Swap in subfolders
dir_30 = os.path.join(base_dir, "assets", "perfumes", "midnight", "30ml")
dir_50 = os.path.join(base_dir, "assets", "perfumes", "midnight", "50ml")

for i in range(1, 4):
    f30 = os.path.join(dir_30, f"midnight-30ml-{i}.png")
    f50 = os.path.join(dir_50, f"midnight-50ml-{i}.png")
    swap_files(f30, f50)

# 2. Swap in perfumes root folder
perfumes_dir = os.path.join(base_dir, "assets", "perfumes")
for i in range(1, 4):
    f30 = os.path.join(perfumes_dir, f"midnight-30ml-{i}.png")
    f50 = os.path.join(perfumes_dir, f"midnight-50ml-{i}.png")
    swap_files(f30, f50)

# 3. Swap in assets root folder
assets_dir = os.path.join(base_dir, "assets")
for i in range(1, 4):
    f30 = os.path.join(assets_dir, f"midnight-30ml-{i}.png")
    f50 = os.path.join(assets_dir, f"midnight-50ml-{i}.png")
    swap_files(f30, f50)

print("SUCCESS: Swapped Midnight 30 ML and 50 ML images across all directories!")
