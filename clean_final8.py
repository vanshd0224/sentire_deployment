import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_trace_scripts.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up clean_trace_scripts.py")
