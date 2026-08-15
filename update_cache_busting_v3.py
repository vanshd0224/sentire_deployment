perfumes_ts_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"

with open(perfumes_ts_path, "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace("?v=2", "?v=3")

with open(perfumes_ts_path, "w", encoding="utf-8") as f:
    f.write(code)

print("SUCCESS: Updated cache-busting query parameter to ?v=3 in perfumes.ts!")
