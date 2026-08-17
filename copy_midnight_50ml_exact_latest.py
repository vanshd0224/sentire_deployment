import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

img1 = os.path.join(artifacts_dir, "media_1786966991531.png") # bottle with gold chain on starry background with moon
img2 = os.path.join(artifacts_dir, "media_1786966991533.jpg") # black box with gold cubes
img3 = os.path.join(artifacts_dir, "media_1786966991538.jpg") # box in hand at bar scene

dests_50 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\midnight\50ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_50:
    os.makedirs(d, exist_ok=True)
    shutil.copy(img1, os.path.join(d, "midnight-50ml-1.png"))
    shutil.copy(img2, os.path.join(d, "midnight-50ml-2.png"))
    shutil.copy(img3, os.path.join(d, "midnight-50ml-3.png"))

print("SUCCESS: Updated Midnight 50 ML with exact target photos!")
