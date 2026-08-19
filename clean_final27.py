import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_woody_scripts.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_woody_scripts.py")
