import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_oil_concentration.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\search_oil_all.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\oil_matches.txt",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\replace_oil_35.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final38.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up 35% oil concentration scripts!")
