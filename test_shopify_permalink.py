import urllib.request

permalink = "https://hbj1d0-99.myshopify.com/cart/46888622293153:1"

class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"Redirect {code}: -> {newurl}")
        return super().redirect_request(req, fp, code, msg, headers, newurl)

opener = urllib.request.build_opener(NoRedirectHandler)
print("=== TRACING PERMALINK REDIRECTS ===")
try:
    r = opener.open(permalink)
    print("Final URL reached:", r.geturl())
except Exception as e:
    print("Redirect trace ended with:", e)
