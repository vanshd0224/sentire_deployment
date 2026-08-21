import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final59.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_herrlich_10ml.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up herrlich 10ml scripts!")
