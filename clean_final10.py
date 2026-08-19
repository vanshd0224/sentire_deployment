import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_backend_test.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_backend_test.py")
