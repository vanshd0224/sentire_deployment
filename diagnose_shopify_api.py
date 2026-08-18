import urllib.request
import json

shop = "hbj1d0-99.myshopify.com"
url = f"https://{shop}/api/2026-07/graphql.json"

query = """
{
  shop {
    name
    primaryDomain {
      url
      host
    }
    shipsToCountries
  }
}
"""

req = urllib.request.Request(url, data=json.dumps({"query": query}).encode(), headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print("=== STOREFRONT API SHOP DETAILS ===")
        print(json.dumps(res, indent=2))
except Exception as e:
    print("Error:", e)
