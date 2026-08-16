import urllib.request
import json

# Test Shopify Storefront cartCreate GraphQL mutation
url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

# We need a Storefront Access Token or test unauthenticated query
query = """
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 5) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
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
    }
  }
}
"""

variables = {
    "input": {
        "lines": [
            {
                "merchandiseId": "gid://shopify/ProductVariant/46888623046817",
                "quantity": 1
            }
        ]
    }
}

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

payload = json.dumps({"query": query, "variables": variables}).encode("utf-8")

print("=== TESTING SHOPIFY STOREFRONT cartCreate MUTATION ===")
req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        print("GraphQL Response:")
        print(json.dumps(body, indent=2))
except Exception as e:
    print("Error testing Storefront API:", e)
