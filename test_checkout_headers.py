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
    checkout_url = res["data"]["cartCreate"]["cart"]["checkoutUrl"]
    print("Checkout URL:", checkout_url)

print("\n=== TESTING FULL BROWSER SIMULATION ON CHECKOUT URL ===")
cj = urllib.request.HTTPCookieProcessor()
opener = urllib.request.build_opener(cj)

req_ch = urllib.request.Request(checkout_url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
})

try:
    r = opener.open(req_ch)
    print("Final URL reached:", r.geturl())
    html = r.read().decode('utf-8', errors='ignore')
    print("HTML Snippet:", html[:500])
except Exception as e:
    print("Error:", e)
