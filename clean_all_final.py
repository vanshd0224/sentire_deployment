import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\check_gcloud_deployment.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_debug_script.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\inspect_live_cloudrun_bundle.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up all temporary files!")
