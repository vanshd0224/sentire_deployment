import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\trace_signed_url_mobile_load.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_live_cloud_run_backend.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up mobile trace scripts!")
