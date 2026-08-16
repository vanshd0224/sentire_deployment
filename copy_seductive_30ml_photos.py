import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

print("=== CHECKING RECENT USER UPLOADED FILES ===")
files = os.listdir(artifacts_dir)
files_sorted = sorted(files, key=lambda f: os.path.getmtime(os.path.join(artifacts_dir, f)), reverse=True)

for f in files_sorted[:10]:
    print(f, "->", os.path.getmtime(os.path.join(artifacts_dir, f)))

img1 = os.path.join(artifacts_dir, files_sorted[2])
img2 = os.path.join(artifacts_dir, files_sorted[1])
img3 = os.path.join(artifacts_dir, files_sorted[0])

dests = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\seductive\30ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests:
    os.makedirs(d, exist_ok=True)
    shutil.copy(img1, os.path.join(d, "seductive-30ml-1.png"))
    shutil.copy(img2, os.path.join(d, "seductive-30ml-2.png"))
    shutil.copy(img3, os.path.join(d, "seductive-30ml-3.png"))

print("SUCCESS: Copied Seductive 30 ML images into all asset directory variants!")
