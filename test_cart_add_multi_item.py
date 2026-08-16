import urllib.request

url = "https://hbj1d0-99.myshopify.com/cart/add?id=46888623046817&quantity=1"

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as resp:
        print(f"Code: {resp.getcode()}")
        print(f"Final URL: {resp.geturl()}")
except Exception as e:
    print(f"Error: {e}")
