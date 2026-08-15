import os
import re

perfumes_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"

with open(perfumes_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update sizeImages for 0809 in perfumes.ts
new_0809_size_images = """sizeImages: {
      10: [
        '/assets/perfumes/0809-10ml-1.png?v=10',
        '/assets/perfumes/0809-10ml-2.png?v=10',
        '/assets/perfumes/0809-10ml-3.png?v=10'
      ],"""

# Find 0809 entry and replace its 10ml sizeImages
pattern = r'id:\s*["\']0809["\'][\s\S]*?sizeImages:\s*\{[^}]*10:\s*\[[^\]]*\]'
replacement = lambda m: re.sub(r'sizeImages:\s*\{[\s\S]*?10:\s*\[[^\]]*\]', new_0809_size_images, m.group(0))

new_content = re.sub(pattern, replacement, content)

with open(perfumes_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("SUCCESS: Updated 0809 sizeImages for 10ml in perfumes.ts!")
