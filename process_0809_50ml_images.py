import os
import shutil
import re

user_dir = r"C:\Users\asus\.gemini\antigravity\brain\6fc47522-6928-42d1-8858-b710be15173e\.user_uploaded"
dest_dir1 = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets\perfumes"
dest_dir2 = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\assets"

files = []
for f in os.listdir(user_dir):
    fp = os.path.join(user_dir, f)
    files.append((fp, os.path.getmtime(fp)))

files.sort(key=lambda x: x[1], reverse=True)

# The 3 latest files are the 3 uploaded for 50ML 0809!
latest_3 = [f[0] for f in files[:3]]
latest_3.reverse() # Image 1, Image 2, Image 3 in chronological order!

print("Processing 3 latest images for 0809 50ML:")
for idx, img_path in enumerate(latest_3, 1):
    target_name = f"0809-50ml-{idx}.png"
    d1 = os.path.join(dest_dir1, target_name)
    d2 = os.path.join(dest_dir2, target_name)
    shutil.copyfile(img_path, d1)
    shutil.copyfile(img_path, d2)
    print(f"Copied {os.path.basename(img_path)} -> {target_name}")

# Update perfumes.ts for 0809 size 50
perfumes_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"
with open(perfumes_path, "r", encoding="utf-8") as f:
    content = f.read()

new_0809_50ml = """50: [
        '/assets/perfumes/0809-50ml-1.png?v=10',
        '/assets/perfumes/0809-50ml-2.png?v=10',
        '/assets/perfumes/0809-50ml-3.png?v=10'
      ]"""

pattern = r'id:\s*["\']0809["\'][\s\S]*?50:\s*\[[^\]]*\]'
replacement = lambda m: re.sub(r'50:\s*\[[^\]]*\]', new_0809_50ml, m.group(0))

new_content = re.sub(pattern, replacement, content)

with open(perfumes_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("SUCCESS: Updated 0809 sizeImages for 50ml in perfumes.ts!")
