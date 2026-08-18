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
    checkout_url = cart["checkoutUrl"]
    print("Generated Checkout URL:", checkout_url)

print("\n=== STEP-BY-STEP REDIRECT INSPECTION ===")

curr_url = checkout_url
for step in range(10):
    req_step = urllib.request.Request(curr_url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    
    class StopRedirectHandler(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            print(f"Step {step+1}: Code {code} -> Location: {newurl}")
            return None # Stop redirecting

    opener = urllib.request.build_opener(StopRedirectHandler)
    try:
        r = opener.open(req_step)
        print(f"Final Step {step+1}: Status {r.status} -> URL: {r.geturl()}")
        break
    except urllib.error.HTTPError as e:
        if e.code in (301, 302, 303, 307, 308):
            location = e.headers.get("Location")
            print(f"Step {step+1}: Code {e.code} -> Redirecting to: {location}")
            curr_url = location
        else:
            print(f"Step {step+1}: HTTP Error {e.code}: {e.reason}")
            break
