import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

h10_img1 = os.path.join(artifacts_dir, "media_1786907108306.png")
h10_img2 = os.path.join(artifacts_dir, "media_1786907108316.jpg")
h10_img3 = os.path.join(artifacts_dir, "media_1786907108351.jpg")

dests = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\herrlich\10ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests:
    os.makedirs(d, exist_ok=True)
    shutil.copy(h10_img1, os.path.join(d, "herrlich-10ml-1.png"))
    shutil.copy(h10_img2, os.path.join(d, "herrlich-10ml-2.png"))
    shutil.copy(h10_img3, os.path.join(d, "herrlich-10ml-3.png"))

print("SUCCESS: Updated Herrlich 10 ML exact studio photos!")
