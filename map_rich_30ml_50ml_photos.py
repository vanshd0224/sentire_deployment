import os
import shutil

artifacts_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"

print("=== CHECKING ALL RECENT UPLOADED FILES ===")
files = os.listdir(artifacts_dir)
files_sorted = sorted(files, key=lambda f: os.path.getmtime(os.path.join(artifacts_dir, f)), reverse=True)

for i, f in enumerate(files_sorted[:12]):
    print(f"[{i}] {f} -> mtime: {os.path.getmtime(os.path.join(artifacts_dir, f))}")

# Top 3 most recent (uploaded at 00:00:29) are Rich 50 ML:
# media_1786905015858.jpg (Rich 'Come Close' box gold cubes) -> 50ml-3
# media_1786905015821.png (Rich 50ml frosted bottle on box) -> 50ml-2
# media_1786905015805.png (Rich 50ml in open box teal) -> 50ml-1

r50_img1 = os.path.join(artifacts_dir, "media_1786905015805.png")
r50_img2 = os.path.join(artifacts_dir, "media_1786905015821.png")
r50_img3 = os.path.join(artifacts_dir, "media_1786905015858.jpg")

dests_50 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\rich\50ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_50:
    os.makedirs(d, exist_ok=True)
    shutil.copy(r50_img1, os.path.join(d, "rich-50ml-1.png"))
    shutil.copy(r50_img2, os.path.join(d, "rich-50ml-2.png"))
    shutil.copy(r50_img3, os.path.join(d, "rich-50ml-3.png"))

# Next 3 (uploaded at 23:59:41) are Rich 30 ML:
# media_1786904965446.png (Rich 30ml bottle on black box gold splash) -> 30ml-1
# media_1786904965670.png (Rich 30ml in box gold chains) -> 30ml-2
# media_1786904965675.jpg (Rich box gold cubes) -> 30ml-3

r30_img1 = os.path.join(artifacts_dir, "media_1786904965446.png")
r30_img2 = os.path.join(artifacts_dir, "media_1786904965670.png")
r30_img3 = os.path.join(artifacts_dir, "media_1786904965675.jpg")

dests_30 = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes\rich\30ml",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"
]

for d in dests_30:
    os.makedirs(d, exist_ok=True)
    shutil.copy(r30_img1, os.path.join(d, "rich-30ml-1.png"))
    shutil.copy(r30_img2, os.path.join(d, "rich-30ml-2.png"))
    shutil.copy(r30_img3, os.path.join(d, "rich-30ml-3.png"))

print("SUCCESS: Mapped Rich 30 ML & 50 ML studio photos perfectly!")
