import os

downloads_dir = r"C:\Users\asus\Downloads"

print(f"=== SEARCHING IN DOWNLOADS DIR: {downloads_dir} ===")

if os.path.exists(downloads_dir):
    files = os.listdir(downloads_dir)
    print(f"Found {len(files)} items in Downloads. Searching for SENTIRE or 50ML or ZIP files...")
    
    matches = []
    for f in files:
        f_lower = f.lower()
        if "sentire" in f_lower or "50ml" in f_lower or "ready" in f_lower or f_lower.endswith(".zip"):
            full_p = os.path.join(downloads_dir, f)
            is_dir = os.path.isdir(full_p)
            size = os.path.getsize(full_p) if not is_dir else "DIR"
            matches.append(f"{f} ({'Folder' if is_dir else 'File'}, {size})")
            
    print("\nMATCHING DOWNLOADED ITEMS FOUND:")
    if matches:
        for m in matches:
            print("  •", m)
    else:
        print("  No obvious SENTIRE/50ML named items. Listing top 15 newest items in Downloads:")
        files_sorted = sorted(files, key=lambda f: os.path.getmtime(os.path.join(downloads_dir, f)), reverse=True)
        for f in files_sorted[:15]:
            full_p = os.path.join(downloads_dir, f)
            print("  •", f, f"({'Folder' if os.path.isdir(full_p) else 'File'})")

else:
    print("Downloads directory path not found.")
