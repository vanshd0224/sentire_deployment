import os

downloads_dir = r"C:\Users\asus\Downloads"

print("=== ALL DIRECTORIES & FILES IN DOWNLOADS ===")
for item in os.listdir(downloads_dir):
    full_p = os.path.join(downloads_dir, item)
    if os.path.isdir(full_p):
        print(f"[DIR] {item}")
        sub_items = os.listdir(full_p)
        print(f"      Contains {len(sub_items)} items: {sub_items[:8]}")

