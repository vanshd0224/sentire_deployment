import os

frontend_src = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== SEARCHING FOR IconClose USAGE & IMPORTS IN FRONTEND ===")

for root, dirs, files in os.walk(frontend_src):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                if "IconClose" in content:
                    rel_path = os.path.relpath(fp, frontend_src)
                    print(f"\nFile: {rel_path}")
                    for line_no, line in enumerate(content.splitlines(), 1):
                        if "IconClose" in line:
                            print(f"  Line {line_no}: {line.strip()}")
