import urllib.request
import json
import re

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"

req = urllib.request.Request(url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print("Redirected URL:", resp.geturl())
        
        # Look for JSON configs or API canary or item lists in html
        matches = re.findall(r'var\s+\$Config\s*=\s*(\{.*?\});', html)
        if matches:
            print("Config found:", matches[0][:200])
            
        # Check for redeemed API link or items
        redeem_match = re.search(r'redeem=([a-zA-Z0-9%]+)', url)
        print("Redeem param found:", redeem_match.group(1) if redeem_match else "None")

        # Search for any JSON array/object inside script tags containing folder names
        for script in re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL):
            if "0809" in script or "Calantha" in script or "Herrlich" in script or "items" in script.lower():
                print("Found matching script block:", script[:300])

except Exception as e:
    print("Error:", e)
