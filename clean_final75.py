import os

for f in ["test_msg91.js", "test_verify.js", "clean_final74.py"]:
    p = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend", f)
    if os.path.exists(p):
        os.remove(p)
    p2 = os.path.join(r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment", f)
    if os.path.exists(p2):
        os.remove(p2)

print("Cleaned up temporary test files")
