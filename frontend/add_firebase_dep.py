import json

pkg_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\package.json"

with open(pkg_path, 'r', encoding='utf-8') as f:
    pkg = json.load(f)

pkg['dependencies']['firebase'] = '^11.3.0'

with open(pkg_path, 'w', encoding='utf-8') as f:
    json.dump(pkg, f, indent=2)

print("SUCCESS: Added firebase dependency to package.json")
