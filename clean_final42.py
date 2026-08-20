import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_modal_invocations.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_rec_scripts.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up clean_final42.py")
