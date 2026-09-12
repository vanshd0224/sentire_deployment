import os
import re
from PIL import Image

public_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public"
perfumes_ts_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"

print("Starting deep image compression & WebP conversion...")

converted_count = 0
total_saved_bytes = 0

for root, dirs, files in os.walk(public_dir):
    for f in files:
        if f.lower().endswith((".png", ".jpg", ".jpeg")) and not f.lower().endswith(".webp"):
            src_path = os.path.join(root, f)
            orig_size = os.path.getsize(src_path)
            
            # Generate WebP counterpart path
            base, ext = os.path.splitext(src_path)
            webp_path = base + ".webp"
            
            try:
                with Image.open(src_path) as img:
                    w, h = img.size
                    max_dim = 800
                    if w > max_dim or h > max_dim:
                        img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                    
                    # 1. Save WebP
                    img_rgb = img.convert("RGBA") if "A" in img.mode else img.convert("RGB")
                    img_rgb.save(webp_path, "WEBP", quality=84, method=6)
                    
                    # 2. Optimize original PNG / JPG in-place as fallback
                    if ext.lower() == ".png":
                        if "A" in img.mode:
                            quant = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
                            quant.save(src_path, "PNG", optimize=True)
                        else:
                            img_rgb.convert("RGB").save(src_path, "JPEG", quality=82, optimize=True)
                    elif ext.lower() in (".jpg", ".jpeg"):
                        img_rgb.convert("RGB").save(src_path, "JPEG", quality=82, optimize=True)
                    
                    new_size = os.path.getsize(webp_path)
                    saved = orig_size - new_size
                    if saved > 0:
                        total_saved_bytes += saved
                    converted_count += 1
            except Exception as e:
                print(f"Error processing {src_path}: {e}")

print(f"Successfully processed {converted_count} images!")
print(f"Total space saved: {total_saved_bytes / (1024 * 1024):.2f} MB")

# Update perfumes.ts to reference .webp instead of .png for product image paths
if os.path.exists(perfumes_ts_path):
    with open(perfumes_ts_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace .png with .webp inside image URLs in perfumes.ts
    new_content = re.sub(r'(\/assets\/perfumes\/[^"\']+\.)png', r'\1webp', content)
    new_content = re.sub(r'(\/images\/[^"\']+\.)png', r'\1webp', new_content)
    
    with open(perfumes_ts_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Updated perfumes.ts image references to .webp!")
