import csv, os, urllib.request
from PIL import Image

public_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public'
perfumes_dir = os.path.join(public_dir, 'assets', 'perfumes')
csv_flat_path = os.path.join(public_dir, 'feeds', 'facebook-catalog-flat.csv')

with open(csv_flat_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total rows in CSV: {len(rows)}\n")

issues = []

for r in rows:
    p_id = r['id']
    title = r['title']
    img_url = r['image_link']
    
    # Extract file name without query parameters
    clean_url = img_url.split('?')[0]
    fname = clean_url.split('/')[-1]
    fpath = os.path.join(perfumes_dir, fname)
    
    if not os.path.exists(fpath):
        issues.append((p_id, title, fname, "FILE_NOT_FOUND_ON_DISK", img_url))
        continue
        
    try:
        with Image.open(fpath) as img:
            w, h = img.size
            fmt = img.format
            if w < 500 or h < 500:
                issues.append((p_id, title, fname, f"IMAGE_TOO_SMALL_{w}x{h}", img_url))
            elif fmt not in ['JPEG', 'PNG']:
                issues.append((p_id, title, fname, f"INVALID_FORMAT_{fmt}", img_url))
            else:
                print(f"OK: {p_id:15} | {fname:25} | {w}x{h} | {fmt}")
    except Exception as e:
        issues.append((p_id, title, fname, f"CORRUPTED_IMAGE: {str(e)}", img_url))

print(f"\n==========================================")
print(f"TOTAL AUDITED: {len(rows)}")
print(f"ISSUES FOUND: {len(issues)}")
print(f"==========================================\n")

for iss in issues:
    print(f"FAILED: {iss[0]:15} | Issue: {iss[3]:25} | File: {iss[2]} | Link: {iss[4]}")
