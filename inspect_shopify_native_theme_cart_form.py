import urllib.request
import json
import re

url = "https://hbj1d0-99.myshopify.com/products/0809"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

print("=== INSPECTING SHOPIFY NATIVE THEME CART FORM ===")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        forms = re.findall(r'<form.*?>.*?</form>', content, re.DOTALL | re.IGNORECASE)
        for idx, f in enumerate(forms):
            if "cart" in f.lower() or "add" in f.lower() or "checkout" in f.lower():
                print(f"\n--- Form {idx+1} ---")
                clean_f = f.encode('ascii', 'ignore').decode('ascii')
                print(clean_f[:1000])
except Exception as e:
    print("Error:", e)
