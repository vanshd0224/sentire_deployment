import os

search_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if 'bottom-' in content and 'right-' in content:
                    print(f"Found in {path}")
