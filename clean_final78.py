import os

for f in ["test_mobile_formats.js", "test_widget_verify.js", "test_cloud_run.js", "test_widget_endpoints.js", "test_fast2sms.js", "clean_final77.py"]:
    p = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend", f)
    if os.path.exists(p):
        os.remove(p)
    p2 = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment", f)
    if os.path.exists(p2):
        os.remove(p2)

print("Cleaned up clean_final78.py")
