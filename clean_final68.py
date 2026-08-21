import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\search_text.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up search_text.py")
