import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

# Files from 00:48:16 upload batch
files = os.listdir(artifacts_dir)
files_sorted = sorted(files, key=lambda f: os.path.getmtime(os.path.join(artifacts_dir, f)), reverse=True)

print("=== RECENT UPLOADED FILES ===")
for f in files_sorted[:6]:
    print(f, "->", os.path.getmtime(os.path.join(artifacts_dir, f)))

h50_img1 = os.path.join(artifacts_dir, files_sorted[2])
h50_img2 = os.path.join(artifacts_dir, files_sorted[1])
h50_img3 = os.path.join(artifacts_dir, files_sorted[0])

dests_50 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\herrlich\50ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_50:
    os.makedirs(d, exist_ok=True)
    shutil.copy(h50_img1, os.path.join(d, "herrlich-50ml-1.png"))
    shutil.copy(h50_img2, os.path.join(d, "herrlich-50ml-2.png"))
    shutil.copy(h50_img3, os.path.join(d, "herrlich-50ml-3.png"))

print("SUCCESS: Updated Herrlich 50 ML exact studio photos!")
