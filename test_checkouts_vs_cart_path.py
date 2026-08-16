import urllib.request
import json
import http.cookiejar

cookie_jar = http.cookiejar.CookieJar()
handler = urllib.request.HTTPCookieProcessor(cookie_jar)
opener = urllib.request.build_opener(handler)
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')]

# 1. Create cart via GraphQL
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

# Mirai 50ML variant ID: 46888622850209
variables = {"input": {"lines": [{"merchandiseId": "gid://shopify/ProductVariant/46888622850209", "quantity": 1}]}}
payload = json.dumps({"query": query, "variables": variables}).encode("utf-8")
headers_gql = {"Content-Type": "application/json", "Accept": "application/json"}

req_gql = urllib.request.Request(url_gql, data=payload, headers=headers_gql, method="POST")

try:
    with urllib.request.urlopen(req_gql) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        raw_checkout_url = body.get("data", {}).get("cartCreate", {}).get("cart", {}).get("checkoutUrl")
        print("Raw GraphQL Checkout URL:", raw_checkout_url)

        # Test A: Raw checkoutUrl (/cart/c/...)
        print("\n--- TEST A: Raw checkoutUrl (/cart/c/...) ---")
        try:
            resp_a = opener.open(raw_checkout_url)
            print("  Final URL:", resp_a.geturl())
        except Exception as e:
            print("  Error A:", e)

        # Test B: Transformed checkoutUrl (/checkouts/c/...)
        alt_checkout_url = raw_checkout_url.replace("/cart/c/", "/checkouts/c/")
        print("\n--- TEST B: Transformed checkoutUrl (/checkouts/c/...) ---")
        try:
            resp_b = opener.open(alt_checkout_url)
            print("  Final URL:", resp_b.geturl())
        except Exception as e:
            print("  Error B:", e)

        # Test C: Direct Permalink (/cart/46888622850209:1)
        permalink_url = "https://hbj1d0-99.myshopify.com/cart/46888622850209:1"
        print("\n--- TEST C: Direct Permalink (/cart/46888622850209:1) ---")
        try:
            resp_c = opener.open(permalink_url)
            print("  Final URL:", resp_c.geturl())
        except Exception as e:
            print("  Error C:", e)

except Exception as e:
    print("GraphQL Error:", e)
