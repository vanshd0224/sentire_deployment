import urllib.request

generated_url = "https://hbj1d0-99.myshopify.com/cart/c/hWNFiG4l81RmeNrOe23pMsMu?key=pQ6Wkc5UebcdZSJF8bkUGEYCtqVPjrGiDfV3FjKVE2sLvGa0FHwfy0KWDH-BCqCuYX1JfLe9SOge0wm7fKPB0VZ4aqLO7y-DJ_DPU6D9eLwyIpZ44ANED-haZIvkYWjNGfpqZVpnN_ODOCbY5QdEuw%3D%3D"

# Replace /cart/c/ with /checkouts/c/
alt_url_1 = generated_url.replace("/cart/c/", "/checkouts/c/")
alt_url_2 = generated_url + "&checkout=true"
alt_url_3 = "https://hbj1d0-99.myshopify.com/checkout"

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for label, u in [("Original Cart C", generated_url), ("Checkouts Path", alt_url_1), ("With Checkout Query", alt_url_2), ("Direct /checkout", alt_url_3)]:
    print(f"\n--- TESTING {label} ---")
    print(f"URL: {u}")
    req = urllib.request.Request(u, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"  Code: {resp.getcode()}")
            print(f"  Final URL: {resp.geturl()}")
    except Exception as e:
        print(f"  Error: {e}")
