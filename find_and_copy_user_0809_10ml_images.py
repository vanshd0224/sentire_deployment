import os
import shutil

user_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"
dest_dir1 = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
dest_dir2 = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

files = []
for f in os.listdir(user_dir):
    fp = os.path.join(user_dir, f)
    files.append((fp, os.path.getmtime(fp)))

files.sort(key=lambda x: x[1], reverse=True)

print("=== 10 MOST RECENTLY UPLOADED USER IMAGES ===")
for fp, mtime in files[:10]:
    print(f"{os.path.basename(fp)} - {mtime}")

# The 3 latest files are the 3 uploaded by user!
latest_3 = [f[0] for f in files[:3]]
latest_3.reverse() # Image 1, Image 2, Image 3 in chronological order!

print("\nProcessing 3 latest images:")
for idx, img_path in enumerate(latest_3, 1):
    target_name = f"0809-10ml-{idx}.png"
    d1 = os.path.join(dest_dir1, target_name)
    d2 = os.path.join(dest_dir2, target_name)
    shutil.copyfile(img_path, d1)
    shutil.copyfile(img_path, d2)
    print(f"Copied {os.path.basename(img_path)} -> {target_name}")

