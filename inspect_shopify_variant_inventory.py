import urllib.request
import json

url = "https://hbj1d0-99.myshopify.com/products/purple-oud.js"
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("Product Title:", data.get("title"))
        variants = data.get("variants", [])
        for v in variants:
            print("Variant:", v)
except Exception as e:
    print("Error:", e)
