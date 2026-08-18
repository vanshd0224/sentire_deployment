import urllib.request

url = "https://hbj1d0-99.myshopify.com/cart/46888622293153:1"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("=== STOREFRONT PAGE DIAGNOSTIC ===")
        print("Final URL:", resp.geturl())
        print("HTML Title:", html[html.find("<title>"):html.find("</title>")+8] if "<title>" in html else "No title")
        print("Contains 'password':", "password" in html.lower())
        print("Contains 'cart':", "cart" in html.lower())
        print("Contains 'checkout':", "checkout" in html.lower())
except Exception as e:
    print("Error:", e)
