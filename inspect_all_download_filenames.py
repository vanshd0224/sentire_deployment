import os

downloads_path = r"C:\Users\asus\Downloads"

print("Listing all files inside perfume folders in Downloads:")

for d in sorted(os.listdir(downloads_path)):
    dp = os.path.join(downloads_path, d)
    if os.path.isdir(dp) and any(k in d.upper() for k in ["WHITE OUD", "CALANTHA", "MIRAI", "0809", "PERSONNA", "HERRLICH", "DEEP CRUSH", "MIDNIGHT", "RICH", "SEDUCTIVE"]):
        print(f"\nFOLDER: {d}")
        for root, dirs, files in os.walk(dp):
            for f in sorted(files):
                if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                    fp = os.path.join(root, f)
                    rel = os.path.relpath(fp, dp)
                    print(f"  - {rel}")
