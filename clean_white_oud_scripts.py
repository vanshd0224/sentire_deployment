import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final53.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_white_oud_30ml.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up white oud 30ml scripts!")
