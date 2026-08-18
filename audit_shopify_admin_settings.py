import urllib.request
import json

shop = "hbj1d0-99.myshopify.com"

print("=== DEEP AUDIT OF SHOPIFY ADMIN SETTINGS & MARKETS ===")

# 1. Test public Storefront API for Markets, Currency & Product Availability
graphql_url = f"https://{shop}/api/2026-07/graphql.json"

market_query = """
query {
  shop {
    name
    shipsToCountries
    paymentSettings {
      currencyCode
      supportedDigitalWallets
    }
  }
  products(first: 15) {
    nodes {
      id
      title
      handle
      availableForSale
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
"""

req = urllib.request.Request(graphql_url, data=json.dumps({"query": market_query}).encode(), headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print("Response keys:", res.keys())
        data = res.get("data", {})
        shop_info = data.get("shop", {})
        print("\nShop Name:", shop_info.get("name"))
        print("Ships To Countries Count:", len(shop_info.get("shipsToCountries", [])))
        print("Ships to IN?:", "IN" in shop_info.get("shipsToCountries", []))
        print("Currency:", shop_info.get("paymentSettings", {}).get("currencyCode"))
        
        products = data.get("products", {}).get("nodes", [])
        print(f"\nTotal Products Published to Storefront: {len(products)}")
        for p in products:
            p_title = p.get("title")
            avail = p.get("availableForSale")
            v_list = p.get("variants", {}).get("nodes", [])
            print(f"  • Product: '{p_title:<30}' | Available: {avail} | Variants: {len(v_list)}")
            for v in v_list:
                v_id = v.get("id").split("/")[-1]
                v_title = v.get("title")
                v_avail = v.get("availableForSale")
                price = v.get("price", {}).get("amount")
                if not v_avail:
                    print(f"    ⚠️ WARNING VARIANT UNAVAILABLE: {v_title} (ID: {v_id}) - Price: ₹{price}")

except Exception as e:
    print("Error querying Storefront API:", e)
