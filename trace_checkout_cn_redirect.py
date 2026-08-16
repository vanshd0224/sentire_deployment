import urllib.request

cn_url = "https://hbj1d0-99.myshopify.com/checkouts/cn/hWNFiM1OaI7xprjX05Bgt5sK/en-in?_r=AQABylmSdStLHioUeS9sgzZ3Lt6fuwKgH3Q1HOUKWuLKYFA"

class TraceRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"Sub-Redirect: Code {code} -> {newurl}")
        return super().redirect_request(req, fp, code, msg, headers, newurl)

opener = urllib.request.build_opener(TraceRedirectHandler)
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')]

print("=== TRACING CHECKOUT CN URL ===")
try:
    resp = opener.open(cn_url)
    print("Final Status Code:", resp.getcode())
    print("Final URL:", resp.geturl())
    content = resp.read().decode('utf-8', errors='ignore')
    if "checkout" in resp.geturl().lower():
        print("SUCCESS: 100% OPENED SHOPIFY CHECKOUT FORM!")
    else:
        print("Redirected away to:", resp.geturl())
except Exception as e:
    print("Error:", e)
