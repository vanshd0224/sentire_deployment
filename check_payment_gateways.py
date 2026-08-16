import urllib.request
import json

url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

query = """
query {
  shop {
    paymentSettings {
      currencyCode
      acceptedCardBrands
    }
  }
}
"""

headers = {"Content-Type": "application/json", "Accept": "application/json"}
payload = json.dumps({"query": query}).encode("utf-8")

print("=== CHECKING SHOPIFY ACCEPTED PAYMENT BRANDS ===")
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        brands = body.get("data", {}).get("shop", {}).get("paymentSettings", {}).get("acceptedCardBrands", [])
        print("Accepted Payment Brands:", brands)
except Exception as e:
    print("Error:", e)
