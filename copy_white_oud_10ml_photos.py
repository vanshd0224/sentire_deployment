import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"
dest_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\white-oud\10ml"

os.makedirs(dest_dir, exist_ok=True)

img1 = os.path.join(artifacts_dir, "media_1786855342885.png")
img2 = os.path.join(artifacts_dir, "media_1786855819064.png")
img3 = os.path.join(artifacts_dir, "media_1786857063159.png")

shutil.copy(img1, os.path.join(dest_dir, "white-oud-10ml-1.png"))
shutil.copy(img2, os.path.join(dest_dir, "white-oud-10ml-2.png"))
shutil.copy(img3, os.path.join(dest_dir, "white-oud-10ml-3.png"))

print("SUCCESS: Copied White Oud 10 ML images into frontend public assets directory!")
