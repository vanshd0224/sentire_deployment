import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_mobile_trace.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_mobile_trace.py")
