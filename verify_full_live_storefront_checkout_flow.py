import urllib.request
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

print("=== 1. VERIFYING LIVE FRONTEND WEB APP STATUS ===")
fe_url = "https://ecommerce-frontend-1041917436859.asia-south1.run.app"
try:
    req_fe = urllib.request.Request(fe_url, headers=headers)
    with urllib.request.urlopen(req_fe) as resp_fe:
        print(f"Frontend Status Code: {resp_fe.getcode()}")
        html_fe = resp_fe.read().decode('utf-8', errors='ignore')
        if "<div id=\"root\">" in html_fe:
            print("Frontend HTML: VALID REACT APP BUNDLE LOADED!")
except Exception as e:
    print("Frontend Error:", e)

print("\n=== 2. VERIFYING SHOPIFY STOREFRONT cartCreate GRAPHQL API ===")
graphql_url = "https://hbj1d0-99.myshopify.com/api/2026-07/graphql.json"
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

payload = json.dumps({"query": query, "variables": variables}).encode("utf-8")
headers_gql = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "User-Agent": "Mozilla/5.0"
}

req_gql = urllib.request.Request(graphql_url, data=payload, headers=headers_gql, method="POST")

try:
    with urllib.request.urlopen(req_gql) as resp_gql:
        data_gql = json.loads(resp_gql.read().decode('utf-8'))
        cart = data_gql.get("data", {}).get("cartCreate", {}).get("cart", {})
        checkout_url = cart.get("checkoutUrl")
        print("Shopify Cart ID:", cart.get("id"))
        print("Shopify Generated Checkout URL:", checkout_url)
        
        lines = cart.get("lines", {}).get("edges", [])
        for edge in lines:
            node = edge.get("node", {})
            merch = node.get("merchandise", {})
            print(f"  Line Item: {merch.get('title')} | Qty: {node.get('quantity')} | Price: {merch.get('price', {}).get('amount')} {merch.get('price', {}).get('currencyCode')}")

        print("\n=== 3. VERIFYING SHOPIFY CHECKOUT PERMALINK REDIRECT ===")
        url_permalink = "https://hbj1d0-99.myshopify.com/cart/46888623046817:1"
        req_perm = urllib.request.Request(url_permalink, headers=headers)
        with urllib.request.urlopen(req_perm) as resp_perm:
            print("Permalink Response Code:", resp_perm.getcode())
            print("Permalink Final Redirect URL:", resp_perm.geturl())
            if "checkouts" in resp_perm.geturl():
                print("SUCCESS: 100% VERIFIED! REDIRECTS DIRECTLY TO SHOPIFY CHECKOUT FORM!")

except Exception as e:
    print("Storefront Error:", e)
