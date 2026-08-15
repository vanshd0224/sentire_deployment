import os
import time
import datetime

downloads_path = r"C:\Users\asus\Downloads"

print(f"Scanning {downloads_path} for files/folders created today...")
today_str = datetime.date.today().isoformat()

if not os.path.exists(downloads_path):
    print("Downloads path does not exist:", downloads_path)
else:
    items = os.listdir(downloads_path)
    found = []
    for item in items:
        full_path = os.path.join(downloads_path, item)
        try:
            mtime = os.path.getmtime(full_path)
            item_date = datetime.date.fromtimestamp(mtime).isoformat()
            # List items from today or yesterday just in case
            if item_date >= "2026-08-14" or "sentire" in item.lower() or "drive" in item.lower() or item.endswith(".zip"):
                is_dir = os.path.isdir(full_path)
                size_mb = os.path.getsize(full_path) / (1024 * 1024) if not is_dir else 0
                found.append((item, item_date, is_dir, size_mb, full_path))
        except Exception as e:
            pass

    found.sort(key=lambda x: x[1], reverse=True)
    print(f"Found {len(found)} matching items in Downloads:")
    for name, dt, is_dir, sz, path in found:
        kind = "FOLDER" if is_dir else f"FILE ({sz:.2f} MB)"
        print(f" - [{dt}] {name} ({kind}) -> {path}")
