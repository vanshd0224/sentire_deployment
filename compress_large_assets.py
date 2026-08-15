import os
from PIL import Image

perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

print("Compressing large image assets to under 1MB for fast git push...")

for root, dirs, files in os.walk(perfumes_dir):
    for f in files:
        fp = os.path.join(root, f)
        size_mb = os.path.getsize(fp) / (1024 * 1024)
        if size_mb > 1.0:
            print(f"Compressing {f} ({size_mb:.2f} MB)...")
            try:
                with Image.open(fp) as img:
                    img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                    # Convert to RGB if RGBA and save with optimization
                    if img.mode == 'RGBA':
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        background.paste(img, mask=img.split()[3])
                        img = background
                    img.save(fp, "JPEG", quality=85, optimize=True)
                new_size_mb = os.path.getsize(fp) / (1024 * 1024)
                print(f"  -> Compressed to {new_size_mb:.2f} MB")
            except Exception as e:
                print(f"Error compressing {f}: {e}")

print("SUCCESS: All image assets compressed for fast git push!")
