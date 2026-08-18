import zipfile
import os

zip_path = r"C:\Users\asus\Downloads\OneDrive_2026-08-18.zip"

print(f"=== INSPECTING ZIP FILE: {zip_path} ===")

if os.path.exists(zip_path):
    print("File size:", os.path.getsize(zip_path), "bytes")
    with zipfile.ZipFile(zip_path, 'r') as z:
        namelist = z.namelist()
        print(f"Total files inside ZIP: {len(namelist)}")
        
        folders = {}
        for name in namelist:
            parts = name.split('/')
            folder = parts[0] if len(parts) > 1 else "Root"
            if folder not in folders:
                folders[folder] = []
            folders[folder].append(name)
            
        print("\nFolders found inside ZIP:")
        for f, items in sorted(folders.items()):
            print(f"\n[Folder] {f} ({len(items)} items):")
            for it in items:
                print("   *", it)
else:
    print("ZIP file not found at path:", zip_path)
