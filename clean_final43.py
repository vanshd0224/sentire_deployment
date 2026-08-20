import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_mongodb_config.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_calantha_scripts.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up clean_final43.py")
