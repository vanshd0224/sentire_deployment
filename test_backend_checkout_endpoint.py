import urllib.request
import json

# Test Shopify GraphQL cartCreate directly from python (simulating backend call)
url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"

query = """
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
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

req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

try:
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode("utf-8"))
        checkout_url = body.get("data", {}).get("cartCreate", {}).get("cart", {}).get("checkoutUrl")
        print("=== TEST BACKEND SIMULATION RESULT ===")
        print("Generated Checkout URL:", checkout_url)
        
        # Test loading the generated checkoutUrl directly
        print("\nTesting HTTP GET on generated Checkout URL...")
        req_chk = urllib.request.Request(checkout_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_chk) as resp_chk:
            print("Checkout URL Response Code:", resp_chk.getcode())
            print("Checkout URL Final Redirect:", resp_chk.geturl())
except Exception as e:
    print("Error:", e)
