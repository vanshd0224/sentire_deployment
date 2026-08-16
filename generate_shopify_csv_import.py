import csv
import os

# Excel prices and descriptions for all 11 perfumes
PERFUMES = [
    {
        "handle": "0809",
        "title": "0809 Extrait de Parfum",
        "body": "Sichuan Pepper, Lavender, Star Anise, Nutmeg, Ambroxan",
        "vendor": "SENTIRE By PC",
        "prices": {10: 699, 30: 1994, 50: 2889},
        "mrps": {10: 949, 30: 2709, 50: 4069}
    },
    {
        "handle": "calantha",
        "title": "Calantha Extrait de Parfum",
        "body": "Blooming Florals, Jasmine, Rose, Sandalwood Amber",
        "vendor": "SENTIRE By PC",
        "prices": {10: 399, 30: 900, 50: 1085},
        "mrps": {10: 449, 30: 1409, 50: 1539}
    },
    {
        "handle": "deep-crush",
        "title": "Deep Crush Extrait de Parfum",
        "body": "Lavender, Tobacco Woods, Sandalwood Amber",
        "vendor": "SENTIRE By PC",
        "prices": {10: 350, 30: 899, 50: 1085},
        "mrps": {10: 419, 30: 1319, 50: 1539}
    },
    {
        "handle": "herrlich",
        "title": "Herrlich Extrait de Parfum",
        "body": "Fresh Bergamot, Jasmine Rose, Dark Chocolate",
        "vendor": "SENTIRE By PC",
        "prices": {10: 550, 30: 1499, 50: 2196},
        "mrps": {10: 639, 30: 2129, 50: 3069}
    },
    {
        "handle": "midnight",
        "title": "Midnight Extrait de Parfum",
        "body": "Blackcurrant, Tuberose, Sensual Vanilla Musk",
        "vendor": "SENTIRE By PC",
        "prices": {10: 549, 30: 1399, 50: 1949},
        "mrps": {10: 639, 30: 1809, 50: 2709}
    },
    {
        "handle": "mirai",
        "title": "Mirai Extrait de Parfum",
        "body": "Zesty Lemon, Lavender, Earthy Patchouli",
        "vendor": "SENTIRE By PC",
        "prices": {10: 459, 30: 1199, 50: 1679},
        "mrps": {10: 649, 30: 1809, 50: 2349}
    },
    {
        "handle": "personna",
        "title": "Personna Extrait de Parfum",
        "body": "Rich Spices, Leather Accord, Smoky Woods",
        "vendor": "SENTIRE By PC",
        "prices": {10: 550, 30: 1290, 50: 1888},
        "mrps": {10: 779, 30: 1809, 50: 2659}
    },
    {
        "handle": "purple-oud",
        "title": "Purple Oud Extrait de Parfum",
        "body": "Smoky Cambodian Oud, Fiery Saffron, Amethyst Rose",
        "vendor": "SENTIRE By PC",
        "prices": {10: 659, 30: 1199, 50: 1489},
        "mrps": {10: 779, 30: 1409, 50: 1859}
    },
    {
        "handle": "rich",
        "title": "Rich Extrait de Parfum",
        "body": "Opulent Bergamot, Spiced Rose, Velvet Amber Musk",
        "vendor": "SENTIRE By PC",
        "prices": {10: 559, 30: 1287, 50: 1593},
        "mrps": {10: 779, 30: 1809, 50: 2259}
    },
    {
        "handle": "seductive",
        "title": "Seductive Extrait de Parfum",
        "body": "Citric Limon, Fresh Lavender, Velvet Amber",
        "vendor": "SENTIRE By PC",
        "prices": {10: 459, 30: 999, 50: 1149},
        "mrps": {10: 649, 30: 1409, 50: 2099}
    },
    {
        "handle": "white-oud",
        "title": "White Oud Extrait de Parfum",
        "body": "Essence of Oud, Pink Pepper, Luminous Amber",
        "vendor": "SENTIRE By PC",
        "prices": {10: 659, 30: 1493, 50: 2889},
        "mrps": {10: 779, 30: 2099, 50: 4069}
    }
]

headers = [
    "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", "Tags",
    "Published", "Option1 Name", "Option1 Value", "Variant SKU", "Variant Grams",
    "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy",
    "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price",
    "Variant Requires Shipping", "Variant Taxable", "Status"
]

rows = []
for p in PERFUMES:
    for size in [10, 30, 50]:
        price = p["prices"][size]
        mrp = p["mrps"][size]
        sku = f"{p['handle'].upper()}-{size}ML"
        rows.append([
            p["handle"],
            p["title"],
            p["body"],
            p["vendor"],
            "Health & Beauty > Personal Care > Cosmetics > Perfumes & Colognes",
            "Perfume",
            "Extrait de Parfum, Luxury",
            "TRUE",
            "Size",
            f"{size} ML",
            sku,
            size * 10,
            "shopify",
            100,
            "deny",
            "manual",
            price,
            mrp,
            "TRUE",
            "TRUE",
            "active"
        ])

csv_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\shopify_all_11_perfumes_import.csv"
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print(f"SUCCESS: Generated Shopify CSV Import file at {csv_path} with {len(rows)} variants!")
