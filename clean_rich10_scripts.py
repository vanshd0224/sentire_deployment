import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final58.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_rich_10ml.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up rich 10ml scripts!")
