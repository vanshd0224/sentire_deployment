import os

perfumes_ts_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\data\perfumes.ts"

if os.path.exists(perfumes_ts_path):
    with open(perfumes_ts_path, "r", encoding="utf-8") as f:
        code = f.read()
        start = code.find("white-oud")
        if start != -1:
            print(code[start:start+1500])
        else:
            print("white-oud not found in perfumes.ts")
else:
    print("perfumes.ts not found")
