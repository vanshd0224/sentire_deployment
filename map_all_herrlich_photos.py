import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

print("=== MAPPING ALL HERRLICH PHOTOS (10ML, 30ML, 50ML) ===")

# 1. Herrlich 10 ML (uploaded ~00:46:53)
h10_img1 = os.path.join(artifacts_dir, "media_1786907108306.png")
h10_img2 = os.path.join(artifacts_dir, "media_1786907108316.jpg")
h10_img3 = os.path.join(artifacts_dir, "media_1786907108351.jpg")

dests_10 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\herrlich\10ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_10:
    os.makedirs(d, exist_ok=True)
    shutil.copy(h10_img1, os.path.join(d, "herrlich-10ml-1.png"))
    shutil.copy(h10_img2, os.path.join(d, "herrlich-10ml-2.png"))
    shutil.copy(h10_img3, os.path.join(d, "herrlich-10ml-3.png"))

# 2. Herrlich 30 ML (uploaded ~00:47:31)
h30_img1 = os.path.join(artifacts_dir, "media_1786907075175.jpg")
h30_img2 = os.path.join(artifacts_dir, "media_1786907075209.png")
h30_img3 = os.path.join(artifacts_dir, "media_1786907075210.jpg")

dests_30 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\herrlich\30ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_30:
    os.makedirs(d, exist_ok=True)
    shutil.copy(h30_img1, os.path.join(d, "herrlich-30ml-1.png"))
    shutil.copy(h30_img2, os.path.join(d, "herrlich-30ml-2.png"))
    shutil.copy(h30_img3, os.path.join(d, "herrlich-30ml-3.png"))

# 3. Herrlich 50 ML (uploaded ~00:48:10)
h50_img1 = os.path.join(artifacts_dir, "media_1786907034078.png")
h50_img2 = os.path.join(artifacts_dir, "media_1786907034235.jpg")
h50_img3 = os.path.join(artifacts_dir, "media_1786907034263.png")

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

print("SUCCESS: Mapped all Herrlich photos (10ml, 30ml, 50ml) perfectly!")
