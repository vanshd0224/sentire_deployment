import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_vanaco_scripts.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_vanaco_scripts.py")
