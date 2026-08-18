import urllib.request
import re

url = "https://ecommerce-frontend-1041917436859.asia-south1.run.app"

req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
    
    js_match = re.search(r'src="(/assets/index-[^"]+\.js)"', html)
    if js_match:
        js_url = url + js_match.group(1)
        print("\nLive JS Bundle URL:", js_url)
        
        req_js = urllib.request.Request(js_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req_js) as resp_js:
            js_content = resp_js.read().decode('utf-8')
            print("Contains 'Fresh Shopify Permalink':", "Fresh Shopify Permalink" in js_content)
            print("Contains 'shopify_checkout_url':", "shopify_checkout_url" in js_content)
            print("Contains '/cart/c/':", "/cart/c/" in js_content)
            print("Contains 'myshopify.com/cart/':", "myshopify.com/cart/" in js_content)
