import urllib.request
import json
import re

url = "https://onedrive.live.com/?id=3B2E9C32A6A96F54%21s9ee76f78bcce40a49a46c06ea0e2d1b2&cid=3B2E9C32A6A96F54&spopath=%2Fpersonal%2F3b2e9c32a6a96f54%2FDocuments%2FDesktop%2FSENTIRE%2050ML%20IMAGES&listurl=%2Fpersonal%2F3b2e9c32a6a96f54%2FDocuments&ithint=folder&e=yekPPh"

# Let's inspect the page JS bundles to find the skyapi endpoint format
req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        # Find item id and cid
        print("CID:", re.search(r'cid=([A-FA-f0-9]+)', url).group(1))
        print("Folder ID:", re.search(r'id=([A-FA-f0-9%21]+)', url).group(1))
        
        # Test skyapi item list request
        cid = "3B2E9C32A6A96F54"
        folder_id = "3B2E9C32A6A96F54!s9ee76f78bcce40a49a46c06ea0e2d1b2"
        
        sky_url = f"https://onedrive.live.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL2YvYy8zYjJlOWMzMmE2YTk2ZjU0L0lnQjRiLWVlenJ5a1FKcEd3RzZnNHRHeUFmcDM0Y01JcURYdXk5Zk5MUDhab0EwP2U9eWVrUFBo/root/children?authkey=yekPPh"
        req_sky = urllib.request.Request(sky_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        try:
            with urllib.request.urlopen(req_sky) as r_sky:
                print("Sky API Success:", r_sky.read().decode()[:500])
        except Exception as e:
            print("Sky API Error:", e)

except Exception as e:
    print("Error:", e)
