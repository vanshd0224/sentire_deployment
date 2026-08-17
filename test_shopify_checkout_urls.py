import urllib.request
import json

shop = "hbj1d0-99.myshopify.com"
url = f"https://{shop}/api/2026-07/graphql.json"

mutation = """
mutation {
  cartCreate(input: {
    lines: [
      { merchandiseId: "gid://shopify/ProductVariant/46888622293153", quantity: 1 }
    ]
  }) {
    cart {
      id
      checkoutUrl
    }
  }
}
"""

req = urllib.request.Request(url, data=json.dumps({"query": mutation}).encode(), headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode())
    cart = res["data"]["cartCreate"]["cart"]
    print("=== GRAPHQL STOREFRONT CART CREATED ===")
    print("Cart ID:", cart["id"])
    print("Checkout URL:", cart["checkoutUrl"])

    # Test HTTP redirect loop on Checkout URL
    checkout_url = cart["checkoutUrl"]
    print("\n=== TRACING CHECKOUT URL REDIRECTS ===")
    class NoRedirectHandler(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            print(f"Redirect {code}: -> {newurl}")
            return super().redirect_request(req, fp, code, msg, headers, newurl)

    opener = urllib.request.build_opener(NoRedirectHandler)
    try:
        r = opener.open(checkout_url)
        print("Final URL reached:", r.geturl())
    except Exception as e:
        print("Redirect trace ended with:", e)
