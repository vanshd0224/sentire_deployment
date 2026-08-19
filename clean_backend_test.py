import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\test_backend_cartcreate.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up test_backend_cartcreate.py")
