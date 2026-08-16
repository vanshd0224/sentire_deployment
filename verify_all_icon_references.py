import os
import re

frontend_src = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"

print("=== CHECKING FOR UNBOUND ICON COMPONENTS ACROSS ALL FRONTEND FILES ===")

icon_names = ["IconClose", "IconCheck", "IconArrow", "IconLock", "IconDiamond", "IconCart", "IconUser", "IconSearch", "IconMenu", "IconStar"]

for root, dirs, files in os.walk(frontend_src):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8") as file:
                content = file.read()
                for icon in icon_names:
                    # Check if JSX tag like <IconClose is present
                    if f"<{icon}" in content:
                        # Check if defined or imported in the file
                        if f"const {icon}" not in content and f"function {icon}" not in content and f"import {icon}" not in content and f"{icon}," not in content and f", {icon}" not in content and f"{{{icon}}}" not in content:
                            print(f"UNDEFINED ICON {icon} IN FILE: {os.path.relpath(fp, frontend_src)}")
