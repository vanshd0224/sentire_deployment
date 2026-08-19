import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_live_cloud_run_bundle.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final16.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up final scripts!")
