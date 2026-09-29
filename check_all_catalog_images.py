import os, csv

public_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public'
perfumes_dir = os.path.join(public_dir, 'assets', 'perfumes')
csv_flat_path = os.path.join(public_dir, 'feeds', 'facebook-catalog-flat.csv')

with open(csv_flat_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    missing = []
    found = []
    for r in reader:
        img_url = r['image_link']
        fname = img_url.split('/')[-1]
        fpath = os.path.join(perfumes_dir, fname)
        if not os.path.exists(fpath):
            missing.append((r['id'], fname, img_url))
        else:
            found.append((r['id'], fname, os.path.getsize(fpath)))

print(f"Found {len(found)} image files on disk.")
print(f"Missing {len(missing)} image files on disk.")
if missing:
    print("\n--- MISSING IMAGES ---")
    for m in missing:
        print(m)
