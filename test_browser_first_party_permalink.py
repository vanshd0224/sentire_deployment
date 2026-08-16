import urllib.request
import http.cookiejar

# Create a cookie jar to store session cookies across redirects
cookie_jar = http.cookiejar.CookieJar()
handler = urllib.request.HTTPCookieProcessor(cookie_jar)
opener = urllib.request.build_opener(handler)
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')]

# Test 1: Permalink GET request with cookies enabled
url_permalink = "https://hbj1d0-99.myshopify.com/cart/46888623046817:1"

print("=== TESTING PERMALINK GET REQUEST WITH COOKIE PROCESSOR ===")
try:
    resp = opener.open(url_permalink)
    print("Final Status Code:", resp.getcode())
    print("Final URL:", resp.geturl())
    print("Cookies Stored:", len(cookie_jar))
    for c in cookie_jar:
        print(f"  Cookie: {c.name}={c.value[:15]}...")
except Exception as e:
    print("Error:", e)
