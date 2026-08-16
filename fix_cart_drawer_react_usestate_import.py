import os

cart_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src\components\CartDrawer.tsx"

with open(cart_path, "r", encoding="utf-8") as f:
    cart_code = f.read()

# Make sure top import includes React, { useState, useEffect }
first_line = cart_code.splitlines()[0]
print("Current Line 1:", first_line)

if "useState" not in first_line:
    lines = cart_code.splitlines()
    lines[0] = 'import React, { useState, useEffect } from "react";'
    cart_code = "\n".join(lines)

with open(cart_path, "w", encoding="utf-8") as f:
    f.write(cart_code)

print("SUCCESS: Fixed React import in CartDrawer.tsx to import React, { useState, useEffect } from 'react'!")
