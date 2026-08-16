import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

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

print("SUCCESS: Updated Midnight 30 ML exact studio photos!")
