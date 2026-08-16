import urllib.request
import urllib.parse

url = "https://hbj1d0-99.myshopify.com/cart/add"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Content-Type': 'application/x-www-form-urlencoded'
}

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"  Redirect Code {code} -> Location: {newurl}")
        return None

opener = urllib.request.build_opener(NoRedirect)

# Format 1: Single item id & quantity
data1 = urllib.parse.urlencode({
    'id': '46888623046817',
    'quantity': '1',
    'return_to': '/checkout'
}).encode('utf-8')

print("=== FORMAT 1: SINGLE ITEM (id & quantity) ===")
req1 = urllib.request.Request(url, data=data1, headers=headers, method="POST")
try:
    resp1 = opener.open(req1)
    print("  Status Code:", resp1.getcode())
except Exception as e:
    print("  Exception:", e)

# Format 2: Array items[0][id] & items[0][quantity]
data2 = urllib.parse.urlencode({
    'items[0][id]': '46888623046817',
    'items[0][quantity]': '1',
    'return_to': '/checkout'
}).encode('utf-8')

print("\n=== FORMAT 2: ARRAY ITEMS (items[0][id]) ===")
req2 = urllib.request.Request(url, data=data2, headers=headers, method="POST")
try:
    resp2 = opener.open(req2)
    print("  Status Code:", resp2.getcode())
except Exception as e:
    print("  Exception:", e)
