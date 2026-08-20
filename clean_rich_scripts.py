import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final51.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_rich_30ml.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up rich 30ml scripts!")
