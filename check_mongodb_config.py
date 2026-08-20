import os

backend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend"

matches = []

for root, dirs, files in os.walk(backend_dir):
    for f in files:
        if f.endswith(('.js', '.json', '.env', '.env.example', 'Dockerfile', '.py')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                for line_no, line in enumerate(file, 1):
                    if "MONGODB" in line or "mongodb" in line:
                        matches.append(f"{os.path.basename(filepath)}:{line_no}: {line.strip()}")

print(f"Found {len(matches)} MongoDB references in backend:")
for m in matches:
    print(m)
