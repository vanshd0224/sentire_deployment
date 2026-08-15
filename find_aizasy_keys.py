import os
import re

search_path = r"C:\Users\asus\.gemini\antigravity"
found = set()

for root, dirs, files in os.walk(search_path):
    for f in files:
        if any(ext in f.lower() for ext in [".json", ".jsonl", ".txt", ".js", ".ts", ".py", ".log", ".md"]):
            fp = os.path.join(root, f)
            try:
                with open(fp, "r", encoding="utf-8", errors="ignore") as file:
                    text = file.read()
                    matches = re.findall(r'AIzaSy[A-Za-z0-9_-]{33}', text)
                    for m in matches:
                        found.add((m, f))
            except Exception as e:
                pass

print("=== FOUND GEMINI API KEYS (AIzaSy...) ===")
for key, fn in found:
    print(f"- KEY: {key} (Found in {fn})")
