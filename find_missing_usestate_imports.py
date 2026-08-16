import os
import re

frontend_src = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== SEARCHING FOR MISSING useState IMPORTS ===")

for root, dirs, files in os.walk(frontend_src):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                if "useState" in content:
                    # Check if useState is imported
                    if "useState" not in content.split("import")[1] if "import" in content else True:
                        # Check first 15 lines for import
                        first_lines = "\n".join(content.splitlines()[:15])
                        if "useState" not in first_lines:
                            print(f"MISSING useState IMPORT IN FILE: {os.path.relpath(fp, frontend_src)}")
