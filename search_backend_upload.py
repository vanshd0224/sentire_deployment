import os

search_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend"

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.js', '.json')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if 'upload' in content.lower() or 'engrav' in content.lower():
                    print(f"Found in {path}")
