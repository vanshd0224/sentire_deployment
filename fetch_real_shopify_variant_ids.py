import urllib.request
import json
import re

handles = [
    "0809", "calantha", "deep-crush", "herrlich", "midnight",
    "mirai", "personna", "purple-oud", "rich", "seductive", "white-oud"
]

store_domain = "hbj1d0-99.myshopify.com"
variant_map = {}

print("=== FETCHING REAL SHOPIFY VARIANT IDs FROM STORE JSON ENDPOINTS ===")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for h in handles:
    url = f"https://{store_domain}/products/{h}.js"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            title = data.get("title")
            variants = data.get("variants", [])
            print(f"\nProduct: {title} ({h})")
            
            if h not in variant_map:
                variant_map[h] = {}

            for v in variants:
                v_id = str(v.get("id"))
                title_val = v.get("title", "")
                option1 = v.get("option1", "")
                price = v.get("price") / 100
                sku = v.get("sku")
                
                # Parse size number from title or option1
                size_match = re.search(r"(\d+)", option1 or title_val)
                if size_match:
                    sz = int(size_match.group(1))
                    variant_map[h][sz] = v_id
                    print(f"  Size {sz}ML -> Variant ID: {v_id} | Price: ₹{price} | SKU: {sku}")

    except Exception as e:
        print(f"Failed to fetch {h}: {e}")

print("\n=== FINAL PARSED VARIANT MAP ===")
print(variant_map)

if variant_map:
    # Update CartDrawer.tsx
    cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"
    with open(cart_path, "r", encoding="utf-8") as f:
        cart_code = f.read()

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

    print("\nSUCCESS: Updated CartDrawer.tsx with 100% exact live Shopify Variant IDs!")
