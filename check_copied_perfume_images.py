import os
from PIL import Image

perfumes_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"

print("Checking all files in perfumes assets dir:")
files = sorted(os.listdir(perfumes_dir))
for f in files:
    fp = os.path.join(perfumes_dir, f)
    sz_kb = os.path.getsize(fp) / 1024
    print(f" - {f} ({sz_kb:.1f} KB)")
