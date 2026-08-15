import os
import glob
from PIL import Image

downloads_path = r"C:\Users\asus\Downloads"

print("Finding all non-model product renders in Downloads...")

all_folders = [os.path.join(downloads_path, d) for d in os.listdir(downloads_path) if os.path.isdir(os.path.join(downloads_path, d))]

clean_renders = []

for f_path in sorted(all_folders):
    dname = os.path.basename(f_path)
    for root, dirs, files in os.walk(f_path):
        for fname in sorted(files):
            fp = os.path.join(root, fname)
            if fname.lower().endswith(('.png', '.webp', '.jpg')):
                try:
                    with Image.open(fp) as img:
                        w, h = img.size
                        rgb = img.convert('RGB')
                        p1 = rgb.getpixel((int(w*0.5), int(h*0.1)))
                        p2 = rgb.getpixel((int(w*0.2), int(h*0.5)))
                        is_gold_mirror = (160 <= p1[0] <= 240 and 130 <= p1[1] <= 210 and 20 <= p1[2] <= 120) or \
                                         (160 <= p2[0] <= 240 and 130 <= p2[1] <= 210 and 20 <= p2[2] <= 120)
                        
                        if not is_gold_mirror and "model" not in fname.lower() and "krs" not in fname.lower():
                            clean_renders.append((dname, fname, fp, w, h))
                except Exception as e:
                    pass

print(f"Total Pure Product Renders Found: {len(clean_renders)}")
for dname, fname, fp, w, h in clean_renders[:35]:
    print(f"- [{dname}] {fname} ({w}x{h}) -> {fp}")
