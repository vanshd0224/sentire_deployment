import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\first_load_session_trace.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up first_load_session_trace.py")
