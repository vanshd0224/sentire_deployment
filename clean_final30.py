import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_reiz_scripts.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_reiz_scripts.py")
