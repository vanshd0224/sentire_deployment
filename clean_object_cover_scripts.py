import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_object_contain.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final35.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up object-cover scripts!")
