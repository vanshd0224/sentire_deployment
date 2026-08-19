import urllib.request
import re
import ssl

url = "https://ecommerce-frontend-1041917436859.asia-south1.run.app/"

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Cache-Control": "no-cache"})

print("=== CHECKING LIVE CLOUD RUN INDEX.HTML & JS BUNDLE HASH ===")

try:
    with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
        html = resp.read().decode('utf-8')
        js_files = re.findall(r'/assets/index-[A-Za-z0-9_\-]+\.js', html)
        print("Live HTML JS Bundle Script Tags:", js_files)
        
        if js_files:
            js_url = f"https://ecommerce-frontend-1041917436859.asia-south1.run.app{js_files[0]}"
            req_js = urllib.request.Request(js_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req_js, timeout=10, context=ctx) as resp_js:
                js_code = resp_js.read().decode('utf-8')
                print(f"\nLive JS Bundle Size: {len(js_code)} bytes")
                print("Contains 'Mobile Debug Trace'?:", "Mobile Debug Trace" in js_code or "Live Phone Debug Log" in js_code)
                print("Contains 'create-cart'?:", "create-cart" in js_code)
except Exception as e:
    print("Error checking live bundle:", e)
