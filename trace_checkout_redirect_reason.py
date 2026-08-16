import urllib.request

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"Redirect Triggered: Code {code} -> New URL: {newurl}")
        return None

opener = urllib.request.build_opener(NoRedirectHandler)
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]

url = "https://hbj1d0-99.myshopify.com/checkout"
print("=== TRACING DIRECT CHECKOUT REDIRECT ===")
try:
    resp = opener.open(url)
    print("Response Code:", resp.getcode())
    print("Response Headers:", resp.headers)
except Exception as e:
    print("Exception:", e)
