perfumes_page_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"

with open(perfumes_page_path, "r", encoding="utf-8") as f:
    code = f.read()

old_img_line = 'src={p.img}'
new_img_line = 'src={(p.sizeImages && p.sizeImages[currentSize]?.[0]) || p.img}'

if old_img_line in code:
    code = code.replace(old_img_line, new_img_line)

with open(perfumes_page_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Updated card image rendering to display size-specific photo on pill click!")
