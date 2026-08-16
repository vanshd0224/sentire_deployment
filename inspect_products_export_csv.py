import csv

csv_path = r"C:\Users\asus\Downloads\products_export.csv"

with open(csv_path, "r", encoding="utf-8-sig", errors="ignore") as f:
    reader = csv.DictReader(f)
    print("HEADERS:", reader.fieldnames)
    for idx, row in enumerate(reader):
        if idx < 5:
            print(f"Row {idx+1}: {dict(row)}")
