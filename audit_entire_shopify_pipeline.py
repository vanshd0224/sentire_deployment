import os
import json
import urllib.request

print("=== SENIOR ENGINEER DEEP AUDIT OF SHOPIFY STOREFRONT & ADMIN APIS ===")

shop = "hbj1d0-99.myshopify.com"
graphql_url = f"https://{shop}/api/2026-07/graphql.json"

# 1. TEST STOREFRONT API GRAPHQL HEALTH
print("\n--- 1. Testing Storefront API GraphQL Endpoint Health ---")
test_query = """
query {
  shop {
    name
    primaryDomain {
      url
    }
  }
}
"""

req = urllib.request.Request(graphql_url, data=json.dumps({"query": test_query}).encode(), headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode())
        print("Storefront API Response:", res)
        if "data" in res and "shop" in res["data"]:
            print("[PASS] Storefront API Endpoint is 100% HEALTHY & REACHABLE!")
        else:
            print("[FAIL] Storefront API Query returned unexpected payload:", res)
except Exception as e:
    print("[FAIL] Storefront API Endpoint Error:", e)

# 2. TEST INVALID STALE CART ID HANDLING
print("\n--- 2. Testing Invalid Cart Recovery (Stale Cart ID Test) ---")
stale_mutation = """
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
    }
    userErrors {
      field
      message
      code
    }
  }
}
"""
stale_variables = {
    "cartId": "gid://shopify/Cart/INVALID_STALE_ID_12345",
    "lines": [{"merchandiseId": "gid://shopify/ProductVariant/46888623046817", "quantity": 1}]
}
req_stale = urllib.request.Request(graphql_url, data=json.dumps({"query": stale_mutation, "variables": stale_variables}).encode(), headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req_stale) as resp:
        res_stale = json.loads(resp.read().decode())
        print("Stale Cart Response:", res_stale)
        user_errs = res_stale.get("data", {}).get("cartLinesAdd", {}).get("userErrors", [])
        c_obj = res_stale.get("data", {}).get("cartLinesAdd", {}).get("cart")
        if user_errs or not c_obj:
            print("[PASS] Stale Cart Error detected correctly! UserErrors:", user_errs)
except Exception as e:
    print("[FAIL] Stale cart test exception:", e)
