import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_all_pdp_modals.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final41.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up recommended products scripts!")
