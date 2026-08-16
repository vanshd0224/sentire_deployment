import urllib.request
import json

url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

query = """
query {
  localization {
    country {
      name
      isoCode
      currency {
        isoCode
        name
        symbol
      }
    }
  }
}
"""

headers = {"Content-Type": "application/json", "Accept": "application/json"}
payload = json.dumps({"query": query}).encode("utf-8")

print("=== CHECKING SHOPIFY LOCALIZATION STATUS ===")
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        print(json.dumps(body, indent=2))
except Exception as e:
    print("Error:", e)
