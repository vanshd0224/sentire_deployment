import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\copy_sentaura_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final28.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up sent-aura scripts!")
