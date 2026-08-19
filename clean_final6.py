import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_first_load_script.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_first_load_script.py")
