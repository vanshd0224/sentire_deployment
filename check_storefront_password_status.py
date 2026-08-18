import urllib.request

url = "https://hbj1d0-99.myshopify.com/password"
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("=== CHECKING PASSWORD PAGE STATUS ===")
        print("URL:", resp.geturl())
        print("Status code:", resp.status)
        print("Contains password form:", 'action="/password"' in html or 'type="password"' in html)
except Exception as e:
    print("Error:", e)
