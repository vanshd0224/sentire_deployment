import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_check_script.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_check_script.py")
