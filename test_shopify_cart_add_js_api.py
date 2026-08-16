import urllib.request
import json

url = "https://hbj1d0-99.myshopify.com/cart/add.js"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

payload = json.dumps({
    "items": [
        {
            "id": 46888623046817,
            "quantity": 1
        }
    ]
}).encode('utf-8')

print("=== TESTING SHOPIFY AJAX CART ADD API ===")
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        print("Response Code:", resp.getcode())
        body = resp.read().decode('utf-8')
        print("Response Body:", body)
        
        # Check cart.js
        cart_url = "https://hbj1d0-99.myshopify.com/cart.js"
        req_cart = urllib.request.Request(cart_url, headers=headers)
        with urllib.request.urlopen(req_cart) as resp_cart:
            cart_body = resp_cart.read().decode('utf-8')
            print("Cart.js Body:", cart_body)
except Exception as e:
    print("Error:", e)
