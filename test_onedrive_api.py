import urllib.request
import json
import base64

# Base64 encode the share URL for OneDrive API v2.0 shares format: u! + base64(url).rstrip('=').replace('/','_').replace('+','-')
share_url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"
b64 = base64.b64encode(share_url.encode('utf-8')).decode('utf-8').rstrip('=').replace('/', '_').replace('+', '-')
share_id = "u!" + b64

print("Share ID:", share_id)

api_urls = [
    f"https://api.onedrive.com/v1.0/shares/{share_id}/root/children",
    f"https://api.onedrive.com/v1.0/shares/{share_id}/root",
    f"https://graph.microsoft.com/v1.0/shares/{share_id}/driveItem/children",
]

for api_url in api_urls:
    print(f"\n--- Testing API: {api_url} ---")
    req = urllib.request.Request(api_url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("SUCCESS! Data keys:", data.keys())
            if "value" in data:
                print("Items found:", len(data["value"]))
                for item in data["value"]:
                    print("  •", item.get("name"), "(folder)" if "folder" in item else "(file)")
    except Exception as e:
        print("Error:", e)
