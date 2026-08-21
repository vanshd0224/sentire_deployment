import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\test_gemini.js"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up test_gemini.js")
