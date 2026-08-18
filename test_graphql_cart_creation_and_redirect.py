import urllib.request
import json

shop = "hbj1d0-99.myshopify.com"
graphql_url = f"https://{shop}/api/2026-07/graphql.json"

print("=== TESTING GRAPHQL cartCreate -> checkoutUrl REDIRECT ===")

mutation = """
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 5) {
        nodes {
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
              }
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
"""

variables = {
    "input": {
        "lines": [
            {
                "merchandiseId": "gid://shopify/ProductVariant/46888623243425",
                "quantity": 1
            }
        ]
    }
}

req = urllib.request.Request(graphql_url, data=json.dumps({"query": mutation, "variables": variables}).encode(), headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode())
    cart = res["data"]["cartCreate"]["cart"]
    checkout_url = cart["checkoutUrl"]
    print("1. GraphQL Generated checkoutUrl:")
    print("   ", checkout_url)
    
    # Follow checkoutUrl
    req_chk = urllib.request.Request(checkout_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req_chk) as resp_chk:
        final_dest = resp_chk.geturl()
        print("\n2. Final Destination URL:")
        print("   ", final_dest)
        print("\n3. Is valid checkout domain?:", "/checkouts/" in final_dest)
