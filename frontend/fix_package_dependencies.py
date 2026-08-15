import json

pkg_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\package.json"

with open(pkg_path, 'r', encoding='utf-8') as f:
    pkg = json.load(f)

# Move all devDependencies into dependencies to guarantee Docker npm install gets all plugins
dev_deps = pkg.get('devDependencies', {})
for k, v in dev_deps.items():
    pkg['dependencies'][k] = v

with open(pkg_path, 'w', encoding='utf-8') as f:
    json.dump(pkg, f, indent=2)

print("SUCCESS: Moved devDependencies to dependencies in package.json for Docker build compatibility!")
