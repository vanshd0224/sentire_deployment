import urllib.request
import json

shop = "hbj1d0-99.myshopify.com"
url = f"https://{shop}/api/2026-07/graphql.json"

# Test cart creation and check if there are any specific errors returned or if variants are published
query = """
mutation {
  cartCreate(input: {
    lines: [
      { merchandiseId: "gid://shopify/ProductVariant/46888622293153", quantity: 1 }
    ]
  }) {
    cart {
      id
      checkoutUrl
      totalQuantity
      lines(first: 5) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                availableForSale
                product {
                  title
                  onlineStoreUrl
                }
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""

req = urllib.request.Request(url, data=json.dumps({"query": query}).encode(), headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode())
    print("=== GRAPHQL DETAILED CART DEEP DIAGNOSTIC ===")
    print(json.dumps(res, indent=2))
