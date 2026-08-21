import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final60.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_calantha_10ml.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up calantha 10ml scripts!")
