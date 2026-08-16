import urllib.request
import json

# Test fetching shop details via Storefront API to inspect checkout permissions
url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

query = """
query {
  shop {
    name
    shipsToCountries
    paymentSettings {
      currencyCode
      acceptedCardBrands
    }
  }
}
"""

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

payload = json.dumps({"query": query}).encode("utf-8")

print("=== CHECKING SHOPIFY STORE PAYMENT SETTINGS VIA STOREFRONT API ===")
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        print(json.dumps(body, indent=2))
except Exception as e:
    print("Error:", e)
