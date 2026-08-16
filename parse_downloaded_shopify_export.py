import os
import csv
import re

dl_dir = r"C:\Users\asus\Downloads"

# Find all CSV files in Downloads
csv_files = []
for f in os.listdir(dl_dir):
    if f.lower().endswith(".csv"):
        fp = os.path.join(dl_dir, f)
        csv_files.append((fp, os.path.getmtime(fp)))

csv_files.sort(key=lambda x: x[1], reverse=True)

print("=== ALL RECENT CSV FILES IN DOWNLOADS ===")
for fp, mtime in csv_files[:5]:
    print(f"File: {os.path.basename(fp)} - MTime: {mtime}")

if not csv_files:
    print("ERROR: No CSV files found in Downloads!")
    exit(1)

# Pick the latest downloaded CSV
latest_csv = csv_files[0][0]
print(f"\nPARSING LATEST CSV: {latest_csv}")

variant_map = {}
with open(latest_csv, "r", encoding="utf-8-sig", errors="ignore") as f:
    reader = csv.DictReader(f)
    print("CSV HEADERS:", reader.fieldnames)
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

print("\nEXTRACTED VARIANT MAP:")
for h, sizes in variant_map.items():
    print(f"  {h}: {sizes}")

if not variant_map:
    print("WARNING: Could not parse any variants from this CSV file!")
    exit(1)

# Update CartDrawer.tsx
cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"
with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Build TS map object
map_lines = ["export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = {"]
for handle, size_dict in variant_map.items():
    s_str = ", ".join([f"{sz}: \"{vid}\"" for sz, vid in size_dict.items()])
    map_lines.append(f"  \"{handle}\": {{ {s_str} }},")
map_lines.append("};")
new_map_str = "\n".join(map_lines)

pattern = r"export const SHOPIFY_VARIANT_MAP: Record<string, Record<number, string>> = \{[\s\S]*?\};"
updated_cart_code = re.sub(pattern, new_map_str, cart_code)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(updated_cart_code)

print("\nSUCCESS: Updated CartDrawer.tsx with 100% exact Shopify Variant IDs!")
