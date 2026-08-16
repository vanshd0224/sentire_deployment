import os

dl_dir = r"C:\Users\asus\Downloads"
print("=== FILES IN DOWNLOADS FOLDER ===")
for f in os.listdir(dl_dir):
    fp = os.path.join(dl_dir, f)
    if os.path.isfile(fp):
        print(f"File: {f} - Modified: {os.path.getmtime(fp)}")
