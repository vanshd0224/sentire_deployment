import os
import re

src_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend'
files = []
for root, dirs, filenames in os.walk(os.path.join(src_dir, 'src')):
    for f in filenames:
        if f.endswith(('.tsx', '.ts', '.html', '.jsx', '.js')):
            files.append(os.path.join(root, f))
files.append(os.path.join(src_dir, 'index.html'))

print('=== FORM FIELDS WITHOUT ID OR NAME ===')
form_field_pattern = re.compile(r'<(input|select|textarea)(\s+[^>]*)?>', re.IGNORECASE | re.DOTALL)

for fpath in files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    for m in form_field_pattern.finditer(content):
        tag = m.group(0)
        if 'type="hidden"' in tag or "type='hidden'" in tag:
            continue
        has_id = 'id=' in tag or 'id={' in tag
        has_name = 'name=' in tag or 'name={' in tag
        if not (has_id or has_name):
            rel_path = os.path.relpath(fpath, src_dir)
            clean_tag = ' '.join(tag.split())
            print(f'{rel_path}: {clean_tag[:120]}')

print('\n=== LAZY IMAGES WITHOUT WIDTH AND HEIGHT ===')
img_pattern = re.compile(r'<img(\s+[^>]*)?>', re.IGNORECASE | re.DOTALL)
for fpath in files:
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    for m in img_pattern.finditer(content):
        tag = m.group(0)
        has_lazy = 'loading="lazy"' in tag or "loading='lazy'" in tag
        has_width = 'width=' in tag or 'width={' in tag
        has_height = 'height=' in tag or 'height={' in tag
        if has_lazy and not (has_width and has_height):
            rel_path = os.path.relpath(fpath, src_dir)
            clean_tag = ' '.join(tag.split())
            print(f'{rel_path}: {clean_tag[:120]}')
