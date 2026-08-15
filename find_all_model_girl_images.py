import os
from PIL import Image

perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
assets_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

model_girl_files = []

for root, dirs, files in os.walk(perfumes_dir):
    for f in files:
        fp = os.path.join(root, f)
        try:
            with Image.open(fp) as img:
                # Check dimensions or pixel signatures of the girl in gold mirror
                # The model girl image is 1000x1000 or has specific gold oval mirror border
                w, h = img.size
                # Inspect pixel color at specific regions (e.g. top gold mirror arch (x=500, y=100))
                rgb = img.convert('RGB')
                p1 = rgb.getpixel((int(w*0.5), int(h*0.1))) # Top middle (gold mirror border)
                p2 = rgb.getpixel((int(w*0.2), int(h*0.5))) # Left middle (gold mirror border)
                
                # Check if it has the model girl characteristics (Gold mirror color ~ R:180-230, G:140-190, B:40-100)
                is_gold_mirror = (160 <= p1[0] <= 240 and 130 <= p1[1] <= 210 and 20 <= p1[2] <= 120) or \
                                 (160 <= p2[0] <= 240 and 130 <= p2[1] <= 210 and 20 <= p2[2] <= 120)
                
                if is_gold_mirror or "model" in f.lower() or "krs" in f.lower():
                    model_girl_files.append((fp, f, w, h))
        except Exception as e:
            pass

print(f"=== FOUND {len(model_girl_files)} MODEL GIRL IMAGES ===")
for fp, f, w, h in model_girl_files:
    print(f"- {f} ({w}x{h}): {fp}")
