import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\copy_pcleather_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final34.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up pc-leather scripts!")
