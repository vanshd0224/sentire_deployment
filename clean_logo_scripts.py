import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\process_official_logo.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final21.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up logo processing scripts!")
