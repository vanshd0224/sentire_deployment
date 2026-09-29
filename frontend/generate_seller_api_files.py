import os
import json

products_data = [
    {
        "id": 8459203940123,
        "product_id": 8459203940123,
        "title": "Sentire Discovery Coffret (6x6 ML)",
        "handle": "discovery-set-package",
        "body_html": "<p>Experience India's rarest 35%+ oil concentration luxury extraits de parfum.</p>",
        "vendor": "SENTIRE By PC",
        "product_type": "Extrait de Parfum",
        "status": "active",
        "images": [{"id": 1001, "product_id": 8459203940123, "src": "https://sentirebypc.com/assets/perfumes/discovery-set-1.webp"}],
        "variants": [
            {
                "id": 46965136031905,
                "variant_id": 46965136031905,
                "product_id": 8459203940123,
                "title": "6x6 ML Discovery Set",
                "price": 549.00,
                "compare_at_price": 999.00,
                "sku": "DS-6X6ML",
                "inventory_quantity": 500,
                "requires_shipping": True,
                "taxable": True
            }
        ]
    }
]

catalog = [
    ("0809", "0809", 8459203940101, {10: 46888622293153, 30: 46888622325921, 50: 46888622358689}),
    ("Calantha", "calantha", 8459203940102, {10: 46888622391457, 30: 46888622424225, 50: 46888622456993}),
    ("Deep Crush", "deep-crush", 8459203940103, {10: 46888622489761, 30: 46888622522529, 50: 46888622555297}),
    ("Herrlich", "herrlich", 8459203940104, {10: 46888622588065, 30: 46888622620833, 50: 46888622653601}),
    ("Midnight", "midnight", 8459203940105, {10: 46888622686369, 30: 46888622719137, 50: 46888622751905}),
    ("Mirai", "mirai", 8459203940106, {10: 46888622784673, 30: 46888622817441, 50: 46888622850209}),
    ("Personna", "personna", 8459203940107, {10: 46888622882977, 30: 46888622915745, 50: 46888622948513}),
    ("Purple Oud", "purple-oud", 8459203940108, {10: 46888622981281, 30: 46888623014049, 50: 46888623046817}),
    ("Rich", "rich", 8459203940109, {10: 46888623079585, 30: 46888623112353, 50: 46888623145121}),
    ("Seductive", "seductive", 8459203940110, {10: 46888623177889, 30: 46888623210657, 50: 46888623243425}),
    ("White Oud", "white-oud", 8459203940111, {10: 46888623276193, 30: 46888623308961, 50: 46888623341729}),
    ("Zephyrine", "zephyrine", 8459203940112, {10: 46946124628129, 30: 46946124660897}),
    ("Bijou", "bijou", 8459203940113, {10: 46946155430049, 30: 46946155462817}),
    ("Dapper", "dapper", 8459203940114, {10: 46946174337185, 30: 46946174369953}),
    ("Le Chocolat", "le-chocolat", 8459203940115, {10: 46946200354977, 30: 46946200387745}),
    ("PC Leather", "pc-leather", 8459203940116, {10: 46946216509601, 30: 46946216542369}),
    ("Quantillion", "quantillion", 8459203940117, {10: 46946240823457, 30: 46946240856225}),
    ("Reiz", "reiz", 8459203940118, {10: 46946264088737, 30: 46946264121505}),
    ("Sent-Aura", "sent-aura", 8459203940119, {10: 46946279981217, 30: 46946280013985}),
    ("Vanaco", "vanaco", 8459203940120, {10: 46946298298529, 30: 46946298331297}),
    ("Woo-Dy", "woo-dy", 8459203940121, {10: 46946307014817, 30: 46946307047585}),
]

for name, handle, p_id, sizes in catalog:
    variants = []
    prices_map = {10: 799.00, 30: 1499.00, 50: 2199.00}
    mrps_map = {10: 999.00, 30: 1999.00, 50: 2999.00}
    for sz, v_id in sizes.items():
        variants.append({
            "id": v_id,
            "variant_id": v_id,
            "product_id": p_id,
            "title": f"{sz} ML",
            "price": prices_map.get(sz, 799.00),
            "compare_at_price": mrps_map.get(sz, 999.00),
            "sku": f"SENTIRE-{handle.upper()}-{sz}ML",
            "inventory_quantity": 250,
            "requires_shipping": True,
            "taxable": True
        })

    products_data.append({
        "id": p_id,
        "product_id": p_id,
        "title": f"SENTIRE {name} Extrait de Parfum",
        "handle": handle,
        "body_html": f"<p>Artisanal 35%+ pure perfume oil extrait de parfum crafted for 12+ hour sillage.</p>",
        "vendor": "SENTIRE By PC",
        "product_type": "Extrait de Parfum",
        "status": "active",
        "images": [{"id": p_id + 1, "product_id": p_id, "src": f"https://sentirebypc.com/assets/perfumes/{handle}-30ml-1.webp"}],
        "variants": variants
    })

products_response = {
    "status": True,
    "message": "Products fetched successfully",
    "page": 1,
    "limit": 100,
    "total": len(products_data),
    "data": products_data
}

collections_data = [
    {"id": 4001002003001, "collection_id": 4001002003001, "title": "Extrait de Parfum", "handle": "extrait-de-parfum", "updated_at": "2026-09-28T00:00:00Z"},
    {"id": 4001002003002, "collection_id": 4001002003002, "title": "Bestsellers", "handle": "bestsellers", "updated_at": "2026-09-28T00:00:00Z"},
    {"id": 4001002003003, "collection_id": 4001002003003, "title": "Discovery Sets", "handle": "discovery-set", "updated_at": "2026-09-28T00:00:00Z"}
]

collections_response = {
    "status": True,
    "message": "Collections fetched successfully",
    "page": 1,
    "limit": 100,
    "total": len(collections_data),
    "data": collections_data
}

base_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public\api\sr\seller"
os.makedirs(os.path.join(base_dir, "products"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "collections"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "productsByCollection"), exist_ok=True)

with open(os.path.join(base_dir, "products", "index.html"), "w", encoding="utf-8") as f:
    json.dump(products_response, f, indent=2)

with open(os.path.join(base_dir, "collections", "index.html"), "w", encoding="utf-8") as f:
    json.dump(collections_response, f, indent=2)

with open(os.path.join(base_dir, "productsByCollection", "index.html"), "w", encoding="utf-8") as f:
    json.dump(products_response, f, indent=2)

print("Generated static API seller endpoint files successfully!")
