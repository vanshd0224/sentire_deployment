import urllib.request
import urllib.parse

urls = [
    "https://hbj1d0-99.myshopify.com/cart/46888623046817:1",
    "https://hbj1d0-99.myshopify.com/cart/46888623046817:1?checkout=true",
    "https://hbj1d0-99.myshopify.com/cart/add?id=46888623046817&quantity=1"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
}

print("=== TESTING LIVE PUBLISHED SHOPIFY PERMALINKS ===")

for u in urls:
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            final_url = resp.geturl()
            status = resp.getcode()
            print(f"URL: {u}")
            print(f"  Response Status: {status}")
            print(f"  Final Redirect URL: {final_url}")
            
            content = resp.read().decode('utf-8', errors='ignore')
            if "empty" in content.lower() and "cart" in content.lower():
                print("  Status: Contains empty cart text")
            else:
                print("  Status: VALID PRODUCT / CHECKOUT PAGE!")
    except Exception as e:
        print(f"Error testing {u}: {e}")
