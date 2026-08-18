import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\direct_live_e2e_test.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up direct_live_e2e_test.py")
