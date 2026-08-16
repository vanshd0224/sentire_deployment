import os
import re

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Update top React import in CartDrawer.tsx to include ALL hooks used (React, { useState, useEffect, useMemo, useCallback, useRef })
lines = cart_code.splitlines()

# Replace first line with full React hooks import
lines[0] = 'import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";'
fixed_code = "\n".join(lines)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(fixed_code)

print("SUCCESS: Updated CartDrawer.tsx React import to include useState, useEffect, useMemo, useCallback, useRef!")
