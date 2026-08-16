import os
import re

frontend_src = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== VERIFYING ALL FRONTEND REACT HOOK IMPORTS ===")

hooks = ["useState", "useEffect", "useMemo", "useCallback", "useRef"]

for root, dirs, files in os.walk(frontend_src):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                for hook in hooks:
                    # Search if hook is used in code
                    if re.search(r'\b' + hook + r'\b', content):
                        # Check if hook is imported in the first 20 lines
                        first_20 = "\n".join(content.splitlines()[:20])
                        if hook not in first_20:
                            print(f"MISSING {hook} in file: {os.path.relpath(fp, frontend_src)}")
