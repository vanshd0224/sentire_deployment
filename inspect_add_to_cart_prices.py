import os
import re

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== SEARCHING FOR HARDCODED 2499 OR PRICE FALLBACKS ===")
for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file_in:
                content = file_in.read()
                if "2499" in content or "2,499" in content or "price" in content:
                    lines = content.splitlines()
                    for idx, line in enumerate(lines):
                        if "2499" in line or "2,499" in line or ("addto" in line.lower() and "price" in line.lower()):
                            print(f"{os.path.relpath(fp, src_dir)} (L{idx+1}): {line.strip()}")
