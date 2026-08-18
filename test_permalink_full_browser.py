import urllib.request
import json

permalink = "https://hbj1d0-99.myshopify.com/cart/46888622293153:1"

cj = urllib.request.HTTPCookieProcessor()
opener = urllib.request.build_opener(cj)

req = urllib.request.Request(permalink, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
})

try:
    r = opener.open(req)
    print("=== PERMALINK FULL BROWSER RESULT ===")
    print("Final URL reached:", r.geturl())
    html = r.read().decode('utf-8', errors='ignore')
    print("HTML Title:", html[html.find("<title>"):html.find("</title>")+8] if "<title>" in html else "No title")
except Exception as e:
    print("Error:", e)
