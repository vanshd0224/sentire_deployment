import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

print("=== MAPPING ALL MIDNIGHT PHOTOS (10ML, 30ML, 50ML) ===")

# 1. Midnight 10 ML (uploaded ~00:34:22)
m10_img1 = os.path.join(artifacts_dir, "media_1786907765660.png")
m10_img2 = os.path.join(artifacts_dir, "media_1786907765696.png")
m10_img3 = os.path.join(artifacts_dir, "media_1786907765699.jpg")

dests_10 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\midnight\10ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_10:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m10_img1, os.path.join(d, "midnight-10ml-1.png"))
    shutil.copy(m10_img2, os.path.join(d, "midnight-10ml-2.png"))
    shutil.copy(m10_img3, os.path.join(d, "midnight-10ml-3.png"))

# 2. Midnight 30 ML (uploaded ~00:35:10)
m30_img1 = os.path.join(artifacts_dir, "media_1786907829291.jpg")
m30_img2 = os.path.join(artifacts_dir, "media_1786907829299.jpg")
m30_img3 = os.path.join(artifacts_dir, "media_1786907829320.jpg")

dests_30 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\midnight\30ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_30:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m30_img1, os.path.join(d, "midnight-30ml-1.png"))
    shutil.copy(m30_img2, os.path.join(d, "midnight-30ml-2.png"))
    shutil.copy(m30_img3, os.path.join(d, "midnight-30ml-3.png"))

# 3. Midnight 50 ML (uploaded ~00:35:46)
m50_img1 = os.path.join(artifacts_dir, "media_1786907865583.jpg")
m50_img2 = os.path.join(artifacts_dir, "media_1786907865725.jpg")
m50_img3 = os.path.join(artifacts_dir, "media_1786907865746.jpg")

dests_50 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\midnight\50ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_50:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m50_img1, os.path.join(d, "midnight-50ml-1.png"))
    shutil.copy(m50_img2, os.path.join(d, "midnight-50ml-2.png"))
    shutil.copy(m50_img3, os.path.join(d, "midnight-50ml-3.png"))

print("SUCCESS: Mapped all Midnight photos (10ml, 30ml, 50ml) perfectly!")
