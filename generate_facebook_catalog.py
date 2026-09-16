import csv, os

# Target directory for public assets and feeds
public_dir = r'C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\public'
perfumes_dir = os.path.join(public_dir, 'assets', 'perfumes')
feeds_dir = os.path.join(public_dir, 'feeds')
os.makedirs(feeds_dir, exist_ok=True)

csv_path = os.path.join(feeds_dir, 'facebook-catalog.csv')
csv_flat_path = os.path.join(feeds_dir, 'facebook-catalog-flat.csv')

perfumes = [
    {'name': 'Calantha', 'id': 'calantha', 'prices': {10: 399, 30: 749, 50: 1085}, 'desc': 'Luxury floral extrait de parfum with 12+ hour sillage.', 'cat': 'Floral'},
    {'name': 'Deep Crush', 'id': 'deep-crush', 'prices': {10: 350, 30: 699, 50: 1085}, 'desc': 'Alluring gourmand floral extrait de parfum with 12+ hour sillage.', 'cat': 'Floral'},
    {'name': 'Herrlich', 'id': 'herrlich', 'prices': {10: 550, 30: 1199, 50: 2196}, 'desc': 'Commanding woody luxury extrait de parfum with 12+ hour sillage.', 'cat': 'Woody'},
    {'name': 'Midnight', 'id': 'midnight', 'prices': {10: 549, 30: 1149, 50: 1949}, 'desc': 'Mysterious sensual night extrait de parfum with 12+ hour sillage.', 'cat': 'Woody'},
    {'name': 'Mirai', 'id': 'mirai', 'prices': {10: 459, 30: 949, 50: 1679}, 'desc': 'Luminous fresh signature extrait de parfum with 12+ hour sillage.', 'cat': 'Fresh'},
    {'name': '0809 Signature', 'id': '0809', 'prices': {10: 699, 30: 1499, 50: 2889}, 'desc': 'Royal oriental extrait de parfum by House of Sentire.', 'cat': 'Oriental'},
    {'name': 'Personna', 'id': 'personna', 'prices': {10: 495, 30: 989, 50: 1593}, 'desc': 'Bespoke oriental luxury extrait de parfum.', 'cat': 'Oriental'},
    {'name': 'Purple Oud', 'id': 'purple-oud', 'prices': {50: 1489}, 'desc': 'Rare artisanal purple oud extrait de parfum.', 'cat': 'Woody'},
    {'name': 'Rich', 'id': 'rich', 'prices': {10: 559, 30: 1089, 50: 1593}, 'desc': 'Opulent amber extrait de parfum with 12+ hour sillage.', 'cat': 'Ambar'},
    {'name': 'Seductive', 'id': 'seductive', 'prices': {10: 459, 30: 849, 50: 1149}, 'desc': 'Magnetic fresh seductive extrait de parfum.', 'cat': 'Fresh'},
    {'name': 'White Oud', 'id': 'white-oud', 'prices': {10: 659, 30: 1449, 50: 2889}, 'desc': 'Precious white oud luxury extrait de parfum.', 'cat': 'Woody'},
    {'name': 'Zephyrine', 'id': 'zephyrine', 'prices': {10: 799, 30: 1499}, 'desc': 'Bespoke luxury floral extrait de parfum.', 'cat': 'Floral'},
    {'name': 'Bijou', 'id': 'bijou', 'prices': {10: 799, 30: 1499}, 'desc': 'Artisanal floral luxury extrait de parfum.', 'cat': 'Floral'},
    {'name': 'Dapper', 'id': 'dapper', 'prices': {10: 799, 30: 1499}, 'desc': 'Crisp fresh luxury extrait de parfum.', 'cat': 'Fresh'},
    {'name': 'Le Chocolat', 'id': 'le-chocolat', 'prices': {10: 799, 30: 1499}, 'desc': 'Indulgent gourmet cocoa extrait de parfum.', 'cat': 'Oriental'},
    {'name': 'PC Leather', 'id': 'pc-leather', 'prices': {10: 799, 30: 1499}, 'desc': 'Sophisticated leather extrait de parfum.', 'cat': 'Woody'},
    {'name': 'Quantillion', 'id': 'quantillion', 'prices': {10: 799, 30: 1499}, 'desc': 'Zesty citrus luxury extrait de parfum.', 'cat': 'Citrus'},
    {'name': 'Reiz', 'id': 'reiz', 'prices': {10: 799, 30: 1499}, 'desc': 'Captivating fresh luxury extrait de parfum.', 'cat': 'Fresh'},
    {'name': 'Sent-Aura', 'id': 'sent-aura', 'prices': {10: 799, 30: 1499}, 'desc': 'Ethereal floral luxury extrait de parfum.', 'cat': 'Floral'},
    {'name': 'Vanaco', 'id': 'vanaco', 'prices': {10: 799, 30: 1499}, 'desc': 'Warm vanilla amber luxury extrait de parfum.', 'cat': 'Ambar'},
    {'name': 'Woo-Dy', 'id': 'woo-dy', 'prices': {10: 799, 30: 1499}, 'desc': 'Intense rare wood luxury extrait de parfum.', 'cat': 'Woody'},
]

