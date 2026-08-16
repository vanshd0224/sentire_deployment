import urllib.request

url1 = "https://hbj1d0-99.myshopify.com/cart/add?id=46888623046817&quantity=1"
url2 = "https://hbj1d0-99.myshopify.com/cart/46888623046817:1"

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for url in [url1, url2]:
    print(f"\nTESTING: {url}")
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"  Code: {resp.getcode()}")
            print(f"  Final URL: {resp.geturl()}")
    except Exception as e:
        print(f"  Error: {e}")
