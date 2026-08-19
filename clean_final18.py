import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\verify_live_cloud_run_deployment.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up verify_live_cloud_run_deployment.py")