def find_best_jpg_image(p_id, size):
    candidates = [
        f"{p_id}-{size}ml-1.jpg",
        f"{p_id}-{size}ml-2.jpg",
        f"{p_id}-{size}ml.jpg",
    ]
    for c in candidates:
        if os.path.exists(os.path.join(perfumes_dir, c)):
            return f"https://sentirebypc.com/assets/perfumes/{c}"
    if os.path.exists(perfumes_dir):
        for f in os.listdir(perfumes_dir):
            if f.startswith(f"{p_id}-{size}ml") and f.endswith('.jpg'):
                return f"https://sentirebypc.com/assets/perfumes/{f}"
    return "https://sentirebypc.com/assets/perfumes/byob-bundle.jpg"

fieldnames = [
    'id', 'item_group_id', 'title', 'description', 'availability', 'condition', 
    'price', 'link', 'image_link', 'brand', 'google_product_category', 
    'fb_product_category', 'size', 'gender', 'age_group', 'custom_label_0'
]

rows = []

for p in perfumes:
    p_id = p['id']
    p_name = p['name']
    p_desc = p['desc']
    p_cat = p['cat']
    for size, price in p['prices'].items():
        v_id = f"{p_id}-{size}"
        title = f"{p_name} Extrait De Parfum ({size}ml)"
        url = f"https://sentirebypc.com/perfumes/{p_id}/{size}ml"
        img = find_best_jpg_image(p_id, size)
        
        rows.append({
            'id': v_id,
            'item_group_id': p_id,
            'title': title,
            'description': f"{p_desc} Size: {size}ml.",
            'availability': 'in stock',
            'condition': 'new',
            'price': f"{price}.00 INR",
            'link': url,
            'image_link': img,
            'brand': 'SENTIRE By PC',
            'google_product_category': 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne',
            'fb_product_category': 'health & beauty > personal care > cosmetics > perfume & cologne',
            'size': f"{size}ml",
            'gender': 'unisex',
            'age_group': 'adult',
            'custom_label_0': p_cat
        })

# Discovery Set
rows.append({
    'id': 'discovery-set',
    'item_group_id': 'discovery-set',
    'title': 'Sentire Discovery Set - 5 Spray Vials (5 x 5ml)',
    'description': 'Experience 5 signature 35%+ extrait de parfum 5ml vials with a complimentary ₹500 voucher.',
    'availability': 'in stock',
    'condition': 'new',
    'price': '549.00 INR',
    'link': 'https://sentirebypc.com/discovery-set',
    'image_link': 'https://sentirebypc.com/discovery_hero_cover.jpg',
    'brand': 'SENTIRE By PC',
    'google_product_category': 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne',
    'fb_product_category': 'health & beauty > personal care > cosmetics > perfume & cologne',
    'size': '5 x 5ml',
    'gender': 'unisex',
    'age_group': 'adult',
    'custom_label_0': 'Sample Box'
})

# BYOB
rows.append({
    'id': 'byob',
    'item_group_id': 'byob',
    'title': 'Build Your Own Bundle - 3 x 50ml Luxury Extraits',
    'description': 'Customise your bespoke 3-bottle luxury perfume box with photo engraving.',
    'availability': 'in stock',
    'condition': 'new',
    'price': '2899.00 INR',
    'link': 'https://sentirebypc.com/byob',
    'image_link': 'https://sentirebypc.com/assets/perfumes/byob-bundle.jpg',
    'brand': 'SENTIRE By PC',
    'google_product_category': 'Health & Beauty > Personal Care > Cosmetics > Perfume & Cologne',
    'fb_product_category': 'health & beauty > personal care > cosmetics > perfume & cologne',
    'size': '3 x 50ml',
    'gender': 'unisex',
    'age_group': 'adult',
    'custom_label_0': 'Custom Bundle'
})

# Write Grouped Catalog Feed (with size column)
with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    for r in rows:
        writer.writerow(r)

print(f"1. Successfully generated {len(rows)} product variants in facebook-catalog.csv (Grouped Feed with 'size' column)")

# Write Flat Catalog Feed (Without item_group_id so every variant is 100% Eligible standalone product)
fieldnames_flat = [f for f in fieldnames if f != 'item_group_id']
with open(csv_flat_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames_flat)
    writer.writeheader()
    for r in rows:
        r_flat = {k: v for k, v in r.items() if k != 'item_group_id'}
        writer.writerow(r_flat)

print(f"2. Successfully generated {len(rows)} products in facebook-catalog-flat.csv (Flat Feed without 'item_group_id')")
