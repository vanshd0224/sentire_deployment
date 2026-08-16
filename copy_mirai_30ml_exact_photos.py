import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

# Files from 00:22:03 upload batch
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

print("SUCCESS: Updated Mirai 30 ML exact studio photos!")
