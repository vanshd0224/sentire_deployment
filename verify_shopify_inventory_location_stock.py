import urllib.request
import json

# Check if Shopify store products are in stock or out of stock
url = "https://hbj1d0-99.myshopify.com/products/0809.js"
headers = {'User-Agent': 'Mozilla/5.0'}

print("=== CHECKING SHOPIFY INVENTORY AVAILABILITY ===")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Product Title:", data.get("title"))
        variants = data.get("variants", [])
        for v in variants:
            v_id = v.get("id")
            title = v.get("title")
            avail = v.get("available")
            inv_policy = v.get("inventory_policy")
            inv_management = v.get("inventory_management")
            print(f"  Variant {v_id} ({title}): Available={avail}, InvPolicy={inv_policy}, InvMgmt={inv_management}")
except Exception as e:
    print("Error:", e)
