import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

print("=== MAPPING ALL MIRAI PHOTOS (10ML, 30ML, 50ML) ===")

# 1. Mirai 10 ML (uploaded ~00:21:31)
m10_img1 = os.path.join(artifacts_dir, "media_1786906261406.png")
m10_img2 = os.path.join(artifacts_dir, "media_1786906261422.png")
m10_img3 = os.path.join(artifacts_dir, "media_1786906261634.png")

dests_10 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\mirai\10ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_10:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m10_img1, os.path.join(d, "mirai-10ml-1.png"))
    shutil.copy(m10_img2, os.path.join(d, "mirai-10ml-2.png"))
    shutil.copy(m10_img3, os.path.join(d, "mirai-10ml-3.png"))

# 2. Mirai 30 ML (uploaded ~00:22:03)
m30_img1 = os.path.join(artifacts_dir, "media_1786906309151.png")
m30_img2 = os.path.join(artifacts_dir, "media_1786906309293.png")
m30_img3 = os.path.join(artifacts_dir, "media_1786906309293.jpg")

dests_30 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\mirai\30ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_30:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m30_img1, os.path.join(d, "mirai-30ml-1.png"))
    shutil.copy(m30_img2, os.path.join(d, "mirai-30ml-2.png"))
    shutil.copy(m30_img3, os.path.join(d, "mirai-30ml-3.png"))

# 3. Mirai 50 ML (uploaded ~00:22:25)
m50_img1 = os.path.join(artifacts_dir, "media_1786906336095.png")
m50_img2 = os.path.join(artifacts_dir, "media_1786906336229.png")
m50_img3 = os.path.join(artifacts_dir, "media_1786906336234.jpg")

dests_50 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\mirai\50ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_50:
    os.makedirs(d, exist_ok=True)
    shutil.copy(m50_img1, os.path.join(d, "mirai-50ml-1.png"))
    shutil.copy(m50_img2, os.path.join(d, "mirai-50ml-2.png"))
    shutil.copy(m50_img3, os.path.join(d, "mirai-50ml-3.png"))

print("SUCCESS: Mapped all Mirai photos (10ml, 30ml, 50ml) perfectly!")
