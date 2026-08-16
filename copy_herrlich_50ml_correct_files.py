import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

# Exact files uploaded for Herrlich 50 ML at 00:48:16
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

print("SUCCESS: Updated Herrlich 50 ML exact studio photos from correct files!")
