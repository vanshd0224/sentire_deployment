import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\copy_reiz_images.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final29.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up reiz scripts!")
