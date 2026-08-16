import os

pp_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\PerfumesPage.tsx"

with open(pp_path, "r", encoding="utf-8") as f:
    code = f.read()

start = code.find("white-oud")
if start != -1:
    print("FOUND white-oud in PerfumesPage.tsx:")
    print(code[start-100:start+1200])
else:
    print("white-oud not hardcoded in PerfumesPage.tsx")
