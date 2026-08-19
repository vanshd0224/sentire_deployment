import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final23.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_final23.py")
