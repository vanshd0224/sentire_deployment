import urllib.request
import urllib.parse

url = "https://hbj1d0-99.myshopify.com/cart/add"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Content-Type': 'application/x-www-form-urlencoded'
}

data = urllib.parse.urlencode({
    'items[0][id]': '46888623046817',
    'items[0][quantity]': '1',
    'return_to': '/checkout'
}).encode('utf-8')

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"POST Redirect Code {code} -> Location: {newurl}")
        return None

opener = urllib.request.build_opener(NoRedirect)

print("=== TESTING NATIVE FORM POST TO SHOPIFY /cart/add ===")
req = urllib.request.Request(url, data=data, headers=headers, method="POST")

try:
    resp = opener.open(req)
    print("Response Code:", resp.getcode())
except Exception as e:
    print("Exception:", e)
