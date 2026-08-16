import os
import csv
import re

downloads_dir = r"C:\Users\asus\Downloads"

# Search for any exported shopify CSV in Downloads
csv_files = [os.path.join(downloads_dir, f) for f in os.listdir(downloads_dir) if f.endswith(".csv") and "export" in f.lower()]

if not csv_files:
    # Also check desktop
    desktop_dir = r"C:\Users\asus\OneDrive\Desktop"
    if os.path.exists(desktop_dir):
        csv_files += [os.path.join(desktop_dir, f) for f in os.listdir(desktop_dir) if f.endswith(".csv") and "export" in f.lower()]

if csv_files:
    csv_files.sort(key=lambda x: os.path.getmtime(x), reverse=True)
    target_csv = csv_files[0]
    print(f"FOUND EXPORT FILE: {target_csv}")

    variant_map = {}
    with open(target_csv, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            handle = row.get("Handle", "").strip().lower()
            size_val = row.get("Option1 Value", "").strip()
            variant_id = row.get("Variant ID", "").strip() or row.get("ID", "").strip()
            
            size_match = re.search(r"(\d+)", size_val)
            if handle and variant_id and size_match:
                size_num = int(size_match.group(1))
                if handle not in variant_map:
                    variant_map[handle] = {}
                variant_map[handle][size_num] = variant_id

    print("PARSED VARIANT MAP:")
    print(variant_map)

    # Update CartDrawer.tsx
    cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"
    with open(cart_path, "r", encoding="utf-8") as f:
        cart_code = f.read()

    new_map_str = f"export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {variant_map};"
    pattern = r"export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = \{[\s\S]*?\};"
    
    updated_cart_code = re.sub(pattern, new_map_str, cart_code)
    with open(cart_path, "w", encoding="utf-8") as f:
        f.write(updated_cart_code)

    print("SUCCESS: Updated CartDrawer.tsx with exact Shopify Variant IDs!")
else:
    print("No export file found yet.")
