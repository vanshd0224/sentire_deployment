import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\copy_quantillion_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final33.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up quantillion scripts!")
