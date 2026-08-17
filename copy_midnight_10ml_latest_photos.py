import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

img1 = os.path.join(artifacts_dir, "media_1786955709002.png") # pouch on round podium
img2 = os.path.join(artifacts_dir, "media_1786955709061.jpg") # bottle + pouch on cosmic space
img3 = os.path.join(artifacts_dir, "media_1786955709159.png") # pouch on marble pedestal

dests_10 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\midnight\10ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_10:
    os.makedirs(d, exist_ok=True)
    shutil.copy(img1, os.path.join(d, "midnight-10ml-1.png"))
    shutil.copy(img2, os.path.join(d, "midnight-10ml-2.png"))
    shutil.copy(img3, os.path.join(d, "midnight-10ml-3.png"))

print("SUCCESS: Updated Midnight 10 ML with exact target photos!")
