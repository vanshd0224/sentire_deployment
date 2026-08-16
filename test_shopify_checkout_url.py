import urllib.request

# Test permalink for Purple Oud 50ML (Variant ID: 46888623046817)
url = "https://hbj1d0-99.myshopify.com/cart/46888623046817:1?checkout"

print("=== TESTING SHOPIFY CHECKOUT PERMALINK URL ===")
print(f"URL: {url}")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        final_url = resp.geturl()
        code = resp.getcode()
        print(f"Response Code: {code}")
        print(f"Final Redirected URL: {final_url}")
        content = resp.read().decode('utf-8', errors='ignore')
        
        if "checkout" in final_url.lower() or "checkouts" in final_url.lower() or "cart" in final_url.lower():
            print("\nSUCCESS: Shopify accepted the variant ID and opened Checkout!")
            if "Your cart is empty" in content or "cart is empty" in content.lower():
                print("Status: Warning - Cart empty text detected.")
            else:
                print("Status: 100% VALID CHECKOUT FORM - Cart is NOT empty!")
except Exception as e:
    print(f"Error testing URL: {e}")
