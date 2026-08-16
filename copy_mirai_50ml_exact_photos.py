import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

m50_img1 = os.path.join(artifacts_dir, "media_1786906309151.png")
m50_img2 = os.path.join(artifacts_dir, "media_1786906309293.png")
m50_img3 = os.path.join(artifacts_dir, "media_1786906309293.jpg")

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

print("SUCCESS: Updated Mirai 50 ML exact studio photos!")
