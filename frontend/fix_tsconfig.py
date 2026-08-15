import json

tsconfig_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\tsconfig.json"

with open(tsconfig_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Remove baseUrl and fix paths
if "baseUrl" in data["compilerOptions"]:
    del data["compilerOptions"]["baseUrl"]

data["compilerOptions"]["paths"] = {
    "@/*": ["./src/*"]
}

if "types" in data["compilerOptions"]:
    del data["compilerOptions"]["types"]

with open(tsconfig_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("SUCCESS: Updated tsconfig.json for TypeScript 5.9+ compatibility")
