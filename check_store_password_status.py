import urllib.request

url = "https://hbj1d0-99.myshopify.com/"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

print("=== CHECKING SHOPIFY STORE PASSWORD PAGE STATUS ===")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        if "password" in content.lower() and ("enter store using password" in content.lower() or "opening soon" in content.lower()):
            print("RESULT: STORE IS PASSWORD PROTECTED! (Password page is active)")
        else:
            print("RESULT: Store is open. Searching for checkout restrictions...")
            for kw in ["checkout", "cart", "password"]:
                if kw in content.lower():
                    print(f"  Keyword '{kw}' found in homepage HTML.")
except Exception as e:
    print("Error:", e)
