import urllib.request
import json
import http.cookiejar

# Test creating cart via Storefront API and following every redirect
url_gql = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

query = """
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
    }
  }
}
"""

variables = {"input": {"lines": [{"merchandiseId": "gid://shopify/ProductVariant/46888623046817", "quantity": 1}]}}
payload = json.dumps({"query": query, "variables": variables}).encode("utf-8")
headers_gql = {"Content-Type": "application/json", "Accept": "application/json"}

print("=== 1. CREATING CART VIA STOREFRONT API ===")
req_gql = urllib.request.Request(url_gql, data=payload, headers=headers_gql, method="POST")

try:
    with urllib.request.urlopen(req_gql) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        checkout_url = body.get("data", {}).get("cartCreate", {}).get("cart", {}).get("checkoutUrl")
        print("Generated Storefront checkoutUrl:", checkout_url)

        print("\n=== 2. TRACING REDIRECTS FOR STOREFRONT checkoutUrl WITHOUT COOKIES ===")
        class NoCookieTraceHandler(urllib.request.HTTPRedirectHandler):
            def redirect_request(self, req, fp, code, msg, headers, newurl):
                print(f"  Redirect Code {code} -> Location: {newurl}")
                return super().redirect_request(req, fp, code, msg, headers, newurl)

        opener_no_cookie = urllib.request.build_opener(NoCookieTraceHandler)
        opener_no_cookie.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')]

        try:
            resp_no_cookie = opener_no_cookie.open(checkout_url)
            print("  Final Code:", resp_no_cookie.getcode())
            print("  Final URL:", resp_no_cookie.geturl())
        except Exception as e:
            print("  Error:", e)

        print("\n=== 3. TRACING REDIRECTS FOR DIRECT PERMALINK (/cart/VARIANT_ID:QTY) ===")
        permalink_url = "https://hbj1d0-99.myshopify.com/cart/46888623046817:1"
        try:
            resp_perm = opener_no_cookie.open(permalink_url)
            print("  Permalink Final Code:", resp_perm.getcode())
            print("  Permalink Final URL:", resp_perm.geturl())
        except Exception as e:
            print("  Permalink Error:", e)

except Exception as e:
    print("GraphQL Error:", e)
