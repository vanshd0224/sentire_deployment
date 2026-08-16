import urllib.request
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

# 1. Fetch product JSON to inspect exact published variant status
url_prod = "https://hbj1d0-99.myshopify.com/products/purple-oud.js"
print("=== INSPECTING PURPLE OUD PRODUCT STATUS ON SHOPIFY ===")
req = urllib.request.Request(url_prod, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Product Title:", data.get("title"))
        print("Available:", data.get("available"))
        variants = data.get("variants", [])
        for v in variants:
            print(f"  Variant ID: {v.get('id')} | Title: {v.get('title')} | Available: {v.get('available')} | Price: {v.get('price')}")
except Exception as e:
    print("Error fetching product:", e)

# 2. Test Permalinks
urls_to_test = [
    "https://hbj1d0-99.myshopify.com/cart/46888623046817:1",
    "https://hbj1d0-99.myshopify.com/cart/46888623046817:1?checkout",
    "https://hbj1d0-99.myshopify.com/cart/add?id=46888623046817&quantity=1",
]

print("\n=== TESTING PERMALINK REDIRECT RESPONSES ===")
for u in urls_to_test:
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"URL: {u}")
            print(f"  Status Code: {resp.getcode()}")
            print(f"  Final URL: {resp.geturl()}\n")
    except Exception as e:
        print(f"URL {u} Error: {e}")
